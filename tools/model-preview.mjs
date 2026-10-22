// Dev helper: node tools/model-preview.mjs [guns|melee|misc|ammo|all] [--hand]
// Renders contact sheets of the item models (side + three-quarter views) into tools/shots/models-<group>.png
// by drawing them in the sky above the island with the game's own renderer and lighting.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const group = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'all';
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const BIG = process.argv.includes('--big'); // larger tiles, closer camera
mkdirSync(join(root, 'tools/shots'), { recursive: true });

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const groups = await page.evaluate(() => {
  const { ITEMS, AMMO } = window.__items;
  const ids = Object.keys(ITEMS);
  const by = (f) => ids.filter((id) => f(ITEMS[id]));
  return {
    guns: by((d) => d.kind === 'gun'),
    melee: by((d) => d.kind === 'melee'),
    misc: by((d) => d.kind !== 'gun' && d.kind !== 'melee'),
    ammo: ['ammo:light', 'ammo:medium', 'ammo:heavy', 'ammo:shells', 'ammo:rockets', 'chest'],
  };
});
const names = ONLY.length ? ['pick'] : group === 'all' ? Object.keys(groups) : [group];
if (ONLY.length) groups.pick = ONLY;
for (const name of names) {
  const list = groups[name];
  const png = await page.evaluate(async ({ list, name, BIG }) => {
    const g = window.__game, { ITEMS, itemModel, ammoModel, chestModel } = window.__items;
    const TW = BIG ? 800 : 400, TH = BIG ? 450 : 300;
    const isWeapon = (id) => ITEMS[id] && (ITEMS[id].kind === 'gun' || ITEMS[id].kind === 'melee');
    const perItem = name === 'guns' || name === 'melee' || (name === 'pick' && list.every(isWeapon)) ? 2 : 1;
    const cols = BIG ? 2 : perItem === 2 ? 4 : 5;
    const n = list.length * perItem, rows = Math.ceil(n / cols);
    const sheet = document.createElement('canvas');
    sheet.width = cols * TW; sheet.height = rows * TH;
    const ctx = sheet.getContext('2d');
    ctx.fillStyle = '#222'; ctx.fillRect(0, 0, sheet.width, sheet.height);
    g.renderer.setPixelRatio(1);
    g.renderer.setSize(TW, TH);
    g.camera.aspect = TW / TH; g.camera.fov = 40; g.camera.updateProjectionMatrix();
    g.state = 'menu';
    const base = { x: 0, y: 700, z: 0 };
    let k = 0;
    for (const id of list) {
      const model = id === 'chest' ? chestModel() : id.startsWith('ammo:') ? ammoModel(id.slice(5)) : itemModel(id);
      const def = ITEMS[id];
      model.position.set(base.x, base.y, base.z);
      g.scene.add(model);
      const small = !def || (def.kind !== 'gun' && def.kind !== 'melee');
      const ext = id === 'chest' ? 1.3 : def && def.kind === 'gun' ? Math.abs(model.userData.muzzleZ) * 0.5 + 0.35 : def && def.kind === 'melee' ? Math.abs(model.userData.muzzleZ) * 0.5 + 0.2 : 0.3;
      const cz = def && (def.kind === 'gun' || def.kind === 'melee') ? model.userData.muzzleZ * 0.4 + 0.1 : 0;
      const cy = id === 'chest' ? 0.3 : 0.02;
      for (let v = 0; v < perItem; v++) {
        const dist = ext * (BIG ? 1.7 : 2.4);
        const ang = v === 0 ? 0 : -0.75; // 0: from the right side; -0.75: three-quarter from the front
        const ox = Math.cos(ang) * dist, oz = Math.sin(ang) * dist;
        if (small && perItem === 1) { g.camera.position.set(base.x + 0.7 * ext * (BIG ? 1.8 : 2.4), base.y + 0.4 * ext * (BIG ? 1.8 : 2.4), base.z + 0.8 * ext * (BIG ? 1.8 : 2.4)); }
        else g.camera.position.set(base.x + ox, base.y + dist * 0.18, base.z + cz + oz);
        g.camera.lookAt(base.x, base.y + cy, base.z + cz);
        g.camera.updateMatrixWorld(true);
        g.world.update(g.camera, g.camera.position, 0, g.time);
        g.renderer.render(g.scene, g.camera);
        const x = (k % cols) * TW, y = Math.floor(k / cols) * TH;
        ctx.drawImage(g.renderer.domElement, x, y);
        ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(x, y, 150, 18);
        ctx.fillStyle = '#fff'; ctx.font = '13px sans-serif'; ctx.fillText(id.replace('ammo:', 'ammo ') + (perItem === 2 ? (v ? ' 3/4' : ' side') : ''), x + 5, y + 13);
        k++;
      }
      g.scene.remove(model);
    }
    return sheet.toDataURL('image/png');
  }, { list, name, BIG });
  writeFileSync(join(root, 'tools/shots', `models-${name}.png`), Buffer.from(png.split(',')[1], 'base64'));
  console.log('wrote tools/shots/models-' + name + '.png');
}
if (errors.length) console.log('console errors:\n' + errors.slice(0, 8).join('\n'));
await browser.close();
