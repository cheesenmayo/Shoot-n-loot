import * as THREE from 'three';
import { ITEMS, AMMO } from './items.js';
import { PartBuilder } from './charparts.js';
import { mat } from './modelkit.js';

export { characterModel, gliderModel } from './charmodel.js';
export { mat };

// ---------------------------------------------------------------------------
// Item models. Every item is a handful of merged, vertex-coloured meshes (one per surface type) plus small
// named parts that the animation system moves (slide, bolt, pump, lever, cylinder, hammer, barrels, mag).
// Origin = the grip, muzzle toward -Z, +Y up. userData carries muzzleZ, gripL (where the support hand goes),
// magPos and stockPos (see entities/anim/holds.js).
// ---------------------------------------------------------------------------
const MATS = {
  metal: new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.4, roughness: 0.42 }),
  matte: new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.04, roughness: 0.74 }),
  paint: new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.2, roughness: 0.45 }),
  glow: new THREE.MeshBasicMaterial({ vertexColors: true }),
};

class Rig {
  constructor() { this.b = {}; this.parts = []; this.ud = {}; }
  get(kind) { return this.b[kind] || (this.b[kind] = new PartBuilder()); }
  get metal() { return this.get('metal'); }
  get matte() { return this.get('matte'); }
  get paint() { return this.get('paint'); }
  get glow() { return this.get('glow'); }
  /** A sub-object with its own pivot at (x, y, z) that the animation code may move; fn builds it in pivot-local space. */
  part(name, x, y, z, fn) {
    const r = new Rig();
    fn(r);
    this.parts.push({ name, x, y, z, r });
    return this;
  }
  group() {
    const g = new THREE.Group();
    for (const k in this.b) {
      if (!this.b[k].n) continue;
      const m = new THREE.Mesh(this.b[k].build(), MATS[k]);
      m.castShadow = true;
      g.add(m);
    }
    for (const p of this.parts) {
      const pg = p.r.group();
      pg.name = p.name;
      pg.position.set(p.x, p.y, p.z);
      g.add(pg);
    }
    return g;
  }
}

const HP = Math.PI / 2;
/** Cylinder along Z from zf (front, muzzle side) to zb (back), radius rf at the front end and rb at the back end. */
const tube = (b, x, y, zf, zb, rf, rb, color, o = {}) => b.cyl(x, y, (zf + zb) / 2, rf, rb, zb - zf, color, { rot: [HP, 0, 0], sides: 8, ...o });
/** Box whose length runs along Z: w wide, h tall, len long. o.taper = [kx, kh] narrows the BACK end (the FRONT end with o.front). */
const zbox = (b, x, y, z, w, h, len, color, o = {}) => b.box(x, y, z, w, len, h, color, { ao: 0.9, ...o, rot: [o.front ? -HP : HP, 0, 0] });
/** A row of small teeth (rail / serrations / grooves) along Z. */
const teeth = (b, x, y, z0, z1, n, w, h, d, color) => {
  for (let i = 0; i < n; i++) b.box(x, y, z0 + ((z1 - z0) * i) / Math.max(1, n - 1), w, h, d, color, { ao: 1 });
};
/** The same small box on both sides of a weapon (vents, grooves, panels). */
const sides = (b, x, y, z, w, h, d, color) => { b.box(x, y, z, w, h, d, color, { ao: 1 }); b.box(-x, y, z, w, h, d, color, { ao: 1 }); };
const _z = new THREE.Vector3(0, 0, 1), _qq = new THREE.Quaternion(), _ee = new THREE.Euler(), _nn = new THREE.Vector3();
/** Euler [x, y, z] that turns +Z toward (nx, ny, nz) (used to face small facets outward). */
const facing = (nx, ny, nz) => {
  _nn.set(nx, ny, nz).normalize();
  _ee.setFromQuaternion(_qq.setFromUnitVectors(_z, _nn), 'XYZ');
  return [_ee.x, _ee.y, _ee.z];
};

const GUN = 0x4d545e, GUN2 = 0x3a4049, STEEL = 0x7a828d, LIGHT = 0xb4bbc4, DARK = 0x2b3037, BLACK = 0x171a1f;
const BRASS = 0xd0a94c, WOOD = 0x93602f, WOOD2 = 0x5e3a1c, OLIVE = 0x4f6040, RED = 0xc8362b, ORANGE = 0xff8a2a, CYAN = 0x5fe8ff, GLASS = 0x8fd2ff;

// ---------------------------------------------------------------------------
// shared gun pieces
// ---------------------------------------------------------------------------
/** Pistol grip + trigger guard + trigger of a long gun, centred on the origin. */
function pistolGrip(r, c = DARK, z = 0.015) {
  r.matte.box(0, -0.05, z, 0.032, 0.1, 0.046, c, { rot: [-0.24, 0, 0], taper: [1.0, 0.9] });
  for (let i = 0; i < 3; i++) r.matte.box(0.0, -0.025 - i * 0.026, z + 0.026 + i * 0.006, 0.034, 0.008, 0.006, BLACK, { rot: [-0.24, 0, 0], ao: 1 });
  zbox(r.metal, 0, -0.018, -0.04, 0.008, 0.008, 0.07, STEEL); // trigger guard bottom
  r.metal.box(0, -0.032, -0.07, 0.008, 0.026, 0.008, STEEL); // ... front post
  r.metal.box(0, -0.014, -0.036, 0.006, 0.026, 0.01, LIGHT, { rot: [0.25, 0, 0] }); // trigger
}
function scopeBody(r, z0, z1, y, rad = 0.022, body = BLACK) {
  tube(r.metal, 0, y, z0, z1, rad, rad, body, { sides: 10 });
  tube(r.metal, 0, y, z0 - 0.03, z0 + 0.012, rad * 1.45, rad * 1.1, body, { sides: 10 }); // objective bell
  tube(r.metal, 0, y, z1 - 0.012, z1 + 0.025, rad * 1.1, rad * 1.35, body, { sides: 10 }); // eyepiece
  r.glow.cyl(0, y, z0 - 0.0305, rad * 1.25, rad * 1.25, 0.002, GLASS, { rot: [HP, 0, 0], sides: 10, noBottom: true });
  r.metal.box(0, y - rad - 0.008, z0 + 0.04, 0.012, 0.016, 0.02, GUN2);
  r.metal.box(0, y - rad - 0.008, z1 - 0.04, 0.012, 0.016, 0.02, GUN2);
  r.metal.cyl(0, y + rad * 0.95, (z0 + z1) / 2, 0.01, 0.01, 0.016, STEEL, { sides: 6 }); // turret
}
function rifleStock(r, color, z = 0.27) {
  zbox(r.matte, 0, 0.04, z - 0.1, 0.026, 0.03, 0.1, GUN2); // buffer tube
  zbox(r.matte, 0, 0.03, z + 0.01, 0.04, 0.085, 0.14, color, { taper: [0.95, 0.8] });
  r.matte.box(0, 0.028, z + 0.085, 0.044, 0.095, 0.012, BLACK); // butt pad
  r.matte.box(0, 0.074, z + 0.0, 0.016, 0.01, 0.1, color); // cheek riser
}
function magazine(r, x, y, z, w, h, d, color, curve = 0.14) {
  r.metal.box(x, y, z, w, h, d, color, { rot: [curve, 0, 0], taper: [1, 0.94] });
  r.metal.box(x, y - h / 2 - 0.004, z + Math.sin(curve) * h / 2, w * 1.08, 0.012, d * 1.08, STEEL, { rot: [curve, 0, 0] });
}

