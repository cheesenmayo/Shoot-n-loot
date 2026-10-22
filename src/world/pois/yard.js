import { Builder } from '../builder.js';
import { POI_BY_ID } from '../poidata.js';
import { wallSign } from './common.js';
import { mulberry32 } from '../../util.js';

const CONT = [0x9a3b2a, 0x2f5f8a, 0x3d7a4a, 0xc9822a, 0x8a8f94, 0xd8d4c8, 0x6a2f3a, 0x3a6f78];

export function buildYard(world) {
  const poi = POI_BY_ID.rusty_yard;
  const b = new Builder(world, 71);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z, Y = poi.y;
  const rng = mulberry32(7171);

  // gravel yard
  b.mapRect(cx - 110, cz - 100, cx + 110, cz + 100, '#8f8b82');
  b.slab(cx - 110, Y - 1.2, cz - 100, cx + 110, Y + 0.08, cz + 100, 0x8a867e, { colBottom: Y - 1.2, jit: 0.02, uvScale: 6 });
  // painted lanes
  for (let z = -90; z <= 90; z += 30) b.solid.box(cx - 108, Y + 0.085, cz + z - 0.2, cx + 108, Y + 0.1, cz + z + 0.2, 0xe8d24a, { jit: 0, ao: 1, noBottom: true });

  const container = (x, y, z, alongX, color) => {
    const w = alongX ? 6.1 : 2.45, d = alongX ? 2.45 : 6.1;
    b.box(x, y, z, w, 2.6, d, color, { jit: 0.05, uvScale: 1.5 });
    // ribs
    for (let i = -2; i <= 2; i++) {
      if (alongX) b.solid.box(x + i * 1.1 - 0.05, y + 0.1, z - d / 2 - 0.03, x + i * 1.1 + 0.05, y + 2.5, z + d / 2 + 0.03, color, { jit: 0.1, ao: 1, noBottom: true });
      else b.solid.box(x - w / 2 - 0.03, y + 0.1, z + i * 1.1 - 0.05, x + w / 2 + 0.03, y + 2.5, z + i * 1.1 + 0.05, color, { jit: 0.1, ao: 1, noBottom: true });
    }
    // door end
    if (alongX) b.solid.box(x + w / 2, y + 0.2, z - 1.0, x + w / 2 + 0.04, y + 2.4, z + 1.0, 0x2a2a2a, { ao: 1, jit: 0 });
    else b.solid.box(x - 1.0, y + 0.2, z + d / 2, x + 1.0, y + 2.4, z + d / 2 + 0.04, 0x2a2a2a, { ao: 1, jit: 0 });
  };

  // container blocks: 4 long, 2 deep, stacked 1-2 high
  const stairsAt = [];
  const bx = [-82, -26, 30, 82 - 24];
  const bz = [-70, -38, 8, 44];
  for (let ci = 0; ci < bx.length; ci++) {
    for (let ri = 0; ri < bz.length; ri++) {
      if (ci === 3 && ri === 0) continue; // keep the crane lane open
      const x0 = cx + bx[ci], z0 = cz + bz[ri];
      const alongX = (ci + ri) % 2 === 0;
      const cols = alongX ? 4 : 2, rows = alongX ? 2 : 4;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const w = alongX ? 6.2 : 2.5, d = alongX ? 2.5 : 6.2;
          const x = x0 + i * (w + 0.05), z = z0 + j * (d + 0.05);
          const h = rng() < 0.18 ? 0 : rng() < 0.55 ? 1 : 2;
          for (let k = 0; k < h; k++) container(x, Y + 0.08 + k * 2.6, z, alongX, CONT[Math.floor(rng() * CONT.length)]);
          if (h >= 1 && rng() < 0.12) b.floorLoot(x, Y + 0.08 + h * 2.6, z, true);
        }
      }
      // external stairs up to the first level of this block
      const sx = alongX ? x0 - 3.1 - 1.7 : x0 - 1.25 - 1.7, sz = alongX ? z0 - 1.25 : z0 - 3.1;
      b.stairs(sx, z0 - 1.2, sx + 1.7, z0 - 1.2 + 4.8, Y + 0.08, Y + 0.08 + 2.6, 'z', false, Y - 0.2, 0x6a6f75);
      void sz;
      if (rng() < 0.5) b.chest(x0 + 1, Y + 0.08 + 2.6, z0, 0);
      if (rng() < 0.5) b.floorLoot(x0 + 6, Y + 0.08, z0 - 4, false);
    }
  }

  // warehouses
  const wh = (x, z, side, id) => {
    const d = b.building({
      id, x: cx + x, z: cz + z, w: 30, d: 17, floors: 1, floorH: 6, color: 0x7a8794, trim: 0x2c3138, floorColor: 0x6a6a68,
      baseColor: 0x6b6b6b, roofColor: 0x5b6670, doors: [{ side, off: -6 }, { side, off: 7 }], doorW: 4.2, doorH: 4.2, roof: 'flat', parapet: 0.6,
      windowSpacing: 5, windowH: 1.0, windowW: 2, y: Y, uvScale: 2,
    });
    b.stockBuilding(d, { chests: 3, floorSpots: 5 });
    for (let i = 0; i < 6; i++) b.crate(d.minX + 3 + rng() * (d.maxX - d.minX - 6), d.minZ + 2 + rng() * (d.maxZ - d.minZ - 4), 1.2 + rng(), 0x9b7745, d.y0);
    // stairs to the roof along the long side
    const L = 6.2 / 0.55;
    b.stairs(d.maxX - 3.5, d.maxZ + 0.1, d.maxX - 1.9, d.maxZ + 0.1 + L, d.y0, d.y0 + 6, 'z', false, Y - 0.3, 0x6a6f75);
    b.floorLoot(d.x, d.topY, d.z, true);
    return d;
  };
  const w1 = wh(-6, -84, 'S', 'wh1');
  wallSign(b, w1, 'S', 'RUSTY YARD', { y: 5.2 + Y, h: 1.4, w: 9, style: { bg: '#7a2f1a', fg: '#ffe6a8', border: '#2b1209', font: 'bold 80px Arial Black, Arial' } });
  wh(-6, 84, 'N', 'wh2');

  // office
  const off = b.building({
    id: 'yardoffice', x: cx + 97, z: cz - 28, w: 14, d: 9, floors: 2, floorH: 3.2, color: 0xd8c9a0, trim: 0x4a4030, floorColor: 0x7a6a55,
    baseColor: 0x77706a, roofColor: 0x5b5148, doors: [{ side: 'W', off: 0 }], roof: 'flat', parapet: 0.8, band: true, y: Y,
  });
  wallSign(b, off, 'W', 'OFFICE', { y: Y + 2.8, h: 0.8, w: 3.5 });
  b.stockBuilding(off, { chests: 2, floorSpots: 3 });

  // gantry crane
  const gx = cx + 82, gz = cz - 82;
  for (const [dx, dz] of [[-8, -3], [8, -3], [-8, 3], [8, 3]]) b.box(gx + dx, Y, gz + dz, 1.1, 24, 1.1, 0xe0a82a, { jit: 0.04 });
  b.slab(gx - 9, Y + 24, gz - 3.8, gx + 9, Y + 25.2, gz + 3.8, 0xc99320, { colBottom: Y + 23.8, jit: 0.03 });
  b.box(gx + 3, Y + 22.2, gz, 2.5, 1.8, 2.2, 0x333840, { solid: false });
  b.chest(gx, Y + 25.2, gz, 0);
  b.floorLoot(gx + 5, Y + 25.2, gz, true);
  // fuel tanks
  for (let i = 0; i < 3; i++) {
    const x = cx - 100 + i * 0, z = cz - 40 + i * 12;
    void x;
    b.cylinder(cx + 96, Y, cz + 30 + i * 11, 4.2, 7, [0xb8bdc2, 0xb04a3a, 0xb8bdc2][i], { sides: 14, uvScale: 3 });
    b.solid.cyl(cx + 96, Y + 7, cz + 30 + i * 11, 4.2, 0.8, 0x777c82, { sides: 14, rTop: 3.0, noCap: false });
    b.floorLoot(cx + 91, Y, cz + 30 + i * 11, false);
  }
  // forklift + barrels
  for (const [x, z] of [[-40, -2], [-38.8, -3.1], [20, -60], [22, -61], [-60, 12]]) b.barrel(cx + x, cz + z, 0xb04a3a, Y + 0.08);
  for (let i = 0; i < 10; i++) {
    const x = cx - 100 + rng() * 200, z = cz - 95 + rng() * 190;
    b.floorLoot(x, Y + 0.08, z, false);
  }
  for (const [x, z] of [[-104, 0], [104, 0]]) b.chest(cx + x, Y + 0.08, cz + z, 0);
  world.addBuilder(b, poi.id);
}
