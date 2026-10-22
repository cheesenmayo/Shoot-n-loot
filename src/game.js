import * as THREE from 'three';
import { World } from './world/world.js';
import { FX } from './fx.js';
import { Combat } from './combat.js';
import { LootManager } from './loot.js';
import { Storm } from './storm.js';
import { Bus } from './bus.js';
import { AudioSys } from './audio.js';
import { HUD } from './hud.js';
import { Character } from './entities/character.js';
import { PlayerController } from './entities/player.js';
import { Bot, makeNames } from './entities/bot.js';
import { PRESETS, settings, loadSettings, saveSettings, touchEnabled, coarsePointer } from './settings.js';
import { TouchControls } from './touch.js';
import { Sandbox } from './sandbox.js';
import { shuffle } from './util.js';
import { WORLD } from './world/terrain.js';
import { RARITIES } from './items.js';

const BOT_COUNT = 49;

export class Game {
  constructor(canvas, uiRoot) {
    this.canvas = canvas;
    // MSAA is too expensive for phones; the lower pixel ratio hides most aliasing anyway
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !coarsePointer(), powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.92;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.2, 4200);
    this.audio = new AudioSys();
    this.state = 'loading';
    this.paused = false;
    this.time = 0;
    this.chars = [];
    this.bots = [];
    this.botOf = new Map();
    this.player = null;
    this.controller = null;
    this.dynPads = [];
    this.allPads = [];
    this.shakeAmount = 0;
    this.aliveCount = 50;
    this.busStartT = 0;
    this.matchStartT = 0;
    this.fps = 60;
    this.pendingResult = null;
    this.forcedJump = false;
    this.touchMode = false;
    this.sandbox = false; // sandbox mode: no bus, storm or placement; see sandbox.js
    this.sbx = null;
    this.hud = new HUD(this, uiRoot);
    this.touch = new TouchControls(this, this.hud.$('#touch'));
    addEventListener('resize', () => this.onResize());
    addEventListener('orientationchange', () => setTimeout(() => this.onResize(), 250));
  }

  onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.checkOrientation();
  }

  /** Phones play in landscape: ask for a rotation (and pause) while held upright. */
  checkOrientation() {
    const portrait = this.touchMode && innerHeight > innerWidth * 1.05;
    this.hud.show('rotate', portrait);
    if (portrait && ['bus', 'playing', 'dead'].includes(this.state)) this.pause();
  }

  /** Apply the touch-controls setting (auto / on / off). */
  refreshTouch() {
    const on = touchEnabled();
    this.touchMode = on;
    this.touch.setEnabled(on);
    if (this.world && this.graphics) this.applyGraphics(settings.graphics);
    this.checkOrientation();
  }

  enterFullscreen() {
    try {
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req && !document.fullscreenElement && !document.webkitFullscreenElement) {
        const p = req.call(el);
        if (p && p.catch) p.catch(() => {});
      }
    } catch { /* not allowed here */ }
    try {
      const p = screen.orientation?.lock?.('landscape');
      if (p && p.catch) p.catch(() => {});
    } catch { /* ignore */ }
  }

  async init() {
    loadSettings();
    this.refreshTouch();
    this.hud.syncSettings();
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.fov = settings.fov;
    this.camera.updateProjectionMatrix();
    this.world = new World(this.renderer, this.scene);
    await this.world.build((label, p) => this.hud.loading(label, p));
    this.fx = new FX(this.scene, this.world.textures, this);
    this.world.ambient.attachFx(this.fx);
    this.combat = new Combat(this);
    this.loot = new LootManager(this);
    this.storm = new Storm(this);
    this.bus = new Bus(this);
    this.controller = new PlayerController(this, null, this.canvas);
    this.sbx = new Sandbox(this);
    this.audio.setVolume(settings.volume);
    this.applyGraphics(settings.graphics);
    this.allPads = this.world.jumpPads.slice();
    this.menuCamera(0);
    this.world.terrain.update(this.camera.position, true);
    this.state = 'menu';
    this.hud.show('loading', false);
    this.hud.show('title', true);
    this.lastT = performance.now();
    this.world.paintMap(coarsePointer() ? 640 : 1024).then(() => { this.mapReady = true; });
  }

  applyGraphics(id, byUser = false) {
    settings.graphics = id;
    if (byUser) settings.chosen = true;
    saveSettings();
    const g = PRESETS[id];
    this.graphics = g;
    this.world.applyGraphics(g);
    this.loot.visualRadius = id === 'low' ? 70 : id === 'ultra' ? 160 : 110;
    this.fx.setQuality(g.particles);
    this.onResize();
    this.hud.syncSettings();
  }

  // ---- queries used by systems ------------------------------------------------------------------------------------------------------------
  inputEnabled() { return !this.paused && !this.sbx?.open && (this.state === 'bus' || this.state === 'playing' || this.state === 'dead'); }
  nearPlayer(pos, r) { return Math.hypot(pos.x - this.camera.position.x, pos.z - this.camera.position.z) < r; }
  jumpPads() { return this.allPads; }
  shouldDrawTracer(ch, end) {
    if (ch.isPlayer) return true;
    const c = this.camera.position;
    return Math.hypot(ch.pos.x - c.x, ch.pos.z - c.z) < 170 || Math.hypot(end.x - c.x, end.z - c.z) < 120;
  }
  shake(v) { this.shakeAmount = Math.max(this.shakeAmount, v); }
  explosionShake(pos, radius) {
    const d = Math.hypot(pos.x - this.camera.position.x, pos.y - this.camera.position.y, pos.z - this.camera.position.z);
    if (d < radius * 6) this.shake(Math.min(1.2, (1 - d / (radius * 6)) * 1.4));
  }
  addJumpPad(p) {
    const m = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 0.18, 18), new THREE.MeshStandardMaterial({ color: 0x1c212b, roughness: 0.6 }));
    const top = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.06, 18), new THREE.MeshBasicMaterial({ color: 0x5fe8ff }));
    top.position.y = 0.12;
    m.add(base, top);
    m.position.set(p.x, p.y + 0.09, p.z);
    this.scene.add(m);
    p.mesh = m;
    this.dynPads.push(p);
    this.refreshPads();
  }
  refreshPads() { this.allPads = this.world.jumpPads.concat(this.dynPads); }

  noise(pos, radius, source) {
    for (const b of this.bots) b.onNoise(pos, radius, source);
  }

  // ---- match lifecycle ------------------------------------------------------------------------------------------------------------------------------
  clearMatch() {
    this.sbx?.end();
    for (const c of this.chars) c.dispose();
    this.chars = [];
    this.bots = [];
    this.botOf.clear();
    for (const p of this.combat.projectiles) this.scene.remove(p.mesh);
    this.combat.projectiles = [];
    for (const p of this.dynPads) this.scene.remove(p.mesh);
    this.dynPads = [];
    this.refreshPads();
    this.loot.clear();
    this.fx.reset();
    this.storm.stop();
    this.bus.active = false;
    this.bus.group.visible = false;
    this.player = null;
    this.hud.$('#feed').innerHTML = '';
    this.hud.$('#toasts').innerHTML = '';
    this.hud.$('#pickups').innerHTML = '';
    this.hud.lastHot = '';
    this.hud.lastAmmo = '';
  }

  startMatch() {
    if (this.state === 'loading') return;
    this.clearMatch();
    this.enterSession(false);

    const names = makeNames(BOT_COUNT);
    const skills = shuffle([...Array(12).fill('pro'), ...Array(19).fill('mid'), ...Array(18).fill('noob')]);
    const player = this.createPlayer();
    this.player = player;
    this.chars.push(player);
    for (let i = 0; i < BOT_COUNT; i++) {
      const ch = new Character(this, { id: i + 1, name: names[i], seed: 100 + i * 7, skill: skills[i] });
      const bot = new Bot(this, ch, skills[i]);
      this.chars.push(ch);
      this.bots.push(bot);
      this.botOf.set(ch, bot);
    }
    this.aliveCount = this.chars.length;
    this.loot.populate();
    this.bus.launch();
    this.storm.start();
    for (const c of this.chars) { c.setMode('bus'); c.alive = true; c.pos.copy(this.bus.pos); }
    this.controller.char = player;
    this.controller.yaw = this.bus.group.rotation.y;
    this.controller.pitch = -0.2;
    this.controller.distSm = this.controller.offSm = this.controller.heightSm = null;
    this.controller.spectate.target = null;
    this.forcedJump = false;
    this.busStartT = this.time;
    this.matchStartT = this.time;
    this.state = 'bus';
    this.audio.init();
    if (this.touchMode) this.enterFullscreen();
    this.audio.play('bus');
    this.hud.toast('The Battle Bus is on its way!');
    this.controller.requestLock();
    this.hud.syncSettings();
  }

  /** Shared start-up for matches and the sandbox: reset flags, hide the menus, show the HUD. */
  enterSession(sandbox) {
    this.sandbox = sandbox;
    this.paused = false;
    this.pendingResult = null;
    this.resultShown = false;
    clearTimeout(this.resultTimer);
    this.hud.setSandbox(sandbox);
    this.hud.show('title', false);
    this.hud.show('result', false);
    this.hud.show('pause', false);
    this.hud.showHud(true);
    this.hud.mapOpen = false;
    this.hud.$('#bigmap').classList.add('hidden');
  }

  createPlayer() {
    return new Character(this, { id: 0, name: 'You', isPlayer: true, seed: 3, look: { shirt: 0xffb62e, pants: 0x27324a, hat: null, hair: 0x2a1a10, pack: 0x2e6bd8 }, gliderColor: 0x35e8ff });
  }

  /** Sandbox: the player alone on the ground at Parkour Plaza with the tools panel (B). No bus, storm or result screen. */
  startSandbox() {
    if (this.state === 'loading') return;
    this.clearMatch();
    this.enterSession(true);
    const player = this.createPlayer();
    this.player = player;
    this.chars.push(player);
    this.aliveCount = 1;
    this.loot.populate();
    this.controller.char = player;
    this.controller.spectate.target = null;
    this.forcedJump = false;
    this.busStartT = this.matchStartT = this.time;
    this.state = 'playing';
    this.sbx.begin();
    this.controller.distSm = this.controller.offSm = this.controller.heightSm = null;
    this.controller.update(0);
    this.world.terrain.update(this.camera.position, true);
    this.audio.init();
    if (this.touchMode) this.enterFullscreen();
    this.hud.toast(this.touchMode ? 'Sandbox · tap the flask button for the tools' : 'Sandbox · press B for the tools');
    this.controller.requestLock();
    this.hud.syncSettings();
  }

  returnToMenu() {
    this.paused = false;
    this.sandbox = false;
    this.hud.setSandbox(false);
    clearTimeout(this.resultTimer);
    this.clearMatch();
    this.controller.char = null;
    this.hud.showHud(false);
    this.hud.show('pause', false);
    this.hud.show('result', false);
    this.hud.show('title', true);
    this.state = 'menu';
    this.audio.setWind(0);
    this.audio.setStorm(0);
    this.resultShown = false;
    this.releaseLock();
  }

  togglePause() {
    if (this.state === 'menu' || this.state === 'loading') return;
    // Esc both drops pointer lock and (in some browsers) fires a keydown: ignore the echo
    if (performance.now() - (this.pauseChangedAt || 0) < 250) return;
    if (this.sbx?.open) { this.sbx.closePanel(true); return; } // Esc closes the sandbox panel first
    if (this.paused) this.resume(); else this.pause();
  }
  releaseLock() {
    this.lockReleasing = true;
    try { document.exitPointerLock(); } catch { /* ignore */ }
    setTimeout(() => { this.lockReleasing = false; }, 400);
  }
  pause() {
    if (this.paused || !['bus', 'playing', 'dead', 'ended'].includes(this.state)) return;
    if (this.sbx?.open) this.sbx.closePanel(true, false);
    this.pauseChangedAt = performance.now();
    this.paused = true;
    this.touch.setActive(false);
    this.hud.show('pause', true);
    this.audio.setWind(0);
    this.releaseLock();
  }
  resume(noLock = false) {
    this.pauseChangedAt = performance.now();
    this.paused = false;
    this.hud.show('pause', false);
    if (!noLock) this.controller.requestLock();
  }
  onLockLost() {
    if (this.touchMode || this.lockReleasing || this.resultShown) return;
    if (['bus', 'playing', 'dead'].includes(this.state) && !this.paused && !this.hud.mapOpen && !this.sbx?.open) this.pause();
  }
  spectate() {
    this.resultShown = false;
    this.state = 'dead';
    this.hud.toast(this.touchMode ? 'Spectating · tap NEXT to switch player' : 'Spectating · E / Q to switch player');
    this.controller.requestLock();
  }

  jumpFromBus(ch) {
    if (ch.mode !== 'bus' || !ch.alive) return;
    const b = this.bus;
    const jitter = ch.isPlayer ? 0 : 3;
    ch.place(b.pos.x + (Math.random() - 0.5) * jitter, b.pos.y - 4, b.pos.z + (Math.random() - 0.5) * jitter);
    ch.vel.set(b.dir.x * 20, -10, b.dir.z * 20);
    ch.yaw = Math.atan2(-b.dir.x, -b.dir.z);
    ch.setMode('skydive');
    if (ch.isPlayer) {
      this.state = 'playing';
      this.controller.yaw = ch.yaw;
      this.hud.toast(this.touchMode ? 'Stick up to dive · tap GLIDE to open the glider' : 'W to dive · Space to open the glider');
      this.audio.play('glider', null, { vol: 0.4 });
    }
  }

  // ---- events -------------------------------------------------------------------------------------------------------------------------------------------------
  onDamage(victim, attacker, amount, info, shieldBroke) {
    const p = this.player;
    if (victim.isPlayer) {
      this.hud.flashDamage(Math.min(0.85, amount / 45 + 0.15));
      this.audio.play(shieldBroke ? 'shield_break' : 'hurt', null, { vol: 0.8 });
      if (info.type !== 'storm') this.shake(Math.min(0.5, amount * 0.012));
      if (attacker && attacker !== victim) this.hud.hitFrom(attacker.pos);
    } else {
      const bot = this.botOf.get(victim);
      if (bot && attacker) bot.onDamaged(attacker);
    }
    if (attacker && attacker.isPlayer && victim !== attacker) {
      this.hud.hitmarker(info.headshot);
      this.audio.play(info.headshot ? 'headshot' : 'hit', null, { vol: 0.9 });
      this.hud.damageNumber(new THREE.Vector3(victim.pos.x, victim.pos.y + 1.9, victim.pos.z), amount, info.headshot);
      if (this.sandbox) this.sbx.onHit(victim, amount, info);
    }
    void p;
  }

  onElimination(victim, attacker, info, wasAir) {
    const killer = attacker && attacker !== victim ? attacker : null;
    let line;
    const icon = info.weapon?.icon || '🔫';
    if (killer) line = `<b>${killer.name}</b> ${icon} ${victim.name}`;
    else if (info.type === 'storm') line = `${victim.name} was caught in the storm ⛈`;
    else if (info.type === 'fall') line = `${victim.name} fell to their death 💀`;
    else line = `${victim.name} was eliminated`;
    this.hud.feed(line, killer?.isPlayer ? 'me' : victim.isPlayer ? 'die' : '');
    if (!(this.sandbox && victim.isPlayer)) this.loot.dropAll(victim); // the sandbox player keeps their inventory
    this.fx.teleport(victim.pos, 'cyan');
    this.audio.play('elim', victim.pos, { max: 120, vol: 0.5 });
    if (killer) {
      killer.kills++;
      if (killer.isPlayer) this.hud.elimToast(victim.name, killer.kills);
    }
    if (this.sandbox) { this.sbx.onElimination(victim, killer, info); return; } // no placement or match end in the sandbox
    const placement = this.aliveCount;
    this.aliveCount--;
    victim.placement = placement;
    if (victim.isPlayer) {
      this.state = 'dead';
      this.audio.play('elim', null);
      this.controller.spectate.target = killer && killer.alive ? killer : null;
      this.pendingResult = { win: false, placement, kills: victim.kills, damage: victim.stats.damage, time: this.time - this.matchStartT, killer: killer?.name || (info.type === 'storm' ? 'the storm' : info.type === 'fall' ? 'a fall' : null), total: this.chars.length };
      this.resultTimer = setTimeout(() => {
        if (this.pendingResult && this.state === 'dead') { this.resultShown = true; this.hud.showResult(this.pendingResult); }
        this.releaseLock();
      }, 2200);
    }
    if (this.aliveCount <= 1) this.endMatch();
  }

  endMatch() {
    if (this.state === 'ended' || this.sandbox) return;
    const winner = this.chars.find((c) => c.alive);
    if (winner?.isPlayer) {
      this.state = 'ended';
      this.audio.play('win', null);
      this.hud.feed('<b>VICTORY ROYALE!</b>', 'me');
      this.resultTimer = setTimeout(() => {
        this.resultShown = true;
        this.hud.showResult({ win: true, placement: 1, kills: winner.kills, damage: winner.stats.damage, time: this.time - this.matchStartT, total: this.chars.length });
        this.releaseLock();
      }, 2500);
    } else {
      this.hud.toast(`${winner ? winner.name : 'Nobody'} wins the match`);
      if (this.state !== 'dead') this.state = 'ended';
      if (this.pendingResult) this.pendingResult.winner = winner?.name;
    }
  }

  // ---- loop ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  menuCamera(dt) {
    const a = this.time * 0.045;
    const c = this.camera;
    c.position.set(Math.cos(a) * 560, 250 + Math.sin(this.time * 0.1) * 30, Math.sin(a) * 560);
    c.lookAt(0, 20, 0);
  }

  frame(now) {
    let dt = (now - this.lastT) / 1000;
    this.lastT = now;
    if (!(dt > 0)) dt = 1 / 60;
    dt = Math.min(dt, 0.05);
    this.fps += (1 / dt - this.fps) * 0.1;
    this.autoTune(dt);
    this.step(dt);
    this.render();
  }

  /** First run only: if the title-screen fly-over is slow, switch to Low graphics. */
  autoTune(dt) {
    if (this.state !== 'menu' || settings.chosen || !this.mapReady) return;
    const t = (this.tune ||= { t: 0, samples: [] });
    t.t += dt;
    if (t.t > 1.5) t.samples.push(dt);
    if (t.t < 5) return;
    settings.chosen = true;
    const s = t.samples.sort((a, b) => a - b);
    const median = s[Math.floor(s.length / 2)] || 0;
    if (median > 1 / 22 && settings.graphics !== 'low') {
      this.applyGraphics('low');
      settings.chosen = true;
      saveSettings();
      this.hud.setNote('Slow graphics detected, so Low was selected. You can change this below.');
    } else saveSettings();
  }

  render() { this.renderer.render(this.scene, this.camera); }

  step(dt) {
    if (this.state === 'loading') return;
    const sbx = this.sandbox ? this.sbx : null;
    this.touch.setActive(this.touchMode && ['bus', 'playing', 'dead'].includes(this.state) && !this.paused && !this.resultShown && !this.hud.mapOpen && !sbx?.open);
    const inMatch = this.player && this.state !== 'menu';
    if (!inMatch) {
      this.time += dt;
      this.menuCamera(dt);
      this.world.update(this.camera, this.camera.position, dt, this.time);
      this.fx.update(dt, this.camera, this.renderer);
      return;
    }
    if (this.paused) {
      this.world.update(this.camera, this.camera.position, 0, this.time);
      return;
    }
    // sandbox: the simulation runs on scaled time and stands still while the tools panel is open (camera and HUD keep going)
    const sdt = sbx ? sbx.simDt(dt) : dt;
    this.time += sdt;
    const p = this.player;
    const b = this.bus;

    if (sbx) sbx.update(dt, sdt);
    else {
      // bus
      b.update(dt);
      for (const c of this.chars) if (c.alive && c.mode === 'bus') { c.pos.copy(b.pos); c.pos.y -= 3; }
      // everyone still aboard is ejected once the bus is leaving the island
      const leaving = b.active && b.progress > 0.5 && Math.hypot(b.pos.x, b.pos.z) > WORLD.islandR - 90;
      if ((!b.active || leaving) && !this.forcedJump && this.chars.some((c) => c.mode === 'bus' && c.alive)) {
        this.forcedJump = true;
        for (const c of this.chars) if (c.mode === 'bus' && c.alive) this.jumpFromBus(c);
      }
      this.storm.update(dt, this.time);
    }
    this.controller.update(dt);
    for (const bot of this.bots) bot.update(sdt);

    // visibility / level of detail for characters
    const cp = this.camera.position;
    const vd = Math.min(this.graphics.viewDistance * 0.95, 900);
    for (const c of this.chars) {
      if (c.isPlayer) { c.renderOn = true; continue; }
      const d = Math.hypot(c.pos.x - cp.x, c.pos.z - cp.z);
      const vis = c.mode !== 'bus' && d < vd && (c.alive || c.deadT < 40);
      c.renderOn = vis;
      if (c.mode !== 'bus') c.root.visible = vis;
      const wantShadow = vis && d < 90 && this.graphics.shadowMap > 0;
      if (wantShadow !== c.shadowOn) {
        c.shadowOn = wantShadow;
        c.root.traverse((o) => { if (o.isMesh) o.castShadow = wantShadow; });
      }
    }
    for (const c of this.chars) c.update(sdt);
    this.separate();
    this.combat.update(sdt);

    // temporary jump pads
    for (let i = this.dynPads.length - 1; i >= 0; i--) {
      if (this.time > this.dynPads[i].expires) {
        this.scene.remove(this.dynPads[i].mesh);
        this.dynPads.splice(i, 1);
        this.refreshPads();
      }
    }

    this.loot.update(sdt, cp, this.time);
    this.fx.update(sdt, this.camera, this.renderer);
    const focus = p.alive || !this.controller.spectate.target ? p.pos : this.controller.spectate.target.pos;
    this.world.update(this.camera, focus, sdt, this.time);
    this.hud.update(dt, this.fps);

    // ambience
    if (p.alive && (p.mode === 'skydive')) this.audio.setWind(clampv(-p.vel.y / 60, 0, 1));
    else if (p.alive && p.mode === 'glide') this.audio.setWind(0.35);
    else this.audio.setWind(0);
    if (this.storm.active) {
      const dEdge = this.storm.edgeDistance(cp.x, cp.z);
      this.audio.setStorm(dEdge < 0 ? 1 : clampv(1 - dEdge / 120, 0, 0.7));
    }
    this.shakeAmount = Math.max(0, this.shakeAmount - dt * 1.4);
    if (this.state === 'bus' && p.mode !== 'bus') this.state = 'playing';
  }

  separate() {
    const cs = this.chars;
    for (let i = 0; i < cs.length; i++) {
      const a = cs[i];
      if (!a.alive || a.mode !== 'normal') continue;
      for (let j = i + 1; j < cs.length; j++) {
        const b = cs[j];
        if (!b.alive || b.mode !== 'normal') continue;
        const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
        const d2 = dx * dx + dz * dz;
        if (d2 > 0.64 * 0.64 || d2 < 1e-6 || Math.abs(a.pos.y - b.pos.y) > 1.5) continue;
        const d = Math.sqrt(d2), push = (0.64 - d) * 0.5;
        a.pos.x -= (dx / d) * push; a.pos.z -= (dz / d) * push;
        b.pos.x += (dx / d) * push; b.pos.z += (dz / d) * push;
      }
    }
  }
}

const clampv = (v, a, b) => (v < a ? a : v > b ? b : v);
export { RARITIES, WORLD };
