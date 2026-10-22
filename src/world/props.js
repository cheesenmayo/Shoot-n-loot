import * as THREE from 'three';
import { Batch } from './builder.js';
import { WORLD, envAt, terrainColor } from './terrain.js';
import { POIS } from './poidata.js';
import { hash2, mulberry32, smoothstep, shuffle } from '../util.js';

const PROP_CHUNK = 256;

// ---------------------------------------------------------------------------
// Geometry for each prop type
// ---------------------------------------------------------------------------

function pineGeo(snowy = false) {
  const b = new Batch(snowy ? 12 : 11);
  b.cyl(0, 0, 0, 0.32, 4.0, 0x5a4330, { sides: 6, rTop: 0.2, noCap: true });
  for (let i = 0; i < 5; i++) {
    const y = 2.5 + i * 1.8, r = 2.6 - i * 0.46, h = 2.7;
    const col = snowy ? (i % 2 ? 0xdfe9ee : 0x2f5a44) : [0x2d5a2e, 0x336633, 0x2a5530, 0x3a6b35, 0x2e6034][i];
    b.cyl(0, y, 0, r, h, col, { sides: 8, rTop: 0.001, noCap: true, ao: 0.62, jit: 0.07 });
  }
  return b.build();
}

function oakGeo() {
  const b = new Batch(21);
  b.limb(0, 0, 0, 0.1, 3.4, 0, 0.42, 0.26, 0x6b4f35, { sides: 7 });
  b.limb(0.05, 2.8, 0, 1.6, 4.6, 0.4, 0.2, 0.1, 0x6b4f35, { sides: 5 });
  b.limb(0.05, 3.0, 0, -1.4, 4.7, -0.5, 0.2, 0.1, 0x6b4f35, { sides: 5 });
  const g = [0x4c7a30, 0x56853a, 0x44702c, 0x5d8c3c];
  b.blob(0.1, 5.7, 0, 3.0, 2.5, 3.0, g[0], { seg: 8, rings: 5 });
  b.blob(1.9, 5.0, 0.6, 2.1, 1.9, 2.1, g[1], { seg: 7, rings: 4 });
  b.blob(-1.8, 5.2, -0.7, 2.2, 1.9, 2.2, g[2], { seg: 7, rings: 4 });
  b.blob(0.3, 7.2, 0.2, 1.9, 1.6, 1.9, g[3], { seg: 7, rings: 4 });
  return b.build();
}

function palmGeo() {
  const b = new Batch(31);
  const pts = [];
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    pts.push([Math.sin(t * 1.3) * 0.9, t * 7.2, t * t * 0.7]);
  }
  for (let i = 0; i < 6; i++) {
    const r0 = 0.3 - i * 0.015, r1 = 0.3 - (i + 1) * 0.015;
    b.limb(...pts[i], ...pts[i + 1], r0, r1, i % 2 ? 0x9b7d58 : 0x8a6e4b, { sides: 6, jit: 0.04 });
  }
  const top = pts[6];
  for (let f = 0; f < 9; f++) {
    const a = (f / 9) * Math.PI * 2 + 0.3;
    const dx = Math.cos(a), dz = Math.sin(a);
    const path = [], widths = [];
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      path.push([top[0] + dx * t * 3.6, top[1] + 0.5 + Math.sin(t * 2.1) * 1.0 - t * t * 1.6, top[2] + dz * t * 3.6]);
      widths.push(0.1 + Math.sin(t * Math.PI) * 0.75);
    }
    b.strip(path, widths, 0x2f6b2a, 0x5a9a3a, { side: [-dz, 0, dx], normal: [0, 1, 0] });
  }
  b.blob(top[0], top[1] + 0.3, top[2], 0.35, 0.3, 0.35, 0x6b4f2a, { seg: 5, rings: 3 });
  return b.build();
}

