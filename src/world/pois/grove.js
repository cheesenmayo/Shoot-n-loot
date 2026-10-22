import * as THREE from 'three';
import { Builder } from '../builder.js';
import { POI_BY_ID } from '../poidata.js';
import { wallSign, windmill } from './common.js';
import { mulberry32 } from '../../util.js';

export function buildGrove(world) {
  const poi = POI_BY_ID.floorange_grove;
  const b = new Builder(world, 31);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z, Y = poi.y;
  const rng = mulberry32(3131);

  // --- Juice factory (2 floors) with a giant Floorange on the roof ----------------------------------
  const fac = b.building({
    id: 'factory', x: cx - 20, z: cz - 6, w: 17, d: 12, floors: 2, floorH: 3.5, color: 0xf4efe2, trim: 0xe8841f,
    floorColor: 0xcfc6b0, baseColor: 0x8a847a, slabColor: 0xd7d0c0, roofColor: 0x8a847a, stairColor: 0xb8a98a,
    doors: [{ side: 'S', off: -3 }, { side: 'E', off: 0 }], roof: 'flat', parapet: 1.0, band: true, windowSpacing: 3.2, y: Y,
  });
  wallSign(b, fac, 'S', 'FLOORANGE JUICE CO.', { y: fac.y0 + 2.95, h: 1.0, w: 9, style: { bg: '#e8841f', fg: '#ffffff', border: '#7a3a00', font: 'bold 70px Arial Black, Arial' } });
  b.stockBuilding(fac, { chests: 2, floorSpots: 3 });
  b.solid.blob(cx - 20, fac.topY + 3.2, cz - 6, 3.4, 3.2, 3.4, 0xff8a1a, { seg: 12, rings: 8, wobble: 0.02, ao: 0.85 });
  b.solid.cyl(cx - 20, fac.topY + 6.2, cz - 6, 0.35, 0.7, 0x2e8b2e, { sides: 6, noCap: false });
  // crates of oranges out front
  for (let i = 0; i < 7; i++) b.crate(cx - 28 + i * 1.35, cz + 1.5 + (i % 2) * 0.4, 1.1, 0xe8841f, null);

  // --- Barn with hayloft ----------------------------------------------------------------------------
  const barn = b.building({
    id: 'barn', x: cx + 20, z: cz - 14, w: 20, d: 15, floors: 2, floorH: 3.6, color: 0xa63a2a, trim: 0xf3efe6,
    floorColor: 0x7a5b3a, baseColor: 0x7c766e, roofColor: 0x5a4a45, slabColor: 0x85684a, stairColor: 0x75573a, roof: 'gable', rise: 3.8, ridge: 'x',
    doors: [{ side: 'S', off: 0 }, { side: 'N', off: 0 }], doorW: 4.4, doorH: 3.2, windowSpacing: 4.5, y: Y,
  });
  b.stockBuilding(barn, { chests: 2, floorSpots: 4 });
  b.hay(cx + 14, cz - 10, Y + 0.12); b.hay(cx + 15.8, cz - 10, Y + 0.12); b.hay(cx + 14.9, cz - 10, Y + 1.12);

  // --- Farmhouse ----------------------------------------------------------------------------------------
  const fh = b.building({
    id: 'farmhouse', x: cx + 4, z: cz + 20, w: 12, d: 9, floors: 1, floorH: 3.2, color: 0xf0e7d0, trim: 0x8a3a2a,
    floorColor: 0x8a6a4a, baseColor: 0x8a837a, roofColor: 0x8a3a2a, roof: 'gable', rise: 2.8, chimney: true,
    doors: [{ side: 'N', off: 0 }], windowSpacing: 3.2, y: Y,
  });
  b.stockBuilding(fh, { chests: 1, floorSpots: 3 });

  // --- Silo + windmill + props -----------------------------------------------------------------------------
  b.cylinder(cx + 38, Y, cz + 4, 3.6, 15, 0xc9c2b4, { sides: 14, uvScale: 3 });
  b.solid.cyl(cx + 38, Y + 15, cz + 4, 3.8, 3.2, 0x8a8f94, { sides: 14, rTop: 0.01, noCap: true });
  b.chest(cx + 38, Y, cz + 8.4, 0);
  windmill(b, world, cx - 40, cz + 14, { y: Y, height: 12 });
  for (let i = 0; i < 6; i++) b.hay(cx + 30 + (i % 3) * 2.0, cz - 28 + Math.floor(i / 3) * 1.6, Y);
  // paddock fence
  b.fence(cx + 6, cz + 34, cx + 36, cz + 34);
  b.fence(cx + 6, cz + 34, cx + 6, cz + 48);
  b.fence(cx + 36, cz + 34, cx + 36, cz + 48);
  b.fence(cx + 6, cz + 48, cx + 36, cz + 48);
  // farm stand
  b.box(cx - 8, Y, cz + 30, 5, 0.9, 1.6, 0x9b7745, { jit: 0.05 });
  b.solid.box(cx - 10.8, Y + 2.2, cz + 28.6, cx - 5.2, Y + 2.4, cz + 31.4, 0xe8841f, { ao: 1 });
  b.cylinder(cx - 10.6, Y, cz + 28.8, 0.1, 2.3, 0x6a4a2e, { sides: 5, solid: false });
  b.cylinder(cx - 5.4, Y, cz + 28.8, 0.1, 2.3, 0x6a4a2e, { sides: 5, solid: false });
  b.chest(cx - 8, Y + 0.9, cz + 30, 0);

  // dirt paths
  b.solid.box(cx - 40, Y + 0.0, cz + 3, cx + 40, Y + 0.05, cz + 9, 0xa38860, { jit: 0.03, ao: 1, uvScale: 5 });
  b.solid.box(cx - 1, Y + 0.0, cz - 30, cx + 5, Y + 0.05, cz + 40, 0xa38860, { jit: 0.03, ao: 1, uvScale: 5 });

  // --- orchard -----------------------------------------------------------------------------------------------------
  const keep = (x, z) => {
    const dx = x - cx, dz = z - cz;
    if (Math.abs(dx) < 48 && dz > -34 && dz < 54) return false;
    if (Math.abs(dx + 8) < 3.5 && dz > 0) return false;
    return Math.hypot(dx, dz) < 112;
  };
  let trees = 0;
  for (let gz = -110; gz <= 110; gz += 9) {
    for (let gx = -112; gx <= 112; gx += 8) {
      const x = cx + gx + (rng() - 0.5) * 1.2, z = cz + gz + (rng() - 0.5) * 1.2;
      if (!keep(x, z)) continue;
      world.props.addInstance('orange', x, z, 0.85 + rng() * 0.3, rng() * 6.28);
      trees++;
      if (rng() < 0.16) b.floorLoot(x + (rng() - 0.5) * 3, b.h(x, z), z + (rng() - 0.5) * 3, false, 'floorange');
    }
  }
  b.chest(cx - 60, b.h(cx - 60, cz - 60), cz - 60, 0.3);
  b.chest(cx + 70, b.h(cx + 70, cz + 50), cz + 50, 2.1);
  b.chest(cx + 40, b.h(cx + 40, cz - 70), cz - 70, 4.1);
  b.chest(cx - 70, b.h(cx - 70, cz + 40), cz + 40, 1.1);

  world.addBuilder(b, poi.id);
}
