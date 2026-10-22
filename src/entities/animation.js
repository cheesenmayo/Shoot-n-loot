import * as THREE from 'three';
import { RIG } from '../charmodel.js';
import { clamp, lerp, wrapAngle } from '../util.js';
import { solveTwoBone, IK, endLocal, spring, springZ, ease, ramp } from './anim/ik.js';
import { Hold, computeHold, applyEquip, makeItemInfo, PALM, KICK, Q_GUN } from './anim/holds.js';
import { gaitLegs, fkLegsAir, GAIT } from './anim/locomotion.js';
import { poseSwim, poseSkydive, poseGlide, poseDance, poseTumble } from './anim/poses.js';
import { DeathSim } from './anim/death.js';
import {
  S_SPEED, S_MOVE, S_CROUCH, S_AIR, S_AIM, S_ADS, S_SPRINT, S_RW, S_LW, S_LEANF, S_LEANS, S_TURN, S_HEADX, S_HEADY, S_DIRX, S_DIRZ, S_IDLEY, S_IDLEP,
  Z_DIP, Z_KB, Z_KP, Z_KR, Z_ROCK, Z_HX, Z_HZ, Z_HY, Z_HEADX, Z_HEADY, Z_PONY, Z_PONYZ, NS,
} from './anim/slots.js';

// ---------------------------------------------------------------------------
// Procedural character animation. One Animator per Character; everything is driven from the Character's
// simulation state (velocity, stance, combat timers) and written to the model's joints.
//
//  - locomotion: distance-driven gait, the feet are IK targets that move with the ground speed, the pelvis
//    height follows from leg reach (bob, knee bend and landing absorb come out of it)
//  - holds: a weapon / item pose in torso space, two-bone IK for both arms (right hand = grip, left = support)
//  - additive layers: breathing, recoil, hit flinch, head look; all state changes go through springs
//  - families (swim, skydive, glide, dance, tumble, dead) are separate pose generators; switching family
//    cross-fades from a snapshot of the last pose so nothing pops
// ---------------------------------------------------------------------------

export const FAMILY = { GROUND: 0, SWIM: 1, SKYDIVE: 2, GLIDE: 3, DANCE: 4, TUMBLE: 5, DEAD: 6 };
const XFADE = [0.18, 0.3, 0.3, 0.3, 0.22, 0.12, 0.12];

const _q = new THREE.Quaternion();
const _v = new THREE.Vector3(), _v3 = new THREE.Vector3();
const _qp = new THREE.Quaternion(), _qs = new THREE.Quaternion(), _qtb = new THREE.Quaternion(), _qtbi = new THREE.Quaternion();
const _qaim = new THREE.Quaternion(), _qsp = new THREE.Quaternion();
const _S = new THREE.Vector3(), _T = new THREE.Vector3();
const _Q1 = new THREE.Quaternion(), _Q2 = new THREE.Quaternion(), _Q3 = new THREE.Quaternion(), _Q4 = new THREE.Quaternion();
const _wp = new THREE.Vector3(), _wq = new THREE.Quaternion();
const _hp = new THREE.Vector3(), _hq = new THREE.Quaternion();
const _pole = new THREE.Vector3();
const _tp = new THREE.Vector3(), _tq = new THREE.Quaternion();
const ID = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);
const AX = new THREE.Vector3(1, 0, 0);
const _qOffInv = new THREE.Quaternion();
const _m4 = new THREE.Matrix4();
const _eul = new THREE.Euler();

const SHOULDER_X = RIG.shoulderX, SHOULDER_Y = RIG.shoulderY;
const UA = RIG.upperArm, FA = RIG.foreArm;
const REACH = (UA + FA) * 0.97;
const SR = new THREE.Vector3(SHOULDER_X, SHOULDER_Y, 0), SL = new THREE.Vector3(-SHOULDER_X, SHOULDER_Y, 0);

/** Quaternion from pitch (x), yaw (y), roll (z) applied in YXZ order. */
export function qeul(out, x, y, z) {
  return out.setFromEuler(_eul.set(x, y, z, 'YXZ'));
}

export class Animator {
  constructor(ch) {
    this.ch = ch;
    const m = this.m = ch.model;
    this.J = [m.body, m.pelvis, m.torso, m.neck, m.head, m.armR.a, m.armR.fore, m.armR.hand, m.armL.a, m.armL.fore, m.armL.hand,
      m.legR.l, m.legR.shin, m.legR.foot, m.legL.l, m.legL.shin, m.legL.foot];
    this.snapQ = this.J.map(() => new THREE.Quaternion());
    this.snapP = [new THREE.Vector3(), new THREE.Vector3()];
    this.X = new Float64Array(NS);
    this.V = new Float64Array(NS);
    this.hold = new Hold();
    this.family = FAMILY.GROUND;
    this.xf = 0; this.xfDur = 0.2;
    this.t = (ch.seed * 7.31) % 50; // desynchronise idle motion between characters
    this.seed = ch.seed;
    this.legs = { tgt: [new THREE.Vector3(), new THREE.Vector3()], pitch: [0, 0], stance: [0, 0], s: [0, 0] };
    // held item
    this.info = null; this.itemObj = null; this.heldDef = null;
    this.propMesh = null;
    // smoothed hand targets
    this.cwp = new THREE.Vector3(0.2, 0.2, -0.2); this.cwq = new THREE.Quaternion();
    this.clp = new THREE.Vector3(); this.clq = new THREE.Quaternion();
    this.overL = 0; this.overR = 0; // how far the last hand targets were beyond the arm's reach
    this.lAbsPrev = false; this.wpLast = new THREE.Vector3(); this.wqLast = new THREE.Quaternion();
    this.qAim = new THREE.Quaternion(); this.qAimEff = new THREE.Quaternion();
    this.coq = new THREE.Quaternion().copy(Q_GUN); // item rotation in the hand (smoothed)
    // action timers
    this.swingK = -1; this.swingCount = 0; this.prevSwingT = 0;
    this.throwK = -1; this.throwRel = -99; this.prevThrowT = 0;
    this.gadgetK = -1; this.gadgetT0 = -99;
    this.using = null; this.chew = 0;
    this.reloadLoops = 3; this.reloadStep = 0;
    this.equipDur = 0.3; this.prevEquipT = 0; this.equipK = 0;
    this.actionId = 0; this.actionSince = 0;
    // motion history
    this.pvx = 0; this.pvz = 0; this.pvy = 0; this.pYaw = 0;
    this.fwdAcc = 0; this.sideAcc = 0;
    this.justJumped = false; this.jumpSide = 1; this.padT = -9;
    // face / look
    this.blinkT = 1 + (ch.seed % 5); this.lidT = 0;
    this.lookT = 2 + (ch.seed % 3); this.lookY = 0; this.lookP = 0;
    this.fpv = false;
    this.fire = 0;
    this.spin = 0;
    this.sAim = 0; this.sAds = 0; this.sSprint = 0;
    this.holdKind = 0;
    this.death = new DeathSim(this);
    this.tumble = { active: false, rx: 0, rz: 0, wx: 0, wz: 0, t: 0 };
    this.danceT0 = 0;
    this.kickCat = 'rifle';
    this.headQ = new THREE.Quaternion();
    this.phase = 0.25;
    this.X[S_DIRZ] = -1;
  }