// ---------------------------------------------------------------------------
// weapon / item models
// ---------------------------------------------------------------------------
const builders = {
  // ---- pistols ------------------------------------------------------------------------------------------------
  pistol(r) {
    r.matte.box(0, -0.056, 0.026, 0.036, 0.1, 0.05, DARK, { rot: [-0.22, 0, 0], taper: [1, 0.92] });
    for (let i = 0; i < 4; i++) r.matte.box(0, -0.03 - i * 0.02, 0.05 + i * 0.006, 0.038, 0.007, 0.006, BLACK, { rot: [-0.22, 0, 0], ao: 1 });
    r.metal.box(0, -0.108, 0.046, 0.034, 0.012, 0.052, STEEL, { rot: [-0.22, 0, 0] }); // magazine base
    zbox(r.matte, 0, 0.004, -0.06, 0.034, 0.034, 0.16, GUN2); // frame
    zbox(r.metal, 0, -0.012, -0.115, 0.03, 0.012, 0.05, STEEL); // light rail
    zbox(r.metal, 0, -0.02, -0.03, 0.008, 0.008, 0.07, STEEL); // trigger guard
    r.metal.box(0, -0.034, -0.062, 0.008, 0.026, 0.008, STEEL);
    r.metal.box(0, -0.016, -0.028, 0.006, 0.024, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.metal.box(0, 0.026, 0.045, 0.008, 0.014, 0.012, DARK, { rot: [0.6, 0, 0] }); // hammer
    r.part('slide', 0, 0.046, -0.07, (s) => {
      zbox(s.metal, 0, 0, 0, 0.038, 0.04, 0.2, STEEL);
      zbox(s.metal, 0, 0.018, -0.01, 0.014, 0.01, 0.18, LIGHT, { ao: 1 }); // top flat
      teeth(s.metal, 0.0195, 0, 0.055, 0.092, 4, 0.003, 0.03, 0.005, DARK);
      teeth(s.metal, -0.0195, 0, 0.055, 0.092, 4, 0.003, 0.03, 0.005, DARK);
      s.metal.box(0.0195, 0.008, -0.015, 0.003, 0.014, 0.04, BLACK); // ejection port
      s.metal.box(0, 0.026, 0.092, 0.03, 0.01, 0.012, DARK); // rear sight
      s.metal.box(0, 0.026, -0.094, 0.008, 0.012, 0.012, DARK); // front sight
      tube(s.metal, 0, -0.002, -0.108, -0.092, 0.011, 0.012, BLACK, { sides: 6 }); // muzzle
    });
    r.ud = { muzzleZ: -0.18, gripL: [0, -0.085, 0.02], magPos: [0, -0.07, 0.03], eject: [0.02, 0.05, -0.03] };
  },
  revolver(r) {
    zbox(r.metal, 0, 0.026, -0.02, 0.034, 0.05, 0.12, STEEL); // frame
    zbox(r.metal, 0, 0.056, 0.0, 0.024, 0.012, 0.12, STEEL); // top strap
    tube(r.metal, 0, 0.034, -0.25, -0.06, 0.013, 0.015, STEEL, { sides: 8 }); // barrel
    zbox(r.metal, 0, 0.054, -0.15, 0.012, 0.01, 0.19, LIGHT); // rib
    tube(r.metal, 0, 0.012, -0.2, -0.07, 0.007, 0.007, STEEL, { sides: 6 }); // ejector rod
    r.metal.box(0, 0.063, -0.245, 0.008, 0.016, 0.01, DARK); // front sight
    r.metal.box(0, 0.066, 0.034, 0.02, 0.01, 0.01, DARK); // rear sight
    r.matte.box(0, -0.06, 0.04, 0.038, 0.11, 0.054, WOOD, { rot: [-0.32, 0, 0], taper: [1, 0.9] }); // wooden grip
    r.metal.box(0, -0.118, 0.07, 0.04, 0.014, 0.058, BRASS, { rot: [-0.32, 0, 0] }); // butt cap
    zbox(r.metal, 0, -0.016, -0.015, 0.008, 0.008, 0.07, STEEL);
    r.metal.box(0, -0.03, -0.047, 0.008, 0.026, 0.008, STEEL);
    r.metal.box(0, -0.012, -0.012, 0.006, 0.024, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.part('cylinder', 0, 0.036, -0.045, (c) => {
      tube(c.metal, 0, 0, -0.03, 0.03, 0.034, 0.034, 0x8a929c, { sides: 10 });
      for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; c.metal.box(Math.cos(a) * 0.034, Math.sin(a) * 0.034, 0, 0.012, 0.012, 0.05, DARK, { ao: 1 }); }
      for (let i = 0; i < 6; i++) { const a = ((i + 0.5) / 6) * Math.PI * 2; c.metal.box(Math.cos(a) * 0.022, Math.sin(a) * 0.022, -0.0305, 0.013, 0.013, 0.002, BLACK, { ao: 1 }); }
    });
    r.part('hammer', 0, 0.056, 0.042, (h) => {
      h.metal.box(0, 0.012, 0.004, 0.012, 0.028, 0.014, DARK, { rot: [0.55, 0, 0] });
    });
    r.ud = { muzzleZ: -0.25, gripL: [0, -0.09, 0.025], magPos: [0, 0.036, -0.045] };
  },
  hand_cannon(r) {
    zbox(r.metal, 0, 0.034, -0.02, 0.046, 0.066, 0.16, BRASS, { ao: 0.8 }); // gold-plated frame
    zbox(r.metal, 0, 0.074, -0.0, 0.034, 0.014, 0.16, 0xe3c56a);
    tube(r.metal, 0, 0.04, -0.28, -0.08, 0.019, 0.022, 0x24272b, { sides: 8 }); // fat barrel
    for (let i = 0; i < 3; i++) r.metal.box(0, 0.063, -0.22 + i * 0.03, 0.022, 0.004, 0.01, BRASS, { ao: 1 }); // vents
    zbox(r.metal, 0, 0.056, -0.22, 0.012, 0.01, 0.12, BRASS); // top rib
    tube(r.metal, 0, 0.04, -0.28, -0.26, 0.024, 0.024, BRASS, { sides: 8 }); // muzzle ring
    r.metal.box(0, 0.086, -0.262, 0.01, 0.018, 0.012, DARK);
    r.metal.box(0, 0.086, 0.048, 0.024, 0.012, 0.012, DARK);
    r.matte.box(0, -0.06, 0.05, 0.044, 0.12, 0.06, 0x2a1d14, { rot: [-0.3, 0, 0], taper: [1, 0.9] });
    r.metal.box(0.023, -0.058, 0.05, 0.004, 0.09, 0.042, BRASS, { rot: [-0.3, 0, 0] }); // grip inlay
    r.metal.box(-0.023, -0.058, 0.05, 0.004, 0.09, 0.042, BRASS, { rot: [-0.3, 0, 0] });
    zbox(r.metal, 0, -0.016, -0.02, 0.01, 0.01, 0.08, BRASS);
    r.metal.box(0, -0.034, -0.058, 0.01, 0.028, 0.01, BRASS);
    r.metal.box(0, -0.012, -0.014, 0.007, 0.026, 0.012, LIGHT, { rot: [0.25, 0, 0] });
    r.part('cylinder', 0, 0.038, -0.05, (c) => {
      tube(c.metal, 0, 0, -0.036, 0.036, 0.04, 0.04, 0x3a3f46, { sides: 10 });
      for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; c.metal.box(Math.cos(a) * 0.04, Math.sin(a) * 0.04, 0, 0.016, 0.016, 0.06, BRASS, { ao: 1 }); }
    });
    r.part('hammer', 0, 0.075, 0.052, (h) => h.metal.box(0, 0.012, 0.004, 0.014, 0.03, 0.016, BRASS, { rot: [0.55, 0, 0] }));
    r.ud = { muzzleZ: -0.28, gripL: [0, -0.1, 0.03], magPos: [0, 0.038, -0.05] };
  },

  // ---- SMGs -----------------------------------------------------------------------------------------------------
  smg(r) {
    pistolGrip(r, DARK, 0.02);
    zbox(r.metal, 0, 0.03, -0.1, 0.05, 0.075, 0.3, GUN); // receiver
    zbox(r.metal, 0, 0.074, -0.1, 0.03, 0.012, 0.3, GUN2, { ao: 1 }); // top cover
    teeth(r.metal, 0, 0.082, -0.22, 0.0, 6, 0.026, 0.006, 0.008, DARK); // rail
    zbox(r.metal, 0, 0.04, -0.28, 0.046, 0.06, 0.12, GUN2); // shroud
    for (let i = 0; i < 4; i++) sides(r.metal, 0.0235, 0.04, -0.23 - i * 0.025, 0.003, 0.034, 0.012, BLACK);
    tube(r.metal, 0, 0.04, -0.37, -0.34, 0.012, 0.012, DARK); // barrel tip
    r.metal.box(0, 0.09, -0.34, 0.008, 0.026, 0.01, GUN2);
    r.metal.box(0, 0.088, 0.03, 0.02, 0.02, 0.01, GUN2);
    zbox(r.matte, 0, 0.06, 0.12, 0.012, 0.012, 0.16, STEEL); // wire stock
    r.matte.box(0, 0.034, 0.2, 0.012, 0.06, 0.012, STEEL);
    r.matte.box(0, 0.008, 0.205, 0.03, 0.01, 0.016, BLACK);
    r.matte.box(0, -0.013, -0.2, 0.034, 0.05, 0.04, DARK, { rot: [-0.1, 0, 0] }); // foregrip
    magazine(r, 0, -0.1, -0.075, 0.03, 0.15, 0.045, GUN2, 0.04);
    r.metal.box(0.026, 0.04, -0.03, 0.004, 0.016, 0.05, ORANGE, { ao: 1 }); // accent stripe
    r.part('slide', 0, 0.07, 0.04, (s) => s.metal.box(0, 0, 0, 0.012, 0.018, 0.034, STEEL));
    r.ud = { muzzleZ: -0.37, gripL: [0, -0.04, -0.2], magPos: [0, -0.11, -0.075], stockPos: [0, 0.03, 0.21], eject: [0.026, 0.05, -0.02] };
  },
  silenced_smg(r) {
    pistolGrip(r, DARK, 0.02);
    zbox(r.metal, 0, 0.03, -0.09, 0.05, 0.075, 0.28, 0x2c3138); // receiver
    zbox(r.metal, 0, 0.074, -0.09, 0.03, 0.012, 0.28, GUN2, { ao: 1 });
    zbox(r.metal, 0, 0.038, -0.24, 0.044, 0.056, 0.08, GUN2);
    tube(r.metal, 0, 0.042, -0.5, -0.2, 0.03, 0.026, 0x1c2025, { sides: 10 }); // suppressor
    for (let i = 0; i < 5; i++) tube(r.metal, 0, 0.042, -0.46 + i * 0.05, -0.452 + i * 0.05, 0.032, 0.032, 0x30353c, { sides: 10 }); // baffles
    tube(r.metal, 0, 0.042, -0.502, -0.5, 0.012, 0.012, BLACK, { sides: 8 });
    r.metal.box(0, 0.09, -0.2, 0.008, 0.02, 0.01, GUN2);
    r.metal.box(0, 0.088, 0.04, 0.02, 0.02, 0.01, GUN2);
    zbox(r.matte, 0, 0.06, 0.12, 0.012, 0.012, 0.15, STEEL);
    r.matte.box(0, 0.034, 0.195, 0.012, 0.06, 0.012, STEEL);
    r.matte.box(0, 0.008, 0.2, 0.03, 0.01, 0.016, BLACK);
    magazine(r, 0, -0.095, -0.06, 0.03, 0.14, 0.045, GUN2, 0.04);
    r.metal.box(0.026, 0.036, -0.03, 0.004, 0.016, 0.05, CYAN, { ao: 1 });
    r.part('slide', 0, 0.07, 0.04, (s) => s.metal.box(0, 0, 0, 0.012, 0.018, 0.034, STEEL));
    r.ud = { muzzleZ: -0.5, gripL: [0, -0.04, -0.2], magPos: [0, -0.105, -0.06], stockPos: [0, 0.03, 0.2], eject: [0.026, 0.05, -0.02] };
  },

  // ---- assault rifles ------------------------------------------------------------------------------------------
  ar(r) {
    pistolGrip(r, DARK, 0.012);
    zbox(r.metal, 0, 0.012, -0.05, 0.046, 0.05, 0.28, GUN); // lower receiver
    zbox(r.metal, 0, 0.055, -0.07, 0.044, 0.042, 0.3, 0x2c3037); // upper receiver
    r.metal.box(0.0235, 0.05, -0.04, 0.003, 0.016, 0.05, BLACK, { ao: 1 }); // ejection port
    zbox(r.metal, 0, 0.082, -0.1, 0.02, 0.012, 0.26, GUN2, { ao: 1 }); // top rail
    teeth(r.metal, 0, 0.09, -0.22, 0.02, 9, 0.018, 0.005, 0.008, DARK);
    zbox(r.metal, 0, 0.04, -0.33, 0.052, 0.058, 0.2, OLIVE); // handguard
    for (let i = 0; i < 4; i++) sides(r.matte, 0.0265, 0.04, -0.27 - i * 0.04, 0.003, 0.03, 0.014, DARK);
    tube(r.metal, 0, 0.046, -0.5, -0.43, 0.011, 0.012, DARK, { sides: 6 }); // barrel
    tube(r.metal, 0, 0.046, -0.56, -0.5, 0.019, 0.016, GUN2, { sides: 8 }); // flash hider
    r.metal.box(0, 0.092, -0.46, 0.01, 0.034, 0.012, GUN2); // front post
    r.metal.box(0, 0.075, -0.46, 0.022, 0.02, 0.016, GUN2);
    r.metal.box(0, 0.097, 0.06, 0.02, 0.026, 0.012, GUN2); // rear sight
    rifleStock(r, 0x2d3239, 0.24);
    magazine(r, 0, -0.07, -0.085, 0.032, 0.13, 0.048, GUN2, 0.16);
    r.metal.box(0.0265, 0.012, -0.12, 0.003, 0.02, 0.04, ORANGE, { ao: 1 });
    r.part('slide', 0, 0.07, 0.07, (s) => { s.metal.box(0, 0.01, 0, 0.018, 0.022, 0.03, STEEL); s.metal.box(0, 0.016, 0.02, 0.03, 0.01, 0.012, DARK); });
    r.ud = { muzzleZ: -0.56, gripL: [0, -0.03, -0.32], magPos: [0, -0.1, -0.085], stockPos: [0, 0.04, 0.34], eject: [0.025, 0.05, -0.04] };
  },
  burst_ar(r) {
    pistolGrip(r, DARK, 0.012);
    zbox(r.metal, 0, 0.012, -0.05, 0.046, 0.05, 0.28, 0x2c3a2c);
    zbox(r.metal, 0, 0.055, -0.07, 0.044, 0.042, 0.28, 0x34452f);
    r.metal.box(0.0235, 0.05, -0.04, 0.003, 0.016, 0.05, BLACK, { ao: 1 });
    zbox(r.metal, 0, 0.088, -0.07, 0.016, 0.026, 0.2, DARK); // carry handle
    zbox(r.metal, 0, 0.104, -0.07, 0.022, 0.01, 0.2, GUN2);
    r.metal.box(0, 0.1, 0.03, 0.02, 0.028, 0.012, GUN2);
    zbox(r.metal, 0, 0.04, -0.31, 0.05, 0.052, 0.16, 0x2b3a2b);
    for (let i = 0; i < 3; i++) { r.glow.box(0.0265, 0.04, -0.26 - i * 0.036, 0.003, 0.018, 0.016, ORANGE); r.glow.box(-0.0265, 0.04, -0.26 - i * 0.036, 0.003, 0.018, 0.016, ORANGE); } // burst pips
    tube(r.metal, 0, 0.046, -0.46, -0.4, 0.011, 0.012, DARK, { sides: 6 });
    tube(r.metal, 0, 0.046, -0.53, -0.46, 0.018, 0.015, GUN2, { sides: 8 }); // muzzle brake
    for (let i = 0; i < 3; i++) r.metal.box(0, 0.046, -0.5 + i * 0.016, 0.04, 0.008, 0.006, BLACK, { ao: 1 });
    r.metal.box(0, 0.09, -0.44, 0.008, 0.03, 0.012, GUN2);
    rifleStock(r, 0x2b3a2b, 0.23);
    magazine(r, 0, -0.07, -0.085, 0.032, 0.13, 0.048, 0x1f281f, 0.14);
    r.part('slide', 0, 0.07, 0.05, (s) => s.metal.box(0, 0.01, 0, 0.018, 0.022, 0.03, STEEL));
    r.ud = { muzzleZ: -0.53, gripL: [0, -0.03, -0.3], magPos: [0, -0.1, -0.085], stockPos: [0, 0.04, 0.32], eject: [0.025, 0.05, -0.04] };
  },
  heavy_ar(r) {
    pistolGrip(r, DARK, 0.012);
    zbox(r.metal, 0, 0.014, -0.05, 0.056, 0.056, 0.3, 0x4a4036);
    zbox(r.metal, 0, 0.06, -0.08, 0.054, 0.05, 0.32, 0x5a4c3d);
    r.metal.box(0.029, 0.052, -0.04, 0.003, 0.018, 0.06, BLACK, { ao: 1 });
    zbox(r.metal, 0, 0.096, -0.1, 0.03, 0.012, 0.24, DARK, { ao: 1 });
    zbox(r.metal, 0, 0.042, -0.34, 0.064, 0.07, 0.22, 0x3a3228);
    for (let i = 0; i < 4; i++) sides(r.metal, 0.0325, 0.042, -0.27 - i * 0.045, 0.003, 0.04, 0.02, BLACK);
    tube(r.metal, 0, 0.05, -0.58, -0.45, 0.02, 0.02, DARK, { sides: 8 });
    tube(r.metal, 0, 0.05, -0.58, -0.54, 0.028, 0.024, GUN2, { sides: 8 }); // big muzzle brake
    scopeBody(r, -0.2, -0.02, 0.134, 0.02, 0x15181b); // short optic
    rifleStock(r, 0x4a4036, 0.25);
    magazine(r, 0, -0.065, -0.09, 0.04, 0.115, 0.064, 0x2a2520, 0.12);
    r.metal.box(0.0305, 0.014, -0.12, 0.003, 0.024, 0.05, ORANGE, { ao: 1 });
    r.part('slide', 0, 0.075, 0.08, (s) => s.metal.box(0, 0.01, 0, 0.022, 0.026, 0.034, STEEL));
    r.ud = { muzzleZ: -0.58, gripL: [0, -0.03, -0.34], magPos: [0, -0.095, -0.09], stockPos: [0, 0.04, 0.35], eject: [0.03, 0.052, -0.04] };
  },
  lever(r) {
    // brass receiver, octagonal barrel, tube magazine, walnut stock and fore-end
    zbox(r.metal, 0, 0.026, -0.05, 0.04, 0.06, 0.2, BRASS, { ao: 0.85 }); // receiver
    tube(r.metal, 0, 0.046, -0.7, -0.15, 0.013, 0.014, STEEL, { sides: 8 }); // barrel
    tube(r.metal, 0, 0.01, -0.62, -0.15, 0.011, 0.011, STEEL, { sides: 8 }); // magazine tube
    for (let i = 0; i < 3; i++) tube(r.metal, 0, 0.01, -0.5 + i * 0.18, -0.49 + i * 0.18, 0.016, 0.016, BRASS, { sides: 8 });
    zbox(r.matte, 0, 0.006, -0.4, 0.034, 0.034, 0.3, WOOD2, { taper: [0.9, 0.9] }); // fore-end
    zbox(r.matte, 0, 0.012, 0.19, 0.04, 0.1, 0.3, WOOD, { taper: [0.95, 0.8] }); // stock
    zbox(r.matte, 0, 0.062, 0.06, 0.03, 0.03, 0.1, WOOD); // wrist
    r.metal.box(0, 0.002, 0.346, 0.04, 0.11, 0.012, BRASS); // butt plate
    r.metal.box(0, 0.078, -0.62, 0.008, 0.016, 0.01, DARK); // front sight
    r.metal.box(0, 0.074, -0.17, 0.024, 0.01, 0.014, DARK); // rear sight
    r.metal.box(0, 0.082, -0.17, 0.006, 0.012, 0.006, DARK);
    r.metal.box(0.0215, 0.03, -0.06, 0.003, 0.012, 0.04, BRASS, { ao: 1 }); // loading gate
    r.metal.box(0, 0.052, 0.0, 0.01, 0.02, 0.01, DARK, { rot: [0.5, 0, 0] }); // hammer
    r.matte.box(0, -0.052, 0.06, 0.03, 0.06, 0.04, WOOD, { rot: [-0.3, 0, 0] }); // grip
    r.part('lever', 0, -0.006, 0.02, (l) => {
      // the lever loop swings down and forward around its rear pivot
      zbox(l.metal, 0, -0.03, -0.05, 0.01, 0.01, 0.1, STEEL);
      l.metal.box(0, -0.016, -0.1, 0.01, 0.034, 0.01, STEEL);
      l.metal.box(0, -0.016, 0.0, 0.01, 0.034, 0.01, STEEL);
      l.metal.box(0, -0.008, -0.03, 0.006, 0.02, 0.008, LIGHT, { rot: [0.25, 0, 0] });
    });
    r.ud = { muzzleZ: -0.7, gripL: [0, -0.02, -0.38], magPos: [0, -0.005, -0.1], stockPos: [0, 0.03, 0.35] };
  },

  // ---- shotguns -----------------------------------------------------------------------------------------------------
  pump(r) {
    zbox(r.metal, 0, 0.034, -0.02, 0.05, 0.06, 0.2, 0x2f3338); // receiver
    r.metal.box(0.0255, 0.04, -0.02, 0.003, 0.014, 0.07, BLACK, { ao: 1 }); // ejection port
    tube(r.metal, 0, 0.046, -0.74, -0.1, 0.017, 0.019, STEEL, { sides: 8 }); // barrel
    tube(r.metal, 0, 0.01, -0.64, -0.1, 0.015, 0.015, 0x2a2e33, { sides: 8 }); // magazine tube
    tube(r.metal, 0, 0.01, -0.64, -0.62, 0.02, 0.02, STEEL, { sides: 8 }); // end cap
    zbox(r.metal, 0, 0.069, -0.4, 0.012, 0.01, 0.56, LIGHT, { ao: 1 }); // top rib
    r.metal.box(0, 0.085, -0.73, 0.008, 0.014, 0.01, 0xff6a3a); // bead sight
    r.matte.box(0, -0.034, 0.08, 0.04, 0.05, 0.05, WOOD, { rot: [-0.3, 0, 0] }); // grip
    zbox(r.matte, 0, 0.016, 0.24, 0.044, 0.1, 0.26, WOOD, { taper: [0.95, 0.85] }); // stock
    r.matte.box(0, 0.018, 0.375, 0.046, 0.108, 0.014, BLACK); // recoil pad
    zbox(r.metal, 0, -0.018, 0.04, 0.008, 0.008, 0.07, STEEL);
    r.metal.box(0, -0.03, 0.008, 0.008, 0.024, 0.008, STEEL);
    r.metal.box(0, -0.014, 0.03, 0.006, 0.022, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.part('pump', 0, 0.004, -0.34, (p) => {
      zbox(p.matte, 0, 0, 0, 0.056, 0.05, 0.16, WOOD2);
      teeth(p.matte, 0.029, 0, -0.06, 0.06, 7, 0.003, 0.036, 0.006, BLACK);
      teeth(p.matte, -0.029, 0, -0.06, 0.06, 7, 0.003, 0.036, 0.006, BLACK);
    });
    r.ud = { muzzleZ: -0.74, gripL: [0, -0.02, -0.34], magPos: [0, 0.0, -0.02], stockPos: [0, 0.02, 0.38], eject: [0.026, 0.04, -0.02] };
  },
  tac_shotgun(r) {
    pistolGrip(r, DARK, 0.03);
    zbox(r.metal, 0, 0.034, -0.03, 0.054, 0.066, 0.22, GUN);
    r.metal.box(0.0275, 0.04, -0.03, 0.003, 0.014, 0.07, BLACK, { ao: 1 });
    zbox(r.metal, 0, 0.082, -0.05, 0.02, 0.012, 0.28, GUN2, { ao: 1 }); // rail
    teeth(r.metal, 0, 0.09, -0.17, 0.05, 8, 0.016, 0.005, 0.008, DARK);
    tube(r.metal, 0, 0.044, -0.62, -0.14, 0.019, 0.02, 0x25292d, { sides: 8 });
    tube(r.metal, 0, 0.01, -0.5, -0.14, 0.016, 0.016, GUN2, { sides: 8 });
    zbox(r.metal, 0, 0.026, -0.34, 0.052, 0.07, 0.2, 0x1a1c1f); // shroud
    for (let i = 0; i < 4; i++) sides(r.metal, 0.0265, 0.03, -0.27 - i * 0.04, 0.003, 0.04, 0.014, BLACK);
    r.metal.box(0, 0.074, -0.6, 0.008, 0.02, 0.01, ORANGE);
    zbox(r.matte, 0, 0.034, 0.17, 0.04, 0.056, 0.22, 0x30353b, { taper: [0.9, 0.9] });
    r.matte.box(0, 0.02, 0.285, 0.044, 0.1, 0.012, BLACK);
    r.part('pump', 0, 0.0, -0.3, (p) => { zbox(p.matte, 0, 0.0, 0, 0.056, 0.048, 0.12, 0x1a1c1f); teeth(p.matte, 0.029, 0, -0.04, 0.04, 5, 0.003, 0.03, 0.006, DARK); });
    r.ud = { muzzleZ: -0.62, gripL: [0, -0.02, -0.34], magPos: [0, 0.0, -0.03], stockPos: [0, 0.03, 0.29], eject: [0.028, 0.04, -0.03] };
  },
  double_barrel(r) {
    zbox(r.metal, 0, 0.032, -0.02, 0.06, 0.062, 0.16, 0x6a6e74, { ao: 0.8 }); // action with engraving
    for (let i = 0; i < 3; i++) r.metal.box(0.031, 0.034, -0.05 + i * 0.03, 0.003, 0.02, 0.012, LIGHT, { ao: 1 });
    tube(r.metal, -0.018, 0.046, -0.63, -0.1, 0.017, 0.018, STEEL, { sides: 8 });
    tube(r.metal, 0.018, 0.046, -0.63, -0.1, 0.017, 0.018, STEEL, { sides: 8 });
    zbox(r.metal, 0, 0.068, -0.37, 0.016, 0.008, 0.53, LIGHT, { ao: 1 }); // rib
    tube(r.metal, -0.018, 0.046, -0.63, -0.62, 0.02, 0.02, DARK, { sides: 8 });
    tube(r.metal, 0.018, 0.046, -0.63, -0.62, 0.02, 0.02, DARK, { sides: 8 });
    zbox(r.matte, 0, 0.0, -0.28, 0.056, 0.05, 0.2, WOOD2, { taper: [0.9, 0.9] }); // fore-end
    r.metal.box(0, 0.082, -0.62, 0.008, 0.014, 0.01, BRASS);
    r.metal.box(0, 0.074, 0.062, 0.01, 0.034, 0.01, STEEL, { rot: [0.5, 0, 0] }); // tang / hammers
    r.metal.box(-0.016, 0.07, 0.04, 0.008, 0.024, 0.012, DARK, { rot: [0.5, 0, 0] });
    r.metal.box(0.016, 0.07, 0.04, 0.008, 0.024, 0.012, DARK, { rot: [0.5, 0, 0] });
    r.matte.box(0, -0.03, 0.08, 0.04, 0.05, 0.05, WOOD, { rot: [-0.3, 0, 0] });
    zbox(r.matte, 0, 0.012, 0.25, 0.044, 0.1, 0.3, WOOD, { taper: [0.95, 0.8] });
    r.metal.box(0, 0.016, 0.4, 0.046, 0.108, 0.012, BRASS);
    zbox(r.metal, 0, -0.018, 0.04, 0.008, 0.008, 0.07, STEEL);
    r.metal.box(0, -0.03, 0.008, 0.008, 0.024, 0.008, STEEL);
    r.metal.box(0, -0.016, 0.02, 0.006, 0.022, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.metal.box(0.0, -0.016, 0.006, 0.006, 0.022, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.ud = { muzzleZ: -0.63, gripL: [0, -0.01, -0.28], magPos: [0, 0.03, -0.02], stockPos: [0, 0.02, 0.4] };
  },
  auto_shotgun(r) {
    pistolGrip(r, 0x4a2e2e, 0.02);
    zbox(r.metal, 0, 0.034, -0.04, 0.058, 0.068, 0.3, 0x4a2e2e);
    zbox(r.metal, 0, 0.078, -0.04, 0.03, 0.012, 0.3, DARK, { ao: 1 });
    r.metal.box(0.03, 0.04, -0.02, 0.003, 0.016, 0.06, BLACK, { ao: 1 });
    tube(r.metal, 0, 0.044, -0.58, -0.18, 0.022, 0.024, 0x2a2e33, { sides: 8 });
    tube(r.metal, 0, 0.044, -0.58, -0.54, 0.03, 0.026, GUN2, { sides: 8 });
    for (let i = 0; i < 3; i++) r.metal.box(0, 0.044, -0.56 + i * 0.012, 0.062, 0.01, 0.004, BLACK, { ao: 1 });
    zbox(r.metal, 0, 0.026, -0.36, 0.056, 0.07, 0.2, 0x2a1c1c);
    // drum magazine
    r.metal.cyl(0, -0.058, -0.1, 0.075, 0.075, 0.07, 0x1a1c1f, { rot: [0, 0, HP], sides: 14 });
    r.metal.cyl(0, -0.058, -0.1, 0.06, 0.06, 0.074, 0x4a2e2e, { rot: [0, 0, HP], sides: 14 });
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; r.metal.box(0.0375, -0.058 + Math.cos(a) * 0.06, -0.1 + Math.sin(a) * 0.06, 0.004, 0.014, 0.014, ORANGE, { ao: 1 }); }
    r.metal.box(0, 0.09, -0.56, 0.008, 0.02, 0.01, ORANGE);
    zbox(r.matte, 0, 0.034, 0.18, 0.04, 0.056, 0.2, 0x4a2e2e, { taper: [0.9, 0.9] });
    r.matte.box(0, 0.02, 0.285, 0.044, 0.1, 0.012, BLACK);
    r.part('slide', 0, 0.08, 0.06, (s) => s.metal.box(0, 0.01, 0, 0.018, 0.022, 0.034, STEEL));
    r.ud = { muzzleZ: -0.58, gripL: [0, -0.03, -0.36], magPos: [0, -0.06, -0.1], stockPos: [0, 0.03, 0.29], eject: [0.03, 0.04, -0.02] };
  },

  // ---- snipers --------------------------------------------------------------------------------------------------------
  bolt_sniper(r) {
    zbox(r.matte, 0, 0.01, -0.03, 0.05, 0.07, 0.4, 0x2e3a2e); // chassis
    zbox(r.matte, 0, 0.02, 0.26, 0.05, 0.1, 0.3, 0x2e3a2e, { taper: [0.95, 0.8] }); // stock
    r.matte.box(0, 0.06, 0.2, 0.034, 0.02, 0.16, 0x384738); // cheek rest
    r.matte.box(0, 0.026, 0.415, 0.05, 0.11, 0.014, BLACK);
    zbox(r.matte, 0, 0.0, -0.35, 0.04, 0.05, 0.32, 0x253025, { taper: [0.9, 0.9] }); // fore-end
    tube(r.metal, 0, 0.046, -0.95, -0.2, 0.014, 0.018, 0x59616b, { sides: 8 }); // heavy barrel
    tube(r.metal, 0, 0.046, -0.95, -0.88, 0.022, 0.02, GUN2, { sides: 8 }); // muzzle brake
    for (let i = 0; i < 3; i++) r.metal.box(0, 0.046, -0.93 + i * 0.018, 0.048, 0.01, 0.005, BLACK, { ao: 1 });
    zbox(r.metal, 0, 0.065, -0.06, 0.036, 0.02, 0.2, GUN2); // action top
    zbox(r.metal, 0, 0.09, -0.08, 0.026, 0.01, 0.26, GUN2, { ao: 1 }); // scope rail
    scopeBody(r, -0.28, -0.04, 0.125, 0.026, 0x15181b);
    magazine(r, 0, -0.045, -0.05, 0.03, 0.07, 0.06, GUN2, 0.0); // box magazine
    r.metal.box(0.026, -0.02, -0.55, 0.008, 0.008, 0.18, STEEL); // bipod legs folded
    r.metal.box(-0.026, -0.02, -0.55, 0.008, 0.008, 0.18, STEEL);
    zbox(r.metal, 0, -0.018, 0.04, 0.008, 0.008, 0.07, STEEL);
    r.metal.box(0, -0.03, 0.008, 0.008, 0.024, 0.008, STEEL);
    r.matte.box(0, -0.03, 0.07, 0.036, 0.06, 0.044, 0x2e3a2e, { rot: [-0.3, 0, 0] });
    r.part('bolt', 0, 0.062, 0.02, (b) => {
      zbox(b.metal, 0, 0, 0, 0.022, 0.022, 0.08, STEEL);
      b.metal.box(0.032, 0.0, 0.03, 0.044, 0.01, 0.01, STEEL); // bolt handle
      b.metal.cyl(0.056, 0.0, 0.03, 0.01, 0.01, 0.012, LIGHT, { sides: 8 }); // knob
    });
    r.ud = { muzzleZ: -0.95, gripL: [0, -0.01, -0.36], magPos: [0, -0.05, -0.05], stockPos: [0, 0.03, 0.42] };
  },
  semi_sniper(r) {
    pistolGrip(r, 0x3a3a3a, 0.02);
    zbox(r.metal, 0, 0.034, -0.05, 0.054, 0.07, 0.4, 0x3a3a3a);
    zbox(r.metal, 0, 0.078, -0.06, 0.03, 0.012, 0.38, GUN2, { ao: 1 });
    r.metal.box(0.028, 0.04, -0.03, 0.003, 0.018, 0.06, BLACK, { ao: 1 });
    zbox(r.metal, 0, 0.034, -0.4, 0.056, 0.064, 0.26, 0x2e2e2e); // handguard
    for (let i = 0; i < 5; i++) sides(r.metal, 0.0285, 0.034, -0.3 - i * 0.04, 0.003, 0.034, 0.016, BLACK);
    tube(r.metal, 0, 0.046, -0.85, -0.5, 0.015, 0.018, STEEL, { sides: 8 });
    tube(r.metal, 0, 0.046, -0.85, -0.76, 0.024, 0.022, 0x1c2025, { sides: 10 }); // suppressor
    scopeBody(r, -0.3, -0.04, 0.13, 0.024, 0x15181b);
    zbox(r.metal, 0, 0.09, -0.1, 0.024, 0.01, 0.28, GUN2, { ao: 1 });
    rifleStock(r, 0x3a3a3a, 0.26);
    magazine(r, 0, -0.07, -0.09, 0.034, 0.12, 0.05, GUN2, 0.1);
    r.metal.box(0, -0.03, -0.62, 0.044, 0.008, 0.008, STEEL); // bipod
    r.metal.box(0.02, -0.04, -0.6, 0.006, 0.05, 0.006, STEEL, { rot: [0.2, 0, 0.3] });
    r.metal.box(-0.02, -0.04, -0.6, 0.006, 0.05, 0.006, STEEL, { rot: [0.2, 0, -0.3] });
    r.part('slide', 0, 0.07, 0.07, (s) => s.metal.box(0, 0.01, 0, 0.018, 0.022, 0.03, STEEL));
    r.ud = { muzzleZ: -0.85, gripL: [0, -0.03, -0.38], magPos: [0, -0.1, -0.09], stockPos: [0, 0.03, 0.36], eject: [0.028, 0.04, -0.03] };
  },

  // ---- heavy -------------------------------------------------------------------------------------------------------------
  lmg(r) {
    pistolGrip(r, DARK, 0.02);
    zbox(r.metal, 0, 0.034, -0.08, 0.07, 0.082, 0.46, 0x3b4a2e);
    zbox(r.metal, 0, 0.088, -0.1, 0.044, 0.016, 0.34, 0x2c3822);
    teeth(r.metal, 0, 0.1, -0.24, 0.04, 9, 0.03, 0.006, 0.01, DARK);
    zbox(r.metal, 0, 0.12, -0.12, 0.012, 0.03, 0.22, DARK); // carry handle
    zbox(r.metal, 0, 0.14, -0.12, 0.02, 0.008, 0.22, GUN2);
    tube(r.metal, 0, 0.044, -0.72, -0.3, 0.02, 0.024, STEEL, { sides: 8 }); // heavy barrel
    tube(r.metal, 0, 0.044, -0.72, -0.64, 0.028, 0.022, GUN2, { sides: 8 });
    zbox(r.metal, 0, 0.044, -0.5, 0.058, 0.06, 0.18, 0x252a22); // heat shield
    for (let i = 0; i < 5; i++) sides(r.metal, 0.03, 0.044, -0.43 - i * 0.03, 0.003, 0.034, 0.012, BLACK);
    r.metal.box(0.03, -0.04, -0.58, 0.01, 0.1, 0.01, STEEL, { rot: [0.35, 0, 0.18] }); // bipod
    r.metal.box(-0.03, -0.04, -0.58, 0.01, 0.1, 0.01, STEEL, { rot: [0.35, 0, -0.18] });
    r.metal.box(0, -0.1, -0.05, 0.1, 0.11, 0.12, 0x252a22); // box magazine with belt
    r.metal.box(0, -0.1, -0.05, 0.104, 0.02, 0.124, ORANGE, { ao: 1 });
    r.metal.box(0, -0.034, -0.05, 0.03, 0.04, 0.06, 0x8a7a40);
    for (let i = 0; i < 4; i++) r.metal.box(0.0, -0.01, -0.08 + i * 0.014, 0.024, 0.014, 0.01, BRASS, { ao: 1 });
    zbox(r.matte, 0, 0.034, 0.22, 0.05, 0.1, 0.22, 0x3b4a2e, { taper: [0.95, 0.9] });
    r.matte.box(0, 0.02, 0.335, 0.05, 0.106, 0.012, BLACK);
    r.part('slide', 0, 0.092, 0.08, (s) => s.metal.box(0, 0.01, 0, 0.022, 0.024, 0.034, STEEL));
    r.ud = { muzzleZ: -0.72, gripL: [0, -0.03, -0.36], magPos: [0, -0.1, -0.05], stockPos: [0, 0.03, 0.34], eject: [0.036, 0.04, -0.03] };
  },
  minigun(r) {
    // rotating barrel cluster (named part: spins about Z) in a housing, motor block and carry handle
    r.part('barrels', 0, 0.03, -0.4, (b) => {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        tube(b.metal, Math.cos(a) * 0.036, Math.sin(a) * 0.036, -0.3, 0.3, 0.013, 0.013, i % 2 ? STEEL : 0x7a828c, { sides: 6 });
        tube(b.metal, Math.cos(a) * 0.036, Math.sin(a) * 0.036, -0.3, -0.28, 0.016, 0.016, BLACK, { sides: 6 });
      }
      tube(b.metal, 0, 0, -0.3, 0.3, 0.014, 0.014, DARK, { sides: 6 });
      for (const z of [-0.2, 0.0, 0.2]) tube(b.metal, 0, 0, z - 0.012, z + 0.012, 0.05, 0.05, 0x59616b, { sides: 12 }); // clamps
    });
    tube(r.metal, 0, 0.03, -0.16, -0.12, 0.062, 0.062, 0x30353c, { sides: 12 });
    zbox(r.metal, 0, 0.02, 0.01, 0.13, 0.15, 0.3, 0x5a5f66, { ao: 0.85 }); // motor housing
    zbox(r.metal, 0, 0.02, 0.01, 0.136, 0.04, 0.2, ORANGE, { ao: 1 });
    r.metal.box(0, 0.1, 0.02, 0.05, 0.02, 0.18, GUN2);
    zbox(r.metal, 0, 0.13, 0.02, 0.014, 0.05, 0.16, DARK); // handle
    zbox(r.metal, 0, 0.158, 0.02, 0.02, 0.012, 0.16, GUN2);
    pistolGrip(r, DARK, 0.02);
    r.metal.box(0, -0.085, 0.14, 0.09, 0.1, 0.09, 0x252a22); // ammo box behind
    r.metal.box(0.0, -0.085, 0.14, 0.094, 0.016, 0.094, BRASS, { ao: 1 });
    for (let i = 0; i < 5; i++) r.metal.box(0.0, -0.03 + i * 0.002, 0.1 - i * 0.014, 0.022, 0.012, 0.012, BRASS, { ao: 1 }); // belt
    r.ud = { muzzleZ: -0.7, gripL: [0, -0.02, -0.18], magPos: [0, -0.085, 0.14] };
  },

  // ---- explosive & bow --------------------------------------------------------------------------------------------------
  launcher(r) {
    tube(r.matte, 0, 0.06, -0.7, 0.2, 0.078, 0.078, OLIVE, { sides: 12 }); // tube
    tube(r.matte, 0, 0.06, -0.78, -0.66, 0.098, 0.084, 0x2b3322, { sides: 12 }); // flared muzzle
    tube(r.matte, 0, 0.06, 0.16, 0.26, 0.082, 0.108, 0x2b3322, { sides: 12 }); // rear venturi
    for (const z of [-0.5, -0.1, 0.0]) tube(r.metal, 0, 0.06, z - 0.01, z + 0.01, 0.083, 0.083, 0x3a4530, { sides: 12 }); // bands
    tube(r.matte, 0, 0.06, -0.72, -0.68, 0.05, 0.05, 0xb83a2e, { sides: 10 }); // warhead peeking out of the front
    tube(r.matte, 0, 0.06, -0.77, -0.72, 0.0, 0.046, 0xd8d2c0, { sides: 10 });
    r.matte.box(0, -0.048, 0.0, 0.04, 0.09, 0.05, DARK, { rot: [-0.22, 0, 0] }); // grip
    r.matte.box(0, -0.036, -0.28, 0.034, 0.06, 0.04, DARK, { rot: [0.1, 0, 0] }); // foregrip
    r.metal.box(0, 0.15, -0.2, 0.03, 0.05, 0.1, GUN2); // sight
    r.metal.box(0, 0.178, -0.2, 0.036, 0.008, 0.07, GUN2);
    r.glow.box(0, 0.176, -0.24, 0.02, 0.012, 0.004, ORANGE);
    r.matte.box(0, 0.06, 0.1, 0.12, 0.05, 0.12, 0x2b3322); // shoulder rest
    r.matte.box(0, 0.02, 0.18, 0.1, 0.02, 0.06, BLACK);
    zbox(r.metal, 0, -0.016, -0.03, 0.008, 0.008, 0.07, STEEL);
    r.metal.box(0, -0.026, -0.065, 0.008, 0.024, 0.008, STEEL);
    r.ud = { muzzleZ: -0.8, gripL: [0, -0.07, -0.28], magPos: [0, 0.06, 0.26], stockPos: [0, 0.06, 0.22] };
  },
  grenade_launcher(r) {
    pistolGrip(r, DARK, 0.02);
    zbox(r.metal, 0, 0.03, 0.0, 0.05, 0.07, 0.26, 0x3a3f46); // body
    tube(r.metal, 0, 0.05, -0.55, -0.12, 0.032, 0.034, STEEL, { sides: 10 }); // fat barrel
    tube(r.metal, 0, 0.05, -0.55, -0.52, 0.042, 0.036, GUN2, { sides: 10 });
    r.part('cylinder', 0, 0.034, -0.06, (c) => {
      tube(c.metal, 0, 0, -0.06, 0.06, 0.062, 0.062, 0x6a6f35, { sides: 12 });
      for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; tube(c.metal, Math.cos(a) * 0.04, Math.sin(a) * 0.04, -0.062, -0.058, 0.016, 0.016, BLACK, { sides: 8 }); }
      tube(c.metal, 0, 0, -0.064, -0.058, 0.012, 0.012, DARK, { sides: 6 });
    });
    r.metal.box(0, 0.106, -0.1, 0.022, 0.044, 0.06, GUN2); // ladder sight
    r.metal.box(0, 0.134, -0.1, 0.03, 0.006, 0.05, GUN2);
    zbox(r.matte, 0, 0.02, 0.22, 0.04, 0.09, 0.2, 0x3a3f46, { taper: [0.9, 0.9] });
    r.matte.box(0, 0.016, 0.322, 0.044, 0.096, 0.012, BLACK);
    r.matte.box(0, -0.036, -0.3, 0.034, 0.06, 0.04, DARK);
    r.metal.box(0.0265, 0.034, -0.06, 0.003, 0.02, 0.06, ORANGE, { ao: 1 });
    r.ud = { muzzleZ: -0.55, gripL: [0, -0.04, -0.3], magPos: [0, 0.034, -0.06], stockPos: [0, 0.03, 0.32] };
  },
  crossbow(r) {
    zbox(r.matte, 0, 0.02, -0.05, 0.05, 0.07, 0.5, WOOD2); // stock
    zbox(r.matte, 0, 0.012, 0.2, 0.046, 0.09, 0.14, WOOD2, { taper: [0.9, 0.8] });
    r.matte.box(0, 0.014, 0.275, 0.048, 0.096, 0.012, BLACK);
    zbox(r.metal, 0, 0.062, -0.17, 0.02, 0.012, 0.4, STEEL); // flight rail
    r.metal.box(0.1, 0.05, -0.34, 0.2, 0.026, 0.034, 0x2e3238, { rot: [0, 0.3, 0] }); // limbs
    r.metal.box(-0.1, 0.05, -0.34, 0.2, 0.026, 0.034, 0x2e3238, { rot: [0, -0.3, 0] });
    r.metal.box(0.205, 0.05, -0.4, 0.03, 0.03, 0.05, ORANGE, { rot: [0, 0.3, 0] });
    r.metal.box(-0.205, 0.05, -0.4, 0.03, 0.03, 0.05, ORANGE, { rot: [0, -0.3, 0] });
    r.metal.line([0.2, 0.05, -0.4], [0, 0.05, -0.245], 0.005, 0xe8e2d0, { ao: 1 }); // string, drawn back
    r.metal.line([-0.2, 0.05, -0.4], [0, 0.05, -0.245], 0.005, 0xe8e2d0, { ao: 1 });
    tube(r.metal, 0, 0.035, -0.54, -0.5, 0.028, 0.028, STEEL, { sides: 8 }); // stirrup
    r.metal.box(0, 0.035, -0.395, 0.04, 0.02, 0.005, STEEL);
    tube(r.metal, 0, 0.078, -0.36, -0.1, 0.006, 0.006, 0xdddddd, { sides: 6 }); // loaded bolt
    tube(r.metal, 0, 0.078, -0.395, -0.36, 0.0, 0.014, 0xaab0b8, { sides: 6 });
    r.metal.box(0, 0.082, -0.1, 0.014, 0.014, 0.02, ORANGE);
    scopeBody(r, -0.15, -0.0, 0.1, 0.016, 0x15181b);
    r.matte.box(0, -0.04, 0.02, 0.036, 0.07, 0.044, WOOD2, { rot: [-0.3, 0, 0] });
    zbox(r.metal, 0, -0.014, -0.04, 0.008, 0.008, 0.06, STEEL);
    r.metal.box(0, -0.012, -0.01, 0.006, 0.02, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.ud = { muzzleZ: -0.4, gripL: [0, -0.02, -0.25], magPos: [0, 0.07, -0.1], stockPos: [0, 0.02, 0.28] };
  },

  // ---- melee: handle at the grip, blade toward -Z ------------------------------------------------------------------------------
  pickaxe(r) {
    tube(r.matte, 0, 0, -0.5, 0.2, 0.018, 0.02, WOOD, { sides: 8 }); // shaft
    for (let i = 0; i < 4; i++) tube(r.matte, 0, 0, -0.06 + i * 0.045, -0.04 + i * 0.045, 0.021, 0.021, 0x3a2a1c, { sides: 8 }); // grip wraps
    tube(r.matte, 0, 0, 0.2, 0.23, 0.026, 0.026, 0x2a1d12, { sides: 8 }); // butt cap
    // head: a curved double pick on a socket
    r.metal.box(0, 0, -0.62, 0.05, 0.05, 0.07, 0x59616b); // eye
    r.metal.box(0, 0.075, -0.62, 0.026, 0.12, 0.034, 0x9aa2ab, { taper: [0.5, 0.7] });
    r.metal.box(0, 0.145, -0.636, 0.02, 0.05, 0.026, 0xb8bec6, { rot: [-0.45, 0, 0], taper: [0.3, 0.5] });
    r.metal.box(0, -0.075, -0.62, 0.026, 0.12, 0.034, 0x9aa2ab, { taper: [0.5, 0.7], rot: [Math.PI, 0, 0] });
    r.metal.box(0, -0.145, -0.636, 0.02, 0.05, 0.026, 0xb8bec6, { rot: [Math.PI + 0.45, 0, 0], taper: [0.3, 0.5] });
    r.metal.box(0, 0, -0.665, 0.056, 0.04, 0.02, 0x2a2e33);
    r.metal.box(0, 0, -0.575, 0.056, 0.04, 0.02, ORANGE, { ao: 1 }); // socket band
    r.ud = { muzzleZ: -0.62, gripL: [0, 0, 0.1] };
  },
  machete(r) {
    zbox(r.matte, 0, 0, 0.015, 0.03, 0.04, 0.13, 0x2a2a2a);
    for (let i = 0; i < 3; i++) r.matte.box(0, 0, -0.03 + i * 0.04, 0.034, 0.044, 0.008, 0x3d3d3d, { ao: 1 });
    r.metal.box(0, 0, -0.056, 0.052, 0.014, 0.022, BRASS); // guard
    r.metal.box(0, 0.025, -0.056, 0.012, 0.03, 0.022, BRASS);
    zbox(r.metal, 0, 0.012, -0.3, 0.012, 0.078, 0.48, 0xc8ced4); // blade
    r.metal.box(0, 0.052, -0.3, 0.016, 0.01, 0.48, 0xe8edf2, { ao: 1 }); // spine highlight
    r.metal.box(0, 0.016, -0.3, 0.0135, 0.016, 0.4, 0x9aa2ab, { ao: 1 }); // fuller
    zbox(r.metal, 0, -0.012, -0.55, 0.012, 0.05, 0.1, 0xc8ced4, { front: true, taper: [1, 0.2] }); // belly tip
    r.metal.box(0, -0.028, -0.3, 0.004, 0.012, 0.46, 0xeef2f6, { ao: 1 }); // edge
    r.ud = { muzzleZ: -0.58 };
  },
  bat(r) {
    tube(r.matte, 0, 0, -0.27, 0.07, 0.019, 0.016, 0xb88a52, { sides: 10 }); // handle taper
    for (let i = 0; i < 5; i++) tube(r.matte, 0, 0, -0.05 + i * 0.02, -0.04 + i * 0.02, 0.0175, 0.0175, 0x22262c, { sides: 10 }); // grip tape
    tube(r.matte, 0, 0, 0.07, 0.1, 0.026, 0.026, 0xb88a52, { sides: 10 }); // knob
    tube(r.matte, 0, 0, -0.78, -0.26, 0.038, 0.02, 0xc9985c, { sides: 10 }); // barrel
    tube(r.matte, 0, 0, -0.5, -0.4, 0.044, 0.043, 0xc9985c, { sides: 10 });
    tube(r.matte, 0, 0, -0.72, -0.66, 0.0395, 0.0395, 0xd02f2f, { sides: 10 }); // stripe
    tube(r.matte, 0, 0, -0.78, -0.77, 0.036, 0.036, 0x9a6d3c, { sides: 10 });
    r.ud = { muzzleZ: -0.78 };
  },
  katana(r) {
    tube(r.matte, 0, 0, -0.04, 0.12, 0.018, 0.016, 0x1c1c26, { sides: 8 }); // wrapped handle
    for (let i = 0; i < 5; i++) r.matte.box(0, 0, -0.02 + i * 0.026, 0.038, 0.012, 0.006, 0xb8202a, { rot: [0, 0, 0.7], ao: 1 });
    tube(r.metal, 0, 0, 0.12, 0.132, 0.014, 0.014, BRASS, { sides: 8 }); // kashira
    tube(r.metal, 0, 0, -0.065, -0.055, 0.05, 0.05, BRASS, { sides: 10 }); // tsuba
    tube(r.metal, 0, 0, -0.086, -0.064, 0.02, 0.02, BRASS, { sides: 8 }); // habaki
    zbox(r.metal, 0, 0.004, -0.46, 0.008, 0.044, 0.76, 0xe3e8ee, { ao: 1 }); // blade
    r.metal.box(0, 0.027, -0.46, 0.012, 0.008, 0.76, 0xf4f7fa, { ao: 1 }); // spine
    r.metal.box(0, -0.018, -0.46, 0.004, 0.012, 0.76, 0xffffff, { ao: 1 }); // edge line
    zbox(r.metal, 0, 0.004, -0.88, 0.008, 0.044, 0.05, 0xe3e8ee, { front: true, taper: [1, 0.1], ao: 1 }); // tip
    r.ud = { muzzleZ: -0.9 };
  },
  sledge(r) {
    tube(r.matte, 0, 0, -0.74, 0.2, 0.02, 0.022, WOOD, { sides: 8 });
    for (let i = 0; i < 5; i++) tube(r.matte, 0, 0, -0.04 + i * 0.05, -0.02 + i * 0.05, 0.0245, 0.0245, 0x2a2e33, { sides: 8 });
    tube(r.matte, 0, 0, 0.2, 0.23, 0.03, 0.03, 0x2a1d12, { sides: 8 });
    r.metal.box(0, 0, -0.85, 0.13, 0.13, 0.3, 0x5c6168, { ao: 0.85 }); // head
    r.metal.box(0, 0, -0.71, 0.14, 0.14, 0.04, 0x2a2d31, { ao: 1 }); // bands
    r.metal.box(0, 0, -1.0, 0.14, 0.14, 0.04, 0x2a2d31, { ao: 1 });
    r.metal.box(0, 0, -0.85, 0.136, 0.136, 0.05, ORANGE, { ao: 1 }); // paint stripe
    r.metal.box(0, 0.068, -0.85, 0.05, 0.01, 0.2, 0x7a828c, { ao: 1 });
    r.ud = { muzzleZ: -1.0, gripL: [0, 0, 0.1] };
  },

  // ---- throwables ------------------------------------------------------------------------------------------------------------------
  frag(r) {
    r.paint.ball(0, 0, 0, 0.05, 0.058, 0.05, 0x4f6a35, { seg: 10, rings: 7 });
    for (const y of [-0.03, 0, 0.03]) r.paint.cyl(0, y, 0, 0.051 - Math.abs(y) * 0.3, 0.051 - Math.abs(y) * 0.3, 0.006, 0x2e4020, { sides: 10, ao: 1 });
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; r.paint.box(Math.cos(a) * 0.05, 0, Math.sin(a) * 0.05, 0.006, 0.1, 0.006, 0x2e4020, { rot: [0, -a, 0], ao: 1 }); }
    r.metal.cyl(0, 0.06, 0, 0.018, 0.022, 0.022, STEEL, { sides: 8 }); // neck
    r.metal.box(0.012, 0.074, 0, 0.012, 0.012, 0.03, 0x8a929c); // fuse head
    r.metal.box(0.03, 0.05, 0, 0.01, 0.07, 0.024, LIGHT, { rot: [0, 0, -0.35] }); // spoon
    r.metal.box(-0.014, 0.078, 0, 0.026, 0.006, 0.006, BRASS, { ao: 1 }); // pin
    r.metal.box(-0.026, 0.07, 0, 0.006, 0.02, 0.014, BRASS, { ao: 1 });
    r.metal.box(-0.026, 0.082, 0, 0.012, 0.006, 0.014, BRASS, { ao: 1 });
    r.ud = { muzzleZ: 0 };
  },
  impulse(r) {
    r.paint.ball(0, 0, 0, 0.056, 0.056, 0.056, 0x2a6aaa, { seg: 10, rings: 7 });
    for (const [rx, rz] of [[0, 0], [HP, 0], [0.9, 0.9]]) r.glow.cyl(0, 0, 0, 0.066, 0.066, 0.014, CYAN, { rot: [rx, 0, rz], sides: 16, ao: 1 });
    r.metal.cyl(0, 0.06, 0, 0.02, 0.026, 0.024, 0x2e353d, { sides: 8 });
    r.glow.cyl(0, 0.076, 0, 0.012, 0.012, 0.012, 0xffffff, { sides: 6 });
    r.metal.box(0.03, 0.045, 0, 0.01, 0.05, 0.02, LIGHT, { rot: [0, 0, -0.4] });
    r.ud = { muzzleZ: 0 };
  },
  dynamite(r) {
    for (const [x, z] of [[-0.026, 0.0], [0.026, 0.0], [0, -0.03]]) {
      r.paint.cyl(x, 0, z, 0.024, 0.024, 0.2, 0xc02a22, { sides: 10 });
      r.paint.cyl(x, 0.1, z, 0.024, 0.02, 0.008, 0x2a2118, { sides: 10 });
      r.paint.cyl(x, -0.1, z, 0.02, 0.024, 0.008, 0x2a2118, { sides: 10 });
      r.paint.box(x, 0.02, z - 0.024, 0.024, 0.04, 0.003, 0xe6dcc0, { ao: 1 }); // label
    }
    for (const y of [-0.05, 0.05]) r.matte.cyl(0, y, -0.01, 0.062, 0.062, 0.018, 0x7a5a30, { sides: 10, ao: 1 }); // tape bands
    r.metal.box(0, 0.108, -0.01, 0.01, 0.014, 0.01, 0x2a2118);
    for (let i = 0; i < 5; i++) r.matte.box(0.004 * i, 0.116 + i * 0.012, -0.01 + (i % 2 ? 0.006 : -0.006), 0.006, 0.014, 0.006, 0xe8d8a0, { ao: 1 }); // fuse
    r.glow.ball(0.014, 0.18, -0.01, 0.012, 0.012, 0.012, 0xffb02a, { seg: 6, rings: 4 });
    r.glow.ball(0.014, 0.19, -0.01, 0.006, 0.006, 0.006, 0xffffff, { seg: 5, rings: 3 });
    r.ud = { muzzleZ: 0 };
  },
  boogie(r) {
    r.paint.ball(0, 0, 0, 0.062, 0.062, 0.062, 0x6a3fc8, { seg: 10, rings: 8 });
    for (let j = 1; j < 6; j++) {
      const lat = -Math.PI / 2 + (j / 6) * Math.PI, n = Math.max(3, Math.round(Math.cos(lat) * 11));
      for (let i = 0; i < n; i++) {
        const lon = ((i + (j % 2) * 0.5) / n) * Math.PI * 2;
        const nx = Math.cos(lat) * Math.sin(lon), ny = Math.sin(lat), nz = Math.cos(lat) * Math.cos(lon);
        r.metal.box(nx * 0.064, ny * 0.064, nz * 0.064, 0.022, 0.022, 0.006, (i + j) % 3 === 0 ? 0xffffff : (i + j) % 3 === 1 ? 0xc9a0ff : 0x8fd0ff, { rot: facing(nx, ny, nz), ao: 1 });
      }
    }
    r.metal.cyl(0, 0.07, 0, 0.012, 0.012, 0.02, STEEL, { sides: 6 });
    r.metal.box(0, 0.088, 0, 0.026, 0.006, 0.006, LIGHT, { ao: 1 }); // hanging ring
    r.ud = { muzzleZ: 0 };
  },

  // ---- gadgets ----------------------------------------------------------------------------------------------------------------------------
  grappler(r) {
    zbox(r.matte, 0, 0.012, -0.04, 0.07, 0.1, 0.18, 0x2a2e36); // body
    zbox(r.metal, 0, 0.012, -0.04, 0.074, 0.03, 0.12, 0x3a4350, { ao: 1 });
    tube(r.metal, 0, 0.026, -0.26, -0.12, 0.03, 0.036, 0x9aa2ab, { sides: 8 }); // launch tube
    tube(r.metal, 0, 0.026, -0.275, -0.255, 0.034, 0.03, STEEL, { sides: 8 });
    tube(r.metal, 0, 0.026, -0.31, -0.27, 0.0, 0.02, 0xc8ced4, { sides: 6 }); // the hook head loaded in the muzzle
    for (const a of [0, 2.1, 4.2]) r.metal.box(Math.cos(a) * 0.03, 0.026 + Math.sin(a) * 0.03, -0.285, 0.01, 0.01, 0.04, ORANGE, { rot: [0, 0, a] });
    r.metal.cyl(0.05, 0.012, -0.02, 0.05, 0.05, 0.03, 0x4a525c, { rot: [0, 0, HP], sides: 14 }); // rope drum
    r.matte.cyl(0.05, 0.012, -0.02, 0.04, 0.04, 0.034, ORANGE, { rot: [0, 0, HP], sides: 14 });
    r.glow.box(-0.04, 0.05, -0.1, 0.012, 0.012, 0.06, ORANGE);
    r.glow.box(0, 0.066, -0.08, 0.03, 0.006, 0.05, ORANGE);
    r.matte.box(0, -0.06, 0.02, 0.04, 0.09, 0.05, DARK, { rot: [-0.22, 0, 0] });
    zbox(r.metal, 0, -0.016, -0.03, 0.008, 0.008, 0.06, STEEL);
    r.metal.box(0, -0.014, -0.012, 0.006, 0.022, 0.01, LIGHT, { rot: [0.25, 0, 0] });
    r.ud = { muzzleZ: -0.31, gripL: [0, -0.07, 0.0] };
  },
  launchpad(r) {
    r.metal.cyl(0, 0, 0, 0.16, 0.16, 0.04, 0x22262e, { sides: 18 });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; r.matte.box(Math.cos(a) * 0.15, 0.0, Math.sin(a) * 0.15, 0.03, 0.044, 0.016, i % 2 ? 0xffc21a : 0x141414, { rot: [0, -a, 0], ao: 1 }); }
    r.glow.cyl(0, 0.022, 0, 0.12, 0.12, 0.006, CYAN, { sides: 18, ao: 1 });
    for (let i = 0; i < 3; i++) {
      r.glow.box(-0.03, 0.026, 0.02 - i * 0.04, 0.05, 0.004, 0.012, 0xffffff, { rot: [0, 0.6, 0], ao: 1 });
      r.glow.box(0.03, 0.026, 0.02 - i * 0.04, 0.05, 0.004, 0.012, 0xffffff, { rot: [0, -0.6, 0], ao: 1 });
    }
    r.ud = { muzzleZ: 0 };
  },

  // ---- consumables ------------------------------------------------------------------------------------------------------------------------------
  apple(r) { fruitApple(r, 0xd8322a, 0x8f1c16, 0xff7a6a, false); },
  jumpple(r) { fruitApple(r, 0x78e63a, 0x3a9a1a, 0xe2ff9a, true); },
  banana(r) { fruitBanana(r, 0xf6d23a, false); },
  runana(r) { fruitBanana(r, 0xf6d23a, true); },
  mushroom(r) {
    r.matte.cyl(0, -0.03, 0, 0.026, 0.02, 0.07, 0xf0e8d8, { sides: 8 });
    r.matte.cyl(0, 0.0, 0, 0.028, 0.034, 0.012, 0xcfc4ad, { sides: 12 }); // gills
    r.paint.ball(0, 0.012, 0, 0.07, 0.048, 0.07, 0x3a8aff, { seg: 12, rings: 6 });
    r.glow.cyl(0, 0.004, 0, 0.0705, 0.0705, 0.006, CYAN, { sides: 12, ao: 1 }); // glowing rim
    for (const [x, y, z, s] of [[0.03, 0.05, 0.02, 0.014], [-0.03, 0.046, 0.03, 0.012], [0.0, 0.058, -0.03, 0.013], [0.04, 0.036, -0.03, 0.01], [-0.045, 0.034, -0.015, 0.011], [0.0, 0.062, 0.015, 0.012]]) r.matte.ball(x, y, z, s, s * 0.6, s, 0xffffff, { seg: 6, rings: 4 });
    r.ud = { muzzleZ: 0 };
  },
  bandage(r) {
    r.matte.cyl(0, 0, 0, 0.045, 0.045, 0.06, 0xf4f0e6, { sides: 14 });
    for (const y of [0.0, 0.026, -0.026]) r.matte.cyl(0, y, 0, 0.047, 0.047, y ? 0.008 : 0.012, 0xd8d2c0, { sides: 14, ao: 1 });
    r.paint.box(0, 0.0305, 0, 0.05, 0.004, 0.014, RED, { ao: 1 });
    r.paint.box(0, 0.0305, 0, 0.014, 0.004, 0.05, RED, { ao: 1 });
    r.matte.box(0.06, -0.026, 0.0, 0.05, 0.004, 0.036, 0xf4f0e6, { rot: [0, 0, 0.15] }); // loose end
    r.metal.box(0.085, -0.022, 0.0, 0.006, 0.006, 0.036, LIGHT);
    r.ud = { muzzleZ: 0 };
  },
  medkit(r) {
    r.matte.box(0, 0, 0, 0.2, 0.13, 0.08, 0xf4f4f0, { ao: 0.7 });
    r.paint.box(0, 0.0, 0.0, 0.205, 0.03, 0.085, 0xd8d8d2, { ao: 1 }); // lid seam
    for (const sx of [-1, 1]) r.matte.box(sx * 0.1, 0, 0, 0.012, 0.134, 0.084, 0xc9c9c2, { ao: 1 }); // corner guards
    for (const z of [0.0415, -0.0415]) { r.paint.box(0, 0.0, z, 0.08, 0.028, 0.004, RED, { ao: 1 }); r.paint.box(0, 0.0, z, 0.028, 0.08, 0.004, RED, { ao: 1 }); }
    r.metal.box(-0.05, 0.002, 0.043, 0.026, 0.02, 0.006, 0x8a929c); // latches
    r.metal.box(0.05, 0.002, 0.043, 0.026, 0.02, 0.006, 0x8a929c);
    r.matte.box(-0.04, 0.078, 0.0, 0.01, 0.026, 0.01, 0x777777); // handle
    r.matte.box(0.04, 0.078, 0.0, 0.01, 0.026, 0.01, 0x777777);
    r.matte.box(0, 0.094, 0.0, 0.09, 0.012, 0.014, 0x777777);
    r.ud = { muzzleZ: 0 };
  },
  small_shield(r) { potion(r, 0.7, 0x3a8aff); },
  big_shield(r) { potion(r, 1.15, 0x2a6aff); },
  chug_jug(r) {
    r.paint.cyl(0, 0, 0, 0.074, 0.074, 0.15, 0x2f7aff, { sides: 14 });
    r.glow.cyl(0, 0.0, 0, 0.0765, 0.0765, 0.1, 0x74b4ff, { sides: 14, ao: 1, noTop: true, noBottom: true });
    r.paint.cyl(0, 0.098, 0, 0.074, 0.034, 0.048, 0x2f7aff, { sides: 14 }); // shoulder
    r.matte.cyl(0, 0.136, 0, 0.034, 0.034, 0.034, 0xf0e8d8, { sides: 10 }); // neck
    r.matte.cyl(0, 0.158, 0, 0.038, 0.038, 0.014, 0xffd23f, { sides: 10 }); // cap
    for (const y of [-0.06, 0.06]) r.metal.cyl(0, y, 0, 0.078, 0.078, 0.012, 0xffd23f, { sides: 14, ao: 1 }); // gold bands
    r.paint.box(0, 0.0, 0.0745, 0.07, 0.07, 0.004, 0xfff6d0, { ao: 1 }); // label
    r.glow.box(0, 0.0, 0.0765, 0.036, 0.036, 0.003, 0x2f7aff);
    r.metal.box(0.098, 0.1, 0, 0.034, 0.012, 0.012, 0xffd23f, { rot: [0, 0, 0.4] }); // handle
    r.metal.box(0.118, 0.07, 0, 0.012, 0.05, 0.012, 0xffd23f);
    r.metal.box(0.098, 0.04, 0, 0.034, 0.012, 0.012, 0xffd23f, { rot: [0, 0, -0.4] });
    r.ud = { muzzleZ: 0 };
  },
  slurp(r) {
    r.paint.cyl(0, 0, 0, 0.048, 0.044, 0.15, 0xffa42a, { sides: 12 });
    r.glow.cyl(0, 0.01, 0, 0.0495, 0.0455, 0.1, 0xffc060, { sides: 12, ao: 1, noTop: true, noBottom: true });
    r.paint.cyl(0, 0.08, 0, 0.044, 0.034, 0.02, 0xd8d8d8, { sides: 12 }); // lid
    r.paint.box(0, 0.0, 0.0475, 0.05, 0.06, 0.004, 0xffffff, { ao: 1 }); // label
    r.paint.box(0, 0.0, 0.0495, 0.03, 0.03, 0.003, 0xff7a00, { ao: 1 });
    r.matte.box(0.012, 0.13, 0, 0.012, 0.09, 0.012, 0xf5f5f5, { rot: [0, 0, -0.12] }); // straw
    r.matte.box(0.03, 0.18, 0, 0.034, 0.012, 0.012, 0xf5f5f5);
    r.ud = { muzzleZ: 0 };
  },
  floorange(r) {
    r.paint.ball(0, 0, 0, 0.062, 0.058, 0.062, 0xff8a14, { seg: 12, rings: 8 });
    r.matte.ball(0, 0.05, 0, 0.02, 0.008, 0.02, 0x9a4a00, { seg: 8, rings: 3 }); // navel
    r.matte.box(0.022, 0.066, 0, 0.034, 0.005, 0.018, 0x3fa13a, { rot: [0, 0, 0.35] }); // leaf
    r.matte.box(0.012, 0.066, 0.02, 0.026, 0.005, 0.014, 0x2f8a2a, { rot: [0, 0.8, 0.3] });
    r.matte.cyl(0, 0.056, 0, 0.005, 0.006, 0.018, 0x3a6a2a, { sides: 5 });
    // a faint ring of sparkles: it is the fruit that takes you down to earth
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; r.glow.box(Math.cos(a) * 0.072, -0.01, Math.sin(a) * 0.072, 0.012, 0.012, 0.012, i % 2 ? 0xfff2b0 : 0xffffff, { rot: [0.6, a, 0.6], ao: 1 }); }
    r.ud = { muzzleZ: 0 };
  },
};

