import { WORLD } from './terrain.js';

// Static collision world. Three collider shapes, all described by a footprint
// (for the spatial hash), a vertical extent and a "top surface" function:
//   BOX    flat top, axis-aligned
//   RAMP   top surface slopes linearly along x or z (stairs, roofs, quarter pipes)
//   CIRCLE vertical cylinder (tree trunks, rocks, pillars)

export const BOX = 0, RAMP = 1, CIRCLE = 2;
const CELL = 8;
const CELLS = WORLD.size / CELL;

const INF = Infinity;

export class CollisionWorld {
  constructor(terrain) {
    this.terrain = terrain;
    this.grid = new Array(CELLS * CELLS).fill(null);
    this.all = [];
    this.rayId = 0;
  }

  _ci(v) {
    const i = Math.floor((v + WORLD.half) / CELL);
    return i < 0 ? 0 : i >= CELLS ? CELLS - 1 : i;
  }

  _insert(c) {
    const x0 = this._ci(c.minX), x1 = this._ci(c.maxX), z0 = this._ci(c.minZ), z1 = this._ci(c.maxZ);
    for (let z = z0; z <= z1; z++) {
      for (let x = x0; x <= x1; x++) {
        const k = z * CELLS + x;
        (this.grid[k] || (this.grid[k] = [])).push(c);
      }
    }
    c.rs = 0;
    this.all.push(c);
    return c;
  }

  addBox(minX, minY, minZ, maxX, maxY, maxZ, tag = 0) {
    return this._insert({ t: BOX, minX, maxX, minZ, maxZ, minY, maxY, tag });
  }

  /**
   * Ramp over [minX,maxX]x[minZ,maxZ]. The surface height is `lo` at the
   * `from` end and `hi` at the opposite end along `axis` ('x' or 'z').
   * `from` is the coordinate of the low end.  bottom = underside of the solid.
   */
  addRamp(minX, minZ, maxX, maxZ, lo, hi, axis, lowAtMin, bottom, tag = 0) {
    const ax = axis === 'x' ? 0 : 1;
    const s0 = ax === 0 ? (lowAtMin ? minX : maxX) : lowAtMin ? minZ : maxZ;
    const len = ax === 0 ? maxX - minX : maxZ - minZ;
    const dir = lowAtMin ? 1 : -1;
    const k = ((hi - lo) / len) * dir; // dy per metre of coordinate
    return this._insert({
      t: RAMP, minX, maxX, minZ, maxZ, minY: bottom, maxY: Math.max(lo, hi), tag,
      ax, s0, k, base: lo,
    });
  }

  addCircle(x, z, r, minY, maxY, tag = 0) {
    return this._insert({ t: CIRCLE, minX: x - r, maxX: x + r, minZ: z - r, maxZ: z + r, minY, maxY, cx: x, cz: z, r, tag });
  }

  // -- surface helpers ---------------------------------------------------

  surfaceAt(c, x, z) {
    if (c.t === CIRCLE) {
      const dx = x - c.cx, dz = z - c.cz;
      return dx * dx + dz * dz <= c.r * c.r ? c.maxY : -INF;
    }
    if (x < c.minX || x > c.maxX || z < c.minZ || z > c.maxZ) return -INF;
    if (c.t === BOX) return c.maxY;
    return c.base + c.k * ((c.ax === 0 ? x : z) - c.s0);
  }

  /** Highest walkable surface under (x,z): terrain or any collider top within `stepUp` of feetY. */
  groundAt(x, z, feetY, stepUp) {
    let g = this.terrain.height(x, z);
    const list = this.grid[this._ci(z) * CELLS + this._ci(x)];
    if (list) {
      const limit = feetY + stepUp;
      for (let i = 0; i < list.length; i++) {
        const c = list[i];
        const s = this.surfaceAt(c, x, z);
        if (s > g && s <= limit) g = s;
      }
    }
    return g;
  }

