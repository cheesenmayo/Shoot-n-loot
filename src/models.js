import * as THREE from 'three';
import { ITEMS, AMMO } from './items.js';
import { mat, B, C, S } from './modelkit.js';

export { characterModel, gliderModel } from './charmodel.js';
export { mat };


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
  runana(g) {
    // a banana that has clearly been working out: curved yellow body, cyan speed stripes and a glowing stem
    for (let i = 0; i < 7; i++) {
      const t = i / 6 - 0.5;
      S(g, 0.03 - Math.abs(t) * 0.012, 0xf6d23a, t * 0.15, -t * t * 0.1 + 0.02, 0, { sy: 1.0, rough: 0.45, emissive: 0xffe23a, emissiveIntensity: 0.18 });
    }
    S(g, 0.014, 0x3a2a14, -0.085, 0.03, 0);
    for (let i = 0; i < 3; i++) B(g, 0.08 - i * 0.02, 0.008, 0.008, 0x5fe8ff, 0.1 + i * 0.012, -0.012 + i * 0.026 - 0.02, 0.04, { emissive: 0x5fe8ff, emissiveIntensity: 1.3, metal: 0, rough: 0.4 });
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
