import * as THREE from 'three';
import { mulberry32, clamp } from '../util.js';

// ---------------------------------------------------------------------------
// Batch: accumulates vertex-coloured geometry that is merged into one mesh.
// ---------------------------------------------------------------------------

const colorCache = new Map();
function toRGB(c) {
  if (c && c.isColor) return [c.r, c.g, c.b];
  let v = colorCache.get(c);
  if (!v) {
    const t = new THREE.Color(c);
    v = [t.r, t.g, t.b];
    colorCache.set(c, v);
  }
  return v;
}

export class Batch {
  constructor(seed = 1) {
    this.pos = [];
    this.nor = [];
    this.col = [];
    this.uv = [];
    this.idx = [];
    this.n = 0;
    this.rng = mulberry32(seed);
  }

  _jitter(color, amount) {
    const [r, g, b] = toRGB(color);
    const k = 1 + (this.rng() - 0.5) * 2 * amount;
    return [r * k, g * k, b * k];
  }

  _quad(p, n, c, aoBottom, uvs) {
    // p: 4 points [x,y,z]; c: rgb; aoBottom: [f0..f3] brightness per vertex
    const base = this.n;
    for (let i = 0; i < 4; i++) {
      this.pos.push(p[i][0], p[i][1], p[i][2]);
      this.nor.push(n[0], n[1], n[2]);
      const f = aoBottom[i];
      this.col.push(c[0] * f, c[1] * f, c[2] * f);
      this.uv.push(uvs[i][0], uvs[i][1]);
    }
    this.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    this.n += 4;
  }

