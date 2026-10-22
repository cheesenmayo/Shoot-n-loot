import * as THREE from 'three';
import { sampleKeys } from './keys.js';
import { ease, ramp } from './ik.js';
import { clamp, lerp } from '../../util.js';
import { S_SPEED } from './slots.js';

// ---------------------------------------------------------------------------
// What the arms are asked to do: a weapon/item pose in torso space for the right hand (the grip) and a
// target for the left hand, built per item category from small data tables. Everything is computed in
// torso space (x right, y up, -z forward, origin at the base of the spine) so the pose follows the spine.
// ---------------------------------------------------------------------------

/** Grip anchor inside the hand frame (where the item origin sits in the fist). */
export const PALM = new THREE.Vector3(0, -0.066, -0.012);
const PIVOT = new THREE.Vector3(0.1, 0.43, -0.05); // aim rotates around the chest

const _e = new THREE.Euler();
const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _s = new Array(16).fill(0);
const _s2 = new Array(16).fill(0);

export const Q_GUN = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
const Q_MELEE = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.15, 0, 0));
const Q_FRUIT = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
const Q_PAD = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
const qe = (out, x, y, z, order = 'YXZ') => out.setFromEuler(_e.set(x, y, z, order));

export class Hold {
  constructor() {
    this.rw = 0; this.lw = 0; // IK weights (targets)
    this.wp = new THREE.Vector3(0.2, 0.2, -0.2); this.wq = new THREE.Quaternion();
    this.lAbs = false; // left target is absolute (torso space) instead of weapon relative
    this.lp = new THREE.Vector3(); this.lq = new THREE.Quaternion();
    this.rate = 26;
    this.rPole = new THREE.Vector3(0.5, -1, 0.4);
    this.lPole = new THREE.Vector3(-0.5, -1, 0.4);
    this.offQ = new THREE.Quaternion().copy(Q_GUN);
    this.spineX = 0; this.spineY = 0; this.spineZ = 0; // additive spine rotation
    this.pelvisY = 0; this.stepZ = 0; this.stepX = 0;
    this.headX = 0; this.headY = 0; this.headZ = 0; this.lookW = 1; // head offset, how much the head still follows the aim
    this.reachL = 1;
    this.itemVisible = true; this.itemScale = 1;
    this.magProp = 0; this.propKind = 0;
    this.bolt = 0; this.pump = 0; this.lever = 0; this.slide = 0; this.hammer = 0; this.cyl = 0; this.magPart = 0;
    this.fkSwing = 0; // how much the free arm swing contributes to the item hand
    this.gripAxis = 0;
    this.wrist = 1.3; // how far the wrist may bend (rad)
  }
}

// ---------------------------------------------------------------------------
// item info (anchors) -- code defensively: the item models may or may not carry userData
// ---------------------------------------------------------------------------
const FALLBACK = {
  pistol: { gripL: [0, -0.1, 0.0], magPos: [0, -0.07, 0.02], style: 'mag' },
  smg: { gripL: [0, -0.06, -0.2], magPos: [0, -0.11, -0.06], style: 'mag' },
  rifle: { gripL: [0, -0.04, -0.3], magPos: [0, -0.11, -0.08], style: 'mag' },
  shotgun: { gripL: [0, -0.03, -0.32], magPos: [0, -0.05, 0.0], style: 'shell' },
  sniper: { gripL: [0, -0.05, -0.34], magPos: [0, -0.1, -0.04], style: 'mag' },
  lmg: { gripL: [0, -0.07, -0.32], magPos: [0, -0.1, -0.05], style: 'mag' },
  launcher: { gripL: [0, -0.13, -0.28], magPos: [0, 0.0, 0.26], style: 'rocket' },
  bow: { gripL: [0, -0.04, -0.2], magPos: [0, 0.03, -0.1], style: 'bow' },
};
const STYLE_BY_ID = { revolver: 'cyl', hand_cannon: 'cyl', grenade_launcher: 'cyl', bolt_sniper: 'bolt', lever: 'lever', pump: 'shell', tac_shotgun: 'shell', double_barrel: 'shell', auto_shotgun: 'shell', minigun: 'mag' };
const GRIPL_BY_ID = { minigun: [0, -0.02, -0.18], revolver: [0, -0.1, 0.0], hand_cannon: [0, -0.1, 0.0], grapple: [0, -0.1, 0.0] };
const PART_NAMES = ['bolt', 'pump', 'lever', 'cylinder', 'hammer', 'barrels', 'mag', 'slide', 'trigger'];

const asVec = (a, fb) => {
  if (a && typeof a.x === 'number') return new THREE.Vector3(a.x, a.y, a.z);
  return new THREE.Vector3(fb[0], fb[1], fb[2]);
};

/** Anchors and animatable parts of the item in the hand. */
export function makeItemInfo(def, model) {
  const ud = model?.userData || {};
  const cat = def.kind === 'gun' ? def.cat : def.kind;
  const fb = FALLBACK[cat] || { gripL: [0, 0, 0.1], magPos: [0, 0, 0], style: 'none' };
  const gl = GRIPL_BY_ID[def.id] || fb.gripL;
  const info = {
    id: def.id, kind: def.kind, cat, style: STYLE_BY_ID[def.id] || fb.style,
    muzzleZ: ud.muzzleZ ?? -0.3,
    hasGripL: !!ud.gripL,
    gripL: asVec(ud.gripL, gl),
    magPos: asVec(ud.magPos, fb.magPos),
    stockPos: ud.stockPos ? asVec(ud.stockPos, [0, 0, 0.3]) : null,
    parts: {},
  };
  // clamp the fallback support hand to the weapon length
  if (!ud.gripL && cat !== 'pistol') info.gripL.z = Math.max(info.gripL.z, info.muzzleZ * 0.8);
  const parts = ud.parts && typeof ud.parts === 'object' ? ud.parts : null;
  for (const n of PART_NAMES) {
    let o = parts && parts[n] && parts[n].isObject3D ? parts[n] : null;
    if (!o && model && model.getObjectByName) o = model.getObjectByName(n) || null;
    if (o) info.parts[n] = { obj: o, x: o.position.x, y: o.position.y, z: o.position.z, rx: o.rotation.x, rz: o.rotation.z };
  }
  return info;
}

