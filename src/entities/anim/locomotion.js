import * as THREE from 'three';
import { RIG } from '../../charmodel.js';
import { clamp, lerp, smoothstep } from '../../util.js';
import { ease, ramp } from './ik.js';

// ---------------------------------------------------------------------------
// Gait: feet follow a trajectory that is locked to the distance travelled (no foot sliding in stance),
// the pelvis height follows from what the legs can reach. Strafing and backpedalling just rotate the
// stride direction relative to the body.
// ---------------------------------------------------------------------------

const STAND_Y = 0.897;
const CROUCH_Y = 0.54;
const ANKLE = RIG.ankle;
const LMAX = (RIG.thigh + RIG.shin) * 0.995;

export const GAIT = {
  /** Distance covered per full cycle (two steps) at ground speed v (m/s). */
  strideLen(v, crouch) {
    const s = 0.75 + 0.33 * v - 0.0105 * v * v;
    return Math.max(0.7, Math.min(3.4, s)) * (1 - 0.22 * crouch);
  },
};

const _o = { x: 0, y: 0, z: 0, yaw: 0, roll: 0 };
const _e = new THREE.Euler();
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _q3 = new THREE.Quaternion();

/** Soft minimum so the pelvis height has no kinks. */
const smin = (a, b, k) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
};

export function gaitLegs(A, dt, sv, move, crouch, dirX, dirZ, stride, air, lod) {
  const L = A.legs;
  const ch = A.ch;
  const runT = smoothstep(2.4, 5.8, sv), sprT = smoothstep(7.4, 9.4, sv);
  let duty = lerp(lerp(0.62, 0.47, runT), 0.4, sprT) + 0.08 * crouch;
  duty = Math.min(0.7, duty);
  const lift = Math.max(0.075, lerp(lerp(0.06, 0.14, runT), 0.22, sprT) * (1 - 0.3 * crouch));
  const D = duty * stride * move;
  const aim = A.sAim * (1 - move);
  const widen = 0.02 + 0.03 * aim + 0.02 * crouch - 0.025 * runT;
  const footX = RIG.hipX + widen;
  const cross = Math.abs(dirX);
  const hold = A.hold;
  let stanceW0 = 0, stanceW1 = 0;
  let sNorm0 = 0, sNorm1 = 0;
  let yNeedMin = 9;
  const hipZ = 0;
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? 1 : -1;
    let phi = (A.phase + 0.5 * i) % 1;
    let s, y = 0, pitch = 0, stance = 0;
    if (phi < duty) {
      const u = phi / duty;
      s = D * (0.5 - u);
      stance = 1;
      // heel strike, flat, then rolling onto the toes
      pitch = 0.3 * (1 - ramp(0, 0.16, u)) * runT * 0.7 + (0.1 * (1 - ramp(0, 0.16, u)));
      const roll = ramp(0.58, 1, u);
      const p = -0.8 * Math.pow(roll, 1.4) * (0.5 + 0.5 * move);
      pitch += p;
      y = 0.17 * Math.sin(Math.max(0, -p));
    } else {
      const u = (phi - duty) / (1 - duty);
      const m = -D * (1 - duty) / duty * 0.85;
      const u2 = u * u, u3 = u2 * u;
      s = (2 * u3 - 3 * u2 + 1) * (-D / 2) + (u3 - 2 * u2 + u) * m + (-2 * u3 + 3 * u2) * (D / 2) + (u3 - u2) * m;
      y = lift * Math.sin(Math.PI * Math.pow(u, 0.75));
      pitch = lerp(-0.7, 0.28, ease.smooth(Math.pow(u, 0.8))) * (0.4 + 0.6 * move);
    }
    // stagger the feet in the aiming stance
    const stag = side > 0 ? 0.07 : -0.09;
    let fx = side * footX + dirX * s;
    let fz = dirZ * s + stag * aim;
    if (stance === 0) fz += -cross * 0.07 * Math.sin(Math.PI * clamp((phi - duty) / (1 - duty), 0, 1));
    const tgt = L.tgt[i];
    tgt.set(fx, ANKLE + y, fz);
    L.pitch[i] = pitch;
    L.stance[i] = stance;
    L.s[i] = D > 1e-4 ? s / D : 0;
    // height the pelvis needs for this foot to be reachable
    const hx = fx - side * RIG.hipX, hz = fz - hipZ;
    const need = ANKLE + y + Math.sqrt(Math.max(0.05, LMAX * LMAX - hx * hx - hz * hz));
    yNeedMin = i === 0 ? need : smin(yNeedMin, need, 0.03);
    if (i === 0) { stanceW0 = stance; sNorm0 = L.s[0]; } else { stanceW1 = stance; sNorm1 = L.s[1]; }
  }
  // pelvis height
  let flight = 0;
  {
    const ph = A.phase % 0.5, span = 0.5 - duty;
    const u = span > 0.02 ? (ph - duty) / span : -1;
    if (u > 0 && u < 1) flight = Math.sin(u * Math.PI);
  }
  const bend = 0.015 * ramp(0.3, 2, sv) + 0.045 * runT + 0.02 * sprT;
  let yBase = lerp(STAND_Y, CROUCH_Y, crouch) - bend * (1 - crouch);
  yBase += (0.04 * runT + 0.035 * sprT) * flight * move * (1 - crouch);
  const y = smin(yBase, yNeedMin, 0.03);
  // sway toward the planted foot, hips tilt, shoulders counter-rotate
  const lat = (stanceW0 - stanceW1);
  _o.x = lat * 0.02 * move * (1 - 0.5 * crouch);
  _o.y = y;
  _o.z = 0;
  _o.roll = lat * 0.045 * move * (0.4 + 0.6 * ramp(0, 4, sv));
  _o.yaw = (sNorm0 - sNorm1) * 0.5 * (0.16 + 0.12 * runT) * move * Math.max(0.3, -dirZ);
  return _o;
}

