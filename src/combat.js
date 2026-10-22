import * as THREE from 'three';
import { itemModel } from './models.js';
import { RARITIES, gunDamage } from './items.js';
import { clamp } from './util.js';

const R_BODY = 0.4;
const _o = new THREE.Vector3(), _d = new THREE.Vector3(), _m = new THREE.Vector3(), _n = new THREE.Vector3(), _p = new THREE.Vector3();
const hitInfo = {};
// shared projectile geometry (created once, reused for every shot)
const ROCKET = {
  bodyGeo: new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8).rotateX(Math.PI / 2),
  bodyMat: new THREE.MeshStandardMaterial({ color: 0x8a8f96, metalness: 0.5 }),
  noseGeo: new THREE.ConeGeometry(0.06, 0.18, 8).rotateX(-Math.PI / 2),
  noseMat: new THREE.MeshStandardMaterial({ color: 0xc0392b }),
  boltGeo: new THREE.CylinderGeometry(0.012, 0.012, 0.6, 4).rotateX(Math.PI / 2),
  boltMat: new THREE.MeshBasicMaterial({ color: 0xdddddd }),
};

/** Ray vs a standing character (cylinder with a narrower head). Returns {t, head} or null. */
export function rayChar(ox, oy, oz, dx, dy, dz, maxT, c) {
  const top = c.pos.y + c.height;
  const cx = c.pos.x, cz = c.pos.z;
  const fx = ox - cx, fz = oz - cz;
  const a = dx * dx + dz * dz;
  let t;
  if (a < 1e-8) {
    // (almost) vertical ray
    if (fx * fx + fz * fz > R_BODY * R_BODY) return null;
    t = dy < 0 ? (top - oy) / dy : (c.pos.y - oy) / dy;
    if (t < 0 || t > maxT) return null;
    return { t, head: dy < 0 };
  }
  const b = fx * dx + fz * dz;
  const cc = fx * fx + fz * fz - R_BODY * R_BODY;
  const disc = b * b - a * cc;
  if (disc < 0) return null;
  const sq = Math.sqrt(disc);
  t = (-b - sq) / a;
  if (t < 0) { if (cc < 0) t = 0; else return null; }
  if (t > maxT) return null;
  const y = oy + dy * t;
  if (y < c.pos.y - 0.05 || y > top + 0.05) {
    // may still clip the top cap
    if (dy < 0 && oy > top) {
      const tt = (top - oy) / dy;
      if (tt >= 0 && tt <= maxT) {
        const px = ox + dx * tt - cx, pz = oz + dz * tt - cz;
        if (px * px + pz * pz < R_BODY * R_BODY) return { t: tt, head: true };
      }
    }
    return null;
  }
  const head = y > top - 0.33;
  if (head) {
    // narrower head: re-check radial distance
    const px = ox + dx * t - cx, pz = oz + dz * t - cz;
    if (px * px + pz * pz > 0.27 * 0.27) return { t, head: false };
  }
  return { t, head };
}

export function falloff(def, dist) {
  const [near, far, minF] = def.falloff;
  if (dist <= near) return 1;
  if (dist >= far) return minF;
  return 1 + (minF - 1) * ((dist - near) / (far - near));
}

export class Combat {
  constructor(game) {
    this.game = game;
    this.projectiles = [];
    this.scratch = {};
  }

  // ---- shooting -------------------------------------------------------------------------------------------------------------------------
  spreadFor(ch, def) {
    let s = def.spread * (ch.ads ? def.adsSpread : 1);
    const sp = Math.hypot(ch.vel.x, ch.vel.z);
    if (sp > 1) s *= 1 + Math.min(sp, 9) * 0.07;
    if (!ch.grounded && !ch.swimming) s *= 1.9;
    if (ch.crouching) s *= 0.75;
    s += ch.bloom * (ch.ads ? 0.4 : 1) * 0.7;
    return s;
  }