// ---------------------------------------------------------------------------
// guns: [x, y, z, yaw, roll, pitch] at aim pitch 0 for each stance
// ---------------------------------------------------------------------------
const GUN = {
  pistol: { ready: [0.1, 0.3, -0.34, 0, 0, 0.06], shoulder: [0.1, 0.43, -0.42, 0, 0, 0], ads: [0.07, 0.53, -0.4, 0, 0, 0], sprint: [0.2, 0.15, -0.3, 0, 0.1, -0.5], one: true, lSprint: 0, qL: [Math.PI / 2, 0, 0] },
  smg: { ready: [0.13, 0.28, -0.3, 0.1, 0, 0.1], shoulder: [0.13, 0.4, -0.32, 0.1, 0, 0], ads: [0.09, 0.5, -0.3, 0.06, 0, 0], sprint: [0.12, 0.2, -0.22, 0.2, 0.05, -0.55], lSprint: 1, qL: [0, 0, 2.2] },
  rifle: { ready: [0.14, 0.27, -0.28, 0.12, 0, 0.1], shoulder: [0.13, 0.41, -0.3, 0.1, 0, 0], ads: [0.09, 0.5, -0.3, 0.06, 0, 0], sprint: [0.12, 0.2, -0.22, 0.2, 0.05, -0.6], lSprint: 1, qL: [0, 0, 2.2] },
  shotgun: { ready: [0.14, 0.27, -0.28, 0.12, 0, 0.1], shoulder: [0.13, 0.41, -0.3, 0.1, 0, 0], ads: [0.09, 0.5, -0.3, 0.06, 0, 0], sprint: [0.12, 0.2, -0.22, 0.2, 0.05, -0.6], lSprint: 1, qL: [0, 0, 2.2] },
  sniper: { ready: [0.14, 0.27, -0.28, 0.12, 0, 0.1], shoulder: [0.12, 0.42, -0.3, 0.08, 0, 0], ads: [0.08, 0.52, -0.28, 0.05, 0, 0], sprint: [0.12, 0.2, -0.2, 0.2, 0.05, -0.65], lSprint: 1, qL: [0, 0, 2.2] },
  lmg: { ready: [0.16, 0.22, -0.24, 0.14, 0, 0.05], shoulder: [0.15, 0.3, -0.26, 0.12, 0, 0], ads: [0.1, 0.45, -0.28, 0.07, 0, 0], sprint: [0.14, 0.15, -0.2, 0.2, 0.05, -0.5], lSprint: 1, qL: [0, 0, 2.2] },
  launcher: { ready: [0.2, 0.36, -0.12, 0.05, 0, 0.22], shoulder: [0.2, 0.42, -0.14, 0.04, 0, 0.05], ads: [0.16, 0.5, -0.14, 0.03, 0, 0], sprint: [0.2, 0.3, -0.1, 0.05, 0, 0.45], lSprint: 1, qL: [0, 0, 2.2] },
  bow: { ready: [0.13, 0.28, -0.3, 0.1, 0, 0.1], shoulder: [0.12, 0.41, -0.32, 0.08, 0, 0], ads: [0.08, 0.5, -0.3, 0.05, 0, 0], sprint: [0.12, 0.2, -0.22, 0.2, 0.05, -0.6], lSprint: 1, qL: [0, 0, 2.2] },
};

/** Recoil per category: weapon kick back (m), muzzle climb (rad), torso rock (rad), roll (rad). */
export const KICK = {
  pistol: { back: 0.05, pitch: 0.32, torso: 0.03, roll: 0.06 },
  smg: { back: 0.035, pitch: 0.12, torso: 0.02, roll: 0.03 },
  rifle: { back: 0.05, pitch: 0.16, torso: 0.03, roll: 0.04 },
  shotgun: { back: 0.12, pitch: 0.42, torso: 0.09, roll: 0.06 },
  sniper: { back: 0.14, pitch: 0.5, torso: 0.1, roll: 0.05 },
  lmg: { back: 0.04, pitch: 0.08, torso: 0.025, roll: 0.03 },
  launcher: { back: 0.16, pitch: 0.4, torso: 0.12, roll: 0.05 },
  bow: { back: 0.05, pitch: 0.2, torso: 0.04, roll: 0.03 },
  gadget: { back: 0.05, pitch: 0.25, torso: 0.03, roll: 0.04 },
};

function setGunPose(H, A, row, out) {
  // aim rotation about the chest pivot
  _v.set(row[0], row[1], row[2]).sub(PIVOT).applyQuaternion(A.qAimEff).add(PIVOT);
  out.p.copy(_v);
  qe(_q, row[5], row[3], row[4]);
  out.q.copy(A.qAimEff).multiply(_q);
}

const _pa = { p: new THREE.Vector3(), q: new THREE.Quaternion() };
const _pb = { p: new THREE.Vector3(), q: new THREE.Quaternion() };

function gunStance(H, A, g) {
  const aim = A.sAim, ads = A.sAds, sp = A.sSprint;
  setGunPose(H, A, g.ready, _pa);
  setGunPose(H, A, g.shoulder, _pb);
  const e1 = ease.smooth(aim);
  _pa.p.lerp(_pb.p, e1); _pa.q.slerp(_pb.q, e1);
  setGunPose(H, A, g.ads, _pb);
  const e2 = ease.smooth(ads);
  _pa.p.lerp(_pb.p, e2); _pa.q.slerp(_pb.q, e2);
  if (sp > 0.001) {
    setGunPose(H, A, g.sprint, _pb);
    const e3 = ease.smooth(sp);
    _pa.p.lerp(_pb.p, e3); _pa.q.slerp(_pb.q, e3);
  }
  H.wp.copy(_pa.p); H.wq.copy(_pa.q);
}

