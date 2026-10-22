// Produces dist/shoot-n-loot.html: the whole game (CSS + JS) inlined into one file.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const [html, css, js] = await Promise.all([
  readFile(join(root, 'index.html'), 'utf8'),
  readFile(join(root, 'style.css'), 'utf8'),
  readFile(join(root, 'dist/game.js'), 'utf8'),
]);
const out = html
  .replace('<link rel="stylesheet" href="style.css">', () => `<style>\n${css}\n</style>`)
  .replace('<script src="dist/game.js"></script>', () => `<script>\n${js.replace(/<\/script/gi, '<\\/script')}\n</script>`);
await writeFile(join(root, 'dist/shoot-n-loot.html'), out);
console.log(`dist/shoot-n-loot.html  ${(out.length / 1024).toFixed(0)} kB`);
