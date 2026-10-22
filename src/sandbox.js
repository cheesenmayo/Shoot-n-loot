// Sandbox mode: hand yourself any item, spawn enemies, toggle cheats, teleport around the island.
// The simulation stands still while the tools panel is open (the camera and HUD keep running), so you can
// browse, spawn and teleport without anything shooting at you. This file holds the state and the actions;
// the panel itself lives in sandboxpanel.js.
import * as THREE from 'three';
import { Character } from './entities/character.js';
import { Bot, makeNames } from './entities/bot.js';
import { ITEMS, AMMO, RARITIES, makeStack, rollLoot, isStackable } from './items.js';
import { SLOT_COUNT } from './inventory.js';
import { POIS } from './world/poidata.js';
import { WORLD } from './world/terrain.js';
import { settings, saveSettings } from './settings.js';
import { clamp, TAU } from './util.js';
import { SandboxPanel } from './sandboxpanel.js';
import { ENEMY_CAP, LOADOUTS, SKILL_ID, HEALTH_OPTIONS, SKILL_OPTIONS, COUNT_OPTIONS, PLACE_OPTIONS, BEHAVIOUR_OPTIONS } from './sandboxdata.js';

const RESPAWN_DELAY = 1.5; // seconds between dying and standing up again
const CORPSE_TIME = 5; // dead enemies lie around this long before they are removed
const REGEN_DELAY = 2.5; // punching bags heal after this long without being hit
const SUPER_SPEED = 1.9;
const PLACE_DIST = { f10: 10, f20: 20, f40: 40 };

const DEFAULTS = { tab: 'items', rarity: 3, skill: 'avg', weapon: 'random', count: 3, place: 'f20', health: 'normal', behaviour: 'hostile' };
const _s = new THREE.Vector3(), _t = new THREE.Vector3();

/** Panel choices survive reloads through the shared settings object; anything unexpected falls back to the default. */
function loadConfig() {
  const s = settings.sandbox && typeof settings.sandbox === 'object' ? settings.sandbox : {};
  const c = { ...DEFAULTS };
  if (['items', 'enemies', 'player'].includes(s.tab)) c.tab = s.tab;
  if (Number.isInteger(s.rarity) && s.rarity >= 0 && s.rarity < RARITIES.length) c.rarity = s.rarity;
  if (SKILL_OPTIONS.some((o) => o[0] === s.skill)) c.skill = s.skill;
  const w = ITEMS[s.weapon];
  if (s.weapon === 'random' || s.weapon === 'pickaxe' || (w && (w.kind === 'gun' || w.kind === 'melee') && w.id !== 'pickaxe')) c.weapon = s.weapon;
  if (COUNT_OPTIONS.includes(s.count)) c.count = s.count;
  if (PLACE_OPTIONS.some((o) => o[0] === s.place)) c.place = s.place;
  if (HEALTH_OPTIONS.some((o) => o[0] === s.health)) c.health = s.health;
  if (BEHAVIOUR_OPTIONS.some((o) => o[0] === s.behaviour)) c.behaviour = s.behaviour;
  if (c.skill === 'dummy') c.behaviour = 'dummy';
  settings.sandbox = c;
  return c;
}

/** Enemies are only ever hurt by the player (no friendly fire between sandbox enemies). */
function enemyTakeDamage(amount, attacker, info) {
  if (attacker && !attacker.isPlayer) return 0;
  return Character.prototype.takeDamage.call(this, amount, attacker, info);
}

export class Sandbox {
  constructor(game) {
    this.game = game;
    this.cfg = loadConfig();
    this.open = false;
    this.shift = 0;
    this.panel = new SandboxPanel(this, game.hud.root);
    this.reset();
  }

  /** Fresh session state (called when a sandbox starts and when it ends). */
  reset() {
    this.god = false;
    this.infAmmo = false;
    this.infItems = false;
    this.superSpeed = false;
    this.timeScale = 1;
    this.enemies = [];
    this.dummySpots = [];
    this.nextId = 1000;
    this.respawnT = 0;
    this.deathPos = new THREE.Vector3();
    this.stats = { total: 0, hits: 0, log: [], last: null, target: null, targetT: 0, targetMax: 100 };
  }