  // ------------------------------------------------------------------------------------------------
  // held item
  // ------------------------------------------------------------------------------------------------
  setHeld(model, def) {
    this.itemObj = model;
    this.heldDef = def;
    this.info = model && def ? makeItemInfo(def, model) : null;
    if (model) {
      model.position.copy(PALM);
      model.visible = true;
      model.scale.setScalar(1);
    }
    this.kickCat = def && def.kind === 'gun' ? (def.cat in KICK ? def.cat : 'rifle') : def && def.kind === 'gadget' ? 'gadget' : 'rifle';
    this.actionId = -1; this.actionSince = 0; // start blending slowly into the new item's pose
  }

  /** Events from the Character (see character.js): shoot, hit, headshot, land, jump, pad, gadget, reload, equip, tumble, die. */
  event(name, a, b, c) {
    const X = this.X, V = this.V;
    switch (name) {
      case 'shoot': {
        const k = KICK[this.kickCat] || KICK.rifle;
        const s = clamp(0.55 + (a || 1) * 0.28, 0.5, 2.2);
        V[Z_KB] += k.back * 22 * s;
        V[Z_KP] += k.pitch * 16 * s;
        V[Z_KR] += (Math.random() - 0.5) * k.roll * 30 * s;
        V[Z_ROCK] += k.torso * 16 * s;
        this.fire = 1;
        break;
      }
      case 'hit': {
        // a = local direction x (+ right), b = local direction z (+ back) of the push, c = strength 0..1
        const mag = c ?? 0.4;
        V[Z_HX] += (b || 0) * mag * 11;
        V[Z_HZ] += -(a || 0) * mag * 11;
        V[Z_HY] += (a || 0) * mag * 6;
        V[Z_HEADX] += (b || 0) * mag * 9;
        V[Z_HEADY] += (a || 0) * mag * 7 + (Math.random() - 0.5) * mag * 4;
        break;
      }
      case 'headshot':
        V[Z_HEADX] += 15; V[Z_HEADY] += (Math.random() - 0.5) * 14; V[Z_HX] += 3;
        break;
      case 'land': {
        const s = clamp((a || 0) / 28, 0, 1);
        X[Z_DIP] = -0.04 - 0.34 * s; V[Z_DIP] = 0;
        V[Z_HX] += -2 * s;
        this.tumble.active = false;
        break;
      }
      case 'jump':
        V[Z_DIP] += 1.2;
        this.jumpSide = this.phase % 1 < 0.5 ? 1 : -1;
        this.justJumped = true;
        break;
      case 'pad':
        this.justJumped = true;
        this.padT = this.t;
        this.jumpSide = this.phase % 1 < 0.5 ? 1 : -1;
        break;
      case 'gadget': this.gadgetT0 = this.t; break;
      case 'reload': this.reloadLoops = Math.max(1, Math.round(a || 3)); break;
      case 'equip': this.equipDur = Math.max(0.12, a || 0.3); break;
      case 'tumble': {
        // a, b: local x / z velocity change
        const tb = this.tumble;
        tb.active = true; tb.t = 0; tb.rx = 0; tb.rz = 0;
        tb.wx = clamp((b || 0) * 0.5, -9, 9);
        tb.wz = clamp(-(a || 0) * 0.5, -9, 9);
        break;
      }
      case 'die':
        this.death.start(a);
        break;
      default: break;
    }
  }

  /** Aims the weapon (hold target) at a world point; used while grappling. */
  pointAt(H, x, y, z) {
    const ch = this.ch;
    _v.set(x - ch.pos.x, y - (ch.pos.y + 1.35), z - ch.pos.z);
    const cy = Math.cos(ch.bodyYaw), sy = Math.sin(ch.bodyYaw);
    _v.set(_v.x * cy - _v.z * sy, _v.y, _v.x * sy + _v.z * cy).normalize().applyQuaternion(_qtbi);
    _v3.copy(_v).multiplyScalar(-1);
    _S.crossVectors(UP, _v3).normalize();
    if (_S.lengthSq() < 1e-4) _S.set(1, 0, 0);
    _T.crossVectors(_v3, _S);
    _q.setFromRotationMatrix(_m4.makeBasis(_S, _T, _v3));
    H.wq.slerp(_q, 0.9);
  }

  /** Mouth position in torso space (follows the head). */
  mouthPos(out) {
    out.set(0, 0.075, -0.12).applyQuaternion(this.headQ);
    out.y += RIG.neckY + RIG.headY;
    return out;
  }

