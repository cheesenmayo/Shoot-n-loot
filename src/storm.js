import * as THREE from 'three';
import { WORLD } from './world/terrain.js';
import { lerp, smoothstep } from './util.js';

// Each phase: hold (safe zone visible, nothing happens), then shrink to `r`.
const PHASES = [
  { wait: 100, shrink: 70, r: 640, dmg: 1 },
  { wait: 65, shrink: 55, r: 400, dmg: 1.5 },
  { wait: 55, shrink: 50, r: 250, dmg: 3 },
  { wait: 42, shrink: 42, r: 140, dmg: 5 },
  { wait: 28, shrink: 35, r: 70, dmg: 8 },
  { wait: 20, shrink: 30, r: 25, dmg: 10 },
  { wait: 14, shrink: 25, r: 0, dmg: 14 },
];

export class Storm {
  constructor(game) {
    this.game = game;
    this.active = false;
    this.cx = 0; this.cz = 0; this.r = 1500;
    this.nx = 0; this.nz = 0; this.nr = 640;
    this.sx = 0; this.sz = 0; this.sr = 1500;
    this.phase = -1;
    this.state = 'idle'; // idle | hold | shrink | done
    this.t = 0;
    this.dmg = 0;

    // visuals: a tall translucent wall + a faint marker for the next circle
    const cv = document.createElement('canvas');
    cv.width = 256; cv.height = 128;
    const ctx = cv.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, 256, 0);
    for (let i = 0; i <= 8; i++) grd.addColorStop(i / 8, i % 2 ? 'rgba(190,90,255,0.95)' : 'rgba(110,40,200,0.55)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 256, 128);
    const tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    this.tex = tex;
    this.wall = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 700, 96, 1, true),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.42, side: THREE.DoubleSide, depthWrite: false, fog: true, blending: THREE.NormalBlending }),
    );
    this.wall.position.y = 200;
    this.wall.renderOrder = 4;
    this.wall.frustumCulled = false;
    this.next = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 500, 96, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x8fd0ff, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, fog: false }),
    );
    this.next.position.y = 150;
    this.next.frustumCulled = false;
    this.next.renderOrder = 4;
    game.scene.add(this.wall, this.next);
    this.wall.visible = this.next.visible = false;
    this.warned = -1;
  }

  start() {
    this.active = true;
    this.phase = -1;
    this.cx = 0; this.cz = 0; this.r = 1500;
    this.sx = 0; this.sz = 0; this.sr = 1500;
    this.nextPhase();
    this.wall.visible = this.next.visible = true;
  }

  stop() {
    this.active = false;
    this.wall.visible = this.next.visible = false;
  }

  nextPhase() {
    this.phase++;
    if (this.phase >= PHASES.length) { this.state = 'done'; return; }
    const ph = PHASES[this.phase];
    this.sx = this.cx; this.sz = this.cz; this.sr = this.r;
    this.nr = ph.r;
    // choose the next centre inside the current circle, on land
    let best = null;
    for (let i = 0; i < 30; i++) {
      const a = Math.random() * Math.PI * 2;
      const maxOff = Math.max(0, this.sr - this.nr) * (this.phase === 0 ? 0.55 : 0.8);
      const d = Math.sqrt(Math.random()) * maxOff;
      const x = this.sx + Math.cos(a) * d, z = this.sz + Math.sin(a) * d;
      const h = this.game.world.terrain.height(x, z);
      if (this.phase === 0 && Math.hypot(x, z) > 300) continue;
      if (h > 2 || i === 29) { best = [x, z]; if (h > 2) break; }
    }
    this.nx = best[0]; this.nz = best[1];
    this.state = 'hold';
    this.t = ph.wait;
    this.dmg = ph.dmg;
    this.game.hud?.stormMessage(this.phase === 0 ? 'The first safe zone has been marked' : 'The safe zone has been updated');
  }

  /** seconds until the current hold/shrink ends */
  get remaining() { return Math.max(0, this.t); }

  update(dt, time) {
    if (!this.active) return;
    const ph = PHASES[this.phase];
    if (this.state === 'hold') {
      this.t -= dt;
      if (this.t <= 0) {
        this.state = 'shrink';
        this.t = ph.shrink;
        this.game.audio.play('storm_warn', null);
        this.game.hud?.stormMessage('The storm is closing in!');
      }
    } else if (this.state === 'shrink') {
      this.t -= dt;
      const k = 1 - Math.max(0, this.t) / ph.shrink;
      const e = k * k * (3 - 2 * k);
      this.cx = lerp(this.sx, this.nx, e); this.cz = lerp(this.sz, this.nz, e); this.r = lerp(this.sr, this.nr, e);
      if (this.t <= 0) { this.cx = this.nx; this.cz = this.nz; this.r = this.nr; this.nextPhase(); }
    }

    // damage
    const dmg = this.state === 'done' ? 14 : PHASES[Math.min(this.phase, PHASES.length - 1)].dmg;
    this.dmg = dmg;
    for (const c of this.game.chars) {
      if (!c.alive || c.mode === 'bus') continue;
      if (!this.inside(c.pos.x, c.pos.z)) {
        c.stormAcc = (c.stormAcc || 0) + dmg * dt;
        if (c.stormAcc >= 1) {
          const n = Math.floor(c.stormAcc);
          c.stormAcc -= n;
          c.takeDamage(n, null, { type: 'storm' });
        }
        c.inStorm = true;
      } else c.inStorm = false;
    }

    // visuals
    const r = Math.max(this.r, 0.5);
    this.wall.scale.set(r, 1, r);
    this.wall.position.x = this.cx; this.wall.position.z = this.cz;
    this.tex.repeat.set(Math.max(2, r / 14), 1);
    this.tex.offset.y = (time * 0.05) % 1;
    this.tex.offset.x = (time * 0.02) % 1;
    const nr = Math.max(this.nr, 0.5);
    this.next.scale.set(nr, 1, nr);
    this.next.position.x = this.nx; this.next.position.z = this.nz;
    this.next.visible = this.state !== 'done' && this.nr > 1;
  }

  inside(x, z) {
    const dx = x - this.cx, dz = z - this.cz;
    return dx * dx + dz * dz <= this.r * this.r;
  }

  /** signed distance to the edge: positive inside */
  edgeDistance(x, z) {
    return this.r - Math.hypot(x - this.cx, z - this.cz);
  }
}
export { PHASES };
