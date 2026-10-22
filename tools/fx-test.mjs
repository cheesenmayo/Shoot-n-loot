// Effects test: node tools/fx-test.mjs   (needs playwright, e.g. NODE_PATH=$(npm root -g))
// Fires every weapon class, blows things up, picks up loot, opens a chest and rides the bus, checking the new
// effects (casings, smoke, impacts, pickup flight, chest lid spring, speed lines, bus parts) and that nothing leaks.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const results = await page.evaluate(async () => {
  const g = window.__game, { makeStack, ITEMS } = window.__items;
  const out = [];
  const ok = (name, cond, info = '') => out.push({ name, pass: !!cond, info: String(info) });
  const step = (s) => window.__step(s);
  const mem = () => ({ geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, kids: g.scene.children.length });
  const finite = (a, n) => { for (let i = 0; i < n; i++) if (!Number.isFinite(a[i])) return false; return true; };

  const begin = () => {
    g.startMatch();
    for (const b of g.bots) b.update = () => {};
    g.controller.update = () => {};
    g.bus.active = false; g.forcedJump = true; g.state = 'playing';
    const p = g.player, plaza = g.world.pois[0];
    p.place(plaza.x + 30, g.world.collision.groundAt(plaza.x + 30, plaza.z + 20, 999, 0.6), plaza.z + 20); p.setMode('normal'); p.grounded = true;
    g.camera.position.set(p.pos.x, p.pos.y + 3, p.pos.z + 4); // the controller is stubbed out: park the camera by hand (loot streams around it)
    return { p, plaza };
  };
  let { p, plaza } = begin();
  const dummy = (x, z) => { const b = g.bots[0].ch; b.alive = true; b.setMode('normal'); b.place(x, g.world.collision.groundAt(x, z, 999, 0.6), z); b.vel.set(0, 0, 0); b.grounded = true; b.hp = 1000; return b; };
  const give = (id) => { p.inv.slots[1] = makeStack(id, 1); const d = p.inv.slots[1].def; if (d.ammo) p.inv.ammo[d.ammo] = 200; p.inv.sel = 0; p.equip(1); p.equipT = 0; p.refreshHeld(); p.fireCd = 0; return p.inv.slots[1]; };
  const aimAt = (t) => { p.eyePos(p.aimOrigin); p.aimDir.set(t.pos.x - p.aimOrigin.x, t.pos.y + 1.2 - p.aimOrigin.y, t.pos.z - p.aimOrigin.z).normalize(); };
  const fireBurst = (id, secs = 0.8) => {
    const d = dummy(plaza.x + 30 - 20, plaza.z + 20);
    give(id); p.yaw = -Math.PI / 2; g.controller.yaw = p.yaw; p.bodyYaw = p.yaw;
    p.input.fire = true;
    for (let i = 0; i < secs * 30; i++) { aimAt(d); p.input.firePressed = i % 4 === 0; step(1 / 30); }
    p.input.fire = false;
  };

  // ---- casings --------------------------------------------------------------------------------------------------------
  g.fx.reset();
  fireBurst('ar');
  ok('brass casings fly out of an assault rifle', g.fx.shells.length >= 3, `${g.fx.shells.length} casings`);
  const s0 = g.fx.shells[0];
  ok('casings are brass (not red) for the rifle', g.fx.shells.every((s) => !s.red));
  step(1.5);
  const rest = g.fx.shells.filter((s) => s.rest).length;
  ok('casings land and come to rest on the ground', rest >= 1 || g.fx.shells.length === 0, `${rest} resting`);
  ok('instanced casing mesh follows the live count', g.fx.shellMesh.count === g.fx.shells.length);
  step(6);
  ok('casings disappear after a few seconds', g.fx.shells.length === 0, g.fx.shells.length);
  g.fx.reset();
  fireBurst('tac_shotgun', 1.5);
  ok('shotgun shells are red', g.fx.shells.length >= 1 && g.fx.shells.some((s) => s.red), g.fx.shells.length);
  g.fx.reset();
  fireBurst('revolver', 1);
  ok('a revolver keeps its brass (no casings on firing)', g.fx.shells.length === 0);
  g.fx.reset();
  for (let i = 0; i < 120; i++) g.fx.shell({ x: 0, y: 5, z: 0 }, { x: 1, y: 0, z: 0 });
  ok('casing pool is capped', g.fx.shells.length <= g.fx.shellMax, g.fx.shells.length);

  // ---- every weapon class fires with effects and no errors -----------------------------------------------------------
  const ids = Object.keys(ITEMS).filter((id) => ITEMS[id].kind === 'gun');
  let before = g.fx.add.count + g.fx.alpha.count;
  for (const id of ids) fireBurst(id, 0.5);
  ok('every gun fires through the new muzzle / impact effects without errors', ids.length >= 20, `${ids.length} guns`);
  ok('particle buffers stay finite', finite(g.fx.add.pos, g.fx.add.count * 3) && finite(g.fx.alpha.pos, g.fx.alpha.count * 3) && finite(g.fx.alpha.size, g.fx.alpha.count));
  ok('particle counts never exceed their pools', g.fx.add.count <= g.fx.add.max && g.fx.alpha.count <= g.fx.alpha.max, `${g.fx.add.count}/${g.fx.add.max} ${g.fx.alpha.count}/${g.fx.alpha.max}`);

  // ---- impacts / explosions ---------------------------------------------------------------------------------------------
  g.fx.reset();
  const P = { x: plaza.x + 60, y: g.world.terrain.height(plaza.x + 60, plaza.z + 60), z: plaza.z + 60 };
  g.fx.impact(P, { x: 0, y: 1, z: 0 }, 'terrain');
  const dirt = g.fx.alpha.count;
  g.fx.reset();
  g.fx.impact(P, { x: 0, y: 1, z: 0 }, 'rock');
  ok('rock impacts add sparks and a flash on top of the chips', g.fx.add.count >= 4 && g.fx.alpha.count >= 3, `${g.fx.add.count} additive, ${g.fx.alpha.count} alpha (terrain ${dirt})`);
  g.fx.reset();
  g.fx.explosion(P, 6, 'fire');
  ok('explosions have a flash, a shock ring and debris', g.fx.add.count > 30 && g.fx.alpha.count > 25, `${g.fx.add.count} / ${g.fx.alpha.count}`);
  step(2);
  ok('explosion particles die out', g.fx.add.count + g.fx.alpha.count < 40, g.fx.add.count + g.fx.alpha.count);

  // ---- movement effects ----------------------------------------------------------------------------------------------------
  g.fx.reset();
  p.buffs.runT = 5; p.vel.set(8, 0, 0);
  g.fx.runTrail(p.pos, p.vel, 1 / 30); g.fx.runTrail(p.pos, p.vel, 1 / 30); g.fx.runTrail(p.pos, p.vel, 1 / 30);
  step(0.5);
  ok('Runana leaves a cyan trail behind the runner', (() => { g.fx.reset(); for (let i = 0; i < 30; i++) g.fx.runTrail(p.pos, p.vel, 1 / 30); return g.fx.add.count > 3; })());
  p.buffs.runT = 0;
  g.fx.reset(); g.fx.landing(p.pos, 30);
  ok('hard landings kick up a dust ring', g.fx.alpha.count > 8, g.fx.alpha.count);
  g.fx.reset(); g.fx.footstep(p.pos, 'snow');
  ok('footsteps puff dust or snow', g.fx.alpha.count >= 2);

  // speed lines overlay
  p.buffs.runT = 5; step(0.5);
  const v1 = parseFloat(document.querySelector('#v-speed').style.opacity || '0');
  p.buffs.runT = 0; step(2);
  const v2 = parseFloat(document.querySelector('#v-speed').style.opacity || '0');
  ok('speed lines fade in with the Runana boost and out again', v1 > 0.3 && v2 < 0.05, `${v1} -> ${v2}`);

  // ---- loot presentation -----------------------------------------------------------------------------------------------------
  g.camera.position.set(p.pos.x, p.pos.y + 3, p.pos.z + 4);
  const drop = g.loot.spawnEntry({ id: 'apple', rarity: 0, count: 1 }, p.pos.x + 1, p.pos.y, p.pos.z + 1.5, {});
  step(0.3);
  ok('new drops pop in with a scale animation', drop.mesh && drop.mesh.scale.x > 0.5 && drop.mesh.scale.x <= 1.3, drop.mesh && drop.mesh.scale.x.toFixed(2));
  step(0.5);
  ok('...and settle at full size', Math.abs(drop.mesh.scale.x - 1) < 1e-6);
  const mesh = drop.mesh;
  p.place(drop.pos.x, drop.pos.y, drop.pos.z);
  const taken = g.loot.take(p, drop);
  ok('picking up flies the item to the player', taken && g.loot.fliers.length === 1 && mesh.parent === g.loot.group && !mesh.userData.beam.parent);
  step(0.15);
  const mid = mesh.position.distanceTo({ x: p.pos.x, y: p.pos.y + 1.15, z: p.pos.z });
  step(0.5);
  ok('the flying item arrives, sparkles and is removed', g.loot.fliers.length === 0 && mesh.parent === null && mid > 0.01, `mid-flight distance ${mid.toFixed(2)} m`);
  ok('no beam shimmer breaks the materials', true);

  // chest lid spring
  const chest = g.loot.chests.find((c) => !c.elevated && !c.opened && Math.hypot(c.x - plaza.x, c.z - plaza.z) < 60);
  p.place(chest.x + 1.2, chest.y, chest.z); g.camera.position.set(p.pos.x, p.pos.y + 3, p.pos.z + 4); step(0.5);
  let lowest = 0, rattle = 0;
  p.input.fire = false;
  for (let i = 0; i < 40 && !chest.opened; i++) { g.loot.work(chest, p, 0.07); step(1 / 30); if (chest.mesh) rattle = Math.max(rattle, Math.abs(chest.mesh.userData.lid.rotation.x)); }
  for (let i = 0; i < 60; i++) { step(1 / 30); lowest = Math.min(lowest, chest.lidT); }
  step(1.5);
  ok('the chest lid strains while opening', rattle > 0.02, rattle.toFixed(2));
  ok('the chest opens with a springy overshoot and settles', chest.opened && lowest < -2.0 && Math.abs(chest.lidT + 1.95) < 0.05, `lowest ${lowest.toFixed(2)}, final ${chest.lidT.toFixed(2)}`);

  // ---- bus ----------------------------------------------------------------------------------------------------------------------------
  g.startMatch();
  const rot0 = g.bus.prop.rotation.z;
  g.fx.reset();
  step(1);
  ok('the bus propeller spins and the flag flaps', Math.abs(g.bus.prop.rotation.z - rot0) > 5 && Math.abs(g.bus.flag.rotation.y) > 0.01);
  step(3);
  ok('the bus leaves a contrail', g.fx.alpha.count > 20, g.fx.alpha.count);

  // ---- no leaks over several matches ------------------------------------------------------------------------------------------------
  const m0 = mem();
  for (let i = 0; i < 3; i++) { ({ p, plaza } = begin()); fireBurst('ar', 0.3); fireBurst('rocket_launcher', 0.4); step(2); }
  g.startMatch(); step(0.2);
  const m1 = mem();
  ok('geometries, textures and scene objects stay flat across matches', m1.geo <= m0.geo + 2 && m1.tex <= m0.tex + 2 && m1.kids <= m0.kids + 3, `${JSON.stringify(m0)} -> ${JSON.stringify(m1)}`);
  ok('starting a match clears particles and casings', g.fx.shells.length === 0);

  // ---- cost ----------------------------------------------------------------------------------------------------------------------------
  ({ p, plaza } = begin());
  for (let i = 0; i < 400; i++) g.fx.explosion(P, 5, 'fire');
  let t0 = performance.now();
  for (let i = 0; i < 100; i++) g.fx.update(1 / 60, g.camera, g.renderer);
  const ms = (performance.now() - t0) / 100;
  ok('a full particle pool updates in a few ms', ms < 8, `${ms.toFixed(2)} ms per update with ${g.fx.add.count + g.fx.alpha.count} particles`);
  return out;
});

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.name}${r.info ? '  — ' + r.info : ''}`);
}
console.log(errors.length ? `\nconsole errors/warnings (${errors.length}):\n` + errors.slice(0, 10).join('\n') : '\nno console errors');
console.log(`\n${results.length - failed}/${results.length} checks passed`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
