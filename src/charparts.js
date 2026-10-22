import * as THREE from 'three';

// ---------------------------------------------------------------------------
// PartBuilder: accumulates vertex-coloured primitives (boxes, frustums, cylinders, ellipsoids)
// into one BufferGeometry. Every rigid body part of a character is one merged mesh built with it.
// ---------------------------------------------------------------------------

const colorCache = new Map();
function toRGB(c) {
  if (Array.isArray(c)) return c;
  let v = colorCache.get(c);
  if (!v) {
    const t = new THREE.Color(c);
    v = [t.r, t.g, t.b];
    colorCache.set(c, v);
  }
  return v;
}

/** Scales a colour (hex or [r,g,b]) towards black (k < 1) or white (k > 1) and returns [r,g,b]. */
export function shade(c, k) {
  const [r, g, b] = toRGB(c);
  if (k <= 1) return [r * k, g * k, b * k];
  const t = k - 1;
  return [r + (1 - r) * t, g + (1 - g) * t, b + (1 - b) * t];
}

/** Mixes two colours. */
export function mix(a, b, t) {
  const A = toRGB(a), B = toRGB(b);
  return [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t];
}

// face ids (bit flags for `skip`)
export const F = { R: 1, L: 2, T: 4, D: 8, BACK: 16, FRONT: 32 };

// corner indices of the 6 faces of a box, counter-clockwise seen from outside
//   corners: 0..3 = bottom (-x-z, +x-z, +x+z, -x+z), 4..7 = top (same order)
const FACES = [
  [1, 2, 6, 5], // +X
  [3, 0, 4, 7], // -X
  [4, 5, 6, 7], // +Y
  [3, 2, 1, 0], // -Y
  [2, 3, 7, 6], // +Z (back of the character)
  [0, 1, 5, 4], // -Z (front)
];

const _m = new THREE.Matrix4();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _n = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);
const _corner = [0, 1, 2, 3, 4, 5, 6, 7].map(() => new THREE.Vector3());

export class PartBuilder {
  constructor() {
    this.pos = [];
    this.nor = [];
    this.col = [];
    this.idx = [];
    this.n = 0;
    this.ox = 0; this.oy = 0; this.oz = 0; // origin offset applied to every primitive
    this.sx = 1; // set to -1 to mirror everything across the YZ plane (left side parts)
  }

  /** Runs `fn` with all primitives offset by (x, y, z). */
  at(x, y, z, fn) {
    const ox = this.ox, oy = this.oy, oz = this.oz;
    this.ox += x * this.sx; this.oy += y; this.oz += z;
    fn(this);
    this.ox = ox; this.oy = oy; this.oz = oz;
    return this;
  }

  _quad(a, b, c, d, rgb, ao) {
    // a,b,c,d: Vector3 part-space positions. ao: brightness multipliers for a,b,c,d
    _a.subVectors(c, a);
    _b.subVectors(d, b);
    _n.crossVectors(_a, _b).normalize();
    const base = this.n;
    const pts = [a, b, c, d];
    for (let i = 0; i < 4; i++) {
      const p = pts[i];
      this.pos.push(p.x, p.y, p.z);
      this.nor.push(_n.x, _n.y, _n.z);
      const f = ao[i];
      this.col.push(rgb[0] * f, rgb[1] * f, rgb[2] * f);
    }
    this.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    this.n += 4;
  }

