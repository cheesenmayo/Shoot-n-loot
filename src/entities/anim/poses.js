import * as THREE from 'three';
import { RIG } from '../../charmodel.js';
import { clamp, lerp, smoothstep } from '../../util.js';
import { spring, ease, ramp } from './ik.js';
import { S_P0, S_P1, S_P2, S_P3, S_P4 } from './slots.js';

// ---------------------------------------------------------------------------
// FK pose families: swim, skydive, glide, dance, tumble. Each writes every joint of the rig.
// ---------------------------------------------------------------------------

const AX = new THREE.Vector3(1, 0, 0);
const _e = new THREE.Euler();
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion();
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const PIVOT = new THREE.Vector3(0, RIG.hipY, 0);

export const eul = (out, x, y, z) => out.setFromEuler(_e.set(x, y, z, 'YXZ'));

export function setArm(arm, x, y, z, flex, wx = 0, wz = 0) {
  eul(arm.a.quaternion, x, y, z);
  arm.fore.quaternion.setFromAxisAngle(AX, flex);
  if (wx || wz) eul(arm.hand.quaternion, wx, 0, wz); else arm.hand.quaternion.identity();
}

export function setLeg(leg, x, y, z, knee, ankle = 0) {
  eul(leg.l.quaternion, x, y, z);
  leg.shin.quaternion.setFromAxisAngle(AX, -knee);
  eul(leg.foot.quaternion, ankle, 0, 0);
}

/** Rotates the whole body about the hips (plus an offset). */
export function bodyAbout(m, q, ox = 0, oy = 0, oz = 0) {
  m.body.quaternion.copy(q);
  _v.copy(PIVOT).applyQuaternion(q);
  m.body.position.set(PIVOT.x - _v.x + ox, PIVOT.y - _v.y + oy, PIVOT.z - _v.z + oz);
}

/** Neutral standing pose for every joint (families override what they need). */
export function neutral(m) {
  m.body.position.set(0, 0, 0); m.body.quaternion.identity();
  m.pelvis.position.set(0, RIG.hipY - 0.01, 0); m.pelvis.quaternion.identity();
  m.torso.position.set(0, RIG.waist, 0); m.torso.quaternion.identity();
  m.neck.quaternion.identity(); m.head.quaternion.identity();
  setArm(m.armR, 0, 0, 0.1, 0.15); setArm(m.armL, 0, 0, -0.1, 0.15);
  setLeg(m.legR, 0, 0, 0.04, 0.05); setLeg(m.legL, 0, 0, -0.04, 0.05);
}

// ---------------------------------------------------------------------------
// swimming: crawl while moving, treading water when still
// ---------------------------------------------------------------------------
export function poseSwim(A, dt) {
  const ch = A.ch, m = A.m, X = A.X, V = A.V;
  const sp = Math.hypot(ch.vel.x, ch.vel.z);
  spring(X, V, S_P0, smoothstep(0.5, 2.6, sp), 6, dt);
  const sm = clamp(X[S_P0], 0, 1);
  const fast = ch.sprinting ? 1 : 0;
  const ph = A.t * (4.2 + sp * 0.7);
  const slow = A.t * 2.4;
  neutral(m);
  const pitch = lerp(-0.2, -1.12, sm);
  const roll = Math.sin(ph) * 0.18 * sm;
  bodyAbout(m, eul(_q, pitch, 0, roll), 0, lerp(0.02, -0.02, sm), 0);
  m.torso.quaternion.setFromEuler(_e.set(0.1 * sm + 0.03 * Math.sin(slow), Math.sin(ph) * 0.22 * sm, 0, 'YXZ'));
  // head: looks forward, turns to breathe now and then
  const breathe = Math.max(0, Math.sin(ph * 0.5 + 1)) * 0.7;
  eul(m.neck.quaternion, lerp(0.15, 0.5, sm), breathe * 0.4 * sm, 0);
  eul(m.head.quaternion, lerp(0.05, 0.55, sm), breathe * 0.5 * sm, 0);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? 1 : -1;
    const arm = i === 0 ? m.armR : m.armL;
    const leg = i === 0 ? m.legR : m.legL;
    const phi = ph + (side > 0 ? 0 : Math.PI);
    const rec = Math.max(0, -Math.sin(phi)); // recovery above the water
    const cx = 1.45 + 1.35 * Math.cos(phi);
    const cz = side * (0.22 + 0.4 * rec);
    const cf = 0.3 + 1.0 * rec;
    // treading water: sculling circles in front of the chest
    const sc = slow * 1.3 + (side > 0 ? 0 : Math.PI);
    const tx = 0.9 + 0.3 * Math.sin(sc), tz = side * (0.55 + 0.25 * Math.cos(sc)), tf = 1.35;
    setArm(arm, lerp(tx, cx, sm), 0, lerp(tz, cz, sm), lerp(tf, cf, sm));
    // legs: bicycle when treading, flutter kick when swimming
    const kp = ph * 2 + (side > 0 ? 0 : Math.PI);
    const bp = slow * 1.2 + (side > 0 ? 0 : Math.PI);
    const hx = lerp(0.55 * Math.sin(bp), 0.3 * Math.sin(kp), sm);
    const kn = lerp(0.8 + 0.5 * Math.cos(bp), 0.3 + 0.2 * Math.sin(kp + 1), sm);
    setLeg(leg, hx, 0, side * 0.08, kn, lerp(0, -0.5, sm));
  }
  void fast;
}

