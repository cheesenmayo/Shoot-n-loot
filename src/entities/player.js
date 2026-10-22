import * as THREE from 'three';
import { settings } from '../settings.js';
import { clamp, damp, wrapAngle } from '../util.js';
import { AMMO, RARITIES } from '../items.js';
import { CHEST_OPEN_TIME } from '../loot.js';

const _hit = {};
const _v = new THREE.Vector3(), _f = new THREE.Vector3(), _r = new THREE.Vector3(), _c = new THREE.Vector3();

export class PlayerController {
  constructor(game, char, canvas) {
    this.game = game;
    this.char = char;
    this.canvas = canvas;
    this.keys = new Set();
    this.yaw = 0;
    this.pitch = -0.15;
    this.shoulder = 1;
    this.camDist = 3.4;
    this.camPos = new THREE.Vector3();
    this.fov = 70;
    this.target = null;
    this.interactHeld = false;
    this.autoPickT = 0;
    this.lastRecoil = 0;
    this.mouseDown = false;
    this.rmbDown = false;
    this.wheelAcc = 0;
    this.spectate = { target: null, idx: 0 };
    this.scoped = false;
    this.locked = false;
    this.bind();
  }

  bind() {
    const d = document;
    d.addEventListener('keydown', (e) => this.onKey(e, true));
    d.addEventListener('keyup', (e) => this.onKey(e, false));
    d.addEventListener('mousemove', (e) => {
      if ((!this.locked && !this.fallbackLook) || !this.game.inputEnabled()) return;
      const sens = 0.0022 * settings.sensitivity * (this.char.ads ? Math.max(0.25, this.fov / settings.fov) : 1);
      this.yaw -= e.movementX * sens;
      this.pitch -= e.movementY * sens * (settings.invertY ? -1 : 1);
      this.pitch = clamp(this.pitch, -1.45, 1.35);
    });
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.game.inputEnabled()) return;
      if (!this.locked) { this.requestLock(); }
      if (!this.char) return;
      if (e.button === 0) { this.mouseDown = true; this.char.input.firePressed = true; }
      if (e.button === 2) this.rmbDown = true;
    });
    d.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseDown = false;
      if (e.button === 2) this.rmbDown = false;
    });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    d.addEventListener('wheel', (e) => {
      if (!this.game.inputEnabled()) return;
      this.wheelAcc += e.deltaY;
      if (Math.abs(this.wheelAcc) > 40) {
        if (this.char.alive && this.char.mode === 'normal') this.char.cycle(this.wheelAcc > 0 ? 1 : -1);
        this.wheelAcc = 0;
      }
    }, { passive: true });
    d.addEventListener('pointerlockchange', () => {
      this.locked = d.pointerLockElement === this.canvas;
      if (this.locked) { this.fallbackLook = false; this.canvas.style.cursor = ''; }
      if (!this.locked) this.game.onLockLost();
    });
    window.addEventListener('blur', () => { this.keys.clear(); this.mouseDown = false; this.rmbDown = false; });
  }

  requestLock() {
    const fail = () => {
      if (this.fallbackLook) return;
      this.fallbackLook = true;
      this.canvas.style.cursor = 'crosshair';
      this.game.hud?.toast('Pointer lock unavailable: move the mouse to look (arrow keys also turn)');
    };
    try {
      const p = this.canvas.requestPointerLock?.();
      if (!this.canvas.requestPointerLock) fail();
      else if (p && p.then) p.then(() => {}, fail);
    } catch { fail(); }
    clearTimeout(this.lockTimer);
    this.lockTimer = setTimeout(() => { if (!this.locked && this.game.inputEnabled()) fail(); }, 700);
  }

  onKey(e, down) {
    const code = e.code;
    if (down && this.game.inputEnabled() && ['Space', 'ArrowUp', 'ArrowDown', 'Tab'].includes(code)) e.preventDefault();
    if (down) this.keys.add(code); else this.keys.delete(code);
    if (!down) {
      if (code === 'KeyE') this.interactHeld = false;
      return;
    }
    if (e.repeat) return;
    const g = this.game;
    if (code === 'Escape') { g.togglePause(); return; }
    if (!g.inputEnabled()) return;
    const ch = this.char;
    if (!ch) return;
    if (code === 'KeyM' || code === 'Tab') { g.hud.toggleMap(); return; }
    if (code === 'KeyX') this.shoulder *= -1;
    if (code === 'F3') settings.showFps = !settings.showFps;
    if (!ch.alive) {
      if (code === 'KeyE' || code === 'ArrowRight' || code === 'KeyD') this.cycleSpectate(1);
      if (code === 'KeyQ' || code === 'ArrowLeft' || code === 'KeyA') this.cycleSpectate(-1);
      return;
    }
    if (ch.mode === 'bus') {
      if (code === 'Space') g.jumpFromBus(ch);
      return;
    }
    if (code === 'Space') ch.input.jumpPressed = true;
    if (ch.mode !== 'normal') return;
    if (code.startsWith('Digit')) {
      const n = parseInt(code.slice(5), 10);
      if (n >= 1 && n <= 6) ch.equip(n - 1);
    }
    if (code === 'KeyR') ch.startReload();
    if (code === 'KeyG') ch.dropSelected();
    if (code === 'KeyE') { this.interactHeld = true; this.tryInteract(true); }
    if (code === 'KeyQ') { ch.equip(ch.inv.lastSel); }
  }

  // ---- interaction ----------------------------------------------------------------------------------------------------------------------------
  findTarget() {
    const ch = this.char;
    const loot = this.game.loot;
    let best = null, bd = 1e9;
    const list = loot.nearbyDrops(ch.pos.x, ch.pos.z, 2.9, []);
    for (const d of list) {
      if (Math.abs(d.pos.y - ch.pos.y) > 2.4 || !loot.canTake(ch, d) || !d.settled) continue;
      const dd = Math.hypot(d.pos.x - ch.pos.x, d.pos.z - ch.pos.z);
      if (dd < bd) { bd = dd; best = { type: 'drop', d }; }
    }
    const chest = loot.nearestChest(ch.pos.x, ch.pos.z, 2.6, ch.pos.y);
    if (chest) {
      const cd = Math.hypot(chest.x - ch.pos.x, chest.z - ch.pos.z);
      if (cd < bd + 0.6) best = { type: 'chest', c: chest };
    }
    return best;
  }

  tryInteract(press) {
    const t = this.target;
    if (!t) return;
    if (t.type === 'drop' && press) this.game.loot.take(this.char, t.d);
  }

  // ---- per-frame ----------------------------------------------------------------------------------------------------------------------------------
  update(dt) {
    const g = this.game, ch = this.char;
    if (!ch) return;
    const inp = ch.input;
    const enabled = g.inputEnabled();
    const k = this.keys;
    const dead = !ch.alive;

    if (enabled && !dead) {
      inp.fwd = (k.has('KeyW') ? 1 : 0) - (k.has('KeyS') ? 1 : 0);
      inp.strafe = (k.has('KeyD') ? 1 : 0) - (k.has('KeyA') ? 1 : 0);
      inp.jump = k.has('Space');
      inp.sprint = k.has('ShiftLeft') || k.has('ShiftRight');
      inp.crouch = k.has('KeyC') || k.has('ControlLeft');
      inp.fire = this.mouseDown;
      inp.ads = this.rmbDown;
    } else if (!dead) {
      inp.fwd = inp.strafe = 0;
      inp.jump = inp.sprint = inp.crouch = inp.fire = inp.ads = false;
    }

    if (enabled) {
      const turn = (k.has('ArrowLeft') ? 1 : 0) - (k.has('ArrowRight') ? 1 : 0);
      const tilt = (k.has('ArrowUp') ? 1 : 0) - (k.has('ArrowDown') ? 1 : 0);
      if (turn || tilt) {
        const sens = 1.9 * settings.sensitivity * dt;
        this.yaw += turn * sens;
        this.pitch = clamp(this.pitch + tilt * sens * 0.7, -1.45, 1.35);
      }
    }
    if (!dead && ch.mode !== 'bus') {
      ch.yaw = this.yaw;
      ch.pitch = this.pitch;
    }

    // recoil kick
    if (ch.recoil > this.lastRecoil + 0.001) {
      const kick = (ch.recoil - this.lastRecoil) * 0.0125;
      this.pitch = clamp(this.pitch + kick, -1.45, 1.35);
      this.yaw += (Math.random() - 0.5) * kick * 0.8;
    }
    this.lastRecoil = ch.recoil;

    // interaction
    if (!dead && ch.mode === 'normal' && enabled) {
      this.target = this.findTarget();
      const t = this.target;
      if (t && t.type === 'chest' && this.keys.has('KeyE')) {
        const opened = g.loot.work(t.c, ch, dt);
        if (opened) this.target = null;
      }
      // auto-pickup ammo
      this.autoPickT -= dt;
      if (this.autoPickT <= 0) {
        this.autoPickT = 0.12;
        for (const d of g.loot.nearbyDrops(ch.pos.x, ch.pos.z, 1.5, [])) {
          if (d.ammo && d.settled && Math.abs(d.pos.y - ch.pos.y) < 2 && g.loot.canTake(ch, d)) g.loot.take(ch, d);
        }
      }
    } else this.target = null;
    g.hud.setPrompt(this.target, this.char, this.target?.type === 'chest' ? (this.target.c.progress / CHEST_OPEN_TIME) : 0);

    this.updateCamera(dt);
  }

  cycleSpectate(dir) {
    const alive = this.game.chars.filter((c) => c.alive && c !== this.char && c.mode !== 'bus');
    if (!alive.length) return;
    const cur = alive.indexOf(this.spectate.target);
    this.spectate.target = alive[(cur + dir + alive.length * 2) % alive.length];
  }

  updateCamera(dt) {
    const g = this.game, ch = this.char, cam = g.camera, w = g.world;
    const target = this.cameraTarget();
    let dist = 3.2, offset = 0.85 * this.shoulder, height = ch.crouching ? 1.2 : 1.6;
    let fovT = settings.fov;
    this.scoped = false;
    let pivot;

    if (ch.mode === 'bus' && ch.alive) {
      pivot = _c.copy(g.bus.pos).add(_v.set(0, 8, 0));
      dist = 48; offset = 0; height = 0;
    } else if (!ch.alive) {
      const t = this.spectate.target && this.spectate.target.alive ? this.spectate.target : null;
      if (!t) { this.cycleSpectate(1); }
      const tt = this.spectate.target;
      if (tt && tt.alive) { pivot = _c.set(tt.pos.x, tt.pos.y + 1.5, tt.pos.z); } else pivot = _c.set(ch.pos.x, ch.pos.y + 1.5, ch.pos.z);
      dist = 5.5; offset = 0; height = 0;
    } else if (ch.mode === 'skydive' || ch.mode === 'glide') {
      pivot = _c.set(ch.pos.x, ch.pos.y + 1.0, ch.pos.z);
      dist = ch.mode === 'skydive' ? 7.5 : 8.5; offset = 0; height = 0;
      if (ch.mode === 'skydive' && ch.input.fwd > 0.3) fovT += 14;
    } else {
      pivot = _c.set(ch.pos.x, ch.pos.y + height, ch.pos.z);
      const st = ch.stack;
      if (ch.ads && st?.def.kind === 'gun') {
        const z = st.def.zoom;
        fovT = settings.fov * z;
        if (z < 0.4) this.scoped = true; // sniper scope
        else { dist = 1.5; offset = 0.42 * this.shoulder; }
      } else if (ch.sprinting) fovT += 7;
      if (ch.swimming) height = 0.9;
    }
    this.fov = damp(this.fov, fovT, 12, dt);

    // look direction
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    _f.set(-Math.sin(this.yaw) * cp, sp, -Math.cos(this.yaw) * cp); // forward
    _r.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    if (this.scoped) {
      // first person through the scope
      ch.eyePos(_v);
      cam.position.copy(_v).addScaledVector(_f, 0.25);
      ch.root.visible = false;
    } else {
      const want = _v.copy(pivot).addScaledVector(_r, offset).addScaledVector(_f, -dist);
      // collision: pull the camera in front of walls
      const dx = want.x - pivot.x, dy = want.y - pivot.y, dz = want.z - pivot.z;
      const len = Math.hypot(dx, dy, dz);
      let use = len;
      if (len > 0.01) {
        const t = w.collision.raycast(pivot.x, pivot.y, pivot.z, dx / len, dy / len, dz / len, len + 0.3, _hit);
        if (t >= 0) use = Math.max(0.4, t - 0.3);
      }
      // keep above terrain
      const f = use / Math.max(len, 0.001);
      this.camDist = use < this.camDist ? use : damp(this.camDist, use, 10, dt);
      const k = this.camDist / Math.max(len, 0.001);
      cam.position.set(pivot.x + dx * k, pivot.y + dy * k, pivot.z + dz * k);
      void f;
      const th = w.terrain.height(cam.position.x, cam.position.z);
      if (cam.position.y < th + 0.4) cam.position.y = th + 0.4;
      if (ch.alive && ch.mode !== 'bus') ch.root.visible = ch.mode !== 'bus';
    }
    // shake
    const sh = g.shakeAmount;
    if (sh > 0.001) {
      cam.position.x += (Math.random() - 0.5) * sh;
      cam.position.y += (Math.random() - 0.5) * sh;
      cam.position.z += (Math.random() - 0.5) * sh;
    }
    // aim target a bit beyond so the crosshair lines up
    _v.copy(cam.position).addScaledVector(_f, 50);
    cam.lookAt(_v);
    if (Math.abs(cam.fov - this.fov) > 0.05) { cam.fov = this.fov; cam.updateProjectionMatrix(); }

    // aim ray for the character
    if (ch.alive && ch.mode === 'normal') {
      ch.eyePos(_v);
      const along = Math.max(0.1, _r.set(_v.x - cam.position.x, _v.y - cam.position.y, _v.z - cam.position.z).dot(_f));
      ch.aimOrigin.copy(cam.position).addScaledVector(_f, along);
      ch.aimDir.copy(_f);
    }
    g.audio.setListener(cam.position.x, cam.position.y, cam.position.z, this.yaw);
    void target;
  }

  cameraTarget() { return null; }
}
