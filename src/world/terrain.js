import * as THREE from 'three';
import { Noise2D, smoothstep, lerp, clamp } from '../util.js';
import { POIS, LAKE, DESERT, MOUNTAIN } from './poidata.js';

export const WORLD = {
  size: 2048,
  half: 1024,
  cell: 2, // metres per heightfield cell
  n: 1024, // cells per side
  chunk: 128, // metres per terrain chunk
  limit: 1000, // players cannot walk past this
  islandR: 830,
  seaLevel: 0,
};

const nA = new Noise2D(1337);
const nB = new Noise2D(7331);
const nC = new Noise2D(4242);
const nD = new Noise2D(9001);

// ---------------------------------------------------------------------------
// Analytic terrain (only evaluated once, while baking the heightfield)
// ---------------------------------------------------------------------------

function coastRadius(x, z) {
  const ang = Math.atan2(z, x);
  const ca = Math.cos(ang), sa = Math.sin(ang);
  return (
    WORLD.islandR +
    75 * nA.noise(ca * 1.2 + 5, sa * 1.2 + 5) +
    28 * nA.noise(ca * 3.7, sa * 3.7) +
    10 * nA.noise(x * 0.01, z * 0.01)
  );
}

function desertWeight(x, z) {
  const dd = Math.hypot(x - DESERT.x, z - DESERT.z);
  const warp = nB.noise(x * 0.004, z * 0.004) * 60;
  return 1 - smoothstep(DESERT.r * 0.7, DESERT.r * 1.15, dd + warp);
}

function featureHeight(x, z) {
  const d = Math.hypot(x, z);
  const edge = coastRadius(x, z) - d;
  let h = edge >= 0 ? 3.2 * smoothstep(0, 75, edge) : Math.max(edge * 0.15, -30);
  if (edge < -250) h = -30 + (edge + 250) * 0.01;

  const inland = smoothstep(35, 240, edge);
  const n = nA.fbm(x * 0.0021 + 3.1, z * 0.0021 - 1.7, 5, 2, 0.5);
  const hillsN = clamp(n * 0.5 + 0.55, 0, 1);
  const ridge = nB.ridged(x * 0.0035, z * 0.0035, 3);
  const land = 4 + hillsN * hillsN * 30 + ridge * ridge * 14;
  h += inland * land;

  // Mountain (Frostpeak)
  const dm2 = (x - MOUNTAIN.x) ** 2 + (z - MOUNTAIN.z) ** 2;
  const gauss = Math.exp(-dm2 / (2 * MOUNTAIN.sigma * MOUNTAIN.sigma));
  const mtn = MOUNTAIN.height * gauss * (0.7 + 0.55 * nB.ridged(x * 0.006, z * 0.006, 4));
  h += mtn * smoothstep(-60, 90, edge) + gauss * 5 * nC.noise(x * 0.03, z * 0.03);

  // Desert: flat sandy plains, a few dunes, mesas on the far rim.
  const dW = desertWeight(x, z) * smoothstep(5, 90, edge);
  if (dW > 0) {
    const dunes = 1.6 * nC.noise(x * 0.012, z * 0.012) + 0.6 * nC.noise(x * 0.05, z * 0.05);
    let flat = 6 + dunes;
    const dd = Math.hypot(x - DESERT.x, z - DESERT.z);
    const mesaN = nD.noise(x * 0.0042 + 7, z * 0.0042 + 3);
    flat += smoothstep(0.4, 0.48, mesaN) * 26 * smoothstep(230, 300, dd);
    h = lerp(h, flat, dW * 0.97);
  }
  return h;
}

for (const p of POIS) if (p.y === 'auto') p.y = featureHeight(p.x, p.z);