function fruitApple(r, col, dark, hi, magic) {
  r.paint.ball(0, 0, 0, 0.056, 0.05, 0.056, col, { seg: 12, rings: 8 });
  r.paint.ball(0.016, -0.004, 0.012, 0.04, 0.046, 0.04, col, { seg: 10, rings: 7 });
  r.paint.ball(-0.016, -0.004, -0.012, 0.04, 0.046, 0.04, col, { seg: 10, rings: 7 });
  r.paint.ball(0, 0.04, 0, 0.022, 0.012, 0.022, dark, { seg: 8, rings: 3 }); // dimple
  r.paint.ball(-0.026, 0.016, 0.042, 0.014, 0.02, 0.008, hi, { seg: 6, rings: 4, ao: 1 }); // shine
  r.matte.cyl(0, 0.056, 0, 0.005, 0.007, 0.034, 0x5a3a1a, { sides: 5, rot: [0, 0, 0.15] });
  r.matte.box(0.024, 0.066, 0, 0.04, 0.005, 0.02, 0x3fa13a, { rot: [0, 0, 0.4] }); // leaf
  r.matte.box(0.022, 0.066, 0.004, 0.012, 0.005, 0.016, 0x2c7a2a, { rot: [0, 0.3, 0.4], ao: 1 });
  if (magic) {
    // the Jumpple: glowing seeds orbit it and little chevrons point up
    for (let i = 0; i < 3; i++) r.glow.box(0.062, -0.02 + i * 0.026, 0.0, 0.016, 0.004, 0.012, 0xffffff, { rot: [0, 0, 0.9], ao: 1 });
    for (let i = 0; i < 3; i++) r.glow.box(-0.062, -0.02 + i * 0.026, 0.0, 0.016, 0.004, 0.012, 0xb8ff6a, { rot: [0, 0, -0.9], ao: 1 });
    r.glow.ball(0.0, 0.0, 0.06, 0.007, 0.007, 0.007, 0xffffff, { seg: 5, rings: 3 });
  }
  r.ud = { muzzleZ: 0 };
}

