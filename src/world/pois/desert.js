import { Builder } from '../builder.js';
import { POI_BY_ID, DESERT } from '../poidata.js';
import { wallSign, porch, findSites, windmill, waterTower } from './common.js';
import { mulberry32, pick } from '../../util.js';

const WOODS = [0xa07a4f, 0x8c6a45, 0xb08a5a, 0x946b48, 0x9a7f5e];
const TRIM = 0x3d2c1d;

// One Wild West building with false front, porch and (optionally) a balcony.
function westBuilding(b, o) {
  const side = o.side;
  const color = o.color ?? pick(WOODS);
  const d = b.building({
    id: o.id, x: o.x, z: o.z, w: o.w, d: o.d, floors: o.floors ?? 1, floorH: 3.4,
    color, trim: TRIM, floorColor: 0x7a5b3a, baseColor: 0x6e6252, slabColor: 0x80654a, roofColor: 0x5b4a3a, stairColor: 0x6f4f33,
    doors: [{ side, off: o.doorOff ?? 0 }, ...(o.backDoor ? [{ side: { N: 'S', S: 'N', E: 'W', W: 'E' }[side], off: 0 }] : [])],
    roof: 'flat', parapet: 0.55, band: (o.floors ?? 1) > 1, doorW: o.doorW ?? 1.9, windowSpacing: 3.4, y: o.y,
  });
  // false front above the roofline
  const alongX = side === 'N' || side === 'S';
  const fh = 2.0;
  const topY = d.topY;
  if (alongX) {
    const zf = side === 'S' ? d.maxZ - 0.15 : d.minZ + 0.15;
    b.box(d.x, topY, zf, o.w + 0.2, fh, 0.35, color, { jit: 0.02 });
    b.box(d.x, topY + fh, zf, o.w + 0.5, 0.18, 0.5, TRIM, { jit: 0 });
  } else {
    const xf = side === 'E' ? d.maxX - 0.15 : d.minX + 0.15;
    b.box(xf, topY, d.z, 0.35, fh, o.d + 0.2, color, { jit: 0.02 });
    b.box(xf, topY + fh, d.z, 0.5, 0.18, o.d + 0.5, TRIM, { jit: 0 });
  }
  if (o.sign) wallSign(b, d, side, o.sign, { y: topY + fh * 0.5 + 0.1, h: 1.3, w: Math.min(o.w - 1, Math.max(4, o.sign.length * 0.75)), style: o.signStyle });
  if (o.porch !== false) {
    const p = porch(b, d, side, 3.2);
    if ((o.floors ?? 1) > 1) {
      // exterior stairs up to the balcony (the porch roof doubles as a balcony floor)
      const sx = alongX ? p.x1 - 2.4 : p.x0;
      const rise = d.floorH;
      const len = rise / 0.55;
      // balcony: raise the porch roof slab to the 2nd floor height
      b.slab(p.x0 - 0.1, d.y0 + d.floorH - 0.2, p.z0 - 0.1, p.x1 + 0.1, d.y0 + d.floorH + 0.05, p.z1 + 0.1, 0x7a5b3a, { colBottom: d.y0 + d.floorH - 0.2 });
      if (alongX) {
        const zs0 = side === 'S' ? p.z1 : p.z0 - len;
        b.stairs(d.maxX, zs0 - 0, d.maxX + 1.6, zs0 + len, d.y0 + 0.1, d.y0 + d.floorH + 0.05, 'z', side === 'N', d.y0 - 0.2, 0x6f4f33);
      }
      // balcony railing (visual + collider)
      if (alongX) {
        const zr = side === 'S' ? p.z1 - 0.1 : p.z0 + 0.1;
        b.slab(p.x0, d.y0 + d.floorH + 0.05, zr - 0.05, p.x1, d.y0 + d.floorH + 1.15, zr + 0.05, 0x5a4026, { jit: 0.03 });
      }
      b.floorLoot((p.x0 + p.x1) / 2, d.y0 + d.floorH + 0.05, (p.z0 + p.z1) / 2, true, 'west');
    }
  }
  b.stockBuilding(d, { chests: o.chests ?? 1, floorSpots: o.spots ?? 2 });
  // interior dressing
  const rng = o.rng ?? b.rng;
  for (let i = 0; i < (o.props ?? 2); i++) {
    const px = d.minX + 1 + rng() * (d.maxX - d.minX - 2), pz = d.minZ + 1 + rng() * (d.maxZ - d.minZ - 2);
    if (d.floors > 1 && px < d.minX + 3) continue;
    if (rng() < 0.5) b.crate(px, pz, 0.9, 0x9b7745, d.y0);
    else b.barrel(px, pz, 0x7a4b2a, d.y0);
  }
  return d;
}