function cactusGeo(variant = 0) {
  const b = new Batch(41 + variant);
  const g = 0x4f8a45;
  const h = 4.2 + variant * 1.0;
  b.cyl(0, 0, 0, 0.42, h, g, { sides: 8, rTop: 0.36, ao: 0.7, uvScale: 1 });
  b.blob(0, h, 0, 0.36, 0.3, 0.36, g, { seg: 6, rings: 3, wobble: 0.02 });
  const arm = (side, y, up) => {
    b.limb(0, y, 0, side * 1.1, y, 0, 0.26, 0.26, g, { sides: 7 });
    b.limb(side * 1.1, y, 0, side * 1.1, y + up, 0, 0.26, 0.24, g, { sides: 7 });
    b.blob(side * 1.1, y + up, 0, 0.25, 0.25, 0.25, g, { seg: 6, rings: 3, wobble: 0.02 });
  };
  arm(1, h * 0.45, 1.5 + variant * 0.3);
  if (variant > 0) arm(-1, h * 0.62, 1.2);
  return b.build();
}

function deadTreeGeo() {
  const b = new Batch(51);
  const c = 0x7a6a58;
  b.limb(0, 0, 0, 0.2, 3.2, 0, 0.3, 0.16, c, { sides: 6 });
  b.limb(0.15, 2.4, 0, 1.4, 3.9, 0.3, 0.12, 0.05, c, { sides: 5 });
  b.limb(0.2, 3.0, 0, -1.0, 4.3, -0.3, 0.1, 0.04, c, { sides: 5 });
  b.limb(0.2, 3.2, 0, 0.3, 4.6, 0.8, 0.08, 0.03, c, { sides: 5 });
  return b.build();
}

function orangeTreeGeo() {
  const b = new Batch(61);
  b.limb(0, 0, 0, 0, 2.7, 0, 0.27, 0.2, 0x5d4430, { sides: 6 });
  b.limb(0, 2.2, 0, 1.1, 3.3, 0.4, 0.12, 0.07, 0x5d4430, { sides: 5 });
  b.limb(0, 2.3, 0, -1.0, 3.4, -0.5, 0.12, 0.07, 0x5d4430, { sides: 5 });
  // canopy stays above head height so the camera never sits inside the leaves
  b.blob(0, 4.1, 0, 2.5, 1.7, 2.5, 0x2f6a2c, { seg: 9, rings: 5, wobble: 0.12 });
  b.blob(1.1, 3.6, 0.9, 1.5, 1.1, 1.5, 0x37762f, { seg: 7, rings: 4 });
  b.blob(-1.2, 3.7, -0.8, 1.5, 1.1, 1.5, 0x2a6228, { seg: 7, rings: 4 });
  const rng = mulberry32(5);
  for (let i = 0; i < 16; i++) {
    const a = rng() * Math.PI * 2, e = rng() * 0.7 - 0.45;
    const rr = 2.35 * Math.cos(e);
    b.blob(Math.cos(a) * rr, 4.1 + Math.sin(e) * 1.5, Math.sin(a) * rr, 0.22, 0.22, 0.22, 0xff8a14, { seg: 5, rings: 3, wobble: 0.04, ao: 0.9, jit: 0.08 });
  }
  return b.build();
}

function rockGeo(variant) {
  const b = new Batch(70 + variant);
  const cols = [0x7b7770, 0x6c6a66, 0x857d72];
  if (variant === 0) b.blob(0, 0.55, 0, 1.2, 0.85, 1.0, cols[0], { seg: 7, rings: 4, wobble: 0.22, ao: 0.6 });
  else if (variant === 1) {
    b.blob(0, 0.8, 0, 1.7, 1.3, 1.5, cols[1], { seg: 8, rings: 5, wobble: 0.25, ao: 0.6 });
    b.blob(1.5, 0.4, 0.5, 0.9, 0.6, 0.8, cols[0], { seg: 6, rings: 4, wobble: 0.2, ao: 0.6 });
  } else {
    b.blob(0, 2.2, 0, 3.2, 2.8, 3.0, cols[2], { seg: 9, rings: 6, wobble: 0.22, ao: 0.55 });
    b.blob(2.6, 1.0, 1, 1.8, 1.4, 1.6, cols[1], { seg: 7, rings: 4, wobble: 0.2, ao: 0.55 });
    b.blob(-2.2, 1.2, -1.2, 1.6, 1.3, 1.6, cols[0], { seg: 7, rings: 4, wobble: 0.2, ao: 0.55 });
  }
  return b.build();
}