  // ------------------------------------------------------------------------------------------------
  // family switching / crossfade
  // ------------------------------------------------------------------------------------------------
  switchFamily(f) {
    const J = this.J;
    for (let i = 0; i < J.length; i++) this.snapQ[i].copy(J[i].quaternion);
    this.snapP[0].copy(J[0].position);
    this.snapP[1].copy(J[1].position);
    this.xf = this.xfDur = XFADE[f];
    this.family = f;
    if (f === FAMILY.DANCE) this.danceT0 = this.t;
  }

  crossfade(dt) {
    if (this.xf <= 0) return;
    this.xf = Math.max(0, this.xf - dt);
    const k = ease.smooth(1 - this.xf / this.xfDur);
    const J = this.J;
    for (let i = 0; i < J.length; i++) {
      _q.copy(J[i].quaternion);
      J[i].quaternion.copy(this.snapQ[i]).slerp(_q, k);
    }
    J[0].position.lerpVectors(this.snapP[0], J[0].position, k);
    J[1].position.lerpVectors(this.snapP[1], J[1].position, k);
  }

  // ------------------------------------------------------------------------------------------------
  // update
  // ------------------------------------------------------------------------------------------------
  /** lod: 0 full, 1 simplified (far away). dt may span several frames for far characters. */
  update(dt, lod = 0) {
    const ch = this.ch;
    dt = Math.min(dt, 0.1);
    this.t += dt;
    let fam = FAMILY.GROUND;
    const tb = this.tumble;
    if (tb.active && (ch.grounded || ch.swimming || ch.mode !== 'normal' || tb.t > 2.5)) tb.active = false;
    if (!ch.alive) fam = FAMILY.DEAD;
    else if (ch.mode === 'skydive') fam = FAMILY.SKYDIVE;
    else if (ch.mode === 'glide') fam = FAMILY.GLIDE;
    else if (ch.danceT > 0) fam = FAMILY.DANCE;
    else if (ch.swimming) fam = FAMILY.SWIM;
    else if (tb.active) fam = FAMILY.TUMBLE;
    if (fam !== this.family) this.switchFamily(fam);
    if (fam !== FAMILY.GLIDE && ch.glider.position.y !== 0) { ch.glider.position.set(0, 0, 0); ch.glider.rotation.set(0, 0, 0); }

    this.observe(dt);
    switch (this.family) {
      case FAMILY.GROUND: if (lod > 0) this.poseGroundSimple(dt); else this.poseGround(dt); break;
      case FAMILY.SWIM: poseSwim(this, dt); this.itemHidden(true); break;
      case FAMILY.SKYDIVE: poseSkydive(this, dt); break;
      case FAMILY.GLIDE: poseGlide(this, dt); break;
      case FAMILY.DANCE: poseDance(this, dt); this.itemHidden(true); break;
      case FAMILY.TUMBLE: poseTumble(this, dt); break;
      case FAMILY.DEAD: this.death.update(dt); break;
      default: break;
    }
    this.crossfade(dt);
    this.finish(dt, lod);
  }

  itemHidden(h) {
    if (this.itemObj) this.itemObj.visible = !h;
  }

  /** Per-frame measurements shared by all families. */
  observe(dt) {
    const ch = this.ch;
    const X = this.X, V = this.V;
    const vx = ch.vel.x, vz = ch.vel.z, vy = ch.vel.y;
    // a sudden velocity change that was not a jump or a landing is a knock (explosion, impulse, melee)
    const ax = vx - this.pvx, az = vz - this.pvz, ay = vy - this.pvy;
    const dv = Math.sqrt(ax * ax + az * az + ay * ay);
    if (dt > 0 && dv > 5 && dv / dt > 200 && ch.mode === 'normal' && ch.alive && !this.justJumped && !(ch.grounded && ay > 4 && ax * ax + az * az < 16)) {
      const cy = Math.cos(ch.bodyYaw), sy = Math.sin(ch.bodyYaw);
      const lx = ax * cy - az * sy, lb = ax * sy + az * cy; // right, back
      if (!ch.grounded && dv > 10) this.event('tumble', lx, lb);
      this.event('hit', lx / dv, lb / dv, clamp(dv / 16, 0.25, 1));
    }
    this.justJumped = false;
    this.pvx = vx; this.pvz = vz; this.pvy = vy;
    // body-frame acceleration (smoothed), for lean and weapon inertia
    const cy = Math.cos(ch.bodyYaw), sy = Math.sin(ch.bodyYaw);
    const accF = dt > 0 ? (-(ax * sy + az * cy)) / dt : 0;
    const accS = dt > 0 ? (ax * cy - az * sy) / dt : 0;
    const k = 1 - Math.exp(-10 * dt);
    this.fwdAcc += (clamp(accF, -90, 90) - this.fwdAcc) * k;
    this.sideAcc += (clamp(accS, -90, 90) - this.sideAcc) * k;
    const yr = dt > 0 ? wrapAngle(ch.bodyYaw - this.pYaw) / dt : 0;
    this.pYaw = ch.bodyYaw;
    spring(X, V, S_TURN, clamp(yr, -14, 14), 12, dt);
    // equip progress
    if (ch.equipT > this.prevEquipT + 0.01) this.equipDur = ch.equipT;
    this.prevEquipT = ch.equipT;
    this.equipK = ch.equipT > 0 ? clamp(ch.equipT / this.equipDur, 0, 1) : 0;
    // action progress
    if (ch.swingT > this.prevSwingT + 0.005) this.swingCount++;
    this.prevSwingT = ch.swingT;
    this.swingK = ch.swingT > 0 && ch.swingDur > 0 ? clamp(1 - ch.swingT / ch.swingDur, 0, 1) : -1;
    if (this.prevThrowT > 0 && ch.throwT <= 0) this.throwRel = this.t;
    this.prevThrowT = ch.throwT;
    if (ch.throwT > 0 && ch.pendingThrow) this.throwK = clamp(1 - ch.throwT / 0.28, 0, 1);
    else {
      const since = this.t - this.throwRel;
      this.throwK = since >= 0 && since < 0.5 ? 1 + since / 0.5 : -1;
    }
    const gs = this.t - this.gadgetT0;
    this.gadgetK = gs >= 0 && gs < 0.7 ? gs / 0.5 : -1;
    this.using = ch.using;
    this.fpv = ch.isPlayer && ch.model.head.visible === false;
    this.fire += (0 - this.fire) * (1 - Math.exp(-6 * dt));
  }