  /** Lowest solid underside above the head at (x,z), or Infinity. */
  ceilingAt(x, z, headY, r = 0.25) {
    let best = INF;
    const x0 = this._ci(x - r), x1 = this._ci(x + r), z0 = this._ci(z - r), z1 = this._ci(z + r);
    for (let cz = z0; cz <= z1; cz++) {
      for (let cx = x0; cx <= x1; cx++) {
        const list = this.grid[cz * CELLS + cx];
        if (!list) continue;
        for (let i = 0; i < list.length; i++) {
          const c = list[i];
          if (c.minY < headY - 0.05 || c.minY >= best) continue;
          if (x + r < c.minX || x - r > c.maxX || z + r < c.minZ || z - r > c.maxZ) continue;
          best = c.minY;
        }
      }
    }
    return best;
  }

  /**
   * Push a vertical capsule (circle radius r at pos.x/z, standing at pos.y with
   * the given height) out of any blocking collider. Returns true if pushed.
   */
  resolve(pos, r, height, stepUp) {
    let pushed = false;
    const feet = pos.y;
    for (let pass = 0; pass < 3; pass++) {
      let any = false;
      const x0 = this._ci(pos.x - r), x1 = this._ci(pos.x + r), z0 = this._ci(pos.z - r), z1 = this._ci(pos.z + r);
      for (let cz = z0; cz <= z1; cz++) {
        for (let cx = x0; cx <= x1; cx++) {
          const list = this.grid[cz * CELLS + cx];
          if (!list) continue;
          for (let i = 0; i < list.length; i++) {
            const c = list[i];
            if (c.minY >= feet + height - 0.1) continue; // overhead
            if (c.maxY <= feet + stepUp) continue; // low enough to step on
            if (c.t === CIRCLE) {
              const dx = pos.x - c.cx, dz = pos.z - c.cz;
              const d2 = dx * dx + dz * dz, rr = r + c.r;
              if (d2 >= rr * rr) continue;
              const d = Math.sqrt(d2) || 0.0001;
              const push = (rr - d) / d;
              pos.x += dx * push; pos.z += dz * push;
              any = true;
              continue;
            }
            if (pos.x + r <= c.minX || pos.x - r >= c.maxX || pos.z + r <= c.minZ || pos.z - r >= c.maxZ) continue;
            const qx = pos.x < c.minX ? c.minX : pos.x > c.maxX ? c.maxX : pos.x;
            const qz = pos.z < c.minZ ? c.minZ : pos.z > c.maxZ ? c.maxZ : pos.z;
            if (c.t === RAMP) {
              const top = c.base + c.k * ((c.ax === 0 ? qx : qz) - c.s0);
              if (top <= feet + stepUp) continue;
            }
            const dx = pos.x - qx, dz = pos.z - qz;
            const d2 = dx * dx + dz * dz;
            if (d2 > 0) {
              if (d2 >= r * r) continue;
              const d = Math.sqrt(d2);
              const push = (r - d) / d;
              pos.x += dx * push; pos.z += dz * push;
            } else {
              // centre is inside the footprint: leave through the nearest face
              const l = pos.x - c.minX, rt = c.maxX - pos.x, t = pos.z - c.minZ, b = c.maxZ - pos.z;
              const m = Math.min(l, rt, t, b);
              if (m === l) pos.x = c.minX - r;
              else if (m === rt) pos.x = c.maxX + r;
              else if (m === t) pos.z = c.minZ - r;
              else pos.z = c.maxZ + r;
            }
            any = true;
          }
        }
      }
      if (!any) break;
      pushed = true;
    }
    return pushed;
  }

  // -- ray casting -----------------------------------------------------------

