import * as THREE from 'three';

// ---------------------------------------------------------------------------
// GPU point-sprite particles (one draw call each for additive + alpha blended)
// ---------------------------------------------------------------------------
const vert = /* glsl */ `
  attribute float aSize; attribute float aAlpha; attribute vec3 aColor;
  uniform float uScale;
  varying float vAlpha; varying vec3 vColor;
  void main() {
    vAlpha = aAlpha; vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.1), 0.0, 256.0);
  }
`;
const frag = /* glsl */ `
  uniform sampler2D uMap;
  varying float vAlpha; varying vec3 vColor;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor, vAlpha * t.a);
    if (gl_FragColor.a < 0.01) discard;
  }
`;

class Particles {
  constructor(max, texture, additive) {
    this.max = max;
    this.count = 0;
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 3);
    this.size = new Float32Array(max);
    this.alpha = new Float32Array(max);
    this.vel = new Float32Array(max * 3);
    this.life = new Float32Array(max);
    this.maxLife = new Float32Array(max);
    this.s0 = new Float32Array(max);
    this.s1 = new Float32Array(max);
    this.a0 = new Float32Array(max);
    this.grav = new Float32Array(max);
    this.drag = new Float32Array(max);
    this.c0 = new Float32Array(max * 3);
    this.c1 = new Float32Array(max * 3);
    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.uniforms = { uMap: { value: texture }, uScale: { value: 600 } };
    this.mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, uniforms: this.uniforms, transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, fog: false,
    });
    this.points = new THREE.Points(this.geo, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 6 : 5;
  }

  emit(x, y, z, vx, vy, vz, life, s0, s1, c0, c1, a0 = 1, grav = 0, drag = 0) {
    let i = this.count;
    if (i >= this.max) i = Math.floor(Math.random() * this.max); // overwrite a random one
    else this.count++;
    const k3 = i * 3;
    this.pos[k3] = x; this.pos[k3 + 1] = y; this.pos[k3 + 2] = z;
    this.vel[k3] = vx; this.vel[k3 + 1] = vy; this.vel[k3 + 2] = vz;
    this.life[i] = life; this.maxLife[i] = life;
    this.s0[i] = s0; this.s1[i] = s1; this.a0[i] = a0;
    this.grav[i] = grav; this.drag[i] = drag;
    this.c0[k3] = c0[0]; this.c0[k3 + 1] = c0[1]; this.c0[k3 + 2] = c0[2];
    this.c1[k3] = c1[0]; this.c1[k3 + 1] = c1[1]; this.c1[k3 + 2] = c1[2];
    this.size[i] = s0; this.alpha[i] = a0;
  }

  update(dt) {
    let i = 0;
    while (i < this.count) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        // swap-remove
        const last = --this.count;
        if (i !== last) this._copy(last, i);
        continue;
      }
      const k3 = i * 3;
      const t = 1 - this.life[i] / this.maxLife[i];
      const d = Math.max(0, 1 - this.drag[i] * dt);
      this.vel[k3] *= d; this.vel[k3 + 2] *= d; this.vel[k3 + 1] = this.vel[k3 + 1] * d - this.grav[i] * dt;
      this.pos[k3] += this.vel[k3] * dt;
      this.pos[k3 + 1] += this.vel[k3 + 1] * dt;
      this.pos[k3 + 2] += this.vel[k3 + 2] * dt;
      this.size[i] = this.s0[i] + (this.s1[i] - this.s0[i]) * t;
      this.alpha[i] = this.a0[i] * (1 - t * t);
      this.col[k3] = this.c0[k3] + (this.c1[k3] - this.c0[k3]) * t;
      this.col[k3 + 1] = this.c0[k3 + 1] + (this.c1[k3 + 1] - this.c0[k3 + 1]) * t;
      this.col[k3 + 2] = this.c0[k3 + 2] + (this.c1[k3 + 2] - this.c0[k3 + 2]) * t;
      i++;
    }
    this.geo.setDrawRange(0, this.count);
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aColor.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;
  }

  _copy(from, to) {
    for (const a of [this.pos, this.vel, this.col, this.c0, this.c1]) {
      a[to * 3] = a[from * 3]; a[to * 3 + 1] = a[from * 3 + 1]; a[to * 3 + 2] = a[from * 3 + 2];
    }
    for (const a of [this.life, this.maxLife, this.s0, this.s1, this.a0, this.grav, this.drag, this.size, this.alpha]) a[to] = a[from];
  }
}

