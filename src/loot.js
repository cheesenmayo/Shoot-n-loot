import * as THREE from 'three';
import { ITEMS, AMMO, RARITIES, makeStack, rollLoot, rollChest } from './items.js';
import { itemModel, ammoModel, chestModel } from './models.js';
import { POI_BY_ID } from './world/poidata.js';
import { WORLD } from './world/terrain.js';
import { mulberry32 } from './util.js';

const CELL = 24;
const key = (ix, iz) => ix * 4096 + iz;

const beamGeo = new THREE.CylinderGeometry(0.05, 0.16, 3.4, 8, 1, true);
beamGeo.translate(0, 1.7, 0);
const discGeo = new THREE.CircleGeometry(0.6, 20).rotateX(-Math.PI / 2);
const beamMats = {};
const discMats = {};
function beamFor(color) {
  if (!beamMats[color]) {
    beamMats[color] = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.38, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    discMats[color] = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
  }
  return [beamMats[color], discMats[color]];
}

export const CHEST_OPEN_TIME = 1.1;

export class LootManager {
  constructor(game) {
    this.game = game;
    this.drops = [];
    this.chests = [];
    this.grid = new Map();
    this.nextId = 1;
    this.visualRadius = 110;
    this.group = new THREE.Group();
    this.group.name = 'loot';
    game.scene.add(this.group);
    this.hum = 0;
  }

  clear() {
    for (const d of this.drops) if (d.mesh) this.group.remove(d.mesh);
    for (const c of this.chests) { if (c.mesh) this.group.remove(c.mesh); if (c.beam) this.group.remove(c.beam); }
    this.drops = [];
    this.chests = [];
    this.grid.clear();
  }

  // ---- setup -----------------------------------------------------------------------------------------------------------------------------------------
  populate() {
    const w = this.game.world;
    const rng = mulberry32(9090);
    for (const s of w.chestSpots) {
      const poi = POI_BY_ID[s.poi];
      this.chests.push({ x: s.x, y: s.y, z: s.z, yaw: s.yaw || 0, bias: poi?.bias || {}, focus: s.tag || null, opened: false, progress: 0, mesh: null, lidT: 0, elevated: s.y - w.terrain.height(s.x, s.z) > 2.2, poi: s.poi });
    }
    for (const s of w.lootSpots) {
      const poi = POI_BY_ID[s.poi];
      const chance = s.tag === 'floorange' ? 1 : 0.7;
      if (rng() > chance) continue;
      const entry = rollLoot({ bias: poi?.bias || {}, focus: s.tag });
      this.spawnEntry(entry, s.x, s.y, s.z, { elevated: s.elevated });
    }
    // random wilderness loot
    let n = 0, tries = 0;
    while (n < 150 && tries++ < 3000) {
      const a = rng() * Math.PI * 2, r = Math.sqrt(rng()) * (WORLD.islandR - 30);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const h = w.terrain.height(x, z);
      if (h < 1.5) continue;
      const entry = rollLoot({});
      this.spawnEntry(entry, x, h, z, {});
      n++;
    }
    // a few lone chests in the wild
    n = 0; tries = 0;
    while (n < 14 && tries++ < 3000) {
      const a = rng() * Math.PI * 2, r = Math.sqrt(rng()) * (WORLD.islandR - 60);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const h = w.terrain.height(x, z);
      if (h < 2 || w.terrain.slope(x, z) > 0.4) continue;
      this.chests.push({ x, y: h, z, yaw: rng() * 6.28, bias: {}, focus: null, opened: false, progress: 0, mesh: null, lidT: 0, elevated: false, poi: null });
      n++;
    }
  }

  spawnEntry(entry, x, y, z, o = {}) {
    if (entry.ammo) return this.addDrop({ ammo: entry.ammo, count: entry.count }, x, y, z, o);
    const st = makeStack(entry.id, entry.rarity, entry.count);
    return this.addDrop({ stack: st, count: st.count }, x, y, z, o);
  }

