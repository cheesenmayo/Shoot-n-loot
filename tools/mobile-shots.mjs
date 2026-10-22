// Screenshots of the in-game touch HUD on a few emulated devices: node tools/mobile-shots.mjs
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const pw = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');
const devices = process.argv.slice(2).length ? process.argv.slice(2) : ['iPhone SE landscape', 'iPhone 13 landscape', 'Pixel 7 landscape', 'iPad (gen 7) landscape'];
const browser = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
for (const name of devices) {
  const ctx = await browser.newContext({ ...pw.devices[name] });
  const page = await ctx.newPage();
  await page.goto(`file://${root}/index.html?manual`);
  await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
  await page.evaluate(`(() => { const g = window.__game, { makeStack } = window.__items;
    g.startMatch(); g.jumpFromBus(g.player); const p = g.player, poi = g.world.pois[0];
    const x = poi.x - 30, z = poi.z + 36; p.place(x, g.world.collision.groundAt(x, z, poi.y + 1, 0.6), z); p.setMode('normal'); p.grounded = true; p.vel.set(0,0,0);
    p.inv.slots[1] = makeStack('ar', 3); p.inv.ammo.medium = 120; p.inv.slots[2] = makeStack('pump', 2); p.inv.ammo.shells = 20; p.inv.slots[3] = makeStack('medkit', 1, 2); p.inv.slots[4] = makeStack('jumpple', 0, 3); p.inv.slots[5] = makeStack('grappler', 0);
    p.equip(1); p.equipT = 0; p.hp = 82; p.shield = 60;
    for (const b of g.bots) b.update = () => {};
    const b = g.bots[0].ch; b.setMode('normal'); b.place(x + 20, p.pos.y, z); b.grounded = true;
    g.loot.addDrop({ stack: makeStack('revolver', 3), count: 1 }, x + 1.2, p.pos.y, z + 0.8, {});
    g.controller.yaw = -Math.PI / 2 + 0.25; g.controller.pitch = -0.05;
    window.__step(1.5); g.render(); })()`);
  const file = join(root, 'tools/shots', 'm-' + name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.png');
  await page.screenshot({ path: file });
  const vp = page.viewportSize();
  console.log(name, `${vp.width}x${vp.height}`, '->', file);
  await ctx.close();
}
await browser.close();