  /**
   * Box (optionally a frustum) centred at (cx, cy, cz).
   * o.taper = [kx, kz] scales the top face; o.rot = [rx, ry, rz] Euler XYZ about the centre;
   * o.skip = bitmask of F.* faces to leave out; o.ao = brightness of the bottom vertices.
   */
  box(cx, cy, cz, w, h, d, color, o = {}) {
    const rgb = toRGB(color);
    const [tx, tz] = o.taper || [1, 1];
    const hw = w / 2, hh = h / 2, hd = d / 2;
    const bx = o.shiftTop ? o.shiftTop[0] : 0, bz = o.shiftTop ? o.shiftTop[1] : 0;
    const sgn = this.sx;
    const c = _corner;
    c[0].set(-hw, -hh, -hd); c[1].set(hw, -hh, -hd); c[2].set(hw, -hh, hd); c[3].set(-hw, -hh, hd);
    c[4].set(-hw * tx + bx, hh, -hd * tz + bz); c[5].set(hw * tx + bx, hh, -hd * tz + bz);
    c[6].set(hw * tx + bx, hh, hd * tz + bz); c[7].set(-hw * tx + bx, hh, hd * tz + bz);
    if (o.rot) {
      _e.set(o.rot[0] || 0, (o.rot[1] || 0) * sgn, (o.rot[2] || 0) * sgn, 'XYZ');
      _m.makeRotationFromEuler(_e);
      for (let i = 0; i < 8; i++) c[i].applyMatrix4(_m);
    }
    for (let i = 0; i < 8; i++) c[i].set(c[i].x * sgn + cx * sgn + this.ox, c[i].y + cy + this.oy, c[i].z + cz + this.oz);
    const skip = o.skip || 0;
    const ao = o.ao ?? 0.78;
    const mid = o.aoTop ?? 1;
    const flip = sgn < 0;
    for (let f = 0; f < 6; f++) {
      if (skip & (1 << f)) continue;
      const fc = FACES[f];
      const A = c[fc[0]], B = c[fc[1]], C = c[fc[2]], D = c[fc[3]];
      // vertical faces: lower vertices darker; top faces full; bottom faces dark
      let fa;
      if (f === 2) fa = [mid, mid, mid, mid];
      else if (f === 3) fa = [ao, ao, ao, ao];
      else fa = [ao, ao, mid, mid];
      if (flip) this._quad(D, C, B, A, rgb, [fa[3], fa[2], fa[1], fa[0]]);
      else this._quad(A, B, C, D, rgb, fa);
    }
    return this;
  }

