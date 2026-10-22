import * as THREE from 'three';
import { Terrain, createWater, WORLD } from './terrain.js';
import { CollisionWorld } from './colliders.js';
import { createSky } from './sky.js';
import { Props } from './props.js';
import { POIS } from './poidata.js';
import { Builder } from './builder.js';
import { buildAllPois } from './pois/index.js';
import { makeTextures } from '../textures.js';

const tick = () => new Promise((r) => setTimeout(r, 0));

export class World {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.terrain = new Terrain();
    this.collision = new CollisionWorld(this.terrain);
    this.chestSpots = [];
    this.lootSpots = [];
    this.buildings = [];
    this.jumpPads = [];
    this.animated = [];
    this.poiGroups = [];
    this.pois = POIS;
    this.extraLabels = [];
    this.windFlags = [];
    this.nearbyChecks = null;
  }

  async build(onProgress = () => {}) {
    const step = async (label, p) => { onProgress(label, p); await tick(); };
    await step('Generating textures', 0.01);
    this.textures = makeTextures();
    this.mats = {
      solid: new THREE.MeshStandardMaterial({ vertexColors: true, map: this.textures.grain, roughness: 0.86, metalness: 0.04 }),
      glow: new THREE.MeshBasicMaterial({ vertexColors: true }),
      glass: new THREE.MeshStandardMaterial({
        vertexColors: true, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.5, depthWrite: false,
      }),
      tower: new THREE.MeshStandardMaterial({
        vertexColors: true, map: this.textures.windows, emissiveMap: this.textures.windowsEmissive,
        emissive: 0xffffff, emissiveIntensity: 0.8, roughness: 0.4, metalness: 0.15,
      }),
    };

    await step('Shaping the island', 0.03);
    await this.terrain.bake((f) => onProgress('Shaping the island', 0.03 + f * 0.3));
    this.terrain.createMeshes(this.scene, this.textures);

    this.sky = createSky(this.scene, this.renderer, this.textures);
    this.water = createWater(this.textures);
    this.scene.add(this.water);

    await step('Raising towns & landmarks', 0.35);
    this.props = new Props(this, this.textures);
    buildAllPois(this, (label, f) => onProgress(label, 0.35 + f * 0.25));
    await step('Planting forests', 0.62);
    this.props.generate((f) => onProgress('Planting forests', 0.62 + f * 0.3));
    this.scene.add(this.props.group);

    await step('Finishing touches', 0.95);
    this.indexBuildings();
    this.mapRects = this.mapRects || [];
    onProgress('Ready', 1);
  }

  /** Paint the island map in the background (called after the title screen is up). */
  async paintMap() {
    this.minimapCanvas = await this.terrain.makeMapCanvas(1024, (ctx, px, k) => {
      for (const r of this.mapRects) {
        ctx.fillStyle = r.color;
        ctx.fillRect(px(r.x0), px(r.z0), Math.max(1, (r.x1 - r.x0) * k), Math.max(1, (r.z1 - r.z0) * k));
      }
      for (const b of this.buildings) {
        ctx.fillStyle = '#c9c4ba';
        ctx.fillRect(px(b.minX), px(b.minZ), Math.max(2, (b.maxX - b.minX) * k), Math.max(2, (b.maxZ - b.minZ) * k));
        ctx.strokeStyle = 'rgba(30,25,20,0.9)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px(b.minX), px(b.minZ), Math.max(2, (b.maxX - b.minX) * k), Math.max(2, (b.maxZ - b.minZ) * k));
      }
    });
  }

  addBuilder(b, name = 'poi') {
    const g = new THREE.Group();
    g.name = name;
    const add = (batch, mat, shadow, order = 0) => {
      const geo = batch.build();
      if (!geo) return;
      const m = new THREE.Mesh(geo, mat);
      m.castShadow = shadow;
      m.receiveShadow = true;
      m.renderOrder = order;
      m.matrixAutoUpdate = false;
      g.add(m);
    };
    add(b.solid, this.mats.solid, true);
    add(b.tower, this.mats.tower, true);
    add(b.glow, this.mats.glow, false);
    add(b.glass, this.mats.glass, false, 3);
    for (const m of b.meshes) g.add(m);
    this.scene.add(g);
    this.poiGroups.push(g);
    this.jumpPads.push(...b.jumpPads);
    return g;
  }

  // -- building lookup for bot navigation ---------------------------------------------------------
  indexBuildings() {
    this.bGrid = new Map();
    for (const b of this.buildings) {
      for (let ix = Math.floor(b.minX / 32); ix <= Math.floor(b.maxX / 32); ix++) {
        for (let iz = Math.floor(b.minZ / 32); iz <= Math.floor(b.maxZ / 32); iz++) {
          const k = ix * 8192 + iz;
          (this.bGrid.get(k) || this.bGrid.set(k, []).get(k)).push(b);
        }
      }
    }
  }

  buildingAt(x, z) {
    const list = this.bGrid?.get(Math.floor(x / 32) * 8192 + Math.floor(z / 32));
    if (!list) return null;
    for (const b of list) if (x > b.minX - 0.3 && x < b.maxX + 0.3 && z > b.minZ - 0.3 && z < b.maxZ + 0.3) return b;
    return null;
  }

  /** Waypoints (through doors and stairs) from `from` to a goal. */
  planRoute(from, tx, tz, ty) {
    const bf = this.buildingAt(from.x, from.z), bt = this.buildingAt(tx, tz);
    const pts = [];
    const lvl = (b, y) => Math.max(0, Math.min(b.floors, Math.round((y - b.y0) / b.floorH)));
    const nearest = (b, x, z) => {
      let best = null, bd = 1e9;
      for (const d of b.doors) {
        const dd = Math.hypot(d.outX - x, d.outZ - z);
        if (dd < bd) { bd = dd; best = d; }
      }
      return best;
    };
    let cur = bf ? lvl(bf, from.y) : 0;
    if (bf && bf !== bt) {
      for (let k = cur - 1; k >= 0; k--) {
        const s = bf.stairs[k];
        if (s) { pts.push({ x: s.highX, z: s.highZ }); pts.push({ x: s.lowX, z: s.lowZ }); }
      }
      const d = nearest(bf, tx, tz);
      if (d) { pts.push({ x: d.inX, z: d.inZ }); pts.push({ x: d.outX, z: d.outZ }); }
    }
    if (bt) {
      let level = 0;
      if (bf !== bt) {
        const d = nearest(bt, from.x, from.z);
        if (d) { pts.push({ x: d.outX, z: d.outZ }); pts.push({ x: d.inX, z: d.inZ }); }
      } else level = cur;
      const lt = lvl(bt, ty);
      while (level < lt) {
        const s = bt.stairs[level];
        if (!s) break;
        pts.push({ x: s.entryX, z: s.entryZ }); pts.push({ x: s.lowX, z: s.lowZ }); pts.push({ x: s.highX, z: s.highZ });
        level++;
      }
      while (level > lt) {
        const s = bt.stairs[level - 1];
        if (!s) break;
        pts.push({ x: s.highX, z: s.highZ }); pts.push({ x: s.lowX, z: s.lowZ });
        level--;
      }
    }
    pts.push({ x: tx, z: tz });
    return pts;
  }

  /** Used to keep decorative grass off paved POIs. */
  nearPoiClear(x, z) {
    for (const p of POIS) {
      if (p.grassOk) continue;
      if (Math.hypot(x - p.x, z - p.z) < p.clearR * 0.9) return true;
    }
    return false;
  }

  /** Surface height a character standing at (x,z) with feet at `feetY` would land on. */
  groundAt(x, z, feetY, stepUp = 0.6) {
    return this.collision.groundAt(x, z, feetY, stepUp);
  }

  update(camera, focus, dt, time) {
    this.terrain.update(camera.position);
    this.props.update(camera.position, dt, time);
    this.sky.update(camera, focus, dt, time);
    const w = this.water.userData.water;
    this.water.position.x = Math.round(camera.position.x / 100) * 100;
    this.water.position.z = Math.round(camera.position.z / 100) * 100;
    const nm = w.material.normalMap;
    nm.offset.x = (time * 0.004) % 1;
    nm.offset.y = (time * 0.0027) % 1;
    for (const a of this.animated) a.update(dt, time);
  }

  applyGraphics(g) {
    const r = this.renderer;
    this.graphics = g;
    r.setPixelRatio(g.pixelRatio);
    this.sky.setShadowQuality(g.shadowMap, g.shadowExtent);
    r.shadowMap.enabled = g.shadowMap > 0;
    r.shadowMap.type = g.shadowMap >= 4096 ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
    this.sky.setFog(g.viewDistance * 0.35, g.viewDistance);
    this.sky.setCloudsVisible(g.clouds);
    this.terrain.viewDistance = g.viewDistance;
    this.terrain.lodNear = g.lodNear;
    this.terrain.lodMid = g.lodMid;
    this.terrain.setDetailNormals(g.detailNormals);
    this.scene.environmentIntensity = g.envMap ? 0.55 : 0.25;
    this.props.setQuality(g);
    this.water.userData.water.material.normalScale.setScalar(g.detailNormals ? 0.7 : 0.4);
    // shadow toggles change the shader programs; refresh the shared materials once
    const mats = [...Object.values(this.mats), this.terrain.material, this.props.treeMat, this.props.rockMat, this.props.grassMat];
    for (const m of mats) m.needsUpdate = true;
  }
}
