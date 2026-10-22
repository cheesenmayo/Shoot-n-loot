import * as THREE from 'three';
import { dpsOf, ITEMS, AMMO } from '../items.js';
import { clamp, wrapAngle, dampAngle, rand } from '../util.js';
import { WORLD } from '../world/terrain.js';
import { POIS } from '../world/poidata.js';

export const SKILLS = {
  pro: { id: 'pro', aimErr: 2.1, react: 0.35, vis: 150, hear: 1.0, turn: 11, strafe: 1.0, heal: 1.0, aggression: 0.85, burst: [1.6, 0.12], loot: 1.0, nade: 0.5, storm: 1.0, jumpy: 0.5, fireGap: 0.0 },
  mid: { id: 'mid', aimErr: 5.2, react: 0.7, vis: 110, hear: 0.7, turn: 7, strafe: 0.55, heal: 0.75, aggression: 0.6, burst: [1.0, 0.35], loot: 0.8, nade: 0.15, storm: 0.85, jumpy: 0.15, fireGap: 0.08 },
  noob: { id: 'noob', aimErr: 10.5, react: 1.2, vis: 65, hear: 0.45, turn: 3.8, strafe: 0.15, heal: 0.3, aggression: 0.4, burst: [0.7, 0.7], loot: 0.55, nade: 0.03, storm: 0.45, jumpy: 0.05, fireGap: 0.25 },
};

const IDEAL = { pistol: 20, smg: 16, rifle: 38, shotgun: 9, sniper: 95, lmg: 38, launcher: 38, bow: 60, melee: 2.2 };

const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _hit = {};
const ADJ = ['Sweaty', 'Cranky', 'Lucky', 'Silent', 'Rusty', 'Crispy', 'Turbo', 'Sneaky', 'Wobbly', 'Salty', 'Spicy', 'Cosmic', 'Dizzy', 'Frosty', 'Grumpy', 'Jolly', 'Mighty', 'Nimble', 'Peppy', 'Rowdy', 'Shady', 'Zesty', 'Bouncy', 'Clumsy', 'Fuzzy', 'Gritty', 'Hasty', 'Quirky'];
const NOUN = ['Noodle', 'Pickle', 'Falcon', 'Waffle', 'Bandit', 'Panda', 'Goblin', 'Cactus', 'Walrus', 'Ninja', 'Biscuit', 'Muffin', 'Rocket', 'Taco', 'Yeti', 'Badger', 'Cowboy', 'Llama', 'Pirate', 'Gizmo', 'Potato', 'Viking', 'Wizard', 'Raccoon', 'Sheriff', 'Mango', 'Toaster', 'Banjo'];

export function makeNames(n) {
  const set = new Set();
  while (set.size < n) {
    const a = ADJ[Math.floor(Math.random() * ADJ.length)], b = NOUN[Math.floor(Math.random() * NOUN.length)];
    const style = Math.random();
    let name = a + b;
    if (style < 0.25) name += Math.floor(Math.random() * 99);
    else if (style < 0.35) name = 'xX' + name + 'Xx';
    else if (style < 0.42) name = name.toUpperCase();
    set.add(name);
  }
  return [...set];
}

export class Bot {
  constructor(game, ch, skillId) {
    this.game = game;
    this.ch = ch;
    this.sk = SKILLS[skillId];
    this.state = 'bus';
    this.thinkT = Math.random() * 0.3;
    this.t = 0;
    this.goal = null;
    this.route = [];
    this.enemy = null;
    this.enemyVisible = false;
    this.lastSeen = -99;
    this.noticeT = 0;
    this.lastKnown = new THREE.Vector3();
    this.lootTarget = null;
    this.black = new Map(); // id -> expiry
    this.strafeDir = Math.random() < 0.5 ? -1 : 1;
    this.strafeT = 0;
    this.wob = new THREE.Vector2();
    this.wobTarget = new THREE.Vector2();
    this.wobT = 0;
    this.stuckT = 0;
    this.lastPos = new THREE.Vector3();
    this.lastPosT = 0;
    this.sidestepT = 0;
    this.sidestepDir = 1;
    this.weaponT = 0;
    this.fireWindow = 0;
    this.fireRest = 0;
    this.semiT = 0;
    this.idleT = 0;
    this.investigate = null;
    this.landing = null;
    this.jumpDist = 230 + Math.random() * 40;
    this.healItem = null;
    this.satisfied = false;
    this.lootStart = 0;
    this.wantThrow = null;
    this.avoidBias = Math.random() < 0.5 ? 1 : -1;
    this.travelGoal = null;
    this.hunt = 0;
    this.lastEnemyDist = 0;
    this.dropTarget = null;
    // sandbox flags: 'hostile' = normal AI (hunts the player), 'passive' = idle until hit, 'dummy' = never acts
    this.mode = 'hostile';
    this.provoked = false;
    this.goalT = 0;
  }

  // ------------------------------------------------------------------------------------------------------------------------
  // events
  // ------------------------------------------------------------------------------------------------------------------------
  onNoise(pos, radius, source) {
    const ch = this.ch;
    if (!ch.alive || source === ch || ch.mode !== 'normal') return;
    const d = Math.hypot(pos.x - ch.pos.x, pos.z - ch.pos.z);
    if (d > radius * this.sk.hear || d < 3) return;
    if (this.enemy && this.enemyVisible) return;
    if (!this.investigate || this.game.time - this.investigate.t > 3) this.investigate = { x: pos.x, z: pos.z, t: this.game.time, src: source };
  }