// ---------------------------------------------------------------------------
// skydiving: belly-down spread eagle, swept-back dive, flared slow fall
// ---------------------------------------------------------------------------
export function poseSkydive(A, dt) {
  const ch = A.ch, m = A.m, X = A.X, V = A.V;
  const inp = ch.input;
  const dive = inp.fwd > 0.3 ? 1 : 0, slow = inp.fwd < -0.3 ? 1 : 0;
  spring(X, V, S_P0, dive, 5, dt);
  spring(X, V, S_P1, slow, 5, dt);
  spring(X, V, S_P2, clamp(inp.strafe, -1, 1), 6, dt);
  const d = clamp(X[S_P0], 0, 1), s = clamp(X[S_P1], 0, 1), st = X[S_P2];
  const t = A.t;
  neutral(m);
  // body angle: flat when spread, head-down when diving, arched when flaring
  const pitch = lerp(lerp(-1.5, -2.0, d), -1.15, s);
  const roll = -st * 0.4 + Math.sin(t * 1.3) * 0.03;
  const q = eul(_q, pitch, 0, roll);
  bodyAbout(m, q, 0, 0.0, 0.0);
  const flutter = (k) => Math.sin(t * 13 + k) * (0.05 + 0.04 * d) + Math.sin(t * 7.3 + k * 2) * 0.04;
  // head lifts to look ahead
  eul(m.neck.quaternion, lerp(0.35, 0.1, d), 0, 0);
  eul(m.head.quaternion, lerp(0.5, 0.15, d), st * 0.15, 0);
  eul(m.torso.quaternion, lerp(0.12, -0.05, d), 0, 0);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? 1 : -1;
    const arm = i === 0 ? m.armR : m.armL;
    const leg = i === 0 ? m.legR : m.legL;
    // spread: arms out and slightly forward with bent elbows; dive: arms swept back along the body
    const ax = lerp(0.55 + flutter(side), 0.05, d) + 0.25 * s;
    const az = side * lerp(lerp(1.25, 0.18, d), 1.45, s);
    const af = lerp(lerp(0.55, 0.15, d), 1.0, s) + flutter(side * 2) * 0.6;
    setArm(arm, ax, 0, az + flutter(side * 3) * 0.3, af);
    // legs: apart, knees bent; together and pointed in the dive
    const lx = lerp(-0.15 + flutter(side + 1) * 0.6, -0.05, d);
    const lz = side * lerp(lerp(0.3, 0.03, d), 0.4, s);
    const kn = lerp(lerp(0.45, 0.08, d), 0.9, s) + flutter(side * 5) * 0.6;
    setLeg(leg, lx, 0, lz, kn, lerp(-0.2, -0.7, d));
  }
}

// ---------------------------------------------------------------------------
// gliding: both hands on the handle bar, legs dangling and swaying
// ---------------------------------------------------------------------------
const _h = new THREE.Vector3();
const _pole = new THREE.Vector3();
export function poseGlide(A, dt) {
  const ch = A.ch, m = A.m, X = A.X, V = A.V;
  const inp = ch.input;
  spring(X, V, S_P0, clamp(inp.strafe, -1, 1), 4, dt);
  spring(X, V, S_P1, clamp(inp.fwd, -1, 1), 4, dt);
  const st = X[S_P0], fw = X[S_P1];
  const t = A.t;
  neutral(m);
  const bank = -st * 0.28;
  ch.glider.rotation.set(fw * -0.08, 0, bank);
  ch.glider.position.set(0, -0.1, 0);
  // the body hangs below the handles; swings a little with the bank
  const q = eul(_q, -0.1 + fw * -0.12 + Math.sin(t * 1.1) * 0.02, 0, bank * 0.5);
  bodyAbout(m, q, 0, 0, 0);
  eul(m.torso.quaternion, 0.05 - fw * 0.05, 0, -bank * 0.3);
  eul(m.neck.quaternion, 0.1, 0, 0);
  eul(m.head.quaternion, 0.25, st * -0.2, 0);
  // hands on the bars (root space -> body space is identity apart from the glider offset)
  const hy = 2.07 - 0.1;
  ch.glider.updateMatrix();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? 1 : -1;
    // handle position in the (rotated) glider frame
    _h.set(side * 0.24, 2.07, 0).applyEuler(ch.glider.rotation).add(ch.glider.position);
    _pole.set(side * 0.9, -0.5, 0.6);
    A.armBody(i === 0 ? m.armR : m.armL, side, _h, _pole, 1);
  }
  // legs dangle: alternating sway, knees bent
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? 1 : -1;
    const leg = i === 0 ? m.legR : m.legL;
    const sw = Math.sin(t * 1.7 + (side > 0 ? 0 : 2.2));
    setLeg(leg, 0.28 + sw * 0.14 + fw * 0.15, 0, side * (0.06 + 0.04 * sw), 0.3 + 0.25 * (sw * 0.5 + 0.5), -0.3 + sw * 0.1);
  }
  void hy;
}

