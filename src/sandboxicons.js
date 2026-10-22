// Item thumbnails for the sandbox panel: every procedural item model is rendered once into a small
// transparent image (one shared render target, disposed afterwards) and cached as a data URL.
import * as THREE from 'three';
import { itemModel } from './models.js';

const W = 192, H = 128;
const cache = new Map();

// linear -> sRGB lookup (render targets hold linear values)
const SRGB = new Uint8ClampedArray(256);
for (let i = 0; i < 256; i++) {
  const c = i / 255;
  SRGB[i] = Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055));
}

/** Renders thumbnails for `ids` one after another. `onIcon(id, dataUrl)` fires as each one is ready. */
export async function renderIcons(game, ids, onIcon) {
  const todo = ids.filter((id) => !cache.has(id));
  if (!todo.length) return;
  const r = game.renderer;
  const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.UnsignedByteType, samples: 4 });
  const scene = new THREE.Scene();
  scene.environment = game.scene.environment;
  scene.environmentIntensity = 0.9;
  scene.add(new THREE.HemisphereLight(0xdbe8ff, 0x59503c, 1.5));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.6);
  sun.position.set(-2, 3, 4);
  scene.add(sun);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20);
  const px = new Uint8Array(W * H * 4);
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(W, H);
  const box = new THREE.Box3(), size = new THREE.Vector3(), mid = new THREE.Vector3();
  const prevTarget = r.getRenderTarget();
  const prevColor = r.getClearColor(new THREE.Color()), prevAlpha = r.getClearAlpha();
  try {
    for (let n = 0; n < todo.length; n++) {
      const id = todo[n];
      const holder = new THREE.Group();
      const model = itemModel(id);
      model.rotation.set(0.28, -Math.PI / 2 + 0.5, 0.05);
      holder.add(model);
      scene.add(holder);
      holder.updateMatrixWorld(true);
      box.setFromObject(holder).getSize(size).multiplyScalar(1);
      box.getCenter(mid);
      const aspect = W / H;
      const half = Math.max(size.x / aspect, size.y, 0.12) * 0.5 * 1.18;
      cam.left = -half * aspect; cam.right = half * aspect; cam.top = half; cam.bottom = -half;
      cam.position.set(mid.x + 0.6, mid.y + 0.55, mid.z + 3);
      cam.lookAt(mid);
      cam.updateProjectionMatrix();
      r.setRenderTarget(rt);
      r.setClearColor(0x000000, 0);
      r.clear();
      r.render(scene, cam);
      r.setRenderTarget(prevTarget);
      r.setClearColor(prevColor, prevAlpha);
      await r.readRenderTargetPixelsAsync(rt, 0, 0, W, H, px); // async readback: no GPU stall while the game keeps rendering
      // bottom-up -> top-down, linear -> sRGB
      for (let y = 0; y < H; y++) {
        const src = (H - 1 - y) * W * 4, dst = y * W * 4;
        for (let x = 0; x < W * 4; x += 4) {
          img.data[dst + x] = SRGB[px[src + x]];
          img.data[dst + x + 1] = SRGB[px[src + x + 1]];
          img.data[dst + x + 2] = SRGB[px[src + x + 2]];
          img.data[dst + x + 3] = px[src + x + 3];
        }
      }
      ctx.putImageData(img, 0, 0);
      const url = cv.toDataURL('image/png');
      cache.set(id, url);
      scene.remove(holder);
      onIcon?.(id, url);
    }
  } finally {
    r.setRenderTarget(prevTarget);
    r.setClearColor(prevColor, prevAlpha);
    rt.dispose();
  }
}