// ---------------------------------------------------------------------------
// reload tracks. Left hand keys: [t, wFore, wMag, wPouch, wRear, ox, oy, oz] (offset in weapon space).
// Weapon keys: [t, dx, dy, dz (aim frame), pitch, yaw, roll].
// ---------------------------------------------------------------------------
const RELOAD = {
  mag: {
    L: [
      [0, 1, 0, 0, 0, 0, 0, 0], [0.12, 1, 0, 0, 0, 0, 0, 0], [0.22, 0, 1, 0, 0, 0, 0.02, 0], [0.32, 0, 1, 0, 0, 0.02, -0.17, 0.02],
      [0.44, 0, 0, 1, 0, 0, 0, 0], [0.5, 0, 0, 1, 0, 0, 0.03, 0], [0.62, 0, 1, 0, 0, 0, -0.14, 0], [0.72, 0, 1, 0, 0, 0, -0.01, 0],
      [0.77, 0, 1, 0, 0, 0, 0.015, 0], [0.82, 0, 1, 0, 0, 0, 0, 0], [0.88, 0, 0, 0, 1, 0, 0.02, 0.01], [0.93, 0, 0, 0, 1, 0, 0.02, 0.1],
      [0.97, 0, 0, 0, 1, 0, 0.02, 0.0], [1, 1, 0, 0, 0, 0, 0, 0],
    ],
    W: [[0, 0, 0, 0, 0, 0, 0], [0.14, -0.03, 0.04, 0.02, 0.15, 0, -0.5], [0.7, -0.03, 0.04, 0.02, 0.15, 0, -0.5], [0.75, -0.03, 0.01, 0.03, 0.05, 0, -0.5], [0.84, -0.03, 0.04, 0.02, 0.12, 0, -0.35], [1, 0, 0, 0, 0, 0, 0]],
    prop: [[0.23, 0.38], [0.5, 0.76]], magOut: [0.26, 0.74], charge: [0.9, 0.96],
  },
  cyl: {
    L: [
      [0, 1, 0, 0, 0, 0, 0, 0], [0.14, 0, 1, 0, 0, 0, 0.02, 0], [0.3, 0, 1, 0, 0, 0.06, -0.12, 0.05], [0.4, 0, 1, 0, 0, 0.08, -0.2, 0.08],
      [0.52, 0, 0, 1, 0, 0, 0, 0], [0.62, 0, 0, 1, 0, 0, 0.04, 0], [0.76, 0, 1, 0, 0, 0, -0.03, 0.01], [0.84, 0, 1, 0, 0, 0, 0, 0],
      [0.92, 0, 1, 0, 0, 0.04, -0.06, 0.03], [1, 1, 0, 0, 0, 0, 0, 0],
    ],
    W: [[0, 0, 0, 0, 0, 0, 0], [0.12, -0.02, 0.03, 0.03, 0.55, 0, -0.55], [0.8, -0.02, 0.03, 0.03, 0.55, 0, -0.55], [0.9, -0.01, 0.02, 0.02, 0.25, 0, -0.3], [1, 0, 0, 0, 0, 0, 0]],
    prop: [[0.55, 0.78]], magOut: [0.2, 0.8], charge: [0.88, 0.94],
  },
  bolt: {
    L: [
      [0, 1, 0, 0, 0, 0, 0, 0], [0.28, 1, 0, 0, 0, 0, 0, 0], [0.4, 0, 0, 1, 0, 0, 0, 0], [0.5, 0, 0, 1, 0, 0, 0.03, 0], [0.64, 0, 1, 0, 0, 0, 0.1, 0],
      [0.72, 0, 1, 0, 0, 0, 0.01, 0], [0.8, 1, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0, 0],
    ],
    W: [[0, 0, 0, 0, 0, 0, 0], [0.1, 0, 0.02, 0.02, 0.1, 0, -0.25], [0.2, 0.0, 0.05, 0.06, 0.12, 0, -0.25], [0.28, 0, 0.03, -0.01, 0.12, 0, -0.25], [0.78, 0, 0.03, 0.0, 0.14, 0, -0.35], [0.86, 0, 0.05, 0.06, 0.12, 0, -0.3], [0.95, 0, 0.03, -0.01, 0.1, 0, -0.2], [1, 0, 0, 0, 0, 0, 0]],
    prop: [[0.45, 0.7]], magOut: [2, 3], boltCycle: [[0.12, 0.3], [0.78, 0.95]],
  },
  rocket: {
    L: [
      [0, 1, 0, 0, 0, 0, 0, 0], [0.15, 1, 0, 0, 0, 0, 0, 0], [0.4, 0, 0, 1, 0, 0, 0, 0], [0.5, 0, 0, 1, 0, 0, 0.02, 0], [0.7, 0, 1, 0, 0, 0, 0.0, -0.1],
      [0.82, 0, 1, 0, 0, 0, 0, 0.0], [0.92, 1, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0, 0],
    ],
    W: [[0, 0, 0, 0, 0, 0, 0], [0.12, 0, 0.02, 0.02, 0.35, 0, 0], [0.82, 0, 0.02, 0.02, 0.35, 0, 0], [1, 0, 0, 0, 0, 0, 0]],
    prop: [[0.48, 0.84]], magOut: [2, 3],
  },
  bow: {
    L: [
      [0, 1, 0, 0, 0, 0, 0, 0], [0.12, 1, 0, 0, 0, 0, 0.0, 0.0], [0.2, 0, 1, 0, 0, 0, 0, 0], [0.55, 0, 1, 0, 0, 0, -0.03, 0.34], [0.62, 0, 1, 0, 0, 0, -0.03, 0.34],
      [0.76, 0, 0, 1, 0, 0, 0, 0], [0.88, 0, 1, 0, 0, 0, 0.0, 0.0], [1, 1, 0, 0, 0, 0, 0, 0],
    ],
    W: [[0, 0, 0, 0, 0, 0, 0], [0.12, 0, -0.08, 0.05, -0.75, 0, 0], [0.7, 0, -0.08, 0.05, -0.75, 0, 0], [0.9, 0, -0.02, 0.02, -0.2, 0, 0], [1, 0, 0, 0, 0, 0, 0]],
    prop: [[0.7, 0.88]], magOut: [2, 3],
  },
  lever: { // same loop as the shell style, handled procedurally
    L: null, W: [[0, 0, 0, 0, 0, 0, 0], [0.1, -0.03, 0.03, 0.02, 0.2, 0, -0.45], [0.8, -0.03, 0.03, 0.02, 0.2, 0, -0.45], [1, 0, 0, 0, 0, 0, 0]],
  },
  shell: {
    L: null, W: [[0, 0, 0, 0, 0, 0, 0], [0.1, -0.03, 0.03, 0.02, 0.2, 0, -0.45], [0.86, -0.03, 0.03, 0.02, 0.2, 0, -0.45], [1, 0, 0, 0, 0, 0, 0]],
  },
};