function bushGeo(dry = false) {
  const b = new Batch(90);
  const g = dry ? [0x8a8148, 0x7d7440] : [0x3e6f2a, 0x4a7d31, 0x376326];
  b.blob(0, 0.55, 0, 1.0, 0.7, 1.0, g[0], { seg: 6, rings: 4, wobble: 0.2 });
  b.blob(0.7, 0.4, 0.3, 0.7, 0.5, 0.7, g[1], { seg: 6, rings: 3, wobble: 0.2 });
  return b.build();
}

function grassGeo() {
  const b = new Batch(99);
  const rng = mulberry32(3);
  for (let i = 0; i < 6; i++) {
    const a = rng() * Math.PI * 2;
    const ox = (rng() - 0.5) * 0.45, oz = (rng() - 0.5) * 0.45;
    const h = 0.55 + rng() * 0.45;
    const lean = (rng() - 0.3) * 0.35;
    const dx = Math.cos(a), dz = Math.sin(a);
    const pts = [[ox, 0, oz], [ox + dx * lean * 0.4, h * 0.5, oz + dz * lean * 0.4], [ox + dx * lean, h, oz + dz * lean]];
    b.strip(pts, [0.09, 0.07, 0.0], 0x2c4a17, 0xb5d36a, { side: [-dz, 0, dx], normal: [0.2, 1, 0.2] });
  }
  return b.build();
}

// ---------------------------------------------------------------------------

