import * as THREE from 'three';
import { makeSign } from '../builder.js';
import { POIS } from '../poidata.js';
import { WORLD } from '../terrain.js';
import { mulberry32 } from '../../util.js';

/** Hang a sign on a wall of building `d` (side = which wall faces out). */
export function wallSign(b, d, side, text, { w = null, h = 1.1, y = null, style = {} } = {}) {
  const len = side === 'N' || side === 'S' ? d.maxX - d.minX : d.maxZ - d.minZ;
  const sw = w ?? Math.min(len - 0.6, Math.max(3, text.length * 0.7));
  const sign = makeSign(text, sw, h, style);
  const yy = y ?? d.y0 + d.floorH * d.floors + 0.9;
  const out = 0.42;
  if (side === 'S') { sign.position.set(d.x, yy, d.maxZ + out); }
  else if (side === 'N') { sign.position.set(d.x, yy, d.minZ - out); sign.rotation.y = Math.PI; }
  else if (side === 'E') { sign.position.set(d.maxX + out, yy, d.z); sign.rotation.y = Math.PI / 2; }
  else { sign.position.set(d.minX - out, yy, d.z); sign.rotation.y = -Math.PI / 2; }
  b.meshes.push(sign);
  return sign;
}

/** A raised wooden porch with a roof (and a balcony when the building has 2+ floors). */
export function porch(b, d, side, depth = 3, color = 0x7a5b3a, posts = 0x5a4026) {
  const alongX = side === 'N' || side === 'S';
  const sgn = side === 'S' || side === 'E' ? 1 : -1;
  const y = d.y0;
  const x0 = alongX ? d.minX : sgn > 0 ? d.maxX : d.minX - depth;
  const x1 = alongX ? d.maxX : sgn > 0 ? d.maxX + depth : d.minX;
  const z0 = alongX ? (sgn > 0 ? d.maxZ : d.minZ - depth) : d.minZ;
  const z1 = alongX ? (sgn > 0 ? d.maxZ + depth : d.minZ) : d.maxZ;
  b.slab(x0, y - 0.8, z0, x1, y + 0.1, z1, color, { colBottom: y - 0.8, jit: 0.04 });
  const roofY = y + 3.3;
  b.slab(x0 - 0.1, roofY, z0 - 0.1, x1 + 0.1, roofY + 0.2, z1 + 0.1, color, { colBottom: roofY, jit: 0.04 });
  const n = Math.max(2, Math.round((alongX ? x1 - x0 : z1 - z0) / 3.2) + 1);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const px = alongX ? x0 + 0.25 + t * (x1 - x0 - 0.5) : sgn > 0 ? x1 - 0.2 : x0 + 0.2;
    const pz = alongX ? (sgn > 0 ? z1 - 0.2 : z0 + 0.2) : z0 + 0.25 + t * (z1 - z0 - 0.5);
    b.cylinder(px, y + 0.1, pz, 0.13, 3.2, posts, { sides: 6 });
  }
  return { x0, x1, z0, z1, roofY };
}

/** Pick `count` build sites on gentle terrain with spacing rules. */
export function findSites(world, { count, accept, minSep = 60, radius = 900, seed = 1, avoidPois = true, tries = 4000, flatness = 1.2, footprint = 6 }) {
  const rng = mulberry32(seed);
  const sites = [];
  const t = world.terrain;
  for (let i = 0; i < tries && sites.length < count; i++) {
    const a = rng() * Math.PI * 2, r = Math.sqrt(rng()) * radius;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (Math.hypot(x, z) > WORLD.limit - 80) continue;
    const h = t.height(x, z);
    if (h < 2.5) continue;
    if (avoidPois && POIS.some((p) => Math.hypot(x - p.x, z - p.z) < p.clearR + 40)) continue;
    if (sites.some((s) => Math.hypot(x - s.x, z - s.z) < minSep)) continue;
    let lo = h, hi = h;
    for (const [dx, dz] of [[footprint, 0], [-footprint, 0], [0, footprint], [0, -footprint]]) {
      const hh = t.height(x + dx, z + dz);
      lo = Math.min(lo, hh); hi = Math.max(hi, hh);
    }
    if (hi - lo > flatness) continue;
    if (accept && !accept(x, z, h)) continue;
    sites.push({ x, z, h, rng: mulberry32(seed * 1000 + sites.length) });
  }
  return sites;
}