// ---------------------------------------------------------------------------
// airborne legs (FK): hurdle pose on the way up, tucked at the apex, reaching down on the way down
// ---------------------------------------------------------------------------
const AXX = new THREE.Vector3(1, 0, 0);

export function fkLegsAir(A, leg, side, air, qIK = null, flexIK = 0, qFootIK = null) {
  const ch = A.ch;
  const vy = ch.vel.y;
  const rise = smoothstep(-2, 5, vy);
  const fall = 1 - rise;
  const lead = (A.jumpSide || 1) === side;
  const spread = 0.1 + 0.08 * fall;
  let hipX, knee;
  if (lead) { hipX = lerp(0.3, 0.8, rise) + 0.1 * Math.sin(A.t * 7 + side) * fall * 0; knee = lerp(0.5, 1.15, rise); }
  else { hipX = lerp(0.12, -0.3, rise); knee = lerp(0.5, 1.2, rise); }
  // reaching for the ground when falling fast
  const reach = smoothstep(6, 20, -vy);
  hipX = lerp(hipX, 0.28, reach); knee = lerp(knee, 0.3, reach);
  const flutter = Math.sin(A.t * 11 + side * 2) * 0.06 * reach;
  _q.setFromEuler(_e.set(hipX + flutter, 0, side * spread, 'YXZ')); // thigh
  _q2.setFromAxisAngle(AXX, -knee);
  _q3.setFromEuler(_e.set(lerp(0.0, -0.5, rise) + 0.25 * fall, 0, 0, 'YXZ')); // toes pointing down on the way up
  if (qIK) {
    leg.l.quaternion.copy(qIK).slerp(_q, air);
    leg.shin.quaternion.setFromAxisAngle(AXX, -lerp(flexIK, knee, air));
    leg.foot.quaternion.copy(qFootIK).slerp(_q3, air);
  } else {
    leg.l.quaternion.copy(_q);
    leg.shin.quaternion.copy(_q2);
    leg.foot.quaternion.copy(_q3);
  }
}