  onDamaged(attacker) {
    if (!attacker || attacker === this.ch || !attacker.alive) return;
    if (this.game.sandbox) {
      // sandbox enemies only ever fight the player; dummies never react
      if (!attacker.isPlayer || this.mode === 'dummy') return;
      this.provoked = true;
    }
    if (!this.enemy || !this.enemy.alive || !this.enemyVisible) {
      this.enemy = attacker;
      this.noticeT = this.sk.react * 0.6;
      this.lastKnown.copy(attacker.pos);
      this.lastSeen = this.game.time;
      this.enemyVisible = false;
      this.hunt = 4;
      // snap the view toward where the shot came from
      this.ch.yaw = Math.atan2(-(attacker.pos.x - this.ch.pos.x), -(attacker.pos.z - this.ch.pos.z)) + (Math.random() - 0.5) * 0.5 * (1 - this.sk.react);
    }
  }

  // ------------------------------------------------------------------------------------------------------------------------
  // main loop
  // ------------------------------------------------------------------------------------------------------------------------
  update(dt) {
    const ch = this.ch;
    if (!ch.alive) return;
    this.t += dt;
    const inp = ch.input;
    inp.firePressed = false;
    inp.jumpPressed = false;
    if (this.mode === 'dummy' || (this.mode === 'passive' && !this.provoked)) return this.hold();
    if (ch.mode === 'bus') return this.updateBus();
    if (ch.mode === 'skydive' || ch.mode === 'glide') return this.updateDrop();
    if (ch.mode !== 'normal') return;
    this.thinkT -= dt;
    if (this.thinkT <= 0) {
      this.thinkT = 0.16 + Math.random() * 0.1;
      this.think();
    }
    this.execute(dt);
  }

  /** Standing still: sandbox dummies and passive enemies that have not been provoked. */
  hold() {
    const inp = this.ch.input;
    inp.fwd = inp.strafe = 0;
    inp.fire = inp.ads = inp.crouch = inp.sprint = inp.jump = false;
  }

  // ---- bus & landing --------------------------------------------------------------------------------------------------------
  pickDropTarget() {
    const g = this.game, bus = g.bus;
    const cands = [];
    const tmp = new THREE.Vector3();
    for (const p of POIS) {
      const lat = bus.lateralDistance(p.x, p.z);
      if (lat > 330) continue;
      cands.push([{ x: p.x + (Math.random() - 0.5) * p.flatR * 1.6, z: p.z + (Math.random() - 0.5) * p.flatR * 1.6, poi: p }, 2.4 + (p.id === 'neon_heights' || p.id === 'parkour_plaza' ? 0.8 : 0)]);
    }
    if (g.world.homesteads) for (const h of g.world.homesteads) if (bus.lateralDistance(h.x, h.z) < 300) cands.push([{ x: h.x, z: h.z }, 1.6]);
    for (const o of g.world.outposts || []) if (bus.lateralDistance(o.x, o.z) < 300) cands.push([{ x: o.x, z: o.z }, 1.6]);
    // random spot near the line
    for (let i = 0; i < 3; i++) {
      const along = Math.random() * bus.length;
      const lat = (Math.random() - 0.5) * 600;
      const x = bus.start.x + bus.dir.x * along - bus.dir.z * lat, z = bus.start.z + bus.dir.z * along + bus.dir.x * lat;
      if (Math.hypot(x, z) < WORLD.islandR - 40 && g.world.terrain.height(x, z) > 2) cands.push([{ x, z }, 2.2]);
    }
    let total = 0;
    for (const c of cands) total += c[1];
    let r = Math.random() * total;
    for (const c of cands) { r -= c[1]; if (r <= 0) return c[0]; }
    return cands.length ? cands[0][0] : { x: 0, z: 0 };
  }

  updateBus() {
    const g = this.game, bus = g.bus, ch = this.ch;
    if (!this.dropTarget) {
      this.dropTarget = this.pickDropTarget();
      this.jumpDist = 215 + Math.random() * 45;
      if (this.sk.id === 'noob' && Math.random() < 0.3) this.jumpDist = 80 + Math.random() * 120; // jumps late
      if (this.sk.id === 'pro' && Math.random() < 0.3) this.jumpDist = 250 + Math.random() * 40;
    }
    const d = Math.hypot(bus.pos.x - this.dropTarget.x, bus.pos.z - this.dropTarget.z);
    // jump once close enough *and* the target is no longer getting closer
    const dx = this.dropTarget.x - bus.pos.x, dz = this.dropTarget.z - bus.pos.z;
    const ahead = dx * bus.dir.x + dz * bus.dir.z;
    const onIsland = Math.hypot(bus.pos.x, bus.pos.z) < WORLD.islandR + 180;
    if (g.time - g.busStartT > 3 && onIsland && (d <= this.jumpDist || ahead < 60 && d < 330)) g.jumpFromBus(ch);
  }

  updateDrop() {
    const ch = this.ch, inp = ch.input;
    const t = this.dropTarget || { x: 0, z: 0 };
    const dx = t.x - ch.pos.x, dz = t.z - ch.pos.z;
    const dh = Math.hypot(dx, dz);
    const gy = this.game.world.terrain.height(ch.pos.x, ch.pos.z);
    const h = ch.pos.y - gy;
    const want = Math.atan2(-dx, -dz);
    ch.yaw = dampAngle(ch.yaw, want, 5, 0.05) + 0 * this.t;
    ch.yaw = want + (Math.sin(this.t * 0.7 + ch.seed) * 0.02);
    if (ch.mode === 'skydive') {
      inp.fwd = dh > 130 ? 1 : 0;
      if (dh < 60 && h > 200) inp.fwd = -1;
    } else {
      // glide: arrive over the target at about the right height
      if (dh > h * 1.5 + 15) inp.fwd = 1;
      else if (dh < h * 0.6) inp.fwd = -1;
      else inp.fwd = 0;
    }
    inp.strafe = 0;
    // avoid landing in the sea
    if (ch.mode === 'glide' && gy < -0.5 && dh < 60) {
      this.dropTarget = { x: t.x * 0.9, z: t.z * 0.9 };
    }
  }