  addDrop(base, x, y, z, o = {}) {
    const d = {
      id: this.nextId++, ...base, pos: new THREE.Vector3(x, y, z), vel: new THREE.Vector3(o.vx || 0, o.vy || 0, o.vz || 0),
      settled: !o.pop, elevated: !!o.elevated, mesh: null, born: this.game.time, ignore: o.ignore || null, ignoreT: o.ignoreT || 0, cell: null, dead: false,
    };
    this.drops.push(d);
    this.cellAdd(d);
    return d;
  }

  cellAdd(d) {
    const k = key(Math.floor(d.pos.x / CELL), Math.floor(d.pos.z / CELL));
    let c = this.grid.get(k);
    if (!c) { c = new Set(); this.grid.set(k, c); }
    c.add(d);
    d.cell = k;
  }
  cellRemove(d) {
    const c = this.grid.get(d.cell);
    if (c) c.delete(d);
  }

  dropStack(stack, pos, from, forward = false) {
    if (!stack) return;
    const a = Math.random() * Math.PI * 2;
    let vx = Math.cos(a) * 2, vz = Math.sin(a) * 2;
    if (forward && from) { vx = -Math.sin(from.yaw) * 3.5; vz = -Math.cos(from.yaw) * 3.5; }
    const d = this.addDrop({ stack, count: stack.count }, pos.x, pos.y + 1.0, pos.z, { pop: true, vx, vy: 4, vz, ignore: from, ignoreT: 1.2 });
    return d;
  }

  dropAmmo(type, count, pos) {
    const a = Math.random() * Math.PI * 2;
    return this.addDrop({ ammo: type, count }, pos.x, pos.y + 1.0, pos.z, { pop: true, vx: Math.cos(a) * 2.5, vy: 4, vz: Math.sin(a) * 2.5 });
  }

  /** Everything a character carries falls to the ground when they are eliminated. */
  dropAll(ch) {
    for (let i = 1; i < ch.inv.slots.length; i++) {
      const s = ch.inv.slots[i];
      if (s) { this.dropStack(s, ch.pos, null); ch.inv.slots[i] = null; }
    }
    for (const [type, n] of Object.entries(ch.inv.ammo)) {
      let left = n;
      while (left > 0) {
        const take = Math.min(left, AMMO[type].pack);
        this.dropAmmo(type, take, ch.pos);
        left -= take;
      }
      ch.inv.ammo[type] = 0;
    }
  }

  // ---- queries --------------------------------------------------------------------------------------------------------------------------------------------------
  nearbyDrops(x, z, r, out = []) {
    const ix0 = Math.floor((x - r) / CELL), ix1 = Math.floor((x + r) / CELL), iz0 = Math.floor((z - r) / CELL), iz1 = Math.floor((z + r) / CELL);
    for (let ix = ix0; ix <= ix1; ix++) for (let iz = iz0; iz <= iz1; iz++) {
      const c = this.grid.get(key(ix, iz));
      if (!c) continue;
      for (const d of c) if (!d.dead && (d.pos.x - x) ** 2 + (d.pos.z - z) ** 2 <= r * r) out.push(d);
    }
    return out;
  }

  nearestChest(x, z, r, y = null) {
    let best = null, bd = r * r;
    for (const c of this.chests) {
      if (c.opened) continue;
      const dx = c.x - x, dz = c.z - z;
      const d = dx * dx + dz * dz;
      if (d < bd && (y === null || Math.abs(c.y - y) < 2.2)) { bd = d; best = c; }
    }
    return best;
  }

  canTake(ch, d) {
    if (d.dead) return false;
    if (d.ignore === ch && this.game.time - d.born < d.ignoreT) return false;
    if (d.ammo) return ch.inv.ammo[d.ammo] < AMMO[d.ammo].max;
    return true;
  }