const rgb = (hex) => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
const C = {
  spark: rgb(0xffd27a), sparkEnd: rgb(0xff5a1a), smoke: rgb(0x8a8a8a), smokeEnd: rgb(0x4a4a4a), dust: rgb(0xb59a70), dustEnd: rgb(0x8a7452),
  fire: rgb(0xffb02a), fireEnd: rgb(0xc82a0a), white: rgb(0xffffff), green: rgb(0x6dff6a), cyan: rgb(0x5fe8ff), orange: rgb(0xff9a2a), purple: rgb(0xc77aff),
  heal: rgb(0x8dff9a), shield: rgb(0x6aaaff), dirt: rgb(0x6b5339), dirtEnd: rgb(0x4a3a28), chip: rgb(0x9aa0a8), chipEnd: rgb(0x6a7078), snow: rgb(0xeaf4ff), snowEnd: rgb(0xc8d8e8),
  brass: new THREE.Color(0xd8b050), shellRed: new THREE.Color(0xc8362b),
};
const _dummy = new THREE.Object3D();
const _r = new THREE.Vector3();

export class FX {
  constructor(scene, textures, game) {
    this.game = game;
    this.add = new Particles(2600, textures.particle, true);
    this.alpha = new Particles(1600, textures.particle, false);
    scene.add(this.add.points, this.alpha.points);
    this.quality = 1;

    // tracers
    this.tracers = [];
    this.tracerMat = new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    this.tracerGeo = new THREE.BoxGeometry(0.035, 0.035, 1);
    this.tracerPool = [];
    this.scene = scene;
    for (let i = 0; i < 40; i++) {
      const m = new THREE.Mesh(this.tracerGeo, this.tracerMat.clone());
      m.visible = false;
      m.frustumCulled = false;
      m.renderOrder = 7;
      scene.add(m);
      this.tracerPool.push(m);
    }
    this._v = new THREE.Vector3();
    this.shake = 0;

    // ejected shell casings: one instanced mesh, simple bouncing physics
    const SHELLS = 36;
    this.shellMax = SHELLS;
    this.shells = [];
    this.shellGeo = new THREE.CylinderGeometry(0.0055, 0.0055, 0.036, 6).rotateZ(Math.PI / 2);
    this.shellMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.65, roughness: 0.38 });
    this.shellMesh = new THREE.InstancedMesh(this.shellGeo, this.shellMat, SHELLS);
    this.shellMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < SHELLS; i++) this.shellMesh.setColorAt(i, C.brass);
    this.shellMesh.count = 0;
    this.shellMesh.frustumCulled = false;
    scene.add(this.shellMesh);
  }

  /** Clear everything that lives on after a match (particles, tracers, casings). */
  reset() {
    this.add.count = 0;
    this.alpha.count = 0;
    for (const t of this.tracers) { t.mesh.visible = false; this.tracerPool.push(t.mesh); }
    this.tracers.length = 0;
    this.shells.length = 0;
    this.shellMesh.count = 0;
  }

  setQuality(q) { this.quality = q; }

  update(dt, camera, renderer) {
    const h = renderer.domElement.height;
    const scale = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
    this.add.uniforms.uScale.value = scale;
    this.alpha.uniforms.uScale.value = scale;
    this.add.update(dt);
    this.alpha.update(dt);
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.t += dt;
      const head = Math.min(t.dist, t.t * t.speed);
      const tail = Math.max(0, head - t.len);
      if (tail >= t.dist - 0.01 || t.t > 2) {
        t.mesh.visible = false;
        this.tracerPool.push(t.mesh);
        this.tracers.splice(i, 1);
        continue;
      }
      const l = head - tail;
      t.mesh.scale.z = Math.max(l, 0.01);
      const mid = (head + tail) / 2;
      t.mesh.position.set(t.ax + t.dx * mid, t.ay + t.dy * mid, t.az + t.dz * mid);
    }
    this.shake = Math.max(0, this.shake - dt * 2.2);
    if (this.shells.length) this.updateShells(dt);
  }

  updateShells(dt) {
    const col = this.game.world.collision;
    const S = this.shells;
    for (let i = S.length - 1; i >= 0; i--) {
      const s = S[i];
      s.life -= dt;
      if (s.life <= 0) { S[i] = S[S.length - 1]; S.pop(); continue; }
      if (!s.rest) {
        s.vy -= 14 * dt;
        s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
        s.rx += s.wx * dt; s.ry += s.wy * dt; s.rz += s.wz * dt;
        const gy = col.groundAt(s.x, s.z, s.y + 0.4, 0.5) + 0.006;
        if (s.y <= gy && s.vy < 0) {
          s.y = gy;
          if (s.vy < -1.2) { s.vy *= -0.38; s.vx *= 0.55; s.vz *= 0.55; s.wx *= 0.5; s.wy *= 0.5; s.wz *= 0.5; } else { s.rest = true; s.rx = 0; s.rz = 0; }
        }
      }
    }
    // write the instance matrices (the array was compacted above)
    for (let i = 0; i < S.length; i++) {
      const s = S[i];
      _dummy.position.set(s.x, s.y, s.z);
      _dummy.rotation.set(s.rx, s.ry, s.rz);
      _dummy.scale.setScalar(Math.min(1, s.life / 0.4));
      _dummy.updateMatrix();
      this.shellMesh.setMatrixAt(i, _dummy.matrix);
      this.shellMesh.setColorAt(i, s.red ? C.shellRed : C.brass);
    }
    this.shellMesh.count = S.length;
    this.shellMesh.instanceMatrix.needsUpdate = true;
    if (this.shellMesh.instanceColor) this.shellMesh.instanceColor.needsUpdate = true;
  }

  /** Eject a casing from the weapon's ejection port (world position p), thrown to the right of the aim direction. */
  shell(p, dir, red = false, vel = null) {
    if (this.quality < 0.5) return;
    if (this.shells.length >= this.shellMax) this.shells.shift();
    _r.set(-dir.z, 0, dir.x).normalize(); // right of the aim direction
    const sp = 1.6 + Math.random() * 1.4;
    this.shells.push({
      x: p.x, y: p.y, z: p.z,
      vx: _r.x * sp + dir.x * (Math.random() - 0.3) + (vel ? vel.x * 0.5 : 0), vy: 1.6 + Math.random() * 1.6, vz: _r.z * sp + dir.z * (Math.random() - 0.3) + (vel ? vel.z * 0.5 : 0),
      rx: Math.random() * 6, ry: Math.random() * 6, rz: Math.random() * 6, wx: (Math.random() - 0.5) * 40, wy: (Math.random() - 0.5) * 40, wz: (Math.random() - 0.5) * 40,
      life: 3.2 + Math.random(), rest: false, red,
    });
  }

  tracer(a, b, color = 0xffe9a8, width = 1, speed = 380) {
    const m = this.tracerPool.pop();
    if (!m) return;
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
    const dist = Math.hypot(dx, dy, dz);
    if (dist < 0.5) { this.tracerPool.push(m); return; }
    const nx = dx / dist, ny = dy / dist, nz = dz / dist;
    m.visible = true;
    m.material.color.setHex(color);
    m.scale.set(width, width, 1);
    m.position.copy(a);
    m.lookAt(b.x, b.y, b.z);
    this.tracers.push({ mesh: m, t: 0, ax: a.x, ay: a.y, az: a.z, dx: nx, dy: ny, dz: nz, dist, speed, len: Math.min(9, dist) });
  }

  // ---- recipes -----------------------------------------------------------------------------------------
  impact(p, n, kind = 'rock') {
    const q = this.quality;
    const terrain = kind === 'terrain';
    const cnt = Math.round(5 * q);
    if (!terrain) {
      for (let i = 0; i < cnt; i++) {
        const sp = 2 + Math.random() * 4;
        this.add.emit(p.x, p.y, p.z, n.x * sp + (Math.random() - 0.5) * 3, n.y * sp + Math.random() * 2, n.z * sp + (Math.random() - 0.5) * 3, 0.25 + Math.random() * 0.25, 0.12, 0.02, C.spark, C.sparkEnd, 1, 9, 0.5);
      }
      this.add.emit(p.x + n.x * 0.05, p.y + n.y * 0.05, p.z + n.z * 0.05, 0, 0, 0, 0.06, 0.45, 0.1, C.white, C.fire, 0.9, 0, 0); // flash
    }
    // chips thrown off the surface (grey for stone / walls, brown for dirt)
    const chips = Math.round((terrain ? 5 : 3) * q);
    for (let i = 0; i < chips; i++) {
      const sp = 1.5 + Math.random() * 3.5;
      this.alpha.emit(p.x, p.y, p.z, n.x * sp + (Math.random() - 0.5) * 2.5, n.y * sp + 1 + Math.random() * 2, n.z * sp + (Math.random() - 0.5) * 2.5, 0.5 + Math.random() * 0.3, 0.09, 0.05, terrain ? C.dirt : C.chip, terrain ? C.dirtEnd : C.chipEnd, 0.95, 16, 0.3);
    }
    this.alpha.emit(p.x, p.y, p.z, n.x * 0.8, n.y * 0.8 + 0.3, n.z * 0.8, 0.55, 0.25, 0.95, terrain ? C.dust : C.smoke, terrain ? C.dustEnd : C.smokeEnd, 0.5, -0.5, 1);
  }

  hit(p) {
    for (let i = 0; i < 6 * this.quality; i++) {
      this.add.emit(p.x, p.y, p.z, (Math.random() - 0.5) * 4, Math.random() * 3, (Math.random() - 0.5) * 4, 0.3, 0.16, 0.02, C.white, C.orange, 1, 6, 0.4);
    }
  }

  muzzle(p, dir, big = 1, cat = null) {
    const q = this.quality;
    for (let i = 0; i < 3; i++) {
      this.add.emit(p.x, p.y, p.z, dir.x * 8 + (Math.random() - 0.5) * 2, dir.y * 8 + (Math.random() - 0.5) * 2, dir.z * 8 + (Math.random() - 0.5) * 2, 0.07, 0.3 * big, 0.05, C.spark, C.fire, 1, 0, 1);
    }
    if (q < 0.5) return;
    // a lingering wisp of gun smoke (more for the big weapons)
    const wisp = cat === 'sniper' || cat === 'shotgun' || cat === 'launcher' || cat === 'lmg' ? 2 : Math.random() < 0.5 ? 1 : 0;
    for (let i = 0; i < wisp; i++) {
      this.alpha.emit(p.x + dir.x * 0.15, p.y + dir.y * 0.15, p.z + dir.z * 0.15, dir.x * 1.6 + (Math.random() - 0.5) * 0.5, 0.5 + Math.random() * 0.4, dir.z * 1.6 + (Math.random() - 0.5) * 0.5, 0.8, 0.1 * big, 0.5 * big, C.smoke, C.smokeEnd, 0.26, -0.15, 1.6);
    }
    if (cat === 'shotgun') {
      // the fireball of a shotgun blast
      this.add.emit(p.x + dir.x * 0.25, p.y + dir.y * 0.25, p.z + dir.z * 0.25, dir.x * 3, dir.y * 3, dir.z * 3, 0.1, 0.5, 0.9, C.fire, C.fireEnd, 0.9, 0, 3);
    } else if (cat === 'sniper') {
      for (let i = 0; i < 4; i++) this.add.emit(p.x, p.y, p.z, dir.x * (14 + i * 6), dir.y * (14 + i * 6), dir.z * (14 + i * 6), 0.09, 0.28, 0.04, C.white, C.fire, 1, 0, 2);
    } else if (cat === 'launcher') {
      // back-blast: a burst of smoke and fire behind the tube
      for (let i = 0; i < 8; i++) {
        const sp = 3 + Math.random() * 5;
        this.alpha.emit(p.x - dir.x * 1.4, p.y - dir.y * 1.4, p.z - dir.z * 1.4, -dir.x * sp + (Math.random() - 0.5) * 3, (Math.random() - 0.3) * 2, -dir.z * sp + (Math.random() - 0.5) * 3, 0.9, 0.3, 1.2, C.smoke, C.smokeEnd, 0.4, -0.2, 2);
      }
      this.add.emit(p.x - dir.x * 1.3, p.y - dir.y * 1.3, p.z - dir.z * 1.3, -dir.x * 4, -dir.y * 4, -dir.z * 4, 0.14, 0.7, 0.2, C.fire, C.fireEnd, 1, 0, 2);
    }
  }

  explosion(p, radius = 5, kind = 'fire') {
    const q = this.quality;
    const col = kind === 'impulse' ? [C.cyan, C.white] : kind === 'boogie' ? [C.purple, C.white] : [C.fire, C.fireEnd];
    const n = Math.round((16 + radius * 3) * q);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, e = (Math.random() - 0.3) * 1.6, sp = (0.4 + Math.random()) * radius * 1.4;
      this.add.emit(p.x, p.y + 0.3, p.z, Math.cos(a) * Math.cos(e) * sp, Math.sin(e) * sp + 1, Math.sin(a) * Math.cos(e) * sp, 0.45 + Math.random() * 0.4, radius * 0.45, radius * 0.9, col[0], col[1], 0.95, -1, 3);
    }
    if (kind === 'fire') {
      this.add.emit(p.x, p.y + 0.6, p.z, 0, 0, 0, 0.16, radius * 1.1, radius * 2.6, C.white, C.fire, 1, 0, 0); // core flash
      const ring = Math.round(22 * q);
      for (let i = 0; i < ring; i++) { // ground shock wave
        const a = (i / ring) * 6.283 + Math.random() * 0.3;
        this.alpha.emit(p.x + Math.cos(a) * 0.6, p.y + 0.25, p.z + Math.sin(a) * 0.6, Math.cos(a) * radius * 3.2, 0.2, Math.sin(a) * radius * 3.2, 0.5, 0.9, 2.8, C.dust, C.dustEnd, 0.55, 0, 4.5);
      }
      for (let i = 0; i < Math.round(10 * q); i++) { // debris
        const a = Math.random() * 6.283, sp = 4 + Math.random() * radius * 1.4;
        this.alpha.emit(p.x, p.y + 0.4, p.z, Math.cos(a) * sp, 5 + Math.random() * 9, Math.sin(a) * sp, 0.9 + Math.random() * 0.5, 0.22, 0.14, C.dirt, C.dirtEnd, 1, 20, 0.2);
      }
      for (let i = 0; i < Math.round(12 * q); i++) {
        const a = Math.random() * 6.283, sp = Math.random() * radius * 0.8;
        this.alpha.emit(p.x + Math.cos(a) * 1.2, p.y + 0.6, p.z + Math.sin(a) * 1.2, Math.cos(a) * sp * 0.5, 1.5 + Math.random() * 3, Math.sin(a) * sp * 0.5, 1.4 + Math.random() * 1.2, radius * 0.5, radius * 1.4, C.smoke, C.smokeEnd, 0.6, -1.4, 1.2);
      }
      for (let i = 0; i < Math.round(24 * q); i++) {
        const sp = 6 + Math.random() * 14;
        const a = Math.random() * 6.283, e = Math.random() * 1.2;
        this.add.emit(p.x, p.y + 0.5, p.z, Math.cos(a) * Math.cos(e) * sp, Math.sin(e) * sp, Math.sin(a) * Math.cos(e) * sp, 0.6 + Math.random() * 0.5, 0.2, 0.03, C.spark, C.sparkEnd, 1, 14, 0.2);
      }
    } else {
      // expanding ring
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * 6.283;
        this.add.emit(p.x, p.y + 0.3, p.z, Math.cos(a) * radius * 2.2, 0.5, Math.sin(a) * radius * 2.2, 0.4, 0.8, 1.6, col[1], col[0], 0.9, 0, 2.5);
      }
    }
  }

  smokeTrail(p) {
    this.alpha.emit(p.x, p.y, p.z, (Math.random() - 0.5) * 0.4, 0.2, (Math.random() - 0.5) * 0.4, 0.9, 0.35, 1.1, C.smoke, C.smokeEnd, 0.5, 0, 1);
    this.add.emit(p.x, p.y, p.z, 0, 0, 0, 0.12, 0.45, 0.1, C.fire, C.fireEnd, 1, 0, 0);
  }

  heal(p, color = 'heal') {
    const c = color === 'shield' ? C.shield : color === 'speed' ? C.green : C.heal;
    for (let i = 0; i < 2; i++) {
      this.add.emit(p.x + (Math.random() - 0.5) * 0.7, p.y + 0.1, p.z + (Math.random() - 0.5) * 0.7, 0, 1.4 + Math.random(), 0, 0.9, 0.22, 0.04, c, C.white, 0.9, 0, 0.5);
    }
  }

  teleport(p, color = 'orange') {
    const c = color === 'orange' ? C.orange : C.cyan;
    for (let i = 0; i < 26 * this.quality; i++) {
      const a = Math.random() * 6.283, r = Math.random() * 0.8;
      this.add.emit(p.x + Math.cos(a) * r, p.y + Math.random() * 1.8, p.z + Math.sin(a) * r, 0, 1 + Math.random() * 3, 0, 0.7, 0.35, 0.05, c, C.white, 1, 0, 0.6);
    }
  }

  dust(p, amount = 8) {
    for (let i = 0; i < amount * this.quality; i++) {
      const a = Math.random() * 6.283, sp = 1 + Math.random() * 2.5;
      this.alpha.emit(p.x, p.y + 0.1, p.z, Math.cos(a) * sp, 0.6, Math.sin(a) * sp, 0.6, 0.35, 1.0, C.dust, C.dustEnd, 0.5, -0.3, 2);
    }
  }

  splash(p, amount = 10) {
    for (let i = 0; i < amount * this.quality; i++) {
      const a = Math.random() * 6.283, sp = 1 + Math.random() * 3;
      this.alpha.emit(p.x, p.y, p.z, Math.cos(a) * sp, 2 + Math.random() * 3, Math.sin(a) * sp, 0.7, 0.25, 0.1, C.white, C.cyan, 0.8, 11, 0.5);
    }
  }

  chestOpen(p) {
    for (let i = 0; i < 30 * this.quality; i++) {
      const a = Math.random() * 6.283, sp = 1 + Math.random() * 3;
      this.add.emit(p.x, p.y + 0.5, p.z, Math.cos(a) * sp, 2 + Math.random() * 4, Math.sin(a) * sp, 0.9, 0.25, 0.04, [1, 0.85, 0.3], C.white, 1, 6, 0.4);
    }
  }

  /** A little burst of sparkles where a picked-up item reaches the player. */
  pickup(p, hex) {
    const c = rgb(hex);
    for (let i = 0; i < 7 * this.quality; i++) {
      const a = Math.random() * 6.283, sp = 0.8 + Math.random() * 1.6;
      this.add.emit(p.x, p.y, p.z, Math.cos(a) * sp, 0.6 + Math.random() * 1.4, Math.sin(a) * sp, 0.4 + Math.random() * 0.2, 0.2, 0.03, c, C.white, 1, 3, 1);
    }
  }

  /** Cyan afterimage streaks behind a character with the Runana boost. */
  runTrail(pos, vel, dt) {
    const n = Math.random() < dt * 90 * this.quality ? 2 : 0;
    for (let i = 0; i < n; i++) {
      this.add.emit(pos.x + (Math.random() - 0.5) * 0.5, pos.y + 0.15 + Math.random() * 1.5, pos.z + (Math.random() - 0.5) * 0.5, -vel.x * 0.35, (Math.random() - 0.2) * 0.4, -vel.z * 0.35, 0.38, 0.3, 0.04, C.cyan, C.white, 0.85, 0, 1.2);
    }
  }

  /** A small puff of dust / snow under a running character's foot. */
  footstep(p, kind = 'dirt') {
    if (this.quality < 0.5) return;
    const snow = kind === 'snow';
    for (let i = 0; i < 2; i++) {
      const a = Math.random() * 6.283;
      this.alpha.emit(p.x + Math.cos(a) * 0.15, p.y + 0.05, p.z + Math.sin(a) * 0.15, Math.cos(a) * 0.6, 0.5 + Math.random() * 0.3, Math.sin(a) * 0.6, 0.45, 0.14, 0.5, snow ? C.snow : C.dust, snow ? C.snowEnd : C.dustEnd, 0.38, -0.4, 1.5);
    }
  }

  /** Dust ring when someone lands hard; the ring grows with the impact speed. */
  landing(p, speed) {
    const q = this.quality;
    const n = Math.round((6 + Math.min(speed, 40) * 0.5) * q);
    const r = 1.2 + Math.min(speed, 40) * 0.08;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283 + Math.random() * 0.4;
      this.alpha.emit(p.x + Math.cos(a) * 0.3, p.y + 0.1, p.z + Math.sin(a) * 0.3, Math.cos(a) * r * 2, 0.5, Math.sin(a) * r * 2, 0.55, 0.3, 0.9 + r * 0.25, C.dust, C.dustEnd, 0.5, -0.3, 3.2);
    }
  }
}
