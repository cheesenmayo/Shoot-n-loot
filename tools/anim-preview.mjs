// Contact-sheet renderer for the character animation system.
//   node tools/anim-preview.mjs <sheet> [--views=tps,side,front] [--cols=6] [--tile=300x360] [--only=text] [--out=name]
// Sheets: models, loco, guns, melee, items, hits, death, air, all. Output: tools/shots/anim-<name>.png (look at it with an image viewer).
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
  S.frames = (sec, n, label = '') => { const dt = sec / n; for (let i = 0; i < n; i++) { S.snap(label + 't=' + (i * dt).toFixed(2)); S.step(dt); } };
  S.walkTo = (fwd, strafe, sprint, crouch, settle = 0.7) => { const p = S.subject; p.input.fwd = fwd; p.input.strafe = strafe; p.input.sprint = !!sprint; p.input.crouch = !!crouch; S.step(settle); };
  S.stop = () => { const p = S.subject; p.input.fwd = 0; p.input.strafe = 0; p.input.sprint = false; p.input.crouch = false; p.input.fire = false; p.input.ads = false; };
`;

const SHEETS = {
  models: [
    { title: 'characters: 12 seeds (front / back)', views: ['front', 'back'], run: async (S) => {
      const g = window.__game;
      const cs = [g.player, ...g.bots.slice(0, 11).map((b) => b.ch)];
      for (let i = 0; i < cs.length; i++) {
        const c = cs[i];
        S.reset(c, { x: S.x + (i % 4) * 0, z: S.z });
        S.hold('pickaxe', c);
        c.anim.update(0.016, 0);
        S.step(0.2);
        S.snap('#' + i + ' ' + c.skill, c);
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
  ],
};

// ---------------------------------------------------------------------------------------------------------------------
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: tile[0], height: tile[1] } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}\n${(e.stack || '').split('\n').slice(0, 6).join('\n')}`));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
await page.evaluate(stageInit);
await page.evaluate(`(() => { const S = window.__S; S.tile = ${JSON.stringify(tile)}; ${frames} S.init(); })()`);
const list = sheetName === 'all' ? Object.keys(SHEETS).filter((k) => k !== 'quick') : [sheetName];
for (const name of list) {
  const scenarios = SHEETS[name];
  if (!scenarios) { console.log('unknown sheet', name, 'available:', Object.keys(SHEETS).join(', ')); process.exit(1); }
  await page.evaluate('window.__S.clearSheet()');
  for (const sc of scenarios) {
    if (opt.only && !sc.title.includes(opt.only)) continue;
    const views = opt.views ? opt.views.split(',') : sc.views;
    const r = await page.evaluate(`(async () => { const S = window.__S; S.begin(${JSON.stringify(sc.title)}, ${JSON.stringify(views)}); await (${sc.run.toString()})(S); return 'ok'; })()`).catch((e) => 'ERROR ' + e.message.split('\n').slice(0, 5).join(' | '));
    if (r !== 'ok') console.log(`scenario "${sc.title}":`, r);
  }
  const url = await page.evaluate(`window.__S.compose(${cols})`);
  mkdirSync(join(root, 'tools/shots'), { recursive: true });
  const file = join(root, 'tools/shots', `anim-${opt.out || name}.png`);
  writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
  console.log('wrote', file);
}
if (errors.length) console.log('--- console ---\n' + errors.slice(0, 20).join('\n'));
await browser.close();
