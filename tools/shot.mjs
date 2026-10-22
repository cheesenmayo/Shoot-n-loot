// Dev helper: node tools/shot.mjs <name> '<js to run in page after ready>' [query]
// Takes a screenshot with headless Chromium (software GL) into tools/shots/<name>.png
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // global install via NODE_PATH
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const [name = 'shot', script = '', query = ''] = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${e.stack}`));
await page.goto(`file://${root}/index.html?manual${query}`);
try {
  await page.waitForFunction('window.__ready === true', null, { timeout: 180000 });
} catch (e) {
  console.log('TIMEOUT waiting for ready');
}
if (script) {
  const r = await page.evaluate(script);
  if (r !== undefined) console.log('eval ->', JSON.stringify(r));
}
const t0 = Date.now();
const dataUrl = await page.evaluate(() => window.__renderOnce(3));
console.log('render ms', Date.now() - t0);
const { writeFileSync } = await import('node:fs');
writeFileSync(join(root, 'tools/shots', name + '.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
console.log(logs.filter((l) => !l.startsWith('[log] load')).slice(0, 40).join('\n'));
await browser.close();