  fireGun(ch, st) {
    const g = this.game;
    const def = st.def;
    const dmg = gunDamage(st);
    ch.lastShotT = g.time;
    const origin = ch.aimOrigin;
    const base = ch.aimDir;
    const muzzle = ch.muzzlePos(_m);
    const spreadDeg = this.spreadFor(ch, def) + (ch.extraSpread || 0);
    const spreadRad = (spreadDeg * Math.PI) / 180;
    const lockedShot = def.pellets > 1;

    if (def.projectile) {
      this.fireProjectile(ch, st, muzzle, base, spreadRad, dmg);
    } else {
      let tracers = 0;
      let impactFx = 0;
      const hitMarks = new Map();
      for (let i = 0; i < def.pellets; i++) {
        const d = this.perturb(base, spreadRad, lockedShot, _d);
        const res = this.trace(ch, origin, d, def.range);
        const end = res ? res.point : _p.set(origin.x + d.x * def.range, origin.y + d.y * def.range, origin.z + d.z * def.range);
        if (tracers < (def.pellets > 1 ? 3 : 1) && g.shouldDrawTracer(ch, end)) {
          g.fx.tracer(muzzle, end, def.tracer, def.pellets > 1 ? 0.7 : 1, def.cat === 'sniper' ? 700 : 420);
          tracers++;
        }
        if (res) {
          if (res.char) {
            const f = falloff(def, res.t);
            const total = dmg * f * (res.head ? def.headshot : 1);
            const prev = hitMarks.get(res.char) || { dmg: 0, head: false };
            prev.dmg += total; prev.head = prev.head || res.head;
            hitMarks.set(res.char, prev);
            g.fx.hit(res.point);
            ch.stats.hits++;
          } else if (impactFx < 3) {
            g.fx.impact(res.point, res.normal, res.terrain ? 'terrain' : 'rock');
            impactFx++;
          }
        }
      }
      for (const [target, info] of hitMarks) {
        _n.set(base.x, 0, base.z).normalize();
        target.takeDamage(info.dmg, ch, { headshot: info.head, weapon: def, dir: _n.clone(), pos: target.pos });
        ch.stats.damage += info.dmg;
      }
    }
    // feedback
    g.fx.muzzle(muzzle, base, def.cat === 'shotgun' || def.cat === 'launcher' ? 1.6 : 1);
    g.audio.play('gun:' + def.sound, ch.pos, { max: Math.max(80, def.noise * 2.2), vol: ch.isPlayer ? 0.8 : 1 });
    g.noise(ch.pos, def.noise, ch);
  }

  perturb(dir, rad, uniform, out) {
    if (rad < 1e-5) return out.copy(dir);
    // random point in a cone
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * rad;
    out.copy(dir);
    // basis
    const up = Math.abs(dir.y) > 0.95 ? _n.set(1, 0, 0) : _n.set(0, 1, 0);
    const rx = new THREE.Vector3().crossVectors(dir, up).normalize();
    const ry = new THREE.Vector3().crossVectors(rx, dir);
    out.addScaledVector(rx, Math.cos(a) * r).addScaledVector(ry, Math.sin(a) * r).normalize();
    return out;
  }

