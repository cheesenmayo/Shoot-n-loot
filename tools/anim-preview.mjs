// Contact-sheet renderer for the character animation system.
//   node tools/anim-preview.mjs <sheet> [--views=tps,side,front] [--cols=6] [--tile=300x360] [--only=text] [--out=name]
// Sheets: models, heads, fpv, quick, loco, guns, allguns, reload, melee, items, hits, death, air, all. Output: tools/shots/anim-<name>.png (look at it with an image viewer).
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';
import { stageInit } from './anim-stage.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');

const args = process.argv.slice(2);
const sheetName = args.find((a) => !a.startsWith('--')) || 'loco';
const opt = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => { const [k, v = '1'] = a.slice(2).split('='); return [k, v]; }));
const tile = (opt.tile || '300x360').split('x').map(Number);
const cols = Number(opt.cols || 6);

// ---------------------------------------------------------------------------------------------------------------------
// Scenarios run inside the page: (S) => ... with S = window.__S (see anim-stage.mjs).
// ---------------------------------------------------------------------------------------------------------------------
const frames = `
  const _snap = S.snap; S.snap = (...a) => { const t = performance.now(); _snap(...a); if (S.debug) console.log('snap ' + a[0] + ' ' + (performance.now() - t).toFixed(0) + 'ms'); };
  const _step = S.step; S.step = (...a) => { const t = performance.now(); _step(...a); if (S.debug) console.log('step ' + a[0].toFixed(2) + ' ' + (performance.now() - t).toFixed(0) + 'ms'); };
`;

const GUNS = ['pistol', 'smg', 'ar', 'pump', 'bolt_sniper', 'lmg', 'rocket_launcher', 'crossbow'];
const ALL_GUNS = ['pistol', 'revolver', 'hand_cannon', 'smg', 'silenced_smg', 'ar', 'burst_ar', 'heavy_ar', 'lever', 'pump', 'tac_shotgun', 'double_barrel', 'auto_shotgun', 'bolt_sniper', 'semi_sniper', 'lmg', 'minigun', 'rocket_launcher', 'grenade_launcher', 'crossbow'];
const MELEE = ['pickaxe', 'machete', 'bat', 'katana', 'sledge'];
const FOODS = ['apple', 'banana', 'mushroom', 'jumpple', 'runana', 'floorange', 'bandage', 'medkit', 'small_shield', 'big_shield', 'slurp', 'chug_jug'];

// one scenario per weapon: ready, shoulder, ADS, muzzle flash and recoil, sprint
const gunScenario = (id) => ({ arg: id, title: `gun: ${id} (ready, aim, ADS, flash + recoil, sprint)`, views: ['tps', 'side'], run: async (S, id) => {
  const g = window.__game;
  S.reset(); const p = S.player(); const st = S.give(id, 2, 1, 999);
  const def = st.def;
  S.step(0.6); S.snap('ready');
  p.lastShotT = g.time; S.step(0.5); S.snap('aim');
  p.input.ads = true; S.step(0.5); S.snap('ADS');
  p.flashT = 0.05; p.anim.event('shoot', def.recoil); S.step(0.02); S.snap('flash');
  S.step(0.05); S.snap('+0.07'); S.step(0.1); S.snap('+0.17');
  p.input.ads = false; p.lastShotT = -99; p.input.fwd = 1; p.input.sprint = true; S.step(0.8); S.snap('sprint');
  S.stop();
} });

const reloadScenario = (id) => ({ arg: id, title: `reload: ${id}`, views: ['tps', 'side'], run: async (S, id) => {
  S.reset(); const p = S.player(); const st = S.give(id, 2, 1, 999);
  st.mag = 0; p.startReload();
  const dur = p.reload.dur;
  const fr = [0.0, 0.12, 0.28, 0.42, 0.56, 0.7, 0.84, 0.95];
  let last = 0;
  for (const f of fr) { S.step(Math.max(0, f * dur - last)); last = f * dur; S.snap('k=' + f.toFixed(2)); }
  S.step(dur); S.stop();
} });

const meleeScenario = (id) => ({ arg: id, title: `melee: ${id} (rest, swing frames at k, second swing, sprint carry)`, views: ['tps', 'side'], run: async (S, id) => {
  S.reset(); const p = S.player(); S.hold(id);
  S.step(0.5); S.snap('rest');
  p.input.fire = true; S.step(1 / 60); p.input.fire = false;
  const dur = p.swingDur;
  const fr = [0.08, 0.2, 0.32, 0.45, 0.58, 0.75, 0.92];
  let t = 1 / 60;
  for (const f of fr) { S.step(Math.max(0, f * dur - t)); t = f * dur; S.snap('k=' + f.toFixed(2)); }
  S.step(0.6);
  p.input.fire = true; S.step(1 / 60); p.input.fire = false; S.step(dur * 0.4); S.snap('2nd k=.4');
  S.step(1); p.input.fwd = 1; p.input.sprint = true; S.step(0.8); S.snap('sprint'); S.stop();
} });

