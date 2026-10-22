import * as THREE from 'three';
import { RIG } from '../../charmodel.js';
import { clamp, lerp, mulberry32 } from '../../util.js';
import { ease } from './ik.js';
import { setArm, setLeg, eul, neutral } from './poses.js';

// ---------------------------------------------------------------------------
// Death: the body topples about its feet like an inverted pendulum (forward / backward / sideways depending
// on where the hit came from), limbs are under-damped springs that flop and settle, bodies eliminated in the
// air tumble until they hit the ground. Everything is a few springs; no physics engine.
// ---------------------------------------------------------------------------

const HALF_PI = Math.PI / 2;
const _q = new THREE.Quaternion();
const _ax = new THREE.Vector3();

// limb channels: 0 R arm (x, z, flex), 1 L arm, 2 R leg (x, z, knee), 3 L leg, 4 head (x, y, z), 5 spine (x, y, z)
const NL = 18;

export class DeathSim {
  constructor(A) {
    this.A = A;
    this.X = new Float64Array(NL);
    this.V = new Float64Array(NL);
    this.R = new Float64Array(NL); // rest values when lying
    this.started = false;
    this.t = 0;
    this.th = 0; this.om = 0;
    this.dx = 0; this.dz = 1;
    this.air = false; this.landed = false; this.landT = 0;
    this.settled = false;
    this.spin = 0;
    this.power = 0.4;
    this.lift = 0.14;
  }

  /** info: { dx, dz (fall direction in body space, unit), power 0..1, headshot, airborne } */
  start(info) {
    const A = this.A, m = A.m;
    this.started = true; this.settled = false; this.landed = false; this.landT = 0; this.t = 0;
    this.dx = info.dx; this.dz = info.dz;
    this.power = clamp(info.power ?? 0.4, 0.1, 1);
    this.air = !!info.airborne;
    const rng = mulberry32(A.seed * 31 + 7);
    const r = () => rng();
    const side = Math.abs(this.dx) > Math.abs(this.dz);
    this.th = 0.03; this.om = 0.7 + this.power * 3.2 + (info.headshot ? 1.2 : 0);
    this.spin = this.air ? (3 + r() * 4) * (r() < 0.5 ? -1 : 1) : 0;
    // current joint angles become the starting point
    const X = this.X, V = this.V, R = this.R;
    const arms = [m.armR, m.armL], legs = [m.legR, m.legL];
    for (let i = 0; i < 2; i++) {
      const a = arms[i].a.rotation;
      X[i * 3] = a.x; X[i * 3 + 1] = a.z; X[i * 3 + 2] = arms[i].fore.rotation.x;
      const l = legs[i].l.rotation;
      X[6 + i * 3] = l.x; X[6 + i * 3 + 1] = l.z; X[6 + i * 3 + 2] = -legs[i].shin.rotation.x;
    }
    X[12] = m.head.rotation.x; X[13] = m.head.rotation.y; X[14] = m.head.rotation.z;
    X[15] = m.torso.rotation.x; X[16] = m.torso.rotation.y; X[17] = m.torso.rotation.z;
    V.fill(0);
    // rest pose when lying: sprawled
    for (let i = 0; i < 2; i++) {
      const sd = i === 0 ? 1 : -1;
      R[i * 3] = (r() - 0.3) * 1.0;
      R[i * 3 + 1] = sd * lerp(0.9 + r() * 0.6, 0.35 + r() * 0.3, side ? 0.8 : 0);
      R[i * 3 + 2] = 0.1 + r() * 0.9;
      R[6 + i * 3] = (r() - 0.5) * 0.7;
      R[6 + i * 3 + 1] = sd * (0.12 + r() * 0.3);
      R[6 + i * 3 + 2] = 0.1 + r() * 0.7;
    }
    R[12] = (this.dz > 0 ? -0.35 : 0.3) + (r() - 0.5) * 0.3; R[13] = (r() - 0.5) * 0.7; R[14] = (r() - 0.5) * 0.4;
    R[15] = (r() - 0.5) * 0.15; R[16] = (r() - 0.5) * 0.5; R[17] = (r() - 0.5) * 0.2;
    // initial kicks from the hit
    const k = 3 + this.power * 6;
    for (let i = 0; i < 12; i++) V[i] = (r() - 0.5) * k;
    V[12] = (info.headshot ? 7 : 2.5) * (this.dz > 0 ? -1 : 1) + (r() - 0.5) * 3;
    V[13] = (r() - 0.5) * (info.headshot ? 12 : 4);
  }

  onGround() {
    if (this.landed) return;
    this.landed = true; this.landT = 0;
    const V = this.V;
    const k = 2 + this.power * 4;
    for (let i = 0; i < 12; i++) V[i] += (Math.random() - 0.5) * k;
    this.A.footFall = 1;
  }