  /**
   * Cast against terrain + colliders. Returns hit distance or -1.
   * `out` receives { x,y,z, nx,ny,nz, kind, tag } when provided.
   */
  raycast(ox, oy, oz, dx, dy, dz, maxDist, out) {
    let best = maxDist;
    let kind = -1, bnx = 0, bny = 1, bnz = 0, btag = 0;

    // colliders ---------------------------------------------------------
    const id = ++this.rayId;
    // 2D DDA over the hash grid
    const hx = WORLD.half;
    let cx = Math.floor((ox + hx) / CELL), cz = Math.floor((oz + hx) / CELL);
    const stepX = dx > 0 ? 1 : -1, stepZ = dz > 0 ? 1 : -1;
    const tDeltaX = dx !== 0 ? Math.abs(CELL / dx) : INF;
    const tDeltaZ = dz !== 0 ? Math.abs(CELL / dz) : INF;
    let tMaxX = dx !== 0 ? ((dx > 0 ? (cx + 1) * CELL : cx * CELL) - hx - ox) / dx : INF;
    let tMaxZ = dz !== 0 ? ((dz > 0 ? (cz + 1) * CELL : cz * CELL) - hx - oz) / dz : INF;
    let t = 0;
    const hit = _hit;
    for (let guard = 0; guard < 400; guard++) {
      if (cx >= 0 && cx < CELLS && cz >= 0 && cz < CELLS) {
        const list = this.grid[cz * CELLS + cx];
        if (list) {
          for (let i = 0; i < list.length; i++) {
            const c = list[i];
            if (c.rs === id) continue;
            c.rs = id;
            if (rayCollider(c, ox, oy, oz, dx, dy, dz, best, hit) && hit.t < best) {
              best = hit.t; kind = 1; bnx = hit.nx; bny = hit.ny; bnz = hit.nz; btag = c.tag;
            }
          }
        }
      }
      const tn = Math.min(tMaxX, tMaxZ);
      if (tn > best) break;
      if (tMaxX < tMaxZ) { cx += stepX; t = tMaxX; tMaxX += tDeltaX; }
      else { cz += stepZ; t = tMaxZ; tMaxZ += tDeltaZ; }
      if (cx < 0 || cx >= CELLS || cz < 0 || cz >= CELLS) break;
    }

    // terrain -----------------------------------------------------------
    const th = this.terrain;
    const maxTerrain = 200;
    if (!(oy > maxTerrain && dy >= 0)) {
      let prevT = 0;
      let prevAbove = oy - th.height(ox, oz);
      let step = 1.5;
      for (let s = step; s <= best + step; s += step) {
        const tt = Math.min(s, best);
        const px = ox + dx * tt, py = oy + dy * tt, pz = oz + dz * tt;
        const above = py - th.height(px, pz);
        if (above < 0 && prevAbove >= 0) {
          let a = prevT, b = tt;
          for (let k = 0; k < 7; k++) {
            const m = (a + b) * 0.5;
            if (oy + dy * m - th.height(ox + dx * m, oz + dz * m) > 0) a = m; else b = m;
          }
          if (b < best) {
            best = b; kind = 0;
            const hxp = ox + dx * b, hzp = oz + dz * b;
            const e = 1.2;
            bnx = th.height(hxp - e, hzp) - th.height(hxp + e, hzp); bny = 2 * e; bnz = th.height(hxp, hzp - e) - th.height(hxp, hzp + e);
            const l = Math.hypot(bnx, bny, bnz); bnx /= l; bny /= l; bnz /= l;
            btag = 0;
          }
          break;
        }
        prevT = tt; prevAbove = above;
        if (tt >= best) break;
        if (s > 80) step = 3;
        if (s > 250) step = 6;
      }
    }

    if (kind < 0) return -1;
    if (out) {
      out.x = ox + dx * best; out.y = oy + dy * best; out.z = oz + dz * best;
      out.nx = bnx; out.ny = bny; out.nz = bnz; out.kind = kind; out.tag = btag;
    }
    return best;
  }

  /** True when nothing solid lies between a and b. */
  clearLine(ax, ay, az, bx, by, bz) {
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const d = Math.hypot(dx, dy, dz);
    if (d < 0.01) return true;
    return this.raycast(ax, ay, az, dx / d, dy / d, dz / d, d - 0.1, null) < 0;
  }
}

