import * as THREE from 'three';
import { characterModel, itemModel, gliderModel } from '../models.js';
import { Inventory, SLOT_COUNT } from '../inventory.js';
import { ITEMS, RARITIES, gunReload, makeStack } from '../items.js';
import { WORLD } from '../world/terrain.js';
import { clamp, lerp, damp, dampAngle, wrapAngle } from '../util.js';

export const PHYS = {
  radius: 0.38, height: 1.8, crouchHeight: 1.35, step: 0.55,
  walk: 6.2, sprint: 9.2, crouch: 3.0, swim: 3.7,
  jump: 8.8, gravity: 26, terminal: 62, accel: 55, airAccel: 14,
  fallSafe: 18, fallDmg: 4.6,
};

const _v = new THREE.Vector3();
const _hit = {};

export class Character {
  constructor(game, o) {
    this.game = game;
    this.id = o.id;
    this.name = o.name;
    this.isPlayer = !!o.isPlayer;
    this.seed = o.seed ?? 1;
    this.skill = o.skill ?? 'player';
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.bodyYaw = 0;
    this.hp = 100;
    this.shield = 0;
    this.alive = true;
    this.mode = 'bus'; // bus | skydive | glide | normal | dead
    this.grounded = false;
    this.swimming = false;
    this.crouching = false;
    this.sprinting = false;
    this.ads = false;
    this.noFall = false;
    this.inv = new Inventory();
    this.kills = 0;
    this.placement = 0;
    this.input = { fwd: 0, strafe: 0, jump: false, jumpPressed: false, sprint: false, crouch: false, fire: false, firePressed: false, ads: false };
    this.aimOrigin = new THREE.Vector3();
    this.aimDir = new THREE.Vector3(0, 0, -1);

    this.fireCd = 0;
    this.burstLeft = 0;
    this.reload = null;
    this.using = null;
    this.swingT = 0;
    this.swingHit = false;
    this.throwT = 0;
    this.equipT = 0;
    this.flashT = 0;
    this.bloom = 0;
    this.spin = 0;
    this.recoil = 0;
    this.buffs = { speedT: 0, jumpT: 0 };
    this.hot = null;
    this.danceT = 0;
    this.grapple = null;
    this.airTime = 0;
    this.stepDist = 0;
    this.phase = 0;
    this.lastDamageT = -99;
    this.lastAttacker = null;
    this.lastHitDir = new THREE.Vector3();
    this.jumpHeld = false;
    this.diveT = 0;
    this.deadT = 0;
    this.stats = { damage: 0, shots: 0, hits: 0 };
    this.pendingMsg = null;

    // visuals
    const m = characterModel(this.seed, o.look || {});
    this.model = m;
    this.root = m.root;
    this.glider = gliderModel(o.gliderColor ?? [0xff5a2f, 0x2f9bff, 0x35c46a, 0xc94bd8, 0xffc42a][this.seed % 5]);
    this.glider.visible = false;
    this.root.add(this.glider);
    this.held = null;
    this.heldId = null;
    this.muzzleFlash = this._makeFlash();
    game.scene.add(this.root);
    this.root.visible = false;
    this.ropeLine = null;
  }