export function genHeight(x, z) {
  let h = featureHeight(x, z);
  for (let i = 0; i < POIS.length; i++) {
    const p = POIS[i];
    const d = Math.hypot(x - p.x, z - p.z);
    if (d >= p.blendR) continue;
    const w = 1 - smoothstep(p.flatR, p.blendR, d);
    const target = p.y + (p.rough ? p.rough * nA.noise(x * 0.03, z * 0.03) * smoothstep(p.roughStart ?? 40, p.flatR, d) : 0);
    h = lerp(h, target, w);
  }
  // Lake basin
  const dl = Math.hypot(x - LAKE.x, z - LAKE.z);
  if (dl < LAKE.r * 1.1) {
    const wob = nB.noise(x * 0.02, z * 0.02) * 14;
    const w = 1 - smoothstep(LAKE.r * 0.55, LAKE.r * 1.0, dl + wob);
    h = lerp(h, -5.5, w);
    // little island in the middle of the lake (lighthouse)
    const di = Math.hypot(x - LAKE.x, z - LAKE.z - 6);
    if (di < 30) h = Math.max(h, lerp(-5.5, 2.4, 1 - smoothstep(10, 28, di)));
  }
  return h;
}

// ---------------------------------------------------------------------------
// Biome sampling (colours, prop scattering, minimap)
// ---------------------------------------------------------------------------

export function envAt(x, z, h, slope, out) {
  out.desert = desertWeight(x, z) * smoothstep(1.8, 4.2, h) * (1 - smoothstep(30, 45, h));
  out.snow = smoothstep(56 + nC.noise(x * 0.02, z * 0.02) * 9, 78, h);
  out.rock = smoothstep(0.62, 1.1, slope);
  const f = nA.fbm(x * 0.0046 + 100, z * 0.0046 + 100, 3);
  out.forest = smoothstep(0.1, 0.36, f) * (1 - out.desert) * (1 - out.snow) * smoothstep(3.5, 8, h);
  out.sand = (1 - smoothstep(1.0, 2.5, h + nD.noise(x * 0.05, z * 0.05) * 0.4)) * (h > -2 ? 1 : 0);
  return out;
}

const C = (hex) => new THREE.Color(hex);
const PAL = {
  grassLush: C('#4f7a2c'),
  grassDry: C('#8a8a45'),
  forestFloor: C('#2f4a20'),
  desertA: C('#d8a866'),
  desertB: C('#c47e4c'),
  beach: C('#dccb9a'),
  rock: C('#78726a'),
  rockDark: C('#55504b'),
  snow: C('#f4f8ff'),
  seabed: C('#6d7f6a'),
  mud: C('#6a5a3e'),
};
const _c = new THREE.Color();
const _env = { desert: 0, snow: 0, rock: 0, forest: 0, sand: 0 };

export function terrainColor(x, z, h, slope, out) {
  const e = envAt(x, z, h, slope, _env);
  const g = nD.fbm(x * 0.025, z * 0.025, 3) * 0.5 + 0.5;
  out.copy(PAL.grassLush).lerp(PAL.grassDry, clamp(g * 1.3 - 0.25, 0, 1));
  out.lerp(PAL.forestFloor, e.forest * 0.85);
  const band = Math.sin((h + nA.noise(x * 0.01, z * 0.01) * 3) * 1.5) * 0.5 + 0.5;
  _c.copy(PAL.desertA).lerp(PAL.desertB, clamp(band * 0.6 + (h - 6) * 0.04, 0, 1));
  out.lerp(_c, e.desert);
  out.lerp(PAL.beach, e.sand);
  _c.copy(PAL.rock).lerp(PAL.rockDark, nC.noise(x * 0.08, z * 0.08) * 0.5 + 0.5);
  out.lerp(_c, e.rock);
  out.lerp(PAL.snow, e.snow * (1 - e.rock * 0.45));
  if (h < 0.3) out.lerp(PAL.seabed, smoothstep(0.3, -2, h));
  const v = 0.93 + 0.14 * nC.noise(x * 0.21, z * 0.21);
  out.multiplyScalar(v);
  return out;
}

// ---------------------------------------------------------------------------
// Heightfield + chunked mesh
// ---------------------------------------------------------------------------

const LOD_SEGS = [64, 32, 16];