// ---------------------------------------------------------------------------
// dancing (Boogie Bomb): five moves, blended into each other
// ---------------------------------------------------------------------------
const NCH = 28;
const _P = new Float32Array(NCH), _P2 = new Float32Array(NCH);
const MOVE_LEN = 1.3, MOVES = 5;

function danceMove(m, t, c, o) {
  o.fill(0);
  const w = t * Math.PI * 2 * 1.5; // beat
  const s = Math.sin(w), cc = Math.cos(w);
  // channel layout: 0 bodyY, 1 bodyRZ, 2 bodyRY, 3 pelvisRY, 4 pelvisRZ, 5 pelvisX, 6 spineX, 7 spineY, 8 spineZ, 9 headX, 10 headY, 11 headZ,
  // 12-15 right arm (x,y,z,elbow), 16-19 left arm, 20-23 right leg (x,z,knee,ankle), 24-27 left leg
  const armR = (x, y, z, f) => { o[12] = x; o[13] = y; o[14] = z; o[15] = f; };
  const armL = (x, y, z, f) => { o[16] = x; o[17] = y; o[18] = z; o[19] = f; };
  const legR = (x, z, k, a = 0) => { o[20] = x; o[21] = z; o[22] = k; o[23] = a; };
  const legL = (x, z, k, a = 0) => { o[24] = x; o[25] = z; o[26] = k; o[27] = a; };
  switch (c) {
    case 0: { // floss: arms swing across, hips opposite
      const sw = Math.sin(w * 2);
      armR(0.35, 0, 0.1 + 0.55 * sw + 0.45, 0.2);
      armL(0.35, 0, -0.1 + 0.55 * sw - 0.45, 0.2);
      o[5] = -0.07 * sw; o[4] = -0.14 * sw; o[3] = 0.15 * sw; o[7] = -0.3 * sw; o[8] = 0.08 * sw;
      o[0] = -0.06 + Math.abs(cc) * 0.03; o[9] = 0.1; o[10] = sw * 0.2;
      legR(0.15, 0.12, 0.45 + 0.15 * sw); legL(0.15, -0.12, 0.45 - 0.15 * sw);
      break;
    }
    case 1: { // disco point: one arm up, the other on the hip, swapping on the beat
      const u = 0.5 + 0.5 * Math.tanh(s * 1.7); // 1 = right arm up
      const L = (a, b) => a + (b - a) * u;
      armR(L(0.5, 2.7), 0, L(0.55, 0.5), L(1.75, 0.1));
      armL(L(2.7, 0.5), 0, L(-0.5, -0.55), L(0.1, 1.75));
      const up = u * 2 - 1;
      o[1] = -up * 0.12; o[4] = up * 0.18; o[5] = up * 0.05; o[7] = up * 0.25; o[10] = -up * 0.25; o[9] = -0.1;
      o[0] = -0.08 + 0.03 * Math.abs(cc);
      legR(0.1 + 0.2 * u, 0.2, 0.5, 0); legL(0.1 + 0.2 * (1 - u), -0.2, 0.5, 0);
      break;
    }
    case 2: { // the shuffle: legs run in place, arms pump
      const f = t * Math.PI * 2 * 3.2;
      const sa = Math.sin(f), sb = Math.sin(f + Math.PI);
      legR(0.55 * sa, 0.06, 0.15 + 0.9 * Math.max(0, -Math.cos(f)), -0.2); legL(0.55 * sb, -0.06, 0.15 + 0.9 * Math.max(0, Math.cos(f)), -0.2);
      armR(0.9 * sb, 0, 0.12, 1.5); armL(0.9 * sa, 0, -0.12, 1.5);
      o[0] = Math.abs(Math.sin(f)) * 0.07 - 0.07; o[3] = 0.18 * sa; o[7] = -0.3 * sa; o[6] = -0.12; o[9] = 0.1;
      break;
    }
    case 3: { // spin with both hands up
      const k = t / MOVE_LEN;
      o[2] = ease.smooth(k) * Math.PI * 2 - (k > 0.5 ? Math.PI * 2 : 0); // continuous, ends at 0
      armR(2.9, 0, 0.35 + 0.15 * s, 0.15); armL(2.9, 0, -0.35 + 0.15 * s, 0.15);
      o[0] = -0.1 + 0.05 * Math.sin(k * Math.PI); o[6] = 0.05; o[9] = 0.2; o[11] = 0.15 * s;
      legR(0.1, 0.12, 0.7, 0); legL(0.2, -0.12, 0.5, 0);
      break;
    }
    default: { // the wave: arms up, wiggling hands, hips swaying
      const sw = Math.sin(w * 1.3);
      armR(2.5 + 0.35 * sw, 0, 0.3 + 0.35 * cc, 0.4 + 0.4 * sw); armL(2.5 - 0.35 * sw, 0, -0.3 - 0.35 * cc, 0.4 - 0.4 * sw);
      o[5] = 0.09 * sw; o[4] = 0.14 * sw; o[3] = 0.2 * sw; o[7] = -0.25 * sw; o[8] = -0.1 * sw; o[0] = -0.1 + 0.04 * Math.abs(cc);
      o[10] = 0.3 * sw; o[9] = -0.1;
      legR(0.05, 0.2 + 0.1 * sw, 0.55, 0); legL(0.05, -0.2 + 0.1 * sw, 0.55, 0);
    }
  }
}