const foodScenario = (id) => ({ arg: id, title: `consume: ${id}`, views: ['tps', 'side'], run: async (S, id) => {
  S.reset(); const p = S.player(); const st = S.give(id, 1, 1, 1);
  p.hp = 40; p.shield = 0;
  if (id === 'floorange') { p.place(p.pos.x, p.pos.y + 40, p.pos.z); p.grounded = false; p.vel.set(0, 0, 0); }
  S.step(0.1);
  p.using = { stack: st, t: 0, dur: st.def.time, def: st.def };
  const dur = st.def.time;
  const n = 8;
  let last = 0;
  S.snap('k=0');
  for (let i = 1; i <= n; i++) {
    const k = Math.min(0.985, i / (n + 0.4));
    S.step(Math.max(1 / 60, k * dur - last)); last = k * dur;
    if (p.using) S.snap('k=' + k.toFixed(2)); else S.snap('done');
  }
} });

const SHEETS = {
  models: [
    { title: 'characters: player + 11 bots (front / back)', views: ['front', 'back'], run: async (S) => {
      const g = window.__game;
      const cs = [g.player, ...g.bots.slice(0, 11).map((b) => b.ch)];
      for (let i = 0; i < cs.length; i++) {
        const c = cs[i];
        S.reset(c, { x: S.x, z: S.z });
        S.hold('pickaxe', c);
        S.step(0.3);
        S.snap('#' + i + ' ' + c.skill, c);
        S.reset(c, { x: S.x + 40 + i * 2.5, z: S.z + 40 }); // out of the way for the next one
      }
    } },
  ],
  fpv: [
    ...['ar', 'pistol', 'bolt_sniper', 'rocket_launcher'].map((id) => ({ arg: id, title: `first person: ${id} (ready, aim, ADS, recoil, reload, sprint)`, views: ['fpv'], run: async (S, id) => {
      const g = window.__game;
      S.reset(); const p = S.player(); p.model.head.visible = false; const st = S.give(id, 2, 1, 999);
      S.step(0.6); S.snap('ready');
      p.lastShotT = g.time; S.step(0.5); S.snap('aim');
      p.input.ads = true; S.step(0.5); S.snap('ADS');
      p.flashT = 0.05; p.anim.event('shoot', st.def.recoil); S.step(0.02); S.snap('flash'); S.step(0.08); S.snap('+0.1');
      p.input.ads = false; p.lastShotT = -99; S.step(0.4);
      st.mag = 0; p.startReload(); const dur = p.reload.dur; let last = 0;
      for (const f of [0.2, 0.4, 0.6]) { S.step(Math.max(0, f * dur - last)); last = f * dur; S.snap('reload ' + f.toFixed(1)); }
      S.step(dur); p.input.fwd = 1; p.input.sprint = true; S.step(0.8); S.snap('sprint'); S.stop();
    } })),
    { title: 'first person: melee and consumables', views: ['fpv'], run: async (S) => {
      const p = S.player(); S.reset(); p.model.head.visible = false; S.hold('pickaxe'); S.step(0.5); S.snap('pickaxe rest');
      p.input.fire = true; S.step(1 / 60); p.input.fire = false;
      let t = 1 / 60; const dur = p.swingDur;
      for (const f of [0.2, 0.35, 0.5, 0.7]) { S.step(Math.max(0, f * dur - t)); t = f * dur; S.snap('swing ' + f.toFixed(2)); }
      S.step(1); S.reset(); p.model.head.visible = false;
      const st = S.give('apple', 1, 1, 1); p.hp = 40; S.step(0.1);
      p.using = { stack: st, t: 0, dur: st.def.time, def: st.def };
      let last = 0;
      for (const k of [0.15, 0.4, 0.6, 0.85]) { S.step(Math.max(1 / 60, k * st.def.time - last)); last = k * st.def.time; if (p.using) S.snap('apple ' + k.toFixed(2)); }
    } },
  ],
  heads: [
    { title: 'faces: player + 11 bots (front / side)', views: ['face', 'faceS'], run: async (S) => {
      const g = window.__game;
      const cs = [g.player, ...g.bots.slice(0, 11).map((b) => b.ch)];
      for (let i = 0; i < cs.length; i++) {
        const c = cs[i];
        S.reset(c, { x: S.x, z: S.z });
        S.step(0.3);
        S.snap('#' + i + ' ' + c.skill, c);
        S.reset(c, { x: S.x + 40 + i * 2.5, z: S.z + 40 });
      }
    } },
  ],
  quick: [
    { title: 'idle with pickaxe', views: ['tps', 'side', 'front'], run: async (S) => {
      S.reset(); S.hold('pickaxe'); S.step(0.6);
      S.frames(1.5, 4);
    } },
  ],
  loco: [
    { title: 'idle', views: ['tps', 'side', 'front'], run: async (S) => { S.reset(); S.hold('pickaxe'); S.step(0.6); S.frames(2.4, 4); } },
    { title: 'run (walk speed 6.2 m/s)', views: ['tps', 'side', 'front'], run: async (S) => { S.reset(); S.hold('pickaxe'); S.walkTo(1, 0, false, false); S.frames(0.4, 6); S.stop(); } },
    { title: 'sprint', views: ['tps', 'side'], run: async (S) => { S.reset(); S.hold('pickaxe'); S.walkTo(1, 0, true, false); S.frames(0.36, 6); S.stop(); } },
    { title: 'crouch walk', views: ['tps', 'side'], run: async (S) => { S.reset(); S.hold('pickaxe'); S.walkTo(1, 0, false, true); S.frames(0.6, 6); S.stop(); } },
    { title: 'crouch idle', views: ['tps', 'side'], run: async (S) => { S.reset(); S.hold('pickaxe'); S.walkTo(0, 0, false, true, 0.8); S.frames(0.6, 3); S.stop(); } },
    { title: 'strafe right (aiming rifle)', views: ['tps', 'front'], run: async (S) => { S.reset(); S.give('ar'); S.player().lastShotT = window.__game.time + 5; S.walkTo(0, 1, false, false); S.frames(0.4, 6); S.stop(); } },
    { title: 'backpedal (aiming rifle)', views: ['tps', 'side'], run: async (S) => { S.reset(); S.give('ar'); S.player().lastShotT = window.__game.time + 5; S.walkTo(-1, 0, false, false); S.frames(0.4, 6); S.stop(); } },
    { title: 'start / stop', views: ['side'], run: async (S) => {
      S.reset(); S.hold('pickaxe'); S.step(0.3);
      S.subject.input.fwd = 1; for (let i = 0; i < 6; i++) { S.step(0.04); S.snap('start ' + (i * 0.04 + 0.04).toFixed(2)); }
      S.step(0.5); S.subject.input.fwd = 0; for (let i = 0; i < 6; i++) { S.snap('stop ' + (i * 0.05).toFixed(2)); S.step(0.05); }
    } },
    { title: 'jump / land', views: ['side'], run: async (S) => {
      S.reset(); S.hold('pickaxe'); S.step(0.3);
      const p = S.subject; p.input.jumpPressed = true; S.step(1 / 60);
      let t0 = 0;
      for (const t of [0.03, 0.12, 0.2, 0.3, 0.4, 0.5]) { S.step(t - t0); t0 = t; S.snap('t=' + t); }
      S.step(0.3); S.snap('land+0.1'); S.step(0.15); S.snap('land+0.25'); S.step(0.4); S.snap('recover');
    } },
  ],
  guns: GUNS.map(gunScenario),
  allguns: ALL_GUNS.map(gunScenario),
  reload: ['pistol', 'smg', 'ar', 'pump', 'bolt_sniper', 'lever', 'lmg', 'rocket_launcher', 'crossbow', 'revolver'].map(reloadScenario),
  melee: MELEE.map(meleeScenario),
  items: FOODS.map(foodScenario),
  hits: [
    { title: 'hit reactions (light from front / back / right / left, headshot, heavy)', views: ['side', 'front'], run: async (S) => {
      const dirs = [['front', 0, 0, 1], ['back', 0, 0, -1], ['right', -1, 0, 0], ['left', 1, 0, 0]];
      for (const [name, dx, dy, dz] of dirs) {
        S.reset(); S.give('ar'); S.step(0.5);
        const p = S.player(); const d = p.lastHitDir.clone().set(dx, dy, dz);
        S.snap(name + ' before');
        p.takeDamage(20, null, { dir: d });
        S.step(0.06); S.snap('+0.06'); S.step(0.08); S.snap('+0.14'); S.step(0.16); S.snap('+0.3'); S.step(0.7); S.snap('+1');
      }
      S.reset(); S.give('ar'); S.step(0.5); let p = S.player();
      p.takeDamage(30, null, { dir: p.lastHitDir.clone().set(0, 0, 1), headshot: true });
      S.step(0.05); S.snap('head +0.05'); S.step(0.1); S.snap('+0.15'); S.step(0.2); S.snap('+0.35'); S.step(0.8); S.snap('+1.1');
      S.reset(); S.hold('pickaxe'); S.step(0.5); p = S.player();
      p.takeDamage(40, null, { dir: p.lastHitDir.clone().set(0, 0, 1), melee: true }); p.vel.z += 6;
      S.step(0.1); S.snap('melee +0.1'); S.step(0.15); S.snap('+0.25'); S.step(0.3); S.snap('+0.55');
    } },
    { title: 'launched by an explosion (tumble)', views: ['side', 'wide'], run: async (S) => {
      S.reset(); S.hold('pickaxe'); S.step(0.5); const p = S.player();
      p.vel.set(5, 14, 6); p.grounded = false; p.pos.y += 0.1;
      let t0 = 0;
      for (const t of [0.05, 0.2, 0.4, 0.7, 1.0, 1.4, 1.8]) { S.step(t - t0); t0 = t; S.snap('t=' + t); }
    } },
  ],
  death: [
    { title: 'death: shot from the front / back / side / headshot / explosion', views: ['wide', 'top'], run: async (S) => {
      const variants = [['front', 0, 1, {}], ['back', 0, -1, {}], ['side', -1, 0, {}], ['headshot', 0, 1, { headshot: true }], ['explosion', 1, 1, { explosive: true }]];
      for (const [name, dx, dz, extra] of variants) {
        const c = S.dummy(0);
        S.reset(c); S.give('ar', 2, 1, 100, c); S.step(0.3);
        const d = c.lastHitDir.clone().set(dx, 0, dz).normalize();
        c.takeDamage(500, null, { dir: d, weapon: c.stack.def, ...extra });
        if (extra.explosive) c.vel.set(dx * 6, 8, dz * 6);
        let t0 = 0;
        for (const t of [0.12, 0.3, 0.5, 0.8, 1.4, 3.0]) { S.step(t - t0); t0 = t; S.snap(name + ' +' + t, c); }
      }
    } },
  ],
  air: [
    { title: 'skydive: neutral / dive / slow, steering', views: ['tps', 'side', 'front'], run: async (S) => {
      S.reset(); const p = S.player(); p.place(p.pos.x, p.pos.y + 300, p.pos.z); p.setMode('skydive');
      S.step(0.6); S.snap('neutral'); p.input.fwd = 1; S.step(0.8); S.snap('dive'); p.input.fwd = -1; S.step(0.8); S.snap('slow'); p.input.fwd = 0; p.input.strafe = 1; S.step(0.8); S.snap('steer');
    } },
    { title: 'glide: neutral / bank / dive', views: ['tps', 'side', 'front'], run: async (S) => {
      S.reset(); const p = S.player(); p.place(p.pos.x, p.pos.y + 300, p.pos.z); p.setMode('glide'); p.vel.set(0, -9, -12);
      S.step(0.6); S.snap('neutral'); p.input.strafe = 1; S.step(0.8); S.snap('bank'); p.input.strafe = 0; p.input.fwd = 1; S.step(0.8); S.snap('dive');
    } },
    { title: 'swim: tread / crawl', views: ['side', 'front'], run: async (S) => {
      S.reset(null, { x: S.wx, z: S.wz, y: -0.95 }); const p = S.player();
      S.step(0.5); S.snap('tread'); S.step(0.4); S.snap('tread +0.4');
      p.input.fwd = 1; S.step(0.8); for (let i = 0; i < 4; i++) { S.step(0.2); S.snap('crawl ' + i); }
    } },
    { title: 'boogie bomb dance (5 moves)', views: ['front', 'side'], run: async (S) => {
      S.reset(); S.hold('ar'); const p = S.player(); p.danceT = 8; S.step(0.2);
      let t0 = 0.2;
      for (const t of [0.5, 0.9, 1.3, 1.8, 2.2, 2.6, 3.1, 3.5, 3.9, 4.4, 5.0, 5.7]) { S.step(t - t0); t0 = t; S.snap('t=' + t); }
    } },
    { title: 'grenade throw', views: ['tps', 'side'], run: async (S) => {
      S.reset(); const p = S.player(); S.give('frag', 1, 1); p.inv.slots[1].count = 3; S.step(0.4); S.snap('grenade carry');
      p.aimDir.set(0, 0.2, -1).normalize(); p.input.firePressed = true; S.step(1 / 60);
      let t0 = 1 / 60;
      for (const t of [0.05, 0.12, 0.2, 0.27, 0.34, 0.45, 0.6]) { S.step(t - t0); t0 = t; S.snap('throw +' + t); }
    } },
  ],
};