  // ---- thinking ------------------------------------------------------------------------------------------------------------------
  think() {
    const g = this.game, ch = this.ch, sk = this.sk;
    const now = g.time;
    this.scanEnemies(now);

    if (this.state === 'flee') {
      if (now > this.fleeUntil || !this.goal || this.reached(this.goal)) { this.state = 'loot'; this.goal = null; }
      else if (!(this.enemy && this.enemy.alive && this.enemyVisible)) return;
    }
    // consumable bookkeeping: keep the best things equipped / used
    if (this.enemy && this.enemy.alive && (this.enemyVisible || now - this.lastSeen < 4)) {
      if (this.state !== 'fight') { this.state = 'fight'; this.fireWindow = 0; this.fireRest = 0; }
      return;
    }
    if (this.state === 'fight') { this.state = 'loot'; this.enemy = null; this.goal = null; }

    // healing
    const heal = this.pickHeal();
    if (heal && now - this.lastSeen > 2.5 && Math.random() < sk.heal) {
      this.healItem = heal;
      this.state = 'heal';
      return;
    }
    if (this.state === 'heal' && !this.ch.using) this.state = 'loot';

    // storm
    const storm = g.storm;
    let urgent = false, stormGoal = null;
    if (storm.active) {
      const inCur = storm.inside(ch.pos.x, ch.pos.z);
      const dN = Math.hypot(ch.pos.x - storm.nx, ch.pos.z - storm.nz);
      const outsideNext = dN > storm.nr * 0.85;
      const timeLeft = storm.state === 'shrink' ? storm.remaining : storm.state === 'hold' ? storm.remaining + 10 : 5;
      const need = (dN - storm.nr * 0.7) / 8.5;
      if (!inCur) urgent = true;
      else if (outsideNext && (storm.state === 'shrink' || need * (1.2 + (1 - sk.storm)) > timeLeft)) urgent = true;
      if (sk.id === 'noob' && inCur && Math.random() < 0.6) urgent = false;
      if (urgent || (outsideNext && sk.storm > 0.8 && storm.state === 'hold' && storm.remaining < 50)) {
        const a = Math.atan2(ch.pos.z - storm.nz, ch.pos.x - storm.nx);
        const rr = storm.nr * 0.55 * Math.random();
        stormGoal = { x: storm.nx + Math.cos(a) * rr * 0.3, z: storm.nz + Math.sin(a) * rr * 0.3 };
      }
    }
    if (urgent) {
      this.state = 'travel';
      this.setGoal(stormGoal.x, stormGoal.z, true, 6);
      this.lootTarget = null;
      this.useSpeedBoost();
      // grab things that are right next to the path
      const near = this.findLoot(18);
      if (near) { this.state = 'loot'; this.lootTarget = near; this.setGoalForLoot(near); }
      return;
    }

    if (this.investigate && now - this.investigate.t < 8 && Math.random() < 0.7 * sk.aggression + 0.1 && this.hasWeapon()) {
      if (this.state !== 'investigate') {
        this.state = 'investigate';
        this.setGoal(this.investigate.x, this.investigate.z, sk.id !== 'noob', 12);
      }
      if (Math.hypot(ch.pos.x - this.investigate.x, ch.pos.z - this.investigate.z) < 14) { this.investigate = null; this.state = 'loot'; this.goal = null; }
      return;
    } else if (this.state === 'investigate') { this.state = 'loot'; this.goal = null; }

    // sandbox: hostile enemies come looking for the player instead of looting
    if (g.sandbox && this.mode === 'hostile') {
      const target = g.player;
      if (target && target.alive && target.mode !== 'bus' && Math.hypot(target.pos.x - ch.pos.x, target.pos.z - ch.pos.z) > 8) {
        // plan a new route only when the player has moved away from where we are heading (route planning is the costly part)
        if (!this.goal || this.reached(this.goal) || (now - this.goalT > 1.5 && Math.hypot(this.goal.x - target.pos.x, this.goal.z - target.pos.z) > 10)) {
          this.goalT = now;
          this.setGoal(target.pos.x, target.pos.z, true, 6);
        }
        this.state = 'travel';
        this.lootTarget = null;
        this.chooseWeapon(60, true);
        return;
      }
    }

    // idle noobs
    if (sk.id === 'noob' && this.state !== 'idle' && Math.random() < 0.012 && !this.lootTarget) {
      this.state = 'idle'; this.idleT = 1.5 + Math.random() * 3;
    }
    if (this.state === 'idle') {
      this.idleT -= 0.2;
      if (this.idleT <= 0) this.state = 'loot';
      return;
    }

    // loot or roam
    if (this.lootTarget) {
      if (!this.lootStillValid(this.lootTarget)) { this.lootTarget = null; this.goal = null; }
    }
    if (!this.lootTarget) {
      const lt = this.findLoot(this.hasWeapon() ? 120 : 160);
      if (lt) {
        this.lootTarget = lt;
        this.setGoalForLoot(lt);
        this.state = 'loot';
      }
    }
    if (!this.lootTarget) {
      // nothing nearby: head somewhere new (a POI or the next circle)
      if (!this.goal || this.state !== 'travel' || this.reached(this.goal)) {
        const tgt = this.pickRoam();
        this.state = 'travel';
        this.setGoal(tgt.x, tgt.z, true, 8);
      }
    }
    // swap to the best gun for walking around
    this.chooseWeapon(60, true);
    // fall-protection: eat a Floorange when dropping fast (rare)
    if (!ch.grounded && ch.vel.y < -20 && ch.mode === 'normal' && !ch.swimming) {
      const i = ch.inv.find((s) => s.def.id === 'floorange');
      if (i >= 0) { ch.equip(i); ch.input.firePressed = true; }
    }
  }