  /** Vertical cylinder / cone frustum (axis Y) with `sides` facets; rTop = 0 gives a cone. */
  cyl(cx, cy, cz, rBottom, rTop, h, color, o = {}) {
    const rgb = toRGB(color);
    const sides = o.sides ?? 8;
    const sgn = this.sx;
    const ao = o.ao ?? 0.8;
    const hh = h / 2;
    const ring = [];
    if (o.rot) { _e.set(o.rot[0] || 0, (o.rot[1] || 0) * sgn, (o.rot[2] || 0) * sgn, 'XYZ'); _m.makeRotationFromEuler(_e); } else _m.identity();
    const tp = (x, y, z) => {
      _p.set(x * (o.scaleX ?? 1), y, z * (o.scaleZ ?? 1)).applyMatrix4(_m);
      return [(_p.x + cx) * sgn + this.ox, _p.y + cy + this.oy, _p.z + cz + this.oz];
    };
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      ring.push([Math.cos(a), Math.sin(a)]);
    }
    const slope = (rBottom - rTop) / h;
    for (let i = 0; i < sides; i++) {
      const j = (i + 1) % sides;
      const [c0, s0] = ring[i], [c1, s1] = ring[j];
      const p0 = tp(c0 * rBottom, -hh, s0 * rBottom), p1 = tp(c1 * rBottom, -hh, s1 * rBottom);
      const p2 = tp(c1 * rTop, hh, s1 * rTop), p3 = tp(c0 * rTop, hh, s0 * rTop);
      const base = this.n;
      const am = (c0 + c1) / 2, sm = (s0 + s1) / 2;
      _n.set(am, slope, sm).normalize().transformDirection(_m);
      _n.x *= sgn;
      const verts = sgn < 0 ? [p3, p2, p1, p0] : [p0, p1, p2, p3];
      const fa = sgn < 0 ? [1, 1, ao, ao] : [ao, ao, 1, 1];
      for (let k = 0; k < 4; k++) {
        const p = verts[k];
        this.pos.push(p[0], p[1], p[2]);
        this.nor.push(_n.x, _n.y, _n.z);
        this.col.push(rgb[0] * fa[k], rgb[1] * fa[k], rgb[2] * fa[k]);
      }
      // winding: (p0, p1, p2) is counter-clockwise from outside for sgn > 0
      this.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
      this.n += 4;
    }
    if (rTop > 0.002 && !(o.noTop)) this._cap(tp, ring, rTop, hh, rgb, 1, 1, sgn);
    if (rBottom > 0.002 && !(o.noBottom)) this._cap(tp, ring, rBottom, -hh, rgb, ao, -1, sgn);
    return this;
  }

  _cap(tp, ring, r, y, rgb, f, dir, sgn) {
    const base = this.n;
    const centre = tp(0, y, 0);
    const up = _n.set(0, dir, 0).transformDirection(_m);
    const nx = up.x * sgn, ny = up.y, nz = up.z;
    this.pos.push(centre[0], centre[1], centre[2]); this.nor.push(nx, ny, nz); this.col.push(rgb[0] * f, rgb[1] * f, rgb[2] * f);
    for (let i = 0; i < ring.length; i++) {
      const p = tp(ring[i][0] * r, y, ring[i][1] * r);
      this.pos.push(p[0], p[1], p[2]); this.nor.push(nx, ny, nz); this.col.push(rgb[0] * f, rgb[1] * f, rgb[2] * f);
    }
    const n = ring.length;
    const flip = (dir > 0) === (sgn > 0);
    for (let i = 0; i < n; i++) {
      const a = base + 1 + i, b = base + 1 + ((i + 1) % n);
      if (flip) this.idx.push(base, b, a); else this.idx.push(base, a, b);
    }
    this.n += n + 1;
  }

  /** Low-poly ellipsoid (UV sphere with `seg` segments). */
  ball(cx, cy, cz, rx, ry, rz, color, o = {}) {
    const rgb = toRGB(color);
    const seg = o.seg ?? 6, rings = o.rings ?? 4;
    const sgn = this.sx;
    const ao = o.ao ?? 0.8;
    const base = this.n;
    for (let j = 0; j <= rings; j++) {
      const v = j / rings;
      const phi = v * Math.PI;
      const y = Math.cos(phi), r = Math.sin(phi);
      for (let i = 0; i <= seg; i++) {
        const th = (i / seg) * Math.PI * 2;
        const x = Math.cos(th) * r, z = Math.sin(th) * r;
        this.pos.push((cx + x * rx) * sgn + this.ox, cy + y * ry + this.oy, cz + z * rz + this.oz);
        _n.set(x / rx, y / ry, z / rz).normalize();
        this.nor.push(_n.x * sgn, _n.y, _n.z);
        const f = ao + (1 - ao) * (0.5 + 0.5 * y);
        this.col.push(rgb[0] * f, rgb[1] * f, rgb[2] * f);
      }
    }
    const row = seg + 1;
    for (let j = 0; j < rings; j++) {
      for (let i = 0; i < seg; i++) {
        const a = base + j * row + i, b = a + 1, c = a + row, d = c + 1;
        if (sgn > 0) this.idx.push(a, b, c, b, d, c); else this.idx.push(a, c, b, b, c, d);
      }
    }
    this.n += (rings + 1) * (seg + 1);
    return this;
  }

  /** Thin box between two points (cables, straps); p0/p1 are [x, y, z]. */
  line(p0, p1, thick, color, o = {}) {
    _a.set(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);
    const len = _a.length();
    _b.copy(_a).normalize();
    _q.setFromUnitVectors(_up, _b);
    _e.setFromQuaternion(_q, 'XYZ');
    return this.box((p0[0] + p1[0]) / 2 * this.sx, (p0[1] + p1[1]) / 2, (p0[2] + p1[2]) / 2, thick, len, thick, color, { ...o, rot: [_e.x, _e.y * this.sx, _e.z * this.sx] });
  }

  /** Builds the BufferGeometry (positions, normals, vertex colours, 16-bit indices). */
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.pos), 3));
    g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(this.nor), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(this.col), 3));
    g.setIndex(new THREE.BufferAttribute(this.n > 65000 ? new Uint32Array(this.idx) : new Uint16Array(this.idx), 1));
    g.computeBoundingSphere();
    return g;
  }
}

let sharedMat = null;
/** The single material every character part shares (vertex colours carry all the colour). */
export function partMaterial() {
  if (!sharedMat) sharedMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0.04 });
  return sharedMat;
}
