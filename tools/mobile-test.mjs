// Mobile test: emulates a touch phone (Playwright device profile + CDP multi-touch).
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
const pw = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const SHOTS = process.argv.includes('--shots');

const browser = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const ctx = await browser.newContext({ ...pw.devices['Pixel 7 landscape'] });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const cdp = await ctx.newCDPSession(page);
const active = new Map();
const send = (type) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: [...active.values()].map((p) => ({ x: p.x, y: p.y, id: p.id })) });
const down = async (id, x, y) => { active.set(id, { id, x, y }); await send('touchStart'); };
const moveTo = async (id, x, y) => { active.set(id, { id, x, y }); await send('touchMove'); };
const up = async (id) => { active.delete(id); await send('touchEnd'); };
const center = async (sel) => { const b = await page.locator(sel).boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
const tapSel = async (sel, id = 1) => { const c = await center(sel); await down(id, c.x, c.y); await up(id); };
const ev = (f) => page.evaluate(f);
const step = (s) => page.evaluate(`window.__step(${s})`);
const res = [];
const ok = (n, c, i = '') => res.push({ n, pass: !!c, i: String(i) });
const vp = page.viewportSize();

ok('touch mode auto-detected on a phone', await ev('window.__game.touchMode'));
ok('phones start on Low graphics', (await ev('window.__game.graphics.id')) === 'low');
ok('antialias off on phones', !(await ev('window.__game.renderer.getContext().getContextAttributes().antialias')));

// start the match with a tap on PLAY
await tapSel('#btn-play');
await step(2);
ok('tapping PLAY starts a match', (await ev('window.__game.state')) === 'bus');
ok('touch layer is visible during the match', await ev("!document.getElementById('touch').classList.contains('hidden')"));
ok('no pointer lock requested on touch', !(await ev('window.__game.controller.fallbackLook')));
if (SHOTS) { await ev('window.__game.render()'); await page.screenshot({ path: join(root, 'tools/shots/m-bus.png') }); }

// jump from the bus with the JUMP button
await tapSel('.tjump');
await step(0.1);
ok('JUMP button drops you from the bus', (await ev('window.__game.player.mode')) === 'skydive');
await step(2);
// stick forward = dive
const jb = await center('.tjump');
await down(1, 160, vp.height - 120);
await moveTo(1, 160, vp.height - 190);
await step(1);
ok('stick up dives forward', (await ev('window.__game.player.input.fwd')) > 0.5 && (await ev('Math.hypot(window.__game.player.vel.x, window.__game.player.vel.z)')) > 25, await ev('window.__game.player.input.fwd'));
await up(1);
await tapSel('.tjump', 2);
await step(1.5);
ok('JUMP opens the glider', (await ev('window.__game.player.mode')) === 'glide');

// land at the plaza with a weapon
await ev(`(() => { const g = window.__game, p = g.player, poi = g.world.pois[0], { makeStack } = window.__items;
  p.place(poi.x + 20, poi.y + 3, poi.z + 30); p.vel.set(0,-2,0);
  p.inv.slots[1] = makeStack('ar', 2); p.inv.ammo.medium = 90; p.inv.slots[2] = makeStack('medkit', 1, 2);
  g.controller.yaw = 0; g.controller.pitch = -0.1; })()`);
await step(3);
ok('lands on the ground', await ev("window.__game.player.mode === 'normal' && window.__game.player.grounded"));
await step(1);
const yaw0 = await ev('window.__game.controller.yaw');
const z0 = await ev('window.__game.player.pos.z');

// two fingers at once: left stick walks forward while right finger looks around
await down(1, 150, vp.height - 110);
await moveTo(1, 150, vp.height - 190);
await down(2, vp.width * 0.65, vp.height * 0.45);
await moveTo(2, vp.width * 0.65 + 120, vp.height * 0.45);
await step(1);
const yaw1 = await ev('window.__game.controller.yaw');
const z1 = await ev('window.__game.player.pos.z');
ok('right-side drag turns the camera', Math.abs(yaw1 - yaw0) > 0.3, `yaw ${(yaw1 - yaw0).toFixed(2)}`);
ok('left stick walks while looking (multi-touch)', Math.hypot(z1 - z0, 0) > 3 || (await ev('Math.hypot(window.__game.player.vel.x, window.__game.player.vel.z)')) > 4, `dz ${(z1 - z0).toFixed(1)}`);
await up(2); await up(1);
await step(0.5);

// sprint when the stick is pushed fully forward
await down(1, 150, vp.height - 110);
await moveTo(1, 150, vp.height - 200);
await step(1);
ok('pushing the stick fully sprints', await ev('window.__game.player.sprinting'));
await up(1);
await step(0.4);

// hotbar tap
const slotCenter = await center('#hotbar .slot[data-i="1"]');
await down(1, slotCenter.x, slotCenter.y); await up(1);
await step(0.6);
ok('tapping a hotbar slot equips it', (await ev('window.__game.player.inv.sel')) === 1);

// fire while dragging to aim
const mag0 = await ev('window.__game.player.stack.mag');
const fire = await center('.tfire');
await down(3, fire.x, fire.y);
await moveTo(3, fire.x - 25, fire.y - 10);
await step(0.7);
const mag1 = await ev('window.__game.player.stack.mag');
ok('holding FIRE shoots', mag1 < mag0, `${mag0} -> ${mag1}`);
await up(3);

// reload / crouch / ADS buttons
await tapSel('.treload');
await step(0.2);
ok('RELOAD button reloads', await ev('!!window.__game.player.reload') || (await ev('window.__game.player.stack.mag')) === (await ev('window.__game.player.stack.def.mag')));
await tapSel('.tcrouch');
await step(0.3);
ok('crouch button toggles crouch', await ev('window.__game.player.crouching'));
await tapSel('.tcrouch');
await step(3.5);
await tapSel('.tads');
await step(0.4);
ok('aim button toggles ADS', await ev('window.__game.player.ads'));
await tapSel('.tads');
await step(0.3);

// pick up loot via the contextual button
await ev(`(() => { const g = window.__game, p = g.player, { makeStack } = window.__items;
  g.loot.addDrop({ stack: makeStack('revolver', 2), count: 1 }, p.pos.x, p.pos.y, p.pos.z + 1.0, {}); })()`);
await step(0.5);
ok('PICK UP button appears next to loot', await ev("document.querySelector('.tinteract').classList.contains('show')"));
await tapSel('.tinteract');
await step(0.2);
ok('tapping PICK UP takes the item', (await ev('window.__game.player.inv.slots.some(s => s && s.def.id === "revolver")')));
await step(0.3);
ok('PICK UP button hides again', !(await ev("document.querySelector('.tinteract').classList.contains('show')")));

// chest: hold OPEN
await ev(`(() => { const g = window.__game, p = g.player;
  const c = g.loot.chests.find(c => !c.elevated && !c.opened && Math.hypot(c.x - g.world.pois[0].x, c.z - g.world.pois[0].z) < 50 && Math.abs(c.y - g.world.pois[0].y) < 1);
  p.place(c.x + 1.2, c.y, c.z); p.grounded = true; window.__chest = c; })()`);
await step(0.3);
const open = await center('.tinteract');
await down(4, open.x, open.y);
await step(1.6);
ok('holding OPEN opens a chest', await ev('window.__chest.opened'));
await up(4);

// aim assist bends bullets toward a nearby enemy
await ev(`(() => { const g = window.__game, p = g.player; for (const b of g.bots) b.update = () => {};
  const poi = g.world.pois[0]; const px = poi.x - 20, pz = poi.z + 36;
  p.place(px, g.world.collision.groundAt(px, pz, poi.y + 1, 0.6), pz); p.grounded = true; p.vel.set(0,0,0);
  const d = g.bots[0].ch; d.alive = true; d.setMode('normal'); const x = px, z = pz - 25;
  d.place(x, g.world.collision.groundAt(x, z, p.pos.y + 1, 0.6), z); d.grounded = true; d.hp = 1000; d.vel.set(0,0,0); Object.assign(d.input, { fwd: 0, strafe: 0, sprint: false, fire: false, crouch: false, jump: false });
  g.controller.yaw = 0.02; g.controller.pitch = 0.0; window.__dummy = d; p.inv.sel = 0; p.equip(1); p.equipT = 0; p.inv.slots[1].mag = 30; })()`);
await step(0.5);
ok('aim assist locks onto an enemy near the crosshair', await ev('window.__game.controller.assisting'), await ev(`JSON.stringify({ alive: window.__game.player.alive, hp: window.__game.player.hp, mode: window.__game.player.mode, touch: window.__game.touchMode, assist: window.__game.player.assistTarget && window.__game.player.assistTarget.name, yaw: window.__game.controller.yaw, pitch: window.__game.controller.pitch, dummyAlive: window.__dummy.alive, dummyMode: window.__dummy.mode, dpos: window.__dummy.pos.toArray().map(v => +v.toFixed(1)), ppos: window.__game.player.pos.toArray().map(v => +v.toFixed(1)), crouch: window.__game.player.crouching, clear: (() => { const g = window.__game, p = g.player, d = window.__dummy; return g.world.collision.clearLine(p.pos.x, p.pos.y + p.eyeHeight, p.pos.z, d.pos.x, d.pos.y + 1.15, d.pos.z); })() })`));
await down(5, fire.x, fire.y);
await step(1.2);
await up(5);
ok('assisted shots land', (await ev('1000 - window.__dummy.hp')) > 20, `${await ev('Math.round(1000 - window.__dummy.hp)')} dmg`);

// pause button / resume
await tapSel('.top-l');
ok('pause button pauses', await ev('window.__game.paused'));
ok('touch layer hides while paused', await ev("document.getElementById('touch').classList.contains('hidden')"));
if (SHOTS) { await ev('window.__game.render()'); await page.screenshot({ path: join(root, 'tools/shots/m-pause.png') }); }
await page.touchscreen.tap(...Object.values(await center('#btn-resume')));
ok('resume works with a tap', !(await ev('window.__game.paused')));
await step(0.2);

// map button + tap to close
await tapSel('.top-l2');
ok('map button opens the map', await ev('window.__game.hud.mapOpen'));
await page.touchscreen.tap(vp.width / 2, vp.height / 2);
ok('tapping the map closes it', !(await ev('window.__game.hud.mapOpen')));
await step(0.2);

// death -> spectate controls
await ev('window.__game.player.die(window.__game.bots[2].ch, {weapon:{icon:"x"}})');
await step(1);
ok('NEXT button shows while spectating', await ev("document.getElementById('touch').classList.contains('dead')"));

// portrait asks for landscape and pauses
await ev('window.__game.returnToMenu()');
await page.setViewportSize({ width: 412, height: 915 });
await page.waitForTimeout(300);
ok('portrait shows the rotate prompt', await ev("!document.getElementById('screen-rotate').classList.contains('hidden')"));
await page.setViewportSize({ width: 915, height: 412 });
await page.waitForTimeout(300);
ok('landscape hides the rotate prompt', await ev("document.getElementById('screen-rotate').classList.contains('hidden')"));

let failed = 0;
for (const r of res) { if (!r.pass) failed++; console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.n}${r.i ? '  — ' + r.i : ''}`); }
console.log(errors.length ? 'errors:\n' + errors.slice(0, 8).join('\n') : 'no console errors');
console.log(`${res.length - failed}/${res.length} passed`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