  hasWeapon() {
    const inv = this.ch.inv;
    for (let i = 1; i < inv.slots.length; i++) {
      const s = inv.slots[i];
      if (s && s.def.kind === 'gun' && (s.mag > 0 || inv.ammo[s.def.ammo] > 0)) return true;
    }
    return false;
  }

  useSpeedBoost() {
    const ch = this.ch;
    if (ch.buffs.speedT > 0 || ch.using) return;
    const i = ch.inv.find((s) => s.def.id === 'jumpple' || s.def.id === 'runana');
    if (i >= 0 && Math.random() < 0.5) { this.healItem = i; this.state = 'heal'; }
  }

  pickHeal() {
    const ch = this.ch, inv = ch.inv;
    if (ch.using) return null;
    const need = (id) => inv.find((s) => s.def.id === id);
    if (ch.hp < 50) { const i = need('medkit'); if (i >= 0) return i; }
    if (ch.shield < 30) { let i = need('chug_jug'); if (i >= 0 && ch.hp < 70) return i; i = need('big_shield'); if (i >= 0) return i; i = need('slurp'); if (i >= 0) return i; }
    if (ch.shield < 50) { const i = need('small_shield'); if (i >= 0) return i; }
    if (ch.hp < 75) { let i = need('bandage'); if (i >= 0) return i; i = need('medkit'); if (i >= 0 && ch.hp < 60) return i; }
    if (ch.hp < 95) { let i = need('apple'); if (i >= 0) return i; i = need('banana'); if (i >= 0) return i; }
    if (ch.shield < 90) { const i = need('mushroom'); if (i >= 0) return i; }
    if (ch.shield < 85 && ch.buffs.runT <= 0) { const i = need('runana'); if (i >= 0) return i; }
    return null;
  }

  // ---- perception ----------------------------------------------------------------------------------------------------------------
  scanEnemies(now) {
    const g = this.game, ch = this.ch, sk = this.sk;
    const eye = ch.eyePos(_a);
    const cands = [];
    const fx = -Math.sin(ch.yaw), fz = -Math.cos(ch.yaw);
    for (const c of g.chars) {
      if (c === ch || !c.alive || c.mode === 'bus') continue;
      if (g.sandbox && !c.isPlayer) continue; // sandbox enemies do not fight each other
      const dx = c.pos.x - ch.pos.x, dz = c.pos.z - ch.pos.z;
      const d2 = dx * dx + dz * dz;
      let range = sk.vis;
      if (c.mode === 'skydive' || c.mode === 'glide') range = 50;
      if (c.crouching) range *= 0.8;
      if (d2 > range * range) continue;
      const d = Math.sqrt(d2);
      const dot = (dx * fx + dz * fz) / Math.max(d, 0.1);
      if (dot < -0.35 && d > 14 && c !== this.enemy) continue; // behind us
      cands.push([d, c]);
    }
    cands.sort((a, b) => a[0] - b[0]);
    let seen = null;
    for (let i = 0; i < Math.min(3, cands.length); i++) {
      const c = cands[i][1];
      _b.set(c.pos.x, c.pos.y + 1.2, c.pos.z);
      if (g.world.collision.clearLine(eye.x, eye.y, eye.z, _b.x, _b.y, _b.z)) { seen = c; break; }
    }
    if (seen) {
      if (seen !== this.enemy || !this.enemyVisible && now - this.lastSeen > 1.0) {
        if (seen !== this.enemy) this.noticeT = sk.react * (0.7 + Math.random() * 0.6);
        else if (now - this.lastSeen > 2) this.noticeT = sk.react * 0.5;
      }
      // choose whether to engage at all: unarmed bots keep their distance unless cornered or hit
      const d = Math.hypot(seen.pos.x - ch.pos.x, seen.pos.z - ch.pos.z);
      const armed = this.hasWeapon() || g.sandbox && this.mode === 'hostile'; // sandbox enemies always engage (melee included)
      const wasHit = now - ch.lastDamageT < 6;
      const engage = armed || d < 4.5 && (wasHit || sk.id === 'pro' && Math.random() < 0.3);
      const flee = !armed && d >= 4.5 && wasHit;
      if (engage && (Math.random() < sk.aggression + 0.25 || this.enemy === seen || d < 25)) {
        this.enemy = seen;
        this.enemyVisible = true;
        this.lastSeen = now;
        this.lastKnown.copy(seen.pos);
        this.lastEnemyDist = d;
      } else if (flee && this.state !== 'flee') {
        this.enemy = null;
        this.state = 'flee';
        const a = Math.atan2(ch.pos.z - seen.pos.z, ch.pos.x - seen.pos.x) + (Math.random() - 0.5) * 1.2;
        this.setGoal(ch.pos.x + Math.cos(a) * 45, ch.pos.z + Math.sin(a) * 45, true, 5);
        this.fleeUntil = now + 6;
      }
    } else {
      this.enemyVisible = false;
      if (this.enemy && !this.enemy.alive) this.enemy = null;
    }
  }

  // ---- loot selection ------------------------------------------------------------------------------------------------------------------
  bestGunDps() {
    let best = 0;
    for (const s of this.ch.inv.slots) if (s && s.def.kind === 'gun') best = Math.max(best, dpsOf(s));
    return best;
  }