  // ------------------------------------------------------------------------------------------------
  // ground family: locomotion + holds + additive layers
  // ------------------------------------------------------------------------------------------------
  poseGround(dt) {
    const ch = this.ch, m = this.m, X = this.X, V = this.V;
    const inp = ch.input;
    const t = this.t;
    const grounded = ch.grounded && !ch.swimming;
    const hspeed = Math.sqrt(ch.vel.x * ch.vel.x + ch.vel.z * ch.vel.z);
    const def = this.heldDef;
    const kind = def ? def.kind : null;
    const gun = kind === 'gun';
    const holding = this.itemObj !== null;

    // ---- smoothed state weights
    spring(X, V, S_SPEED, grounded ? hspeed : 0, 12, dt);
    spring(X, V, S_MOVE, grounded && hspeed > 0.35 ? 1 : 0, 11, dt);
    spring(X, V, S_CROUCH, ch.crouching ? 1 : 0, 13, dt);
    spring(X, V, S_AIR, grounded ? 0 : 1, grounded ? 16 : 20, dt);
    const recentShot = ch.game.time - (ch.lastShotT || -9) < 1.4;
    const aimWanted = gun && (inp.fire || ch.ads || recentShot || ch.reload) ? 1 : kind === 'gadget' && ch.grapple ? 1 : 0;
    spring(X, V, S_AIM, aimWanted, aimWanted ? 14 : 5, dt);
    spring(X, V, S_ADS, ch.ads ? 1 : 0, 15, dt);
    spring(X, V, S_SPRINT, ch.sprinting && grounded && !ch.reload && !(gun && inp.fire) ? 1 : 0, 9, dt);
    this.sAim = clamp(X[S_AIM], 0, 1); this.sAds = clamp(X[S_ADS], 0, 1); this.sSprint = clamp(X[S_SPRINT], 0, 1);
    const crouch = clamp(X[S_CROUCH], 0, 1), air = clamp(X[S_AIR], 0, 1);
    const sv = Math.max(0, X[S_SPEED]);
    const move = clamp(X[S_MOVE], 0, 1);

    // ---- body-space velocity direction (strafe / backpedal)
    const cy = Math.cos(ch.bodyYaw), sy = Math.sin(ch.bodyYaw);
    const vr = ch.vel.x * cy - ch.vel.z * sy; // + right
    const vf = -ch.vel.x * sy - ch.vel.z * cy; // + forward
    if (hspeed > 0.6) {
      spring(X, V, S_DIRX, vr / hspeed, 14, dt);
      spring(X, V, S_DIRZ, -vf / hspeed, 14, dt);
    }
    let dl = Math.sqrt(X[S_DIRX] * X[S_DIRX] + X[S_DIRZ] * X[S_DIRZ]);
    if (dl < 1e-4) { X[S_DIRX] = 0; X[S_DIRZ] = -1; dl = 1; }
    const dirX = X[S_DIRX] / dl, dirZ = X[S_DIRZ] / dl;
    const fwdness = Math.max(0, -dirZ);

    // ---- gait (distance driven)
    // sideways / backward steps are shorter (the cadence rises instead)
    const stride = GAIT.strideLen(sv, crouch) * (1 - 0.42 * Math.abs(dirX) - 0.22 * Math.max(0, dirZ));
    if (grounded && hspeed > 0.25) this.phase += hspeed * dt / stride;
    this.phase %= 1;
    const turn = X[S_TURN];
    const H = this.hold;

    // ---- pelvis + legs
    const bob = gaitLegs(this, dt, sv, move, crouch, dirX, dirZ, stride, air);
    const dip = X[Z_DIP];
    const breath = Math.sin(t * 1.9) * 0.5 + 0.5;
    const shift = Math.sin(t * 0.42 + this.seed) * (1 - move) * (1 - crouch * 0.5);
    const leanSpeed = -0.3 * ramp(2.5, 9.5, sv) * fwdness - 0.05 * ramp(0.5, 2.5, sv);
    spring(X, V, S_LEANF, clamp(-this.fwdAcc * 0.0034, -0.2, 0.2), 9, dt);
    spring(X, V, S_LEANS, clamp(this.sideAcc * 0.0026, -0.18, 0.18), 9, dt);
    const bank = clamp(turn * Math.min(sv, 9) * 0.012, -0.22, 0.22);
    const aim = this.sAim, ads = this.sAds, sp = this.sSprint;

    const pelvisPitch = (leanSpeed * 0.45 + X[S_LEANF] * 0.5 - crouch * 0.12) * (1 - air * 0.3);
    const pelvisYaw = bob.yaw - 0.1 * aim - 0.1 * ads + H.pelvisY;
    const pelvisRoll = bob.roll + bank * 0.6 + X[S_LEANS] * 0.4 + shift * 0.02;
    const px = bob.x + shift * 0.012 + H.stepX, pz = bob.z + H.stepZ * 0.5 - 0.02 * crouch;
    const py = bob.y + dip;
    qeul(_qp, pelvisPitch, pelvisYaw, pelvisRoll);
    m.pelvis.position.set(px, py, pz);
    m.pelvis.quaternion.copy(_qp);
    m.body.position.set(0, 0, 0);
    m.body.quaternion.identity();
    this.applyLegs(px, py, pz, air);

    // ---- spine
    const aimPitch = clamp(ch.pitch, -1.3, 1.3);
    const gunAim = holding && (gun || kind === 'gadget');
    const aimY = gunAim ? aim : 0;
    let spinePitch = leanSpeed * 0.55 + X[S_LEANF] * 0.5 - crouch * 0.24 + aimPitch * 0.3 * (gunAim ? 0.3 + aimY * 0.7 : 0.4) + H.spineX;
    spinePitch += breath * 0.012 - 0.006;
    let spineYaw = -bob.yaw * 1.5 + 0.3 * aimY * (1 - sp) + 0.08 * ads + H.spineY + turn * 0.012;
    let spineRoll = -bob.roll * 0.6 + bank * 0.4 + X[S_LEANS] * 0.3 + H.spineZ;
    spinePitch += X[Z_ROCK] + X[Z_HX];
    spineRoll += X[Z_HZ];
    spineYaw += X[Z_HY];
    qeul(_qs, spinePitch, spineYaw, spineRoll);
    m.torso.quaternion.copy(_qs);
    m.torso.position.set(0, RIG.waist, 0);
    _qtb.copy(_qp).multiply(_qs);
    _qtbi.copy(_qtb).invert();

    // ---- head / neck
    this.updateHead(dt, aimPitch, wrapAngle(ch.yaw - ch.bodyYaw), pelvisYaw + spineYaw, spinePitch + pelvisPitch, crouch, aimY, move);

    // ---- arms and the item
    this.updateArms(dt, move, fwdness, aimPitch);
  }

