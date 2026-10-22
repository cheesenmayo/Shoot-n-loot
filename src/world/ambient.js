// Ambient life for the island: tumbleweeds in the desert, birds, chimney / campfire smoke, snowfall at Frostpeak,
// pollen in the green areas, blowing desert dust and flickering neon. Everything here is visual only: no colliders,
// its own seeded random streams (so the island layout never changes), and nothing runs far from the camera.
import * as THREE from 'three';
import { DESERT, LAKE, POI_BY_ID } from './poidata.js';
import { mulberry32 } from '../util.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
const _axis = new THREE.Vector3(), _body = new THREE.Matrix4(), _wing = new THREE.Matrix4(), _y = new THREE.Vector3(0, 1, 0), _z = new THREE.Vector3(0, 0, 1);
const _col = new THREE.Color();

const WIND_ANGLE = 0.46; // the wind blows toward +x, a little +z
const SMOKE = [0.62, 0.62, 0.64], SMOKE_END = [0.34, 0.34, 0.37], SOOT = [0.36, 0.36, 0.38], SOOT_END = [0.2, 0.2, 0.22];
const SPARK = [1, 0.72, 0.28], SPARK_END = [1, 0.3, 0.06], SNOW = [0.96, 0.98, 1], POLLEN = [1, 0.96, 0.6], POLLEN_END = [0.75, 1, 0.45], DUST = [0.82, 0.7, 0.5], DUST_END = [0.7, 0.6, 0.45];

/** 1 inside `r0`, fading to 0 at `r1`. */
const zone = (x, z, cx, cz, r0, r1) => {
  const d = Math.hypot(x - cx, z - cz);
  return d <= r0 ? 1 : d >= r1 ? 0 : 1 - (d - r0) / (r1 - r0);
};

/** A spiky tangle of twigs: a jittered low-poly ball whose vertices are displaced consistently (no torn faces). */
function tumbleGeo() {
  const hash = (x, y, z) => { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); };
  const geo = new THREE.IcosahedronGeometry(0.66, 2);
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const k = hash(Math.round(x * 30), Math.round(y * 30), Math.round(z * 30));
    const f = 0.5 + k * 0.8;
    pos.setXYZ(i, x * f, y * f, z * f);
    const c = _col.setHex(k > 0.6 ? 0xc2a872 : k > 0.3 ? 0x9a7d48 : 0x6e5430);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  return geo;
}

export class Ambient {
  constructor(world) {
    this.world = world;
    this.fx = null;
    this.quality = 1;
    this.group = new THREE.Group();
    this.group.name = 'ambient';
    world.scene.add(this.group);
    this.smokeT = 0;
    this.acc = { snow: 0, pollen: 0, dust: 0 };
    this.buildTumbleweeds();
    this.buildBirds();
  }

  /** The particle system lives in Game (created after the world): attach it once it exists. */
  attachFx(fx) { this.fx = fx; }

  setQuality(g) {
    this.quality = g.particles ?? 1;
    this.tw.mesh.count = g.id === 'low' ? 6 : this.tw.data.length;
    this.birds.n = g.id === 'low' ? 5 : this.birds.data.length;
  }