const _pouch = new THREE.Vector3(-0.22, 0.1, -0.12);
const _anc = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];

function windowOn(k, wins) {
  for (let i = 0; i < wins.length; i++) if (k >= wins[i][0] && k < wins[i][1]) return true;
  return false;
}

/** Left hand + weapon offsets for a reload at progress k. Returns true when handled. */
function reloadHold(H, A, def, info, k) {
  const style = RELOAD[info.style] ? info.style : 'mag';
  const R = RELOAD[style];
  // weapon pose offsets in the aim frame
  sampleKeys(R.W, k, _s, 6);
  const ex = _s[0], ey = _s[1], ez = _s[2];
  _v.set(ex, ey, ez).applyQuaternion(A.qAimEff);
  H.wp.add(_v);
  qe(_q, _s[3], _s[4], _s[5]);
  H.wq.multiply(_q);
  // left hand
  const wp = H.wp, wq = H.wq;
  _anc[0].copy(info.gripL).applyQuaternion(wq).add(wp);
  _anc[1].copy(info.magPos).applyQuaternion(wq).add(wp);
  _anc[2].copy(_pouch);
  _anc[3].set(0, 0.05, 0.1).applyQuaternion(wq).add(wp);
  H.lAbs = true;
  H.magProp = 0;
  if (style === 'shell' || style === 'lever') {
    const loops = Math.max(1, Math.min(A.reloadLoops, 6));
    const a = 0.1, b = style === 'lever' ? 0.8 : 0.86;
    if (k < a) {
      const u = ease.smooth(k / a);
      H.lp.copy(_anc[0]).lerp(_anc[1], u);
    } else if (k < b) {
      const u = (k - a) / (b - a) * loops;
      const f = u - Math.floor(u);
      const c = (1 - Math.cos(f * Math.PI * 2)) / 2; // 0 at the gate, 1 at the pouch
      H.lp.copy(_anc[1]).lerp(_anc[2], c);
      H.lp.y += Math.sin(f * Math.PI * 2) * 0.04;
      H.lp.addScaledVector(_v2.set(0, 0, -1).applyQuaternion(wq), f > 0.82 ? (f - 0.82) * 0.18 : 0);
      H.magProp = f > 0.35 && f < 0.97 ? 1 : 0;
      H.propKind = 1;
      A.reloadStep = Math.floor(u);
    } else {
      const u = ease.smooth((k - b) / (1 - b));
      H.lp.copy(_anc[1]).lerp(_anc[0], u);
    }
    if (style === 'shell') {
      // rack the pump with the last tenth
      const rack = ramp(0.86, 1, k);
      H.pump = rack > 0 && rack < 1 ? Math.sin(rack * Math.PI) : 0;
      if (H.pump > 0) H.lp.addScaledVector(_v2.set(0, 0, 1).applyQuaternion(wq), H.pump * 0.1);
    } else if (k > 0.8) {
      const rack = ramp(0.8, 1, k);
      H.lever = Math.sin(rack * Math.PI);
      H.wp.addScaledVector(_v2.set(0, -1, -0.4).applyQuaternion(wq), Math.sin(rack * Math.PI) * 0.045);
    }
    return;
  }
  sampleKeys(R.L, k, _s2, 8);
  H.lp.set(0, 0, 0);
  for (let i = 0; i < 4; i++) H.lp.addScaledVector(_anc[i], _s2[i]);
  H.lp.add(_v.set(_s2[4], _s2[5], _s2[6]).applyQuaternion(wq));
  H.magProp = R.prop && windowOn(k, R.prop) ? 1 : 0;
  H.propKind = style === 'rocket' ? 2 : style === 'bow' ? 3 : 0;
  H.magPart = R.magOut ? ramp(R.magOut[0], R.magOut[0] + 0.06, k) * (1 - ramp(R.magOut[1] - 0.04, R.magOut[1] + 0.04, k)) : 0;
  if (R.charge && k > R.charge[0] && k < R.charge[1]) H.slide = Math.sin(ramp(R.charge[0], R.charge[1], k) * Math.PI);
  if (R.boltCycle) for (const w of R.boltCycle) if (k > w[0] && k < w[1]) H.bolt = Math.sin(ramp(w[0], w[1], k) * Math.PI);
  if (style === 'cyl') H.cyl = ease.smooth(ramp(0.1, 0.3, k)) * (1 - ease.smooth(ramp(0.86, 0.96, k)));
}

