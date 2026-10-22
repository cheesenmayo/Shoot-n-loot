// Keyframe tracks: [t, v0, v1, ...] rows sampled with a Catmull-Rom style cubic Hermite spline.
// Allocation-free: sampleKeys() writes into `out`.

/** Samples the track at time t (rows must be sorted by t); out[i] receives column i + 1. */
export function sampleKeys(keys, t, out, n = keys[0].length - 1) {
  const last = keys.length - 1;
  if (t <= keys[0][0]) { for (let c = 0; c < n; c++) out[c] = keys[0][c + 1]; return out; }
  if (t >= keys[last][0]) { for (let c = 0; c < n; c++) out[c] = keys[last][c + 1]; return out; }
  let i = 0;
  while (i < last - 1 && t > keys[i + 1][0]) i++;
  const k0 = keys[Math.max(0, i - 1)], k1 = keys[i], k2 = keys[i + 1], k3 = keys[Math.min(last, i + 2)];
  const h = k2[0] - k1[0];
  const u = (t - k1[0]) / h;
  const u2 = u * u, u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
  const d0 = k2[0] - k0[0] || h, d1 = k3[0] - k1[0] || h;
  for (let c = 1; c <= n; c++) {
    const m1 = (k2[c] - k0[c]) / d0 * h * (k0 === k1 ? 0.5 : 1);
    const m2 = (k3[c] - k1[c]) / d1 * h * (k3 === k2 ? 0.5 : 1);
    out[c - 1] = h00 * k1[c] + h10 * m1 + h01 * k2[c] + h11 * m2;
  }
  return out;
}
