// Dev helper: node tools/probe.mjs '<async js>' [screenshotName] [queryString]
// Runs JS in the page (after the game is ready) and prints the result + console output.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const root = join(fileURLToPath(import.meta.url), '..', '..');
const [script = 'return 1', shot = '', query = ''] = process.argv.slice(2);
const browser = await chromium.launch({
  args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 576 } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${(e.stack || '').split('\n').slice(0, 6).join('\n')}`));
await page.goto(`file://${root}/index.html?manual${query}`);
await page.waitForFunction('window.__ready === true', null, { timeout: 180000 }).catch(() => console.log('TIMEOUT waiting for ready'));
const t0 = Date.now();
try {
  const r = await page.evaluate(`(async () => { ${script} })()`);
  if (r !== undefined) console.log('result:', typeof r === 'string' ? r : JSON.stringify(r, null, 1));
} catch (e) {
  console.log('EVAL ERROR:', e.message.split('\n').slice(0, 8).join('\n'));
}
console.log('eval ms', Date.now() - t0);
if (shot.startsWith('page:')) {
  await page.evaluate('window.__game.render()');
  await page.screenshot({ path: join(root, 'tools/shots', shot.slice(5) + '.png'), timeout: 120000 });
} else if (shot) {
  const url = await page.evaluate('window.__shot()');
  writeFileSync(join(root, 'tools/shots', shot + '.png'), Buffer.from(url.split(',')[1], 'base64'));
}
const interesting = logs.filter((l) => !l.startsWith('[log] load'));
if (interesting.length) console.log('--- console ---\n' + interesting.slice(0, 40).join('\n'));
await browser.close();