  valueOfDrop(d) {
    const ch = this.ch, inv = ch.inv;
    if (this.black.has(d.id) && this.black.get(d.id) > this.game.time) return 0;
    if (d.ammo) {
      const useful = inv.slots.some((s) => s && s.def.kind === 'gun' && s.def.ammo === d.ammo);
      const room = 1 - inv.ammo[d.ammo] / AMMO[d.ammo].max;
      return (useful ? 4 : 0.2) * room;
    }
    const st = d.stack, def = st.def;
    const free = inv.freeSlot() >= 0;
    switch (def.kind) {
      case 'gun': {
        const dps = dpsOf(st);
        const best = this.bestGunDps();
        const guns = inv.slots.filter((s) => s && s.def.kind === 'gun').length;
        if (guns === 0) return 14 + dps / 12;
        if (free && guns < 3) return 6 + dps / 25;
        const imp = dps - best;
        return imp > best * 0.12 ? 2 + imp / 15 : 0;
      }
      case 'melee': return !free || inv.slots.some((s) => s && s.def.kind === 'melee' && s.def.weight > 0) ? 0 : 1.2;
      case 'consume': {
        const have = inv.countOf(def.id);
        if (!free && have === 0) return 0;
        const w = { medkit: 4.5, big_shield: 4.5, small_shield: 3.8, bandage: 2.6, chug_jug: 9, slurp: 5, apple: 0.8, banana: 0.8, mushroom: 1, jumpple: 1.5, runana: 1.5, floorange: 1.2 }[def.id] || 1;
        return have >= def.stack * 0.7 ? 0 : w;
      }
      case 'throw': return free || inv.countOf(def.id) > 0 ? 1.6 : 0;
      case 'gadget': return free && this.sk.id !== 'noob' ? 1.1 : 0;
      default: return 0;
    }
  }

  findLoot(radius) {
    const g = this.game, ch = this.ch, loot = g.loot, w = g.world;
    let best = null, bs = 0.07;
    const sk = this.sk;
    const list = loot.nearbyDrops(ch.pos.x, ch.pos.z, radius, []);
    for (const d of list) {
      if (!d.settled || !loot.canTake(ch, d)) continue;
      const b = w.buildingAt(d.pos.x, d.pos.z);
      if (d.elevated && !b) continue;
      let v = this.valueOfDrop(d);
      if (v <= 0) continue;
      // noobs sometimes pick poorly
      if (sk.id === 'noob') v *= 0.6 + Math.random() * 0.8;
      const dist = Math.hypot(d.pos.x - ch.pos.x, d.pos.z - ch.pos.z) + (b && !w.buildingAt(ch.pos.x, ch.pos.z) ? 10 : 0) + Math.abs(d.pos.y - ch.pos.y) * 6;
      const s = (v * sk.loot) / (dist + 14);
      if (s > bs) { bs = s; best = { kind: 'drop', d }; }
    }
    // chests
    const wantChest = this.chestWant();
    if (wantChest > 0) {
      for (const c of loot.chests) {
        if (c.opened) continue;
        if (this.black.has(c) && this.black.get(c) > g.time) continue;
        const dx = c.x - ch.pos.x, dz = c.z - ch.pos.z;
        if (dx * dx + dz * dz > (radius + 25) ** 2) continue;
        const b = w.buildingAt(c.x, c.z);
        if (c.elevated && !b) continue;
        const dist = Math.hypot(dx, dz) + (b && !w.buildingAt(ch.pos.x, ch.pos.z) ? 10 : 0) + Math.abs(c.y - ch.pos.y) * 6;
        const s = (wantChest * sk.loot) / (dist + 14);
        if (s > bs) { bs = s; best = { kind: 'chest', c }; }
      }
    }
    return best;
  }

  chestWant() {
    const inv = this.ch.inv;
    const guns = inv.slots.filter((s) => s && s.def.kind === 'gun').length;
    const filled = inv.slots.filter((s) => s).length;
    if (filled >= 6 && guns >= 3) return 2.5;
    return guns === 0 ? 11 : 7;
  }

  lootStillValid(t) {
    const ch = this.ch;
    if (t.kind === 'drop') return !t.d.dead && this.game.loot.canTake(ch, t.d) && this.valueOfDrop(t.d) > 0;
    return !t.c.opened;
  }

  setGoalForLoot(t) {
    const x = t.kind === 'drop' ? t.d.pos.x : t.c.x;
    const z = t.kind === 'drop' ? t.d.pos.z : t.c.z;
    const y = t.kind === 'drop' ? t.d.pos.y : t.c.y;
    this.setGoal(x, z, true, 1.2, y);
  }

  pickRoam() {
    const g = this.game, ch = this.ch, storm = g.storm;
    const cands = [];
    for (const p of POIS) {
      const d = Math.hypot(p.x - ch.pos.x, p.z - ch.pos.z);
      if (d < 50 || d > 650) continue;
      if (storm.active && Math.hypot(p.x - storm.nx, p.z - storm.nz) > storm.nr * 0.95) continue;
      cands.push([{ x: p.x + (Math.random() - 0.5) * p.flatR, z: p.z + (Math.random() - 0.5) * p.flatR }, 3 / (1 + d / 250)]);
    }
    for (const o of g.world.outposts || []) {
      const d = Math.hypot(o.x - ch.pos.x, o.z - ch.pos.z);
      if (d < 40 || d > 450) continue;
      if (storm.active && Math.hypot(o.x - storm.nx, o.z - storm.nz) > storm.nr) continue;
      cands.push([{ x: o.x, z: o.z }, 1.5 / (1 + d / 200)]);
    }
    if (storm.active) {
      const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * storm.nr * 0.8;
      cands.push([{ x: storm.nx + Math.cos(a) * r, z: storm.nz + Math.sin(a) * r }, 1.2]);
    }
    if (!cands.length) return { x: 0, z: 0 };
    let total = 0;
    for (const c of cands) total += c[1];
    let r = Math.random() * total;
    for (const c of cands) { r -= c[1]; if (r <= 0) return c[0]; }
    return cands[0][0];
  }