  /** Cast a bullet ray: nearest static hit or character. Returns {t, point, normal, char, head, terrain}. */
  trace(shooter, o, d, range, ignore = null) {
    const g = this.game;
    const w = g.world.collision;
    let maxT = range;
    let best = null;
    const st = w.raycast(o.x, o.y, o.z, d.x, d.y, d.z, range, hitInfo);
    if (st >= 0) {
      maxT = st;
      best = { t: st, point: new THREE.Vector3(hitInfo.x, hitInfo.y, hitInfo.z), normal: new THREE.Vector3(hitInfo.nx, hitInfo.ny, hitInfo.nz), char: null, head: false, terrain: hitInfo.kind === 0 };
    }
    const chars = g.chars;
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      if (c === shooter || c === ignore || !c.alive || c.mode === 'bus') continue;
      const dx = c.pos.x - o.x, dz = c.pos.z - o.z;
      if (dx * dx + dz * dz > (maxT + 1) * (maxT + 1)) continue;
      const r = rayChar(o.x, o.y, o.z, d.x, d.y, d.z, maxT, c);
      if (r && r.t < maxT) {
        maxT = r.t;
        best = { t: r.t, point: new THREE.Vector3(o.x + d.x * r.t, o.y + d.y * r.t, o.z + d.z * r.t), normal: new THREE.Vector3(-d.x, 0.2, -d.z), char: c, head: r.head, terrain: false };
      }
    }
    return best;
  }

  // ---- projectiles --------------------------------------------------------------------------------------------------------------------------
  fireProjectile(ch, st, muzzle, dir, spreadRad, dmg) {
    const def = st.def, pj = def.projectile;
    const d = this.perturb(dir, spreadRad, false, new THREE.Vector3());
    // aim at what the crosshair sees so rockets don't veer off
    const res = this.trace(ch, ch.aimOrigin, d, 400);
    const target = res ? res.point : _p.set(ch.aimOrigin.x + d.x * 400, ch.aimOrigin.y + d.y * 400, ch.aimOrigin.z + d.z * 400);
    const v = new THREE.Vector3(target.x - muzzle.x, target.y - muzzle.y, target.z - muzzle.z).normalize();
    // compensate gravity for lobbed grenades
    if (pj.gravity > 5) {
      const dist = Math.hypot(target.x - muzzle.x, target.z - muzzle.z);
      v.y += (0.5 * pj.gravity * (dist / pj.speed)) / pj.speed;
      v.normalize();
    }
    this.spawn({
      kind: pj.kind, owner: ch, dmg, radius: pj.radius, speed: pj.speed, gravity: pj.gravity, fuse: pj.fuse, bounce: pj.bounce || 0,
      pos: muzzle.clone(), vel: v.multiplyScalar(pj.speed), def, explode: pj.kind !== 'bolt',
    });
  }

  throwItem(ch, st) {
    const def = st.def;
    const fx = -Math.sin(ch.yaw), fz = -Math.cos(ch.yaw);
    const start = new THREE.Vector3(ch.pos.x + fx * 0.4, ch.pos.y + 1.5, ch.pos.z + fz * 0.4);
    let v = def.throwSpeed;
    const grav = def.gravity;
    // aim for the point under the crosshair using a proper ballistic arc; short throws are
    // lobbed with less speed so they land steeply instead of skidding past the target
    const res = this.trace(ch, ch.aimOrigin, ch.aimDir, 80);
    const dir = new THREE.Vector3();
    let solved = false;
    if (res) {
      const dx = res.point.x - start.x, dz = res.point.z - start.z, dy = res.point.y + 0.3 - start.y;
      const R = Math.hypot(dx, dz);
      if (R > 1.2) {
        let vu = Math.min(v, Math.max(8, Math.sqrt((grav * R) / 0.92)));
        let disc = vu ** 4 - grav * (grav * R * R + 2 * dy * vu * vu);
        if (disc < 0) { vu = v; disc = vu ** 4 - grav * (grav * R * R + 2 * dy * vu * vu); }
        const theta = disc < 0 ? Math.PI / 4 : Math.atan2(vu * vu - Math.sqrt(disc), grav * R);
        v = vu;
        dir.set((dx / R) * Math.cos(theta), Math.sin(theta), (dz / R) * Math.cos(theta));
        solved = true;
      }
    }
    if (!solved) { dir.copy(ch.aimDir); dir.y += 0.18; dir.normalize(); }
    const vel = dir.multiplyScalar(v).add(new THREE.Vector3(ch.vel.x * 0.4, 0, ch.vel.z * 0.4));
    this.spawn({ kind: 'throw', owner: ch, dmg: def.dmg, radius: def.radius, gravity: grav, fuse: def.fuse, bounce: def.bounce, pos: start, vel, def, explode: true });
    this.game.audio.play('swing', ch.pos, { max: 40, vol: 0.6 });
    this.game.noise(ch.pos, def.noise, ch);
  }

  spawn(p) {
    const g = this.game;
    p.t = 0;
    p.rest = false;
    p.spin = new THREE.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8);
    if (p.kind === 'rocket') {
      const m = new THREE.Group();
      const body = new THREE.Mesh(ROCKET.bodyGeo, ROCKET.bodyMat);
      const nose = new THREE.Mesh(ROCKET.noseGeo, ROCKET.noseMat);
      nose.position.z = -0.33;
      m.add(body, nose);
      p.mesh = m;
    } else if (p.kind === 'bolt') {
      p.mesh = new THREE.Mesh(ROCKET.boltGeo, ROCKET.boltMat);
    } else {
      const m = itemModel(p.def.model ? p.def.id : 'frag');
      m.scale.setScalar(p.kind === 'grenade' ? 1.4 : 1.6);
      p.mesh = m;
      if (p.kind === 'grenade') p.mesh = itemModel('frag'), p.mesh.scale.setScalar(1.3);
    }
    p.mesh.position.copy(p.pos);
    g.scene.add(p.mesh);
    this.projectiles.push(p);
  }

  update(dt) {
    const g = this.game;
    const w = g.world.collision;
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.t += dt;
      let done = false;
      if (!p.rest) {
        p.vel.y -= (p.gravity || 0) * dt;
        const len = p.vel.length() * dt;
        if (len > 0) {
          _d.copy(p.vel).normalize();
          // static geometry
          let tHit = w.raycast(p.pos.x, p.pos.y, p.pos.z, _d.x, _d.y, _d.z, len + 0.12, hitInfo);
          // characters (rockets, bolts, launcher grenades and thrown items all detonate on contact with players for rockets/bolts)
          let charHit = null;
          if (p.kind === 'rocket' || p.kind === 'bolt' || p.kind === 'grenade') {
            for (const c of g.chars) {
              if (!c.alive || c === p.owner && p.t < 0.15 || c.mode === 'bus') continue;
              const r = rayChar(p.pos.x, p.pos.y, p.pos.z, _d.x, _d.y, _d.z, tHit >= 0 ? tHit : len, c);
              if (r && (tHit < 0 || r.t < tHit)) { tHit = r.t; charHit = { c, head: r.head }; }
            }
          }
          if (tHit >= 0) {
            const hx = p.pos.x + _d.x * tHit, hy = p.pos.y + _d.y * tHit, hz = p.pos.z + _d.z * tHit;
            if (p.kind === 'rocket' || (p.kind === 'grenade' && charHit)) {
              p.pos.set(hx, hy, hz);
              this.explode(p.pos, p);
              done = true;
            } else if (p.kind === 'bolt') {
              if (charHit) {
                const f = 1;
                charHit.c.takeDamage(p.dmg * f * (charHit.head ? p.def.headshot : 1), p.owner, { headshot: charHit.head, weapon: p.def, dir: _d.clone().setY(0).normalize(), pos: charHit.c.pos });
                g.fx.hit(_p.set(hx, hy, hz));
                p.owner.stats.damage += p.dmg;
                p.owner.stats.hits++;
              } else {
                g.fx.impact(_p.set(hx, hy, hz), _n.set(hitInfo.nx, hitInfo.ny, hitInfo.nz), hitInfo.kind === 0 ? 'terrain' : 'rock');
              }
              done = true;
            } else {
              // bounce
              const nx = hitInfo.nx, ny = hitInfo.ny, nz = hitInfo.nz;
              const vn = p.vel.x * nx + p.vel.y * ny + p.vel.z * nz;
              const e = p.bounce || 0.4;
              p.vel.x -= (1 + e) * vn * nx; p.vel.y -= (1 + e) * vn * ny; p.vel.z -= (1 + e) * vn * nz;
              const grounded = ny > 0.5;
              const fr = grounded ? 0.4 : 0.8;
              p.vel.x *= fr; p.vel.z *= fr;
              p.pos.set(hx + nx * 0.06, hy + ny * 0.06, hz + nz * 0.06);
              if (p.vel.length() < 2.4 && ny > 0.5) { p.rest = true; p.vel.set(0, 0, 0); }
            }
          } else p.pos.addScaledVector(_d, len);
        }
        if (p.kind === 'rocket') g.fx.smokeTrail(p.pos);
      }
      if (!done && p.fuse != null && p.t >= p.fuse) {
        if (p.explode) { this.explode(p.pos, p); }
        done = true;
      }
      if (done) {
        g.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
        continue;
      }
      p.mesh.position.copy(p.pos);
      if (p.kind === 'rocket' || p.kind === 'bolt') p.mesh.lookAt(p.pos.x + p.vel.x, p.pos.y + p.vel.y, p.pos.z + p.vel.z);
      else if (!p.rest) { p.mesh.rotation.x += p.spin.x * dt; p.mesh.rotation.z += p.spin.z * dt; }
      // blink the fuse of thrown explosives
      if (p.kind === 'throw' && p.fuse - p.t < 0.6 && Math.floor(p.t * 12) % 2 === 0) p.mesh.scale.setScalar(1.9); else if (p.kind === 'throw') p.mesh.scale.setScalar(1.6);
    }
  }

  explode(pos, p) {
    const g = this.game;
    const def = p.def;
    const kind = def.id === 'impulse' ? 'impulse' : def.id === 'boogie' ? 'boogie' : 'fire';
    const radius = p.radius;
    g.fx.explosion(pos, radius, kind);
    g.audio.play(kind === 'impulse' ? 'impulse' : kind === 'boogie' ? 'boogie' : 'explosion', pos, { max: kind === 'fire' ? 400 : 150 });
    g.noise(pos, kind === 'fire' ? 220 : 90, p.owner);
    g.explosionShake(pos, radius);
    const impulse = def.impulse ?? 11;
    for (const c of g.chars) {
      if (!c.alive || c.mode === 'bus') continue;
      const cy = c.pos.y + 0.9;
      const dx = c.pos.x - pos.x, dy = cy - pos.y, dz = c.pos.z - pos.z;
      const dist = Math.hypot(dx, dy, dz);
      if (dist > radius + 0.6) continue;
      // blocked by walls?
      if (dist > 1.2 && !g.world.collision.clearLine(pos.x, pos.y + 0.3, pos.z, c.pos.x, cy, c.pos.z)) continue;
      const f = clamp(1 - dist / (radius + 0.6), 0.05, 1);
      if (p.dmg > 0) {
        const self = c === p.owner ? 0.5 : 1;
        _n.set(dx, 0, dz).normalize();
        c.takeDamage(p.dmg * f * self * (kind === 'fire' ? 1 : 0), p.owner, { weapon: def, explosive: true, dir: _n.clone(), pos: c.pos });
        if (p.owner && c !== p.owner) { p.owner.stats.damage += p.dmg * f; }
      }
      if (def.dance) { c.danceT = Math.max(c.danceT, def.dance); c.cancelUse?.(); }
      // knockback
      if (c.alive && c.mode !== 'skydive') {
        _m.set(dx, dy, dz);
        if (_m.lengthSq() < 0.01) _m.set(0, 1, 0);
        _m.normalize();
        _m.y = Math.max(_m.y, 0.35) + 0.25;
        _m.normalize();
        const k = kind === 'impulse' ? impulse * (0.45 + 0.55 * f) : 8 * f + 2;
        c.vel.x += _m.x * k; c.vel.z += _m.z * k; c.vel.y = Math.max(c.vel.y, 0) + _m.y * k;
        if (_m.y * k > 1.5) { c.grounded = false; c.swimming = false; c.grapple = null; }
        if (kind === 'impulse') c.noFall = false;
      }
    }
  }

  // ---- melee ------------------------------------------------------------------------------------------------------------------------------------
  melee(ch, st) {
    const g = this.game;
    const def = st.def;
    const dmg = def.dmg * RARITIES[st.rarity].mult;
    const fx = -Math.sin(ch.yaw), fz = -Math.cos(ch.yaw);
    let hits = 0;
    for (const c of g.chars) {
      if (c === ch || !c.alive || c.mode === 'bus') continue;
      const dx = c.pos.x - ch.pos.x, dz = c.pos.z - ch.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > def.range + R_BODY || Math.abs(c.pos.y - ch.pos.y) > 2) continue;
      const dot = (dx * fx + dz * fz) / Math.max(d, 0.001);
      if (dot < Math.cos(def.arc)) continue;
      if (!g.world.collision.clearLine(ch.pos.x, ch.pos.y + 1.2, ch.pos.z, c.pos.x, c.pos.y + 1.2, c.pos.z)) continue;
      _n.set(dx, 0, dz).normalize();
      c.takeDamage(dmg, ch, { weapon: def, melee: true, dir: _n.clone(), pos: c.pos });
      c.vel.x += _n.x * def.knock; c.vel.z += _n.z * def.knock;
      if (def.knock > 5) { c.vel.y += 3; c.grounded = false; }
      g.fx.hit(_p.set(c.pos.x, c.pos.y + 1.2, c.pos.z));
      ch.stats.damage += dmg; ch.stats.hits++;
      hits++;
      if (hits >= 2) break;
    }
    if (hits) g.audio.play('melee_hit', ch.pos, { max: 60 });
    else {
      // tink on walls
      const o = _o.set(ch.pos.x, ch.pos.y + 1.2, ch.pos.z);
      _d.set(fx, 0, fz);
      const t = g.world.collision.raycast(o.x, o.y, o.z, _d.x, _d.y, _d.z, def.range, hitInfo);
      if (t >= 0) {
        g.fx.impact(_p.set(hitInfo.x, hitInfo.y, hitInfo.z), _n.set(hitInfo.nx, hitInfo.ny, hitInfo.nz), 'rock');
        g.audio.play('melee_hit', ch.pos, { max: 40, vol: 0.5 });
      }
    }
    g.noise(ch.pos, 25, ch);
  }

  // ---- gadgets -------------------------------------------------------------------------------------------------------------------------------------
  useGadget(ch, st) {
    const g = this.game;
    const def = st.def;
    if (def.gadget === 'grapple') {
      const o = ch.aimOrigin, d = ch.aimDir;
      const t = g.world.collision.raycast(o.x, o.y, o.z, d.x, d.y, d.z, def.range + 4, hitInfo);
      if (t < 0) { if (ch.isPlayer) g.hud?.toast('Nothing to grapple'); return; }
      ch.grapple = { x: hitInfo.x, y: hitInfo.y, z: hitInfo.z, t: 0 };
      ch.grounded = false;
      ch.vel.y = Math.max(ch.vel.y, 2);
      g.audio.play('grapple', ch.pos, { max: 80 });
      g.fx.impact(_p.set(hitInfo.x, hitInfo.y, hitInfo.z), _n.set(hitInfo.nx, hitInfo.ny, hitInfo.nz), 'rock');
      st.count--;
    } else if (def.gadget === 'launchpad') {
      const fx = -Math.sin(ch.yaw), fz = -Math.cos(ch.yaw);
      const x = ch.pos.x + fx * 2.2, z = ch.pos.z + fz * 2.2;
      const y = g.world.collision.groundAt(x, z, ch.pos.y + 0.5, 0.6);
      g.addJumpPad({ x, y, z, r: 1.6, vy: 21, vx: fx * 6, vz: fz * 6, expires: g.time + 90 });
      g.audio.play('place', ch.pos, { max: 40 });
      st.count--;
    }
    if (st.count <= 0) {
      const i = ch.inv.slots.indexOf(st);
      if (i > 0) ch.inv.slots[i] = null;
      ch.afterEmpty();
    }
  }
}