  applyLegs(px, py, pz, air) {
    const m = this.m;
    const L = this.legs;
    _Q1.copy(_qp).invert();
    for (let i = 0; i < 2; i++) {
      const leg = i === 0 ? m.legR : m.legL;
      const side = i === 0 ? 1 : -1;
      if (air > 0.985) { fkLegsAir(this, leg, side, 1); continue; }
      _S.set(side * RIG.hipX, 0, 0);
      _T.copy(L.tgt[i]).sub(_v.set(px, py, pz)).applyQuaternion(_Q1);
      _pole.set(side * 0.16, 0, -1);
      solveTwoBone(_Q2, _S, _T, _pole, RIG.thigh, RIG.shin, 1);
      const flex = IK.flex;
      // foot orientation: flat on the ground, pitching with the stride, toes slightly out (expressed in pelvis space)
      qeul(_Q3, L.pitch[i], side * -0.1, 0);
      _Q3.premultiply(_Q1);
      endLocal(_Q4, _Q2, flex, 1, _Q3, 1.2);
      if (air > 0.01) fkLegsAir(this, leg, side, air, _Q2, flex, _Q4);
      else {
        leg.l.quaternion.copy(_Q2);
        leg.shin.quaternion.setFromAxisAngle(AX, -flex);
        leg.foot.quaternion.copy(_Q4);
      }
    }
  }

  updateHead(dt, pitch, relYaw, bodyTwist, bodyPitch, crouch, aimY, move) {
    const ch = this.ch, m = this.m, X = this.X, V = this.V, H = this.hold;
    this.lookT -= dt;
    if (this.lookT <= 0) {
      this.lookT = 1.8 + Math.random() * 3.5;
      const idle = !ch.input.fire && !ch.ads && move < 0.3 && !ch.isPlayer;
      this.lookY = idle ? (Math.random() - 0.5) * 1.2 : 0;
      this.lookP = idle ? (Math.random() - 0.5) * 0.25 : 0;
    }
    spring(X, V, S_IDLEY, this.lookY, 5, dt);
    spring(X, V, S_IDLEP, this.lookP, 5, dt);
    const follow = lerp(0.62, 0.95, aimY);
    const hy = clamp(relYaw - bodyTwist, -1.1, 1.1) * follow * H.lookW + H.headY + X[S_IDLEY];
    const hx = clamp(pitch * 0.75 - bodyPitch * 0.6, -0.7, 0.8) * H.lookW + H.headX + crouch * 0.3 + X[S_IDLEP] * 0.5;
    spring(X, V, S_HEADY, hy, 13, dt);
    spring(X, V, S_HEADX, hx, 13, dt);
    const headX = X[S_HEADX] + X[Z_HEADX] + this.chew * 0.04;
    const headY = X[S_HEADY] + X[Z_HEADY];
    const headZ = -X[S_TURN] * 0.01 + X[Z_HZ] * 0.5;
    qeul(_q, headX * 0.4, headY * 0.4, headZ * 0.3);
    m.neck.quaternion.copy(_q);
    qeul(this.headQ, headX * 0.6, headY * 0.6, headZ * 0.7);
    m.head.quaternion.copy(this.headQ);
    this.headQ.premultiply(_q); // neck * head, for the mouth lookup
  }

