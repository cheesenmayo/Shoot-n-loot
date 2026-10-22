import { Builder } from '../builder.js';
import { POI_BY_ID, LAKE } from '../poidata.js';
import { cabin, wallSign } from './common.js';
import { mulberry32 } from '../../util.js';

export function buildLake(world) {
  const poi = POI_BY_ID.bluewater_lake;
  const b = new Builder(world, 61);
  b.poiId = poi.id;
  const lx = LAKE.x, lz = LAKE.z;
  const rng = mulberry32(6161);
  const DECK = 1.2;

  // --- lighthouse on the island ------------------------------------------------------------------------
  const ix = lx, iz = lz + 6;
  const iy = b.h(ix, iz);
  const stripes = [0xf2f2f2, 0xc0392b, 0xf2f2f2, 0xc0392b, 0xf2f2f2];
  stripes.forEach((c, i) => {
    const r0 = 3.3 - i * 0.2, r1 = 3.3 - (i + 1) * 0.2;
    b.solid.cyl(ix, iy + i * 4.4, iz, r0, 4.4, c, { sides: 14, rTop: r1, noCap: true, uvScale: 3 });
  });
  b.col.addCircle(ix, iz, 3.2, iy - 1, iy + 22);
  b.slab(ix - 4.2, iy + 22, iz - 4.2, ix + 4.2, iy + 22.4, iz + 4.2, 0x2b2b2b, { colBottom: iy + 21.8 });
  b.glow.cyl(ix, iy + 22.4, iz, 1.6, 2.4, 0xfff2a8, { sides: 10, rTop: 1.4 });
  b.solid.cone(ix, iy + 24.8, iz, 2.4, 1.8, 0xc0392b, 10);
  const keeper = cabin(b, { id: 'keeper', x: ix + 12, z: iz + 2, w: 7, d: 6, side: 'W', y: iy, roofColor: 0xb44a3a, color: 0xf0e8d8, chests: 2, spots: 2 });
  void keeper;
  b.chest(ix - 7, iy, iz + 2, 0.5);

  // --- the long pier from the south shore to the island --------------------------------------------------
  let startZ = lz + 170;
  for (let z = lz + 175; z > iz; z -= 2) {
    if (b.h(lx, z) < DECK - 0.4) { startZ = z + 8; break; }
  }
  const endZ = iz + 6;
  b.mapRect(lx - 1.5, endZ, lx + 1.5, startZ, '#8a6a45');
  b.slab(lx - 1.3, DECK - 0.35, endZ, lx + 1.3, DECK, startZ, 0x8a6a45, { colBottom: DECK - 0.35, jit: 0.05, uvScale: 2 });
  for (let z = endZ; z < startZ; z += 6) {
    b.cylinder(lx - 1.1, -6, z, 0.18, DECK + 0.4 + 6, 0x4a3320, { sides: 5, solid: false });
    b.cylinder(lx + 1.1, -6, z, 0.18, DECK + 0.4 + 6, 0x4a3320, { sides: 5, solid: false });
    b.solid.box(lx - 1.3, DECK + 0.0, z, lx + 1.3, DECK + 0.08, z + 0.12, 0x5a4026, { ao: 1, noBottom: true });
  }
  // lantern posts along the pier
  for (let z = endZ + 6; z < startZ; z += 18) {
    b.cylinder(lx - 1.2, DECK, z, 0.08, 2.2, 0x2b2b2b, { sides: 5, solid: false });
    b.glow.blob(lx - 1.2, DECK + 2.3, z, 0.2, 0.2, 0.2, 0xfff0b0, { seg: 5, rings: 3, wobble: 0, ao: 1 });
  }
  // a short T-shaped side pier with boats
  const sx = lx + 3.8, sz = (endZ + startZ) / 2;
  b.slab(lx + 1.3, DECK - 0.35, sz - 1.2, lx + 18, DECK, sz + 1.2, 0x8a6a45, { colBottom: DECK - 0.35, jit: 0.05 });
  for (let i = 0; i < 2; i++) {
    const bx = lx + 7 + i * 7, bz = sz + 3.6;
    b.solid.box(bx - 2.2, 0.0, bz - 0.9, bx + 2.2, 0.75, bz + 0.9, i ? 0x2a6aaa : 0xb44a3a, { jit: 0.04 });
    b.solid.box(bx - 1.9, 0.7, bz - 0.7, bx + 1.9, 0.78, bz + 0.7, 0x8a6a45, { ao: 1, noBottom: true });
    b.col.addBox(bx - 2.2, -0.4, bz - 0.9, bx + 2.2, 0.75, bz + 0.9);
    b.floorLoot(bx, 0.8, bz, false);
  }
  b.chest(lx + 16, DECK, sz, 1.57);

  // --- cabins ringing the lake ----------------------------------------------------------------------------------
  const R = 183;
  const names = ['BOAT RENTAL', 'BAIT & TACKLE', null, null, 'FISHING LODGE', null, null, 'LAKE CAFE'];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.35;
    if (Math.abs(Math.cos(a)) < 0.2 && Math.sin(a) > 0.8) continue; // keep the pier approach clear
    const x = lx + Math.cos(a) * R, z = lz + Math.sin(a) * R;
    // door faces the lake centre
    const side = Math.abs(Math.cos(a)) > Math.abs(Math.sin(a)) ? (Math.cos(a) > 0 ? 'W' : 'E') : (Math.sin(a) > 0 ? 'N' : 'S');
    const big = names[i] === 'FISHING LODGE';
    const d = cabin(b, {
      id: 'lakecabin', x, z, w: big ? 13 : 8.5, d: big ? 9 : 7, floors: big ? 2 : 1, side, y: poi.y,
      color: [0xc9a46a, 0x9bb3c7, 0xd9c8a0, 0x8aa88f][i % 4], roofColor: [0x4a6a8a, 0x8a3a3a, 0x3f6a4a][i % 3], chests: big ? 2 : 1, spots: 2,
    });
    if (names[i]) wallSign(b, d, side, names[i], { y: d.y0 + 2.4, h: 0.8, w: 4.5, style: { bg: '#1f4a6a', fg: '#ffffff', border: '#0b1e2e', font: 'bold 56px Arial' } });
  }
  // beach loot + boats on land
  for (let i = 0; i < 18; i++) {
    const a = rng() * Math.PI * 2, r = 150 + rng() * 60;
    const x = lx + Math.cos(a) * r, z = lz + Math.sin(a) * r;
    const h = b.h(x, z);
    if (h > 1.8) b.floorLoot(x, h, z, false);
  }
  for (const a of [0.9, 2.2, 3.6, 5.3]) {
    const x = lx + Math.cos(a) * 158, z = lz + Math.sin(a) * 158;
    const h = b.h(x, z);
    if (h > 1.4) {
      b.box(x, h, z, 4.2, 0.8, 1.7, 0xb44a3a, { jit: 0.05 });
      b.chest(x + 3.5, h, z + 2, a);
    }
  }
  world.addBuilder(b, poi.id);
}
