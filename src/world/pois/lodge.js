import { Builder } from '../builder.js';
import { POI_BY_ID, MOUNTAIN } from '../poidata.js';
import { cabin, campfire, wallSign } from './common.js';
import { mulberry32 } from '../../util.js';

const SNOW = 0xeef3f7;

export function buildLodge(world) {
  const poi = POI_BY_ID.frostpeak_lodge;
  const b = new Builder(world, 51);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z, Y = poi.y;
  const rng = mulberry32(5151);

  const lodge = cabin(b, { id: 'lodge', x: cx, z: cz - 8, w: 24, d: 13, floors: 2, side: 'S', color: 0x7b5535, roofColor: SNOW, y: Y, chests: 3, spots: 4, rise: 4.2, ridge: 'x' });
  wallSign(b, lodge, 'S', 'FROSTPEAK LODGE', { y: lodge.y0 + 3.0, h: 1.0, w: 9, style: { bg: '#2a3a52', fg: '#e9f6ff', border: '#0d1626', font: 'bold 64px Georgia, serif' } });
  // wide porch
  b.slab(cx - 12, Y - 0.6, cz - 1.5, cx + 12, Y + 0.12, cz + 3.5, 0x6a4a2e, { colBottom: Y - 0.6 });
  for (const x of [-10, -5, 5, 10]) b.cylinder(cx + x, Y + 0.12, cz + 3.2, 0.2, 3.0, 0x4a3320, { sides: 6 });
  cabin(b, { x: cx - 26, z: cz + 6, w: 9, d: 7, side: 'E', y: Y, roofColor: SNOW, color: 0x86603a });
  cabin(b, { x: cx + 27, z: cz + 8, w: 9, d: 7, side: 'W', y: Y, roofColor: SNOW, color: 0x6e4c30 });
  cabin(b, { x: cx + 4, z: cz + 30, w: 8, d: 7, side: 'N', y: Y, roofColor: SNOW, color: 0x7a583a });

  // ski station: flat roofed gondola building
  const gs = b.building({
    id: 'gondola', x: cx - 38, z: cz - 22, w: 12, d: 9, floors: 1, color: 0x4a5f78, trim: 0x1f2a38, floorColor: 0x8a8f96,
    baseColor: 0x6b7178, roofColor: 0xdfe8ee, doors: [{ side: 'E', off: 0 }], roof: 'flat', parapet: 0.5, y: Y,
  });
  wallSign(b, gs, 'E', 'SUMMIT LIFT', { y: gs.topY - 0.7, h: 0.9, w: 5 });
  b.stockBuilding(gs, { chests: 1, floorSpots: 2 });
  // lift pylons up the hill
  for (let i = 0; i < 4; i++) {
    const x = cx - 38 - i * 18, z = cz - 22 - i * 22;
    const y = b.h(x, z);
    b.box(x, y - 0.5, z, 0.9, 11, 0.9, 0x556070, { jit: 0.03 });
    b.box(x, y + 10, z, 4.5, 0.4, 0.5, 0x556070, { solid: false });
  }

  // frozen pond
  const px = cx + 38, pz = cz - 28;
  b.solid.box(px - 12, Y + 0.02, pz - 8, px + 12, Y + 0.09, pz + 8, 0xa6d6ec, { jit: 0.02, ao: 1, noBottom: true });
  b.floorLoot(px, Y + 0.1, pz, false);

  // snowmen
  for (const [dx, dz] of [[-12, 14], [14, 18], [-3, 20], [30, -6], [-30, -8], [8, -34]]) {
    const x = cx + dx, z = cz + dz, y = b.h(x, z);
    b.solid.blob(x, y + 0.6, z, 0.75, 0.65, 0.75, 0xf8fbff, { seg: 8, rings: 5, wobble: 0.02, ao: 0.9 });
    b.solid.blob(x, y + 1.45, z, 0.55, 0.5, 0.55, 0xf8fbff, { seg: 8, rings: 5, wobble: 0.02, ao: 0.9 });
    b.solid.blob(x, y + 2.1, z, 0.38, 0.36, 0.38, 0xf8fbff, { seg: 8, rings: 5, wobble: 0.02, ao: 0.9 });
    b.solid.cone(x + 0.1, y + 2.05, z + 0.35, 0.07, 0.4, 0xff7a1a, 5, { noCap: true });
    b.col.addCircle(x, z, 0.7, y - 0.2, y + 2.5);
  }
  campfire(b, cx - 8, cz + 18);
  // ski racks, benches
  for (let i = 0; i < 5; i++) b.box(cx + 16 + i * 0.7, Y, cz + 14, 0.12, 1.8, 0.5, 0x2a6aaa, { jit: 0.1, solid: false });
  b.chest(cx - 8, Y, cz + 21, 0);
  b.chest(cx + 18, Y, cz + 14, 0);
  for (let i = 0; i < 14; i++) {
    const a = rng() * Math.PI * 2, r = 10 + rng() * 55;
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
    b.floorLoot(x, b.h(x, z), z, false, 'heavy');
  }

  // summit hut at the best flat spot near the peak
  let best = null;
  for (let a = 0; a < 6.28; a += 0.2) {
    for (let r = 0; r < 110; r += 10) {
      const x = MOUNTAIN.x + Math.cos(a) * r, z = MOUNTAIN.z + Math.sin(a) * r;
      const h = b.h(x, z);
      const s = Math.max(Math.abs(b.h(x + 5, z) - h), Math.abs(b.h(x, z + 5) - h)) / 5;
      if (s < 0.3 && (!best || h > best.h)) best = { x, z, h };
    }
  }
  if (best) {
    // flatten visually with a stone platform
    b.slab(best.x - 7, best.h - 3, best.z - 6, best.x + 7, best.h + 0.12, best.z + 6, 0x8a8f95, { colBottom: best.h - 3 });
    const hut = cabin(b, { id: 'summit', x: best.x, z: best.z, w: 6, d: 5, side: 'S', y: best.h, roofColor: SNOW, color: 0x6a4a2e, chests: 2, spots: 2 });
    world.summit = { x: best.x, z: best.z, y: best.h };
    void hut;
  }
  world.addBuilder(b, poi.id);
}