  update(dt) {
    if (!this.started) { this.start({ dx: 0, dz: 1, power: 0.3 }); }
    if (this.settled) return;
    const A = this.A, m = A.m, X = this.X, V = this.V, R = this.R;
    this.t += dt;
    const ch = A.ch;
    if (!this.landed && ch.deadGround) this.onGround();
    if (this.landed) this.landT += dt;
    // pendulum
    let th = this.th, om = this.om;
    if (this.air && !this.landed) {
      th += this.spin * dt;
      om = 0;
    } else {
      if (this.air && this.landed && this.landT < 0.02) {
        // bring the spin angle to the nearest lying angle
        th = th % (Math.PI * 2);
        if (th > Math.PI) th -= Math.PI * 2;
        if (th < -Math.PI) th += Math.PI * 2;
        th = clamp(th, -2.2, 2.2);
        om = 0;
        if (th < 0) th = -th; // always rotate toward the fall direction
        if (th < HALF_PI) om = 2 + this.power * 2;
      }
      const steps = Math.max(1, Math.ceil(dt / 0.012));
      const h = dt / steps;
      for (let s = 0; s < steps; s++) {
        if (th < HALF_PI - 0.03) {
          om += (16 * Math.sin(th) + 1.6) * h;
          th += om * h;
          if (th >= HALF_PI - 0.03) {
            th = HALF_PI - 0.03;
            om = -om * 0.22;
            if (!this.landed) this.onGround();
          }
        } else {
          // resting on the ground, small bounce settling
          om += (-60 * (th - (HALF_PI - 0.03))) * h;
          om *= Math.exp(-9 * h);
          th += om * h;
          if (th > HALF_PI - 0.03) { th = HALF_PI - 0.03; if (om > 0) om = 0; }
        }
      }
    }
    this.th = th; this.om = om;
    const tn = clamp(th / HALF_PI, 0, 1);

    // limbs: under-damped springs toward a rest pose that blends from hanging to sprawled
    const w0 = 11, zeta = 0.34;
    for (let i = 0; i < NL; i++) {
      let target;
      if (i < 12) {
        const k = i % 3;
        const hang = k === 0 ? 0.06 : k === 1 ? (i < 6 ? (i === 1 ? 0.12 : -0.12) : (i === 7 ? 0.1 : -0.1)) : 0.16;
        target = lerp(hang, R[i], tn);
        if (i >= 6 && k === 2) target = lerp(0.12, R[i], tn);
      } else target = lerp(X[i] * 0.2, R[i], Math.min(1, tn * 1.4));
      const steps = Math.max(1, Math.ceil(dt * w0 * 3));
      const h = dt / steps;
      let x = X[i], v = V[i];
      for (let s = 0; s < steps; s++) {
        v += (-w0 * w0 * (x - target) - 2 * zeta * w0 * v) * h;
        x += v * h;
      }
      X[i] = x; V[i] = v;
    }
    // the right-arm / leg splay signs: left side mirrors on z (rest already carries the sign)
    neutral(m);
    // fall direction: axis perpendicular to the up vector and the fall direction (body space)
    _ax.set(this.dz, 0, -this.dx);
    _q.setFromAxisAngle(_ax, th);
    m.body.quaternion.copy(_q);
    const lift = (0.13 + 0.2 * Math.max(0, this.dz) + 0.08 * Math.abs(this.dx)) * ease.smooth(tn);
    m.body.position.set(0, lift, 0);
    // knees buckle while falling
    m.pelvis.position.y = RIG.hipY - 0.01 - 0.2 * ease.smooth(clamp(th / 0.9, 0, 1)) * (1 - tn * 0.5);
    eul(m.torso.quaternion, X[15], X[16], X[17]);
    eul(m.neck.quaternion, X[12] * 0.4, X[13] * 0.4, X[14] * 0.4);
    eul(m.head.quaternion, X[12] * 0.6, X[13] * 0.6, X[14] * 0.6);
    setArm(m.armR, X[0], 0, X[1], clamp(X[2], -0.1, 2.4));
    setArm(m.armL, X[3], 0, X[4], clamp(X[5], -0.1, 2.4));
    setLeg(m.legR, X[6], 0, X[7], clamp(X[8], -0.05, 2.2), -0.2);
    setLeg(m.legL, X[9], 0, X[10], clamp(X[11], -0.05, 2.2), -0.2);
    if (this.landed && this.landT > 3 && Math.abs(om) < 0.01) {
      let still = true;
      for (let i = 0; i < NL; i++) if (Math.abs(V[i]) > 0.02) { still = false; break; }
      if (still) this.settled = true;
    }
  }
}
