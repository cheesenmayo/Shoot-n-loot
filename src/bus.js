import * as THREE from 'three';
import { mat } from './models.js';

const ALT = 330;

export class Bus {
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    this.buildModel();
    game.scene.add(this.group);
    this.group.visible = false;
    this.pos = new THREE.Vector3();
    this.dir = new THREE.Vector3(1, 0, 0);
    this.speed = 52;
    this.t = 0;
    this.active = false;
    this.start = new THREE.Vector3();
    this.end = new THREE.Vector3();
    this.length = 2400;
  }

  buildModel() {
    const g = this.group;
    const B = (w, h, d, c, x, y, z, o = {}) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c, { metal: 0.2, rough: 0.5, ...o }));
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
    // bus body: blue with white roof (nose toward -z)
    B(5.2, 3.2, 14, 0x2f6fd8, 0, 0, 0);
    B(5.4, 0.6, 14.2, 0xf4f4f4, 0, 1.9, 0);
    B(5.0, 0.4, 3.2, 0x1d3f7a, 0, 0.0, -7.4);
    for (let i = 0; i < 4; i++) {
      B(0.1, 1.2, 1.7, 0x9fd8ff, 2.62, 0.5, -4.6 + i * 3.1, { emissive: 0x4aa8ff, emissiveIntensity: 0.4 });
      B(0.1, 1.2, 1.7, 0x9fd8ff, -2.62, 0.5, -4.6 + i * 3.1, { emissive: 0x4aa8ff, emissiveIntensity: 0.4 });
    }
    B(4.6, 1.5, 0.1, 0x9fd8ff, 0, 0.5, -7.05, { emissive: 0x4aa8ff, emissiveIntensity: 0.4 });
    for (const x of [-2.7, 2.7]) for (const z of [-4.5, 4.5]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.7, 12).rotateZ(Math.PI / 2), mat(0x1a1a1a));
      w.position.set(x, -1.7, z);
      g.add(w);
    }
    // balloon
    const balloon = new THREE.Mesh(new THREE.SphereGeometry(9, 20, 14), new THREE.MeshStandardMaterial({ color: 0xff4f6d, roughness: 0.5 }));
    balloon.position.y = 21;
    balloon.scale.set(1, 1.15, 1);
    balloon.castShadow = true;
    g.add(balloon);
    for (let i = 0; i < 6; i++) {
      const stripe = new THREE.Mesh(new THREE.SphereGeometry(9.05, 20, 14, (i / 6) * Math.PI * 2, Math.PI / 6), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xfff1a8 : 0x35c4ff, roughness: 0.5 }));
      stripe.position.y = 21;
      stripe.scale.set(1, 1.15, 1);
      g.add(stripe);
    }
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    for (const [x, z] of [[-2.4, -6], [2.4, -6], [-2.4, 6], [2.4, 6]]) {
      const a = new THREE.Vector3(x, 1.8, z), b = new THREE.Vector3(x * 1.6, 13, z * 0.8);
      const dir = b.clone().sub(a);
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, dir.length(), 4), lineMat);
      m.position.copy(a).addScaledVector(dir, 0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      g.add(m);
    }
    g.scale.setScalar(1.25);
  }

  launch() {
    // random line through the island, offset from the centre
    const a = Math.random() * Math.PI * 2;
    this.dir.set(Math.cos(a), 0, Math.sin(a));
    const off = (Math.random() - 0.5) * 520;
    const side = new THREE.Vector3(-this.dir.z, 0, this.dir.x);
    const c = side.multiplyScalar(off);
    this.start.copy(c).addScaledVector(this.dir, -this.length / 2);
    this.end.copy(c).addScaledVector(this.dir, this.length / 2);
    this.start.y = this.end.y = ALT;
    this.pos.copy(this.start);
    this.t = 0;
    this.active = true;
    this.group.visible = true;
    this.group.rotation.y = Math.atan2(-this.dir.x, -this.dir.z);
  }

  get progress() { return this.t * this.speed / this.length; }

  update(dt) {
    if (!this.active) return;
    this.t += dt;
    this.pos.copy(this.start).addScaledVector(this.dir, this.t * this.speed);
    this.group.position.copy(this.pos);
    this.group.position.y += 0.0;
    this.group.position.y = this.pos.y + Math.sin(this.t * 1.3) * 0.3;
    if (this.t * this.speed >= this.length) {
      this.active = false;
      this.group.visible = false;
    }
  }

  /** distance from a point to the flight line (2D) */
  lateralDistance(x, z) {
    const dx = x - this.start.x, dz = z - this.start.z;
    const along = dx * this.dir.x + dz * this.dir.z;
    return Math.abs(dx * -this.dir.z + dz * this.dir.x) * (along > -200 && along < this.length + 200 ? 1 : 3);
  }
  /** point on the route closest to (x,z) */
  closestOnRoute(x, z, out) {
    const dx = x - this.start.x, dz = z - this.start.z;
    const along = Math.max(0, Math.min(this.length, dx * this.dir.x + dz * this.dir.z));
    return out.set(this.start.x + this.dir.x * along, ALT, this.start.z + this.dir.z * along);
  }
}
export { ALT as BUS_ALT };