  // ---- tumbleweeds ----------------------------------------------------------------------------------------------------------
  buildTumbleweeds() {
    const rng = mulberry32(7781);
    const N = 14;
    const mesh = new THREE.InstancedMesh(tumbleGeo(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }), N);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    mesh.castShadow = true;
    mesh.visible = false;
    this.group.add(mesh);
    const data = [];
    for (let i = 0; i < N; i++) {
      let x = DESERT.x, z = DESERT.z;
      for (let k = 0; k < 40; k++) { // dry land only
        const a = rng() * Math.PI * 2, r = Math.sqrt(rng()) * DESERT.r * 0.88;
        x = DESERT.x + Math.cos(a) * r; z = DESERT.z + Math.sin(a) * r;
        if (this.world.terrain.height(x, z) > 1.5) break;
      }
      data.push({ home: [x, z], x, z, s: 0.7 + rng() * 0.7, v: 2.2 + rng() * 3.8, ang: rng() * 6.28, ph: rng() * 20, hy: 0, vy: 0 });
    }
    this.tw = { mesh, data };
  }

  respawnTumbleweed(t, rng = Math.random) {
    // upwind edge of the desert, anywhere along its width
    const wx = Math.cos(WIND_ANGLE), wz = Math.sin(WIND_ANGLE);
    for (let k = 0; k < 12; k++) {
      const off = (rng() - 0.5) * DESERT.r * 1.6;
      t.x = DESERT.x - wx * DESERT.r * 0.92 - wz * off;
      t.z = DESERT.z - wz * DESERT.r * 0.92 + wx * off;
      if (this.world.terrain.height(t.x, t.z) > 1.5) break;
      if (k === 11) { t.x = t.home[0]; t.z = t.home[1]; } // no dry upwind spot found: start over where it began
    }
    t.hy = 0; t.vy = 0;
  }

  updateTumbleweeds(dt, time) {
    const w = this.world, T = this.tw;
    for (let i = 0; i < T.mesh.count; i++) {
      const t = T.data[i];
      const wa = WIND_ANGLE + 0.35 * Math.sin(time * 0.13 + t.ph);
      const wx = Math.cos(wa), wz = Math.sin(wa);
      const sp = t.v * (0.75 + 0.25 * Math.sin(time * 0.7 + t.ph));
      t.x += wx * sp * dt; t.z += wz * sp * dt;
      t.ang += (sp * dt) / (0.6 * t.s);
      // an occasional hop, and gravity
      if (t.hy <= 0.001 && Math.random() < dt * 0.22) t.vy = 2.6 + Math.random() * 1.6;
      t.vy -= 14 * dt;
      t.hy = Math.max(0, t.hy + t.vy * dt);
      if (t.hy === 0 && t.vy < 0) t.vy = 0;
      const ground = w.terrain.height(t.x, t.z);
      if (ground < 0.8 || Math.hypot(t.x - DESERT.x, t.z - DESERT.z) > DESERT.r * 0.97 || w.buildingAt(t.x, t.z)) this.respawnTumbleweed(t);
      const y = w.terrain.height(t.x, t.z) + 0.5 * t.s + t.hy;
      _axis.set(-wz, 0, wx);
      _q.setFromAxisAngle(_axis, t.ang);
      _m.compose(_p.set(t.x, y, t.z), _q, _s.setScalar(t.s));
      T.mesh.setMatrixAt(i, _m);
    }
    T.mesh.instanceMatrix.needsUpdate = true;
  }

  // ---- birds ---------------------------------------------------------------------------------------------------------------------
  buildBirds() {
    const rng = mulberry32(4242);
    const flocks = [
      { x: LAKE.x, z: LAKE.z, n: 3, r: [50, 110], alt: [35, 60], kind: 'gull' },
      { x: LAKE.x - 90, z: LAKE.z + 70, n: 2, r: [40, 80], alt: [30, 50], kind: 'gull' },
      { x: POI_BY_ID.floorange_grove.x, z: POI_BY_ID.floorange_grove.z, n: 2, r: [60, 110], alt: [40, 65], kind: 'crow' },
      { x: POI_BY_ID.pinewood_camp.x, z: POI_BY_ID.pinewood_camp.z, n: 2, r: [50, 100], alt: [45, 70], kind: 'crow' },
      { x: POI_BY_ID.frostpeak_lodge.x, z: POI_BY_ID.frostpeak_lodge.z, n: 1, r: [120, 180], alt: [80, 110], kind: 'eagle' },
      { x: DESERT.x + 60, z: DESERT.z - 40, n: 2, r: [90, 150], alt: [70, 100], kind: 'vulture' },
    ];
    const data = [];
    for (const f of flocks) {
      for (let i = 0; i < f.n; i++) {
        const big = f.kind === 'eagle' || f.kind === 'vulture';
        data.push({
          x: f.x + (rng() - 0.5) * 40, z: f.z + (rng() - 0.5) * 40, r: f.r[0] + rng() * (f.r[1] - f.r[0]), alt: f.alt[0] + rng() * (f.alt[1] - f.alt[0]),
          w: (0.1 + rng() * 0.08) * (rng() < 0.5 ? -1 : 1) * (big ? 0.6 : 1), ph: rng() * 6.28, scale: big ? 2.1 : 1,
          color: f.kind === 'gull' ? 0xf2f4f7 : f.kind === 'eagle' ? 0x5a4632 : f.kind === 'vulture' ? 0x2e2a28 : 0x23262b,
        });
      }
    }
    const N = data.length;
    const bodyGeo = new THREE.SphereGeometry(0.16, 6, 4).scale(1, 0.75, 2.4);
    const wingR = new THREE.BoxGeometry(0.85, 0.025, 0.3).translate(0.425, 0, 0);
    const wingL = new THREE.BoxGeometry(0.85, 0.025, 0.3).translate(-0.425, 0, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, side: THREE.DoubleSide });
    const mk = (geo) => {
      const m = new THREE.InstancedMesh(geo, mat, N);
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.frustumCulled = false;
      m.castShadow = false;
      data.forEach((b, i) => m.setColorAt(i, _col.setHex(b.color)));
      this.group.add(m);
      return m;
    };
    this.birds = { n: N, data, body: mk(bodyGeo), wingR: mk(wingR), wingL: mk(wingL) };
  }

  updateBirds(camera, time) {
    const B = this.birds, w = this.world, cam = camera.position;
    let any = false;
    for (let i = 0; i < B.n; i++) {
      const b = B.data[i];
      const th = b.ph + b.w * time;
      const px = b.x + Math.cos(th) * b.r, pz = b.z + Math.sin(th) * b.r;
      const dx = px - cam.x, dz = pz - cam.z;
      const near = dx * dx + dz * dz < 650 * 650;
      let sc = near ? b.scale : 0;
      if (near) any = true;
      const sgn = Math.sign(b.w);
      const yaw = Math.atan2(-Math.sin(th) * sgn, Math.cos(th) * sgn); // forward is +z in model space
      const flapAmp = 0.45 * (0.5 + 0.5 * Math.sin(time * 0.35 + b.ph)) * (b.scale > 1 ? 0.5 : 1);
      const flap = Math.sin(time * (b.scale > 1 ? 5 : 9) + b.ph * 3) * flapAmp + 0.12;
      const y = w.terrain.height(b.x, b.z) + b.alt + Math.sin(time * 0.5 + b.ph) * 3;
      _q.setFromAxisAngle(_y, yaw);
      _q2.setFromAxisAngle(_z, -sgn * 0.3);
      _q.multiply(_q2);
      _body.compose(_p.set(px, y, pz), _q, _s.setScalar(sc));
      B.body.setMatrixAt(i, _body);
      _q2.setFromAxisAngle(_z, flap);
      _wing.compose(_p.set(0.12, 0.03, 0), _q2, _s.set(1, 1, 1));
      B.wingR.setMatrixAt(i, _wing.premultiply(_body));
      _q2.setFromAxisAngle(_z, -flap);
      _wing.compose(_p.set(-0.12, 0.03, 0), _q2, _s.set(1, 1, 1));
      B.wingL.setMatrixAt(i, _wing.premultiply(_body));
    }
    B.body.count = B.wingR.count = B.wingL.count = B.n;
    B.body.visible = B.wingR.visible = B.wingL.visible = any;
    if (any) { B.body.instanceMatrix.needsUpdate = true; B.wingR.instanceMatrix.needsUpdate = true; B.wingL.instanceMatrix.needsUpdate = true; }
  }

  // ---- particles near the camera -------------------------------------------------------------------------------------------------
  updateParticles(camera, dt, time) {
    const fx = this.fx, w = this.world;
    if (!fx || fx.quality < 0.5 || dt <= 0) return;
    const q = fx.quality, cx = camera.position.x, cy = camera.position.y, cz = camera.position.z;
    const wx = Math.cos(WIND_ANGLE), wz = Math.sin(WIND_ANGLE);

    // chimney and campfire smoke
    this.smokeT -= dt;
    if (this.smokeT <= 0) {
      this.smokeT = 0.22;
      for (const s of w.smokeSources) {
        const dx = s.x - cx, dz = s.z - cz;
        if (dx * dx + dz * dz > 110 * 110) continue;
        const chimney = s.kind === 'chimney';
        fx.alpha.emit(s.x + (Math.random() - 0.5) * 0.3, s.y, s.z + (Math.random() - 0.5) * 0.3, wx * 0.9 + (Math.random() - 0.5) * 0.3, 1.3 + Math.random() * 0.5, wz * 0.9 + (Math.random() - 0.5) * 0.3,
          chimney ? 3.8 : 2.6, chimney ? 0.35 : 0.25, chimney ? 1.9 : 1.3, chimney ? SOOT : SMOKE, chimney ? SOOT_END : SMOKE_END, chimney ? 0.32 : 0.22, -0.1, 0.2);
        if (!chimney && Math.random() < 0.6) fx.add.emit(s.x + (Math.random() - 0.5) * 0.4, s.y - 0.5, s.z + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.8, 1.6 + Math.random() * 1.6, (Math.random() - 0.5) * 0.8, 0.8, 0.08, 0.02, SPARK, SPARK_END, 1, 0, 0.3);
      }
    }
    const inside = w.buildingAt(cx, cz);
    const ground = w.terrain.height(cx, cz);

    // snow around Frostpeak
    const snow = zone(cx, cz, -450, -440, 230, 340);
    if (snow > 0 && !inside && cy - ground < 140) {
      this.acc.snow += dt * 110 * q * snow;
      while (this.acc.snow >= 1) {
        this.acc.snow -= 1;
        fx.alpha.emit(cx + (Math.random() - 0.5) * 56, cy + 4 + Math.random() * 12, cz + (Math.random() - 0.5) * 56, 1.1 + (Math.random() - 0.5) * 0.6, -(1.7 + Math.random() * 0.9), 0.5 + (Math.random() - 0.5) * 0.5, 5.5, 0.1, 0.1, SNOW, SNOW, 0.9, 0, 0);
      }
    }
    // pollen / fireflies where it is green
    const g1 = POI_BY_ID.floorange_grove, g2 = POI_BY_ID.pinewood_camp;
    const green = Math.max(zone(cx, cz, g1.x, g1.z, 190, 300), zone(cx, cz, g2.x, g2.z, 130, 220));
    if (green > 0 && !inside && cy - ground < 40) {
      this.acc.pollen += dt * 6 * q * green;
      while (this.acc.pollen >= 1) {
        this.acc.pollen -= 1;
        const x = cx + (Math.random() - 0.5) * 32, z = cz + (Math.random() - 0.5) * 32;
        fx.add.emit(x, w.terrain.height(x, z) + 0.7 + Math.random() * 3, z, (Math.random() - 0.5) * 0.5, 0.1 + Math.random() * 0.25, (Math.random() - 0.5) * 0.5, 4.2, 0.075, 0.06, POLLEN, POLLEN_END, 0.7, 0, 0.2);
      }
    }
    // dust blowing across the desert
    const dry = zone(cx, cz, DESERT.x, DESERT.z, DESERT.r, DESERT.r + 120);
    if (dry > 0 && !inside && cy - ground < 30) {
      this.acc.dust += dt * 3 * q * dry;
      while (this.acc.dust >= 1) {
        this.acc.dust -= 1;
        const x = cx + (Math.random() - 0.5) * 60 - wx * 20, z = cz + (Math.random() - 0.5) * 60 - wz * 20;
        fx.alpha.emit(x, w.terrain.height(x, z) + 0.3 + Math.random() * 1.2, z, wx * 5, 0.2, wz * 5, 2.6, 0.5, 1.5, DUST, DUST_END, 0.13, 0, 0.15);
      }
    }
  }

  update(camera, dt, time) {
    const cam = camera.position;
    const nearDesert = Math.hypot(cam.x - DESERT.x, cam.z - DESERT.z) < DESERT.r + 450;
    this.tw.mesh.visible = nearDesert;
    if (nearDesert && dt > 0) this.updateTumbleweeds(dt, time);
    this.updateBirds(camera, time);
    this.updateParticles(camera, dt, time);
    // neon towers buzz and now and then drop out for a beat
    const f = Math.sin(time * 23.1) * Math.sin(time * 7.3 + 1.7);
    this.world.mats.tower.emissiveIntensity = 0.8 + 0.05 * Math.sin(time * 9) + (f > 0.94 ? -0.32 : 0);
  }
}
