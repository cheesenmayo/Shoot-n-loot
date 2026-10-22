// Sandbox mode test: node tools/sandbox-test.mjs [--shots] [--only=desktop|touch]   (needs playwright, e.g. NODE_PATH=$(npm root -g))
// Drives the real UI (title button, B key / flask button, panel clicks, Esc) on a desktop viewport and on an emulated touch phone.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const pw = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const SHOTS = process.argv.includes('--shots');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const ARGS = ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'];

const results = [];
const errors = [];
const perf = {};
const ok = (name, cond, info = '') => results.push({ name, pass: !!cond, info: String(info) });

async function load(browser, opts, label) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${label}] ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[${label}] ${e.message}\n${(e.stack || '').split('\n').slice(0, 4).join('\n')}`));
  await page.goto(`file://${root}/index.html?manual`);
  await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
  // small helpers that live in the page
  await page.evaluate(() => {
    const g = window.__game;
    window.__t = {
      slots: () => g.player.inv.slots.map((s) => s && { id: s.def.id, r: s.rarity, c: s.count, m: s.mag }),
      onGround: (c) => Math.abs(g.world.collision.groundAt(c.pos.x, c.pos.z, c.pos.y + 0.3, 0.6) - c.pos.y) < 0.35,
      inGeometry: (c) => { const v = c.pos.clone(); return g.world.collision.resolve(v, 0.38, 1.8, 0.55); },
      enemies: () => g.sbx.enemies.map((e) => e.ch),
      mem: () => ({ geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, kids: g.scene.children.length }),
      dist: (c) => Math.hypot(c.pos.x - g.player.pos.x, c.pos.z - g.player.pos.z),
    };
  });
  return { ctx, page };
}

