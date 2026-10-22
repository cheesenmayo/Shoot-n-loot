import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Muzzle flash: a hot cone, a spiky star facing the shooter, two crossed side blasts and a soft glow
// sprite. All geometry and materials are shared by every character (nothing per-instance to dispose).
// ---------------------------------------------------------------------------

let shared = null;

function starShape(spikes, rOut, rIn, jitter = 0.0) {
  const pos = [0, 0, 0];
  const idx = [];
  const n = spikes * 2;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = i % 2 === 0 ? rOut * (1 - jitter * ((i / 2) % 3) * 0.3) : rIn;
    pos.push(Math.cos(a) * r, Math.sin(a) * r, 0);
  }
  for (let i = 0; i < n; i++) idx.push(0, 1 + i, 1 + ((i + 1) % n));
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setIndex(idx);
  return g;
}

/** Flat flame in the plane containing the barrel axis (Z): long forward tongue, short side flares. */
function blastShape() {
  const pts = [[0, 0.025], [0.06, 0.07], [0.15, 0.05], [0.34, 0], [0.15, -0.05], [0.06, -0.07], [0, -0.025], [-0.07, -0.05], [-0.08, 0], [-0.07, 0.05]];
  const pos = [];
  const idx = [];
  for (const [z, x] of pts) pos.push(x, 0, -z);
  for (let i = 1; i < pts.length - 1; i++) idx.push(0, i, i + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setIndex(idx);
  return g;
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,226,150,0.95)');
  g.addColorStop(0.3, 'rgba(255,170,70,0.55)');
  g.addColorStop(1, 'rgba(255,120,30,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function getShared() {
  if (shared) return shared;
  const add = (color, opacity) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide, toneMapped: false });
  const cone = new THREE.ConeGeometry(0.05, 0.3, 7, 1, true);
  cone.rotateX(-Math.PI / 2);
  cone.translate(0, 0, -0.15);
  const blastA = blastShape();
  const blastB = blastShape().rotateZ(Math.PI / 2);
  shared = {
    cone, star: starShape(8, 0.17, 0.045, 1), star2: starShape(5, 0.1, 0.03), blastA, blastB,
    matHot: add(0xffd878, 0.9), matOrange: add(0xff8a22, 0.7), matCone: add(0xffb040, 0.55),
    glow: new THREE.SpriteMaterial({ map: glowTexture(), color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }),
  };
  return shared;
}

/** Group with the flash meshes, origin at the muzzle, flame toward -Z. Hidden until shown. */
export function makeFlash() {
  const s = getShared();
  const g = new THREE.Group();
  const cone = new THREE.Mesh(s.cone, s.matCone);
  const star = new THREE.Mesh(s.star, s.matHot);
  star.position.z = -0.03;
  const star2 = new THREE.Mesh(s.star2, s.matOrange);
  star2.position.z = -0.06;
  const a = new THREE.Mesh(s.blastA, s.matOrange);
  const b = new THREE.Mesh(s.blastB, s.matOrange);
  const glow = new THREE.Sprite(s.glow);
  glow.scale.set(0.3, 0.3, 1);
  glow.position.z = -0.05;
  for (const o of [cone, star, star2, a, b, glow]) {
    o.frustumCulled = false;
    // game.js toggles castShadow on every mesh of a character by distance; glowing flame must never cast shadows
    Object.defineProperty(o, 'castShadow', { get: () => false, set: () => {} });
  }
  g.add(cone, star, star2, a, b, glow);
  g.userData = { star, star2, cone, glow };
  g.visible = false;
  return g;
}

const SCALE = { pistol: 0.85, smg: 0.8, rifle: 1.0, shotgun: 1.5, sniper: 1.45, lmg: 1.1, launcher: 1.8, bow: 0, gadget: 0.6 };

/** Per-frame look of a visible flash: random roll and size so consecutive frames differ. */
export function flicker(flash, cat, id, t) {
  let k = (SCALE[cat] ?? 1);
  if (id === 'silenced_smg') k = 0.35;
  const j = 0.8 + Math.random() * 0.45;
  flash.scale.setScalar(k * j);
  flash.rotation.z = Math.random() * Math.PI * 2;
  flash.userData.star.rotation.z = Math.random() * 3;
  flash.userData.star2.rotation.z = Math.random() * 3;
  flash.visible = k > 0;
  void t;
}