  /** Axis-aligned box from (x0,y0,z0) to (x1,y1,z1). */
  box(x0, y0, z0, x1, y1, z1, color, o = {}) {
    const c = this._jitter(color, o.jit ?? 0.05);
    const s = o.uvScale ?? 2.5;
    const ao = o.ao ?? 0.78;
    const sx = o.uvX ?? s, sy = o.uvY ?? s;
    const w = x1 - x0, d = z1 - z0;
    const hideBottom = o.noBottom;
    // +X
    this._quad([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], [1, 0, 0], c, [ao, ao, 1, 1],
      [[z1 / sx, y0 / sy], [z0 / sx, y0 / sy], [z0 / sx, y1 / sy], [z1 / sx, y1 / sy]]);
    // -X
    this._quad([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0], c, [ao, ao, 1, 1],
      [[z0 / sx, y0 / sy], [z1 / sx, y0 / sy], [z1 / sx, y1 / sy], [z0 / sx, y1 / sy]]);
    // +Y
    this._quad([[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], [0, 1, 0], c, [1, 1, 1, 1],
      [[x0 / s, z1 / s], [x1 / s, z1 / s], [x1 / s, z0 / s], [x0 / s, z0 / s]]);
    // +Z
    this._quad([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], c, [ao, ao, 1, 1],
      [[x0 / sx, y0 / sy], [x1 / sx, y0 / sy], [x1 / sx, y1 / sy], [x0 / sx, y1 / sy]]);
    // -Z
    this._quad([[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], [0, 0, -1], c, [ao, ao, 1, 1],
      [[x1 / sx, y0 / sy], [x0 / sx, y0 / sy], [x0 / sx, y1 / sy], [x1 / sx, y1 / sy]]);
    if (!hideBottom) {
      this._quad([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], [0, -1, 0], c, [ao, ao, ao, ao],
        [[x0 / s, z0 / s], [x1 / s, z0 / s], [x1 / s, z1 / s], [x0 / s, z1 / s]]);
    }
  }

  /** Right-angle wedge (ramp). Surface = lo at the low end, hi at the other. */
  wedge(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, color, o = {}) {
    const c = this._jitter(color, o.jit ?? 0.04);
    const s = o.uvScale ?? 2.5;
    const ao = 0.8;
    // corner heights at (minX,minZ),(maxX,minZ),(maxX,maxZ),(minX,maxZ)
    let h00, h10, h11, h01;
    if (axis === 'x') {
      const a = lowAtMin ? lo : hi, b = lowAtMin ? hi : lo;
      h00 = a; h10 = b; h11 = b; h01 = a;
    } else {
      const a = lowAtMin ? lo : hi, b = lowAtMin ? hi : lo;
      h00 = a; h10 = a; h11 = b; h01 = b;
    }
    const y = bottom;
    // top surface (two triangles as a quad; planar)
    const e1 = [maxX - minX, h10 - h00, 0], e2 = [0, h01 - h00, maxZ - minZ];
    let n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    // (minX,minZ)->(minX,maxZ)->(maxX,maxZ)->(maxX,minZ) is CCW from above
    n = [e2[1] * e1[2] - e2[2] * e1[1], e2[2] * e1[0] - e2[0] * e1[2], e2[0] * e1[1] - e2[1] * e1[0]];
    if (n[1] < 0) n = n.map((v) => -v);
    const l = Math.hypot(...n);
    n = n.map((v) => v / l);
    this._quad([[minX, h01, maxZ], [maxX, h11, maxZ], [maxX, h10, minZ], [minX, h00, minZ]], n, c, [1, 1, 1, 1],
      [[minX / s, maxZ / s], [maxX / s, maxZ / s], [maxX / s, minZ / s], [minX / s, minZ / s]]);
    // sides (vertical quads, trapezoids with possibly zero-height edges)
    // +X side
    this._quad([[maxX, y, maxZ], [maxX, y, minZ], [maxX, h10, minZ], [maxX, h11, maxZ]], [1, 0, 0], c, [ao, ao, 1, 1],
      [[maxZ / s, y / s], [minZ / s, y / s], [minZ / s, h10 / s], [maxZ / s, h11 / s]]);
    // -X side
    this._quad([[minX, y, minZ], [minX, y, maxZ], [minX, h01, maxZ], [minX, h00, minZ]], [-1, 0, 0], c, [ao, ao, 1, 1],
      [[minZ / s, y / s], [maxZ / s, y / s], [maxZ / s, h01 / s], [minZ / s, h00 / s]]);
    // +Z side
    this._quad([[minX, y, maxZ], [maxX, y, maxZ], [maxX, h11, maxZ], [minX, h01, maxZ]], [0, 0, 1], c, [ao, ao, 1, 1],
      [[minX / s, y / s], [maxX / s, y / s], [maxX / s, h11 / s], [minX / s, h01 / s]]);
    // -Z side
    this._quad([[maxX, y, minZ], [minX, y, minZ], [minX, h00, minZ], [maxX, h10, minZ]], [0, 0, -1], c, [ao, ao, 1, 1],
      [[maxX / s, y / s], [minX / s, y / s], [minX / s, h00 / s], [maxX / s, h10 / s]]);
  }

  /** Vertical (or tapered) cylinder with smooth sides. */
  cyl(x, y0, z, r, h, color, o = {}) {
    const sides = o.sides ?? 10;
    const rt = o.rTop ?? r;
    const c = this._jitter(color, o.jit ?? 0.04);
    const ao = o.ao ?? 0.8;
    const s = o.uvScale ?? 2.5;
    const base = this.n;
    const slope = (r - rt) / h;
    for (let i = 0; i <= sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      const nl = Math.hypot(1, slope);
      for (let k = 0; k < 2; k++) {
        const rr = k === 0 ? r : rt;
        const f = k === 0 ? ao : 1;
        this.pos.push(x + ca * rr, y0 + k * h, z + sa * rr);
        this.nor.push(ca / nl, slope / nl, sa / nl);
        this.col.push(c[0] * f, c[1] * f, c[2] * f);
        this.uv.push((i / sides) * (Math.PI * 2 * r) / s, (y0 + k * h) / s);
      }
    }
    for (let i = 0; i < sides; i++) {
      const a = base + i * 2;
      this.idx.push(a, a + 3, a + 1, a, a + 2, a + 3);
    }
    this.n += (sides + 1) * 2;
    if (rt > 0.01 && !o.noCap) {
      const cb = this.n;
      this.pos.push(x, y0 + h, z);
      this.nor.push(0, 1, 0);
      this.col.push(c[0], c[1], c[2]);
      this.uv.push(x / s, z / s);
      for (let i = 0; i <= sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        this.pos.push(x + Math.cos(a) * rt, y0 + h, z + Math.sin(a) * rt);
        this.nor.push(0, 1, 0);
        this.col.push(c[0], c[1], c[2]);
        this.uv.push((x + Math.cos(a) * rt) / s, (z + Math.sin(a) * rt) / s);
      }
      for (let i = 0; i < sides; i++) this.idx.push(cb, cb + 2 + i, cb + 1 + i);
      this.n += sides + 2;
    }
  }

  /** Gable roof over [x0,x1]x[z0,z1]; ridge runs along `ridgeAxis`. */
  gable(x0, z0, x1, z1, yEave, rise, ridgeAxis, color, o = {}) {
    const c = this._jitter(color, 0.04);
    const s = o.uvScale ?? 2;
    const thick = o.thick ?? 0.25;
    const yb = yEave - thick;
    const xm = (x0 + x1) / 2, zm = (z0 + z1) / 2;
    const yr = yEave + rise;
    if (ridgeAxis === 'x') {
      // ridge along x at z = zm
      const ln = Math.hypot(rise, zm - z0);
      const nz = (zm - z0) / ln, ny = rise / ln;
      // south slope (z1 side)
      this._quad([[x0, yEave, z1], [x1, yEave, z1], [x1, yr, zm], [x0, yr, zm]], [0, ny, nz], c, [0.95, 0.95, 1, 1],
        [[x0 / s, z1 / s], [x1 / s, z1 / s], [x1 / s, zm / s], [x0 / s, zm / s]]);
      // north slope
      this._quad([[x1, yEave, z0], [x0, yEave, z0], [x0, yr, zm], [x1, yr, zm]], [0, ny, -nz], c, [0.95, 0.95, 1, 1],
        [[x1 / s, z0 / s], [x0 / s, z0 / s], [x0 / s, zm / s], [x1 / s, zm / s]]);
      // gable ends (triangles) + underside
      this._tri([[x1, yb, z1], [x1, yb, z0], [x1, yr, zm]], [1, 0, 0], c);
      this._tri([[x0, yb, z0], [x0, yb, z1], [x0, yr, zm]], [-1, 0, 0], c);
      this._quad([[x0, yb, z0], [x1, yb, z0], [x1, yb, z1], [x0, yb, z1]], [0, -1, 0], c, [0.7, 0.7, 0.7, 0.7],
        [[0, 0], [1, 0], [1, 1], [0, 1]]);
      // eave fascia
      this._quad([[x0, yb, z1], [x1, yb, z1], [x1, yEave, z1], [x0, yEave, z1]], [0, 0, 1], c, [0.8, 0.8, 0.9, 0.9], [[0, 0], [1, 0], [1, 0.1], [0, 0.1]]);
      this._quad([[x1, yb, z0], [x0, yb, z0], [x0, yEave, z0], [x1, yEave, z0]], [0, 0, -1], c, [0.8, 0.8, 0.9, 0.9], [[0, 0], [1, 0], [1, 0.1], [0, 0.1]]);
    } else {
      const ln = Math.hypot(rise, xm - x0);
      const nx = (xm - x0) / ln, ny = rise / ln;
      this._quad([[x1, yEave, z1], [x1, yEave, z0], [xm, yr, z0], [xm, yr, z1]], [nx, ny, 0], c, [0.95, 0.95, 1, 1],
        [[z1 / s, x1 / s], [z0 / s, x1 / s], [z0 / s, xm / s], [z1 / s, xm / s]]);
      this._quad([[x0, yEave, z0], [x0, yEave, z1], [xm, yr, z1], [xm, yr, z0]], [-nx, ny, 0], c, [0.95, 0.95, 1, 1],
        [[z0 / s, x0 / s], [z1 / s, x0 / s], [z1 / s, xm / s], [z0 / s, xm / s]]);
      this._tri([[x0, yb, z1], [x1, yb, z1], [xm, yr, z1]], [0, 0, 1], c);
      this._tri([[x1, yb, z0], [x0, yb, z0], [xm, yr, z0]], [0, 0, -1], c);
      this._quad([[x0, yb, z0], [x1, yb, z0], [x1, yb, z1], [x0, yb, z1]], [0, -1, 0], c, [0.7, 0.7, 0.7, 0.7],
        [[0, 0], [1, 0], [1, 1], [0, 1]]);
      this._quad([[x1, yb, z1], [x1, yb, z0], [x1, yEave, z0], [x1, yEave, z1]], [1, 0, 0], c, [0.8, 0.8, 0.9, 0.9], [[0, 0], [1, 0], [1, 0.1], [0, 0.1]]);
      this._quad([[x0, yb, z0], [x0, yb, z1], [x0, yEave, z1], [x0, yEave, z0]], [-1, 0, 0], c, [0.8, 0.8, 0.9, 0.9], [[0, 0], [1, 0], [1, 0.1], [0, 0.1]]);
    }
  }

  _tri(p, n, c) {
    const base = this.n;
    for (let i = 0; i < 3; i++) {
      this.pos.push(p[i][0], p[i][1], p[i][2]);
      this.nor.push(n[0], n[1], n[2]);
      this.col.push(c[0] * 0.92, c[1] * 0.92, c[2] * 0.92);
      this.uv.push(p[i][0] / 2 + p[i][2] / 2, p[i][1] / 2);
    }
    this.idx.push(base, base + 1, base + 2);
    this.n += 3;
  }


  /** Tapered cylinder between two arbitrary points. */
  limb(x0, y0, z0, x1, y1, z1, r0, r1, color, o = {}) {
    const sides = o.sides ?? 6;
    const c = this._jitter(color, o.jit ?? 0.05);
    let ax = x1 - x0, ay = y1 - y0, az = z1 - z0;
    const len = Math.hypot(ax, ay, az) || 1;
    ax /= len; ay /= len; az /= len;
    // any vector not parallel to the axis
    let ux = 0, uy = 1, uz = 0;
    if (Math.abs(ay) > 0.9) { ux = 1; uy = 0; }
    let vx = ay * uz - az * uy, vy = az * ux - ax * uz, vz = ax * uy - ay * ux;
    const vl = Math.hypot(vx, vy, vz); vx /= vl; vy /= vl; vz /= vl;
    ux = vy * az - vz * ay; uy = vz * ax - vx * az; uz = vx * ay - vy * ax;
    const base = this.n;
    const ao = o.ao ?? 0.85;
    for (let i = 0; i <= sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      const nx = ux * ca + vx * sa, ny = uy * ca + vy * sa, nz = uz * ca + vz * sa;
      for (let k = 0; k < 2; k++) {
        const r = k === 0 ? r0 : r1;
        const px = k === 0 ? x0 : x1, py = k === 0 ? y0 : y1, pz = k === 0 ? z0 : z1;
        this.pos.push(px + nx * r, py + ny * r, pz + nz * r);
        this.nor.push(nx, ny, nz);
        const f = k === 0 ? ao : 1;
        this.col.push(c[0] * f, c[1] * f, c[2] * f);
        this.uv.push(i / sides, k);
      }
    }
    for (let i = 0; i < sides; i++) {
      const a = base + i * 2;
      this.idx.push(a, a + 3, a + 1, a, a + 2, a + 3);
    }
    this.n += (sides + 1) * 2;
  }

  /** Lumpy ellipsoid (foliage, rocks). */
  blob(cx, cy, cz, rx, ry, rz, color, o = {}) {
    const seg = o.seg ?? 7, rings = o.rings ?? 5;
    const wob = o.wobble ?? 0.18;
    const c = this._jitter(color, o.jit ?? 0.06);
    const ao = o.ao ?? 0.72;
    const base = this.n;
    const rng = this.rng;
    const grid = [];
    for (let j = 0; j <= rings; j++) {
      const v = j / rings;
      const phi = v * Math.PI;
      for (let i = 0; i <= seg; i++) {
        const th = (i / seg) * Math.PI * 2;
        const key = i === seg ? 0 : i; // wrap seam
        const rr = 1 + (grid[j * (seg + 1) + key] ?? ((rng() - 0.5) * 2 * wob));
        grid[j * (seg + 1) + i] = rr - 1;
        const nx = Math.sin(phi) * Math.cos(th), ny = Math.cos(phi), nz = Math.sin(phi) * Math.sin(th);
        const pr = (j === 0 || j === rings) ? 1 : rr;
        this.pos.push(cx + nx * rx * pr, cy + ny * ry * pr, cz + nz * rz * pr);
        const l = Math.hypot(nx / rx, ny / ry, nz / rz) || 1;
        this.nor.push(nx / rx / l, ny / ry / l, nz / rz / l);
        const f = ao + (1 - ao) * (ny * 0.5 + 0.5);
        this.col.push(c[0] * f, c[1] * f, c[2] * f);
        this.uv.push(i / seg, v);
      }
    }
    for (let j = 0; j < rings; j++) {
      for (let i = 0; i < seg; i++) {
        const a = base + j * (seg + 1) + i, b = a + 1, d = a + seg + 1, e = d + 1;
        this.idx.push(a, b, d, b, e, d);
      }
    }
    this.n += (rings + 1) * (seg + 1);
  }

  /** Flat tapered ribbon along a polyline (palm fronds, grass blades). Double sided. */
  strip(points, widths, colorA, colorB, o = {}) {
    const ca = toRGB(colorA), cb = toRGB(colorB);
    const nrm = o.normal ?? [0, 1, 0];
    const side = o.side ?? [1, 0, 0];
    const n = points.length;
    const base = this.n;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const p = points[i], w = widths[i] / 2;
      const col = [ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t];
      for (const sgn of [-1, 1]) {
        this.pos.push(p[0] + side[0] * w * sgn, p[1] + side[1] * w * sgn, p[2] + side[2] * w * sgn);
        this.nor.push(nrm[0], nrm[1], nrm[2]);
        this.col.push(col[0], col[1], col[2]);
        this.uv.push(sgn < 0 ? 0 : 1, t);
      }
    }
    for (let i = 0; i < n - 1; i++) {
      const a = base + i * 2;
      this.idx.push(a, a + 1, a + 3, a, a + 3, a + 2);
      this.idx.push(a, a + 3, a + 1, a, a + 2, a + 3);
    }
    this.n += n * 2;
  }

  /** Pyramid / cone (used for tents, spires, tree tops). */
  cone(x, y0, z, r, h, color, sides = 8, o = {}) {
    this.cyl(x, y0, z, r, h, color, { sides, rTop: 0.0001, noCap: true, ...o });
  }

  build() {
    if (!this.n) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setIndex(this.n > 65000 ? new THREE.Uint32BufferAttribute(this.idx, 1) : new THREE.Uint16BufferAttribute(this.idx, 1));
    g.computeBoundingSphere();
    g.computeBoundingBox();
    return g;
  }
}

// ---------------------------------------------------------------------------
// Builder: visuals + collision + gameplay hooks for one point of interest.
// ---------------------------------------------------------------------------

export class Builder {
  constructor(world, seed = 1) {
    this.world = world;
    this.col = world.collision;
    this.terrain = world.terrain;
    this.rng = mulberry32(seed);
    this.solid = new Batch(seed * 3 + 1);
    this.glow = new Batch(seed * 3 + 2);
    this.glass = new Batch(seed * 3 + 3);
    this.tower = new Batch(seed * 3 + 4);
    this.spots = []; // loot spawn points {x,y,z,kind,tag}
    this.buildings = []; // nav info for bots
    this.jumpPads = [];
    this.animated = []; // {obj, update(dt)} meshes added separately by the poi
    this.smokes = []; // chimneys and campfires: {x, y, z, kind} (the ambient layer emits smoke there)
    this.meshes = []; // extra non-batched objects
    this.lights = [];
  }