function fruitBanana(r, col, fast) {
  // a curved bunch of square-section segments that taper to a stem and a dark tip
  const N = 7;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1) - 0.5;
    pts.push([t * 0.18, -0.04 * (1 - 4 * t * t) + 0.02, 0.046 - 0.04 * Math.pow(Math.abs(t) * 2, 1.6)]);
  }
  for (let i = 1; i < N; i++) {
    const a = pts[i - 1], b = pts[i];
    r.paint.line([a[0], a[1], 0], [b[0], b[1], 0], (a[2] + b[2]) / 2, i % 2 ? col : 0xffe05a, { ao: 0.88 });
  }
  for (const p of pts.slice(1, -1)) r.paint.ball(p[0], p[1], 0, p[2] * 0.72, p[2] * 0.72, p[2] * 0.72, col, { seg: 6, rings: 4, ao: 0.9 }); // soften the joints
  r.matte.box(-0.1, 0.03, 0, 0.014, 0.03, 0.014, 0x7a6a2a, { rot: [0, 0, 0.5] }); // stem
  r.matte.box(0.098, 0.026, 0, 0.012, 0.014, 0.012, 0x3a2a14, { rot: [0, 0, -0.5] }); // tip
  if (fast) {
    // cyan speed streaks trailing off the tip, and a bolt on each side: this banana is in a hurry
    for (let i = 0; i < 3; i++) r.glow.box(0.12 + i * 0.012, 0.02 - i * 0.016, 0.0, 0.07 - i * 0.015, 0.006, 0.006, CYAN, { ao: 1 });
    for (const z of [0.0235, -0.0235]) {
      r.glow.box(0.0, 0.012, z, 0.022, 0.006, 0.004, CYAN, { rot: [0, 0, 0.9], ao: 1 });
      r.glow.box(0.008, -0.004, z, 0.022, 0.006, 0.004, CYAN, { rot: [0, 0, -0.9], ao: 1 });
      r.glow.box(0.0, -0.02, z, 0.018, 0.006, 0.004, CYAN, { rot: [0, 0, 0.9], ao: 1 });
    }
  }
  r.ud = { muzzleZ: 0 };
}