const _hit = { t: 0, nx: 0, ny: 0, nz: 0 };

// Ray vs convex solid built from slabs (+ the ramp plane). Returns true and fills hit.
function rayCollider(c, ox, oy, oz, dx, dy, dz, maxT, hit) {
  if (c.t === CIRCLE) {
    const fx = ox - c.cx, fz = oz - c.cz;
    const a = dx * dx + dz * dz;
    if (a < 1e-9) return false;
    const b = fx * dx + fz * dz;
    const cc = fx * fx + fz * fz - c.r * c.r;
    const disc = b * b - a * cc;
    if (disc < 0) return false;
    const sq = Math.sqrt(disc);
    let t = (-b - sq) / a;
    if (t < 0) {
      if (cc < 0) {
        // origin inside the cylinder column
        t = 0;
      } else return false;
    }
    if (t > maxT) return false;
    const y = oy + dy * t;
    if (y < c.minY || y > c.maxY) return false;
    hit.t = t;
    const px = ox + dx * t - c.cx, pz = oz + dz * t - c.cz;
    const l = Math.hypot(px, pz) || 1;
    hit.nx = px / l; hit.ny = 0; hit.nz = pz / l;
    return true;
  }
  let t0 = 0, t1 = maxT;
  let nx = 0, ny = 0, nz = 0;
  // x slab
  if (dx !== 0) {
    const inv = 1 / dx;
    let ta = (c.minX - ox) * inv, tb = (c.maxX - ox) * inv, n = -1;
    if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; n = 1; }
    if (ta > t0) { t0 = ta; nx = n; ny = 0; nz = 0; }
    if (tb < t1) t1 = tb;
    if (t0 > t1) return false;
  } else if (ox < c.minX || ox > c.maxX) return false;
  // z slab
  if (dz !== 0) {
    const inv = 1 / dz;
    let ta = (c.minZ - oz) * inv, tb = (c.maxZ - oz) * inv, n = -1;
    if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; n = 1; }
    if (ta > t0) { t0 = ta; nx = 0; ny = 0; nz = n; }
    if (tb < t1) t1 = tb;
    if (t0 > t1) return false;
  } else if (oz < c.minZ || oz > c.maxZ) return false;
  // y slab
  if (dy !== 0) {
    const inv = 1 / dy;
    let ta = (c.minY - oy) * inv, tb = (c.maxY - oy) * inv, n = -1;
    if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; n = 1; }
    if (ta > t0) { t0 = ta; nx = 0; ny = n; nz = 0; }
    if (tb < t1) t1 = tb;
    if (t0 > t1) return false;
  } else if (oy < c.minY || oy > c.maxY) return false;
  if (c.t === RAMP) {
    // keep only the part of the ray below the sloped surface:  y - k*(s - s0) <= base
    const so = c.ax === 0 ? ox : oz, sd = c.ax === 0 ? dx : dz;
    const f0 = oy - c.base - c.k * (so - c.s0); // value at t=0
    const fd = dy - c.k * sd; // slope of value along t
    // inside when f0 + fd*t <= 0
    if (Math.abs(fd) < 1e-9) {
      if (f0 > 0) return false;
    } else {
      const tp = -f0 / fd;
      if (fd > 0) {
        if (tp < t1) t1 = tp;
      } else if (tp > t0) {
        t0 = tp;
        const l = Math.hypot(c.ax === 0 ? -c.k : 0, 1, c.ax === 1 ? -c.k : 0);
        nx = c.ax === 0 ? -c.k / l : 0; ny = 1 / l; nz = c.ax === 1 ? -c.k / l : 0;
      }
      if (t0 > t1) return false;
    }
  }
  if (t0 > maxT || t1 < 0) return false;
  hit.t = Math.max(t0, 0);
  hit.nx = nx; hit.ny = ny; hit.nz = nz;
  return true;
}