  h(x, z) {
    return this.terrain.height(x, z);
  }

  /** Solid axis-aligned box, centred in x/z, with bottom at y0. */
  box(cx, y0, cz, w, h, d, color, o = {}) {
    const x0 = cx - w / 2, x1 = cx + w / 2, z0 = cz - d / 2, z1 = cz + d / 2;
    (o.batch || this.solid).box(x0, y0, z0, x1, y0 + h, z1, color, o);
    if (o.solid === false) return null;
    return this.col.addBox(x0, o.colBottom ?? y0, z0, x1, y0 + h, z1, o.tag ?? 0);
  }

  /** Mark a rectangle for the minimap. */
  mapRect(x0, z0, x1, z1, color) {
    (this.world.mapRects ||= []).push({ x0, z0, x1, z1, color });
  }

  /** Box given by corner extents. */
  slab(x0, y0, z0, x1, y1, z1, color, o = {}) {
    (o.batch || this.solid).box(x0, y0, z0, x1, y1, z1, color, o);
    if (o.solid === false) return null;
    return this.col.addBox(x0, o.colBottom ?? y0, z0, x1, y1, z1, o.tag ?? 0);
  }

  glowBox(cx, y0, cz, w, h, d, color) {
    this.glow.box(cx - w / 2, y0, cz - d / 2, cx + w / 2, y0 + h, cz + d / 2, color, { jit: 0, ao: 1 });
  }