export function poseDance(A, dt) {
  const m = A.m;
  const t = A.t - A.danceT0;
  const idx = Math.floor(t / MOVE_LEN);
  const lt = t - idx * MOVE_LEN;
  const mv = idx % MOVES;
  danceMove(m, lt, mv, _P);
  // blend into the next move over the last 0.2 s
  const nb = ramp(MOVE_LEN - 0.22, MOVE_LEN, lt);
  if (nb > 0) {
    danceMove(m, lt - MOVE_LEN, (mv + 1) % MOVES, _P2);
    const k = ease.smooth(nb);
    for (let i = 0; i < NCH; i++) _P[i] = lerp(_P[i], _P2[i], k);
  }
  neutral(m);
  const P = _P;
  m.body.position.set(0, P[0], 0);
  eul(m.body.quaternion, 0, P[2], P[1]);
  m.pelvis.position.set(P[5], RIG.hipY - 0.01 + Math.min(0, P[0]) * 0.0, 0);
  eul(m.pelvis.quaternion, 0, P[3], P[4]);
  eul(m.torso.quaternion, P[6], P[7], P[8]);
  eul(m.neck.quaternion, P[9] * 0.4, P[10] * 0.4, P[11] * 0.4);
  eul(m.head.quaternion, P[9] * 0.6, P[10] * 0.6, P[11] * 0.6);
  setArm(m.armR, P[12], P[13], P[14], P[15]);
  setArm(m.armL, P[16], P[17], P[18], P[19]);
  setLeg(m.legR, P[20], 0, P[21], P[22], P[23]);
  setLeg(m.legL, P[24], 0, P[25], P[26], P[27]);
  // knees bending lowers the pelvis; keep the feet near the floor
  const bend = Math.max(P[22], P[26]);
  m.pelvis.position.y -= Math.min(0.3, bend * 0.14 - Math.max(0, P[0]));
}

// ---------------------------------------------------------------------------
// tumbling after an explosion / impulse: head over heels, limbs flailing
// ---------------------------------------------------------------------------
const _tq = new THREE.Quaternion();
export function poseTumble(A, dt) {
  const ch = A.ch, m = A.m, tb = A.tumble;
  tb.t += dt;
  const t = A.t;
  tb.rx += tb.wx * dt; tb.rz += tb.wz * dt;
  const damp = Math.exp(-0.6 * dt);
  tb.wx *= damp; tb.wz *= damp;
  neutral(m);
  bodyAbout(m, eul(_tq, tb.rx, 0, tb.rz), 0, 0, 0);
  const f = (k) => Math.sin(t * 9 + k) * 0.5;
  eul(m.head.quaternion, 0.2 + f(1) * 0.3, f(2) * 0.3, 0);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? 1 : -1;
    setArm(i === 0 ? m.armR : m.armL, 1.9 + f(side) * 0.8, 0, side * (1.0 + 0.4 * f(side + 3)), 0.5 + 0.3 * f(side * 2));
    setLeg(i === 0 ? m.legR : m.legL, 0.5 + f(side * 4) * 0.6, 0, side * 0.25, 0.9 + f(side * 5) * 0.4, -0.2);
  }
}
