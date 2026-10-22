import { Builder } from '../builder.js';
import { POI_BY_ID } from '../poidata.js';
import { cabin, tent, campfire, watchTower, wallSign } from './common.js';
import { mulberry32 } from '../../util.js';

export function buildPinewood(world) {
  const poi = POI_BY_ID.pinewood_camp;
  const b = new Builder(world, 41);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z, Y = poi.y;
  const rng = mulberry32(4141);

  // Ranger lodge (bigger, two floors)
  const lodge = cabin(b, { id: 'ranger', x: cx - 4, z: cz - 16, w: 14, d: 10, floors: 2, side: 'S', color: 0x6b4a2e, roofColor: 0x3f5a3a, y: Y, chests: 2, spots: 3, rise: 2.6 });
  wallSign(b, lodge, 'S', 'RANGER STATION', { y: lodge.y0 + 2.8, h: 0.9, w: 7, style: { bg: '#2f4a2f', fg: '#f2e8c8', border: '#14200f', font: 'bold 60px Georgia, serif' } });
  // bunk cabins around the clearing
  cabin(b, { x: cx + 20, z: cz - 10, w: 8, d: 7, side: 'W', y: Y });
  cabin(b, { x: cx + 22, z: cz + 8, w: 8, d: 7, side: 'W', y: Y, color: 0x80603c });
  cabin(b, { x: cx - 24, z: cz + 10, w: 8, d: 7, side: 'E', y: Y, color: 0x6a4a2a });
  cabin(b, { x: cx - 2, z: cz + 24, w: 9, d: 7, side: 'N', y: Y, color: 0x73542f });
  // sawmill: open shed + log piles
  const sx = cx + 40, sz = cz + 22;
  for (const [dx, dz] of [[-5, -4], [5, -4], [-5, 4], [5, 4]]) b.box(sx + dx, Y, sz + dz, 0.5, 4, 0.5, 0x6a4a2e, { jit: 0.05 });
  b.slab(sx - 6.5, Y + 4, sz - 5.5, sx + 6.5, Y + 4.3, sz + 5.5, 0x5a4033, { colBottom: Y + 3.9 });
  b.box(sx, Y, sz, 4, 0.9, 1.2, 0x7a5a3a);
  b.chest(sx + 3, Y, sz - 3, 0);
  for (let i = 0; i < 4; i++) for (let k = 0; k < 3 - (i % 2); k++) {
    const lx = sx - 10 + k * 0.95 + (i % 2) * 0.5, ly = Y + i * 0.85;
    b.solid.limb(lx, ly + 0.45, sz + 9 - 3, lx, ly + 0.45, sz + 9 + 3, 0.45, 0.45, 0x7a5a37, { sides: 7 });
  }
  b.col.addBox(sx - 10.6, Y - 0.5, sz + 5.8, sx - 7.6, Y + 3.0, sz + 12.2);
  // central fire + tents
  campfire(b, cx + 2, cz + 2);
  tent(b, cx - 12, cz - 4, 0xc9602b);
  tent(b, cx + 10, cz + 14, 0x2f7a9a);
  tent(b, cx - 12, cz + 20, 0x7a9a2f);
  tent(b, cx + 12, cz - 22, 0xc92b4a);
  b.chest(cx - 12, Y, cz - 8, 0);
  b.chest(cx + 10, Y, cz + 17, 0);
  // fire tower
  watchTower(b, cx + 52, cz - 22, { height: 11 });
  // picnic tables + stumps
  for (const [x, z] of [[-9, 6], [14, -2], [4, -8]]) {
    b.box(cx + x, Y, cz + z, 2.2, 0.8, 0.9, 0x7a5a3a, { jit: 0.05 });
    b.box(cx + x, Y, cz + z - 1.1, 2.2, 0.4, 0.4, 0x6a4a2a, { solid: false });
    b.box(cx + x, Y, cz + z + 1.1, 2.2, 0.4, 0.4, 0x6a4a2a, { solid: false });
  }
  for (let i = 0; i < 14; i++) {
    const a = rng() * Math.PI * 2, r = 12 + rng() * 48;
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
    b.floorLoot(x, b.h(x, z), z, false);
  }
  // fenced lookout over the cliff edge? keep it simple: a few boulders
  for (let i = 0; i < 6; i++) {
    const a = rng() * Math.PI * 2, r = 55 + rng() * 25;
    world.props.addInstance(rng() < 0.5 ? 'rockM' : 'rockS', cx + Math.cos(a) * r, cz + Math.sin(a) * r, 0.9 + rng() * 0.6, rng() * 6.28);
  }
  world.addBuilder(b, poi.id);
}