  /** Walkable ramp (visual wedge + collider). */
  ramp(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, color, o = {}) {
    this.solid.wedge(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, color, o);
    return this.col.addRamp(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, o.tag ?? 0);
  }

  /** Visual steps with a ramp collider (smooth to walk on). */
  stairs(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, color, o = {}) {
    const rise = hi - lo;
    const n = Math.max(2, Math.round(rise / 0.22));
    const len = axis === 'x' ? maxX - minX : maxZ - minZ;
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n;
      const top = lo + rise * t1;
      let a0, a1;
      if (lowAtMin) { a0 = t0; a1 = t1; } else { a0 = 1 - t1; a1 = 1 - t0; }
      if (axis === 'x') {
        this.solid.box(minX + a0 * len, bottom, minZ, minX + a1 * len, top, maxZ, color, { jit: 0.08, ao: 0.9, noBottom: true });
      } else {
        this.solid.box(minX, bottom, minZ + a0 * len, maxX, top, minZ + a1 * len, color, { jit: 0.08, ao: 0.9, noBottom: true });
      }
    }
    return this.col.addRamp(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, o.tag ?? 0);
  }

  cylinder(x, y0, z, r, h, color, o = {}) {
    (o.batch || this.solid).cyl(x, y0, z, r, h, color, o);
    if (o.solid === false) return null;
    return this.col.addCircle(x, z, r, y0, y0 + h, o.tag ?? 0);
  }

