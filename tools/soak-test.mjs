// Soak test: node tools/soak-test.mjs [matches=2]   (needs playwright, e.g. NODE_PATH=$(npm root -g))
// Plays whole battle-royale matches in fast-forward (bots only, the player idles on the bus then fights on its own via a simple
// auto-pilot) and checks for console errors, NaN positions or poses, stuck state, leaks across matches and per-step cost.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const MATCHES = Number(process.argv[2] || 2);

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const out = await page.evaluate(async (MATCHES) => {
  const g = window.__game;
  const res = [];
  const mem = () => ({ geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, kids: g.scene.children.length });
  const m0 = mem();
  for (let m = 0; m < MATCHES; m++) {
    g.startMatch();
    const p = g.player;
    let simT = 0, bad = 0, worstMs = 0, totalMs = 0, steps = 0, maxAlive = g.aliveCount;
    // the player rides the bus and jumps after a while, then stands still: the bots do the rest
    while (g.state !== 'ended' && simT < 1500) {
      if (p.mode === 'bus' && simT > 6) g.jumpFromBus(p);
      if (p.alive && p.mode === 'normal') { p.input.fwd = (steps % 200) < 100 ? 1 : 0; p.input.fire = false; }
      const t0 = performance.now();
      window.__step(1 / 3, 1 / 15);
      const dt = performance.now() - t0;
      totalMs += dt; steps++; worstMs = Math.max(worstMs, dt);
      simT += 1 / 3;
      for (const c of g.chars) {
        if (![c.pos.x, c.pos.y, c.pos.z, c.hp, c.yaw].every(Number.isFinite)) bad++;
        const mm = c.root.matrixWorld.elements;
        if (c.alive && c.root.visible && !mm.every(Number.isFinite)) bad++;
      }
    }
    res.push({ match: m + 1, simMinutes: +(simT / 60).toFixed(1), state: g.state, alive: g.aliveCount, bad, avgStepMs: +(totalMs / steps / 5).toFixed(2), worstMs: +worstMs.toFixed(0), kills: Math.max(...g.chars.map((c) => c.kills)), mem: mem() });
  }
  g.returnToMenu();
  return { res, m0, m1: mem() };
}, MATCHES);

console.log(JSON.stringify(out, null, 1));
const flat = out.res.every((r) => r.bad === 0) && out.m1.geo <= out.m0.geo + 3 && out.m1.tex <= out.m0.tex + 3;
console.log(errors.length ? `console errors (${errors.length}):\n` + errors.slice(0, 8).join('\n') : 'no console errors');
console.log(flat && !errors.length && out.res.every((r) => r.state === 'ended') ? 'SOAK OK' : 'SOAK PROBLEM');
await browser.close();
process.exit(flat && !errors.length ? 0 : 1);