export class Terrain {
  constructor() {
    const N1 = WORLD.n + 1;
    this.N1 = N1;
    this.data = new Float32Array(N1 * N1);
    this.group = new THREE.Group();
    this.group.name = 'terrain';
    this.chunks = [];
    this.viewDistance = 800;
    this.material = null;
    this.buildQueue = [];
  }

  async bake(onProgress) {
    const { n, cell, half } = WORLD;
    const N1 = this.N1;
    let last = performance.now();
    for (let j = 0; j <= n; j++) {
      const z = -half + j * cell;
      const row = j * N1;
      for (let i = 0; i <= n; i++) this.data[row + i] = genHeight(-half + i * cell, z);
      if (performance.now() - last > 30) {
        onProgress?.(j / n);
        await new Promise((r) => setTimeout(r, 0));
        last = performance.now();
      }
    }
    onProgress?.(1);
  }

  /** Terrain height at world x,z (triangle-exact w.r.t. the LOD0 mesh). */
  height(x, z) {
    const { n, cell, half } = WORLD;
    let fx = (x + half) / cell;
    let fz = (z + half) / cell;
    if (fx < 0) fx = 0; else if (fx > n - 0.0001) fx = n - 0.0001;
    if (fz < 0) fz = 0; else if (fz > n - 0.0001) fz = n - 0.0001;
    const i = fx | 0, j = fz | 0;
    const tx = fx - i, tz = fz - j;
    const N1 = this.N1, d = this.data;
    const k = j * N1 + i;
    const h00 = d[k], h10 = d[k + 1], h01 = d[k + N1], h11 = d[k + N1 + 1];
    return tx + tz <= 1 ? h00 + (h10 - h00) * tx + (h01 - h00) * tz : h11 + (h01 - h11) * (1 - tx) + (h10 - h11) * (1 - tz);
  }

  normal(x, z, out) {
    const e = 1.5;
    const hl = this.height(x - e, z), hr = this.height(x + e, z);
    const hd = this.height(x, z - e), hu = this.height(x, z + e);
    out.set(hl - hr, 2 * e, hd - hu).normalize();
    return out;
  }

  /** Steepness as rise/run. */
  slope(x, z) {
    const e = 1.5;
    const gx = (this.height(x + e, z) - this.height(x - e, z)) / (2 * e);
    const gz = (this.height(x, z + e) - this.height(x, z - e)) / (2 * e);
    return Math.hypot(gx, gz);
  }

  // -------- mesh ----------------------------------------------------------

