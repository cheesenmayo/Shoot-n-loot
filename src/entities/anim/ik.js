import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Small allocation-free math helpers for the procedural animation system:
// two-bone IK (arms and legs hang along local -Y), critically damped springs, easing.
// ---------------------------------------------------------------------------

const _d = new THREE.Vector3();
const _n = new THREE.Vector3();
const _e = new THREE.Vector3();
const _u = new THREE.Vector3();
const _v = new THREE.Vector3();
const _b = new THREE.Vector3();
const _bx = new THREE.Vector3();
const _by = new THREE.Vector3();
const _bz = new THREE.Vector3();
const _qf = new THREE.Quaternion();
const _qx = new THREE.Quaternion();
const _ax = new THREE.Vector3(1, 0, 0);

/** Result of the last solveTwoBone() call (reused, never allocated). */
export const IK = { flex: 0 };

/** Quaternion from the columns of an orthonormal basis. */
export function quatFromBasis(out, x, y, z) {
  const m11 = x.x, m21 = x.y, m31 = x.z, m12 = y.x, m22 = y.y, m32 = y.z, m13 = z.x, m23 = z.y, m33 = z.z;
  const tr = m11 + m22 + m33;
  if (tr > 0) {
    const s = 0.5 / Math.sqrt(tr + 1);
    out.set((m32 - m23) * s, (m13 - m31) * s, (m21 - m12) * s, 0.25 / s);
  } else if (m11 > m22 && m11 > m33) {
    const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
    out.set(0.25 * s, (m12 + m21) / s, (m13 + m31) / s, (m32 - m23) / s);
  } else if (m22 > m33) {
    const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
    out.set((m12 + m21) / s, 0.25 * s, (m23 + m32) / s, (m13 - m31) / s);
  } else {
    const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
    out.set((m13 + m31) / s, (m23 + m32) / s, 0.25 * s, (m21 - m12) / s);
  }
  return out;
}

/**
 * Two-bone IK in the parent's space. Both bones hang along local -Y when un-rotated.
 * S = joint origin, T = wanted end position, pole = direction the middle joint (elbow / knee) should
 * point to, zSign = -1 for arms (the forearm flexes toward -Z), +1 for legs (the shin flexes toward +Z).
 * Writes the upper bone orientation into outQ and the (positive) flexion angle into IK.flex; the lower
 * bone's local rotation is then R_x(-zSign * flex).
 */
export function solveTwoBone(outQ, S, T, pole, l1, l2, zSign) {
  _d.subVectors(T, S);
  let L = _d.length();
  if (L < 1e-5) { _d.set(0, -1, 0); L = 1e-5; } else _d.multiplyScalar(1 / L);
  const maxL = (l1 + l2) * 0.9995, minL = Math.abs(l1 - l2) + 0.02;
  const Lc = L > maxL ? maxL : L < minL ? minL : L;
  // elbow: on the circle around the S-T axis, pushed toward the pole
  const a = (l1 * l1 - l2 * l2 + Lc * Lc) / (2 * Lc);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  _n.copy(pole);
  _n.addScaledVector(_d, -_n.dot(_d));
  let nl = _n.length();
  if (nl < 1e-4) {
    if (Math.abs(_d.x) < 0.9) _n.set(1, 0, 0); else _n.set(0, 0, 1);
    _n.addScaledVector(_d, -_n.dot(_d));
    nl = _n.length();
  }
  _n.multiplyScalar(1 / nl);
  _e.copy(_d).multiplyScalar(a).addScaledVector(_n, h); // elbow relative to S
  _u.copy(_e).multiplyScalar(1 / l1);
  // lower bone direction (towards the reachable end point)
  _v.copy(_d).multiplyScalar(Lc).sub(_e).multiplyScalar(1 / l2);
  const cosF = Math.max(-1, Math.min(1, _u.dot(_v)));
  IK.flex = Math.acos(cosF);
  // bend direction: the part of the lower bone that is perpendicular to the upper bone. For a (nearly) straight
  // limb that direction is numerical noise, so it fades to the pole-based direction (no roll flips)
  _bx.copy(_n).multiplyScalar(-1).addScaledVector(_u, _n.dot(_u));
  let pl = _bx.length();
  if (pl < 1e-6) { _bx.set(0, 0, 1).addScaledVector(_u, -_u.z); pl = _bx.length() || 1; }
  _bx.multiplyScalar(1 / pl);
  _b.copy(_v).addScaledVector(_u, -_v.dot(_u));
  const bl = _b.length();
  const wg = bl < 1e-6 ? 0 : Math.min(1, Math.max(0, (IK.flex - 0.03) / 0.22));
  if (wg > 0) _b.multiplyScalar(wg / bl).addScaledVector(_bx, 1 - wg); else _b.copy(_bx);
  _b.normalize();
  _by.copy(_u).multiplyScalar(-1);
  _bz.copy(_b).multiplyScalar(zSign);
  _bx.crossVectors(_by, _bz);
  quatFromBasis(outQ, _bx, _by, _bz);
  return outQ;
}