export function makeBox(w, h, d, color, opts = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...opts }));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Windmill with a rotating rotor (registered in world.animated). */
export function windmill(b, world, x, z, { height = 11, color = 0x8f9aa3, y = null } = {}) {
  const y0 = y ?? b.h(x, z) - 0.1;
  const segs = 3, segH = height / segs;
  for (let i = 0; i < segs; i++) {
    const w = 3.0 - i * 0.65;
    b.box(x, y0 + i * segH, z, w, segH, w, 0x7b5f45, { jit: 0.05, uvScale: 2 });
  }
  const top = y0 + height;
  b.box(x, top, z, 2.0, 0.5, 2.0, 0x4a3b2d);
  const hub = new THREE.Group();
  hub.position.set(x + 1.15, top + 1.6, z);
  const rotor = new THREE.Group();
  const bladeMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.2 });
  for (let i = 0; i < 8; i++) {
    const arm = new THREE.Group();
    arm.rotation.z = (i / 8) * Math.PI * 2;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3.4, 0.06), bladeMat);
    blade.position.set(0, 2.2, 0);
    blade.castShadow = true;
    arm.add(blade);
    rotor.add(arm);
  }
  const center = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.5, 8).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x333333 }));
  rotor.add(center);
  hub.add(rotor);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.8), bladeMat);
  tail.position.set(-3.6, 0.2, 0);
  hub.add(tail);
  rotor.rotation.y = Math.PI / 2; // blades in the y-z plane
  hub.rotation.y = 0;
  b.meshes.push(hub);
  const spin = new THREE.Group();
  // spin around the x axis (the rotor faces +x)
  hub.remove(rotor);
  spin.add(rotor);
  rotor.rotation.set(0, Math.PI / 2, 0);
  hub.add(spin);
  const speed = 0.8 + Math.random() * 0.6;
  world.animated.push({ update: (dt) => { spin.rotation.x += dt * speed; } });
  b.floorLoot(x + 2.2, y0, z + 1.5, false);
}

export function waterTower(b, x, z, { y = null, height = 8 } = {}) {
  const y0 = y ?? b.h(x, z) - 0.1;
  for (const [dx, dz] of [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]]) b.box(x + dx, y0, z + dz, 0.4, height, 0.4, 0x5a4026, { jit: 0.05 });
  b.box(x, y0 + height * 0.45, z, 3.8, 0.2, 0.2, 0x5a4026, { solid: false });
  b.cylinder(x, y0 + height, z, 2.2, 3.0, 0x8b5a3a, { sides: 12, uvScale: 2 });
  b.solid.cyl(x, y0 + height + 3.0, z, 2.3, 1.1, 0x4a3524, { sides: 12, rTop: 0.01, noCap: true });
  b.solid.cyl(x, y0 + height + 0.9, z, 2.25, 0.12, 0x2b2b2b, { sides: 12, noCap: true, ao: 1 });
  b.solid.cyl(x, y0 + height + 2.0, z, 2.25, 0.12, 0x2b2b2b, { sides: 12, noCap: true, ao: 1 });
}

/** Little log cabin with a pitched roof; returns the building descriptor. */
export function cabin(b, o) {
  const d = b.building({
    id: o.id || 'cabin', x: o.x, z: o.z, w: o.w ?? 8, d: o.d ?? 7, floors: o.floors ?? 1, floorH: 3.1,
    color: o.color ?? 0x7a5636, trim: o.trim ?? 0x3a2716, floorColor: 0x6a4a2e, baseColor: 0x77706a,
    roofColor: o.roofColor ?? 0x4f3a2c, roof: 'gable', rise: o.rise ?? 2.2, chimney: o.chimney !== false,
    doors: [{ side: o.side ?? 'S', off: o.doorOff ?? 0 }], windowSpacing: 3.2, ridge: o.ridge, y: o.y, uvScale: 1.8,
    stairColor: 0x6a4a2e, slabColor: 0x7a5a3a,
  });
  // log stripes
  if (o.logs !== false) {
    const rows = Math.floor(3.0 / 0.55);
    for (let i = 1; i < rows; i++) {
      const y = d.y0 + 0.12 + i * 0.55;
      b.solid.box(d.minX - 0.03, y, d.minZ - 0.03, d.maxX + 0.03, y + 0.07, d.minZ + 0.02, 0x3e2a18, { ao: 1, jit: 0.1, noBottom: true });
      b.solid.box(d.minX - 0.03, y, d.maxZ - 0.02, d.maxX + 0.03, y + 0.07, d.maxZ + 0.03, 0x3e2a18, { ao: 1, jit: 0.1, noBottom: true });
    }
  }
  if (o.stock !== false) b.stockBuilding(d, { chests: o.chests ?? 1, floorSpots: o.spots ?? 2 });
  return d;
}