  updateArms(dt, move, fwdness, aimPitch) {
    const ch = this.ch, m = this.m, X = this.X, V = this.V, H = this.hold;
    const def = this.heldDef;
    const t = this.t;
    const aimW = this.sAim, sp = this.sSprint;
    const relYaw = wrapAngle(ch.yaw - ch.bodyYaw);
    const gunAim = def && (def.kind === 'gun' || def.kind === 'gadget');
    const yawW = clamp(relYaw, -1.2, 1.2) * (gunAim ? aimW : 0);
    const pit = aimPitch * (gunAim ? 0.35 + 0.65 * aimW : 0);
    // aim frame relative to the torso; while sprinting the weapon follows the body instead of the camera
    qeul(_qaim, pit, yawW, 0);
    this.qAimEff.copy(_qtbi).multiply(_qaim);
    if (sp > 0.001) {
      qeul(_qsp, pit * 0.3, 0, 0);
      _q.copy(_qtbi).multiply(_qsp);
      this.qAimEff.slerp(_q, sp * 0.85);
    }
    this.qAim.copy(this.qAimEff);

    computeHold(this);
    applyEquip(H, this, this.equipK);
    // after an action change the smoothing is slow for a moment, so poses glide into each other
    const act = this.using ? 1 : ch.reload ? 2 : this.swingK >= 0 ? 3 : this.throwK >= 0 ? 4 : this.gadgetK >= 0 ? 5 : 0;
    if (act !== this.actionId) { this.actionId = act; this.actionSince = act === 3 ? 0.45 : act === 4 ? 0.3 : 0; }
    this.actionSince += dt;
    const rate = Math.min(H.rate, 9 + 80 * this.actionSince);
    const kr = 1 - Math.exp(-rate * dt);
    this.cwp.lerp(H.wp, kr);
    this.cwq.slerp(H.wq, kr);
    this.coq.slerp(H.offQ, kr);
    if (H.lAbs !== this.lAbsPrev) {
      // the support-hand target switches between weapon space and torso space: carry the smoothed value over
      if (H.lAbs) { this.clp.applyQuaternion(this.wqLast).add(this.wpLast); this.clq.premultiply(this.wqLast); }
      else { this.clp.sub(this.wpLast).applyQuaternion(_q.copy(this.wqLast).invert()); this.clq.premultiply(_q); }
      this.lAbsPrev = H.lAbs;
    }
    this.clp.lerp(H.lp, kr);
    this.clq.slerp(H.lq, kr);
    spring(X, V, S_RW, H.rw, 12, dt);
    spring(X, V, S_LW, H.lw, 14, dt);
    const rw = clamp(X[S_RW], 0, 1), lw = clamp(X[S_LW], 0, 1);

    // ---- weapon pose = smoothed target + additive layers
    _wp.copy(this.cwp); _wq.copy(this.cwq);
    const swaySc = def && (def.cat === 'lmg' || def.cat === 'launcher' || def.cat === 'sniper') ? 1.6 : 1;
    const adsDamp = 1 - this.sAds * 0.6;
    _wp.y += (Math.sin(t * 1.9) * 0.004 + Math.sin(t * 0.9 + this.seed) * 0.002) * swaySc * adsDamp;
    _wp.x += Math.sin(t * 0.7 + this.seed * 2) * 0.0025 * swaySc * adsDamp;
    _wp.y += Math.sin(this.phase * Math.PI * 4) * 0.012 * move * adsDamp * (1 - sp * 0.3);
    _wp.y += Math.cos(this.phase * Math.PI * 2) * 0.012 * move * H.fkSwing;
    _wp.z += -Math.sin(this.phase * Math.PI * 2) * 0.1 * move * H.fkSwing * fwdness;
    _wp.x += X[S_LEANS] * 0.25 * swaySc;
    _wp.z += -this.fwdAcc * 0.0009 * swaySc;
    const kb = X[Z_KB], kp = X[Z_KP];
    if (kb !== 0 || kp !== 0) {
      _v.set(0, 0, kb).applyQuaternion(this.qAimEff);
      _wp.add(_v);
      qeul(_q, kp, 0, X[Z_KR]);
      _wq.multiply(_q);
    }
    if (this.fire > 0.05 && def && def.kind === 'gun') {
      const j = this.fire * (def.cat === 'lmg' ? 0.006 : 0.003);
      _wp.x += Math.sin(t * 91) * j; _wp.y += Math.sin(t * 77 + 1) * j;
    }
    _wp.y += X[Z_HX] * 0.012; _wp.x += -X[Z_HZ] * 0.01;

    // ---- arms. Right hand = the grip (hand orientation = weapon * offQ^-1), left hand = support target derived
    // from the weapon pose the right arm actually reached. If the support hand is out of reach the weapon is
    // pulled back toward the body along its own axis.
    _qOffInv.copy(this.coq).invert();
    for (let it = 0; ; it++) {
      _hq.copy(_wq).multiply(_qOffInv);
      _T.copy(PALM).applyQuaternion(_hq);
      _T.subVectors(_wp, _T);
      _pole.copy(H.rPole);
      this.overR = _T.distanceTo(SR) - REACH;
      this.arm(m.armR, 1, SR, _T, _hq, _pole, rw);
      this.handFK(m.armR, SR, _hp, _hq);
      _hp.add(_v.copy(PALM).applyQuaternion(_hq));
      _hq.multiply(this.coq);
      if (lw <= 0.001) { this.overL = 0; break; }
      if (H.lAbs) { _tp.copy(this.clp); _tq.copy(this.clq); }
      else { _tp.copy(this.clp).applyQuaternion(_hq).add(_hp); _tq.copy(_hq).multiply(this.clq); }
      _tp.sub(_v.copy(PALM).applyQuaternion(_tq));
      const over = this.overL = _tp.distanceTo(SL) - REACH;
      if (over <= 0 || H.lAbs || it >= 2) break;
      _v.set(0, 0, 1).applyQuaternion(_wq).multiplyScalar(Math.min(0.3, over * 1.2));
      _wp.add(_v);
    }
    this.wpLast.copy(_hp); this.wqLast.copy(_hq);
    if (lw > 0.001) {
      _pole.copy(H.lPole);
      this.arm(m.armL, -1, SL, _tp, _tq, _pole, lw);
    } else this.arm(m.armL, -1, SL, _tp, null, _pole, 0);
    this.applyItem(dt);
  }

