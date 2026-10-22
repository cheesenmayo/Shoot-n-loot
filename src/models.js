import * as THREE from 'three';
import { ITEMS, AMMO } from './items.js';
import { mulberry32 } from './util.js';

// ---------------------------------------------------------------------------
// tiny helpers
// ---------------------------------------------------------------------------
const matCache = new Map();
export function mat(color, { metal = 0.25, rough = 0.6, emissive = 0, emissiveIntensity = 1 } = {}) {
  const key = `${color}|${metal}|${rough}|${emissive}|${emissiveIntensity}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });
    if (emissive) { m.emissive = new THREE.Color(emissive); m.emissiveIntensity = emissiveIntensity; }
    matCache.set(key, m);
  }
  return m;
}
const boxGeos = new Map();
function boxGeo(w, h, d) {
  const k = `${w},${h},${d}`;
  let g = boxGeos.get(k);
  if (!g) { g = new THREE.BoxGeometry(w, h, d); boxGeos.set(k, g); }
  return g;
}
function B(parent, w, h, d, color, x = 0, y = 0, z = 0, o = {}) {
  const m = new THREE.Mesh(boxGeo(w, h, d), mat(color, o));
  m.position.set(x, y, z);
  if (o.rx) m.rotation.x = o.rx;
  if (o.ry) m.rotation.y = o.ry;
  if (o.rz) m.rotation.z = o.rz;
  m.castShadow = true;
  parent.add(m);
  return m;
}
const cylGeos = new Map();
// cylinder along Z (axis='z'), Y or X
function C(parent, r, len, color, x = 0, y = 0, z = 0, axis = 'z', o = {}) {
  const k = `${r},${len},${axis},${o.rTop ?? r},${o.seg ?? 10}`;
  let g = cylGeos.get(k);
  if (!g) {
    g = new THREE.CylinderGeometry(o.rTop ?? r, r, len, o.seg ?? 10);
    if (axis === 'z') g.rotateX(Math.PI / 2);
    else if (axis === 'x') g.rotateZ(Math.PI / 2);
    cylGeos.set(k, g);
  }
  const m = new THREE.Mesh(g, mat(color, o));
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}
const sphGeos = new Map();
function S(parent, r, color, x = 0, y = 0, z = 0, o = {}) {
  const k = `${r},${o.sy ?? 1}`;
  let g = sphGeos.get(k);
  if (!g) { g = new THREE.SphereGeometry(r, 12, 9); if (o.sy) g.scale(1, o.sy, 1); sphGeos.set(k, g); }
  const m = new THREE.Mesh(g, mat(color, o));
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}

const STEEL = 0x3a3f46, DARK = 0x22252a, LIGHT = 0x8b929b, WOOD = 0x7a4f2a, WOOD2 = 0x5a381c, BRASS = 0xc8a24a;

// ---------------------------------------------------------------------------
// weapon / item models. Origin = grip, muzzle toward -Z.
// ---------------------------------------------------------------------------
const builders = {
  pistol(g) {
    B(g, 0.045, 0.05, 0.2, STEEL, 0, 0.045, -0.07);
    B(g, 0.04, 0.035, 0.17, DARK, 0, 0.0, -0.06);
    B(g, 0.038, 0.11, 0.055, DARK, 0, -0.06, 0.02, { rx: 0.18 });
    return -0.18;
  },
  revolver(g) {
    C(g, 0.012, 0.2, STEEL, 0, 0.05, -0.15, 'z');
    C(g, 0.036, 0.06, 0x9aa2ab, 0, 0.04, -0.04, 'z');
    B(g, 0.04, 0.05, 0.12, STEEL, 0, 0.03, -0.02);
    B(g, 0.04, 0.12, 0.055, WOOD, 0, -0.06, 0.04, { rx: 0.35 });
    return -0.25;
  },
  hand_cannon(g) {
    B(g, 0.06, 0.07, 0.3, BRASS, 0, 0.05, -0.12, { metal: 0.7, rough: 0.3 });
    B(g, 0.055, 0.04, 0.22, 0x1c1c1c, 0, 0.0, -0.1);
    B(g, 0.05, 0.13, 0.06, 0x2a1d12, 0, -0.07, 0.04, { rx: 0.2 });
    return -0.28;
  },
  smg(g) {
    B(g, 0.05, 0.08, 0.28, STEEL, 0, 0.03, -0.1);
    C(g, 0.014, 0.12, DARK, 0, 0.04, -0.3);
    B(g, 0.03, 0.15, 0.045, DARK, 0, -0.09, -0.06);
    B(g, 0.04, 0.1, 0.05, DARK, 0, -0.05, 0.04, { rx: 0.2 });
    B(g, 0.03, 0.03, 0.14, DARK, 0, 0.0, 0.14);
    return -0.36;
  },
  silenced_smg(g) {
    B(g, 0.05, 0.08, 0.26, 0x2b3036, 0, 0.03, -0.08);
    C(g, 0.028, 0.26, 0x1c1f23, 0, 0.04, -0.34);
    B(g, 0.03, 0.15, 0.045, DARK, 0, -0.09, -0.05);
    B(g, 0.04, 0.1, 0.05, DARK, 0, -0.05, 0.04, { rx: 0.2 });
    B(g, 0.03, 0.04, 0.14, DARK, 0, 0.02, 0.14);
    return -0.5;
  },
  ar(g) {
    B(g, 0.055, 0.085, 0.4, 0x30353b, 0, 0.03, -0.1);
    C(g, 0.014, 0.28, DARK, 0, 0.045, -0.42);
    B(g, 0.045, 0.06, 0.2, 0x252a30, 0, 0.03, -0.35);
    B(g, 0.04, 0.1, 0.2, 0x3b4048, 0, 0.0, 0.22);
    B(g, 0.03, 0.15, 0.06, DARK, 0.0, -0.1, -0.08, { rx: -0.2 });
    B(g, 0.03, 0.04, 0.08, DARK, 0, 0.09, -0.12);
    B(g, 0.04, 0.1, 0.05, DARK, 0, -0.06, 0.06, { rx: 0.2 });
    return -0.56;
  },
  burst_ar(g) {
    B(g, 0.055, 0.085, 0.38, 0x2b3a2b, 0, 0.03, -0.1);
    C(g, 0.016, 0.26, DARK, 0, 0.045, -0.4);
    B(g, 0.045, 0.06, 0.18, 0x233023, 0, 0.03, -0.33);
    B(g, 0.04, 0.11, 0.18, 0x2b3a2b, 0, 0.0, 0.2);
    B(g, 0.03, 0.14, 0.05, DARK, 0, -0.1, -0.05);
    B(g, 0.025, 0.06, 0.2, DARK, 0, 0.1, -0.08);
    return -0.53;
  },
  heavy_ar(g) {
    B(g, 0.065, 0.1, 0.44, 0x4a4036, 0, 0.03, -0.1);
    C(g, 0.02, 0.28, DARK, 0, 0.045, -0.44);
    B(g, 0.05, 0.07, 0.22, 0x3a3228, 0, 0.03, -0.37);
    B(g, 0.05, 0.12, 0.22, 0x4a4036, 0, 0.0, 0.24);
    B(g, 0.035, 0.16, 0.07, DARK, 0, -0.11, -0.06);
    C(g, 0.026, 0.14, 0x15181b, 0, 0.1, -0.1);
    return -0.58;
  },
  lever(g) {
    C(g, 0.014, 0.5, STEEL, 0, 0.04, -0.4);
    B(g, 0.04, 0.07, 0.3, 0x4a4a4a, 0, 0.03, -0.05);
    B(g, 0.045, 0.1, 0.3, WOOD, 0, 0.0, 0.2, { rx: 0.05 });
    B(g, 0.03, 0.05, 0.25, WOOD2, 0, -0.01, -0.32);
    C(g, 0.03, 0.01, BRASS, 0, -0.07, -0.02, 'x');
    return -0.65;
  },
  pump(g) {
    C(g, 0.02, 0.6, STEEL, 0, 0.04, -0.4);
    C(g, 0.017, 0.5, 0x2a2e33, 0, 0.0, -0.36);
    B(g, 0.05, 0.05, 0.14, WOOD, 0, -0.0, -0.32);
    B(g, 0.05, 0.08, 0.2, 0x2f3338, 0, 0.03, -0.0);
    B(g, 0.045, 0.1, 0.26, WOOD, 0, -0.01, 0.24, { rx: 0.1 });
    return -0.72;
  },
  tac_shotgun(g) {
    C(g, 0.02, 0.5, 0x25292d, 0, 0.04, -0.36);
    B(g, 0.055, 0.09, 0.3, 0x30353b, 0, 0.03, -0.05);
    B(g, 0.045, 0.06, 0.16, 0x1a1c1f, 0, 0.0, -0.3);
    B(g, 0.045, 0.09, 0.22, 0x30353b, 0, 0.0, 0.2);
    B(g, 0.035, 0.1, 0.05, DARK, 0, -0.09, 0.0);
    return -0.62;
  },
  double_barrel(g) {
    C(g, 0.017, 0.55, STEEL, -0.017, 0.04, -0.35);
    C(g, 0.017, 0.55, STEEL, 0.017, 0.04, -0.35);
    B(g, 0.06, 0.07, 0.2, 0x555555, 0, 0.02, 0.0);
    B(g, 0.045, 0.1, 0.28, WOOD, 0, -0.01, 0.24, { rx: 0.1 });
    B(g, 0.05, 0.045, 0.12, WOOD2, 0, -0.01, -0.28);
    return -0.63;
  },
  auto_shotgun(g) {
    C(g, 0.022, 0.46, 0x2a2e33, 0, 0.04, -0.34);
    B(g, 0.06, 0.09, 0.32, 0x4a2e2e, 0, 0.03, -0.04);
    C(g, 0.055, 0.07, 0x1a1c1f, 0, -0.09, -0.08, 'x');
    B(g, 0.045, 0.09, 0.2, 0x4a2e2e, 0, 0.0, 0.2);
    return -0.58;
  },
  bolt_sniper(g) {
    C(g, 0.016, 0.8, STEEL, 0, 0.04, -0.55);
    B(g, 0.05, 0.08, 0.34, 0x2e3a2e, 0, 0.03, -0.05);
    B(g, 0.05, 0.11, 0.3, 0x2e3a2e, 0, -0.01, 0.26, { rx: 0.08 });
    C(g, 0.03, 0.26, 0x15181b, 0, 0.11, -0.08);
    C(g, 0.038, 0.04, 0x15181b, 0, 0.11, -0.2);
    C(g, 0.045, 0.01, 0x7ab8ff, 0, 0.11, -0.215, 'z', { metal: 0.9, rough: 0.1 });
    B(g, 0.02, 0.05, 0.02, STEEL, 0.05, 0.03, 0.0);
    return -0.95;
  },
  semi_sniper(g) {
    C(g, 0.017, 0.65, STEEL, 0, 0.04, -0.5);
    B(g, 0.055, 0.09, 0.4, 0x3a3a3a, 0, 0.03, -0.05);
    B(g, 0.05, 0.11, 0.26, 0x3a3a3a, 0, -0.01, 0.26);
    B(g, 0.03, 0.12, 0.05, DARK, 0, -0.1, -0.05);
    C(g, 0.03, 0.22, 0x15181b, 0, 0.11, -0.08);
    return -0.85;
  },
  lmg(g) {
    C(g, 0.022, 0.5, STEEL, 0, 0.04, -0.46);
    B(g, 0.07, 0.1, 0.46, 0x3b4a2e, 0, 0.03, -0.08);
    B(g, 0.1, 0.11, 0.12, 0x252a22, 0, -0.1, -0.05);
    B(g, 0.05, 0.11, 0.2, 0x3b4a2e, 0, 0.0, 0.24);
    B(g, 0.015, 0.13, 0.015, DARK, -0.03, -0.05, -0.55, { rx: 0.3 });
    B(g, 0.015, 0.13, 0.015, DARK, 0.03, -0.05, -0.55, { rx: 0.3 });
    return -0.72;
  },
  minigun(g) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      C(g, 0.012, 0.55, STEEL, Math.cos(a) * 0.035, 0.03 + Math.sin(a) * 0.035, -0.4);
    }
    C(g, 0.055, 0.08, DARK, 0, 0.03, -0.15);
    B(g, 0.12, 0.14, 0.3, 0x5a5f66, 0, 0.02, -0.02);
    B(g, 0.04, 0.12, 0.05, DARK, 0, -0.1, 0.02);
    return -0.72;
  },
  launcher(g) {
    C(g, 0.075, 0.9, 0x4a5a3a, 0, 0.06, -0.25);
    C(g, 0.095, 0.1, 0x2b3322, 0, 0.06, -0.72);
    C(g, 0.1, 0.1, 0x2b3322, 0, 0.06, 0.22);
    B(g, 0.04, 0.1, 0.05, DARK, 0, -0.06, -0.08);
    B(g, 0.03, 0.06, 0.1, DARK, 0, 0.14, -0.2);
    return -0.8;
  },
  grenade_launcher(g) {
    C(g, 0.03, 0.4, STEEL, 0, 0.05, -0.32);
    C(g, 0.06, 0.12, 0x6a6f35, 0, 0.03, -0.06);
    B(g, 0.05, 0.08, 0.3, 0x3a3f46, 0, 0.03, 0.02);
    B(g, 0.045, 0.1, 0.2, 0x3a3f46, 0, 0.0, 0.22);
    B(g, 0.035, 0.1, 0.05, DARK, 0, -0.08, -0.12);
    return -0.55;
  },
  crossbow(g) {
    B(g, 0.05, 0.07, 0.5, WOOD2, 0, 0.02, -0.1);
    B(g, 0.5, 0.025, 0.04, 0x2a2a2a, 0, 0.04, -0.34);
    B(g, 0.015, 0.015, 0.34, 0xdddddd, 0, 0.065, -0.2);
    B(g, 0.04, 0.1, 0.18, WOOD2, 0, -0.01, 0.2);
    for (const s of [-1, 1]) B(g, 0.015, 0.015, 0.3, 0xcccccc, s * 0.12, 0.04, -0.2, { ry: s * 0.45 });
    return -0.36;
  },
  // ---- melee: handle at the grip, blade toward -Z
  pickaxe(g) {
    C(g, 0.017, 0.8, WOOD, 0, 0, -0.2);
    B(g, 0.03, 0.03, 0.32, 0x7d848c, 0, 0, -0.62, { metal: 0.8 });
    B(g, 0.03, 0.03, 0.04, 0x7d848c, 0, 0, -0.62);
    // T head: vertical bar
    B(g, 0.03, 0.34, 0.035, 0x7d848c, 0, 0, -0.6, { metal: 0.8 });
    B(g, 0.02, 0.1, 0.06, 0x9aa2ab, 0, 0.17, -0.6);
    B(g, 0.02, 0.1, 0.06, 0x9aa2ab, 0, -0.17, -0.6);
    return -0.62;
  },
  machete(g) {
    B(g, 0.03, 0.04, 0.13, 0x2a2a2a, 0, 0, 0);
    B(g, 0.012, 0.075, 0.5, 0xc8ced4, 0, 0.01, -0.33, { metal: 0.9, rough: 0.25 });
    B(g, 0.05, 0.02, 0.02, BRASS, 0, 0, -0.07);
    return -0.58;
  },
  bat(g) {
    C(g, 0.016, 0.28, 0x4a3a2a, 0, 0, -0.05);
    C(g, 0.04, 0.55, 0xb88a52, 0, 0, -0.5, 'z', { rTop: 0.04 });
    C(g, 0.022, 0.3, 0xb88a52, 0, 0, -0.2, 'z', { rTop: 0.016 });
    return -0.78;
  },
  katana(g) {
    B(g, 0.03, 0.035, 0.2, 0x1c1c26, 0, 0, 0.02);
    B(g, 0.07, 0.07, 0.015, BRASS, 0, 0, -0.08, { metal: 0.7 });
    B(g, 0.01, 0.045, 0.75, 0xe3e8ee, 0, 0.01, -0.46, { metal: 0.95, rough: 0.15 });
    return -0.83;
  },
  sledge(g) {
    C(g, 0.02, 0.95, WOOD, 0, 0, -0.35);
    B(g, 0.13, 0.13, 0.3, 0x55595f, 0, 0, -0.85, { metal: 0.6 });
    B(g, 0.14, 0.14, 0.04, 0x2a2d31, 0, 0, -0.72);
    B(g, 0.14, 0.14, 0.04, 0x2a2d31, 0, 0, -0.98);
    return -1.0;
  },
  // ---- throwables
  frag(g) {
    S(g, 0.055, 0x3d5a2a, 0, 0, 0, { sy: 1.15 });
    C(g, 0.02, 0.03, 0x888888, 0, 0.07, 0, 'y');
    B(g, 0.01, 0.03, 0.06, 0xbbbbbb, 0.0, 0.085, 0.03);
    return 0;
  },
  impulse(g) {
    S(g, 0.06, 0x2a6aaa, 0, 0, 0, { metal: 0.5 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 14), mat(0x5fe8ff, { emissive: 0x5fe8ff, emissiveIntensity: 1.4 }));
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
    return 0;
  },
  dynamite(g) {
    for (const x of [-0.03, 0, 0.03]) C(g, 0.022, 0.2, 0xc02a22, x, 0, 0, 'y');
    C(g, 0.034, 0.02, 0x222222, 0, 0.04, 0, 'y');
    B(g, 0.006, 0.07, 0.006, 0xe8d8a0, 0, 0.14, 0);
    S(g, 0.012, 0xffb02a, 0, 0.18, 0, { emissive: 0xff8a1a });
    return 0;
  },
  boogie(g) {
    S(g, 0.065, 0xc9a0ff, 0, 0, 0, { metal: 0.9, rough: 0.15, emissive: 0x7a3fff, emissiveIntensity: 0.5 });
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * 6.283;
      B(g, 0.03, 0.03, 0.01, 0xffffff, Math.cos(a) * 0.06, Math.sin(a * 2) * 0.03, Math.sin(a) * 0.06, { metal: 1, rough: 0.1 });
    }
    return 0;
  },
  // ---- gadgets
  grappler(g) {
    B(g, 0.07, 0.1, 0.18, 0x2a2e36, 0, 0, -0.04);
    C(g, 0.025, 0.14, 0x9aa2ab, 0, 0.02, -0.18);
    B(g, 0.05, 0.04, 0.03, 0xff8a2a, 0, 0.0, -0.1, { emissive: 0xff6a00, emissiveIntensity: 0.6 });
    B(g, 0.04, 0.09, 0.05, DARK, 0, -0.08, 0.02);
    return -0.26;
  },
  launchpad(g) {
    C(g, 0.16, 0.04, 0x22262e, 0, 0, 0, 'y');
    C(g, 0.12, 0.02, 0x5fe8ff, 0, 0.025, 0, 'y', { emissive: 0x5fe8ff, emissiveIntensity: 1.2 });
    return 0;
  },
  // ---- consumables
  apple(g) {
    S(g, 0.055, 0xd8322a, 0, 0, 0, { rough: 0.35 });
    C(g, 0.006, 0.04, 0x5a3a1a, 0, 0.06, 0, 'y');
    B(g, 0.03, 0.005, 0.015, 0x3fa13a, 0.02, 0.07, 0);
    return 0;
  },
  banana(g) {
    for (let i = 0; i < 5; i++) {
      const t = i / 4 - 0.5;
      S(g, 0.028, 0xf6d23a, t * 0.1, -Math.abs(t) * 0.04 + 0.02, 0, { sy: 1.0, rough: 0.5 });
    }
    return 0;
  },
  mushroom(g) {
    C(g, 0.025, 0.07, 0xf0e8d8, 0, -0.03, 0, 'y');
    S(g, 0.065, 0x3a8aff, 0, 0.03, 0, { sy: 0.6, emissive: 0x2a6aff, emissiveIntensity: 0.4 });
    for (const [x, z] of [[0.03, 0.02], [-0.03, 0.03], [0, -0.04]]) S(g, 0.012, 0xffffff, x, 0.06, z);
    return 0;
  },
  bandage(g) {
    C(g, 0.045, 0.06, 0xf4f0e6, 0, 0, 0, 'y');
    B(g, 0.095, 0.02, 0.02, 0xd8322a, 0, 0.032, 0);
    B(g, 0.02, 0.02, 0.095, 0xd8322a, 0, 0.032, 0);
    return 0;
  },
  medkit(g) {
    B(g, 0.2, 0.13, 0.1, 0xf4f4f0, 0, 0, 0);
    B(g, 0.1, 0.03, 0.105, 0xd8322a, 0, 0, 0);
    B(g, 0.03, 0.1, 0.105, 0xd8322a, 0, 0, 0);
    B(g, 0.1, 0.03, 0.02, 0x777777, 0, 0.08, 0);
    return 0;
  },
  small_shield(g) {
    S(g, 0.055, 0x3a8aff, 0, -0.02, 0, { emissive: 0x2a6aff, emissiveIntensity: 0.6, rough: 0.2 });
    C(g, 0.02, 0.06, 0xdddddd, 0, 0.06, 0, 'y');
    return 0;
  },
  big_shield(g) {
    S(g, 0.085, 0x2a6aff, 0, -0.02, 0, { emissive: 0x2a6aff, emissiveIntensity: 0.8, rough: 0.2 });
    C(g, 0.03, 0.09, 0xdddddd, 0, 0.1, 0, 'y');
    return 0;
  },
  chug_jug(g) {
    C(g, 0.075, 0.2, 0x3a8aff, 0, 0, 0, 'y', { emissive: 0x1a5aff, emissiveIntensity: 0.5, rough: 0.2 });
    C(g, 0.035, 0.06, 0xf0e8d8, 0, 0.13, 0, 'y');
    C(g, 0.035, 0.012, 0xffd23f, 0.1, 0.05, 0, 'x');
    return 0;
  },
  slurp(g) {
    C(g, 0.05, 0.16, 0xffa42a, 0, 0, 0, 'y', { emissive: 0xff7a00, emissiveIntensity: 0.6, rough: 0.2 });
    C(g, 0.012, 0.12, 0xf0f0f0, 0.02, 0.14, 0, 'y');
    return 0;
  },
  jumpple(g) {
    S(g, 0.058, 0x6dff3a, 0, 0, 0, { emissive: 0x3aff1a, emissiveIntensity: 0.8, rough: 0.3 });
    C(g, 0.006, 0.04, 0x5a3a1a, 0, 0.06, 0, 'y');
    B(g, 0.03, 0.005, 0.015, 0xffffff, 0.02, 0.07, 0, { emissive: 0xffffff });
    return 0;
  },
  floorange(g) {
    S(g, 0.06, 0xff8a14, 0, 0, 0, { rough: 0.55, emissive: 0xff6a00, emissiveIntensity: 0.3 });
    B(g, 0.035, 0.005, 0.02, 0x3fa13a, 0.02, 0.06, 0);
    C(g, 0.006, 0.02, 0x3a6a2a, 0, 0.06, 0, 'y');
    return 0;
  },
};

const templates = new Map();
export function itemModel(id) {
  let t = templates.get(id);
  if (!t) {
    const def = ITEMS[id];
    const g = new THREE.Group();
    const fn = builders[def.model] || builders.pistol;
    const muzzleZ = fn(g);
    g.userData.muzzleZ = muzzleZ;
    t = g;
    templates.set(id, t);
  }
  const c = t.clone();
  c.userData.muzzleZ = t.userData.muzzleZ;
  return c;
}

export function ammoModel(type) {
  const g = new THREE.Group();
  const col = new THREE.Color(AMMO[type].color).getHex();
  B(g, 0.2, 0.12, 0.13, 0x3b4048, 0, 0, 0);
  B(g, 0.205, 0.035, 0.135, col, 0, 0.03, 0, { emissive: col, emissiveIntensity: 0.4 });
  B(g, 0.06, 0.02, 0.02, 0xdddddd, 0, 0.0, 0.07);
  return g;
}

// ---------------------------------------------------------------------------
// Chest
// ---------------------------------------------------------------------------
const CHEST_GLOW_GEO = new THREE.CylinderGeometry(0.9, 0.9, 0.02, 20);
const CHEST_GLOW_MAT = new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });

export function chestModel() {
  const g = new THREE.Group();
  const base = new THREE.Group();
  const lid = new THREE.Group();
  B(base, 1.0, 0.5, 0.6, 0x6a4020, 0, 0.25, 0);
  B(base, 1.04, 0.1, 0.64, 0xf2b62a, 0, 0.05, 0, { metal: 0.8, rough: 0.3 });
  B(base, 1.04, 0.06, 0.64, 0xf2b62a, 0, 0.47, 0, { metal: 0.8, rough: 0.3 });
  B(base, 0.08, 0.5, 0.64, 0xf2b62a, -0.4, 0.25, 0, { metal: 0.8, rough: 0.3 });
  B(base, 0.08, 0.5, 0.64, 0xf2b62a, 0.4, 0.25, 0, { metal: 0.8, rough: 0.3 });
  lid.position.set(0, 0.5, -0.3);
  // curved-ish lid
  B(lid, 1.0, 0.18, 0.6, 0x7a4a26, 0, 0.09, 0.3);
  B(lid, 1.0, 0.1, 0.5, 0x7a4a26, 0, 0.21, 0.3);
  B(lid, 1.04, 0.05, 0.64, 0xf2b62a, 0, 0.02, 0.3, { metal: 0.8, rough: 0.3 });
  B(lid, 0.08, 0.3, 0.64, 0xf2b62a, -0.4, 0.15, 0.3, { metal: 0.8, rough: 0.3 });
  B(lid, 0.08, 0.3, 0.64, 0xf2b62a, 0.4, 0.15, 0.3, { metal: 0.8, rough: 0.3 });
  B(lid, 0.14, 0.14, 0.05, 0xffe08a, 0, 0.05, 0.62, { metal: 0.9, rough: 0.2, emissive: 0xffc02a, emissiveIntensity: 0.5 });
  g.add(base, lid);
  const glow = new THREE.Mesh(CHEST_GLOW_GEO, CHEST_GLOW_MAT);
  glow.position.y = 0.02;
  g.add(glow);
  g.userData = { lid, glow };
  return g;
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------
const SKINS = [0xf1c8a0, 0xe0ac7c, 0xc68a5c, 0x9a6540, 0x6e4529, 0xf7d9bd];
const SHIRTS = [0xd8412f, 0x2f7bd8, 0x35b56a, 0xf1b92a, 0x8a4fd8, 0x1d1f26, 0xf2f2f2, 0xff7a2f, 0x22b8b0, 0xd83fa0, 0x6a7a4a, 0x4a5568];
const PANTS = [0x2a3040, 0x3b2f27, 0x1c1c1c, 0x4a5a3a, 0x2c4a6e, 0x6e5a3a, 0x33333a];
const HAIRS = [0x1c1410, 0x4a2e1a, 0xc9a04a, 0x8a2f1a, 0x2a2a2a, 0xe8e0d0, 0x3a6a9a];
const HATS = [null, null, 0xd8412f, 0x1d1f26, 0x2f7bd8, 0x8a6a3a, 0xf1b92a];

export function characterModel(seed = 1, opts = {}) {
  const rng = mulberry32(seed * 977 + 13);
  const pick = (a) => a[Math.floor(rng() * a.length)];
  const skin = opts.skin ?? pick(SKINS), shirt = opts.shirt ?? pick(SHIRTS), pants = opts.pants ?? pick(PANTS);
  const hair = opts.hair ?? pick(HAIRS), hat = opts.hat !== undefined ? opts.hat : pick(HATS);
  const root = new THREE.Group();
  const body = new THREE.Group(); // everything that leans / bobs
  root.add(body);

  const torso = new THREE.Group();
  torso.position.set(0, 0.88, 0);
  body.add(torso);
  B(torso, 0.5, 0.3, 0.27, shirt, 0, 0.15, 0, { rough: 0.8, metal: 0 });
  B(torso, 0.5, 0.32, 0.27, shirt, 0, 0.45, 0, { rough: 0.8, metal: 0 });
  B(torso, 0.52, 0.07, 0.29, 0x2a2118, 0, 0.0, 0, { rough: 0.7, metal: 0.1 }); // belt
  B(torso, 0.34, 0.42, 0.14, opts.pack ?? 0x44503a, 0, 0.32, 0.2, { rough: 0.9, metal: 0 }); // backpack
  B(torso, 0.1, 0.08, 0.02, 0xffffff, 0.1, 0.5, -0.14, { rough: 0.8, metal: 0, emissive: 0xffffff, emissiveIntensity: 0.15 }); // chest logo

  const head = new THREE.Group();
  head.position.set(0, 0.66, 0);
  torso.add(head);
  B(head, 0.27, 0.28, 0.27, skin, 0, 0.12, 0, { rough: 0.7, metal: 0 });
  B(head, 0.29, 0.1, 0.29, hair, 0, 0.27, 0.01, { rough: 0.9, metal: 0 });
  B(head, 0.29, 0.18, 0.08, hair, 0, 0.18, 0.12, { rough: 0.9, metal: 0 });
  B(head, 0.05, 0.05, 0.02, 0x15110d, -0.065, 0.14, -0.136, { rough: 0.5, metal: 0 });
  B(head, 0.05, 0.05, 0.02, 0x15110d, 0.065, 0.14, -0.136, { rough: 0.5, metal: 0 });
  if (hat) {
    B(head, 0.31, 0.11, 0.31, hat, 0, 0.3, 0, { rough: 0.8, metal: 0 });
    B(head, 0.33, 0.03, 0.4, hat, 0, 0.25, -0.05, { rough: 0.8, metal: 0 });
  }

  const mkArm = (side) => {
    const a = new THREE.Group();
    a.position.set(side * 0.3, 0.55, 0);
    B(a, 0.14, 0.3, 0.14, shirt, 0, -0.15, 0, { rough: 0.8, metal: 0 });
    const fore = new THREE.Group();
    fore.position.set(0, -0.3, 0);
    B(fore, 0.12, 0.26, 0.12, skin, 0, -0.13, 0, { rough: 0.7, metal: 0 });
    a.add(fore);
    const hand = new THREE.Group();
    hand.position.set(0, -0.28, 0);
    fore.add(hand);
    torso.add(a);
    return { a, fore, hand };
  };
  const armR = mkArm(1), armL = mkArm(-1);

  const mkLeg = (side) => {
    const l = new THREE.Group();
    l.position.set(side * 0.13, 0.88, 0);
    B(l, 0.17, 0.44, 0.19, pants, 0, -0.22, 0, { rough: 0.8, metal: 0 });
    const shin = new THREE.Group();
    shin.position.set(0, -0.44, 0);
    B(shin, 0.16, 0.34, 0.18, pants, 0, -0.17, 0, { rough: 0.8, metal: 0 });
    B(shin, 0.18, 0.1, 0.27, 0x201a16, 0, -0.38, -0.04, { rough: 0.7, metal: 0 });
    l.add(shin);
    body.add(l);
    return { l, shin };
  };
  const legR = mkLeg(1), legL = mkLeg(-1);

  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  return { root, body, torso, head, armR, armL, legR, legL, colors: { shirt, skin } };
}

export function gliderModel(color = 0xff5a2f, accent = 0xffffff) {
  const g = new THREE.Group();
  const sail = new THREE.Mesh(new THREE.SphereGeometry(1.9, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2.6), new THREE.MeshStandardMaterial({ color, roughness: 0.7, side: THREE.DoubleSide }));
  sail.position.y = 2.7;
  sail.scale.set(1.35, 0.55, 1.05);
  sail.castShadow = true;
  g.add(sail);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.03, 3.4), new THREE.MeshStandardMaterial({ color: accent, roughness: 0.7 }));
  stripe.position.set(0, 3.63, 0);
  g.add(stripe);
  const lineMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const hands = new THREE.Vector3(0, 1.3, 0);
  const up = new THREE.Vector3(0, 1, 0);
  for (const [x, z] of [[-1.2, -0.7], [1.2, -0.7], [-1.2, 0.7], [1.2, 0.7]]) {
    const top = new THREE.Vector3(x, 2.85, z);
    const dir = top.clone().sub(hands);
    const len = dir.length();
    const line = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 3), lineMat);
    line.position.copy(hands).addScaledVector(dir, 0.5);
    line.quaternion.setFromUnitVectors(up, dir.normalize());
    g.add(line);
  }
  return g;
}