// ---------------------------------------------------------------------------
// melee: per weapon swing tracks. Rows: [k, px, py, pz, pitch, yaw, roll, torsoYaw, torsoPitch, lunge].
// The damage frame is at k = 0.45 (Character.updateCombat uses swingT < swingDur * 0.55): rest, anticipation,
// cocked at k 0.22, impact at 0.46, follow-through, settle. Yaw > 0 turns left, pitch > 0 raises the blade.
// ---------------------------------------------------------------------------
const rowsFrom = (rest, rows) => [[0, ...rest], ...rows, [1, ...rest]];
const PICK_REST = [0.24, 0.3, -0.14, 2.5, -0.1, 0.2, 0.1, 0.0, 0];
const MACH_REST = [0.3, 0.22, -0.2, 0.95, 0, 0, 0.1, 0, 0];
const BAT_REST = [0.28, 0.4, -0.08, 2.35, -0.1, 0.1, 0.1, 0.0, 0];
const KAT_REST = [0.24, 0.24, -0.26, 1.0, -0.2, 0.1, 0.12, 0.0, 0];
const SLEDGE_REST = [0.3, 0.4, -0.05, 2.3, -0.1, 0.1, 0.1, 0.0, 0];
export const MELEE = {
  pickaxe: {
    two: true, grip: [0, 0, 0.1], offQ: [-1.1, 0, 0],
    rest: PICK_REST, carry: [0.26, 0.2, -0.2, 1.25, 0.1, 0, 0, 0, 0],
    swing: rowsFrom(PICK_REST, [
      [0.1, 0.28, 0.5, -0.06, 2.75, -0.1, 0.15, 0.18, -0.08, -0.01], [0.22, 0.2, 0.8, 0.04, 2.95, -0.1, 0.1, 0.24, -0.2, -0.03],
      [0.34, 0.16, 0.66, -0.3, 1.7, 0, 0, 0.05, 0.1, 0.03], [0.46, 0.14, 0.42, -0.5, 0.45, 0, 0, -0.1, 0.32, 0.1],
      [0.62, 0.12, 0.25, -0.44, -0.5, 0, 0, -0.15, 0.4, 0.12], [0.82, 0.2, 0.28, -0.3, 0.8, 0.05, 0.1, -0.05, 0.15, 0.04],
    ]),
  },
  machete: {
    two: false, grip: [0, 0, 0], offQ: [-1.0, 0, 0],
    rest: MACH_REST, carry: [0.26, 0.15, -0.16, 0.7, 0, 0, 0, 0, 0],
    swing: rowsFrom(MACH_REST, [
      [0.1, 0.34, 0.44, -0.14, 1.2, -0.4, -0.3, -0.25, -0.03, 0], [0.22, 0.38, 0.66, -0.1, 1.5, -0.75, -0.5, -0.5, -0.08, -0.01],
      [0.46, 0.04, 0.34, -0.52, 0.5, 0.35, -0.2, 0.3, 0.12, 0.08], [0.62, -0.02, 0.2, -0.4, -0.1, 0.9, 0.2, 0.5, 0.2, 0.1],
      [0.82, 0.14, 0.18, -0.36, 0.5, 0.35, 0, 0.2, 0.08, 0.04],
    ]),
  },
  bat: {
    two: true, grip: [0, 0, 0.1], offQ: [-1.1, 0, 0],
    rest: BAT_REST, carry: [0.26, 0.22, -0.2, 1.3, 0.1, 0, 0, 0, 0],
    swing: rowsFrom(BAT_REST, [
      [0.1, 0.3, 0.5, 0.0, 1.0, -1.1, 0.1, -0.35, 0, -0.01], [0.22, 0.28, 0.5, 0.1, 0.3, -1.9, 0.1, -0.8, 0, -0.03],
      [0.34, 0.2, 0.48, -0.2, 0.25, -1.0, 0.1, -0.4, 0.03, 0.03], [0.46, 0.0, 0.45, -0.55, 0.15, 0.0, 0.1, 0.05, 0.05, 0.1],
      [0.62, -0.1, 0.45, -0.36, 0.1, 1.5, 0.1, 0.8, 0.08, 0.1], [0.82, -0.1, 0.4, -0.3, 0.7, 1.0, 0.1, 0.5, 0.05, 0.05],
    ]),
  },
  katana: {
    two: true, grip: [0, 0, 0.1], offQ: [-1.0, 0, 0],
    rest: KAT_REST, carry: [0.22, 0.2, -0.26, 0.9, -0.15, 0, 0.1, 0, 0],
    swing: rowsFrom(KAT_REST, [
      [0.1, 0.3, 0.48, -0.2, 1.25, -0.4, 0.2, -0.25, -0.02, 0], [0.22, 0.34, 0.66, -0.12, 1.45, -0.55, 0.3, -0.4, -0.03, 0],
      [0.46, 0.0, 0.36, -0.55, 0.3, 0.55, -0.1, 0.3, 0.12, 0.09], [0.62, -0.04, 0.22, -0.42, 0.0, 0.95, -0.3, 0.5, 0.18, 0.1],
      [0.82, 0.1, 0.2, -0.36, 0.5, 0.4, 0, 0.15, 0.08, 0.04],
    ]),
    swing2: rowsFrom(KAT_REST, [
      [0.1, 0.1, 0.28, -0.28, 0.8, 0.5, -0.3, 0.25, 0.03, 0], [0.22, -0.12, 0.3, -0.3, 0.7, 0.95, -0.6, 0.45, 0.04, 0],
      [0.46, 0.14, 0.52, -0.5, 1.1, -0.5, 0.4, -0.35, -0.05, 0.09], [0.62, 0.2, 0.62, -0.38, 1.4, -0.85, 0.5, -0.5, -0.08, 0.1],
      [0.82, 0.12, 0.34, -0.34, 0.9, -0.25, 0.2, -0.18, 0, 0.04],
    ]),
  },
  sledge: {
    two: true, grip: [0, 0, 0.1], offQ: [-1.1, 0, 0],
    rest: SLEDGE_REST, carry: [0.26, 0.2, -0.22, 1.35, 0.1, 0, 0, 0, 0],
    swing: rowsFrom(SLEDGE_REST, [
      [0.1, 0.22, 0.6, 0.02, 2.8, -0.1, 0.1, 0.15, -0.15, -0.02], [0.22, 0.12, 0.88, 0.12, 3.1, 0, 0, 0.2, -0.32, -0.05],
      [0.34, 0.12, 0.72, -0.2, 1.9, 0, 0, 0.05, 0.1, 0.03], [0.46, 0.1, 0.42, -0.5, 0.0, 0, 0, 0, 0.35, 0.1],
      [0.55, 0.06, 0.26, -0.44, -0.95, 0, 0, -0.1, 0.62, 0.14], [0.72, 0.06, 0.25, -0.44, -0.95, 0, 0, -0.1, 0.62, 0.14],
      [0.9, 0.2, 0.22, -0.3, 0.6, 0.05, 0.05, 0, 0.25, 0.05],
    ]),
  },
};
const MELEE_DEFAULT = MELEE.machete;
export const meleeSpec = (id) => MELEE[id] || MELEE_DEFAULT;

