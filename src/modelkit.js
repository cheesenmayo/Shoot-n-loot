import * as THREE from 'three';

// ---------------------------------------------------------------------------
// tiny helpers
// ---------------------------------------------------------------------------
const matCache = new Map();
export function mat(color, { metal = 0.25, rough = 0.6, emissive = 0, emissiveIntensity = 1 } = {}) {
  const key = `${color}|${metal}|${rough}|${emissive}|${emissiveIntensity}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });
    if (emissive) { m.emissive = new THREE.Color(emissive); m.emissiveIntensity = emissiveIntensity; }
    matCache.set(key, m);
  }
  return m;
}
const boxGeos = new Map();
export function boxGeo(w, h, d) {
  const k = `${w},${h},${d}`;
  let g = boxGeos.get(k);
  if (!g) { g = new THREE.BoxGeometry(w, h, d); boxGeos.set(k, g); }
  return g;
}
export function B(parent, w, h, d, color, x = 0, y = 0, z = 0, o = {}) {
  const m = new THREE.Mesh(boxGeo(w, h, d), mat(color, o));
  m.position.set(x, y, z);
  if (o.rx) m.rotation.x = o.rx;
  if (o.ry) m.rotation.y = o.ry;
  if (o.rz) m.rotation.z = o.rz;
  m.castShadow = true;
  parent.add(m);
  return m;
}
const cylGeos = new Map();
// cylinder along Z (axis='z'), Y or X
export function C(parent, r, len, color, x = 0, y = 0, z = 0, axis = 'z', o = {}) {
  const k = `${r},${len},${axis},${o.rTop ?? r},${o.seg ?? 10}`;
  let g = cylGeos.get(k);
  if (!g) {
    g = new THREE.CylinderGeometry(o.rTop ?? r, r, len, o.seg ?? 10);
    if (axis === 'z') g.rotateX(Math.PI / 2);
    else if (axis === 'x') g.rotateZ(Math.PI / 2);
    cylGeos.set(k, g);
  }
  const m = new THREE.Mesh(g, mat(color, o));
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}
const sphGeos = new Map();
export function S(parent, r, color, x = 0, y = 0, z = 0, o = {}) {
  const k = `${r},${o.sy ?? 1}`;
  let g = sphGeos.get(k);
  if (!g) { g = new THREE.SphereGeometry(r, 12, 9); if (o.sy) g.scale(1, o.sy, 1); sphGeos.set(k, g); }
  const m = new THREE.Mesh(g, mat(color, o));
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}