/** Lays the captured tiles out as HTML grids (one image per ~1500 px of height) and screenshots them: a plain page, so it is fast. */
async function composeSheet(browser, data, cols, tile, file) {
  const esc = (t) => String(t).replace(/[&<]/g, (c) => ({ '&': '&amp;', '<': '&lt;' })[c]);
  const pages = [];
  let html = '', h = 0;
  const flush = () => { if (html) pages.push(html); html = ''; h = 0; };
  for (const sc of data) {
    const rows = sc.views.reduce((n, v) => n + Math.ceil(sc.frames.filter((f) => f.v === v).length / cols), 0);
    const need = 24 + rows * tile[1];
    if (h > 0 && h + need > 1600) flush();
    html += `<div style="background:#1d2736;color:#ffd86b;font:bold 14px monospace;padding:3px 8px">${esc(sc.title)}</div>`;
    h += 24;
    for (const v of sc.views) {
      const fr = sc.frames.filter((f) => f.v === v);
      for (let i = 0; i < fr.length; i += cols) {
        html += '<div style="display:flex">';
        for (const f of fr.slice(i, i + cols)) {
          html += `<div style="position:relative;width:${tile[0]}px;height:${tile[1]}px"><img src="${f.url}" width="${tile[0]}" height="${tile[1]}" style="display:block"><span style="position:absolute;left:0;top:0;right:0;background:rgba(0,0,0,.55);color:#fff;padding:1px 4px">${esc(f.v + ' ' + f.label)}</span></div>`;
        }
        html += '</div>';
        h += tile[1];
      }
    }
  }
  flush();
  const files = [];
  for (let i = 0; i < pages.length; i++) {
    const pg = await browser.newPage({ viewport: { width: tile[0] * cols, height: 400 } });
    await pg.setContent(`<body style="margin:0;background:#10141c;width:${tile[0] * cols}px;font:11px monospace">${pages[i]}</body>`);
    const f = pages.length > 1 ? file.replace(/\.png$/, `-${i + 1}.png`) : file;
    await pg.screenshot({ path: f, fullPage: true });
    await pg.close();
    files.push(f);
  }
  return files;
}