  /** Writes one arm: blends the free (swinging) pose with the IK pose by weight w. */
  arm(arm, side, S, T, qHand, pole, w) {
    const X = this.X;
    const move = clamp(X[S_MOVE], 0, 1);
    const sv = Math.max(0, X[S_SPEED]);
    const ph = this.phase * Math.PI * 2;
    const run = ramp(2.5, 6.5, sv), spr = ramp(7.5, 9.5, sv);
    const fwdness = Math.max(0, -X[S_DIRZ]);
    const sw = Math.sin(ph + (side > 0 ? Math.PI : 0));
    const swing = sw * (0.28 + 0.55 * run + 0.15 * spr) * move * (0.4 + 0.6 * fwdness);
    const crouch = X[S_CROUCH], air = X[S_AIR];
    const breath = Math.sin(this.t * 1.9 + side) * 0.02;
    // jump pad launch: arms thrown up
    const pad = clamp(1 - (this.t - this.padT) / 1.1, 0, 1) * air;
    const fkx = swing * (1 - 0.5 * crouch) + 0.04 + 0.1 * air + breath + 2.3 * pad;
    const fkz = side * (0.09 + 0.08 * (1 - move) + 0.45 * air + 0.3 * pad) + breath * 0.5;
    const flex = 0.18 + 0.25 * crouch + (0.55 + 0.6 * spr) * run * move + Math.max(0, swing) * 0.5 * move + 0.4 * air - 0.3 * pad;
    qeul(_Q1, fkx, 0, fkz);
    if (w <= 0.0005) {
      arm.a.quaternion.copy(_Q1);
      arm.fore.quaternion.setFromAxisAngle(AX, flex);
      arm.hand.quaternion.identity();
      return;
    }
    solveTwoBone(_Q2, S, T, pole, UA, FA, -1);
    const f2 = IK.flex;
    if (qHand) endLocal(_Q4, _Q2, f2, -1, qHand, 1.25); else _Q4.identity();
    if (w >= 0.9995) {
      arm.a.quaternion.copy(_Q2);
      arm.fore.quaternion.setFromAxisAngle(AX, f2);
      arm.hand.quaternion.copy(_Q4);
    } else {
      arm.a.quaternion.copy(_Q1).slerp(_Q2, w);
      arm.fore.quaternion.setFromAxisAngle(AX, lerp(flex, f2, w));
      arm.hand.quaternion.identity().slerp(_Q4, w);
    }
  }

  /** IK for an arm from a target given in body (root) space; used by FK families that grab something (the glider). */
  armBody(arm, side, tb, poleB, w) {
    const m = this.m;
    _qtb.copy(m.body.quaternion).multiply(m.pelvis.quaternion).multiply(m.torso.quaternion);
    _Q3.copy(_qtb).invert();
    // torso origin in root space
    _v.set(0, RIG.waist, 0).applyQuaternion(m.pelvis.quaternion).add(m.pelvis.position).applyQuaternion(m.body.quaternion).add(m.body.position);
    _tp.copy(tb).sub(_v).applyQuaternion(_Q3);
    _pole.copy(poleB).applyQuaternion(_Q3);
    _S.set(side * SHOULDER_X, SHOULDER_Y, 0);
    this.arm(arm, side, _S, _tp, null, _pole, w);
  }

  /** Torso-space wrist position and hand orientation of an arm after its joints were written. */
  handFK(arm, S, outP, outQ) {
    _Q1.copy(arm.a.quaternion);
    _Q2.copy(_Q1).multiply(arm.fore.quaternion);
    outP.set(0, -UA, 0).applyQuaternion(_Q1).add(S);
    outP.add(_v3.set(0, -FA, 0).applyQuaternion(_Q2));
    outQ.copy(_Q2).multiply(arm.hand.quaternion);
    return outP;
  }

  applyItem(dt) {
    const H = this.hold, o = this.itemObj;
    if (!o) return;
    o.quaternion.copy(this.coq);
    o.position.copy(PALM);
    o.visible = H.itemVisible;
    const s = H.itemScale;
    if (o.scale.x !== s) o.scale.setScalar(s);
    const info = this.info;
    if (!info) return;
    const P = info.parts;
    for (const k in P) {
      const p = P[k], ob = p.obj;
      switch (k) {
        case 'bolt': ob.position.z = p.z + 0.07 * H.bolt; break;
        case 'pump': ob.position.z = p.z + 0.09 * H.pump; break;
        case 'slide': ob.position.z = p.z + 0.05 * H.slide; break;
        case 'lever': ob.rotation.x = p.rx - 0.9 * H.lever; break;
        case 'cylinder': ob.position.x = p.x - 0.045 * H.cyl; ob.rotation.z = p.rz + H.cyl * 0.4; break;
        case 'hammer': ob.rotation.x = p.rx + 0.7 * H.hammer; break;
        case 'barrels': ob.rotation.z += this.spin * dt; break;
        case 'mag': ob.position.y = p.y - 0.16 * H.magPart; ob.visible = H.magPart < 0.97; break;
        default: break;
      }
    }
    if (P.barrels) {
      const d = this.heldDef;
      this.spin = d && d.spinUp ? (this.ch.spin / d.spinUp) * 38 : 0;
    }
    this.updateProp(H);
  }

  updateProp(H) {
    let p = this.propMesh;
    if (H.magProp > 0) {
      if (!p) { p = this.propMesh = propMesh(); this.m.armL.hand.add(p); }
      p.visible = true;
      p.geometry = PROP_GEO[H.propKind] || PROP_GEO[0];
    } else if (p && p.visible) p.visible = false;
  }