  // ---- navigation ------------------------------------------------------------------------------------------------------------------------
  setGoal(x, z, run, tol, y = null) {
    const ch = this.ch;
    this.goal = { x, z, run, tol, y };
    this.route = this.game.world.planRoute(ch.pos, x, z, y ?? this.game.world.terrain.height(x, z));
    this.stuckT = 0;
  }

  reached(goal) {
    const ch = this.ch;
    return Math.hypot(goal.x - ch.pos.x, goal.z - ch.pos.z) < goal.tol;
  }

  /** returns the next point to head for */
  waypoint() {
    const ch = this.ch;
    while (this.route.length) {
      const w = this.route[0];
      if (Math.hypot(w.x - ch.pos.x, w.z - ch.pos.z) < 1.1) this.route.shift();
      else return w;
    }
    return this.goal;
  }

  steerTo(tx, tz, run, dt) {
    const ch = this.ch, inp = ch.input, w = this.game.world;
    let dx = tx - ch.pos.x, dz = tz - ch.pos.z;
    let want = Math.atan2(-dx, -dz);
    const dist = Math.hypot(dx, dz);
    // whiskers
    let yaw = want;
    if (dist > 1.5) {
      const clear = (a, len) => {
        const fx = -Math.sin(a), fz = -Math.cos(a);
        const y = ch.pos.y + 0.9;
        const hit = w.collision.raycast(ch.pos.x, y, ch.pos.z, fx, 0, fz, len, null);
        if (hit >= 0) return false;
        // drop-offs / water ahead
        const px = ch.pos.x + fx * len, pz = ch.pos.z + fz * len;
        const th = w.terrain.height(px, pz);
        if (th < -0.8 && ch.pos.y > -0.4 && !this.goalInWater) return false;
        if (th - ch.pos.y > 1.6) return false;
        return true;
      };
      const len = Math.min(3.6, dist);
      if (!clear(want, len)) {
        const order = this.avoidBias > 0 ? [0.6, -0.6, 1.2, -1.2, 1.9, -1.9] : [-0.6, 0.6, -1.2, 1.2, -1.9, 1.9];
        let found = false;
        for (const off of order) {
          if (clear(want + off, len)) { yaw = want + off; found = true; break; }
        }
        if (!found) yaw = want + 1.2 * this.avoidBias;
      }
    }
    if (this.sidestepT > 0) { this.sidestepT -= dt; yaw += 1.1 * this.sidestepDir; }
    const turn = this.sk.turn * 0.7 + 3;
    ch.yaw += wrapAngle(yaw - ch.yaw) * (1 - Math.exp(-turn * dt));
    inp.fwd = 1;
    inp.strafe = 0;
    inp.sprint = run;
  }

  /** detect being wedged against something; try jumping, sidestepping, then give up */
  checkStuck(dt, moving) {
    const ch = this.ch;
    this.lastPosT += dt;
    if (this.lastPosT < 0.5) return;
    this.lastPosT = 0;
    const moved = Math.hypot(ch.pos.x - this.lastPos.x, ch.pos.z - this.lastPos.z);
    this.lastPos.copy(ch.pos);
    if (!moving) { this.stuckT = 0; return; }
    if (moved < 0.5 && ch.grounded) {
      this.stuckT += 0.5;
      ch.input.jumpPressed = true;
      if (this.stuckT >= 1) { this.sidestepT = 0.8; this.sidestepDir = Math.random() < 0.5 ? -1 : 1; }
      if (this.stuckT >= 3) { this.avoidBias *= -1; }
      if (this.stuckT >= 6) {
        // give up on the current target
        if (this.lootTarget) this.black.set(this.lootTarget.kind === 'drop' ? this.lootTarget.d.id : this.lootTarget.c, this.game.time + 40);
        this.lootTarget = null; this.goal = null; this.route = []; this.stuckT = 0;
      }
    } else this.stuckT = Math.max(0, this.stuckT - 0.5);
  }

  // ---- execution ----------------------------------------------------------------------------------------------------------------------------
  execute(dt) {
    const ch = this.ch, inp = ch.input;
    inp.fire = false;
    inp.ads = false;
    inp.crouch = false;
    inp.sprint = false;
    inp.fwd = 0;
    inp.strafe = 0;
    if (ch.danceT > 0) return;

    // aim origin for hitscan
    const eye = ch.eyePos(_a);
    ch.aimOrigin.copy(eye);
    const cp = Math.cos(ch.pitch), sp = Math.sin(ch.pitch);
    ch.aimDir.set(-Math.sin(ch.yaw) * cp, sp, -Math.cos(ch.yaw) * cp);

    switch (this.state) {
      case 'fight': this.doFight(dt); break;
      case 'heal': this.doHeal(dt); break;
      case 'idle': break;
      default: this.doMove(dt); break;
    }
    // cancel pending throw prep etc. is handled in doFight
    ch.pitch += (0 - ch.pitch) * Math.min(1, dt * 3) * (this.state === 'fight' ? 0 : 1);
  }

