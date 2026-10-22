import * as THREE from 'three';
import { mulberry32 } from './util.js';
import { B } from './modelkit.js';

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------
const SKINS = [0xf1c8a0, 0xe0ac7c, 0xc68a5c, 0x9a6540, 0x6e4529, 0xf7d9bd];
const SHIRTS = [0xd8412f, 0x2f7bd8, 0x35b56a, 0xf1b92a, 0x8a4fd8, 0x1d1f26, 0xf2f2f2, 0xff7a2f, 0x22b8b0, 0xd83fa0, 0x6a7a4a, 0x4a5568];
const PANTS = [0x2a3040, 0x3b2f27, 0x1c1c1c, 0x4a5a3a, 0x2c4a6e, 0x6e5a3a, 0x33333a];
const HAIRS = [0x1c1410, 0x4a2e1a, 0xc9a04a, 0x8a2f1a, 0x2a2a2a, 0xe8e0d0, 0x3a6a9a];
const HATS = [null, null, 0xd8412f, 0x1d1f26, 0x2f7bd8, 0x8a6a3a, 0xf1b92a];

export function characterModel(seed = 1, opts = {}) {
  const rng = mulberry32(seed * 977 + 13);
  const pick = (a) => a[Math.floor(rng() * a.length)];
  const skin = opts.skin ?? pick(SKINS), shirt = opts.shirt ?? pick(SHIRTS), pants = opts.pants ?? pick(PANTS);
  const hair = opts.hair ?? pick(HAIRS), hat = opts.hat !== undefined ? opts.hat : pick(HATS);
  const root = new THREE.Group();
  const body = new THREE.Group(); // everything that leans / bobs
  root.add(body);

  const torso = new THREE.Group();
  torso.position.set(0, 0.88, 0);
  body.add(torso);
  B(torso, 0.5, 0.3, 0.27, shirt, 0, 0.15, 0, { rough: 0.8, metal: 0 });
  B(torso, 0.5, 0.32, 0.27, shirt, 0, 0.45, 0, { rough: 0.8, metal: 0 });
  B(torso, 0.52, 0.07, 0.29, 0x2a2118, 0, 0.0, 0, { rough: 0.7, metal: 0.1 }); // belt
  B(torso, 0.34, 0.42, 0.14, opts.pack ?? 0x44503a, 0, 0.32, 0.2, { rough: 0.9, metal: 0 }); // backpack
  B(torso, 0.1, 0.08, 0.02, 0xffffff, 0.1, 0.5, -0.14, { rough: 0.8, metal: 0, emissive: 0xffffff, emissiveIntensity: 0.15 }); // chest logo

  const head = new THREE.Group();
  head.position.set(0, 0.66, 0);
  torso.add(head);
  B(head, 0.27, 0.28, 0.27, skin, 0, 0.12, 0, { rough: 0.7, metal: 0 });
  B(head, 0.29, 0.1, 0.29, hair, 0, 0.27, 0.01, { rough: 0.9, metal: 0 });
  B(head, 0.29, 0.18, 0.08, hair, 0, 0.18, 0.12, { rough: 0.9, metal: 0 });
  B(head, 0.05, 0.05, 0.02, 0x15110d, -0.065, 0.14, -0.136, { rough: 0.5, metal: 0 });
  B(head, 0.05, 0.05, 0.02, 0x15110d, 0.065, 0.14, -0.136, { rough: 0.5, metal: 0 });
  if (hat) {
    B(head, 0.31, 0.11, 0.31, hat, 0, 0.3, 0, { rough: 0.8, metal: 0 });
    B(head, 0.33, 0.03, 0.4, hat, 0, 0.25, -0.05, { rough: 0.8, metal: 0 });
  }

  const mkArm = (side) => {
    const a = new THREE.Group();
    a.position.set(side * 0.3, 0.55, 0);
    B(a, 0.14, 0.3, 0.14, shirt, 0, -0.15, 0, { rough: 0.8, metal: 0 });
    const fore = new THREE.Group();
    fore.position.set(0, -0.3, 0);
    B(fore, 0.12, 0.26, 0.12, skin, 0, -0.13, 0, { rough: 0.7, metal: 0 });
    a.add(fore);
    const hand = new THREE.Group();
    hand.position.set(0, -0.28, 0);
    fore.add(hand);
    torso.add(a);
    return { a, fore, hand };
  };
  const armR = mkArm(1), armL = mkArm(-1);

  const mkLeg = (side) => {
    const l = new THREE.Group();
    l.position.set(side * 0.13, 0.88, 0);
    B(l, 0.17, 0.44, 0.19, pants, 0, -0.22, 0, { rough: 0.8, metal: 0 });
    const shin = new THREE.Group();
    shin.position.set(0, -0.44, 0);
    B(shin, 0.16, 0.34, 0.18, pants, 0, -0.17, 0, { rough: 0.8, metal: 0 });
    B(shin, 0.18, 0.1, 0.27, 0x201a16, 0, -0.38, -0.04, { rough: 0.7, metal: 0 });
    l.add(shin);
    body.add(l);
    return { l, shin };
  };
  const legR = mkLeg(1), legL = mkLeg(-1);

  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  return { root, body, torso, head, armR, armL, legR, legL, colors: { shirt, skin } };
}

export function gliderModel(color = 0xff5a2f, accent = 0xffffff) {
  const g = new THREE.Group();
  const sail = new THREE.Mesh(new THREE.SphereGeometry(1.9, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2.6), new THREE.MeshStandardMaterial({ color, roughness: 0.7, side: THREE.DoubleSide }));
  sail.position.y = 2.7;
  sail.scale.set(1.35, 0.55, 1.05);
  sail.castShadow = true;
  g.add(sail);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.03, 3.4), new THREE.MeshStandardMaterial({ color: accent, roughness: 0.7 }));
  stripe.position.set(0, 3.63, 0);
  g.add(stripe);
  const lineMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const hands = new THREE.Vector3(0, 1.3, 0);
  const up = new THREE.Vector3(0, 1, 0);
  for (const [x, z] of [[-1.2, -0.7], [1.2, -0.7], [-1.2, 0.7], [1.2, 0.7]]) {
    const top = new THREE.Vector3(x, 2.85, z);
    const dir = top.clone().sub(hands);
    const len = dir.length();
    const line = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 3), lineMat);
    line.position.copy(hands).addScaledVector(dir, 0.5);
    line.quaternion.setFromUnitVectors(up, dir.normalize());
    g.add(line);
  }
  return g;
}