/** Local rotation of the end bone (hand / foot) so that it reaches the wanted parent-space orientation. */
export function endLocal(outQ, qUpper, flex, zSign, qWanted, maxAngle) {
  _qx.setFromAxisAngle(_ax, -zSign * flex);
  _qf.copy(qUpper).multiply(_qx);
  outQ.copy(_qf).invert().multiply(qWanted);
  if (maxAngle > 0) {
    if (outQ.w < 0) { outQ.x = -outQ.x; outQ.y = -outQ.y; outQ.z = -outQ.z; outQ.w = -outQ.w; }
    const ang = 2 * Math.acos(Math.min(1, outQ.w));
    if (ang > maxAngle) {
      const s = Math.sin(maxAngle / 2) / Math.max(1e-6, Math.sin(ang / 2));
      outQ.set(outQ.x * s, outQ.y * s, outQ.z * s, Math.cos(maxAngle / 2));
    }
  }
  return outQ;
}

/** Position of the end of the lower bone given the final joint rotations (forward kinematics). */
export function chainEnd(out, S, qUpper, flex, zSign, l1, l2) {
  out.set(0, -l1, 0).applyQuaternion(qUpper).add(S);
  _qx.setFromAxisAngle(_ax, -zSign * flex);
  _qf.copy(qUpper).multiply(_qx);
  _v.set(0, -l2, 0).applyQuaternion(_qf);
  return out.add(_v);
}

/** Orientation of the lower bone in the parent's space. */
export function lowerQuat(out, qUpper, flex, zSign) {
  _qx.setFromAxisAngle(_ax, -zSign * flex);
  return out.copy(qUpper).multiply(_qx);
}

// ---------------------------------------------------------------------------
// springs
// ---------------------------------------------------------------------------

/** Critically damped spring step on arrays (x, v at index i). Returns nothing, updates X[i], V[i]. */
export function spring(X, V, i, target, omega, dt) {
  const n = X[i] - target;
  const e = Math.exp(-omega * dt);
  const t1 = (V[i] + omega * n) * dt;
  X[i] = target + (n + t1) * e;
  V[i] = (V[i] - omega * t1) * e;
}

/** Under-damped spring step (zeta < 1) used for secondary motion and hit reactions. */
export function springZ(X, V, i, target, omega, zeta, dt) {
  // semi-implicit Euler with sub-steps keeps it stable for any frame time
  const steps = Math.min(8, Math.ceil(dt * omega * 3));
  const h = dt / steps;
  let x = X[i], v = V[i];
  for (let s = 0; s < steps; s++) {
    v += (-omega * omega * (x - target) - 2 * zeta * omega * v) * h;
    x += v * h;
  }
  X[i] = x; V[i] = v;
}

export const ease = {
  smooth: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t)),
  smoother: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (t * (t * 6 - 15) + 10)),
  inQuad: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t),
  outQuad: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - (1 - t) * (1 - t)),
  inCubic: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * t),
  outCubic: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3)),
  outBack: (t) => { if (t <= 0) return 0; if (t >= 1) return 1; const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
};

/** 0..1 ramp of t between a and b, clamped. */
export const ramp = (a, b, t) => (t <= a ? 0 : t >= b ? 1 : (t - a) / (b - a));