function trough(b, x, z, alongX = true) {
  const y = b.h(x, z);
  b.box(x, y, z, alongX ? 3 : 0.8, 0.7, alongX ? 0.8 : 3, 0x6b4a2b, { jit: 0.04 });
  b.glow.box(x - (alongX ? 1.3 : 0.3), y + 0.55, z - (alongX ? 0.3 : 1.3), x + (alongX ? 1.3 : 0.3), y + 0.62, z + (alongX ? 0.3 : 1.3), 0x2f6f9a, { jit: 0, ao: 1 });
}

function hitchingPost(b, x, z) {
  const y = b.h(x, z);
  b.box(x - 0.8, y, z, 0.15, 1.3, 0.15, 0x4a3524, { solid: false });
  b.box(x + 0.8, y, z, 0.15, 1.3, 0.15, 0x4a3524, { solid: false });
  b.box(x, y + 1.0, z, 1.8, 0.12, 0.12, 0x4a3524, { solid: false });
}

function wagon(b, x, z, yawAlongX = true) {
  const y = b.h(x, z);
  const w = yawAlongX ? 3.6 : 1.8, d = yawAlongX ? 1.8 : 3.6;
  b.box(x, y + 0.5, z, w, 0.9, d, 0x8a6338, { jit: 0.05 });
  for (const s of [-1, 1]) {
    for (const t of [-1, 1]) {
      const wx = yawAlongX ? x + t * 1.1 : x + s * 1.0, wz = yawAlongX ? z + s * 1.0 : z + t * 1.1;
      b.solid.cyl(wx, y, wz, 0.5, 0.12, 0x3b2a1a, { sides: 8, uvScale: 1 });
    }
  }
  b.box(x, y + 1.4, z, w - 0.4, 0.8, d - 0.4, 0xd9cbaa, { solid: false, jit: 0.04 });
}

function tracks(b, x, z0, z1) {
  const y = (zz) => b.h(x, zz);
  const n = Math.round((z1 - z0) / 1.3);
  for (let i = 0; i < n; i++) {
    const zz = z0 + i * 1.3;
    const yy = y(zz);
    b.solid.box(x - 1.3, yy - 0.02, zz - 0.15, x + 1.3, yy + 0.12, zz + 0.15, 0x4b3a2a, { jit: 0.08, ao: 1 });
  }
  const seg = 8;
  for (let zz = z0; zz < z1; zz += seg) {
    const za = zz, zb = Math.min(z1, zz + seg);
    const ya = y(za), yb = y(zb);
    for (const s of [-0.72, 0.72]) {
      b.solid.box(x + s - 0.07, Math.min(ya, yb) + 0.1, za, x + s + 0.07, Math.max(ya, yb) + 0.2, zb, 0x6d6d70, { jit: 0.03, ao: 1 });
    }
  }
}

function train(b, x, zStart) {
  const y = b.h(x, zStart);
  // locomotive (nose pointing -z)
  const zc = zStart;
  b.box(x, y + 0.9, zc, 3.0, 2.2, 8.0, 0x24262b, { jit: 0.02 });
  b.box(x, y + 3.1, zc + 2.4, 3.0, 2.6, 3.2, 0x2f3238, { jit: 0.02 });
  b.box(x, y + 5.7, zc + 2.4, 3.4, 0.3, 3.6, 0x1c1d20, { jit: 0 });
  b.cylinder(x, y + 3.1, zc - 2.4, 0.55, 2.2, 0x1c1d20, { sides: 8 });
  b.solid.cyl(x, y + 5.3, zc - 2.4, 0.8, 0.4, 0x1c1d20, { sides: 8, rTop: 0.5, noCap: true });
  b.solid.cyl(x, y + 1.2, zc - 3.9, 1.0, 0.8, 0x6a1f1f, { sides: 10, noCap: true });
  for (const sx of [-1.45, 1.45]) for (let i = 0; i < 4; i++) b.solid.cyl(x + sx, y + 0.5, zc - 2.5 + i * 2.0, 0.55, 0.15, 0x111111, { sides: 8, ao: 1 });
  b.solid.box(x - 1.6, y + 0.0, zc - 4.0, x + 1.6, y + 0.5, zc + 4.0, 0x3a3a3a, { ao: 1 });
  // cars
  const colors = [0x8b2f2a, 0x7a5a2a, 0x3d5a6e];
  for (let i = 0; i < 3; i++) {
    const cz = zc + 9.5 + i * 10.5;
    b.box(x, y + 0.7, cz, 3.0, 3.1, 9.6, colors[i], { jit: 0.03, uvScale: 2 });
    b.box(x, y + 3.8, cz, 3.2, 0.2, 9.8, 0x2b2b2b, { jit: 0 });
    for (const sx of [-1.45, 1.45]) for (let k = 0; k < 2; k++) b.solid.cyl(x + sx, y + 0.45, cz - 3 + k * 6, 0.45, 0.14, 0x111111, { sides: 8, ao: 1 });
    // open door slot visual
    b.glow.box(x + 1.52, y + 1.0, cz - 1.0, x + 1.55, y + 3.0, cz + 1.0, 0x251a12, { jit: 0, ao: 1 });
    b.floorLoot(x, y + 3.8, cz, true, 'west');
  }
  b.chest(x, y + 3.8, zc + 9.5 + 21, 0);
}