  /** Try to pick a drop up with a character. */
  take(ch, d) {
    if (!this.canTake(ch, d)) return false;
    const ok = ch.pickup(d);
    if (!ok) return false;
    const empty = d.ammo ? d.count <= 0 : d.count === 0 || d.stack.count <= 0;
    if (ch.isPlayer) {
      this.game.audio.play(d.ammo ? 'ammo' : 'pickup', null);
      const name = d.ammo ? AMMO[d.ammo].name : d.stack.def.name;
      this.game.hud?.pickupToast(name, d.ammo ? 0 : d.stack.rarity, d.ammo ? true : false, d.ammo ? '' : d.stack.def.desc || '');
    }
    if (empty) this.removeDrop(d);
    else if (d.mesh) d.mesh.userData.dirty = true;
    return true;
  }

  removeDrop(d) {
    d.dead = true;
    this.cellRemove(d);
    if (d.mesh) { this.group.remove(d.mesh); d.mesh = null; }
    const i = this.drops.indexOf(d);
    if (i >= 0) this.drops.splice(i, 1);
  }

  // ---- chests ------------------------------------------------------------------------------------------------------------------------------------------------------
  /** Advance opening progress; returns true when the chest popped open. */
  work(chest, ch, dt) {
    if (chest.opened) return false;
    chest.progress += dt;
    chest.lastWork = this.game.time;
    if (chest.progress >= CHEST_OPEN_TIME) {
      this.open(chest, ch);
      return true;
    }
    return false;
  }

  open(chest, ch) {
    const g = this.game;
    chest.opened = true;
    chest.progress = CHEST_OPEN_TIME;
    const items = rollChest(chest.bias, chest.focus);
    let i = 0;
    for (const it of items) {
      const a = (i++ / items.length) * Math.PI * 2 + Math.random();
      const sp = 1.8 + Math.random() * 1.2;
      const base = it.ammo ? { ammo: it.ammo, count: it.count } : (() => { const st = makeStack(it.id, it.rarity, it.count); return { stack: st, count: st.count }; })();
      this.addDrop(base, chest.x, chest.y + 0.7, chest.z, { pop: true, vx: Math.cos(a) * sp, vy: 4.5, vz: Math.sin(a) * sp, elevated: chest.elevated });
    }
    g.fx.chestOpen(new THREE.Vector3(chest.x, chest.y, chest.z));
    g.audio.play('chest', new THREE.Vector3(chest.x, chest.y, chest.z), { max: 120 });
    g.noise(new THREE.Vector3(chest.x, chest.y, chest.z), 35, ch);
  }