export class Props {
  constructor(world, textures) {
    this.world = world;
    this.terrain = world.terrain;
    this.col = world.collision;
    this.textures = textures;
    this.group = new THREE.Group();
    this.group.name = 'props';
    this.chunks = [];
    this.propDistance = 700;
    this.shadowDistance = 140;
    this.grassRadius = 0;
    this.grassDensity = 0;
    this.time = { value: 0 };

    this.treeMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
    this.rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0, map: textures.grain });
    this.rockMat.flatShading = false;
    this.grassMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, side: THREE.FrontSide });
    this.grassMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.time;
      shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         #ifdef USE_INSTANCING
           float ph = instanceMatrix[3].x * 0.31 + instanceMatrix[3].z * 0.23;
           float sw = (sin(uTime * 1.7 + ph) + 0.5 * sin(uTime * 3.1 + ph * 1.7)) * 0.09 * position.y * position.y;
           transformed.x += sw; transformed.z += sw * 0.6;
         #endif`,
      );
    };

    this.types = {
      pine: { geo: pineGeo(false), mat: this.treeMat, trunk: 0.38, h: 14 },
      pineSnow: { geo: pineGeo(true), mat: this.treeMat, trunk: 0.38, h: 14 },
      oak: { geo: oakGeo(), mat: this.treeMat, trunk: 0.5, h: 9 },
      palm: { geo: palmGeo(), mat: this.treeMat, trunk: 0.32, h: 9 },
      cactus: { geo: cactusGeo(0), mat: this.treeMat, trunk: 0.5, h: 4 },
      cactus2: { geo: cactusGeo(1), mat: this.treeMat, trunk: 0.5, h: 5 },
      dead: { geo: deadTreeGeo(), mat: this.treeMat, trunk: 0.3, h: 4 },
      orange: { geo: orangeTreeGeo(), mat: this.treeMat, trunk: 0.3, h: 6 },
      rockS: { geo: rockGeo(0), mat: this.rockMat, trunk: 1.0, h: 1.4, rock: true },
      rockM: { geo: rockGeo(1), mat: this.rockMat, trunk: 1.5, h: 2.2, rock: true },
      rockL: { geo: rockGeo(2), mat: this.rockMat, trunk: 2.8, h: 5, rock: true },
      bush: { geo: bushGeo(false), mat: this.treeMat, trunk: 0, h: 1, soft: true },
      bushDry: { geo: bushGeo(true), mat: this.treeMat, trunk: 0, h: 1, soft: true },
    };
    this.grassGeo = grassGeo();
    this.grassTiles = new Map();
    this.grassQueue = [];
  }

  /** Explicit instance (used by POI builders), e.g. orchard trees. */
  addInstance(type, x, z, scale = 1, yaw = 0, y = null) {
    (this._extra ||= []).push({ type, x, z, scale, yaw, y });
  }

  generate(onProgress) {
    const per = WORLD.size / PROP_CHUNK;
    const dummy = new THREE.Object3D();
    const env = { desert: 0, snow: 0, rock: 0, forest: 0, sand: 0 };
    const spacing = 6;
    const nPer = PROP_CHUNK / spacing;
    const pine = POIS.find((p) => p.id === 'pinewood_camp');
    const rngFor = (cx, cz) => mulberry32(cx * 7919 + cz * 104729 + 17);
    const poiNear = (x, z) => {
      for (const p of POIS) {
        const d = Math.hypot(x - p.x, z - p.z);
        if (d < p.clearR) return p;
      }
      return null;
    };
    for (let cz = 0; cz < per; cz++) {
      for (let cx = 0; cx < per; cx++) {
        const x0 = -WORLD.half + cx * PROP_CHUNK, z0 = -WORLD.half + cz * PROP_CHUNK;
        const lists = {};
        const rng = rngFor(cx, cz);
        for (let j = 0; j < nPer; j++) {
          for (let i = 0; i < nPer; i++) {
            const x = x0 + (i + rng()) * spacing, z = z0 + (j + rng()) * spacing;
            const r1 = rng(), r2 = rng(), r3 = rng();
            if (Math.hypot(x, z) > WORLD.limit) continue;
            if (poiNear(x, z)) continue;
            const h = this.terrain.height(x, z);
            if (h < 0.5) continue;
            const slope = this.terrain.slope(x, z);
            envAt(x, z, h, slope, env);
            const dp = Math.hypot(x - pine.x, z - pine.z);
            const forest = Math.max(env.forest, (1 - smoothstep(130, 330, dp)) * (1 - env.snow));
            let type = null, scale = 0.8 + r2 * 0.7;
            if (slope > 1.0) {
              if (r1 < 0.12) { type = r3 < 0.6 ? 'rockM' : 'rockL'; scale = 0.8 + r2 * 0.8; }
            } else if (env.snow > 0.45) {
              if (r1 < 0.14 && slope < 0.7) type = 'pineSnow';
              else if (r1 < 0.2) { type = 'rockS'; scale = 0.7 + r2; }
            } else if (env.desert > 0.35) {
              if (r1 < 0.03) type = r3 < 0.5 ? 'cactus' : 'cactus2';
              else if (r1 < 0.045) type = 'dead';
              else if (r1 < 0.075) { type = r3 < 0.7 ? 'rockS' : r3 < 0.93 ? 'rockM' : 'rockL'; scale = 0.7 + r2 * 1.1; }
              else if (r1 < 0.1) type = 'bushDry';
            } else if (h < 3.8 && env.sand > 0.5) {
              if (r1 < 0.07) { type = 'palm'; scale = 0.8 + r2 * 0.5; }
              else if (r1 < 0.09) { type = 'rockS'; }
            } else if (forest > 0.15) {
              const p = 0.2 + forest * 0.7;
              if (r1 < p) type = r3 < 0.62 ? 'pine' : 'oak';
              else if (r1 < p + 0.12) type = 'bush';
              else if (r1 < p + 0.16) { type = 'rockS'; }
            } else {
              if (r1 < 0.045) type = 'oak';
              else if (r1 < 0.12) type = 'bush';
              else if (r1 < 0.14) type = r3 < 0.7 ? 'rockS' : 'rockM';
              else if (r1 < 0.15 && r3 < 0.4) type = 'pine';
            }
            if (!type) continue;
            (lists[type] ||= []).push({ x, z, y: h, scale, yaw: r3 * Math.PI * 2 });
          }
        }
        // explicit extras that fall inside this chunk
        const extra = this._extra?.filter((e) => e.x >= x0 && e.x < x0 + PROP_CHUNK && e.z >= z0 && e.z < z0 + PROP_CHUNK);
        for (const e of extra || []) (lists[e.type] ||= []).push({ x: e.x, z: e.z, y: e.y ?? this.terrain.height(e.x, e.z), scale: e.scale, yaw: e.yaw });

        const chunk = { x: x0 + PROP_CHUNK / 2, z: z0 + PROP_CHUNK / 2, meshes: [], soft: [] };
        for (const [type, list] of Object.entries(lists)) {
          const def = this.types[type];
          const mesh = new THREE.InstancedMesh(def.geo, def.mat, list.length);
          for (let k = 0; k < list.length; k++) {
            const it = list[k];
            dummy.position.set(it.x, it.y - (def.rock ? 0.15 * it.scale : 0.05), it.z);
            dummy.rotation.set(0, it.yaw, 0);
            const sy = def.rock ? it.scale * (0.8 + 0.4 * hash2(k, cx * 31 + cz)) : it.scale;
            dummy.scale.set(it.scale, sy, it.scale);
            dummy.updateMatrix();
            mesh.setMatrixAt(k, dummy.matrix);
            if (def.trunk > 0) this.col.addCircle(it.x, it.z, def.trunk * it.scale, it.y - 1, it.y + def.h * it.scale, 0);
          }
          mesh.instanceMatrix.needsUpdate = true;
          mesh.computeBoundingSphere();
          mesh.matrixAutoUpdate = false;
          mesh.castShadow = true;
          mesh.receiveShadow = type.startsWith('rock') || type === 'bush';
          if (def.soft) {
            // bushes: shuffled so a lower graphics density just trims the instance count
            shuffleInstances(mesh, list.length);
            mesh.userData.total = list.length;
            chunk.soft.push(mesh);
          }
          this.group.add(mesh);
          chunk.meshes.push(mesh);
        }
        this.chunks.push(chunk);
      }
      onProgress?.((cz + 1) / per);
    }
  }

  setQuality({ propDistance, shadowDistance, grassRadius, grassDensity, bushDensity }) {
    this.propDistance = propDistance;
    this.shadowDistance = shadowDistance;
    this.grassRadius = grassRadius;
    this.grassDensity = grassDensity;
    for (const c of this.chunks) {
      for (const m of c.soft) m.count = Math.floor(m.userData.total * bushDensity);
    }
    // drop grass tiles so they regenerate at the new density
    for (const t of this.grassTiles.values()) {
      if (t.mesh) { this.group.remove(t.mesh); t.mesh.dispose(); }
    }
    this.grassTiles.clear();
  }

  update(cam, dt, time) {
    this.time.value = time;
    const vd = this.propDistance + PROP_CHUNK;
    const sd = this.shadowDistance + PROP_CHUNK * 0.7;
    for (const c of this.chunks) {
      const d = Math.hypot(c.x - cam.x, c.z - cam.z);
      const vis = d < vd;
      const sh = d < sd;
      for (const m of c.meshes) {
        m.visible = vis && m.count !== 0;
        m.castShadow = sh;
      }
    }
    this.updateGrass(cam);
  }

  // -------- grass tiles streamed around the camera -----------------------

  updateGrass(cam) {
    const R = this.grassRadius;
    if (R <= 0) {
      for (const t of this.grassTiles.values()) if (t.mesh) t.mesh.visible = false;
      return;
    }
    const T = 32;
    const ix0 = Math.floor((cam.x - R) / T), ix1 = Math.floor((cam.x + R) / T);
    const iz0 = Math.floor((cam.z - R) / T), iz1 = Math.floor((cam.z + R) / T);
    const needed = [];
    for (let iz = iz0; iz <= iz1; iz++) {
      for (let ix = ix0; ix <= ix1; ix++) {
        const key = ix + ',' + iz;
        const cx = (ix + 0.5) * T, cz = (iz + 0.5) * T;
        const d = Math.hypot(cx - cam.x, cz - cam.z);
        if (d > R + T * 0.7) continue;
        needed.push([key, ix, iz, d]);
      }
    }
    const keep = new Set(needed.map((n) => n[0]));
    for (const [key, t] of this.grassTiles) {
      if (!keep.has(key)) {
        if (t.mesh) { this.group.remove(t.mesh); t.mesh.dispose(); }
        this.grassTiles.delete(key);
      } else if (t.mesh) t.mesh.visible = true;
    }
    needed.sort((a, b) => a[3] - b[3]);
    let budget = 1; // one tile per frame
    for (const [key, ix, iz] of needed) {
      if (this.grassTiles.has(key)) continue;
      if (budget-- <= 0) break;
      const mesh = this.buildGrassTile(ix, iz, T);
      this.grassTiles.set(key, { mesh });
      if (mesh) this.group.add(mesh);
    }
  }

  buildGrassTile(ix, iz, T) {
    const x0 = ix * T, z0 = iz * T;
    const target = Math.floor(T * T * this.grassDensity);
    const pos = [];
    const env = { desert: 0, snow: 0, rock: 0, forest: 0, sand: 0 };
    const c = new THREE.Color();
    const colors = [];
    const rng = mulberry32(ix * 73856093 ^ iz * 19349663);
    for (let n = 0; n < target; n++) {
      const x = x0 + rng() * T, z = z0 + rng() * T;
      const sc = 0.7 + rng() * 0.9, yaw = rng() * 6.283;
      const h = this.terrain.height(x, z);
      if (h < 0.6) continue;
      const slope = this.terrain.slope(x, z);
      if (slope > 0.8) continue;
      envAt(x, z, h, slope, env);
      const keep = 1 - Math.min(1, env.desert * 1.3 + env.snow * 1.5 + env.sand * 1.2 + env.rock);
      if (rng() > keep) continue;
      if (this.world.nearPoiClear(x, z)) continue;
      terrainColor(x, z, h, slope, c);
      c.multiplyScalar(1.5);
      pos.push(x, h, z, sc, yaw);
      colors.push(c.r, c.g, c.b);
    }
    const count = pos.length / 5;
    if (!count) return null;
    const mesh = new THREE.InstancedMesh(this.grassGeo, this.grassMat, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(pos[i * 5], pos[i * 5 + 1] - 0.02, pos[i * 5 + 2]);
      dummy.rotation.set(0, pos[i * 5 + 4], 0);
      dummy.scale.setScalar(pos[i * 5 + 3]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      c.setRGB(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
      mesh.setColorAt(i, c);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    mesh.matrixAutoUpdate = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    return mesh;
  }
}

function shuffleInstances(mesh, n) {
  const m = mesh.instanceMatrix.array;
  const idx = shuffle([...Array(n).keys()], mulberry32(n + 1));
  const copy = new Float32Array(m);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < 16; k++) m[i * 16 + k] = copy[idx[i] * 16 + k];
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.computeBoundingSphere();
}