// ---------------------------------------------------------------------------------------------------------------------
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: tile[0], height: tile[1] } });
const errors = [];
page.on('console', (m) => { if (opt.debug) console.log('[page]', m.text()); else if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}\n${(e.stack || '').split('\n').slice(0, 6).join('\n')}`));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
await page.evaluate(stageInit);
await page.evaluate(`(() => { const S = window.__S; S.tile = ${JSON.stringify(tile)}; S.debug = ${!!opt.debug}; ${frames} S.init(); })()`);
const list = sheetName === 'all' ? Object.keys(SHEETS).filter((k) => k !== 'quick') : [sheetName];
for (const name of list) {
  const scenarios = SHEETS[name];
  if (!scenarios) { console.log('unknown sheet', name, 'available:', Object.keys(SHEETS).join(', ')); process.exit(1); }
  await page.evaluate('window.__S.clearSheet()');
  for (const sc of scenarios) {
    if (opt.only && !opt.only.split(',').some((k) => sc.title.includes(k))) continue;
    const views = opt.views ? opt.views.split(',') : sc.views;
    const r = await page.evaluate(`(async () => { const S = window.__S; S.begin(${JSON.stringify(sc.title)}, ${JSON.stringify(views)}); await (${sc.run.toString()})(S, ${JSON.stringify(sc.arg ?? null)}); return 'ok'; })()`).catch((e) => 'ERROR ' + e.message.split('\n').slice(0, 5).join(' | '));
    if (r !== 'ok') console.log(`scenario "${sc.title}":`, r);
  }
  const data = await page.evaluate('window.__S.sheet.map((sc) => ({ title: sc.title, views: sc.views, frames: sc.frames }))');
  mkdirSync(join(root, 'tools/shots'), { recursive: true });
  const file = join(root, 'tools/shots', `anim-${opt.out || name}.png`);
  const files = await composeSheet(browser, data, cols, tile, file);
  console.log('wrote', files.join(' '));
}
if (errors.length) console.log('--- console ---\n' + errors.slice(0, 20).join('\n'));
await browser.close();