function setPose(H, A, row, o) {
  // row: [px, py, pz, pitch, yaw, roll] in torso space (not rotated with the aim)
  H.wp.set(row[o], row[o + 1], row[o + 2]);
  qe(H.wq, row[o + 3], row[o + 4], row[o + 5]);
}

function meleeHold(H, A, def, info, st) {
  const sp = meleeSpec(def.id);
  H.offQ.setFromEuler(_e.set(sp.offQ[0], sp.offQ[1], sp.offQ[2]));
  H.rw = 1; H.wrist = 2.0;
  const swing = A.swingK >= 0;
  const moving = A.sSprint;
  if (swing) {
    const track = def.id === 'katana' && (A.swingCount & 1) ? sp.swing2 : sp.swing;
    // the arms lag the target by a few frames, so the table is sampled slightly ahead to land the impact on time
    const k = A.swingK, ke = Math.min(1, k + 0.05 * ease.smooth(k / 0.2) * (1 - ease.smooth((k - 0.6) / 0.3)));
    sampleKeys(track, ke, _s, 9);
    H.wp.set(_s[0], _s[1], _s[2]);
    qe(H.wq, _s[3], _s[4], _s[5]);
    H.spineY = _s[6]; H.spineX = _s[7]; H.stepZ = _s[8];
    H.pelvisY = _s[6] * 0.55;
    H.rate = 80;
    H.lAbs = false;
    H.lp.set(sp.grip[0], sp.grip[1], sp.grip[2]);
    H.lw = sp.two ? 1 : 0;
    H.headY = -_s[6] * 0.4;
    H.lookW = 0.3;
  } else {
    // rest on the shoulder; at a run the weapon swings down to the side
    const r = sp.rest, c = sp.carry;
    const k = ease.smooth(moving);
    _s[0] = lerp(r[0], c[0], k); _s[1] = lerp(r[1], c[1], k); _s[2] = lerp(r[2], c[2], k);
    H.wp.set(_s[0], _s[1], _s[2]);
    qe(H.wq, lerp(r[3], c[3], k), lerp(r[4], c[4], k), lerp(r[5], c[5], k));
    H.rate = 18;
    H.lAbs = false;
    H.lp.set(sp.grip[0], sp.grip[1], sp.grip[2]);
    H.lw = 0;
    H.spineY = lerp(r[6], c[6], k);
  }
  H.fkSwing = 0.5;
  H.lq.copy(H.offQ).invert(); // both hands grip the handle the same way
}

// ---------------------------------------------------------------------------
// throwables, gadgets
// ---------------------------------------------------------------------------
const THROW = [
  [0, 0.2, 0.2, -0.22, 0.6, 0, 0], [0.4, 0.3, 0.64, 0.16, 1.9, 0.2, 0], [0.8, 0.22, 0.6, -0.1, 1.2, 0.0, 0], [1, 0.12, 0.5, -0.5, 0.3, 0, 0],
  [1.25, 0.04, 0.3, -0.58, -0.2, -0.1, 0], [1.6, 0.0, 0.1, -0.4, 0.2, -0.2, 0], [2, 0.2, 0.2, -0.22, 0.6, 0, 0],
];
const THROW_BODY = [[0, 0, 0, 0], [0.4, 0.5, 0.15, -0.05], [0.8, 0.2, -0.08, 0.02], [1, -0.25, -0.2, 0.08], [1.25, -0.4, -0.3, 0.12], [1.6, -0.1, -0.05, 0.04], [2, 0, 0, 0]];

function throwHold(H, A, def, info) {
  H.rw = 1; H.lw = 0; H.lAbs = false;
  H.offQ.copy(Q_FRUIT);
  H.rate = 50;
  if (A.throwK >= 0) {
    sampleKeys(THROW, A.throwK, _s, 6);
    H.wp.set(_s[0], _s[1], _s[2]);
    qe(H.wq, _s[3], _s[4], _s[5]);
    sampleKeys(THROW_BODY, A.throwK, _s2, 3);
    H.spineY = _s2[0]; H.spineX = _s2[1]; H.stepZ = _s2[2];
    H.pelvisY = -_s2[0] * 0.4;
    H.headY = -_s2[0] * 0.3;
    H.lookW = 0.3;
    // an empty hand once the grenade has left it
    H.itemVisible = A.throwK < 1 || A.throwK > 1.9;
    return;
  }
  // carry: item held at the hip, swinging a little with the stride
  H.wp.set(0.2, 0.2, -0.22);
  qe(H.wq, 0.6, 0, 0);
  H.rate = 18;
  H.fkSwing = 0.6;
}

function gadgetHold(H, A, def, info, st) {
  const ch = A.ch;
  if (def.gadget === 'grapple') {
    // pistol-like: arm along the aim, pointing at the anchor while the rope is out
    const g = GUN.pistol;
    gunStance(H, A, g);
    H.rw = 1; H.lw = 1 - A.sSprint; H.lAbs = false;
    H.lp.copy(info.gripL);
    qe(H.lq, g.qL[0], g.qL[1], g.qL[2], 'XYZ');
    H.offQ.copy(Q_GUN);
    H.rate = 24;
    if (ch.grapple) A.pointAt(H, ch.grapple.x, ch.grapple.y, ch.grapple.z);
    return;
  }
  // launch pad: carried flat in both hands at the belt, pushed out when placed
  H.rw = 1; H.lw = 1; H.lAbs = false;
  H.offQ.copy(Q_PAD);
  const push = A.gadgetK >= 0 ? Math.sin(Math.min(1, A.gadgetK) * Math.PI) : 0;
  H.wp.set(0.09, 0.2 - push * 0.12, -0.36 - push * 0.2);
  qe(H.wq, -0.25 + push * 0.4, 0, 0);
  H.lp.set(-0.15, 0.0, 0.0);
  qe(H.lq, Math.PI / 2, 0, 0, 'XYZ');
  H.rate = 24;
  H.itemVisible = !(A.gadgetK >= 0.35 && A.gadgetK < 1.4);
}