  /** Little helpers for set dressing ------------------------------------ */
  crate(x, z, size = 1, color = 0x8b6a3e, y0 = null) {
    const y = y0 ?? this.h(x, z);
    this.box(x, y, z, size, size, size, color, { jit: 0.1 });
    this.solid.box(x - size / 2 - 0.01, y + size * 0.45, z - size / 2 - 0.01, x + size / 2 + 0.01, y + size * 0.55, z + size / 2 + 0.01, 0x5d4527, { jit: 0.05, ao: 1 });
    return y + size;
  }
  barrel(x, z, color = 0x7a4b2a, y0 = null) {
    const y = y0 ?? this.h(x, z);
    this.cylinder(x, y, z, 0.42, 1.0, color, { sides: 9 });
    this.solid.cyl(x, y + 0.3, z, 0.44, 0.07, 0x2c2c2c, { sides: 9, noCap: true, ao: 1 });
    this.solid.cyl(x, y + 0.75, z, 0.44, 0.07, 0x2c2c2c, { sides: 9, noCap: true, ao: 1 });
  }
  hay(x, z, y0 = null) {
    const y = y0 ?? this.h(x, z);
    this.box(x, y, z, 1.6, 1.0, 1.1, 0xd4b45a, { jit: 0.08 });
  }

  /** Fence line between two points (axis aligned). */
  fence(x0, z0, x1, z1, color = 0x8a6a45, o = {}) {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(1, Math.round(len / 2.5));
    const dx = (x1 - x0) / n, dz = (z1 - z0) / n;
    const alongX = Math.abs(x1 - x0) > Math.abs(z1 - z0);
    for (let i = 0; i <= n; i++) {
      const x = x0 + dx * i, z = z0 + dz * i;
      const y = this.h(x, z);
      this.solid.box(x - 0.08, y - 0.1, z - 0.08, x + 0.08, y + 1.25, z + 0.08, color, { jit: 0.1 });
    }
    // rails: collide, so livestock-style fences actually block
    for (const ry of o.rails ?? [0.45, 0.95]) {
      for (let i = 0; i < n; i++) {
        const xa = x0 + dx * i, za = z0 + dz * i, xb = xa + dx, zb = za + dz;
        const y = (this.h(xa, za) + this.h(xb, zb)) / 2 + ry;
        const t = 0.06;
        if (alongX) {
          this.slab(Math.min(xa, xb), y, za - t, Math.max(xa, xb), y + 0.12, za + t, color, { solid: false });
        } else {
          this.slab(xa - t, y, Math.min(za, zb), xa + t, y + 0.12, Math.max(za, zb), color, { solid: false });
        }
      }
    }
    if (o.solid !== false) {
      // one thin collider for the whole run (shootable & climbable only by jumping)
      const t = 0.1;
      const yb = Math.min(this.h(x0, z0), this.h(x1, z1)) - 0.5;
      this.col.addBox(Math.min(x0, x1) - t, yb, Math.min(z0, z1) - t, Math.max(x0, x1) + t, yb + 2.0, Math.max(z0, z1) + t, 0);
    }
  }

  chest(x, y, z, yaw = 0) {
    this.world.chestSpots.push({ x, y, z, yaw, poi: this.poiId });
  }
  floorLoot(x, y, z, elevated = false, tag = null) {
    this.world.lootSpots.push({ x, y, z, elevated, poi: this.poiId, tag });
  }