function potion(r, s, liquid) {
  const k = (v) => v * s;
  r.glow.ball(0, k(-0.02), 0, k(0.052), k(0.054), k(0.052), liquid, { seg: 12, rings: 8, ao: 0.8 });
  r.metal.cyl(0, k(0.054), 0, k(0.02), k(0.016), k(0.05), 0xdde6f0, { sides: 10 }); // neck
  r.metal.cyl(0, k(0.082), 0, k(0.024), k(0.024), k(0.01), 0xb8c4d2, { sides: 10 }); // lip
  r.matte.cyl(0, k(0.094), 0, k(0.016), k(0.02), k(0.022), 0x8a5a2c, { sides: 8 }); // cork
  r.glow.ball(-k(0.026), k(0.0), k(0.044), k(0.011), k(0.02), k(0.006), 0xffffff, { seg: 6, rings: 4, ao: 1 }); // shine
  r.metal.cyl(0, k(-0.07), 0, k(0.02), k(0.03), k(0.008), 0xb8c4d2, { sides: 10 }); // foot
  r.ud = { muzzleZ: 0 };
}

// ---------------------------------------------------------------------------
// templates: built once per item, cloned for every hand / drop / sandbox icon
// ---------------------------------------------------------------------------
const templates = new Map();
const vec = (a) => (a ? new THREE.Vector3(a[0], a[1], a[2]) : null);