  doMove(dt) {
    const ch = this.ch, inp = ch.input, g = this.game;
    if (!this.goal) { inp.fwd = 0; return; }
    const lt = this.lootTarget;
    // arrived at loot?
    if (lt) {
      if (lt.kind === 'drop') {
        const d = lt.d;
        if (d.dead) { this.lootTarget = null; return; }
        const dist = Math.hypot(d.pos.x - ch.pos.x, d.pos.z - ch.pos.z);
        if (dist < 1.6 && Math.abs(d.pos.y - ch.pos.y) < 2.4) {
          if (g.loot.take(ch, d)) {
            this.afterPickup();
          } else this.black.set(d.id, g.time + 30);
          this.lootTarget = null;
          this.thinkT = 0;
          return;
        }
      } else {
        const c = lt.c;
        const dist = Math.hypot(c.x - ch.pos.x, c.z - ch.pos.z);
        if (c.opened) { this.lootTarget = null; return; }
        if (dist < 1.9 && Math.abs(c.y - ch.pos.y) < 2.4) {
          // stand still and open it
          const skill = this.sk.id === 'noob' ? 0.8 : 1;
          g.loot.work(c, ch, dt * skill);
          ch.input.fwd = 0;
          const wy = Math.atan2(-(c.x - ch.pos.x), -(c.z - ch.pos.z));
          ch.yaw += wrapAngle(wy - ch.yaw) * Math.min(1, dt * 8);
          if (c.opened) { this.lootTarget = null; this.thinkT = 0.05; }
          return;
        }
      }
    }
    const wp = this.waypoint();
    if (!wp) return;
    if (!lt && this.reached(this.goal) && !this.route.length) {
      // arrived at a travel goal: pause to let the next think pick loot
      this.goal = null;
      this.thinkT = 0;
      return;
    }
    const run = this.goal.run && !ch.using;
    this.goalInWater = false;
    this.steerTo(wp.x, wp.z, run, dt);
    // hop small obstacles occasionally + noobs bunny hop for no reason
    if (this.sk.id === 'pro' && ch.grounded && ch.input.sprint && Math.random() < dt * 0.15) ch.input.jumpPressed = true;
    if (this.sk.id === 'noob' && ch.grounded && Math.random() < dt * 0.25) ch.input.jumpPressed = true;
    this.checkStuck(dt, true);
  }

  afterPickup() {
    // equip the best weapon after grabbing something new
    this.weaponT = 0;
    this.chooseWeapon(40, true);
  }

  doHeal(dt) {
    const ch = this.ch, inp = ch.input;
    if (!this.healItem && !ch.using) { this.healItem = this.pickHeal() ?? -1; }
    const i = this.healItem;
    if (i == null || i < 0 || !ch.inv.slots[i]) { this.state = 'loot'; this.healItem = null; return; }
    if (ch.inv.sel !== i) { ch.equip(i); return; }
    if (ch.equipT > 0) return;
    if (!ch.using) {
      const ok = ch.startUse(ch.inv.slots[i]);
      if (!ok) { this.state = 'loot'; this.healItem = null; this.black.set(i, this.game.time + 5); }
    }
    inp.fwd = 0;
    if (!ch.using && this.state === 'heal') { this.state = 'loot'; this.healItem = null; this.chooseWeapon(40, true); }
  }

  // ---- combat ------------------------------------------------------------------------------------------------------------------------------------
  weaponScore(st, dist) {
    const ch = this.ch, inv = ch.inv;
    const d = st.def;
    if (d.kind === 'melee') return dist < 3.5 ? (d.id === 'pickaxe' ? 8 : dpsOf(st)) * 0.9 : 0;
    if (d.kind !== 'gun') return -1;
    if (st.mag <= 0 && inv.ammo[d.ammo] <= 0) return -1;
    const ideal = IDEAL[d.cat] || 30;
    const z = (dist - ideal) / (ideal * 0.9 + 8);
    let fit = Math.exp(-z * z);
    if (d.cat === 'shotgun' && dist > 32) fit *= 0.15;
    if (d.cat === 'sniper' && dist < 18) fit *= 0.25;
    if (d.cat === 'launcher' && dist < 9) fit *= 0.1;
    if (d.cat === 'pistol' && dist > 70) fit *= 0.5;
    let s = dpsOf(st) * (0.25 + 0.75 * fit);
    if (st.mag <= 0) s *= 0.4;
    if (this.sk.id === 'noob') s *= 0.6 + Math.random() * 0.8;
    return s;
  }

  chooseWeapon(dist, force = false) {
    const ch = this.ch;
    if (ch.using || ch.throwT > 0 || ch.reload && !force) return;
    if (this.weaponT > this.game.time && !force) return;
    this.weaponT = this.game.time + 1.2;
    let best = -1, bs = -1;
    for (let i = 0; i < ch.inv.slots.length; i++) {
      const s = ch.inv.slots[i];
      if (!s) continue;
      const sc = this.weaponScore(s, dist);
      if (sc > bs) { bs = sc; best = i; }
    }
    if (best >= 0 && best !== ch.inv.sel) ch.equip(best);
  }