  // ----------------------------------------------------------------------
  // Generic building. Returns a descriptor used for bot navigation.
  // ----------------------------------------------------------------------
  building(o) {
    const T = o.wallT ?? 0.3;
    const floors = o.floors ?? 1;
    const fh = o.floorH ?? 3.2;
    const w = o.w, d = o.d;
    const x0 = o.x - w / 2, x1 = o.x + w / 2, z0 = o.z - d / 2, z1 = o.z + d / 2;
    const corners = [[x0, z0], [x1, z0], [x0, z1], [x1, z1], [o.x, o.z]];
    const y0 = o.y ?? Math.max(...corners.map(([cx, cz]) => this.h(cx, cz))) - 0.02;
    const wallColor = o.color ?? 0xa08060;
    const trim = o.trim ?? 0x4a3a2a;
    const floorColor = o.floorColor ?? 0x6e5238;
    const roofType = o.roof ?? 'flat';
    const doorW = o.doorW ?? 1.9, doorH = o.doorH ?? 2.5;
    const H = floors * fh;
    const Y = (k) => y0 + 0.12 + k * fh; // floor surface of level k
    const top = Y(floors); // underside of a flat roof slab sits at top - slab thickness
    const wallTop = roofType === 'flat' ? top : y0 + 0.12 + H;

    // foundation + ground floor
    this.slab(x0 - 0.25, y0 - 1.4, z0 - 0.25, x1 + 0.25, y0 + 0.12, z1 + 0.25, o.baseColor ?? 0x777066, { colBottom: y0 - 1.4, jit: 0.04, uvScale: 3 });
    this.solid.box(x0 + T, y0 + 0.119, z0 + T, x1 - T, y0 + 0.125, z1 - T, floorColor, { jit: 0.03, ao: 1, noBottom: true });

    // doors: array of {side, off}
    const doors = (o.doors ?? [{ side: 'S', off: 0 }]).map((dd) => ({ ...dd }));
    const doorOn = (side) => doors.filter((dd) => dd.side === side);
    const wallBottom = y0 - 1.0;
    const lintelBase = Y(0) + doorH;
    const wallBatch = o.batch || this.solid;

    const addWall = (ax0, az0, ax1, az1, side) => {
      // horizontal run [ax0..ax1]x[az0..az1] with gaps for doors
      const alongX = side === 'N' || side === 'S';
      const lo = alongX ? ax0 : az0, hi = alongX ? ax1 : az1;
      const gaps = doorOn(side).map((dd) => {
        const c = (alongX ? o.x : o.z) + (dd.off || 0);
        return [c - doorW / 2, c + doorW / 2];
      }).sort((a, b) => a[0] - b[0]);
      let cur = lo;
      const seg = (a, b) => {
        if (b - a < 0.05) return;
        if (alongX) this.slab(a, wallBottom, az0, b, wallTop, az1, wallColor, { batch: wallBatch, colBottom: y0, uvScale: o.uvScale ?? 2.5 });
        else this.slab(ax0, wallBottom, a, ax1, wallTop, b, wallColor, { batch: wallBatch, colBottom: y0, uvScale: o.uvScale ?? 2.5 });
      };
      for (const [ga, gb] of gaps) {
        seg(cur, ga);
        // lintel
        if (alongX) this.slab(ga, lintelBase, az0, gb, wallTop, az1, wallColor, { batch: wallBatch, colBottom: lintelBase });
        else this.slab(ax0, lintelBase, ga, ax1, wallTop, gb, wallColor, { batch: wallBatch, colBottom: lintelBase });
        // door frame
        const ft = 0.1;
        if (alongX) {
          this.solid.box(ga - ft, Y(0), az0 - 0.04, ga, lintelBase, az1 + 0.04, trim, { ao: 1 });
          this.solid.box(gb, Y(0), az0 - 0.04, gb + ft, lintelBase, az1 + 0.04, trim, { ao: 1 });
        } else {
          this.solid.box(ax0 - 0.04, Y(0), ga - ft, ax1 + 0.04, lintelBase, ga, trim, { ao: 1 });
          this.solid.box(ax0 - 0.04, Y(0), gb, ax1 + 0.04, lintelBase, gb + ft, trim, { ao: 1 });
        }
        cur = gb;
      }
      seg(cur, hi);
    };
    addWall(x0, z0, x1, z0 + T, 'N');
    addWall(x0, z1 - T, x1, z1, 'S');
    addWall(x0, z0 + T, x0 + T, z1 - T, 'W');
    addWall(x1 - T, z0 + T, x1, z1 - T, 'E');

    // trim bands / corner posts
    if (o.corners !== false) {
      for (const [cx, cz] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) {
        this.solid.box(cx - 0.18, y0 - 0.2, cz - 0.18, cx + 0.18, wallTop + 0.05, cz + 0.18, trim, { jit: 0.04, ao: 0.9 });
      }
    }
    if (o.band) {
      for (let k = 1; k <= floors; k++) {
        const yb = Y(k) - 0.35;
        this.solid.box(x0 - 0.06, yb, z0 - 0.06, x1 + 0.06, yb + 0.35, z1 + 0.06, trim, { jit: 0.02, ao: 1 });
      }
    }

    // windows (visual glass)
    if (o.windows !== false) {
      const spacing = o.windowSpacing ?? 3.6;
      for (let k = 0; k < floors; k++) {
        const wy = Y(k) + 0.95, wh = o.windowH ?? 1.25, ww = o.windowW ?? 1.3;
        for (const side of ['N', 'S', 'E', 'W']) {
          const alongX = side === 'N' || side === 'S';
          const len = alongX ? w : d;
          const n = Math.max(1, Math.floor((len - 1.6) / spacing));
          for (let i = 0; i < n; i++) {
            const c = ((i + 0.5) / n - 0.5) * (len - 1.2);
            const cc = (alongX ? o.x : o.z) + c;
            if (k === 0 && doorOn(side).some((dd) => Math.abs((alongX ? o.x : o.z) + (dd.off || 0) - cc) < doorW / 2 + ww / 2 + 0.2)) continue;
            const out = 0.03;
            if (alongX) {
              const zz = side === 'N' ? z0 : z1;
              const dz = side === 'N' ? -out : out;
              this.solid.box(cc - ww / 2 - 0.1, wy - 0.1, Math.min(zz, zz + dz) - 0.02, cc + ww / 2 + 0.1, wy + wh + 0.1, Math.max(zz, zz + dz) + 0.02, trim, { ao: 1, jit: 0.03 });
              this.glass.box(cc - ww / 2, wy, Math.min(zz, zz + dz * 2.2), cc + ww / 2, wy + wh, Math.max(zz, zz + dz * 2.2), 0x6fa4c8, { ao: 1, jit: 0 });
            } else {
              const xx = side === 'W' ? x0 : x1;
              const dx = side === 'W' ? -out : out;
              this.solid.box(Math.min(xx, xx + dx) - 0.02, wy - 0.1, cc - ww / 2 - 0.1, Math.max(xx, xx + dx) + 0.02, wy + wh + 0.1, cc + ww / 2 + 0.1, trim, { ao: 1, jit: 0.03 });
              this.glass.box(Math.min(xx, xx + dx * 2.2), wy, cc - ww / 2, Math.max(xx, xx + dx * 2.2), wy + wh, cc + ww / 2, 0x6fa4c8, { ao: 1, jit: 0 });
            }
          }
        }
      }
    }

    // stairs + slabs between floors
    const iX0 = x0 + T, iX1 = x1 - T, iZ0 = z0 + T, iZ1 = z1 - T;
    const sw = 1.8;
    const stairs = [];
    const needStairsTo = roofType === 'flat' ? floors : floors - 1;
    for (let k = 0; k < needStairsTo; k++) {
      const rise = fh;
      const L = rise / 0.55;
      const even = k % 2 === 0;
      const sx0 = even ? iX0 : iX1 - sw, sx1 = even ? iX0 + sw : iX1;
      const sz0 = even ? iZ0 : iZ1 - L, sz1 = even ? iZ0 + L : iZ1;
      this.stairs(sx0, sz0, sx1, sz1, Y(k), Y(k + 1), 'z', !even, Y(k) - 0.1, o.stairColor ?? 0x75604a);
      // slab above this stair run (level k+1), hole over the stairs
      const yS = Y(k + 1);
      const slabC = o.slabColor ?? 0x8a8a86;
      if (roofType === 'flat' && k + 1 === floors) {
        // the roof code below builds this slab (with the same hole)
      } else if (even) {
        this.slab(sx1, yS - 0.25, iZ0, iX1, yS, iZ1, slabC, { colBottom: yS - 0.25, jit: 0.03 });
        this.slab(sx0, yS - 0.25, sz1, sx1, yS, iZ1, slabC, { colBottom: yS - 0.25, jit: 0.03 });
      } else {
        this.slab(iX0, yS - 0.25, iZ0, sx0, yS, iZ1, slabC, { colBottom: yS - 0.25, jit: 0.03 });
        this.slab(sx0, yS - 0.25, iZ0, sx1, yS, sz0, slabC, { colBottom: yS - 0.25, jit: 0.03 });
      }
      // railing posts (visual) around the hole edge
      stairs.push({
        k,
        lowX: (sx0 + sx1) / 2, lowZ: even ? sz1 - 0.6 : sz0 + 0.6, lowY: Y(k),
        highX: (sx0 + sx1) / 2, highZ: even ? sz0 + 0.6 : sz1 - 0.6, highY: Y(k + 1),
        entryX: even ? sx1 + 0.9 : sx0 - 0.9, entryZ: even ? sz1 - 0.6 : sz0 + 0.6,
      });
    }
    // slab k+1 for floors without stairs (e.g. gable roofs with 1 floor): none needed.

    // roof
    if (roofType === 'flat') {
      const par = o.parapet ?? 0.9;
      if (par > 0) {
        const yp = top;
        this.solid.box(x0 - 0.15, yp, z0 - 0.15, x1 + 0.15, yp + par, z0 + 0.12, wallColor, { ao: 0.9 });
        this.solid.box(x0 - 0.15, yp, z1 - 0.12, x1 + 0.15, yp + par, z1 + 0.15, wallColor, { ao: 0.9 });
        this.solid.box(x0 - 0.15, yp, z0 + 0.12, x0 + 0.12, yp + par, z1 - 0.12, wallColor, { ao: 0.9 });
        this.solid.box(x1 - 0.12, yp, z0 + 0.12, x1 + 0.15, yp + par, z1 - 0.12, wallColor, { ao: 0.9 });
        // parapet collision (one box per edge, 0.9 high)
        this.col.addBox(x0 - 0.15, yp, z0 - 0.15, x1 + 0.15, yp + par, z0 + 0.12);
        this.col.addBox(x0 - 0.15, yp, z1 - 0.12, x1 + 0.15, yp + par, z1 + 0.15);
        this.col.addBox(x0 - 0.15, yp, z0 + 0.12, x0 + 0.12, yp + par, z1 - 0.12);
        this.col.addBox(x1 - 0.12, yp, z0 + 0.12, x1 + 0.15, yp + par, z1 - 0.12);
      }
      // roof slab (with hole over the last staircase when present)
      const roofC = o.roofColor ?? 0x5f5a55;
      const lastStair = stairs.find((s) => s.k === floors - 1);
      if (lastStair) {
        const even = (floors - 1) % 2 === 0;
        const sx0 = even ? iX0 : iX1 - sw, sx1 = even ? iX0 + sw : iX1;
        const L = fh / 0.55;
        // outer ring of the slab: cover wall tops too
        if (even) {
          this.slab(sx1, top - 0.25, z0, x1, top, z1, roofC, { colBottom: top - 0.25 });
          this.slab(x0, top - 0.25, z0, sx0, top, z1, roofC, { colBottom: top - 0.25 });
          this.slab(sx0, top - 0.25, z0, sx1, top, iZ0, roofC, { colBottom: top - 0.25 });
          this.slab(sx0, top - 0.25, iZ0 + L, sx1, top, z1, roofC, { colBottom: top - 0.25 });
        } else {
          this.slab(x0, top - 0.25, z0, sx0, top, z1, roofC, { colBottom: top - 0.25 });
          this.slab(sx1, top - 0.25, z0, x1, top, z1, roofC, { colBottom: top - 0.25 });
          this.slab(sx0, top - 0.25, z0, sx1, top, iZ1 - L, roofC, { colBottom: top - 0.25 });
          this.slab(sx0, top - 0.25, iZ1, sx1, top, z1, roofC, { colBottom: top - 0.25 });
        }
      } else {
        this.slab(x0, top - 0.25, z0, x1, top, z1, roofC, { colBottom: top - 0.25 });
      }
    } else if (roofType === 'gable') {
      const over = 0.5;
      const axis = o.ridge ?? (w >= d ? 'x' : 'z');
      const rise = o.rise ?? Math.min(w, d) * 0.3;
      const gx0 = x0 - (axis === 'x' ? over : 0.2), gx1 = x1 + (axis === 'x' ? over : 0.2);
      const gz0 = z0 - (axis === 'x' ? 0.2 : over), gz1 = z1 + (axis === 'x' ? 0.2 : over);
      const roofC = o.roofColor ?? 0x6b3b2b;
      this.solid.gable(gx0, gz0, gx1, gz1, wallTop, rise, axis, roofC, { uvScale: 2 });
      // collision: two ramps meeting at the ridge, walkable
      if (axis === 'x') {
        const zm = (gz0 + gz1) / 2;
        this.col.addRamp(gx0, gz0, gx1, zm, wallTop, wallTop + rise, 'z', true, wallTop - 0.3);
        this.col.addRamp(gx0, zm, gx1, gz1, wallTop, wallTop + rise, 'z', false, wallTop - 0.3);
      } else {
        const xm = (gx0 + gx1) / 2;
        this.col.addRamp(gx0, gz0, xm, gz1, wallTop, wallTop + rise, 'x', true, wallTop - 0.3);
        this.col.addRamp(xm, gz0, gx1, gz1, wallTop, wallTop + rise, 'x', false, wallTop - 0.3);
      }
      if (o.chimney) {
        const cx = x1 - 1.2, cz = o.z;
        this.solid.box(cx - 0.45, y0 - 0.5, cz - 0.45, cx + 0.45, wallTop + rise + 1.0, cz + 0.45, 0x80766c, { ao: 0.85 });
        this.col.addBox(cx - 0.45, y0, cz - 0.45, cx + 0.45, wallTop + rise + 1.0, cz + 0.45);
        this.smokes.push({ x: cx, y: wallTop + rise + 1.1, z: o.z, kind: 'chimney' });
      }
    }

    // loot ------------------------------------------------------------------
    const desc = {
      id: o.id || 'b', x: o.x, z: o.z, minX: x0, maxX: x1, minZ: z0, maxZ: z1,
      y0: Y(0), floors, floorH: fh, doors: [], stairs, roofAccess: roofType === 'flat' && floors > 0,
      topY: top,
    };
    for (const dd of doors) {
      const alongX = dd.side === 'N' || dd.side === 'S';
      const c = (alongX ? o.x : o.z) + (dd.off || 0);
      const sgn = dd.side === 'N' || dd.side === 'W' ? -1 : 1;
      const wx = alongX ? c : dd.side === 'W' ? x0 + T / 2 : x1 - T / 2;
      const wz = alongX ? (dd.side === 'N' ? z0 + T / 2 : z1 - T / 2) : c;
      desc.doors.push({
        x: wx, z: wz,
        outX: alongX ? wx : wx + sgn * 2.2, outZ: alongX ? wz + sgn * 2.2 : wz,
        inX: alongX ? wx : wx - sgn * 1.8, inZ: alongX ? wz - sgn * 1.8 : wz,
      });
    }
    this.buildings.push(desc);
    this.world.buildings.push(desc);
    return desc;
  }