  // ------------------------------------------------------------------------------------------------
  // far characters: cheap FK pose (no IK, no additive layers)
  // ------------------------------------------------------------------------------------------------
  poseGroundSimple(dt) {
    const ch = this.ch, m = this.m, X = this.X, V = this.V;
    const grounded = ch.grounded && !ch.swimming;
    const hspeed = Math.sqrt(ch.vel.x * ch.vel.x + ch.vel.z * ch.vel.z);
    const def = this.heldDef;
    const crouch = ch.crouching ? 1 : 0;
    spring(X, V, S_SPEED, grounded ? hspeed : 0, 10, dt);
    spring(X, V, S_CROUCH, crouch, 10, dt);
    const sv = Math.max(0, X[S_SPEED]);
    const cr = X[S_CROUCH];
    const stride = GAIT.strideLen(sv, cr);
    if (grounded && hspeed > 0.25) this.phase += hspeed * dt / stride;
    this.phase %= 1;
    const move = clamp(sv / 2.5, 0, 1);
    const run = ramp(2.5, 6.5, sv);
    const ph = this.phase * Math.PI * 2;
    const amp = move * (0.45 + 0.4 * run);
    const air = grounded ? 0 : 1;
    const gun = def && def.kind === 'gun';
    const aim = gun && (ch.input.fire || ch.ads) ? 1 : 0;
    const lean = -0.25 * ramp(3, 9.5, sv);
    const py = lerp(0.888, 0.56, cr) - 0.04 * run * move - 0.03 * Math.abs(Math.sin(ph * 2)) * move;
    m.body.position.set(0, 0, 0); m.body.quaternion.identity();
    m.pelvis.position.set(0, py, 0);
    qeul(m.pelvis.quaternion, lean * 0.4 - cr * 0.25, Math.sin(ph) * 0.12 * move, 0);
    m.torso.position.set(0, RIG.waist, 0);
    qeul(m.torso.quaternion, lean * 0.6 - cr * 0.4, -Math.sin(ph) * 0.2 * move + 0.2 * aim, 0);
    m.neck.quaternion.identity(); m.head.quaternion.identity();
    const hp = clamp(ch.pitch, -1, 1);
    qeul(m.head.quaternion, hp * 0.3 - lean * 0.5 + cr * 0.3, 0, 0);
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? 1 : -1;
      const leg = i === 0 ? m.legR : m.legL;
      const arm = i === 0 ? m.armR : m.armL;
      const s = Math.sin(ph + (side > 0 ? 0 : Math.PI));
      if (air) {
        qeul(leg.l.quaternion, 0.4 - (side < 0 ? 0.3 : 0), 0, side * 0.1);
        leg.shin.quaternion.setFromAxisAngle(AX, -0.8);
        leg.foot.quaternion.identity();
      } else {
        const sw = s * amp * 1.1 + cr * 0.6;
        qeul(leg.l.quaternion, sw, 0, side * 0.04);
        leg.shin.quaternion.setFromAxisAngle(AX, -(Math.max(0, -Math.cos(ph + (side > 0 ? 0 : Math.PI) + 0.5)) * 1.1 * amp + cr * 0.9 + 0.05));
        qeul(leg.foot.quaternion, -sw * 0.4, 0, 0);
      }
      // arms: weapon hold for the right arm (rifle-like), swing otherwise
      if (gun && i === 0) {
        qeul(arm.a.quaternion, 1.25 + clamp(ch.pitch, -1, 1) * 0.6 * aim - 0.4 * (1 - aim), -0.2, 0.1);
        arm.fore.quaternion.setFromAxisAngle(AX, 1.1 - 0.5 * aim);
        arm.hand.quaternion.identity();
      } else if (gun && i === 1) {
        qeul(arm.a.quaternion, 1.3 + clamp(ch.pitch, -1, 1) * 0.6 * aim - 0.4 * (1 - aim), 0.5, -0.1);
        arm.fore.quaternion.setFromAxisAngle(AX, 0.9);
        arm.hand.quaternion.identity();
      } else {
        qeul(arm.a.quaternion, -s * amp * 0.9, 0, side * 0.1);
        arm.fore.quaternion.setFromAxisAngle(AX, 0.2 + run * 0.8 * move);
        arm.hand.quaternion.identity();
      }
    }
    if (this.itemObj) {
      const o = this.itemObj;
      o.quaternion.copy(this.coq);
      o.position.copy(PALM);
      o.visible = true;
      if (o.scale.x !== 1) o.scale.setScalar(1);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // post: blink, ponytail, relax the under-damped layers
  // ------------------------------------------------------------------------------------------------
  finish(dt, lod) {
    const m = this.m, X = this.X, V = this.V;
    if (m.lids && lod === 0) {
      this.blinkT -= dt;
      if (this.blinkT <= 0) { this.blinkT = 2.2 + Math.random() * 4; this.lidT = 0.11; }
      if (this.lidT > 0) { this.lidT -= dt; if (!m.lids.visible) m.lids.visible = true; } else if (m.lids.visible) m.lids.visible = false;
    }
    if (m.ponytail && lod === 0) {
      const target = 0.25 - this.fwdAcc * 0.004 - X[S_HEADX] * 0.6;
      springZ(X, V, Z_PONY, clamp(target, -0.5, 0.9), 22, 0.45, dt);
      springZ(X, V, Z_PONYZ, clamp(-this.sideAcc * 0.004 + X[S_TURN] * 0.02, -0.5, 0.5), 22, 0.45, dt);
      m.ponytail.rotation.set(X[Z_PONY], 0, X[Z_PONYZ]);
    }
    springZ(X, V, Z_KB, 0, 26, 0.5, dt);
    springZ(X, V, Z_KP, 0, 22, 0.5, dt);
    springZ(X, V, Z_KR, 0, 22, 0.6, dt);
    springZ(X, V, Z_ROCK, 0, 20, 0.55, dt);
    springZ(X, V, Z_HX, 0, 17, 0.38, dt);
    springZ(X, V, Z_HZ, 0, 17, 0.38, dt);
    springZ(X, V, Z_HY, 0, 17, 0.38, dt);
    springZ(X, V, Z_HEADX, 0, 19, 0.35, dt);
    springZ(X, V, Z_HEADY, 0, 19, 0.35, dt);
    springZ(X, V, Z_DIP, 0, 21, 0.5, dt);
  }

  dispose() {
    if (this.propMesh) { this.propMesh.parent?.remove(this.propMesh); this.propMesh = null; }
  }
}

// shared geometry for the reload prop (magazine / rocket / bolt); one tiny mesh per character, created on demand
const PROP_GEO = [
  new THREE.BoxGeometry(0.04, 0.12, 0.07),
  new THREE.CylinderGeometry(0.018, 0.018, 0.1, 6),
  new THREE.CylinderGeometry(0.05, 0.05, 0.28, 8).rotateX(Math.PI / 2),
  new THREE.CylinderGeometry(0.01, 0.01, 0.2, 5).rotateX(Math.PI / 2),
];
const PROP_MAT = new THREE.MeshStandardMaterial({ color: 0x3a3f46, roughness: 0.6, metalness: 0.4 });
function propMesh() {
  const m = new THREE.Mesh(PROP_GEO[0], PROP_MAT);
  m.position.set(0, -0.08, -0.02);
  m.castShadow = false;
  m.visible = false;
  return m;
}