// ---------------------------------------------------------------------------
// consumables
// ---------------------------------------------------------------------------
const EAT = {
  // hand-to-mouth route for one bite, k in [0,1]: lift, bite, lower
  p: [[0, 0.2, 0.2, -0.24, 1.0], [0.22, 0.1, 0.54, -0.2, 2.2], [0.34, 0.03, 0.6, -0.2, 2.3], [0.46, 0.03, 0.62, -0.22, 2.1], [0.62, 0.1, 0.5, -0.2, 1.8], [0.78, 0.16, 0.4, -0.2, 1.5], [1, 0.2, 0.28, -0.24, 1.0]],
};

const FRUIT_STYLE = { apple: 0, banana: 1, mushroom: 0, jumpple: 0, runana: 1, floorange: 0 };
const _mouth = new THREE.Vector3();
const _m2 = new THREE.Vector3();

function consumeHold(H, A, def, info) {
  const u = A.using;
  H.wrist = 1.9;
  const k = clamp(u.t / u.dur, 0, 1);
  H.rw = 1; H.lw = 0; H.lAbs = false;
  H.offQ.copy(Q_FRUIT);
  H.rate = 22;
  A.mouthPos(_mouth);
  const id = def.id;
  if (id in FRUIT_STYLE) {
    if (id === 'floorange') {
      // hold it up, squeeze, pop
      const a = ease.smooth(ramp(0, 0.35, k));
      H.wp.set(0.12, lerp(0.3, 0.58, a), lerp(-0.2, -0.36, a));
      qe(H.wq, 1.0, 0, 0);
      H.itemScale = k > 0.62 ? 1 + 0.5 * ramp(0.62, 0.9, k) : 1;
      H.itemVisible = k < 0.92;
      H.headX = 0.12 * a; H.lookW = 0.5;
      H.lw = a; H.lAbs = true;
      H.lp.set(-0.05, lerp(0.25, 0.55, a), lerp(-0.2, -0.36, a));
      qe(H.lq, 1.4, 0, 0);
      return;
    }
    // bites spread over the duration
    const bites = u.dur > 0.8 ? 3 : 2;
    const f = k * bites;
    const b = Math.min(bites - 1, Math.floor(f));
    const q = f - b;
    sampleKeys(EAT.p, q, _s, 4);
    // the fruit reaches the mouth
    const toMouth = ease.smooth(ramp(0.1, 0.3, q)) * (1 - ease.smooth(ramp(0.6, 0.85, q)));
    H.wp.set(_s[0], _s[1], _s[2]);
    H.wp.lerp(_v.set(_mouth.x - 0.02, _mouth.y - 0.02, _mouth.z - 0.07), toMouth * 0.9);
    qe(H.wq, id === 'banana' || id === 'runana' ? 2.4 : 1.6, 0, id === 'banana' || id === 'runana' ? 0.0 : 0);
    // chew
    const chew = q > 0.3 && q < 0.95 ? Math.sin((q - 0.3) * Math.PI * 6) : 0;
    H.headX = -0.1 * Math.sin(Math.min(1, ramp(0.25, 0.4, q)) * Math.PI) + chew * 0.03;
    H.lookW = 0.4;
    H.itemScale = 1 - 0.25 * (b + q) / bites;
    A.chew = chew;
    return;
  }
  if (id === 'bandage') {
    // left forearm held out, right hand winds the bandage around it
    const a = ease.smooth(ramp(0, 0.1, k)) * (1 - ease.smooth(ramp(0.94, 1, k)));
    H.lw = a; H.lAbs = true;
    H.lp.set(lerp(-0.14, -0.06, a), lerp(0.2, 0.28, a), lerp(-0.16, -0.38, a));
    qe(H.lq, Math.PI / 2 - 0.2, 0, 0.5, 'XYZ');
    const turns = 5;
    const w = k * turns * Math.PI * 2;
    const along = (Math.sin(k * Math.PI * 3) * 0.5 + 0.5);
    _m2.set(-0.06 + 0.03, 0.28, -0.38 + 0.04 * (along * 2 - 1)); // forearm centre
    H.wp.set(H.lp.x + 0.02 + Math.cos(w) * 0.07 * a, H.lp.y + Math.sin(w) * 0.07 * a, H.lp.z + 0.06 + 0.1 * (along - 0.5));
    H.wp.lerp(_v.set(0.2, 0.2, -0.24), 1 - a);
    qe(H.wq, 1.4, 0, w * 0.2);
    H.headX = 0.2 * a; H.headY = 0.25 * a; H.lookW = 0.2;
    H.spineX = 0.1 * a;
    return;
  }
  if (id === 'medkit') {
    const a = ease.smooth(ramp(0, 0.1, k)) * (1 - ease.smooth(ramp(0.93, 1, k)));
    // case at the chest in the right hand, left hand works it
    H.wp.lerp(_v.set(0.14, 0.2, -0.36), 0);
    H.wp.set(lerp(0.2, 0.1, a), lerp(0.2, 0.3, a), lerp(-0.24, -0.38, a));
    qe(H.wq, lerp(0.6, 1.1, a), 0, -0.1 * a);
    H.lw = a; H.lAbs = true;
    const open = ramp(0.12, 0.26, k);
    const rummage = ramp(0.26, 0.64, k) * (1 - ramp(0.64, 0.7, k));
    const apply = ramp(0.68, 0.92, k) * (1 - ramp(0.92, 1, k));
    const wob = Math.sin(k * 40);
    // lid, then into the case, then patting the shoulder/chest
    _v.set(-0.05, 0.46 + 0.1 * (1 - open) * ramp(0.1, 0.14, k), -0.3);
    _m2.set(0.1 + 0.03 * wob, 0.28 + 0.02 * Math.sin(k * 55), -0.38);
    _v.lerp(_m2, rummage + (k > 0.7 ? 1 : 0));
    // apply: reach the left shoulder and the chest
    _m2.set(-0.24 + 0.04 * Math.sin(k * 36), 0.42 + 0.03 * wob, -0.2);
    _v.lerp(_m2, apply);
    H.lp.copy(_v);
    H.lp.lerp(_v2.set(-0.15, 0.1, -0.1), 1 - a);
    qe(H.lq, Math.PI / 2, 0, 0.3, 'XYZ');
    H.headX = 0.25 * a; H.lookW = 0.2;
    H.spineX = 0.12 * a;
    return;
  }
  if (id === 'chug_jug') {
    // two hands, three big gulps with breathers in between
    const cyc = k * 3;
    const f = cyc - Math.floor(cyc);
    const up = ease.smooth(ramp(0, 0.2, f)) * (1 - ease.smooth(ramp(0.8, 1, f)));
    const first = ease.smooth(ramp(0, 0.06, k)) * (1 - ease.smooth(ramp(0.97, 1, k)));
    const g = up * first;
    const lift = Math.max(g, 0.25 * first);
    H.wp.set(lerp(0.2, 0.06, lift), lerp(0.2, 0.62, lift), lerp(-0.24, -0.16, lift));
    qe(H.wq, lerp(0.6, 2.6, g) * 0.5 + 0.2, 0, lerp(0, -0.3, g));
    H.lw = lift; H.lAbs = true;
    H.lp.set(lerp(-0.12, -0.02, lift), lerp(0.1, 0.56, lift), lerp(-0.2, -0.2, lift));
    qe(H.lq, Math.PI / 2, 0, 0.2, 'XYZ');
    H.headX = 0.4 * g; H.lookW = 0.1;
    H.spineX = 0.18 * g;
    A.chew = Math.sin(k * 150) * g * 0.6;
    return;
  }
  // bottles: small / big shield potion, slurp
  const gulps = id === 'big_shield' ? 3 : id === 'slurp' ? 2 : 2;
  const raise = ease.smooth(ramp(0, 0.16, k)) * (1 - ease.smooth(ramp(0.9, 1, k)));
  const f = (k * gulps) % 1;
  const tilt = raise * (0.55 + 0.45 * Math.sin(Math.min(1, f * 1.5) * Math.PI));
  H.wp.set(lerp(0.2, 0.06, raise), lerp(0.2, 0.56, raise), lerp(-0.24, -0.2, raise));
  qe(H.wq, lerp(0.6, 2.2, tilt) * 0.55 + 0.3 * raise, 0, lerp(0, -0.5, tilt));
  H.headX = 0.34 * tilt; H.lookW = 0.1;
  A.chew = Math.sin(k * 90) * tilt * 0.5;
  H.itemVisible = true;
}