  _makeFlash() {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    const a = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), mat);
    const b = a.clone();
    b.rotation.z = Math.PI / 2;
    const c = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), mat);
    c.rotation.y = Math.PI / 2;
    g.add(a, b, c);
    g.visible = false;
    return g;
  }

  get height() { return this.crouching ? PHYS.crouchHeight : PHYS.height; }
  get eyeHeight() { return this.crouching ? 1.18 : 1.62; }
  get stack() { return this.inv.current; }

  eyePos(out = _v) { return out.set(this.pos.x, this.pos.y + this.eyeHeight, this.pos.z); }

  place(x, y, z) {
    this.pos.set(x, y, z);
    this.root.position.copy(this.pos);
  }

  // ------------------------------------------------------------------------------------------------------------
  // lifecycle
  // ------------------------------------------------------------------------------------------------------------
  setMode(mode) {
    const prev = this.mode;
    this.mode = mode;
    this.root.visible = mode !== 'bus';
    this.glider.visible = mode === 'glide';
    if (mode === 'skydive') { this.grounded = false; this.diveT = 0; this.cancelUse(); this.reload = null; }
    if (mode === 'glide') { this.game.audio.play('glider', this.pos, { vol: 0.8, max: 150 }); }
    if (mode === 'normal' && (prev === 'skydive' || prev === 'glide')) { this.grounded = false; }
    this.refreshHeld();
  }

  // ------------------------------------------------------------------------------------------------------------
  // held item
  // ------------------------------------------------------------------------------------------------------------
  refreshHeld() {
    const st = this.stack;
    const show = this.mode === 'normal' && st;
    const id = show ? st.def.id : null;
    if (id === this.heldId) return;
    if (this.held) { this.held.parent?.remove(this.held); this.held = null; }
    this.heldId = id;
    if (!id) return;
    const model = itemModel(id);
    const def = st.def;
    const hand = this.model.armR.hand;
    if (def.kind === 'gun') { model.rotation.x = -Math.PI / 2; model.position.set(0, -0.02, 0.0); }
    else if (def.kind === 'melee') { model.rotation.x = -Math.PI / 2 + 0.25; model.position.set(0, -0.02, 0); }
    else { model.rotation.x = -Math.PI / 2; model.position.set(0, -0.06, 0); }
    hand.add(model);
    this.held = model;
    if (def.kind === 'gun') {
      this.muzzleFlash.position.set(0, 0.03, model.userData.muzzleZ ?? -0.3);
      model.add(this.muzzleFlash);
    }
  }

  equip(i) {
    if (i < 0 || i >= SLOT_COUNT || !this.inv.slots[i] || i === this.inv.sel) return;
    if (this.mode !== 'normal') return;
    this.cancelUse();
    this.reload = null;
    this.burstLeft = 0;
    if (this.inv.sel > 0) this.inv.lastSel = this.inv.sel;
    this.inv.sel = i;
    this.equipT = this.inv.slots[i].def.kind === 'gun' ? 0.35 : 0.2;
    this.refreshHeld();
    if (this.isPlayer || this.game.nearPlayer(this.pos, 25)) this.game.audio.play('equip', this.pos, { vol: 0.8, max: 40 });
  }

  cycle(dir) {
    for (let k = 1; k <= SLOT_COUNT; k++) {
      const i = (this.inv.sel + dir * k + SLOT_COUNT * 4) % SLOT_COUNT;
      if (this.inv.slots[i]) { this.equip(i); return; }
    }
  }

  /** Best slot to fall back to after a stack runs out. */
  afterEmpty() {
    const sel = this.inv.sel;
    if (sel > 0 && !this.inv.slots[sel]) {
      const back = this.inv.lastSel;
      if (back > 0 && this.inv.slots[back]) { this.inv.sel = 0; this.equip(back); }
      else { this.inv.sel = 0; this.refreshHeld(); this.equipT = 0.2; }
    }
  }

  // ------------------------------------------------------------------------------------------------------------
  // damage
  // ------------------------------------------------------------------------------------------------------------
  takeDamage(amount, attacker, info = {}) {
    if (!this.alive || amount <= 0) return 0;
    if (this.mode === 'bus') return 0;
    let a = amount;
    const hadShield = this.shield > 0;
    if (this.shield > 0) {
      const s = Math.min(this.shield, a);
      this.shield -= s;
      a -= s;
    }
    this.hp -= a;
    this.lastDamageT = this.game.time;
    if (attacker && attacker !== this) this.lastAttacker = attacker;
    if (info.dir) this.lastHitDir.copy(info.dir);
    this.stats.damageTaken = (this.stats.damageTaken || 0) + amount;
    this.game.onDamage(this, attacker, amount, info, hadShield && this.shield <= 0);
    if (this.hp <= 0) this.die(attacker, info);
    return amount;
  }

  heal(hp, shield, hpCap = 100, shieldCap = 100) {
    if (hp > 0 && this.hp < hpCap) this.hp = Math.min(hpCap, this.hp + hp);
    if (shield > 0 && this.shield < shieldCap) this.shield = Math.min(shieldCap, this.shield + shield);
  }

  die(attacker, info = {}) {
    if (!this.alive) return;
    this.alive = false;
    this.hp = 0;
    this.shield = 0;
    this.cancelUse();
    this.reload = null;
    this.grapple = null;
    const wasAir = this.mode === 'skydive' || this.mode === 'glide';
    this.mode = 'dead';
    this.glider.visible = false;
    if (this.held) { this.held.parent?.remove(this.held); this.held = null; this.heldId = null; }
    this.game.onElimination(this, attacker, info, wasAir);
  }

  // ------------------------------------------------------------------------------------------------------------
  // items
  // ------------------------------------------------------------------------------------------------------------
  pickup(drop) {
    const res = this.inv.pickup(drop);
    if (!res.taken) return false;
    if (res.swapped) this.game.loot.dropStack(res.swapped, this.pos, this);
    if (res.slot > 0 && this.inv.sel === res.slot) this.refreshHeld();
    // auto-equip a gun when we are empty-handed
    if (res.slot > 0 && this.inv.sel === 0 && this.inv.slots[res.slot]?.def.kind === 'gun' && !this.inv.slots.some((s, i) => i !== res.slot && i > 0 && s && s.def.kind === 'gun')) {
      this.equip(res.slot);
    }
    return true;
  }

  dropSelected() {
    const i = this.inv.sel;
    if (i === 0) return;
    const st = this.inv.remove(i);
    if (!st) return;
    this.game.loot.dropStack(st, this.pos, this, true);
    this.cancelUse();
    this.afterEmpty();
  }

  canUse(def) {
    if (def.airOnly) return this.grounded || this.swimming || this.mode !== 'normal' ? 'Can only be eaten mid-air!' : null;
    if (def.buff) return this.buffs.speedT > def.buff.dur * 0.8 ? 'Already super-charged' : null;
    if (def.hp && !def.shield && !def.hot && this.hp >= def.hpCap) return 'Health is full';
    if (def.shield && !def.hp && this.shield >= def.shieldCap) return 'Shield is full';
    if (def.hp && def.shield && this.hp >= def.hpCap && this.shield >= def.shieldCap) return 'Already at full';
    if (def.hot && this.hp >= 100 && this.shield >= 100) return 'Already at full';
    return null;
  }

  startUse(stack) {
    const def = stack.def;
    if (this.using || this.equipT > 0) return false;
    const why = this.canUse(def);
    if (why) { if (this.isPlayer) this.game.hud?.toast(why); return false; }
    this.using = { stack, t: 0, dur: def.time, def };
    const snd = def.id === 'apple' || def.id === 'banana' || def.id === 'mushroom' || def.id === 'floorange' || def.id === 'jumpple' ? 'eat' : def.id === 'bandage' || def.id === 'medkit' ? 'ammo' : 'drink';
    if (this.isPlayer || this.game.nearPlayer(this.pos, 30)) this.game.audio.play(snd, this.pos, { vol: 0.8, max: 40 });
    return true;
  }

  cancelUse() { this.using = null; }

  finishUse() {
    const { stack, def } = this.using;
    this.using = null;
    const g = this.game;
    let ok = true;
    if (def.airOnly) {
      if (this.grounded || this.swimming) ok = false;
      else {
        // Floorange: teleport to the ground without fall damage
        const gy = g.world.groundAt(this.pos.x, this.pos.z, this.pos.y, PHYS.step);
        g.fx.teleport(this.pos, 'orange');
        this.pos.y = gy;
        this.vel.set(this.vel.x * 0.2, 0, this.vel.z * 0.2);
        this.grounded = true;
        this.noFall = false;
        this.airTime = 0;
        g.fx.teleport(this.pos, 'orange');
        g.audio.play('floorange', this.pos, { max: 80 });
        this.heal(def.hp, 0, 100, 100);
        if (this.isPlayer) g.hud?.toast('Floorange! No fall damage');
      }
    } else {
      if (def.hp || def.shield) this.heal(def.hp, def.shield, def.hpCap, def.shieldCap);
      if (def.hot) this.hot = { hp: def.hot.hp, shield: def.hot.shield, t: 0, dur: def.hot.dur };
      if (def.buff) {
        this.buffs.speedT = def.buff.dur; this.buffs.jumpT = def.buff.dur;
        this.buffs.speed = def.buff.speed; this.buffs.jump = def.buff.jump;
        g.audio.play('jumpple', this.pos, { max: 40 });
        if (this.isPlayer) g.hud?.toast('Jumpple! Super speed & jump');
      }
      if (def.shield && !def.buff) g.audio.play('shield', this.pos, { max: 40, vol: 0.6 });
      else if (def.hp >= 15) g.audio.play('heal', this.pos, { max: 40, vol: 0.6 });
    }
    if (ok) {
      stack.count--;
      if (stack.count <= 0) {
        const i = this.inv.slots.indexOf(stack);
        if (i > 0) this.inv.slots[i] = null;
        this.afterEmpty();
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------
  // update
  // ------------------------------------------------------------------------------------------------------------
  update(dt) {
    if (!this.alive) { this.updateDead(dt); return; }
    if (this.mode === 'bus') { this.root.visible = false; return; }
    const g = this.game;
    const inp = this.input;

    // timers
    this.fireCd = Math.max(0, this.fireCd - dt);
    this.equipT = Math.max(0, this.equipT - dt);
    this.flashT = Math.max(0, this.flashT - dt);
    this.bloom = Math.max(0, this.bloom - 7 * dt);
    this.recoil = Math.max(0, this.recoil - 9 * dt);
    this.buffs.speedT = Math.max(0, this.buffs.speedT - dt);
    this.buffs.jumpT = Math.max(0, this.buffs.jumpT - dt);
    this.danceT = Math.max(0, this.danceT - dt);
    if (this.hot) {
      this.hot.t += dt;
      const r = dt / this.hot.dur;
      this.heal(this.hot.hp * r, this.hot.shield * r, 100, 100);
      if (this.isPlayer || this.game.nearPlayer(this.pos, 30)) if (Math.random() < dt * 6) g.fx.heal(this.pos, 'shield');
      if (this.hot.t >= this.hot.dur) this.hot = null;
    }
    if (this.danceT > 0) { inp.fire = false; inp.firePressed = false; inp.jumpPressed = false; }

    // movement
    let left = dt;
    while (left > 0) {
      const h = Math.min(left, 1 / 60);
      left -= h;
      if (this.mode === 'skydive' || this.mode === 'glide') this.stepAir(h);
      else this.stepGround(h);
    }
    inp.jumpPressed = false;

    // keep inside the world
    const lim = WORLD.limit + 20;
    const d = Math.hypot(this.pos.x, this.pos.z);
    if (d > lim) { this.pos.x *= lim / d; this.pos.z *= lim / d; }

    if (this.mode === 'normal') this.updateCombat(dt);
    if (this.renderOn !== false) this.updateModel(dt);
    else this.root.position.copy(this.pos);
  }

  // ---- ground / swim movement ------------------------------------------------------------------------------------------
  speedMul() {
    let m = 1;
    if (this.buffs.speedT > 0) m *= this.buffs.speed || 1.38;
    if (this.using) m *= 0.55;
    if (this.ads) m *= 0.65;
    const st = this.stack;
    if (st && st.def.speedPenalty && this.input.fire) m *= st.def.speedPenalty;
    if (this.danceT > 0) m = 0;
    return m;
  }

  stepGround(dt) {
    const g = this.game, w = g.world, inp = this.input, p = this.pos;
    // stance
    this.crouching = (inp.crouch && !this.swimming) || (this.crouching && inp.crouch);
    const wantSprint = inp.sprint && inp.fwd > 0.1 && !this.crouching && !this.using && !this.ads && this.danceT <= 0;
    this.sprinting = wantSprint && (this.grounded || this.swimming);
    let speed = this.swimming ? PHYS.swim : this.crouching ? PHYS.crouch : this.sprinting ? PHYS.sprint : PHYS.walk;
    if (this.swimming && this.sprinting) speed = PHYS.swim * 1.45;
    speed *= this.speedMul();
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    const fx = -sy, fz = -cy, rx = cy, rz = -sy;
    let wx = fx * inp.fwd + rx * inp.strafe, wz = fz * inp.fwd + rz * inp.strafe;
    const wl = Math.hypot(wx, wz);
    if (wl > 1) { wx /= wl; wz /= wl; }
    if (this.danceT > 0) { wx = 0; wz = 0; }
    const tvx = wx * speed, tvz = wz * speed;

    // grappling pulls us toward the anchor
    if (this.grapple) this.stepGrapple(dt);

    const accel = this.grounded || this.swimming ? (wl > 0.01 ? PHYS.accel : PHYS.accel * 0.8) : PHYS.airAccel;
    if (!this.grapple) {
      const dvx = tvx - this.vel.x, dvz = tvz - this.vel.z;
      const dl = Math.hypot(dvx, dvz);
      const maxd = accel * dt;
      if (dl > maxd) { this.vel.x += (dvx / dl) * maxd; this.vel.z += (dvz / dl) * maxd; }
      else { this.vel.x = tvx; this.vel.z = tvz; }
    } else {
      // limited steering while swinging
      this.vel.x += tvx * 0.8 * dt; this.vel.z += tvz * 0.8 * dt;
    }

    // horizontal move with step/slope checks, split by axis so we slide along walls
    const ox = p.x, oz = p.z;
    const tryMove = (dx, dz) => {
      if (dx === 0 && dz === 0) return;
      const nx = p.x + dx, nz = p.z + dz;
      const rise = w.terrain.height(nx, nz) - p.y;
      const allow = this.grounded ? 0.2 + Math.hypot(dx, dz) * 1.5 : PHYS.step;
      if (rise > allow && !this.swimming) {
        // too steep: try to slide uphill-sideways handled by caller
        return false;
      }
      p.x = nx; p.z = nz;
      return true;
    };
    const mx = this.vel.x * dt, mz = this.vel.z * dt;
    if (!tryMove(mx, mz)) {
      if (!tryMove(mx, 0)) this.vel.x *= 0.2;
      if (!tryMove(0, mz)) this.vel.z *= 0.2;
    }
    const pushed = w.collision.resolve(p, PHYS.radius, this.height, PHYS.step);
    if (pushed && !this.grapple) {
      const ax = (p.x - ox) / dt, az = (p.z - oz) / dt;
      // remove the velocity component that points into the obstacle
      if (Math.abs(ax) < Math.abs(this.vel.x)) this.vel.x = ax;
      if (Math.abs(az) < Math.abs(this.vel.z)) this.vel.z = az;
    } else if (pushed && this.grapple) {
      this.grapple = null;
    }

    // vertical -----------------------------------------------------------------------------------------------------
    const gy = w.collision.groundAt(p.x, p.z, p.y, PHYS.step);
    const water = WORLD.seaLevel;
    const deep = gy < water - 0.9;
    if (deep && p.y <= water + 0.3) {
      // swimming
      if (!this.swimming) {
        this.swimming = true;
        g.fx.splash(_v.set(p.x, water, p.z), 14);
        if (this.isPlayer || g.nearPlayer(p, 40)) g.audio.play('land', p, { vol: 0.5, max: 60 });
        this.noFall = false;
      }
      this.grounded = false;
      this.grapple = null;
      const ty = water - 0.95;
      this.vel.y = (ty - p.y) * 6 + (inp.jumpPressed ? 4 : 0);
      p.y += this.vel.y * dt;
      this.airTime = 0;
      return;
    }
    this.swimming = false;

    if (this.grounded && !this.grapple) {
      if (p.y - gy > 0.45 + Math.hypot(this.vel.x, this.vel.z) * dt * 1.3) {
        this.grounded = false; // walked off an edge
      } else {
        p.y = gy;
        this.vel.y = 0;
        this.airTime = 0;
        // jump
        const wantJump = inp.jumpPressed || (inp.jump && this.autoHop);
        if (wantJump && !this.crouching && this.danceT <= 0 && !this.using) {
          this.vel.y = PHYS.jump * (this.buffs.jumpT > 0 ? this.buffs.jump || 1.6 : 1);
          this.grounded = false;
          if (this.isPlayer || g.nearPlayer(p, 30)) g.audio.play('jump', p, { vol: 0.6, max: 30 });
        }
        // jump pads
        for (const pad of g.jumpPads()) {
          if (Math.abs(p.y - pad.y) < 0.6 && Math.hypot(p.x - pad.x, p.z - pad.z) < pad.r) {
            this.vel.y = pad.vy;
            this.vel.x += pad.vx; this.vel.z += pad.vz;
            this.grounded = false;
            this.noFall = true;
            g.fx.teleport(p, 'cyan');
            g.audio.play('launchpad', p, { max: 80 });
            break;
          }
        }
      }
    }
    if (!this.grounded) {
      const prevY = p.y;
      const grav = this.grapple ? PHYS.gravity * 0.35 : PHYS.gravity;
      this.vel.y = Math.max(-PHYS.terminal, this.vel.y - grav * dt);
      p.y += this.vel.y * dt;
      this.airTime += dt;
      if (this.vel.y > 0) {
        const ceil = w.collision.ceilingAt(p.x, p.z, p.y + this.height - 0.02, PHYS.radius * 0.8);
        if (p.y + this.height > ceil) { p.y = ceil - this.height; this.vel.y = 0; }
      } else {
        const gy2 = w.collision.groundAt(p.x, p.z, prevY, PHYS.step);
        if (p.y <= gy2) {
          const speedDown = -this.vel.y;
          p.y = gy2;
          this.land(speedDown);
        }
      }
    }
  }

  land(speedDown) {
    const g = this.game;
    this.grounded = true;
    this.grapple = null;
    this.vel.y = 0;
    if (speedDown > PHYS.fallSafe) {
      if (!this.noFall) {
        const dmg = (speedDown - PHYS.fallSafe) * PHYS.fallDmg;
        g.fx.dust(this.pos, 14);
        this.takeDamage(dmg, null, { type: 'fall' });
        if (this.isPlayer) g.hud?.flashDamage(0.6);
      }
      if (this.isPlayer || g.nearPlayer(this.pos, 40)) g.audio.play('land', this.pos, { max: 60 });
      if (this.isPlayer) g.shake(Math.min(0.6, speedDown * 0.015));
    } else if (speedDown > 6 && (this.isPlayer || g.nearPlayer(this.pos, 25))) {
      g.audio.play('land', this.pos, { vol: 0.35, max: 30 });
    }
    this.noFall = false;
    this.airTime = 0;
    // landing cancels an in-progress Floorange
    if (this.using?.def.airOnly) this.cancelUse();
  }

  stepGrapple(dt) {
    const gp = this.grapple;
    gp.t += dt;
    const p = this.pos;
    const dx = gp.x - p.x, dy = gp.y - (p.y + 1.1), dz = gp.z - p.z;
    const d = Math.hypot(dx, dy, dz);
    if (d < 2.4 || gp.t > 3.2 || this.input.jumpPressed && gp.t > 0.25) {
      // release: keep the momentum and add a little hop
      if (this.input.jumpPressed || d < 2.4) { this.vel.y += d < 2.4 ? 3 : 0; }
      this.grapple = null;
      return;
    }
    const pull = 58;
    this.vel.x += (dx / d) * pull * dt;
    this.vel.y += (dy / d) * pull * dt + PHYS.gravity * 0.35 * dt;
    this.vel.z += (dz / d) * pull * dt;
    const sp = Math.hypot(this.vel.x, this.vel.y, this.vel.z);
    const max = 36;
    if (sp > max) { this.vel.multiplyScalar(max / sp); }
    this.grounded = false;
  }

  // ---- skydive & glide -------------------------------------------------------------------------------------------------------------
  stepAir(dt) {
    const g = this.game, w = g.world, inp = this.input, p = this.pos;
    this.diveT += dt;
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    const fx = -sy, fz = -cy, rx = cy, rz = -sy;
    const dive = inp.fwd > 0.3, slow = inp.fwd < -0.3;
    let hs, vyT, rate;
    if (this.mode === 'skydive') {
      hs = dive ? 34 : slow ? 8 : 20;
      vyT = dive ? -63 : slow ? -38 : -50;
      rate = 3.5;
    } else {
      hs = dive ? 23 : slow ? 8 : 15;
      vyT = dive ? -15 : slow ? -6.5 : -9.5;
      rate = 2.5;
    }
    const lat = (this.mode === 'skydive' ? 13 : 9) * inp.strafe;
    const tvx = fx * hs * (dive || slow || this.mode === 'glide' ? 1 : 0.9) + rx * lat;
    const tvz = fz * hs * (dive || slow || this.mode === 'glide' ? 1 : 0.9) + rz * lat;
    this.vel.x = damp(this.vel.x, tvx, rate, dt);
    this.vel.z = damp(this.vel.z, tvz, rate, dt);
    this.vel.y = damp(this.vel.y, vyT, rate, dt);
    const ox = p.x, oz = p.z;
    p.x += this.vel.x * dt;
    p.z += this.vel.z * dt;
    w.collision.resolve(p, 0.5, PHYS.height, PHYS.step);
    if (Math.abs(p.x - ox) < Math.abs(this.vel.x * dt) * 0.5) this.vel.x *= 0.3;
    if (Math.abs(p.z - oz) < Math.abs(this.vel.z * dt) * 0.5) this.vel.z *= 0.3;
    const prevY = p.y;
    p.y += this.vel.y * dt;

    const gy = w.collision.groundAt(p.x, p.z, prevY, 0.3);
    const height = p.y - gy;
    if (this.mode === 'skydive') {
      const auto = height < 85 + (this.seed % 7) * 3;
      if ((inp.jumpPressed && this.diveT > 0.8 && height < 400) || auto) this.setMode('glide');
    }
    if (p.y <= gy + 0.02) {
      p.y = gy;
      this.vel.set(this.vel.x * 0.2, 0, this.vel.z * 0.2);
      this.setMode('normal');
      this.grounded = gy > WORLD.seaLevel - 0.9;
      this.swimming = false;
      this.noFall = false;
      if (this.isPlayer) g.audio.play('land', p, { vol: 0.5 });
      g.fx.dust(p, 8);
    }
  }

  // ---- combat -------------------------------------------------------------------------------------------------------------------------
  updateCombat(dt) {
    const inp = this.input;
    const st = this.stack;
    this.ads = inp.ads && st && st.def.kind === 'gun' && !this.using && !this.reload && this.equipT <= 0 && !this.swimming && this.danceT <= 0;

    // consuming
    if (this.using) {
      this.using.t += dt;
      if (this.stack?.def !== this.using.def) this.cancelUse();
      else if (this.using.t >= this.using.dur) this.finishUse();
      else if (this.using.def.airOnly && (this.grounded || this.swimming)) this.cancelUse();
      return;
    }
    // reload
    if (this.reload) {
      this.reload.t += dt;
      if (this.reload.stack !== st) this.reload = null;
      else if (this.reload.t >= this.reload.dur) {
        const d = st.def;
        const take = Math.min(d.mag - st.mag, this.inv.ammo[d.ammo]);
        st.mag += take;
        this.inv.ammo[d.ammo] -= take;
        this.reload = null;
      }
    }
    if (this.swingT > 0) {
      this.swingT -= dt;
      if (!this.swingHit && this.swingT < this.swingDur * 0.55) {
        this.swingHit = true;
        if (st && st.def.kind === 'melee') this.game.combat.melee(this, st);
      }
    }
    if (this.throwT > 0) {
      this.throwT -= dt;
      if (this.throwT <= 0 && this.pendingThrow) {
        const pt = this.pendingThrow;
        this.pendingThrow = null;
        if (pt.stack === this.stack && pt.stack.count > 0) {
          this.game.combat.throwItem(this, pt.stack);
          pt.stack.count--;
          if (pt.stack.count <= 0) {
            const i = this.inv.slots.indexOf(pt.stack);
            if (i > 0) this.inv.slots[i] = null;
            this.afterEmpty();
          }
        }
      }
    }
    if (!st || this.equipT > 0 || this.swimming) return;
    const def = st.def;
    if (def.kind === 'gun') {
      // spin up (minigun)
      if (def.spinUp) {
        if (inp.fire && !this.reload) this.spin = Math.min(def.spinUp, this.spin + dt);
        else this.spin = Math.max(0, this.spin - dt * 1.5);
      }
      if (this.burstLeft > 0 && this.fireCd <= 0) this.shoot(st, true);
      else if (inp.fire && this.fireCd <= 0 && !this.reload && this.burstLeft === 0) {
        const edge = inp.firePressed;
        if (def.spinUp && this.spin < def.spinUp) return;
        if (def.auto || edge) {
          if (st.mag <= 0) { if (edge) this.game.audio.play('dry', this.pos, { max: 30 }); this.startReload(); }
          else {
            if (def.burst) this.burstLeft = def.burst;
            this.shoot(st, def.burst > 0);
          }
        }
      }
      if (st.mag <= 0 && !this.reload && this.fireCd <= 0 && this.burstLeft === 0 && this.inv.ammo[def.ammo] > 0) this.startReload();
    } else if (def.kind === 'melee') {
      if (inp.fire && this.fireCd <= 0 && this.swingT <= 0) {
        this.fireCd = 1 / def.rate;
        this.swingDur = Math.min(0.5, 0.9 / def.rate);
        this.swingT = this.swingDur;
        this.swingHit = false;
        this.game.audio.play('swing', this.pos, { max: 40, vol: 0.8 });
      }
    } else if (def.kind === 'throw') {
      if (inp.firePressed && this.fireCd <= 0 && this.throwT <= 0) {
        this.fireCd = 0.7;
        this.throwT = 0.28;
        this.pendingThrow = { stack: st };
      }
    } else if (def.kind === 'consume') {
      if (inp.firePressed) this.startUse(st);
    } else if (def.kind === 'gadget') {
      if (inp.firePressed && this.fireCd <= 0) {
        this.fireCd = 0.5;
        this.game.combat.useGadget(this, st);
      }
    }
    inp.firePressed = false;
  }

  shoot(st, inBurst) {
    const def = st.def;
    this.game.combat.fireGun(this, st);
    st.mag--;
    this.stats.shots++;
    this.flashT = 0.05;
    this.bloom = Math.min(4, this.bloom + def.recoil * 0.5);
    this.recoil += def.recoil;
    if (inBurst) {
      this.burstLeft--;
      this.fireCd = this.burstLeft > 0 ? 0.075 : 1 / def.rate;
    } else this.fireCd = 1 / def.rate;
    if (st.mag <= 0) this.burstLeft = 0;
  }

  startReload() {
    const st = this.stack;
    if (!st || st.def.kind !== 'gun' || this.reload || this.using) return;
    const d = st.def;
    if (st.mag >= d.mag || this.inv.ammo[d.ammo] <= 0) return;
    this.reload = { stack: st, t: 0, dur: gunReload(st) };
    this.burstLeft = 0;
    if (this.isPlayer || this.game.nearPlayer(this.pos, 25)) this.game.audio.play('reload', this.pos, { max: 35, vol: 0.7 });
  }

  // ---- visuals -------------------------------------------------------------------------------------------------------------------------------------
  updateDead(dt) {
    this.deadT += dt;
    const m = this.model;
    const t = Math.min(1, this.deadT / 0.6);
    this.root.rotation.x = -Math.PI / 2 * (1 - Math.pow(1 - t, 3));
    this.root.position.set(this.pos.x, this.pos.y + 0.12 * t, this.pos.z);
    m.legR.l.rotation.x = lerp(m.legR.l.rotation.x, 0.2, 0.2);
    m.armR.a.rotation.z = lerp(m.armR.a.rotation.z, 0.5, 0.2);
    m.armL.a.rotation.z = lerp(m.armL.a.rotation.z, -0.5, 0.2);
    if (this.deadT > 30) this.root.visible = false;
  }

  updateModel(dt) {
    const m = this.model;
    const st = this.stack;
    const sp = Math.hypot(this.vel.x, this.vel.z);
    const root = this.root;
    root.position.copy(this.pos);
    this.refreshHeld();

    // facing
    let targetYaw = this.bodyYaw;
    const aiming = (this.input.fire || this.ads || this.swingT > 0 || this.throwT > 0 || this.game.time - (this.lastShotT || -9) < 1.5) && this.mode === 'normal';
    if (this.mode === 'skydive' || this.mode === 'glide' || aiming || this.isPlayer && this.stack?.def.kind === 'gun' && (this.ads)) targetYaw = this.yaw;
    else if (sp > 0.8) targetYaw = Math.atan2(-this.vel.x, -this.vel.z);
    else targetYaw = this.bodyYaw;
    if (this.mode === 'normal' && sp <= 0.8 && !aiming) {
      // turn the body if the camera swung far away
      const diff = wrapAngle(this.yaw - this.bodyYaw);
      if (Math.abs(diff) > 1.3) targetYaw = this.yaw;
    }
    this.bodyYaw = dampAngle(this.bodyYaw, targetYaw, 14, dt);
    root.rotation.set(0, this.bodyYaw, 0);

    const t = this.game.time;
    const body = m.body, torso = m.torso, head = m.head;
    const legs = [m.legR, m.legL];
    const arms = [m.armR, m.armL];
    // reset
    body.rotation.set(0, 0, 0);
    body.position.set(0, 0, 0);
    torso.rotation.set(0, 0, 0);
    head.rotation.set(0, 0, 0);

    if (this.mode === 'skydive') {
      const dive = this.input.fwd > 0.3;
      body.rotation.x = -(dive ? 1.3 : 0.9);
      body.position.y = 1.2;
      body.position.z = 0.2;
      m.armR.a.rotation.set(0.5, 0, 1.1); m.armL.a.rotation.set(0.5, 0, -1.1);
      m.armR.fore.rotation.x = 0.2; m.armL.fore.rotation.x = 0.2;
      m.legR.l.rotation.set(0.3 + Math.sin(t * 9) * 0.05, 0, 0.35); m.legL.l.rotation.set(0.3 + Math.sin(t * 9 + 1) * 0.05, 0, -0.35);
      m.legR.shin.rotation.x = -0.2; m.legL.shin.rotation.x = -0.2;
      head.rotation.x = 0.7;
      this.glider.visible = false;
      return;
    }
    if (this.mode === 'glide') {
      this.glider.visible = true;
      body.rotation.x = -0.12;
      m.armR.a.rotation.set(Math.PI * 0.93, 0, 0.18); m.armL.a.rotation.set(Math.PI * 0.93, 0, -0.18);
      m.armR.fore.rotation.x = 0; m.armL.fore.rotation.x = 0;
      m.legR.l.rotation.set(0.2, 0, 0.05); m.legL.l.rotation.set(0.1, 0, -0.05);
      m.legR.shin.rotation.x = -0.35; m.legL.shin.rotation.x = -0.15;
      this.glider.rotation.set(0, 0, clamp(-this.input.strafe * 0.25, -0.3, 0.3));
      return;
    }
    this.glider.visible = false;

    // locomotion phase
    const stride = this.grounded ? sp : 0;
    this.phase += dt * (stride * 1.25 + (stride > 0.3 ? 2 : 0));
    const amp = clamp(stride / 8, 0, 1);
    const ph = this.phase;
    const lean = this.sprinting ? 0.22 : 0.08 * amp;
    body.rotation.x = -lean;
    if (this.crouching) { body.position.y = -0.38; torso.rotation.x = 0.25; }
    if (!this.grounded && !this.swimming) {
      // airborne: tuck legs
      legs.forEach((l, i) => { l.l.rotation.x = 0.5 - i * 0.5; l.shin.rotation.x = -0.9 + i * 0.3; });
    } else if (this.swimming) {
      body.rotation.x = -0.6;
      body.position.y = -0.1;
      legs.forEach((l, i) => { l.l.rotation.x = Math.sin(t * 7 + i * Math.PI) * 0.5; l.shin.rotation.x = -0.1; });
    } else {
      const bend = this.crouching ? 0.7 : 0;
      legs.forEach((l, i) => {
        const s = Math.sin(ph + i * Math.PI);
        l.l.rotation.x = s * 0.85 * amp + bend * 0.5;
        l.shin.rotation.x = -(Math.max(0, -Math.sin(ph + i * Math.PI + 0.9)) * 1.1 * amp + bend);
      });
    }
    // arms
    const swing = Math.sin(ph);
    const kind = st?.def.kind;
    const holdingGun = kind === 'gun' && this.mode === 'normal';
    if (this.danceT > 0) {
      const s = Math.sin(t * 9);
      m.armR.a.rotation.set(2.4 + s * 0.4, 0, -0.5 + s * 0.3); m.armL.a.rotation.set(2.4 - s * 0.4, 0, 0.5 - s * 0.3);
      m.armR.fore.rotation.x = 0.4; m.armL.fore.rotation.x = 0.4;
      body.position.y = Math.abs(Math.sin(t * 9)) * 0.12 - 0.05;
      torso.rotation.z = s * 0.2;
      legs.forEach((l, i) => { l.l.rotation.x = Math.sin(t * 9 + i * Math.PI) * 0.5; l.shin.rotation.x = -Math.abs(Math.sin(t * 9 + i * Math.PI)) * 0.6; });
    } else if (this.using) {
      const k = Math.sin(this.using.t * 7) * 0.08;
      m.armR.a.rotation.set(2.0, 0, 0.1); m.armR.fore.rotation.x = -1.25 + k;
      m.armL.a.rotation.set(-swing * 0.6 * amp, 0, 0); m.armL.fore.rotation.x = 0;
      head.rotation.x = 0.1;
    } else if (this.throwT > 0 && this.pendingThrow) {
      const k = 1 - this.throwT / 0.28;
      m.armR.a.rotation.set(lerp(2.6, 0.9, k * k), 0, 0); m.armR.fore.rotation.x = lerp(-0.6, -0.1, k);
      m.armL.a.rotation.set(-swing * 0.6 * amp, 0, 0); m.armL.fore.rotation.x = 0;
    } else if (holdingGun) {
      const p = clamp(this.pitch, -1.2, 1.2);
      torso.rotation.x = p * 0.3;
      const rec = Math.min(0.25, this.recoil * 0.035);
      m.armR.a.rotation.set(Math.PI / 2 + p * 0.65 + rec, 0, -0.1);
      m.armR.fore.rotation.x = -0.15;
      m.armL.a.rotation.set(Math.PI / 2 + p * 0.65 + rec - 0.15, 0, 0.42);
      m.armL.fore.rotation.set(-0.55, 0, 0);
      head.rotation.x = -p * 0.4;
      if (this.reload) {
        const k = this.reload.t / this.reload.dur;
        m.armL.a.rotation.x = Math.PI / 2 + 0.6 + Math.sin(k * Math.PI * 4) * 0.2;
        m.armL.fore.rotation.set(-1.2, 0, 0);
        torso.rotation.x = 0.15;
      }
    } else if (kind === 'melee' && this.swingT > 0) {
      const k = 1 - this.swingT / this.swingDur;
      const a = lerp(3.0, 0.5, Math.min(1, k * 1.6));
      m.armR.a.rotation.set(a, 0, -0.15); m.armR.fore.rotation.x = lerp(-0.8, -0.1, k);
      torso.rotation.y = lerp(0.5, -0.5, k);
      m.armL.a.rotation.set(0.6 - swing * 0.4 * amp, 0, 0); m.armL.fore.rotation.x = 0;
    } else {
      // relaxed carry
      const a = kind === 'melee' || kind === 'gadget' || kind === 'throw' || kind === 'consume' ? 0.9 : 0.0;
      m.armR.a.rotation.set(a * 0.8 - swing * 0.8 * amp, 0, 0.04); m.armR.fore.rotation.x = -(a * 0.4) - Math.max(0, swing) * 0.4 * amp;
      m.armL.a.rotation.set(swing * 0.8 * amp, 0, -0.04); m.armL.fore.rotation.x = -Math.max(0, -swing) * 0.4 * amp;
      torso.rotation.y = -swing * 0.12 * amp;
    }
    if (this.held && holdingGun) {
      this.muzzleFlash.visible = this.flashT > 0;
      if (this.flashT > 0) this.muzzleFlash.rotation.z = Math.random() * 3;
    } else this.muzzleFlash.visible = false;

    // grapple rope
    if (this.grapple) {
      if (!this.ropeLine) {
        this.ropeLine = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 4), new THREE.MeshBasicMaterial({ color: 0xffb02a }));
        this.game.scene.add(this.ropeLine);
      }
      const a = _v.set(this.pos.x, this.pos.y + 1.3, this.pos.z);
      const b = this.grapple;
      const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
      const len = Math.hypot(dx, dy, dz);
      this.ropeLine.visible = true;
      this.ropeLine.position.set(a.x + dx / 2, a.y + dy / 2, a.z + dz / 2);
      this.ropeLine.scale.set(1, len, 1);
      this.ropeLine.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    } else if (this.ropeLine) this.ropeLine.visible = false;
  }

  /** world position of the weapon muzzle (approximate when no model is shown) */
  muzzlePos(out) {
    if (this.held && this.stack?.def.kind === 'gun') {
      this.model.root.updateMatrixWorld(true);
      return this.muzzleFlash.getWorldPosition(out);
    }
    return this.eyePos(out);
  }

  dispose() {
    this.game.scene.remove(this.root);
    if (this.ropeLine) this.game.scene.remove(this.ropeLine);
  }
}

export { RARITIES, ITEMS, makeStack };