function build(id) {
  const def = ITEMS[id];
  const fn = builders[def.model] || builders.pistol;
  const r = new Rig();
  fn(r);
  const g = r.group();
  const ud = r.ud;
  g.userData = { muzzleZ: ud.muzzleZ ?? 0, gripL: vec(ud.gripL), magPos: vec(ud.magPos), stockPos: vec(ud.stockPos), ejectPos: vec(ud.eject) };
  return g;
}

export function itemModel(id) {
  let t = templates.get(id);
  if (!t) { t = build(id); templates.set(id, t); }
  const c = t.clone(); // shares geometry and materials with the template
  const u = t.userData;
  // Object3D.clone copies userData as plain JSON: restore real vectors
  c.userData = { muzzleZ: u.muzzleZ, gripL: u.gripL && u.gripL.clone(), magPos: u.magPos && u.magPos.clone(), stockPos: u.stockPos && u.stockPos.clone(), ejectPos: u.ejectPos && u.ejectPos.clone() };
  return c;
}

// ---------------------------------------------------------------------------
// ammo boxes: one template per ammo type
// ---------------------------------------------------------------------------
const ammoTemplates = new Map();
function buildAmmo(type) {
  const r = new Rig();
  const col = new THREE.Color(AMMO[type].color).getHex();
  if (type === 'rockets') {
    r.matte.box(0, 0, 0, 0.24, 0.1, 0.16, 0x4a5a3a, { ao: 0.8 });
    r.matte.box(0, 0.052, 0, 0.24, 0.012, 0.04, 0x35402a, { ao: 1 });
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 0.072;
      r.matte.cyl(x, 0.07, 0, 0.026, 0.026, 0.07, 0x8a8f96, { sides: 8 });
      r.matte.cyl(x, 0.118, 0, 0.026, 0.0, 0.05, RED, { sides: 8 });
    }
    r.glow.box(0, 0.0, 0.0815, 0.12, 0.03, 0.003, col);
  } else {
    r.matte.box(0, 0, 0, 0.2, 0.1, 0.13, 0x3b4048, { ao: 0.78 });
    r.metal.box(0, 0.056, 0, 0.206, 0.012, 0.136, 0x59616b, { ao: 1 }); // lid
    r.metal.box(0, 0.074, 0, 0.06, 0.02, 0.016, 0x8a929c); // handle
    r.metal.box(-0.026, 0.066, 0, 0.008, 0.014, 0.016, 0x8a929c);
    r.metal.box(0.026, 0.066, 0, 0.008, 0.014, 0.016, 0x8a929c);
    r.glow.box(0, 0.0, 0.0665, 0.14, 0.04, 0.003, col);
    for (const sx of [-1, 1]) r.metal.box(sx * 0.07, 0.03, 0.068, 0.02, 0.014, 0.006, 0x8a929c); // latches
    // the rounds peeking out of the open front tray
    if (type === 'light' || type === 'medium') {
      const n = type === 'light' ? 8 : 5, rad = type === 'light' ? 0.0085 : 0.0125;
      for (let i = 0; i < n; i++) {
        const x = (i - (n - 1) / 2) * (rad * 2.3);
        r.metal.cyl(x, 0.07, -0.02, rad, rad, 0.044, BRASS, { sides: 8 });
        r.metal.cyl(x, 0.098, -0.02, rad, 0.0, 0.016, type === 'light' ? 0xb87333 : 0x7a8f3a, { sides: 8 });
      }
    } else if (type === 'heavy') {
      for (let i = 0; i < 3; i++) {
        const x = (i - 1) * 0.052;
        r.metal.cyl(x, 0.075, -0.015, 0.018, 0.018, 0.06, BRASS, { sides: 8 });
        r.metal.cyl(x, 0.118, -0.015, 0.017, 0.0, 0.03, 0xc44a4a, { sides: 8 });
      }
    } else if (type === 'shells') {
      for (let i = 0; i < 4; i++) {
        const x = (i - 1.5) * 0.045;
        r.paint.cyl(x, 0.074, -0.02, 0.016, 0.016, 0.05, RED, { sides: 8 });
        r.metal.cyl(x, 0.052, -0.02, 0.0175, 0.0175, 0.016, BRASS, { sides: 8 });
        r.matte.cyl(x, 0.1, -0.02, 0.016, 0.014, 0.006, 0x8a2020, { sides: 8 });
      }
    }
  }
  const g = r.group();
  g.userData = { muzzleZ: 0 };
  return g;
}
export function ammoModel(type) {
  let t = ammoTemplates.get(type);
  if (!t) { t = buildAmmo(type); ammoTemplates.set(type, t); }
  return t.clone();
}