// ---------------------------------------------------------------------------
// main entry
// ---------------------------------------------------------------------------
const _carry = new THREE.Vector3();

/** Fills A.hold for this frame. */
export function computeHold(A) {
  const H = A.hold;
  const ch = A.ch;
  const st = ch.stack;
  const def = st ? st.def : null;
  const info = A.info;
  // defaults every frame
  H.rw = def ? 1 : 0; H.lw = 0; H.lAbs = false; H.rate = 26;
  H.spineX = H.spineY = H.spineZ = 0; H.pelvisY = 0; H.stepZ = 0; H.stepX = 0;
  H.headX = H.headY = H.headZ = 0; H.lookW = 1;
  H.itemVisible = true; H.itemScale = 1;
  H.magProp = 0; H.bolt = H.pump = H.lever = H.slide = H.hammer = H.cyl = H.magPart = 0;
  H.fkSwing = 0; H.wrist = 1.3;
  H.rPole.set(0.5, -1, 0.4); H.lPole.set(-0.5, -1, 0.4);
  H.lq.identity();
  if (!def || !info) return;

  if (def.kind === 'gun') {
    const cat = def.cat in GUN ? def.cat : 'rifle';
    const g = GUN[cat];
    H.offQ.copy(Q_GUN);
    gunStance(H, A, g);
    H.lAbs = false;
    H.lp.copy(info.gripL);
    qe(H.lq, g.qL[0], g.qL[1], g.qL[2], 'XYZ');
    H.lw = g.one ? 1 - A.sSprint : 1;
    if (!g.one && g.lSprint === 0) H.lw = 1 - A.sSprint;
    if (ch.reload) {
      const k = clamp(ch.reload.t / ch.reload.dur, 0, 1);
      reloadHold(H, A, def, info, k);
      H.lw = 1;
      H.rate = 34;
      H.spineX = -0.06 * Math.sin(k * Math.PI);
      H.headX = -0.18 * Math.sin(ramp(0.1, 0.5, k) * Math.PI);
      H.lookW = 0.4;
    }
    A.holdKind = 1;
    return;
  }
  if (def.kind === 'melee') { meleeHold(H, A, def, info, st); A.holdKind = 2; return; }
  if (def.kind === 'throw') { throwHold(H, A, def, info); A.holdKind = 3; return; }
  if (def.kind === 'gadget') { gadgetHold(H, A, def, info, st); A.holdKind = 4; return; }
  if (def.kind === 'consume') {
    if (A.using) consumeHold(H, A, def, info);
    else {
      H.offQ.copy(Q_FRUIT);
      H.wp.set(0.2, 0.2, -0.24);
      qe(H.wq, 0.6, 0, 0);
      H.fkSwing = 0.6; H.rate = 18;
    }
    A.holdKind = 5;
  }
  void _carry;
}

/** Equip animation: rises from the hip. Applied on top of the hold. */
export function applyEquip(H, A, e) {
  if (e <= 0) return;
  const k = ease.smooth(e);
  H.wp.y -= 0.22 * k;
  H.wp.z += 0.08 * k;
  H.wp.x += 0.05 * k;
  _q.setFromEuler(_e.set(-0.9 * k, 0, 0.35 * k));
  H.wq.multiply(_q);
}
