// World test: node tools/world-test.mjs   (needs playwright, e.g. NODE_PATH=$(npm root -g))
// The island layout must not change (positions of chests, loot, buildings, pads and the terrain are hashed), the ambient layer
// (tumbleweeds, birds, smoke, snow, pollen, dust, neon) must work and stay cheap, and draw-call / triangle budgets must hold.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');

// layout hash recorded before the ambient layer existed
const LAYOUT = { hash: 2915674616, chests: 147, loot: 459, buildings: 61, pads: 8 };
// renderer.info (draw calls / triangles) recorded before the ambient layer existed
const BASE = {
  low: { plaza: [90, 856244], desert: [125, 276974], neon: [99, 461845], grove: [58, 459606], lake: [81, 409784], frost: [143, 717599] },
  default: { plaza: [225, 1796394], desert: [233, 597976], neon: [215, 1248945], grove: [128, 1065484], lake: [166, 1033859], frost: [280, 1687803] },
};

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const results = await page.evaluate(({ LAYOUT, BASE }) => {
  const g = window.__game, w = g.world, A = w.ambient;
  const out = [];
  const ok = (name, cond, info = '') => out.push({ name, pass: !!cond, info: String(info) });
  g.state = 'menu';
  const cam = g.camera;
  let T = 100;
  const run = (secs, dt = 1 / 30) => { for (let i = 0; i < secs / dt; i++) { T += dt; w.update(cam, cam.position, dt, T); g.fx.update(dt, cam, g.renderer); } };
  const at = (x, z, up = 2) => { cam.position.set(x, w.terrain.height(x, z) + up, z); cam.lookAt(x + 30, cam.position.y, z + 30); cam.updateMatrixWorld(true); };

  // ---- the island is exactly as before -------------------------------------------------------------------------------------------
  const r2 = (v) => Math.round(v * 100) / 100;
  const parts = [
    JSON.stringify(w.chestSpots.map((c) => [r2(c.x), r2(c.y), r2(c.z), c.poi, c.tag || ''])),
    JSON.stringify(w.lootSpots.map((c) => [r2(c.x), r2(c.y), r2(c.z), c.poi, c.tag || ''])),
    JSON.stringify(w.buildings.map((b) => [b.id, r2(b.minX), r2(b.minZ), r2(b.maxX), r2(b.maxZ), r2(b.y0), b.floors])),
    JSON.stringify(w.jumpPads.map((p) => [r2(p.x), r2(p.y), r2(p.z)])),
    JSON.stringify((() => { const hs = []; for (let x = -1000; x <= 1000; x += 125) for (let z = -1000; z <= 1000; z += 125) hs.push(r2(w.terrain.height(x, z))); return hs; })()),
  ];
  let h = 2166136261; const s = parts.join('|');
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  ok('layout: chests, loot, buildings, pads and terrain are unchanged', h === LAYOUT.hash && w.chestSpots.length === LAYOUT.chests && w.lootSpots.length === LAYOUT.loot && w.buildings.length === LAYOUT.buildings && w.jumpPads.length === LAYOUT.pads, `hash ${h} (${w.chestSpots.length} chests, ${w.lootSpots.length} loot, ${w.buildings.length} buildings)`);

  // ---- budgets ------------------------------------------------------------------------------------------------------------------------------
  const spots = { plaza: [30, -10], desert: [-540, 420], neon: [10, -520], grove: [500, 400], lake: [480, -330], frost: [-400, -300] };
  for (const preset of ['low', 'default']) {
    g.applyGraphics(preset);
    let worstC = 0, worstT = 0, label = '';
    for (const [name, [x, z]] of Object.entries(spots)) {
      at(x, z, 2); cam.lookAt(x + 40, cam.position.y + 2, z + 40); cam.updateMatrixWorld(true);
      run(0.1);
      g.renderer.info.reset();
      g.render();
      const c = g.renderer.info.render.calls / BASE[preset][name][0], t = g.renderer.info.render.triangles / BASE[preset][name][1];
      if (Math.max(c, t) > Math.max(worstC, worstT)) { worstC = c; worstT = t; label = `${name} ${g.renderer.info.render.calls}c/${(g.renderer.info.render.triangles / 1000).toFixed(0)}k`; }
    }
    ok(`budget (${preset}): draw calls and triangles within +10% of the old world at six viewpoints`, worstC < 1.1 && worstT < 1.1, `worst ${label}, calls x${worstC.toFixed(2)}, tris x${worstT.toFixed(2)}`);
  }
  g.applyGraphics('default');

  // ---- tumbleweeds -------------------------------------------------------------------------------------------------------------------
  at(-540, 420, 40);
  run(1);
  const p0 = A.tw.data.map((t) => [t.x, t.z]);
  run(6);
  const moved = A.tw.data.filter((t, i) => Math.hypot(t.x - p0[i][0], t.z - p0[i][1]) > 3).length;
  ok('tumbleweeds roll across the desert', A.tw.mesh.visible && moved >= 10, `${moved}/14 moved`);
  let bad = 0, wet = 0, inside = 0;
  for (let i = 0; i < 90; i++) {
    run(1, 1 / 15 + (i % 3) * 0.01);
    for (const t of A.tw.data) {
      if (![t.x, t.z, t.hy, t.ang].every(Number.isFinite)) bad++;
      if (w.terrain.height(t.x, t.z) < 0.5) wet++;
      if (w.buildingAt(t.x, t.z)) inside++;
    }
  }
  ok('tumbleweeds stay finite, on land and out of buildings for 90 s', bad === 0 && wet === 0 && inside === 0, `${bad} bad, ${wet} in water, ${inside} inside buildings`);
  const e = A.tw.mesh.instanceMatrix.array;
  ok('tumbleweed instance matrices are finite', e.every(Number.isFinite));
  at(480, -430, 20);
  run(0.1);
  ok('tumbleweeds are hidden when the desert is far away', !A.tw.mesh.visible);

  // ---- birds -------------------------------------------------------------------------------------------------------------------------
  at(480, -430, 30);
  run(0.5);
  const b0 = A.birds.body.instanceMatrix.array.slice(0, 16);
  run(3);
  const b1 = A.birds.body.instanceMatrix.array.slice(0, 16);
  ok('birds circle over the lake and flap', A.birds.body.visible && b0.some((v, i) => Math.abs(v - b1[i]) > 0.01) && A.birds.wingR.instanceMatrix.array.every(Number.isFinite));
  cam.position.set(2500, 60, 2500); cam.updateMatrixWorld(true); // out at sea, far from every flock
  run(0.2);
  ok('birds are hidden when no flock is near', !A.birds.body.visible);

  // ---- smoke, snow, pollen, dust -------------------------------------------------------------------------------------------------------
  ok('chimneys and campfires register smoke sources', w.smokeSources.length >= 20 && w.smokeSources.some((s) => s.kind === 'chimney') && w.smokeSources.some((s) => s.kind === 'fire'), `${w.smokeSources.length} sources`);
  const src = w.smokeSources.find((s) => s.kind === 'chimney');
  cam.position.set(src.x + 12, src.y, src.z + 12); cam.lookAt(src.x, src.y, src.z); cam.updateMatrixWorld(true);
  g.fx.reset(); run(2.5);
  const nearSmoke = g.fx.alpha.count;
  at(-300, 700, 30); g.fx.reset(); run(2.5);
  ok('smoke rises from a chimney you stand near, and nowhere far away', nearSmoke >= 6 && g.fx.alpha.count === 0, `${nearSmoke} near, ${g.fx.alpha.count} far`);
  const lodge = w.pois.find((p) => p.id === 'frostpeak_lodge');
  at(lodge.x + 20, lodge.z + 40, 2); g.fx.reset(); run(3);
  const flakes = g.fx.alpha.count;
  at(30, -10, 2); g.fx.reset(); run(3);
  ok('it snows around Frostpeak and nowhere else', flakes > 150 && g.fx.alpha.count === 0, `${flakes} flakes at the lodge, ${g.fx.alpha.count} at the plaza`);
  const grove = w.pois.find((p) => p.id === 'floorange_grove');
  at(grove.x + 20, grove.z + 20, 2); g.fx.reset(); run(5);
  ok('pollen drifts in the Grove', g.fx.add.count >= 5, g.fx.add.count);
  at(-540 - 80, 420 - 40, 2); g.fx.reset(); run(5);
  ok('dust blows across the desert', g.fx.alpha.count >= 5, g.fx.alpha.count);
  g.fx.reset();

  // ---- neon, trees ---------------------------------------------------------------------------------------------------------------------
  let lo = 9, hi = 0;
  for (let i = 0; i < 1200; i++) { T += 1 / 60; w.update(cam, cam.position, 1 / 60, T); const v = w.mats.tower.emissiveIntensity; lo = Math.min(lo, v); hi = Math.max(hi, v); }
  ok('neon towers flicker', hi - lo > 0.2 && lo > 0.3 && hi < 1.0, `${lo.toFixed(2)} .. ${hi.toFixed(2)}`);
  const P = w.props;
  ok('trees sway (shader hook) while cacti and dead trunks stay rigid', /uTime/.test(P.treeMat.onBeforeCompile.toString()) && P.types.pine.mat === P.treeMat && P.types.oak.mat === P.treeMat && P.types.cactus.mat === P.rigidMat && P.types.dead.mat === P.rigidMat && P.rigidMat.onBeforeCompile.toString().indexOf('uTime') < 0);
  P.update(cam.position, 1 / 30, 12.5);
  ok('the wind clock advances', P.time.value === 12.5);

  // ---- graphics presets ---------------------------------------------------------------------------------------------------------------------
  g.applyGraphics('low');
  const lowTw = A.tw.mesh.count, lowBirds = A.birds.n;
  g.applyGraphics('default');
  ok('Low graphics runs fewer tumbleweeds and birds', lowTw < A.tw.mesh.count && lowBirds < A.birds.n, `${lowTw}/${A.tw.mesh.count} tumbleweeds, ${lowBirds}/${A.birds.n} birds`);

  // ---- per-frame cost -----------------------------------------------------------------------------------------------------------------------------
  at(-540, 420, 2);
  const t0 = performance.now();
  for (let i = 0; i < 300; i++) { T += 1 / 60; A.update(cam, 1 / 60, T); }
  const ms = (performance.now() - t0) / 300;
  ok('the ambient layer costs well under a millisecond per frame', ms < 1.0, `${ms.toFixed(3)} ms`);
  return out;
}, { LAYOUT, BASE });

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.name}${r.info ? '  — ' + r.info : ''}`);
}
console.log(errors.length ? `\nconsole errors/warnings (${errors.length}):\n` + errors.slice(0, 10).join('\n') : '\nno console errors');
console.log(`\n${results.length - failed}/${results.length} checks passed`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