export function tent(b, x, z, color = 0xc9602b, size = 3.2, y = null) {
  const y0 = y ?? b.h(x, z);
  b.solid.cone(x, y0, z, size, size * 0.8, color, 4, { ao: 0.75 });
  b.col.addCircle(x, z, size * 0.55, y0 - 0.3, y0 + size * 0.5);
}

export function campfire(b, x, z, y = null) {
  const y0 = y ?? b.h(x, z);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    b.solid.limb(x + Math.cos(a) * 0.7, y0 + 0.1, z + Math.sin(a) * 0.7, x + Math.cos(a) * 0.1, y0 + 0.45, z + Math.sin(a) * 0.1, 0.12, 0.1, 0x4a3320, { sides: 5 });
  }
  b.glow.blob(x, y0 + 0.5, z, 0.45, 0.55, 0.45, 0xff9a2a, { seg: 6, rings: 3, wobble: 0.15, ao: 1 });
  b.glow.blob(x, y0 + 0.75, z, 0.25, 0.4, 0.25, 0xffe06a, { seg: 5, rings: 3, wobble: 0.1, ao: 1 });
  b.smokes.push({ x, y: y0 + 1.1, z, kind: 'fire' });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    b.box(x + Math.cos(a) * 2.3, y0, z + Math.sin(a) * 2.3, 1.2, 0.45, 0.45, 0x6a4a2e, { jit: 0.1 });
  }
}

export function watchTower(b, x, z, { height = 8, y = null, color = 0x6a4a2e } = {}) {
  const y0 = y ?? b.h(x, z) - 0.1;
  for (const [dx, dz] of [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]]) b.box(x + dx, y0, z + dz, 0.45, height, 0.45, color, { jit: 0.06 });
  // cross braces (visual)
  b.solid.box(x - 1.6, y0 + height * 0.45, z - 1.65, x + 1.6, y0 + height * 0.45 + 0.2, z - 1.55, color, { ao: 1 });
  b.solid.box(x - 1.6, y0 + height * 0.45, z + 1.55, x + 1.6, y0 + height * 0.45 + 0.2, z + 1.65, color, { ao: 1 });
  b.slab(x - 2.3, y0 + height, z - 2.3, x + 2.3, y0 + height + 0.3, z + 2.3, color, { colBottom: y0 + height - 0.1, jit: 0.04 });
  // railings
  for (const [x0, z0, x1, z1] of [[-2.3, -2.3, 2.3, -2.1], [-2.3, 2.1, 2.3, 2.3], [-2.3, -2.1, -2.1, 2.1], [2.1, -2.1, 2.3, 2.1]]) {
    b.slab(x + x0, y0 + height + 0.3, z + z0, x + x1, y0 + height + 1.2, z + z1, color, { jit: 0.04 });
  }
  const L = (height + 0.3) / 0.55;
  b.stairs(x + 2.5, z - 2.2, x + 4.1, z - 2.2 + L, y0 + 0.05, y0 + height + 0.3, 'z', false, y0 - 0.3, 0x7a5a3a);
  b.chest(x, y0 + height + 0.3, z, 0);
  b.floorLoot(x + 1.2, y0 + height + 0.3, z + 1.2, true);
  return { x, z, topY: y0 + height + 0.3, stairX: x + 3.3, stairZ: z - 2.2 + L };
}
