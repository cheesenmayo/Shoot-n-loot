import * as THREE from 'three';
import { Noise2D, mulberry32, clamp } from './util.js';

const noise = new Noise2D(2024);

// Tileable fractal noise in [-1,1] sampled at pixel (x,y) of a w*h texture.
function tileNoise(x, y, w, h, freq, octaves) {
  let sum = 0, amp = 1, norm = 0, f = freq;
  for (let o = 0; o < octaves; o++) {
    const fx = x / w, fy = y / h;
    const sx = fx * f, sy = fy * f;
    // blend the tile with shifted copies of itself so the edges meet seamlessly
    const a = noise.noise(sx, sy);
    const b = noise.noise(sx - f, sy);
    const c = noise.noise(sx, sy - f);
    const d = noise.noise(sx - f, sy - f);
    const v = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    sum += v * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2;
  }
  return sum / norm;
}

function canvasTexture(canvas, srgb = true) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

function makeHeightGrid(size, freq, octaves, seedShift = 0) {
  const g = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) g[y * size + x] = tileNoise(x + seedShift, y + seedShift * 0.7, size, size, freq, octaves);
  }
  return g;
}

function normalMapFromHeight(grid, size, strength) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = grid[y * size + ((x - 1 + size) % size)];
      const r = grid[y * size + ((x + 1) % size)];
      const u = grid[((y - 1 + size) % size) * size + x];
      const d = grid[((y + 1) % size) * size + x];
      let nx = (l - r) * strength, ny = (u - d) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len; ny /= len; nz /= len;
      const o = (y * size + x) * 4;
      data[o] = (nx * 0.5 + 0.5) * 255;
      data[o + 1] = (ny * 0.5 + 0.5) * 255;
      data[o + 2] = (nz * 0.5 + 0.5) * 255;
      data[o + 3] = 255;
    }
  }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}

export function makeTextures() {
  const S = 256;
  // --- terrain/building detail (grayscale multiplier) ---
  const grid = makeHeightGrid(S, 3, 4);
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(S, S);
  const rng = mulberry32(5);
  for (let i = 0; i < S * S; i++) {
    const v = clamp(0.9 + grid[i] * 0.3 + (rng() - 0.5) * 0.06, 0, 1);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v * 255;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const detail = canvasTexture(cv);
  const detailNormal = normalMapFromHeight(grid, S, 5);

  // --- subtle grain for man-made surfaces ---
  const ggrid = makeHeightGrid(S, 10, 3, 17);
  const gc = document.createElement('canvas');
  gc.width = gc.height = S;
  const gctx = gc.getContext('2d');
  const gimg = gctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    const v = clamp(0.93 + ggrid[i] * 0.12 + (rng() - 0.5) * 0.06, 0, 1);
    gimg.data[i * 4] = gimg.data[i * 4 + 1] = gimg.data[i * 4 + 2] = v * 255;
    gimg.data[i * 4 + 3] = 255;
  }
  gctx.putImageData(gimg, 0, 0);
  const grain = canvasTexture(gc);

  // --- water normals ---
  const wgrid = makeHeightGrid(S, 2, 5, 40);
  const waterNormal = normalMapFromHeight(wgrid, S, 7);
  waterNormal.repeat.set(220, 220);

  // --- soft round particle ---
  const pc = document.createElement('canvas');
  pc.width = pc.height = 64;
  const pctx = pc.getContext('2d');
  const grad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.65)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  pctx.fillStyle = grad;
  pctx.fillRect(0, 0, 64, 64);
  const particle = canvasTexture(pc);
  particle.wrapS = particle.wrapT = THREE.ClampToEdgeWrapping;

  // --- cloud puff ---
  const cc = document.createElement('canvas');
  cc.width = 256; cc.height = 128;
  const cctx = cc.getContext('2d');
  const crng = mulberry32(77);
  for (let i = 0; i < 26; i++) {
    const x = 50 + crng() * 156, y = 40 + crng() * 50, r = 22 + crng() * 34;
    const g = cctx.createRadialGradient(x, y, 0, x, y, r);
    const shade = 255 - (y > 70 ? 18 : 0);
    g.addColorStop(0, `rgba(${shade},${shade},${shade},0.55)`);
    g.addColorStop(0.6, `rgba(${shade - 8},${shade - 4},${shade},0.22)`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    cctx.fillStyle = g;
    cctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const cloud = canvasTexture(cc);
  cloud.wrapS = cloud.wrapT = THREE.ClampToEdgeWrapping;

  // --- skyscraper windows (4 columns x 8 rows per tile) ---
  const wc = document.createElement('canvas');
  wc.width = 128; wc.height = 256;
  const wctx = wc.getContext('2d');
  const emc = document.createElement('canvas');
  emc.width = 128; emc.height = 256;
  const ectx = emc.getContext('2d');
  wctx.fillStyle = '#4b5662';
  wctx.fillRect(0, 0, 128, 256);
  ectx.fillStyle = '#000';
  ectx.fillRect(0, 0, 128, 256);
  const wrng = mulberry32(9);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 4; c++) {
      const x = c * 32 + 4, y = r * 32 + 5;
      const lit = wrng() < 0.4;
      wctx.fillStyle = lit ? '#cfe8ff' : '#1d2a3a';
      wctx.fillRect(x, y, 24, 22);
      if (lit) {
        const warm = wrng() < 0.5;
        ectx.fillStyle = warm ? '#ffd9a0' : '#a0d8ff';
        ectx.fillRect(x, y, 24, 22);
      }
    }
  }
  const windows = canvasTexture(wc);
  const windowsEmissive = canvasTexture(emc);

  return { detail, grain, detailNormal, waterNormal, particle, cloud, windows, windowsEmissive };
}