  setCfg(key, value) {
    this.cfg[key] = value;
    if (key === 'skill') { if (value === 'dummy') this.cfg.behaviour = 'dummy'; else if (this.cfg.behaviour === 'dummy') this.cfg.behaviour = 'hostile'; }
    if (key === 'behaviour') { if (value === 'dummy') this.cfg.skill = 'dummy'; else if (this.cfg.skill === 'dummy') this.cfg.skill = 'avg'; }
    saveSettings();
    this.panel.sync();
  }

  // ---- session ----------------------------------------------------------------------------------------------------------------------------
  /** Called by Game.startSandbox once the player character exists. */
  begin() {
    this.reset();
    const g = this.game, p = g.player;
    // cheats are applied by shadowing two methods on the player's own character (no changes to Character itself)
    p.takeDamage = (amount, attacker, info) => (this.god ? 0 : Character.prototype.takeDamage.call(p, amount, attacker, info));
    p.speedMul = () => Character.prototype.speedMul.call(p) * (this.superSpeed ? SUPER_SPEED : 1);
    const poi = POIS[0];
    const spot = this.findSafe(poi.x - 24, poi.z + 44, poi.y - 1.6, 1.0, true) || { x: poi.x, y: poi.y + 0.2, z: poi.z + 60 };
    p.place(spot.x, spot.y, spot.z);
    p.vel.set(0, 0, 0);
    p.setMode('normal');
    p.alive = true;
    p.grounded = true;
    g.controller.yaw = -1.0;
    g.controller.pitch = -0.08;
    this.panel.sync();
  }

  /** Called by Game.clearMatch: drop everything that belongs to the session (the game disposes the characters). */
  end() {
    if (this.open) { this.open = false; this.panel.hide(); }
    if (this.shift) { this.game.camera.clearViewOffset(); this.shift = 0; }
    this.reset();
  }

  toggle(quiet = false) {
    if (this.open) this.closePanel(quiet); else this.openPanel();
  }

  openPanel() {
    const g = this.game, c = g.controller;
    if (this.open || !g.sandbox || g.paused || !g.player) return;
    c.keys.clear();
    c.mouseDown = c.rmbDown = false;
    Object.assign(g.player.input, { fwd: 0, strafe: 0, fire: false, firePressed: false, jump: false, sprint: false, crouch: false, ads: false });
    if (g.hud.mapOpen) g.hud.toggleMap();
    this.open = true;
    g.touch.setActive(false);
    g.releaseLock();
    g.pauseChangedAt = performance.now();
    this.panel.show();
  }

  /** `quiet`: closed with Esc, which is not a user gesture, so pointer lock may be refused (a click then re-locks). */
  closePanel(quiet = false, relock = true) {
    if (!this.open) return;
    const c = this.game.controller;
    this.open = false;
    this.panel.hide();
    c.keys.clear();
    this.game.pauseChangedAt = performance.now();
    if (relock) c.requestLock(quiet);
  }

  /** Simulation time step: frozen while the panel is open, scaled by the time-scale option. */
  simDt(dt) { return this.open ? 0 : dt * this.timeScale; }