async function scenario(page, touch, cdp) {
  const L = touch ? 'touch' : 'desktop';
  const t = (name, cond, info = '') => ok(`${L}: ${name}`, cond, info);
  const E = (fn, arg) => page.evaluate(fn, arg);
  const step = (s) => E((x) => window.__step(x), s);
  const press = async (sel) => { if (touch) await page.tap(sel); else await page.click(sel); };
  const shot = async (name) => { if (!SHOTS) return; await E(() => window.__game.render()); await page.screenshot({ path: join(root, 'tools/shots', `sbx-${L}-${name}.png`) }); };
  const tab = async (id) => { await press(`.sbx-tabs button[data-id=${id}]`); await step(0.1); };
  const opt = (pane, name, val) => press(`section[data-pane=${pane}] [data-opt=${name}] [data-val="${val}"]`);
  const openPanel = async () => { if (touch) await press('#touch .top-l3'); else await page.keyboard.press('KeyB'); await step(0.3); };
  const closePanel = async () => { if (touch) await press('.sbx-x'); else await page.keyboard.press('KeyB'); await step(0.3); };
  const give = (id) => press(`.sbx .card[data-id="${id}"]`);
  const swipe = async (x, y0, y1) => {
    const pts = (y) => [{ x, y, id: 1 }];
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pts(y0) });
    for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pts(y0 + ((y1 - y0) * i) / 6) });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  const wait = (ms) => page.waitForTimeout(ms);

  // ---- entry ------------------------------------------------------------------------------------------------------
  const btns = await E(() => {
    const a = document.querySelector('#btn-play').getBoundingClientRect(), b = document.querySelector('#btn-sandbox').getBoundingClientRect();
    return { a: [a.left, a.right, a.top], b: [b.left, b.right, b.top, b.width, b.height], vw: innerWidth };
  });
  t('title screen has a Sandbox button next to Play', btns.b[3] > 80 && btns.b[4] > 30 && btns.b[0] >= btns.a[1] - 2 && btns.b[1] <= btns.vw && Math.abs(btns.a[2] - btns.b[2]) < 30, JSON.stringify(btns));
  t('controls panel documents the B key', await E(() => document.querySelector('#screen-title').textContent.includes('sandbox tools')));
  await shot('title');
  await press('#btn-sandbox');
  await step(1.5);
  const s0 = await E(() => {
    const g = window.__game, p = g.player;
    return {
      sandbox: g.sandbox, state: g.state, bus: g.bus.active, storm: g.storm.active, chars: g.chars.length, alive: g.aliveCount, mode: p.mode, ok: p.alive && p.grounded,
      ground: window.__t.onGround(p), inGeo: window.__t.inGeometry(p), chests: g.loot.chests.length, drops: g.loot.drops.length,
      stormChip: getComputedStyle(document.querySelector('#storm-chip')).display, chip: document.querySelector('#chip-alive').textContent.trim(), busUi: document.querySelector('#busui').classList.contains('hidden'),
      title: document.querySelector('#screen-title').classList.contains('hidden'), quit: document.querySelector('#btn-quit').textContent, bodyCls: document.body.classList.contains('sandbox'),
    };
  });
  t('Sandbox button starts the sandbox (flag, state)', s0.sandbox && s0.state === 'playing' && s0.title, JSON.stringify([s0.sandbox, s0.state]));
  t('no bus, no storm, only the player', !s0.bus && !s0.storm && s0.chars === 1 && s0.alive === 1 && s0.busUi, JSON.stringify(s0));
  t('player stands on open ground in normal mode', s0.mode === 'normal' && s0.ok && s0.ground && !s0.inGeo);
  t('world loot and chests are populated', s0.chests > 100 && s0.drops > 300, `${s0.chests} chests, ${s0.drops} drops`);
  t('storm chip hidden, SANDBOX chip shown', s0.stormChip === 'none' && /SANDBOX/.test(s0.chip), `${s0.stormChip} / ${s0.chip}`);
  t('pause menu wording is set up for the sandbox', s0.quit === 'Leave sandbox' && s0.bodyCls);
  await shot('play');
  await step(4);
  const s1 = await E(() => ({ state: window.__game.state, alive: window.__game.aliveCount, res: document.querySelector('#screen-result').classList.contains('hidden'), pend: window.__game.pendingResult }));
  t('aliveCount 1 never ends the match', s1.state === 'playing' && s1.alive === 1 && s1.res && !s1.pend);

  // ---- panel: open / close / pause interplay ------------------------------------------------------------------
  const flask = touch ? await E(() => { const b = (s) => document.querySelector(s).getBoundingClientRect(); const f = b('#touch .top-l3'), p = b('#touch .top-l'), m = b('#touch .top-l2'); const hit = (a, c) => !(a.right <= c.left || c.right <= a.left || a.bottom <= c.top || c.bottom <= a.top); return { w: f.width, h: f.height, overlap: hit(f, p) || hit(f, m), inside: f.left >= 0 && f.right <= innerWidth && f.top >= 0 && f.bottom <= innerHeight }; }) : null;
  if (touch) t('SANDBOX touch button is >= 40px, on screen, not overlapping pause / map', flask.w >= 40 && flask.h >= 40 && !flask.overlap && flask.inside, JSON.stringify(flask));
  else t('SANDBOX touch button stays hidden on desktop layouts', await E(() => getComputedStyle(document.querySelector('#touch .top-l3')).display === 'none' || document.querySelector('#touch').classList.contains('hidden')));
  await openPanel();
  const o1 = await E(() => { const g = window.__game, p = g.player; return { open: g.sbx.open, on: document.querySelector('#sbx').classList.contains('on'), input: g.inputEnabled(), paused: g.paused, touchHidden: document.querySelector('#touch').classList.contains('hidden'), t: g.time }; });
  t('panel opens (B / flask button) and input is disabled', o1.open && o1.on && !o1.input && !o1.paused);
  if (touch) t('touch controls hide while the panel is open', o1.touchHidden);
  await step(1);
  t('simulation stands still while the panel is open', (await E(() => window.__game.time)) === o1.t);
  await wait(500);
  await E(() => document.dispatchEvent(new Event('pointerlockchange')));
  t('losing pointer lock because of the panel does not pause', !(await E(() => window.__game.paused)));
  await shot('panel-items');
  await page.keyboard.press('Escape');
  await step(0.1);
  const o2 = await E(() => ({ open: window.__game.sbx.open, paused: window.__game.paused }));
  t('Esc closes the panel first (no pause)', !o2.open && !o2.paused);
  await wait(350);
  await page.keyboard.press('Escape');
  await step(0.1);
  const o3 = await E(() => ({ paused: window.__game.paused, menu: !document.querySelector('#screen-pause').classList.contains('hidden'), sbxBtn: !document.querySelector('#btn-sbx').classList.contains('hidden'), quit: document.querySelector('#btn-quit').textContent }));
  t('second Esc pauses; menu offers Sandbox tools and Leave sandbox', o3.paused && o3.menu && o3.sbxBtn && o3.quit === 'Leave sandbox', JSON.stringify(o3));
  await press('#btn-sbx');
  await step(0.2);
  const o4 = await E(() => ({ open: window.__game.sbx.open, paused: window.__game.paused, menu: !document.querySelector('#screen-pause').classList.contains('hidden') }));
  t('pause menu button opens the panel', o4.open && !o4.paused && !o4.menu);
  await press('.sbx-x');
  await step(0.1);
  t('close button closes the panel', !(await E(() => window.__game.sbx.open)));
  if (touch) {
    await press('#touch .top-l');
    await step(0.1);
    t('pause button pauses in the sandbox', await E(() => window.__game.paused));
    await press('#btn-resume');
    await step(0.1);
  }
  await openPanel();

  // ---- items --------------------------------------------------------------------------------------------------------
  const nCards = await E(() => ({ cards: document.querySelectorAll('.sbx .card[data-id]').length, items: Object.keys(window.__items.ITEMS).length, cats: document.querySelectorAll('.sbx-cat').length, imgs: document.querySelectorAll('.sbx .card .ic img').length }));
  t('every item of the database has a card', nCards.cards === nCards.items && nCards.cats >= 10, JSON.stringify(nCards));
  await wait(2500);
  await step(0.1);
  t('item cards get rendered 3D thumbnails', (await E(() => document.querySelectorAll('.sbx .card .ic img').length)) >= nCards.items - 2, `${await E(() => document.querySelectorAll('.sbx .card .ic img').length)} thumbnails`);
  await opt('items', 'rarity', 4);
  t('rarity selector applies', (await E(() => window.__game.sbx.cfg.rarity)) === 4);
  await give('ar');
  let sl = await E(() => ({ s: window.__t.slots(), sel: window.__game.player.inv.sel, ammo: window.__game.player.inv.ammo.medium, max: window.__items.AMMO.medium.max }));
  t('clicking a gun puts it in slot 1, equips it, tops up ammo', sl.s[1] && sl.s[1].id === 'ar' && sl.s[1].r === 4 && sl.sel === 1 && sl.ammo === sl.max, JSON.stringify(sl.s[1]));
  await give('pump'); await give('bolt_sniper'); await give('hand_cannon'); await give('pistol');
  sl = await E(() => ({ s: window.__t.slots(), sel: window.__game.player.inv.sel }));
  t('guns fill the first free slots', sl.s.slice(1, 6).map((x) => x && x.id).join() === 'ar,pump,bolt_sniper,hand_cannon,pistol' && sl.sel === 5, JSON.stringify(sl.s.map((x) => x && x.id)));
  t('rarity is clamped per item (pistol max Epic, bolt sniper keeps Legendary)', sl.s[5].r === 3 && sl.s[3].r === 4, `${sl.s[5].r}/${sl.s[3].r}`);
  await give('katana');
  sl = await E(() => ({ s: window.__t.slots(), sel: window.__game.player.inv.sel }));
  t('full inventory: replaces the selected slot, never the pickaxe', sl.s[0].id === 'pickaxe' && sl.s[5].id === 'katana' && sl.s[1].id === 'ar' && sl.s[4].id === 'hand_cannon', JSON.stringify(sl.s.map((x) => x && x.id)));
  await give('frag');
  sl = await E(() => ({ s: window.__t.slots(), st: window.__items.ITEMS.frag.stack }));
  t('stackables fill their stack', sl.s[5].id === 'frag' && sl.s[5].c === sl.st, JSON.stringify(sl.s[5]));
  await E(() => { window.__game.player.inv.slots[5].count = 1; });
  await give('frag');
  t('giving it again refills the stack', (await E(() => window.__t.slots()[5].c)) === 6);
  await shot('items-gave');
  // every single card, clicked through the real handler
  const sweep = await E(() => {
    const g = window.__game, bad = [];
    for (const id of Object.keys(window.__items.ITEMS)) {
      const d = window.__items.ITEMS[id];
      g.player.input.firePressed = false;
      document.querySelector(`.sbx .card[data-id="${id}"]`).click();
      const p = g.player, st = p.stack;
      if (p.inv.slots[0].def.id !== 'pickaxe') bad.push(`${id}: pickaxe lost`);
      if (!st || st.def.id !== id) bad.push(`${id}: not equipped (${st && st.def.id})`);
      else if (id !== 'pickaxe') {
        if (p.heldId !== id) bad.push(`${id}: not in hand (${p.heldId})`);
        if (d.kind !== 'gun' && d.kind !== 'melee' && st.count !== d.stack) bad.push(`${id}: count ${st.count} != ${d.stack}`);
        if (d.kind === 'gun' && (st.mag !== d.mag || p.inv.ammo[d.ammo] !== window.__items.AMMO[d.ammo].max)) bad.push(`${id}: ammo ${st.mag}/${p.inv.ammo[d.ammo]}`);
        if ((d.kind === 'gun' || d.kind === 'melee') && st.rarity !== Math.min(Math.max(4, d.minR ?? 0), d.maxR ?? 4)) bad.push(`${id}: rarity ${st.rarity}`);
      }
    }
    return { bad, runana: window.__t.slots().some((s) => s && s.id === 'runana') };
  });
  t('all items can be given (equipped, stacked, ammo topped up, pickaxe kept)', sweep.bad.length === 0, sweep.bad.slice(0, 5).join(' | '));
  await give('runana');
  t('Runana is in the item list and stacks to 4', await E(() => { const s = window.__game.player.stack; return s.def.id === 'runana' && s.count === 4; }));
  await E(() => { const p = window.__game.player; p.inv.ammo.light = 0; p.inv.ammo.heavy = 3; p.inv.slots.forEach((s) => { if (s && s.def.kind === 'gun') s.mag = 0; }); });
  await tab('items');
  await press('[data-act=max-ammo]');
  const mx = await E(() => { const p = window.__game.player, A = window.__items.AMMO; return Object.keys(A).every((k) => p.inv.ammo[k] === A[k].max) && p.inv.slots.every((s) => !s || s.def.kind !== 'gun' || s.mag === s.def.mag); });
  t('Max ammo refills reserves and magazines', mx);
  for (const [id, expect] of [['assault', 'ar,pump,smg,big_shield,medkit'], ['sniper', 'bolt_sniper,semi_sniper,silenced_smg,big_shield,bandage'], ['demolition', 'rocket_launcher,grenade_launcher,frag,dynamite,small_shield'], ['parkour', 'grappler,launchpad,impulse,jumpple,floorange'], ['medic', 'medkit,big_shield,slurp,chug_jug,runana']]) {
    await press(`[data-act=loadout][data-id=${id}]`);
    const r = await E(() => { const p = window.__game.player, A = window.__items.AMMO; const s = window.__t.slots(); return { ids: s.slice(1, 6).map((x) => x && x.id).join(), sel: p.inv.sel, ammoOk: p.inv.slots.every((q) => !q || q.def.kind !== 'gun' || p.inv.ammo[q.def.ammo] === A[q.def.ammo].max), pick: s[0].id }; });
    t(`loadout ${id}: slots 1-5 and matching ammo`, r.ids === expect && r.sel === 1 && r.ammoOk && r.pick === 'pickaxe', r.ids);
  }
  await shot('loadout');
  await press('[data-act=clear-inv]');
  const ci = await E(() => { const p = window.__game.player; return { s: window.__t.slots(), sel: p.inv.sel, ammo: Object.values(p.inv.ammo).reduce((a, b) => a + b, 0) }; });
  t('Clear inventory keeps only the pickaxe', ci.s[0].id === 'pickaxe' && ci.s.slice(1).every((x) => !x) && ci.sel === 0 && ci.ammo === 0);

  // ---- enemies --------------------------------------------------------------------------------------------------------
  await tab('enemies');
  await shot('panel-enemies');
  const dflt = await E(() => { const c = window.__game.sbx.cfg; return `${c.skill},${c.weapon},${c.count},${c.place},${c.health},${c.behaviour}`; });
  t('enemy options start on sensible defaults', dflt === 'avg,random,3,f20,normal,hostile', dflt);
  t('Spawn button shows the count', (await E(() => document.querySelector('#sbx-spawn').textContent.trim())) === 'Spawn 3');
  const base = await E(() => window.__t.mem());
  await E(() => { const p = window.__game.player; p.inv.slots[1] = window.__items.makeStack('ar', 2); p.inv.ammo.medium = 240; p.equip(1); });
  const yaw0 = await E(() => window.__game.controller.yaw);
  await press('#sbx-spawn');
  const sp = await E(() => {
    const g = window.__game, p = g.player, es = window.__t.enemies();
    const fx = -Math.sin(g.controller.yaw), fz = -Math.cos(g.controller.yaw);
    const names = new Set(es.map((e) => e.name));
    return {
      n: g.sbx.liveCount(), chars: g.chars.length, bots: g.bots.length, botOf: g.botOf.size, uniq: names.size, you: names.has('You'),
      d: es.map((e) => Math.hypot(e.pos.x - p.pos.x, e.pos.z - p.pos.z)), front: es.map((e) => (e.pos.x - p.pos.x) * fx + (e.pos.z - p.pos.z) * fz),
      ground: es.every((e) => window.__t.onGround(e)), geo: es.some((e) => window.__t.inGeometry(e)), guns: es.map((e) => e.inv.slots.some((s, i) => i > 0 && s && s.def.kind === 'gun')),
      mode: es.map((e) => e.mode).join(), badge: document.querySelector('#sbx-badge').textContent, live: document.querySelector('#sbx-live').textContent,
    };
  });
  t('Spawn creates real bots registered in chars / bots / botOf', sp.n === 3 && sp.chars === 4 && sp.bots === 3 && sp.botOf === 3 && sp.uniq === 3 && !sp.you, JSON.stringify([sp.n, sp.chars, sp.bots, sp.botOf]));
  t('enemies appear ~20 m in front, on the ground, not inside geometry', sp.d.every((d) => d > 15 && d < 26) && sp.front.every((f) => f > 12) && sp.ground && !sp.geo, JSON.stringify(sp.d.map((d) => +d.toFixed(1))));
  t('random loadout gives every enemy a gun', sp.guns.every(Boolean) && sp.mode === 'normal,normal,normal');
  t('enemy counter updates in the panel', sp.badge === '3' && sp.live === '3');
  await tab('player');
  await press('[data-act=toggle][data-key=god]');
  await closePanel();
  await step(10);
  const fight = await E(() => { const es = window.__t.enemies(); const p = window.__game.player; return { shots: es.map((e) => e.stats.shots), moved: es.map((e) => window.__t.dist(e)), hp: p.hp, chip: document.querySelector('#alive').textContent, live: window.__game.sbx.liveCount() }; });
  t('hostile enemies attack the player (god mode keeps you alive)', fight.shots.some((s) => s > 0) && fight.hp === 100 && fight.live === 3, JSON.stringify(fight));
  t('HUD chip shows the enemy count', fight.chip === '3');
  await shot('fight');

  // dummies never move or shoot
  await openPanel();
  await tab('enemies');
  await press('[data-act=clear-enemies]');
  const cl = await E(() => ({ n: window.__game.sbx.liveCount(), chars: window.__game.chars.length, bots: window.__game.bots.length, botOf: window.__game.botOf.size, mem: window.__t.mem() }));
  t('Clear all enemies removes them from chars / bots / botOf', cl.n === 0 && cl.chars === 1 && cl.bots === 0 && cl.botOf === 0, JSON.stringify(cl));
  t('clearing returns the scene to its previous size', cl.mem.kids === base.kids, `${cl.mem.kids} vs ${base.kids}`);
  await opt('enemies', 'skill', 'dummy');
  t('Dummy skill implies the dummy behaviour (and back)', (await E(() => window.__game.sbx.cfg.behaviour)) === 'dummy');
  await opt('enemies', 'count', 5);
  await opt('enemies', 'place', 'ring');
  await press('#sbx-spawn');
  const dm = await E(() => { const es = window.__t.enemies(); const p = window.__game.player; return { n: es.length, pos: es.map((e) => e.pos.clone()), d: es.map((e) => window.__t.dist(e)), ang: es.map((e) => Math.atan2(e.pos.z - p.pos.z, e.pos.x - p.pos.x)) }; });
  const spread = Math.max(...dm.ang) - Math.min(...dm.ang);
  t('ring placement surrounds the player', dm.n === 5 && spread > 3.5 && dm.d.every((d) => d > 10 && d < 45), `spread ${spread.toFixed(1)} rad, d ${dm.d.map((d) => d.toFixed(0)).join()}`);
  await closePanel();
  await step(8);
  const dm2 = await E(() => { const es = window.__t.enemies(); return { pos: es.map((e) => e.pos.toArray()), shots: es.reduce((a, e) => a + e.stats.shots, 0), hp: window.__game.player.hp }; });
  t('training dummies never move or shoot', dm2.shots === 0 && dm2.pos.every((p, i) => Math.hypot(p[0] - dm.pos[i].x, p[2] - dm.pos[i].z) < 0.05));
  // real shots through the controller (aim at one dummy ahead): damage readout + kill feed
  await openPanel();
  await tab('enemies');
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'count', 1);
  await opt('enemies', 'place', 'f20');
  await opt('enemies', 'health', 'bag');
  await press('#sbx-spawn');
  await closePanel();
  await E(() => {
    const p = window.__game.player;
    p.inv.slots[1] = window.__items.makeStack('ar', 2); p.inv.ammo.medium = 240; p.inv.sel = 0; p.equip(1); p.equipT = 0;
    window.__game.controller.mouseDown = true;
  });
  for (let i = 0; i < 15; i++) {
    await E(() => { // keep the crosshair on the dummy (recoil kicks the view up)
      const g = window.__game, p = g.player, d = window.__t.enemies()[0], cam = g.camera.position;
      g.controller.yaw = Math.atan2(-(d.pos.x - cam.x), -(d.pos.z - cam.z));
      g.controller.pitch = Math.atan2(d.pos.y + 1.2 - cam.y, Math.hypot(d.pos.x - cam.x, d.pos.z - cam.z));
    });
    await step(0.1);
  }
  await E(() => { window.__game.controller.mouseDown = false; });
  const hit = await E(() => { const g = window.__game, s = g.sbx.stats, d = window.__t.enemies()[0]; return { total: s.total, hits: s.hits, dps: g.sbx.dps(), hp: d.hp, last: s.last && s.last.v, txt: document.querySelector('#sbx-stats').textContent, target: document.querySelector('#sbx-target').classList.contains('hidden') }; });
  t('real shots register in the damage readout (total, DPS, last hit)', hit.hits >= 3 && hit.total > 50 && hit.dps > 20 && hit.last > 0 && /DMG\s*\d/.test(hit.txt) && !hit.target, JSON.stringify(hit));
  await E(() => { const g = window.__game; window.__t.enemies()[0].takeDamage(40, g.player, { headshot: true, weapon: g.player.stack.def }); });
  await step(0.5);
  t('headshots are flagged', await E(() => window.__game.sbx.stats.last.head && /HEAD/.test(document.querySelector('#sbx-stats').textContent)));
  await openPanel();
  await tab('player');
  t('panel footer shows the same numbers', await E(() => Number(document.querySelector('#rd-total').textContent.replace(/,/g, '')) === Math.round(window.__game.sbx.stats.total)));
  await press('[data-act=reset-stats]');
  t('Reset zeroes the readout', await E(() => window.__game.sbx.stats.total === 0 && document.querySelector('#rd-total').textContent === '0'));

  // health options, passive, specific weapons, pickaxe only
  await tab('enemies');
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'skill', 'avg');
  t('leaving the Dummy skill restores hostile', (await E(() => window.__game.sbx.cfg.behaviour)) === 'hostile');
  await opt('enemies', 'health', 'tough');
  await press('#sbx-spawn');
  t('Tough enemies have 250 HP', (await E(() => window.__t.enemies()[0].hp)) === 250);
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'health', 'bag');
  await opt('enemies', 'behaviour', 'passive');
  await press('#sbx-spawn');
  t('Punching bags have 1000 HP', (await E(() => window.__t.enemies()[0].hp)) === 1000);
  await closePanel();
  await step(6);
  const pas = await E(() => { const e = window.__t.enemies()[0]; window.__t.p0 = e.pos.clone(); return { shots: e.stats.shots, d: window.__t.dist(e), prov: window.__game.botOf.get(e).provoked }; });
  t('passive enemies stay idle until damaged', pas.shots === 0 && !pas.prov);
  await E(() => { const g = window.__game, e = window.__t.enemies()[0]; e.takeDamage(500, g.player, { weapon: g.player.stack.def }); });
  await step(0.2);
  t('a hit provokes a passive enemy', await E(() => window.__game.botOf.get(window.__t.enemies()[0]).provoked));
  const hpAfterHit = await E(() => window.__t.enemies()[0].hp);
  await E(() => { const e = window.__t.enemies()[0]; const b = window.__game.botOf.get(e); b.update = () => {}; e.input.fire = false; });
  await step(7);
  const regen = await E(() => window.__t.enemies()[0].hp);
  t('punching bag regenerates after a few seconds', hpAfterHit <= 520 && regen >= 999, `${Math.round(hpAfterHit)} -> ${Math.round(regen)}`);
  await openPanel();
  await tab('enemies');
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'health', 'normal');
  await opt('enemies', 'behaviour', 'hostile');
  t('weapon rarity row is hidden for random loadouts', await E(() => document.querySelector('div.sbx-wr').classList.contains('hidden')));
  await page.selectOption('.sbx-sel', 'rocket_launcher');
  t('a specific weapon shows its rarity row', !(await E(() => document.querySelector('div.sbx-wr').classList.contains('hidden'))));
  await opt('enemies', 'count', 3);
  await press('#sbx-spawn');
  const rl = await E(() => window.__t.enemies().map((e) => e.inv.slots.filter((s, i) => i > 0 && s).map((s) => `${s.def.id}:${s.rarity}`).join()));
  t('enemies carry exactly the chosen weapon at the panel rarity', rl.every((s) => s === 'rocket_launcher:4'), rl.join(' | '));
  await press('[data-act=clear-enemies]');
  await page.selectOption('.sbx-sel', 'pickaxe');
  await press('#sbx-spawn');
  const pk = await E(() => window.__t.enemies().map((e) => e.inv.slots.filter((s, i) => i > 0 && s).length));
  t('Pickaxe only enemies carry nothing else', pk.every((n) => n === 0));
  await closePanel();
  await step(10);
  const mel = await E(() => ({ near: Math.min(...window.__t.enemies().map((e) => window.__t.dist(e))), hp: window.__game.player.hp }));
  t('pickaxe enemies charge the player', mel.near < 6, `nearest ${mel.near.toFixed(1)} m`);
  await openPanel();
  await tab('enemies');
  await page.selectOption('.sbx-sel', 'random');
  await press('[data-act=clear-enemies]');

  // cap of 40, placement distances
  await opt('enemies', 'place', 'f40');
  await opt('enemies', 'count', 1);
  await press('#sbx-spawn');
  t('Front 40 m places the enemy ~40 m away', await E(() => { const d = window.__t.dist(window.__t.enemies()[0]); return d > 34 && d < 48; }));
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'place', 'f10');
  await press('#sbx-spawn');
  t('Front 10 m places the enemy ~10 m away', await E(() => { const d = window.__t.dist(window.__t.enemies()[0]); return d > 7 && d < 14; }));
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'place', 'ring');
  await opt('enemies', 'count', 20);
  await press('#sbx-spawn');
  await press('#sbx-spawn');
  const cap1 = await E(() => ({ n: window.__game.sbx.liveCount(), btn: document.querySelector('#sbx-spawn').textContent.trim(), dis: document.querySelector('#sbx-spawn').disabled }));
  t('two ring spawns of 20 give 40 enemies', cap1.n === 40 && cap1.dis, JSON.stringify(cap1));
  const cap2 = await E(() => { const made = window.__game.sbx.spawn(); return { made, n: window.__game.sbx.liveCount(), chars: window.__game.chars.length, note: document.querySelector('.sbx-note').textContent, toast: document.querySelector('#toasts').textContent }; });
  t('the cap of 40 holds and the UI mentions it', cap2.made === 0 && cap2.n === 40 && cap2.chars === 41 && /40/.test(cap2.note) && /40/.test(cap2.toast), JSON.stringify(cap2));
  await shot('forty');
  await closePanel();
  const t0 = Date.now();
  await step(3);
  perf.step40 = (Date.now() - t0) / 90;
  await E(() => window.__game.sbx.clearEnemies());
  const t1 = Date.now();
  await step(3);
  perf.step0 = (Date.now() - t1) / 90;
  await openPanel();

  // kills: corpses, kill feed, loot, no result screen
  await tab('enemies');
  await opt('enemies', 'place', 'f20');
  await opt('enemies', 'count', 3);
  await opt('enemies', 'behaviour', 'dummy');
  await press('#sbx-spawn');
  const drops0 = await E(() => window.__game.loot.drops.length);
  await E(() => { const g = window.__game; for (const e of window.__t.enemies()) e.takeDamage(9999, g.player, { weapon: g.player.stack.def }); });
  await closePanel();
  await step(0.3);
  const kd = await E(() => { const g = window.__game; return { live: g.sbx.liveCount(), chars: g.chars.length, state: g.state, alive: g.aliveCount, res: document.querySelector('#screen-result').classList.contains('hidden'), feed: document.querySelector('#feed').children.length, kills: g.player.kills, drops: g.loot.drops.length }; });
  t('kills work: feed, kill count, drops, no placement / result screen', kd.live === 0 && kd.state === 'playing' && kd.alive === 1 && kd.res && kd.feed >= 3 && kd.kills >= 3 && kd.drops > drops0, JSON.stringify(kd));
  await step(7);
  const kd2 = await E(() => { const g = window.__game; return { chars: g.chars.length, bots: g.bots.length, botOf: g.botOf.size, enemies: g.sbx.enemies.length }; });
  t('corpses are removed and disposed after a few seconds', kd2.chars === 1 && kd2.bots === 0 && kd2.botOf === 0 && kd2.enemies === 0, JSON.stringify(kd2));
  await openPanel();
  await tab('enemies');
  await press('[data-act=respawn-dummies]');
  const rd = await E(() => ({ n: window.__game.sbx.liveCount(), dummy: window.__t.enemies().every((e) => window.__game.botOf.get(e).mode === 'dummy') }));
  t('Respawn dummies brings the dummies back', rd.n === 3 && rd.dummy);
  await press('[data-act=clear-enemies]');
  await opt('enemies', 'behaviour', 'hostile');
  await opt('enemies', 'count', 3);

  // ---- player tab ------------------------------------------------------------------------------------------------------
  await tab('player');
  await shot('panel-player');
  await E(() => { const p = window.__game.player; p.hp = 100; p.shield = 0; });
  await press('[data-act=toggle][data-key=god]'); // was on from before: turn it off, test damage
  const g1 = await E(() => { const g = window.__game, p = g.player; const off = !g.sbx.god; p.takeDamage(30, null, {}); return { off, hp: p.hp, sw: document.querySelector('[data-key=god]').getAttribute('aria-checked') }; });
  t('God mode toggle off: damage applies', g1.off && g1.hp === 70 && g1.sw === 'false', JSON.stringify(g1));
  await press('[data-act=toggle][data-key=god]');
  const g2 = await E(() => { const g = window.__game, p = g.player; p.takeDamage(60, null, {}); return { on: g.sbx.god, hp: p.hp, sw: document.querySelector('[data-key=god]').getAttribute('aria-checked') }; });
  t('God mode on: no damage', g2.on && g2.hp === 70 && g2.sw === 'true');
  await closePanel();
  await E(() => { const g = window.__game, p = g.player; p.place(p.pos.x, p.pos.y + 45, p.pos.z); p.grounded = false; p.vel.set(0, 0, 0); });
  await step(4);
  t('God mode: no fall damage', await E(() => window.__game.player.hp === 70 && window.__game.player.grounded));
  await E(() => { const g = window.__game, p = g.player; g.sbx.setToggle('god', false); p.hp = 100; p.place(p.pos.x, p.pos.y + 14, p.pos.z); p.grounded = false; p.vel.set(0, 0, 0); });
  await step(3);
  t('without God mode a fall hurts', await E(() => window.__game.player.hp < 80 && window.__game.player.hp > 40), `hp ${await E(() => Math.round(window.__game.player.hp))}`);
  await E(() => { window.__game.sbx.setToggle('god', true); });
  await openPanel();
  await tab('player');
  await press('[data-act=heal]');
  t('Heal restores 100 HP and 100 shield', await E(() => window.__game.player.hp === 100 && window.__game.player.shield === 100));

  // infinite ammo, infinite consumables, super speed
  await tab('items');
  await give('ar');
  await tab('player');
  await press('[data-act=toggle][data-key=infAmmo]');
  await closePanel();
  await E(() => { const g = window.__game, p = g.player; p.stack.mag = 4; p.inv.ammo.medium = 0; g.controller.mouseDown = true; });
  await step(5);
  const ia = await E(() => { const p = window.__game.player; return { mag: p.stack.mag, res: p.inv.ammo.medium, shots: p.stats.shots, hud: document.querySelector('#ammo').textContent }; });
  await E(() => { window.__game.controller.mouseDown = false; });
  t('infinite ammo: the magazine never runs dry', ia.mag > 0 && ia.shots > 20 && /∞/.test(ia.hud), JSON.stringify(ia));
  await openPanel();
  await tab('items');
  await give('bandage');
  await tab('player');
  await press('[data-act=toggle][data-key=infItems]');
  await closePanel();
  await E(() => { const p = window.__game.player; p.hp = 40; p.input.firePressed = true; });
  await step(5);
  const ii = await E(() => { const p = window.__game.player; const s = p.inv.slots.find((x) => x && x.def.id === 'bandage'); return { hp: p.hp, cnt: s && s.count, hud: document.querySelector('#hotbar').textContent }; });
  t('infinite consumables: used, but the stack stays full', ii.hp >= 54 && ii.cnt >= 8 && /∞/.test(ii.hud), JSON.stringify(ii));
  await E(() => { window.__game.sbx.setToggle('infItems', false); });
  t('turning infinite consumables off caps the stacks again', await E(() => window.__game.player.inv.slots.every((s) => !s || s.def.kind === 'gun' || s.def.kind === 'melee' || s.count <= s.def.stack)));
  await E(() => { const p = window.__game.player; p.vel.set(0, 0, 0); window.__game.controller.yaw = 0.7; });
  await page.keyboard.down('KeyW');
  await page.keyboard.down('ShiftLeft');
  await step(1.5);
  const v0 = await E(() => Math.hypot(window.__game.player.vel.x, window.__game.player.vel.z));
  await E(() => { window.__game.sbx.setToggle('superSpeed', true); });
  await step(1.5);
  const v1 = await E(() => Math.hypot(window.__game.player.vel.x, window.__game.player.vel.z));
  await page.keyboard.up('KeyW');
  await page.keyboard.up('ShiftLeft');
  t('super speed is much faster', v1 > v0 * 1.6 && v1 > 15, `${v0.toFixed(1)} -> ${v1.toFixed(1)} m/s`);
  await E(() => { window.__game.sbx.setToggle('superSpeed', false); });
  await step(1);

  // teleports
  await openPanel();
  await tab('player');
  const pois = await E(() => window.__game.world.pois.map((p) => ({ id: p.id, name: p.name, x: p.x, z: p.z })));
  t('teleport list has all 8 POIs and the sky drop', pois.length === 8 && (await E(() => document.querySelectorAll('.sb.tp').length)) === 9);
  for (const poi of pois) {
    await press(`.sb.tp[data-id=${poi.id}]`);
    const tp = await E((id) => {
      const g = window.__game, p = g.player, poi = g.world.pois.find((q) => q.id === id);
      return { d: Math.hypot(p.pos.x - poi.x, p.pos.z - poi.z), ground: window.__t.onGround(p), geo: window.__t.inGeometry(p), v: p.vel.length(), mode: p.mode, grounded: p.grounded, y: p.pos.y, wet: p.pos.y < 0.5, cam: g.camera.position.toArray().every(Number.isFinite) };
    }, poi.id);
    t(`teleport to ${poi.name}: safe spot on the ground`, tp.d < 160 && tp.ground && !tp.geo && tp.v === 0 && tp.mode === 'normal' && tp.grounded && !tp.wet && tp.cam, `${tp.d.toFixed(0)} m away, y ${tp.y.toFixed(1)}`);
  }
  await closePanel();
  const hpBefore = await E(() => { window.__game.sbx.setToggle('god', false); return window.__game.player.hp; });
  await step(2);
  t('teleporting causes no fall damage', await E((h) => window.__game.player.hp === h && window.__game.player.grounded, hpBefore));
  await openPanel();
  await tab('player');
  await press('[data-act=skydrop]');
  const sd = await E(() => { const g = window.__game, p = g.player; return { mode: p.mode, h: p.pos.y - g.world.collision.groundAt(p.pos.x, p.pos.z, p.pos.y, 0.6) }; });
  t('Sky drop starts a skydive from 300 m', sd.mode === 'skydive' && sd.h > 280 && sd.h < 320, JSON.stringify(sd));
  await closePanel();
  await step(45);
  const sd2 = await E(() => ({ mode: window.__game.player.mode, hp: window.__game.player.hp, grounded: window.__game.player.grounded }));
  t('the glider opens and you land safely', sd2.mode === 'normal' && sd2.grounded && sd2.hp === hpBefore, JSON.stringify(sd2));
  await openPanel();
  await tab('player');
  await opt('player', 'time', '0.25');
  await closePanel();
  const tt0 = await E(() => window.__game.time);
  await step(2);
  const tsc = await E((a) => ({ dt: window.__game.time - a, tag: document.querySelector('#sbx-tags').textContent }), tt0);
  t('time scale 0.25x slows the simulation', Math.abs(tsc.dt - 0.5) < 0.06 && /0\.25/.test(tsc.tag), JSON.stringify(tsc));
  await openPanel();
  await tab('player');
  await opt('player', 'time', '1');
  await closePanel();

  // ---- death and respawn -----------------------------------------------------------------------------------------------
  await E(() => { const g = window.__game; g.sbx.setToggle('god', false); });
  await openPanel();
  await tab('items');
  await press('[data-act=loadout][data-id=assault]');
  await closePanel();
  const dpos = await E(() => { const p = window.__game.player; window.__t.inv = JSON.stringify(window.__t.slots()); window.__t.drops = window.__game.loot.drops.length; return p.pos.toArray(); });
  await E(() => { const g = window.__game; g.player.takeDamage(500, null, {}); });
  await step(0.6);
  const dd = await E(() => { const g = window.__game, p = g.player; return { alive: p.alive, state: g.state, res: document.querySelector('#screen-result').classList.contains('hidden'), pend: g.pendingResult, drops: g.loot.drops.length - window.__t.drops, paused: g.paused }; });
  t('dying in the sandbox: no result screen, inventory not dropped', !dd.alive && dd.state === 'playing' && dd.res && !dd.pend && dd.drops === 0, JSON.stringify(dd));
  await step(1.5);
  const dr = await E(() => { const g = window.__game, p = g.player; return { alive: p.alive, hp: p.hp, inv: JSON.stringify(window.__t.slots()) === window.__t.inv, pos: p.pos.toArray(), mode: p.mode, ground: window.__t.onGround(p), vis: p.root.visible }; });
  t('respawns after ~1.5 s with full health and the same inventory', dr.alive && dr.hp === 100 && dr.inv && dr.mode === 'normal' && dr.ground && dr.vis, JSON.stringify(dr));
  t('respawn is at the place of death', Math.hypot(dr.pos[0] - dpos[0], dr.pos[2] - dpos[2]) < 1.5);
  await E(() => { window.__game.sbx.setToggle('god', true); });
  await E(() => { window.__game.player.takeDamage(500, null, {}); });
  await step(0.2);
  t('God mode: you cannot die', await E(() => window.__game.player.alive));
  await E(() => { window.__game.sbx.setToggle('god', false); });

  // ---- persistence ---------------------------------------------------------------------------------------------------------
  await openPanel();
  await tab('enemies');
  await opt('enemies', 'count', 10);
  await opt('enemies', 'place', 'f40');
  await opt('enemies', 'skill', 'pro');
  await tab('items');
  await opt('items', 'rarity', 1);
  const saved = await E(() => JSON.parse(localStorage.getItem('shootnloot.settings.v1')).sandbox);
  t('panel choices are written to the settings store', saved && saved.count === 10 && saved.place === 'f40' && saved.skill === 'pro' && saved.rarity === 1 && saved.tab === 'items', JSON.stringify(saved));

  // ---- layout at the current size and phone sizes -------------------------------------------------------------------------
  const layout = async (label) => {
    const rows = [];
    for (const id of ['items', 'enemies', 'player']) {
      await tab(id);
      rows.push(await E((args) => {
        const [tabId, isTouch] = args;
        const el = document.querySelector('#sbx'), r = el.getBoundingClientRect(), body = el.querySelector('.sbx-body'), head = el.querySelector('.sbx-head');
        const small = [], out = [];
        const pane = el.querySelector(`[data-pane=${tabId}]`);
        for (const b of [...head.querySelectorAll('button'), ...pane.querySelectorAll('button, select'), ...el.querySelectorAll('.sbx-foot button')]) {
          const q = b.getBoundingClientRect();
          if (!q.width) continue;
          if (isTouch && q.height < 39.5) small.push(`${b.textContent.trim().slice(0, 12)} ${Math.round(q.height)}`);
          if (b.closest('.sbx-body')) continue;
          if (q.right > r.right + 1 || q.left < r.left - 1) out.push(b.textContent.trim().slice(0, 12));
        }
        return { tabId, free: r.left / innerWidth, w: r.width, h: r.height, vh: innerHeight, small, out, hs: body.scrollWidth - body.clientWidth, headOverflow: head.scrollWidth - head.clientWidth, canScroll: body.scrollHeight > body.clientHeight };
      }, [id, touch]));
    }
    const bad = rows.filter((x) => x.free < 0.3 || x.small.length || x.out.length || x.hs > 1 || x.headOverflow > 1);
    t(`${label}: panel fits, leaves the game visible, controls >= 40px on touch`, bad.length === 0, JSON.stringify(bad.length ? bad : rows.map((x) => [x.tabId, +x.free.toFixed(2)])));
  };
  await layout(`layout ${await E(() => `${innerWidth}x${innerHeight}`)}`);
  if (touch) {
    for (const [w, h] of [[568, 320], [844, 390]]) {
      await page.setViewportSize({ width: w, height: h });
      await wait(400);
      await step(0.3);
      await layout(`layout ${w}x${h}`);
      await tab('items');
      await shot(`${w}x${h}-items`);
      await tab('enemies');
      await shot(`${w}x${h}-enemies`);
      await tab('player');
      await shot(`${w}x${h}-player`);
      // game stays visible: HUD narrowed to the free area, minimap inside it
      const hud = await E(() => { const r = document.querySelector('#sbx').getBoundingClientRect(), h = document.querySelector('#hud').getBoundingClientRect(), m = document.querySelector('.minimap').getBoundingClientRect(); return { hudRight: h.right, panelLeft: r.left, mapRight: m.right }; });
      t(`${w}x${h}: HUD is pulled into the part the panel leaves free`, hud.hudRight <= hud.panelLeft + 1 && hud.mapRight <= hud.panelLeft + 1, JSON.stringify(hud));
    }
    await tab('items');
    // touch scrolling of the long item list
    const box = await E(() => { const r = document.querySelector('.sbx-body').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    const st0 = await E(() => document.querySelector('.sbx-body').scrollTop);
    await swipe(box.x, box.y + 80, box.y - 90);
    await wait(300);
    const st1 = await E(() => document.querySelector('.sbx-body').scrollTop);
    t('the item list scrolls with a finger swipe', st1 > st0 + 40, `${st0} -> ${st1}`);
    await page.setViewportSize({ width: 915, height: 412 });
    await wait(300);
    await step(0.2);
  } else {
    await tab('items');
    await shot('items');
    await tab('enemies');
    await shot('enemies');
    await tab('player');
    await shot('player');
  }
}

async function leakCycles(page, touch) {
  const L = touch ? 'touch' : 'desktop';
  const t = (name, cond, info = '') => ok(`${L}: ${name}`, cond, info);
  const E = (fn, arg) => page.evaluate(fn, arg);
  const step = (s) => E((x) => window.__step(x), s);
  const press = async (sel) => { if (touch) await page.tap(sel); else await page.click(sel); };
  const wait = (ms) => page.waitForTimeout(ms);
  // back to the lobby through the UI
  await E(() => { const g = window.__game; if (g.sbx.open) g.sbx.closePanel(); });
  await wait(300);
  await page.keyboard.press('Escape');
  await step(0.1);
  await press('#btn-quit');
  await step(0.5);
  const lobby = await E(() => ({ state: window.__game.state, sandbox: window.__game.sandbox, title: !document.querySelector('#screen-title').classList.contains('hidden'), chars: window.__game.chars.length, body: document.body.classList.contains('sandbox'), panel: document.querySelector('#sbx').classList.contains('on'), kids: window.__game.scene.children.length }));
  t('Leave sandbox returns to the title screen and resets the flag', lobby.state === 'menu' && !lobby.sandbox && lobby.title && lobby.chars === 0 && !lobby.body && !lobby.panel, JSON.stringify(lobby));
  const marks = [];
  for (let i = 0; i < 3; i++) {
    await press('#btn-sandbox');
    await step(1);
    if (touch) await press('#touch .top-l3'); else await page.keyboard.press('KeyB');
    await step(0.2);
    await press('.sbx-tabs button[data-id=enemies]');
    await press('section[data-pane=enemies] [data-opt=count] [data-val="10"]');
    await press('#sbx-spawn');
    await E(() => { const g = window.__game; g.sbx.give('minigun'); g.sbx.give('rocket_launcher'); });
    await press('.sbx-x');
    await step(6);
    await E(() => { const g = window.__game; for (const e of window.__t.enemies().slice(0, 4)) e.takeDamage(9999, g.player, { weapon: g.player.stack.def }); g.sbx.spawn(); });
    await step(8);
    await E(() => window.__game.sbx.openPanel());
    await wait(200);
    await page.keyboard.press('Escape');
    await step(0.1);
    await wait(300);
    await page.keyboard.press('Escape');
    await step(0.1);
    await press('#btn-quit');
    await step(0.5);
    marks.push(await E(() => ({ ...window.__t.mem(), chars: window.__game.chars.length, enemies: window.__game.sbx.enemies.length, bots: window.__game.bots.length })));
  }
  t('3 enter / leave cycles: GPU geometries and textures stay constant', marks[1].geo === marks[2].geo && marks[1].tex === marks[2].tex && marks[0].geo >= marks[1].geo - 0, JSON.stringify(marks));
  t('3 enter / leave cycles: scene child count is stable and back to the lobby size', marks.every((m) => m.kids === lobby.kids), `${marks.map((m) => m.kids).join()} vs ${lobby.kids}`);
  t('nothing is left registered after leaving', marks.every((m) => m.chars === 0 && m.enemies === 0 && m.bots === 0));
  // a normal match afterwards
  await press('#btn-play');
  await step(2);
  const m = await E(() => { const g = window.__game; return { sandbox: g.sandbox, state: g.state, bus: g.bus.active, storm: g.storm.active, chars: g.chars.length, alive: g.aliveCount, quit: document.querySelector('#btn-quit').textContent, read: document.querySelector('#sbx-read').classList.contains('hidden'), body: document.body.classList.contains('sandbox'), sbx: g.sbx.enemies.length, ic: document.querySelector('#alive-ic').textContent, b: document.querySelector('#btn-sbx').classList.contains('hidden'), sod: g.player.takeDamage === window.__game.chars[0].constructor.prototype.takeDamage, mem: window.__t.mem() }; });
  t('Play after the sandbox starts a normal match (bus, storm, 50 players)', !m.sandbox && m.state === 'bus' && m.bus && m.storm && m.chars === 50 && m.alive === 50, JSON.stringify(m));
  t('sandbox HUD bits are gone and cheats are not inherited', m.quit === 'Leave match' && m.read && !m.body && m.sbx === 0 && m.ic === '👥' && m.b && m.sod);
  await E(() => { const g = window.__game; g.jumpFromBus(g.player); });
  await step(0.3);
  await E(() => window.__game.player.takeDamage(500, window.__game.bots[0].ch, {}));
  await step(0.5);
  t('in a normal match dying still ends your run (placement, spectate)', await E(() => window.__game.state === 'dead' && !!window.__game.pendingResult && window.__game.aliveCount === 49));
  await wait(2500);
  t('normal match: result screen appears after the death delay', await E(() => !document.querySelector('#screen-result').classList.contains('hidden')));
}

const browser = await pw.chromium.launch({ args: ARGS });
try {
  if (ONLY !== 'touch') {
    const { ctx, page } = await load(browser, { viewport: { width: 1280, height: 720 } }, 'desktop');
    await scenario(page, false, null);
    await leakCycles(page, false);
    // persisted choices survive a reload
    await page.reload();
    await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
    const cfg = await page.evaluate(() => window.__game.sbx.cfg);
    ok('desktop: panel choices are restored after a reload', cfg.count === 10 && cfg.place === 'f40' && cfg.skill === 'pro' && cfg.rarity === 1 && cfg.tab === 'enemies', JSON.stringify(cfg));
    await ctx.close();
  }
  if (ONLY !== 'desktop') {
    const { ctx, page } = await load(browser, { ...pw.devices['Pixel 7 landscape'] }, 'touch');
    const cdp = await ctx.newCDPSession(page);
    ok('touch: touch mode auto-detected', await page.evaluate(() => window.__game.touchMode));
    await scenario(page, true, cdp);
    await leakCycles(page, true);
    await ctx.close();
  }
} finally {
  await browser.close();
}

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.name}${r.info ? '  — ' + r.info : ''}`);
}
if (perf.step40 !== undefined) console.log(`\nperf (game.step only, SwiftShader host): ${perf.step0.toFixed(2)} ms/step with no enemies, ${perf.step40.toFixed(2)} ms/step with 40 enemies`);
console.log(errors.length ? `\nconsole errors/warnings (${errors.length}):\n` + errors.slice(0, 10).join('\n') : '\nno console errors');
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed || errors.length ? 1 : 0);
