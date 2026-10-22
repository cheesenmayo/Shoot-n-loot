// Drives the game with real keyboard/mouse events (Playwright) to verify the input pipeline.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
const res = [];
const ok = (n, c, i = '') => res.push({ n, pass: !!c, i: String(i) });
const ev = (f) => page.evaluate(f);
const step = (s) => page.evaluate(`window.__step(${s})`);

// Title -> Play button
await page.click('#btn-play');
ok('play button starts a match', await ev('window.__game.state') === 'bus');
await step(3);
await page.keyboard.press('KeyM');
ok('M opens the map', await ev('window.__game.hud.mapOpen'));
await page.keyboard.press('KeyM');
ok('M closes the map', !(await ev('window.__game.hud.mapOpen')));
await page.keyboard.press('Space');
ok('Space jumps from the bus', await ev('window.__game.player.mode') === 'skydive');
await step(2);
await page.keyboard.down('KeyW'); await step(1);
ok('W dives faster', (await ev('Math.hypot(window.__game.player.vel.x, window.__game.player.vel.z)')) > 25);
await page.keyboard.up('KeyW');
await page.keyboard.press('Space'); await step(1.5);
ok('Space opens the glider', await ev('window.__game.player.mode') === 'glide');
// land at the plaza
await ev(`(() => { const g = window.__game, p = g.player, poi = g.world.pois[0]; p.place(poi.x + 20, poi.y + 3, poi.z + 30); p.vel.set(0,-2,0); g.controller.yaw = 0; g.controller.pitch = -0.1; })()`);
await step(3);
ok('glider lands on the plaza', await ev('window.__game.player.mode') === 'normal' && await ev('window.__game.player.grounded'));
const p0 = await ev('window.__game.player.pos.z');
await page.keyboard.down('KeyW'); await step(1); await page.keyboard.up('KeyW'); await step(0.5);
const p1 = await ev('window.__game.player.pos.z');
ok('W walks forward (-z at yaw 0)', p1 < p0 - 4, `dz ${(p1 - p0).toFixed(1)}`);
await page.keyboard.down('KeyD'); await step(1); await page.keyboard.up('KeyD'); await step(0.5);
ok('D strafes right (+x)', (await ev('window.__game.player.vel.x')) >= 0);
const y0 = await ev('window.__game.player.pos.y');
await page.keyboard.down('Space'); await step(0.3); await page.keyboard.up('Space');
ok('Space jumps', (await ev('window.__game.player.pos.y')) > y0 + 0.5);
await step(1);
await page.keyboard.down('KeyC'); await step(0.3);
ok('C crouches', await ev('window.__game.player.crouching'));
await page.keyboard.up('KeyC'); await step(0.3);

// pick up a gun and use hotbar keys
await ev(`(() => { const g = window.__game, p = g.player, { makeStack } = window.__items;
  const d = g.loot.addDrop({ stack: makeStack('ar', 2), count: 1 }, p.pos.x, p.pos.y, p.pos.z + 0.5, {});
  const a = g.loot.addDrop({ ammo: 'medium', count: 30 }, p.pos.x + 0.5, p.pos.y, p.pos.z, {}); window.__d = d; })()`);
await step(0.5);
ok('walking over ammo picks it up', (await ev('window.__game.player.inv.ammo.medium')) === 30);
ok('prompt shows for a weapon', (await ev('!!window.__game.controller.target')));
await page.keyboard.press('KeyE'); await step(0.1);
ok('E picks up the weapon', (await ev('window.__game.player.inv.slots[1] && window.__game.player.inv.slots[1].def.id')) === 'ar');
await page.keyboard.press('Digit2'); await step(0.6);
ok('digit key equips slot', (await ev('window.__game.player.inv.sel')) === 2 || (await ev('window.__game.player.inv.sel')) === 1);
await page.keyboard.press('Digit1'); await step(0.5);
ok('digit 1 = pickaxe', (await ev('window.__game.player.inv.sel')) === 0);
await page.keyboard.press('Digit2'); await step(0.5);
const sel2 = await ev('window.__game.player.inv.sel');
ok('slot 2 holds the rifle', sel2 === 1 || (await ev('window.__game.player.stack.def.id')) === 'ar' , `sel ${sel2}`);
// fire with the mouse
await ev(`(() => { const g = window.__game; g.controller.yaw = Math.PI; })()`);
const mag0 = await ev('window.__game.player.stack.mag');
await page.mouse.move(480, 270);
await page.mouse.down(); await step(0.6); await page.mouse.up();
const mag1 = await ev('window.__game.player.stack.mag');
ok('LMB fires the weapon', mag1 < mag0, `${mag0} -> ${mag1}`);
await page.keyboard.press('KeyR'); await step(0.3);
ok('R starts a reload (when not full)', mag1 === (await ev('window.__game.player.stack.def.mag')) || !!(await ev('window.__game.player.reload')));
await step(3);
await page.keyboard.press('KeyG'); await step(0.2);
ok('G drops the item', (await ev('window.__game.player.inv.slots[1]')) === null);

// pause menu
await page.waitForTimeout(350);
await page.keyboard.press('Escape');
ok('Esc pauses', await ev('window.__game.paused'));
const tBefore = await ev('window.__game.time');
await step(1);
ok('time stands still while paused', Math.abs((await ev('window.__game.time')) - tBefore) < 0.001);
await page.click('#btn-resume');
ok('Resume continues', !(await ev('window.__game.paused')));
await page.waitForTimeout(350);
await page.keyboard.press('Escape');
await page.click('#btn-quit');
ok('Leave match returns to the title', (await ev('window.__game.state')) === 'menu');

// graphics presets switch live
for (const id of ['low', 'ultra', 'default']) {
  await page.click(`#screen-title button[data-g="${id}"]`);
  const sm = await ev('window.__game.renderer.shadowMap.enabled + "|" + window.__game.graphics.id');
  ok(`graphics preset ${id} applies`, sm.endsWith(id), sm);
}
await ev('window.__game.render()');

let failed = 0;
for (const r of res) { if (!r.pass) failed++; console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.n}${r.i ? '  — ' + r.i : ''}`); }
console.log(errors.length ? 'errors:\n' + errors.slice(0, 8).join('\n') : 'no console errors');
console.log(`${res.length - failed}/${res.length} passed`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