  /** Place loot spots + chests inside a building descriptor. */
  stockBuilding(b, { chests = 1, floorSpots = 2, upper = true, rng = this.rng } = {}) {
    const pad = 1.0;
    const stairZoneX = (k) => (k % 2 === 0 ? [b.minX + 0.3, b.minX + 2.5] : [b.maxX - 2.5, b.maxX - 0.3]);
    const place = (level, isChest) => {
      for (let tries = 0; tries < 12; tries++) {
        const x = b.minX + pad + 0.4 + rng() * (b.maxX - b.minX - 2 * pad - 0.8);
        const z = b.minZ + pad + 0.4 + rng() * (b.maxZ - b.minZ - 2 * pad - 0.8);
        // stay clear of stair shafts
        let bad = false;
        for (let k = 0; k < b.stairs.length; k++) {
          const [sa, sb] = stairZoneX(k);
          if (x > sa - 0.8 && x < sb + 0.8) bad = true;
        }
        if (bad) continue;
        const y = b.y0 + level * b.floorH;
        if (isChest) this.chest(x, y, z, Math.floor(rng() * 4) * Math.PI / 2);
        else this.floorLoot(x, y, z, level > 0);
        return;
      }
    };
    for (let i = 0; i < chests; i++) place(0, true);
    for (let i = 0; i < floorSpots; i++) place(0, false);
    if (upper && b.floors > 1) {
      for (let k = 1; k < b.floors; k++) {
        place(k, rng() < 0.7);
        place(k, false);
      }
      if (b.roofAccess && rng() < 0.7) place(b.floors, rng() < 0.5);
    }
  }
}


// ---------------------------------------------------------------------------
// Signs: canvas-textured planes for shop fronts / landmarks.
// ---------------------------------------------------------------------------

const signMats = new Map();
export function makeSign(text, w, h, { bg = '#3a2616', fg = '#f4d58a', border = '#1a0f08', font = 'bold 64px Georgia, serif', glow = false } = {}) {
  const key = [text, bg, fg, font].join('|');
  let mat = signMats.get(key);
  if (!mat) {
    const cv = document.createElement('canvas');
    const ratio = w / h;
    cv.width = 512;
    cv.height = Math.max(32, Math.round(512 / ratio));
    const ctx = cv.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = border;
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, cv.width - 10, cv.height - 10);
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // shrink the font until the text fits
    let size = Math.floor(cv.height * 0.6);
    do {
      ctx.font = font.replace(/\d+px/, size + 'px');
      size -= 2;
    } while (ctx.measureText(text).width > cv.width - 40 && size > 10);
    ctx.fillText(text, cv.width / 2, cv.height / 2 + 2);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    mat = glow ? new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8, side: THREE.DoubleSide });
    signMats.set(key, mat);
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.castShadow = false;
  return m;
}