  // ---- per-frame ------------------------------------------------------------------------------------------------------------------------------------------------------
  update(dt, viewPos, time) {
    const g = this.game;
    const w = g.world;
    // physics of popped drops
    for (const d of this.drops) {
      if (d.settled) continue;
      d.vel.y -= 22 * dt;
      d.pos.addScaledVector(d.vel, dt);
      const gy = w.collision.groundAt(d.pos.x, d.pos.z, d.pos.y + 0.3, 0.6) + 0.05;
      if (d.pos.y <= gy && d.vel.y < 0) {
        d.pos.y = gy;
        if (d.vel.y < -3) { d.vel.y *= -0.35; d.vel.x *= 0.6; d.vel.z *= 0.6; }
        else { d.vel.set(0, 0, 0); d.settled = true; d.elevated = d.pos.y - w.terrain.height(d.pos.x, d.pos.z) > 2.2; }
      }
      // slide against walls a bit
      _tmp.copy(d.pos);
      if (w.collision.resolve(_tmp, 0.2, 0.3, 0.1)) { d.pos.x = _tmp.x; d.pos.z = _tmp.z; d.vel.x *= 0.5; d.vel.z *= 0.5; }
      if (d.cell !== key(Math.floor(d.pos.x / CELL), Math.floor(d.pos.z / CELL))) { this.cellRemove(d); this.cellAdd(d); }
      if (d.mesh) d.mesh.position.copy(d.pos);
    }
    // visual streaming
    const R = this.visualRadius, R2 = R * R, keepR2 = (R + 25) * (R + 25);
    let budget = 6;
    for (const d of this.drops) {
      const dx = d.pos.x - viewPos.x, dz = d.pos.z - viewPos.z;
      const dd = dx * dx + dz * dz;
      if (d.mesh) {
        if (dd > keepR2) { this.group.remove(d.mesh); d.mesh = null; continue; }
        const m = d.mesh;
        m.userData.model.rotation.y += dt * 1.4;
        m.userData.model.position.y = 0.6 + Math.sin(time * 2 + d.id) * 0.08;
        m.position.copy(d.pos);
      } else if (dd < R2 && budget > 0) {
        d.mesh = this.makeDropMesh(d);
        d.mesh.position.copy(d.pos);
        this.group.add(d.mesh);
        budget--;
      }
    }
    for (const c of this.chests) {
      const dx = c.x - viewPos.x, dz = c.z - viewPos.z;
      const dd = dx * dx + dz * dz;
      if (c.mesh) {
        if (dd > (R + 40) ** 2) { this.group.remove(c.mesh); c.mesh = null; continue; }
        const lidTarget = c.opened ? -1.95 : 0;
        c.lidT += (lidTarget - c.lidT) * Math.min(1, dt * 8);
        c.mesh.userData.lid.rotation.x = c.lidT;
        c.mesh.userData.glow.visible = !c.opened;
        if (c.beam) c.beam.visible = !c.opened;
        if (!c.opened && c.progress > 0 && time - (c.lastWork || 0) > 0.3) c.progress = Math.max(0, c.progress - dt * 2);
        if (!c.opened) c.mesh.userData.lid.rotation.x = -c.progress * 0.25;
      } else if (dd < (R + 30) ** 2 && budget > 0) {
        c.mesh = chestModel();
        c.mesh.position.set(c.x, c.y, c.z);
        c.mesh.rotation.y = c.yaw;
        const [bm] = beamFor(0xffd23f);
        c.beam = new THREE.Mesh(beamGeo, bm);
        c.beam.scale.set(1.5, 1.4, 1.5);
        c.beam.position.set(c.x, c.y, c.z);
        this.group.add(c.mesh, c.beam);
        c.mesh.userData.beam = c.beam;
        c.mesh.traverse((o) => { if (o.isMesh) o.castShadow = false; });
        budget--;
      }
      if (c.mesh && c.beam && !c.beam.parent) this.group.add(c.beam);
      if (c.mesh === null && c.beam) { this.group.remove(c.beam); c.beam = null; }
    }
    // chest hum when the player is close
    this.hum -= dt;
    if (this.hum <= 0) {
      this.hum = 1.6;
      const p = g.player;
      if (p && p.alive && p.mode === 'normal') {
        const c = this.nearestChest(p.pos.x, p.pos.z, 22, p.pos.y);
        if (c) g.audio.play('chest_hum', { x: c.x, y: c.y, z: c.z }, { max: 30, vol: 0.9 });
      }
    }
  }

  makeDropMesh(d) {
    const g = new THREE.Group();
    const inner = new THREE.Group();
    let color;
    let model;
    if (d.ammo) {
      model = ammoModel(d.ammo);
      model.scale.setScalar(2.0);
      color = new THREE.Color(AMMO[d.ammo].color).getHex();
    } else {
      const def = d.stack.def;
      model = itemModel(def.id);
      const s = def.kind === 'gun' ? 1.5 : def.kind === 'melee' ? 1.1 : def.kind === 'gadget' ? 2.2 : 2.6;
      model.scale.setScalar(s);
      if (def.kind === 'gun' || def.kind === 'melee') model.rotation.y = Math.PI / 2;
      color = new THREE.Color(RARITIES[d.stack.rarity].color).getHex();
    }
    // wrap so the spin happens about the model centre
    inner.add(model);
    inner.position.y = 0.6;
    g.add(inner);
    const [bm, dm] = beamFor(color);
    const beam = new THREE.Mesh(beamGeo, bm);
    const disc = new THREE.Mesh(discGeo, dm);
    disc.position.y = 0.04;
    g.add(beam, disc);
    g.userData.model = inner;
    inner.traverse((o) => { if (o.isMesh) o.castShadow = false; });
    return g;
  }
}

const _tmp = new THREE.Vector3();
