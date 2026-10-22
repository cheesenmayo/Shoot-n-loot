// Item model test: node tools/model-test.mjs   (needs playwright, e.g. NODE_PATH=$(npm root -g))
// Checks every item / ammo / chest model: draw-call and vertex budgets, sizes, the userData contract the animation
// system relies on (gripL, magPos, named parts), clone independence, shared GPU resources and in-hand sanity.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const results = await page.evaluate(() => {
  const g = window.__game, { ITEMS, AMMO, itemModel, ammoModel, chestModel, makeStack } = window.__items;
  const out = [];
  const ok = (name, cond, info = '') => out.push({ name, pass: !!cond, info: String(info) });
  const stats = (obj) => {
    let meshes = 0, verts = 0, bad = 0;
    const geos = new Set(), mats = new Set();
    let minX = 1e9, minY = 1e9, minZ = 1e9, maxX = -1e9, maxY = -1e9, maxZ = -1e9;
    obj.updateMatrixWorld(true);
    obj.traverse((o) => {
      if (!o.isMesh) return;
      meshes++; geos.add(o.geometry.uuid); mats.add(o.material.uuid);
      const p = o.geometry.attributes.position;
      verts += p.count;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        if (!Number.isFinite(x + y + z)) { bad++; continue; }
        // bounds in the object's frame (parts are only translated, so adding their offset is exact)
        const q = o.getWorldPosition(o.position.clone().set(0, 0, 0));
        const wx = x + q.x - obj.position.x, wy = y + q.y - obj.position.y, wz = z + q.z - obj.position.z;
        if (wx < minX) minX = wx; if (wy < minY) minY = wy; if (wz < minZ) minZ = wz;
        if (wx > maxX) maxX = wx; if (wy > maxY) maxY = wy; if (wz > maxZ) maxZ = wz;
      }
    });
    return { meshes, verts, bad, geos: geos.size, mats: mats.size, size: [maxX - minX, maxY - minY, maxZ - minZ], min: [minX, minY, minZ], max: [maxX, maxY, maxZ] };
  };

  const ids = Object.keys(ITEMS);
  let t0 = performance.now();
  const models = {};
  let threw = '';
  for (const id of ids) { try { models[id] = itemModel(id); } catch (e) { threw += id + ': ' + e.message + ' '; } }
  const buildMs = performance.now() - t0;
  ok('every item builds', !threw && Object.keys(models).length === ids.length, threw || `${ids.length} items in ${buildMs.toFixed(0)} ms`);

  let worst = { n: '', m: 0 }, worstV = { n: '', v: 0 }, badAll = 0, bigs = [];
  for (const id of ids) {
    const s = stats(models[id]);
    if (s.meshes > worst.m) worst = { n: id, m: s.meshes };
    if (s.verts > worstV.v) worstV = { n: id, v: s.verts };
    badAll += s.bad;
    const len = Math.max(...s.size);
    const def = ITEMS[id];
    const lim = def.kind === 'gun' ? [0.25, 1.4] : def.kind === 'melee' ? [0.5, 1.4] : [0.08, 0.4];
    if (len < lim[0] || len > lim[1]) bigs.push(`${id} ${len.toFixed(2)}m`);
  }
  ok('draw calls: every item has few meshes (<= 14 incl. animatable parts)', worst.m <= 14, `${worst.n}: ${worst.m}`);
  ok('vertex budget: every item under 9000 vertices', worstV.v < 9000, `${worstV.n}: ${worstV.v}`);
  ok('no NaN in any geometry', badAll === 0, badAll);
  ok('sizes are sensible (guns 0.25-1.4 m, melee 0.5-1.4 m, others 0.08-0.4 m)', bigs.length === 0, bigs.join(', '));

  // contract with the animation system
  const guns = ids.filter((id) => ITEMS[id].kind === 'gun');
  ok('guns: muzzleZ is negative and gripL / magPos are vectors',
    guns.every((id) => models[id].userData.muzzleZ < -0.1 && models[id].userData.gripL?.isVector3 && models[id].userData.magPos?.isVector3),
    guns.filter((id) => !(models[id].userData.muzzleZ < -0.1 && models[id].userData.gripL?.isVector3 && models[id].userData.magPos?.isVector3)).join(','));
  ok('long guns carry stockPos (shoulder anchor)', ['ar', 'burst_ar', 'heavy_ar', 'lever', 'pump', 'tac_shotgun', 'double_barrel', 'bolt_sniper', 'semi_sniper', 'lmg', 'smg', 'silenced_smg'].every((id) => models[id].userData.stockPos?.isVector3));
  const expect = {
    pistol: ['slide'], revolver: ['cylinder', 'hammer'], hand_cannon: ['cylinder', 'hammer'], smg: ['slide'], silenced_smg: ['slide'], ar: ['slide'], burst_ar: ['slide'], heavy_ar: ['slide'],
    lever: ['lever'], pump: ['pump'], tac_shotgun: ['pump'], auto_shotgun: ['slide'], bolt_sniper: ['bolt'], semi_sniper: ['slide'], lmg: ['slide'], minigun: ['barrels'], grenade_launcher: ['cylinder'],
  };
  const missing = [];
  for (const [id, parts] of Object.entries(expect)) for (const p of parts) if (!models[id].getObjectByName(p)) missing.push(`${id}.${p}`);
  ok('animatable parts are present under their names', missing.length === 0, missing.join(','));
  // support-hand anchors lie near the weapon (inside its bounding box plus a margin)
  const off = [];
  for (const id of guns) {
    const s = stats(models[id]), p = models[id].userData.gripL;
    const m = 0.12;
    if (p.x < s.min[0] - m || p.x > s.max[0] + m || p.y < s.min[1] - m || p.y > s.max[1] + m || p.z < s.min[2] - m || p.z > s.max[2] + m) off.push(id);
  }
  ok('gripL lies on the weapon', off.length === 0, off.join(','));

  // clones are independent but share GPU resources
  const a = itemModel('pump'), b = itemModel('pump');
  const pa = a.getObjectByName('pump'), pb = b.getObjectByName('pump');
  pa.position.z += 0.1;
  ok('clones: parts belong to their own clone and move independently', pa !== pb && pa.parent === a && pb.parent === b && Math.abs(pb.position.z - (pa.position.z - 0.1)) < 1e-9);
  ok('clones: userData vectors are independent', a.userData.gripL !== b.userData.gripL && a.userData.gripL.equals(b.userData.gripL));
  const geoSet = new Set();
  for (let i = 0; i < 200; i++) itemModel('ar').traverse((o) => { if (o.isMesh) geoSet.add(o.geometry.uuid); });
  const one = stats(models.ar).geos;
  ok('clones share geometry (200 clones add no new geometry)', geoSet.size === one, `${geoSet.size} vs ${one}`);

  // ammo + chest
  const ammoBad = [];
  for (const t of Object.keys(AMMO)) { const m = ammoModel(t); const s = stats(m); if (s.meshes > 10 || s.bad || Math.max(...s.size) > 0.4) ammoBad.push(t); if (ammoModel(t).children[0].geometry !== m.children[0].geometry) ammoBad.push(t + ' not shared'); }
  ok('ammo boxes: built once per type, few meshes, sane size', ammoBad.length === 0, ammoBad.join(','));
  const c1 = chestModel(), c2 = chestModel();
  c1.userData.lid.rotation.x = -1.5;
  ok('chest: lid and glow resolved per clone, lid moves independently', c1.userData.lid && c1.userData.glow && c2.userData.lid.rotation.x === 0 && c1.userData.lid.parent === c1 && stats(c1).meshes <= 12, `${stats(c1).meshes} meshes`);
  const c3 = chestModel(); c3.remove(c3.userData.glow);
  const cs = stats(c3);
  ok('chest: about 1 m wide', cs.size[0] > 0.95 && cs.size[0] < 1.25, cs.size.map((v) => v.toFixed(2)).join(' x '));

  // in the hand: every item equipped on a character, a few frames, finite poses and no console errors
  g.startMatch();
  for (const b2 of g.bots) b2.update = () => {};
  const p = g.player, plaza = g.world.pois[0];
  p.place(plaza.x + 30, g.world.collision.groundAt(plaza.x + 30, plaza.z + 20, 999, 0.6), plaza.z + 20); p.setMode('normal'); p.grounded = true;
  g.state = 'playing'; g.bus.active = false; g.forcedJump = true; g.controller.update = () => {};
  let bad = '';
  for (const id of ids) {
    p.inv.slots[1] = makeStack(id, 1, ITEMS[id].kind === 'gun' ? undefined : 1); p.inv.sel = 0; p.equip(1); p.equipT = 0;
    if (ITEMS[id].ammo) p.inv.ammo[ITEMS[id].ammo] = 50;
    window.__step(0.3);
    p.root.updateMatrixWorld(true);
    const m = p.held && p.held.matrixWorld.elements;
    if (!p.held || !m.every(Number.isFinite)) bad += id + ' ';
  }
  ok('in hand: every item has a held model with a finite transform', !bad, bad);
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