  // ---- per frame ----------------------------------------------------------------------------------------------------------------------------
  update(dt, sdt) {
    const g = this.game, p = g.player;
    if (!p) return;
    if (p.alive) {
      if (this.god) p.noFall = true;
      if (this.infAmmo) {
        for (const s of p.inv.slots) if (s && s.def.kind === 'gun') s.mag = s.def.mag;
        for (const t in AMMO) p.inv.ammo[t] = AMMO[t].max;
        p.reload = null;
      }
      if (this.infItems) for (const s of p.inv.slots) if (s && isStackable(s.def)) s.count = Math.max(s.count, s.def.stack, 2);
    }
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const rec = this.enemies[i], ch = rec.ch;
      if (!ch.alive) { if (ch.deadT > CORPSE_TIME) this.removeEnemy(rec); continue; }
      if (rec.regen && ch.hp < rec.maxHp && g.time - ch.lastDamageT > REGEN_DELAY) ch.hp = Math.min(rec.maxHp, ch.hp + 220 * sdt);
    }
    if (!p.alive && this.respawnT > 0 && !this.open) {
      this.respawnT -= dt;
      if (this.respawnT <= 0) this.respawnPlayer();
    }
    g.aliveCount = 1 + this.liveCount();
    this.updateView(dt);
    this.panel.tick(dt);
  }

  /** While the panel is open the view slides so the player stays centred in the part of the screen the panel leaves free. */
  updateView(dt) {
    const target = this.open ? this.panel.width() / 2 : 0;
    if (!this.shift && !target) return;
    this.shift += (target - this.shift) * (1 - Math.exp(-12 * dt));
    const cam = this.game.camera;
    if (!target && this.shift < 0.5) { this.shift = 0; cam.clearViewOffset(); } else cam.setViewOffset(innerWidth, innerHeight, this.shift, 0, innerWidth, innerHeight);
  }

  // ---- damage readout ---------------------------------------------------------------------------------------------------------------------
  onHit(victim, amount, info) {
    const eff = Math.max(0, amount + Math.min(0, victim.hp)); // overkill does not count
    const s = this.stats;
    s.total += eff;
    s.hits++;
    s.log.push({ t: this.game.time, v: eff });
    s.last = { v: eff, head: !!info.headshot, name: victim.name, kill: victim.hp <= 0 };
    s.target = victim;
    s.targetT = this.game.time;
    s.targetMax = this.enemies.find((e) => e.ch === victim)?.maxHp ?? 100;
  }

  dps() {
    const log = this.stats.log, now = this.game.time;
    while (log.length && now - log[0].t > 3) log.shift();
    if (!log.length) return 0;
    let sum = 0;
    for (const e of log) sum += e.v;
    return sum / clamp(now - log[0].t, 1, 3);
  }

  resetStats() {
    this.stats = { total: 0, hits: 0, log: [], last: null, target: null, targetT: 0, targetMax: 100 };
    this.panel.sync();
  }

  // ---- elimination hook (from Game.onElimination) ---------------------------------------------------------------------
  onElimination(victim, killer, info) {
    const g = this.game;
    if (victim.isPlayer) {
      this.deathPos.copy(victim.pos);
      this.respawnT = RESPAWN_DELAY;
      g.hud.toast('Eliminated · respawning…');
    }
  }

  respawnPlayer() {
    const g = this.game, p = g.player, at = this.deathPos;
    const y = g.world.collision.groundAt(at.x, at.z, at.y + 0.6, 0.6);
    p.alive = true;
    p.hp = 100;
    p.shield = 0;
    p.deadT = 0;
    p.root.rotation.x = 0;
    p.cancelUse();
    p.reload = null;
    p.burstLeft = 0;
    p.swingT = p.throwT = p.danceT = 0;
    p.pendingThrow = null;
    p.hot = null;
    p.grapple = null;
    p.buffs.speedT = p.buffs.jumpT = p.buffs.runT = 0;
    p.lastDamageT = -99;
    p.place(at.x, y, at.z);
    p.vel.set(0, 0, 0);
    p.swimming = false;
    p.noFall = false;
    p.airTime = 0;
    p.setMode('normal');
    p.grounded = true;
    p.equipT = 0.3;
    g.controller.spectate.target = null;
    this.snapCamera();
    g.fx.teleport(p.pos, 'cyan');
    g.hud.toast('Respawned');
  }

  // ---- items ------------------------------------------------------------------------------------------------------------------------------------
  /** Hand the player an item. Weapons use the first free slot (else the selected one), stackables fill their stack. */
  give(id, rarity = this.cfg.rarity) {
    const g = this.game, p = g.player, def = ITEMS[id];
    if (!p || !def) return false;
    const inv = p.inv;
    let slot = 0, tier = 0;
    if (id === 'pickaxe') {
      this.equipSlot(0);
      return true;
    }
    if (def.kind === 'gun' || def.kind === 'melee') {
      tier = clamp(rarity, def.minR ?? 0, def.maxR ?? 4);
      slot = inv.slots.findIndex((s, i) => i > 0 && s && s.def === def && s.rarity === tier);
      if (slot > 0) { if (def.kind === 'gun') inv.slots[slot].mag = def.mag; } else {
        slot = this.targetSlot();
        inv.slots[slot] = makeStack(id, tier);
      }
      if (def.ammo) inv.ammo[def.ammo] = AMMO[def.ammo].max;
    } else {
      slot = inv.slots.findIndex((s, i) => i > 0 && s && s.def === def);
      if (slot > 0) inv.slots[slot].count = def.stack;
      else {
        slot = this.targetSlot();
        inv.slots[slot] = makeStack(id, 0, def.stack);
      }
    }
    this.equipSlot(slot);
    g.audio.play('pickup', null);
    g.hud.pickupToast(def.name, tier, false);
    return true;
  }

  targetSlot() {
    const inv = this.game.player.inv;
    const free = inv.freeSlot();
    if (free > 0) return free;
    return inv.sel > 0 ? inv.sel : inv.lastSel > 0 ? inv.lastSel : 1;
  }

  equipSlot(slot) {
    const p = this.game.player;
    p.cancelUse();
    p.reload = null;
    p.burstLeft = 0;
    if (p.mode !== 'normal') { p.inv.sel = slot; return; }
    if (p.inv.sel === slot) p.refreshHeld(); else p.equip(slot);
  }

  maxAmmo() {
    const p = this.game.player;
    for (const t in AMMO) p.inv.ammo[t] = AMMO[t].max;
    for (const s of p.inv.slots) if (s && s.def.kind === 'gun') s.mag = s.def.mag;
    p.reload = null;
    this.game.audio.play('ammo', null);
    this.game.hud.toast('Ammo maxed out');
  }

  clearInventory() {
    const p = this.game.player, inv = p.inv;
    for (let i = 1; i < SLOT_COUNT; i++) inv.slots[i] = null;
    for (const t in AMMO) inv.ammo[t] = 0;
    inv.lastSel = 1;
    this.equipSlot(0);
    this.game.hud.toast('Inventory cleared');
  }

  loadout(id) {
    const def = LOADOUTS.find((l) => l.id === id);
    const p = this.game.player;
    if (!def || !p) return;
    const inv = p.inv;
    for (let i = 1; i < SLOT_COUNT; i++) inv.slots[i] = null;
    def.items.forEach((itemId, k) => {
      const d = ITEMS[itemId];
      if (d.kind === 'gun' || d.kind === 'melee') inv.slots[k + 1] = makeStack(itemId, clamp(this.cfg.rarity, d.minR ?? 0, d.maxR ?? 4));
      else inv.slots[k + 1] = makeStack(itemId, 0, d.stack);
      if (d.ammo) inv.ammo[d.ammo] = AMMO[d.ammo].max;
    });
    inv.lastSel = 1;
    this.equipSlot(1);
    this.game.audio.play('pickup', null);
    this.game.hud.toast(`${def.name} loadout equipped`);
  }

  // ---- placement helpers ------------------------------------------------------------------------------------------------------------------
  /** Is (x, z) a place a character can stand: dry, not steep, not inside geometry, with headroom? Writes the spot to `out`. */
  spotOk(x, z, refY, clear, noBuilding, out) {
    const w = this.game.world, col = w.collision;
    if (x * x + z * z > (WORLD.islandR - 30) ** 2) return false;
    const y = col.groundAt(x, z, refY + 1.2, 0.6);
    if (y < WORLD.seaLevel + 0.6) return false;
    if (w.terrain.slope(x, z) > 0.6 && y - w.terrain.height(x, z) < 0.3) return false;
    if (noBuilding && w.buildingAt(x, z)) return false;
    _t.set(x, y, z);
    if (col.resolve(_t, clear, 1.8, 0.55)) return false;
    if (col.ceilingAt(x, z, y + 1.85, Math.min(clear, 0.5)) < y + 2.6) return false;
    out.set(x, y, z);
    return true;
  }

  /** Nearest safe standing spot to (cx, cz), searching outwards in a spiral. */
  findSafe(cx, cz, refY, clear = 1.0, noBuilding = false, maxK = 5000) {
    for (let k = 0; k < maxK; k++) {
      const r = k === 0 ? 0 : 2.2 * Math.sqrt(k), a = k * 2.399963;
      if (this.spotOk(cx + Math.cos(a) * r, cz + Math.sin(a) * r, refY, clear, noBuilding, _s)) return _s.clone();
    }
    return null;
  }

  snapCamera() {
    const g = this.game, c = g.controller;
    c.distSm = c.offSm = c.heightSm = null;
    c.update(0);
    g.world.terrain.update(g.camera.position, true);
  }

  /** Put the player on the ground at `spot`, standing still, optionally turning to face (lookX, lookZ). */
  placePlayer(spot, lookX = null, lookZ = null) {
    const g = this.game, p = g.player;
    p.cancelUse();
    p.grapple = null;
    p.place(spot.x, spot.y, spot.z);
    p.vel.set(0, 0, 0);
    if (p.mode !== 'normal') p.setMode('normal');
    p.grounded = true;
    p.swimming = false;
    p.noFall = false;
    p.airTime = 0;
    if (lookX !== null && Math.hypot(lookX - spot.x, lookZ - spot.z) > 6) g.controller.yaw = Math.atan2(-(lookX - spot.x), -(lookZ - spot.z));
    this.snapCamera();
    g.fx.teleport(p.pos, 'cyan');
  }

  // ---- player tools -----------------------------------------------------------------------------------------------------------------------
  setToggle(key, on) {
    this[key] = on;
    const p = this.game.player;
    if (key === 'infItems' && !on && p) for (const s of p.inv.slots) if (s && isStackable(s.def) && s.count > s.def.stack) s.count = s.def.stack;
    if (key === 'god' && !on && p) p.noFall = false;
    this.panel.sync();
  }

  setTimeScale(v) {
    this.timeScale = v;
    this.panel.sync();
  }

  heal() {
    const p = this.game.player;
    if (!p.alive) return;
    p.hp = 100;
    p.shield = 100;
    p.hot = null;
    this.game.fx.heal(p.pos, 'shield');
    this.game.audio.play('heal', null, { vol: 0.6 });
    this.game.hud.toast('Health and shield restored');
  }

  teleport(poiId) {
    const g = this.game, p = g.player;
    const poi = POIS.find((q) => q.id === poiId);
    if (!poi || !p.alive) return false;
    const base = typeof poi.y === 'number' ? poi.y : g.world.terrain.height(poi.x, poi.z);
    const spot = this.findSafe(poi.x, poi.z, base - 1.6, 1.0, true, 30000);
    if (!spot) { g.hud.toast('No safe landing spot found'); return false; }
    this.placePlayer(spot, poi.x, poi.z);
    g.hud.toast(`Teleported to ${poi.name}`);
    return true;
  }

  /** Jump from 300 m above the current spot (the glider opens by itself near the ground). */
  skyDrop() {
    const g = this.game, p = g.player;
    if (!p.alive) return;
    const gy = g.world.collision.groundAt(p.pos.x, p.pos.z, p.pos.y + 1, 0.6);
    p.cancelUse();
    p.grapple = null;
    p.place(p.pos.x, gy + 300, p.pos.z);
    p.vel.set(0, -10, 0);
    p.setMode('skydive');
    g.controller.pitch = -0.35;
    this.snapCamera();
    g.hud.toast(g.touchMode ? 'Sky drop · tap GLIDE to open the glider' : 'Sky drop · Space opens the glider');
  }

  // ---- enemies ----------------------------------------------------------------------------------------------------------------------------
  liveCount() {
    let n = 0;
    for (const e of this.enemies) if (e.ch.alive) n++;
    return n;
  }

  names(n) {
    const used = new Set(this.game.chars.map((c) => c.name));
    return makeNames(n + this.game.chars.length + 4).filter((x) => !used.has(x)).slice(0, n);
  }

  /** Candidate positions for `n` enemies: rows in front of the player or a ring around them. */
  candidates(n, place) {
    const p = this.game.player, yaw = this.game.controller.yaw;
    const fx = -Math.sin(yaw), fz = -Math.cos(yaw), rx = Math.cos(yaw), rz = -Math.sin(yaw);
    const out = [];
    if (place === 'ring') {
      const R = clamp(10 + n * 1.2, 12, 42), a0 = Math.random() * TAU;
      for (let i = 0; i < n; i++) out.push([p.pos.x + Math.cos(a0 + (i / n) * TAU) * R, p.pos.z + Math.sin(a0 + (i / n) * TAU) * R]);
      return out;
    }
    const D = PLACE_DIST[place] || 20;
    for (let row = 0; out.length < n; row++) {
      const R = D + row * 2.4;
      const k = Math.min(Math.max(1, Math.floor((R * 1.2) / 1.9) + 1), n - out.length);
      for (let j = 0; j < k; j++) {
        const ang = k === 1 ? 0 : (j / (k - 1) - 0.5) * 1.2;
        out.push([p.pos.x + fx * R * Math.cos(ang) + rx * R * Math.sin(ang), p.pos.z + fz * R * Math.cos(ang) + rz * R * Math.sin(ang)]);
      }
    }
    return out;
  }

  /** Spawn enemies with the panel's current options. Returns how many were created. */
  spawn(o = this.cfg) {
    const g = this.game, p = g.player;
    if (!p || !p.alive) return 0;
    const room = ENEMY_CAP - this.liveCount();
    if (room <= 0) { g.hud.toast(`Enemy limit reached (${ENEMY_CAP})`); return 0; }
    const want = Math.min(o.count, room);
    const taken = [];
    const spots = [];
    for (const [cx, cz] of this.candidates(want, o.place)) {
      let spot = null;
      for (const [dx, dz] of [[0, 0], [2, 0], [-2, 0], [0, 2], [0, -2], [3.5, 3.5], [-3.5, 3.5], [3.5, -3.5], [-3.5, -3.5]]) {
        if (!this.spotOk(cx + dx, cz + dz, p.pos.y, 0.45, true, _s)) continue;
        if (taken.some((q) => Math.hypot(q.x - _s.x, q.z - _s.z) < 1.2)) continue;
        spot = _s.clone();
        break;
      }
      if (spot) { taken.push(spot); spots.push(spot); }
    }
    const names = this.names(spots.length);
    spots.forEach((s, i) => this.addEnemy(s, o, names[i]));
    const trimmed = o.count > room;
    if (!spots.length) g.hud.toast('No room to spawn here');
    else g.hud.toast(`Spawned ${spots.length} enem${spots.length === 1 ? 'y' : 'ies'}${trimmed ? ` · limit is ${ENEMY_CAP}` : ''}`);
    this.panel.sync();
    return spots.length;
  }

  addEnemy(spot, o, name, yaw = null) {
    const g = this.game, p = g.player;
    const dummy = o.skill === 'dummy' || o.behaviour === 'dummy';
    const behaviour = dummy ? 'dummy' : o.behaviour;
    const skillId = SKILL_ID[o.skill] || 'mid';
    const ch = new Character(g, { id: this.nextId++, name, seed: Math.floor(Math.random() * 1e6), skill: skillId });
    const bot = new Bot(g, ch, skillId);
    bot.mode = behaviour;
    bot.state = 'loot';
    ch.takeDamage = enemyTakeDamage;
    const hpDef = HEALTH_OPTIONS.find((h) => h[0] === o.health) || HEALTH_OPTIONS[0];
    ch.setMode('normal');
    ch.alive = true;
    ch.grounded = true;
    ch.place(spot.x, spot.y, spot.z);
    ch.yaw = ch.bodyYaw = yaw ?? Math.atan2(-(p.pos.x - spot.x), -(p.pos.z - spot.z));
    ch.hp = hpDef[2];
    this.equipEnemy(ch, o.weapon);
    g.chars.push(ch);
    g.bots.push(bot);
    g.botOf.set(ch, bot);
    this.enemies.push({ ch, bot, maxHp: hpDef[2], regen: hpDef[0] === 'bag', dummy: behaviour === 'dummy' });
    if (behaviour === 'dummy') this.dummySpots.push({ spot: spot.clone(), yaw: ch.yaw, name, opts: { ...o } });
    return ch;
  }

  /** Weapons for a new enemy: a random loadout, just a pickaxe, or one specific weapon at the panel's rarity. */
  equipEnemy(ch, weapon) {
    const inv = ch.inv;
    const give = (id, rarity, count = null) => {
      const slot = inv.freeSlot();
      if (slot < 0) return;
      inv.slots[slot] = makeStack(id, rarity, count);
      const d = ITEMS[id];
      if (d.ammo) inv.ammo[d.ammo] = Math.max(inv.ammo[d.ammo], Math.min(AMMO[d.ammo].max, AMMO[d.ammo].pack * 4));
    };
    if (weapon === 'random') {
      const gun = () => {
        for (let i = 0; i < 30; i++) { const e = rollLoot({ forceGroup: 'weapon' }); if (ITEMS[e.id].kind === 'gun') return e; }
        return { id: 'ar', rarity: 1 };
      };
      const a = gun();
      give(a.id, a.rarity);
      if (Math.random() < 0.6) { const b = gun(); if (b.id !== a.id) give(b.id, b.rarity); }
      const heal = rollLoot({ forceGroup: 'heal' });
      give(heal.id, 0, heal.count);
      if (Math.random() < 0.3) { const t = rollLoot({ forceGroup: 'throw' }); give(t.id, 0, t.count); }
    } else if (weapon !== 'pickaxe' && ITEMS[weapon]) {
      give(weapon, this.cfg.rarity);
    }
    const first = inv.slots.findIndex((s, i) => i > 0 && s && (s.def.kind === 'gun' || s.def.kind === 'melee'));
    if (first > 0) ch.equip(first);
  }

  removeEnemy(rec, poof = false) {
    const g = this.game, ch = rec.ch;
    const i = g.chars.indexOf(ch);
    if (i >= 0) g.chars.splice(i, 1);
    const j = g.bots.indexOf(rec.bot);
    if (j >= 0) g.bots.splice(j, 1);
    g.botOf.delete(ch);
    if (poof && ch.alive && ch.root.visible) g.fx.teleport(ch.pos, 'cyan');
    ch.alive = false; // anything still holding a reference stops treating it as a target
    ch.mode = 'dead';
    ch.dispose();
    const k = this.enemies.indexOf(rec);
    if (k >= 0) this.enemies.splice(k, 1);
  }

  clearEnemies() {
    for (const rec of this.enemies.slice()) this.removeEnemy(rec, true);
    this.dummySpots = [];
    this.game.hud.toast('Enemies cleared');
    this.panel.sync();
  }

  respawnDummies() {
    const spots = this.dummySpots;
    if (!spots.length) { this.game.hud.toast('No dummies to respawn'); return; }
    this.dummySpots = [];
    for (const rec of this.enemies.filter((e) => e.dummy)) this.removeEnemy(rec);
    for (const s of spots) this.addEnemy(s.spot, s.opts, s.name, s.yaw);
    this.game.hud.toast(`Respawned ${spots.length} dumm${spots.length === 1 ? 'y' : 'ies'}`);
    this.panel.sync();
  }
}
