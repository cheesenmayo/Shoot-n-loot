// Draw-call / triangle budget at six viewpoints and two graphics presets: node tools/world-budget.mjs [--json]
// Used to compare the world before and after changes (renderer.info after one rendered frame at each spot).
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
const res = await page.evaluate(() => {
  const g = window.__game, w = g.world;
  const spots = { plaza: [30, -10], desert: [-540, 420], neon: [10, -520], grove: [500, 400], lake: [480, -330], frost: [-400, -300] };
  const out = {};
  for (const preset of ['low', 'default']) {
    g.applyGraphics(preset);
    out[preset] = {};
    for (const [name, [x, z]] of Object.entries(spots)) {
      const y = w.terrain.height(x, z) + 2;
      g.camera.position.set(x, y, z);
      g.camera.lookAt(x + 40, y + 2, z + 40);
      g.camera.updateMatrixWorld(true);
      for (let i = 0; i < 3; i++) w.update(g.camera, g.camera.position, 1 / 30, g.time += 1 / 30); // let chunks / grass stream in
      g.renderer.info.reset();
      g.render();
      out[preset][name] = { calls: g.renderer.info.render.calls, tris: g.renderer.info.render.triangles };
    }
  }
  return out;
});
if (process.argv.includes('--json')) console.log(JSON.stringify(res));
else for (const p of Object.keys(res)) console.log(p.padEnd(8), Object.entries(res[p]).map(([k, v]) => `${k} ${v.calls}c/${(v.tris / 1000).toFixed(0)}k`).join('  '));
console.log(errors.length ? 'errors: ' + errors.join('; ') : 'no console errors');
await browser.close();