  createMeshes(scene, textures) {
    this.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      map: textures.detail,
      roughness: 0.96,
      metalness: 0,
    });
    this.material.normalMap = null;
    this.normalMapTex = textures.detailNormal;
    const per = WORLD.size / WORLD.chunk;
    for (let cz = 0; cz < per; cz++) {
      for (let cx = 0; cx < per; cx++) {
        const mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
        mesh.visible = false;
        mesh.matrixAutoUpdate = false;
        const chunk = {
          cx, cz, mesh, lod: -1,
          x0: -WORLD.half + cx * WORLD.chunk,
          z0: -WORLD.half + cz * WORLD.chunk,
          geoLow: null,
        };
        chunk.mx = chunk.x0 + WORLD.chunk / 2;
        chunk.mz = chunk.z0 + WORLD.chunk / 2;
        this.chunks.push(chunk);
        this.group.add(mesh);
      }
    }
    scene.add(this.group);
  }

  setDetailNormals(enabled) {
    this.material.normalMap = enabled ? this.normalMapTex : null;
    if (enabled) this.material.normalScale.set(0.6, 0.6);
    this.material.needsUpdate = true;
  }

  buildGeometry(chunk, lod) {
    const segs = LOD_SEGS[lod];
    const size = WORLD.chunk;
    const step = size / segs;
    const rowV = segs + 1;
    const mainCount = rowV * rowV;
    const skirtCount = 4 * rowV;
    const total = mainCount + skirtCount;
    const pos = new Float32Array(total * 3);
    const nor = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    const uv = new Float32Array(total * 2);
    const color = new THREE.Color();
    const nrm = new THREE.Vector3();
    const SKIRT = 5 + lod * 4;

    let v = 0;
    for (let j = 0; j <= segs; j++) {
      for (let i = 0; i <= segs; i++) {
        const x = chunk.x0 + i * step;
        const z = chunk.z0 + j * step;
        const h = this.height(x, z);
        this.normal(x, z, nrm);
        const slope = Math.sqrt(1 - nrm.y * nrm.y) / Math.max(nrm.y, 0.05);
        terrainColor(x, z, h, slope, color);
        pos[v * 3] = x; pos[v * 3 + 1] = h; pos[v * 3 + 2] = z;
        nor[v * 3] = nrm.x; nor[v * 3 + 1] = nrm.y; nor[v * 3 + 2] = nrm.z;
        col[v * 3] = color.r; col[v * 3 + 1] = color.g; col[v * 3 + 2] = color.b;
        uv[v * 2] = x / 7; uv[v * 2 + 1] = z / 7;
        v++;
      }
    }
    // Skirts: copy the border vertices and drop them so LOD seams never show sky.
    const border = [];
    for (let i = 0; i <= segs; i++) border.push(i); // top row
    for (let i = 0; i <= segs; i++) border.push(segs * rowV + i); // bottom row
    for (let j = 0; j <= segs; j++) border.push(j * rowV); // left col
    for (let j = 0; j <= segs; j++) border.push(j * rowV + segs); // right col
    for (const src of border) {
      pos[v * 3] = pos[src * 3]; pos[v * 3 + 1] = pos[src * 3 + 1] - SKIRT; pos[v * 3 + 2] = pos[src * 3 + 2];
      nor[v * 3] = nor[src * 3]; nor[v * 3 + 1] = nor[src * 3 + 1]; nor[v * 3 + 2] = nor[src * 3 + 2];
      col[v * 3] = col[src * 3]; col[v * 3 + 1] = col[src * 3 + 1]; col[v * 3 + 2] = col[src * 3 + 2];
      uv[v * 2] = uv[src * 2]; uv[v * 2 + 1] = uv[src * 2 + 1];
      v++;
    }

    const idx = new Uint32Array(segs * segs * 6 + 4 * segs * 6);
    let k = 0;
    for (let j = 0; j < segs; j++) {
      for (let i = 0; i < segs; i++) {
        const a = j * rowV + i, b = a + 1, c = a + rowV, d = c + 1;
        // diagonal matches Terrain.height(): (a,b,c) + (b,d,c)
        idx[k++] = a; idx[k++] = c; idx[k++] = b;
        idx[k++] = b; idx[k++] = c; idx[k++] = d;
      }
    }
    // skirt quads
    const edgeBase = [mainCount, mainCount + rowV, mainCount + 2 * rowV, mainCount + 3 * rowV];
    const edgeSrc = [0, segs * rowV, 0, segs];
    const edgeStride = [1, 1, rowV, rowV];
    const flip = [true, false, false, true];
    for (let e = 0; e < 4; e++) {
      for (let s = 0; s < segs; s++) {
        const t0 = edgeSrc[e] + s * edgeStride[e];
        const t1 = t0 + edgeStride[e];
        const b0 = edgeBase[e] + s, b1 = b0 + 1;
        if (flip[e]) { idx[k++] = t0; idx[k++] = t1; idx[k++] = b0; idx[k++] = t1; idx[k++] = b1; idx[k++] = b0; }
        else { idx[k++] = t0; idx[k++] = b0; idx[k++] = t1; idx[k++] = t1; idx[k++] = b0; idx[k++] = b1; }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeBoundingSphere();
    geo.computeBoundingBox();
    return geo;
  }

  setChunkLod(chunk, lod) {
    if (chunk.lod === lod) return;
    const old = chunk.mesh.geometry;
    let geo;
    if (lod === 2) geo = chunk.geoLow || (chunk.geoLow = this.buildGeometry(chunk, 2));
    else geo = this.buildGeometry(chunk, lod);
    chunk.mesh.geometry = geo;
    if (old && old !== chunk.geoLow) old.dispose();
    chunk.lod = lod;
  }

  /** Called every frame with the camera position. */
  update(cam, immediate = false) {
    const vd = this.viewDistance + WORLD.chunk;
    let budget = immediate ? 1e9 : 3;
    // lod ranges scale a little with quality so low preset is cheaper
    const r0 = this.lodNear ?? 300, r1 = this.lodMid ?? 700;
    for (const c of this.chunks) {
      const d = Math.hypot(c.mx - cam.x, c.mz - cam.z);
      if (d > vd) {
        c.mesh.visible = false;
        continue;
      }
      let want;
      const hyst = c.lod >= 0 ? 40 : 0;
      if (d < r0 + (c.lod === 0 ? hyst : -hyst)) want = 0;
      else if (d < r1 + (c.lod <= 1 ? hyst : -hyst)) want = 1;
      else want = 2;
      if (want !== c.lod) {
        if (budget > 0 || c.lod < 0) {
          this.setChunkLod(c, want);
          budget--;
        }
      }
      c.mesh.visible = c.lod >= 0;
    }
  }

  // -------- minimap texture ------------------------------------------------

  /**
   * Paints the island map. Runs in small slices so the title screen stays smooth;
   * resolves when finished. `overlay(ctx, toPx)` may draw structures afterwards.
   */
  async makeMapCanvas(size = 1024, overlay = null) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(size, size);
    const col = new THREE.Color();
    const s = WORLD.size / size;
    const toS = (v) => Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055));
    const rowsPerTick = 6;
    for (let j0 = 0; j0 < size; j0 += rowsPerTick) {
      for (let j = j0; j < Math.min(size, j0 + rowsPerTick); j++) {
        for (let i = 0; i < size; i++) {
          const x = -WORLD.half + (i + 0.5) * s;
          const z = -WORLD.half + (j + 0.5) * s;
          const h = this.height(x, z);
          const o = (j * size + i) * 4;
          if (h < 0) {
            const t = clamp(-h / 14, 0, 1);
            img.data[o] = 30 + (1 - t) * 40; img.data[o + 1] = 90 + (1 - t) * 60; img.data[o + 2] = 160 + (1 - t) * 40;
          } else {
            const slope = this.slope(x, z);
            terrainColor(x, z, h, slope, col);
            const shade = clamp(1 + (this.height(x - 4, z - 4) - this.height(x + 4, z + 4)) * 0.05, 0.6, 1.35);
            img.data[o] = toS(col.r * shade); img.data[o + 1] = toS(col.g * shade); img.data[o + 2] = toS(col.b * shade);
          }
          img.data[o + 3] = 255;
        }
      }
      if (j0 % 96 === 0) await new Promise((r) => setTimeout(r, 0));
    }
    ctx.putImageData(img, 0, 0);
    if (overlay) overlay(ctx, (x) => (x + WORLD.half) * (size / WORLD.size), size / WORLD.size);
    return cv;
  }
}

// ---------------------------------------------------------------------------
// Water: one big plane that follows the camera, plus a dark abyss below.
// ---------------------------------------------------------------------------

export function createWater(textures) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1b6f9a,
    roughness: 0.08,
    metalness: 0.0,
    transparent: true,
    opacity: 0.86,
    normalMap: textures.waterNormal,
    normalScale: new THREE.Vector2(0.55, 0.55),
    depthWrite: false,
    envMapIntensity: 1.6,
  });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000, 1, 1).rotateX(-Math.PI / 2), mat);
  water.position.y = WORLD.seaLevel - 0.05;
  water.renderOrder = 2;
  const abyss = new THREE.Mesh(
    new THREE.PlaneGeometry(6000, 6000).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x06202e }),
  );
  abyss.position.y = -36;
  group.add(abyss, water);
  group.userData.water = water;
  return group;
}