  doFight(dt) {
    const g = this.game, ch = this.ch, inp = ch.input, sk = this.sk;
    const e = this.enemy;
    if (!e || !e.alive) { this.state = 'loot'; this.enemy = null; return; }
    const now = g.time;
    const visible = this.enemyVisible;
    const tx = visible ? e.pos.x : this.lastKnown.x, tz = visible ? e.pos.z : this.lastKnown.z;
    const dx = tx - ch.pos.x, dz = tz - ch.pos.z;
    const dist = Math.hypot(dx, dz);
    const ty = (visible ? e.pos.y : this.lastKnown.y) + 1.15 + (sk.id === 'pro' && dist < 70 ? 0.25 : 0);
    const dy = ty - (ch.pos.y + ch.eyeHeight);

    // weapon choice
    this.chooseWeapon(dist);
    const st = ch.stack;
    const def = st?.def;

    // throwables: pros lob grenades at mid range
    if (visible && !this.wantThrow && dist > 9 && dist < 28 && now - (this.lastThrow || 0) > 8 && Math.random() < sk.nade * dt * 2) {
      const i = ch.inv.find((s) => s.def.kind === 'throw' && s.def.id !== 'impulse' && s.def.id !== 'boogie' || s.def.id === 'boogie');
      if (i >= 0) { this.wantThrow = i; this.lastThrow = now; }
    }
    if (this.wantThrow != null) {
      const i = this.wantThrow;
      if (!ch.inv.slots[i]) this.wantThrow = null;
      else {
        if (ch.inv.sel !== i) ch.equip(i);
        else if (ch.equipT <= 0 && ch.throwT <= 0) {
          inp.firePressed = true;
          this.wantThrow = null;
          this.weaponT = 0;
        }
      }
    }

    // aim wobble
    this.wobT -= dt;
    if (this.wobT <= 0) {
      this.wobT = 0.22;
      const speed = visible ? Math.hypot(e.vel.x, e.vel.z) : 0;
      const sigma = (sk.aimErr * (0.55 + dist / 85) * (1 + speed / 11)) * (Math.PI / 180);
      this.wobTarget.set((Math.random() + Math.random() - 1) * sigma, (Math.random() + Math.random() - 1) * sigma * 0.8);
    }
    this.wob.lerp(this.wobTarget, Math.min(1, dt * 7));

    // lead projectiles
    let lead = 0;
    if (def?.projectile && visible) lead = dist / def.projectile.speed;
    const lx = tx + (visible ? e.vel.x * lead : 0), lz = tz + (visible ? e.vel.z * lead : 0);
    const ddx = lx - ch.pos.x, ddz = lz - ch.pos.z;
    const wantYaw = Math.atan2(-ddx, -ddz);
    const wantPitch = Math.atan2(dy + (def?.projectile && def.projectile.gravity > 5 ? dist * 0.18 : 0), Math.max(Math.hypot(ddx, ddz), 0.5));
    ch.yaw += wrapAngle(wantYaw - ch.yaw) * (1 - Math.exp(-sk.turn * dt));
    ch.pitch += (clamp(wantPitch, -1.2, 1.2) - ch.pitch) * (1 - Math.exp(-sk.turn * dt));

    // bullet direction = facing + wobble
    const yawErr = wrapAngle(wantYaw - ch.yaw);
    const ay = ch.yaw + this.wob.x, ap = ch.pitch + this.wob.y;
    const cp = Math.cos(ap);
    ch.aimDir.set(-Math.sin(ay) * cp, Math.sin(ap), -Math.cos(ay) * cp);
    ch.aimOrigin.copy(ch.eyePos(_a));
    ch.extraSpread = 0;

    // --- movement
    const ideal = def ? (IDEAL[def.cat] || 30) : 20;
    this.strafeT -= dt;
    if (this.strafeT <= 0) {
      this.strafeT = 0.6 + Math.random() * 1.3;
      this.strafeDir = Math.random() < 0.5 ? -1 : 1;
    }
    const strafeOn = Math.random() < sk.strafe + 0.05 || this.strafeOn;
    this.strafeOn = sk.strafe > Math.random();
    if (visible) {
      if (dist > ideal * 1.35 + 4 && (def?.kind !== 'gun' || sk.aggression > 0.45 || dist < 70)) { inp.fwd = 1; inp.sprint = dist > ideal * 2; }
      else if (dist < ideal * 0.45 && def?.kind === 'gun' && def.cat !== 'shotgun') inp.fwd = -1;
      else if (def?.kind === 'melee') inp.fwd = dist > 1.8 ? 1 : 0;
      if (strafeOn && sk.id !== 'noob') inp.strafe = this.strafeDir * (0.6 + 0.4 * sk.strafe);
      else if (sk.id === 'noob') inp.strafe = Math.random() < 0.2 ? this.strafeDir * 0.5 : 0;
      if (ch.grounded && Math.random() < sk.jumpy * dt * 1.4 && dist < 35) inp.jumpPressed = true;
      if (def?.cat === 'sniper' && dist > 50) { inp.crouch = true; inp.fwd = 0; inp.strafe = 0; }
    } else {
      // hunt the last known position
      this.hunt -= dt;
      if (dist > 4) { inp.fwd = 1; inp.sprint = sk.aggression > 0.5; }
      if (now - this.lastSeen > 4 || this.hunt < -6) { this.state = 'loot'; this.enemy = null; this.goal = null; return; }
      this.checkStuck(dt, true);
    }
    // not stuck against a wall while strafing
    if (visible && inp.fwd === 0 && inp.strafe === 0) this.checkStuck(dt, false);

    // --- shooting
    if (!def) return;
    inp.ads = !!(def.kind === 'gun' && dist > 22 && sk.id !== 'noob' && Math.abs(yawErr) < 0.25);
    if (!visible || this.noticeT > 0) { this.noticeT = Math.max(0, this.noticeT - dt); return; }
    const aligned = Math.abs(yawErr) < 0.12 + 1.2 / Math.max(dist, 6) * 0.2;
    if (def.kind === 'gun') {
      if (st.mag <= 0 || (st.mag <= def.mag * 0.2 && dist > 50 && ch.vel.lengthSq() < 4)) { ch.startReload(); return; }
      if (!aligned || ch.reload) return;
      // burst pacing
      this.fireWindow -= dt;
      if (this.fireWindow > 0) {
        if (def.auto) inp.fire = true;
        else {
          this.semiT -= dt;
          if (this.semiT <= 0) { inp.fire = true; inp.firePressed = true; this.semiT = 1 / def.rate + sk.fireGap + Math.random() * sk.fireGap; }
        }
      } else {
        this.fireRest -= dt;
        if (this.fireRest <= 0) {
          this.fireWindow = sk.burst[0] * (0.5 + Math.random());
          this.fireRest = sk.burst[1] * (0.5 + Math.random());
          if (def.rate < 2) this.fireWindow = 0.3;
        }
      }
      // semi-auto and slow weapons just click when ready
      if (!def.auto && def.rate < 2.2) { if (ch.fireCd <= 0 && Math.random() < dt * (sk.id === 'noob' ? 1.6 : 6)) { inp.fire = true; inp.firePressed = true; } }
    } else if (def.kind === 'melee') {
      if (dist < def.range + 0.3 && aligned) { inp.fire = true; inp.firePressed = true; }
    }
  }
}