export function buildDesert(world) {
  const poi = POI_BY_ID.distant_desert;
  const b = new Builder(world, 23);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z;
  const rng = mulberry32(2323);
  const Y = poi.y;

  // dirt main street
  b.mapRect(cx - 62, cz - 6, cx + 56, cz + 6, '#b08d5c');
  b.solid.box(cx - 62, Y - 0.02, cz - 6, cx + 56, Y + 0.05, cz + 6, 0xb08d5c, { jit: 0.03, ao: 1, uvScale: 5 });
  b.solid.box(cx - 62, Y - 0.02, cz - 0.3, cx + 56, Y + 0.06, cz + 0.3, 0x9a7a4d, { jit: 0.05, ao: 1 });

  const north = (id, x, w, d, o = {}) => westBuilding(b, { id, x: cx + x, z: cz - 7.5 - d / 2, w, d, side: 'S', rng, ...o });
  const south = (id, x, w, d, o = {}) => westBuilding(b, { id, x: cx + x, z: cz + 7.5 + d / 2, w, d, side: 'N', rng, ...o });

  north('saloon', -32, 17, 12, { floors: 2, color: 0x93503a, sign: 'SALOON', chests: 2, spots: 3, props: 4, backDoor: true });
  north('bank', -9, 11, 10, { color: 0xc9b898, sign: 'BANK', chests: 2, spots: 2, signStyle: { bg: '#2d3a2a', fg: '#e9d78a' } });
  north('sheriff', 7, 10, 9, { color: 0x9a7448, sign: 'SHERIFF', chests: 1, spots: 2, signStyle: { bg: '#4a3a1a', fg: '#ffd84a' } });
  north('store', 23, 12, 9, { color: 0x6f8a8c, sign: 'GENERAL STORE', chests: 1, spots: 3, props: 5 });
  south('hotel', -28, 17, 11, { floors: 2, color: 0xb48a60, sign: 'HOTEL', chests: 2, spots: 3, backDoor: true });
  south('stable', -6, 14, 10, { color: 0x8c6a45, sign: 'STABLES', chests: 1, spots: 2, doorW: 3.2, props: 5, porch: false });
  south('doc', 10, 9, 8, { color: 0xa8b6a0, sign: 'DOC', chests: 1, spots: 2 });
  south('house', 24, 10, 9, { color: 0xa5764d, chests: 1, spots: 2, sign: 'HOME' });

  // street furniture
  for (const x of [-38, -20, -2, 14, 30]) hitchingPost(b, cx + x, cz - 4.6);
  for (const x of [-16, 18]) hitchingPost(b, cx + x, cz + 4.6);
  trough(b, cx - 2, cz - 5.4); trough(b, cx + 30, cz + 5.4);
  wagon(b, cx - 12, cz + 2, true);
  wagon(b, cx + 40, cz - 1, true);
  for (const [x, z] of [[-45, -12], [-46, 16], [48, -14], [50, 12]]) b.crate(cx + x, cz + z, 1.2, 0x9b7745);
  for (const [x, z] of [[-44, 8], [-43, 9.2], [47, -9], [46, -10.3]]) b.barrel(cx + x, cz + z);
  b.hay(cx - 36, cz + 24); b.hay(cx - 34.2, cz + 24.4);

  // water tower + windmill
  waterTower(b, cx + 46, cz - 24);
  b.chest(cx + 46, b.h(cx + 46, cz - 24), cz - 22.2, 0);
  windmill(b, world, cx - 52, cz + 26);

  // train station and a parked train
  const tx = cx + 100;
  tracks(b, tx, cz - 170, cz + 170);
  const st = b.building({
    id: 'station', x: tx - 12, z: cz - 6, w: 7, d: 16, floors: 1, color: 0x8a6a4a, trim: TRIM, floorColor: 0x7a5b3a,
    baseColor: 0x6e6252, roofColor: 0x5b4a3a, doors: [{ side: 'E', off: 0 }, { side: 'W', off: 0 }], roof: 'flat', parapet: 0.5,
  });
  wallSign(b, st, 'E', 'DISTANT DESERT', { y: st.topY - 0.5, h: 1.1, w: 6 });
  porch(b, st, 'E', 3);
  b.stockBuilding(st, { chests: 2, floorSpots: 3 });
  train(b, tx, cz + 14);

  // cacti & rocks right around the town (generic scatter is suppressed inside clearR)
  const ring = (n, r0, r1, type, sc0 = 0.8, sc1 = 1.3) => {
    for (let i = 0; i < n; i++) {
      const a = rng() * Math.PI * 2, r = r0 + rng() * (r1 - r0);
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      if (Math.abs(z - cz) < 14 && x > cx - 70 && x < cx + 120) continue;
      if (Math.abs(x - tx) < 8) continue;
      world.props.addInstance(type, x, z, sc0 + rng() * (sc1 - sc0), rng() * 6.28);
    }
  };
  ring(26, 60, 148, 'cactus');
  ring(18, 60, 148, 'cactus2');
  ring(10, 55, 148, 'dead');
  ring(26, 50, 148, 'rockS', 0.7, 1.5);
  ring(8, 80, 148, 'rockM', 0.8, 1.4);
  ring(12, 55, 148, 'bushDry');
  // loot lying around town
  for (let i = 0; i < 16; i++) {
    const a = rng() * Math.PI * 2, r = 6 + rng() * 60;
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
    if (z < cz - 7 && z > cz - 7 - 12 && Math.abs(x - cx) < 40) continue;
    b.floorLoot(x, b.h(x, z), z, false, 'west');
  }

  world.addBuilder(b, poi.id);

  // ---- homesteads scattered around the desert ----------------------------
  const sites = findSites(world, {
    count: 9, seed: 77, radius: 1000, minSep: 85, flatness: 1.3, footprint: 7,
    accept: (x, z, h) => Math.hypot(x - DESERT.x, z - DESERT.z) < 300 && Math.hypot(x - DESERT.x, z - DESERT.z) > 190 && h < 14,
  });
  const hb = new Builder(world, 91);
  hb.poiId = poi.id;
  for (const s of sites) {
    const r = s.rng;
    const w = 8 + Math.floor(r() * 4), d = 7 + Math.floor(r() * 3);
    const side = ['N', 'S', 'E', 'W'][Math.floor(r() * 4)];
    westBuilding(hb, { id: 'homestead', x: s.x, z: s.z, w, d, side, floors: 1, rng: r, chests: 1, spots: 2, props: 2, sign: r() < 0.5 ? 'RANCH' : null, porch: r() < 0.7 });
    // outbuildings
    if (r() < 0.6) windmill(hb, world, s.x + 13, s.z - 6);
    else waterTower(hb, s.x - 12, s.z - 8, { height: 6 });
    hb.fence(s.x - 8, s.z + 14, s.x + 8, s.z + 14);
    hb.fence(s.x - 8, s.z + 14, s.x - 8, s.z + 24);
    hb.fence(s.x + 8, s.z + 14, s.x + 8, s.z + 24);
    hb.fence(s.x - 8, s.z + 24, s.x + 8, s.z + 24);
    hb.hay(s.x + 3, s.z + 18);
    hb.crate(s.x - 3, s.z + 19, 1.1, 0x9b7745);
    hb.floorLoot(s.x, hb.h(s.x, s.z + 18), s.z + 18, false, 'west');
    for (let i = 0; i < 3; i++) world.props.addInstance(r() < 0.5 ? 'cactus' : 'rockS', s.x + (r() - 0.5) * 50, s.z + (r() - 0.5) * 50, 0.8 + r() * 0.6, r() * 6.28);
    world.homesteads = (world.homesteads || []);
    world.homesteads.push({ x: s.x, z: s.z });
  }
  world.addBuilder(hb, 'desert_homesteads');
}