// ---------------------------------------------------------------------------
// Chest
// ---------------------------------------------------------------------------
const CHEST_GLOW_GEO = new THREE.CylinderGeometry(0.9, 0.9, 0.02, 20);
export const CHEST_GLOW_MAT = new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
const GOLD = 0xf2b62a, GOLD2 = 0xffe08a;
let chestTemplate = null;

function buildChest() {
  const r = new Rig();
  // body: wooden planks between gold corner posts, with a base band and a top rail
  r.matte.box(0, 0.25, 0, 0.96, 0.5, 0.56, 0x6a4020, { ao: 0.7 });
  for (let i = 0; i < 4; i++) { r.matte.box(0, 0.06 + i * 0.12, 0.2845, 0.9, 0.006, 0.01, 0x4a2c14, { ao: 1 }); r.matte.box(0, 0.06 + i * 0.12, -0.2845, 0.9, 0.006, 0.01, 0x4a2c14, { ao: 1 }); } // plank seams
  r.metal.box(0, 0.04, 0, 1.04, 0.08, 0.64, GOLD, { ao: 0.9 });
  r.metal.box(0, 0.47, 0, 1.04, 0.06, 0.64, GOLD, { ao: 0.9 });
  for (const sx of [-1, 1]) {
    r.metal.box(sx * 0.4, 0.25, 0, 0.08, 0.5, 0.64, GOLD, { ao: 0.9 });
    for (const sz of [-1, 1]) for (const y of [0.1, 0.4]) r.metal.box(sx * 0.4, y, sz * 0.325, 0.03, 0.03, 0.012, GOLD2, { ao: 1 }); // rivets
  }
  r.metal.box(0, 0.25, 0.322, 0.5, 0.05, 0.012, GOLD, { ao: 1 }); // strap
  // lid: a part that rotates about the hinge at the back
  r.part('lid', 0, 0.5, -0.3, (l) => {
    l.matte.box(0, 0.09, 0.3, 0.96, 0.18, 0.56, 0x7a4a26, { ao: 0.75 });
    l.matte.box(0, 0.21, 0.3, 0.96, 0.08, 0.46, 0x7a4a26, { ao: 0.9, taper: [1, 0.9] });
    l.metal.box(0, 0.02, 0.3, 1.04, 0.05, 0.64, GOLD, { ao: 0.9 });
    for (const sx of [-1, 1]) { l.metal.box(sx * 0.4, 0.15, 0.3, 0.08, 0.3, 0.62, GOLD, { ao: 0.9 }); l.metal.box(sx * 0.4, 0.27, 0.3, 0.08, 0.04, 0.52, GOLD, { ao: 0.9 }); }
    l.metal.box(0, 0.255, 0.3, 0.9, 0.03, 0.06, GOLD, { ao: 1 }); // lid ridge band
    l.metal.box(0, 0.06, 0.612, 0.16, 0.18, 0.05, GOLD2, { ao: 0.9 }); // lock plate
    l.glow.box(0, 0.07, 0.64, 0.05, 0.07, 0.01, 0x3a2a10, { ao: 1 }); // keyhole
    l.glow.cyl(0, 0.1, 0.64, 0.02, 0.02, 0.01, 0x3a2a10, { rot: [HP, 0, 0], sides: 8 });
    for (const sx of [-0.24, 0.24]) l.metal.box(sx, 0.02, -0.01, 0.1, 0.06, 0.04, 0x8a6a20); // hinges
  });
  const g = r.group();
  const glow = new THREE.Mesh(CHEST_GLOW_GEO, CHEST_GLOW_MAT);
  glow.name = 'glow';
  glow.position.y = 0.02;
  g.add(glow);
  return g;
}

export function chestModel() {
  if (!chestTemplate) chestTemplate = buildChest();
  const g = chestTemplate.clone();
  g.userData = { lid: g.getObjectByName('lid'), glow: g.getObjectByName('glow') };
  return g;
}
