import * as THREE from 'three';
import { mulberry32 } from './util.js';
import { PartBuilder, partMaterial, shade, mix } from './charparts.js';

// ---------------------------------------------------------------------------
// Characters: a chunky, stylised rig. Every rigid body part is ONE merged vertex-coloured mesh
// (about 16 meshes per character, one shared material), so animation can use real joints
// (pelvis, spine, neck, shoulder, elbow, wrist, hip, knee, ankle) without costing draw calls.
// ---------------------------------------------------------------------------

/** Bone lengths and joint offsets shared with the animation system (metres, bind pose). */
export const RIG = {
  hipY: 0.9, hipX: 0.115, thigh: 0.42, shin: 0.395, ankle: 0.085, footLen: 0.3,
  waist: 0.07, // torso origin above the pelvis origin
  neckY: 0.5, headY: 0.03, // neck above torso, head above neck
  shoulderX: 0.31, shoulderY: 0.43,
  upperArm: 0.32, foreArm: 0.3, palm: 0.055,
};

const SKINS = [0xf1c8a0, 0xe0ac7c, 0xc68a5c, 0x9a6540, 0x6e4529, 0xf7d9bd];
const SHIRTS = [0xd8412f, 0x2f7bd8, 0x35b56a, 0xf1b92a, 0x8a4fd8, 0x1d1f26, 0xe9e9e4, 0xff7a2f, 0x22b8b0, 0xd83fa0, 0x6a7a4a, 0x4a5568, 0x9b2c3c, 0x3a4f9a];
const PANTS = [0x2a3040, 0x3b2f27, 0x1c1c1c, 0x4a5a3a, 0x2c4a6e, 0x6e5a3a, 0x33333a, 0x5a4a38, 0x39486b];
const HAIRS = [0x1c1410, 0x4a2e1a, 0xc9a04a, 0x8a2f1a, 0x2a2a2a, 0xe8e0d0, 0x3a6a9a, 0x6b3d1d, 0xe85c9c];
const HAT_COLORS = [0xd8412f, 0x1d1f26, 0x2f7bd8, 0x8a6a3a, 0xf1b92a, 0x35b56a, 0x4a5568];
const BOOTS = [0x3a2a1c, 0x1f1f23, 0x5a4026, 0x2c3a2c, 0x8a1f1f, 0xe8e8e8];
const PACKS = [0x44503a, 0x3b4252, 0x6a4a2a, 0x2e2e33, 0x7a2f2f, 0x2e6a6a, 0x5a5a3a];
const VESTS = [0x2c3a2c, 0x23262b, 0x3d3a2e, 0x2e3340];
const HELMETS = [0x3b4638, 0x23262b, 0x4a4535, 0x2b3340];
const HAIR_STYLES = ['short', 'short', 'spiky', 'long', 'ponytail', 'buzz', 'beard', 'mohawk', 'side'];
const SLEEVES = ['short', 'short', 'long', 'rolled'];
const SHIRT_STYLES = ['tee', 'tee', 'jacket', 'hoodie', 'stripe', 'henley', 'tee'];
const NOOB_HATS = ['party', 'propeller', 'bucket', 'cone', 'duck', 'beanie'];
const FACE_MOUTH = ['flat', 'smile', 'smirk', 'grin'];

/** Rolls the dice for one character's whole outfit. */
function planOutfit(seed, opts, skill) {
  const rng = mulberry32(seed * 977 + 13);
  const pick = (a) => a[Math.floor(rng() * a.length)];
  const chance = (p) => rng() < p;
  const o = {};
  o.skill = skill;
  o.skin = opts.skin ?? pick(SKINS);
  o.shirt = opts.shirt ?? pick(SHIRTS);
  o.pants = opts.pants ?? pick(PANTS);
  o.hair = opts.hair ?? pick(HAIRS);
  o.hairStyle = opts.hairStyle ?? pick(HAIR_STYLES);
  const hatRoll = rng();
  o.hat = opts.hat !== undefined ? (opts.hat === null ? null : { kind: opts.hatKind || 'cap', color: opts.hat }) : null;
  if (opts.hat === undefined) {
    if (hatRoll < 0.18) o.hat = { kind: 'cap', color: pick(HAT_COLORS), back: chance(0.25) };
    else if (hatRoll < 0.3) o.hat = { kind: 'beanie', color: pick(HAT_COLORS) };
    else if (hatRoll < 0.38) o.hat = { kind: 'cowboy', color: pick([0x8a6a3a, 0x5a3f22, 0x1d1f26, 0xb99a62]) };
    else if (hatRoll < 0.44) o.hat = { kind: 'headband', color: pick(HAT_COLORS) };
    else if (hatRoll < 0.5) o.hat = { kind: 'helmet', color: pick(HELMETS) };
  }
  o.sleeve = pick(SLEEVES);
  o.shirtStyle = opts.shirtStyle ?? pick(SHIRT_STYLES);
  o.shirtAccent = pick(SHIRTS);
  o.collar = chance(0.6);
  o.pocketsChest = chance(0.4);
  o.logo = chance(0.55);
  o.pantsStyle = pick(['cargo', 'plain', 'cargo', 'stripe', 'plain']);
  o.kneePads = chance(0.35);
  o.shorts = false;
  o.boots = pick(BOOTS);
  o.gloves = pick(['none', 'none', 'fingerless', 'full', 'fingerless']);
  o.glove = pick([0x23262b, 0x3a2a1c, 0x5a5a3a, 0xd8d8d8, 0x7a2f2f]);
  o.belt = pick([0x2a2118, 0x1c1c1c, 0x4a3420, 0x5a5a3a]);
  o.buckle = pick([0xc8a24a, 0xb9bec7, 0xc8a24a]);
  o.pack = opts.pack ?? pick(PACKS);
  o.packStyle = opts.packStyle ?? pick(['standard', 'standard', 'roll', 'small', 'tall']);
  o.wrist = pick(['none', 'none', 'watch', 'band', 'bracer']);
  o.wristColor = pick([0x23262b, 0xd8412f, 0xe8e8e8, 0x2f7bd8, 0x8a8f96]);
  o.glasses = chance(0.12);
  o.scarf = chance(0.08);
  o.mouth = pick(FACE_MOUTH);
  o.brows = pick(['neutral', 'neutral', 'raised', 'angry']);
  o.eyeScale = 0.9 + rng() * 0.25;
  o.freckles = chance(0.15);
  o.vest = false;
  o.holster = chance(0.3);
  o.pouch = chance(0.4);
  o.goofy = null;
  o.vestColor = pick(VESTS);
  o.stripeColor = pick(SHIRTS);
  o.sleeveStripe = chance(0.2);

  if (skill === 'pro') {
    o.vest = true; o.kneePads = true;
    o.gloves = pick(['fingerless', 'full']);
    o.glove = 0x23262b;
    o.boots = pick([0x1f1f23, 0x3a2a1c, 0x2c3a2c]);
    o.pantsStyle = 'cargo';
    if (!opts.hat) o.hat = chance(0.7) ? { kind: 'helmet', color: pick(HELMETS) } : { kind: 'cap', color: pick([0x1d1f26, 0x2c3a2c]), back: chance(0.5) };
    o.brows = 'angry';
    o.holster = true;
    o.wrist = 'watch';
    o.shirtStyle = pick(['jacket', 'tee', 'henley']);
    o.sleeve = pick(['long', 'rolled', 'long']);
  } else if (skill === 'noob') {
    o.shorts = chance(0.45);
    o.goofy = pick(NOOB_HATS);
    if (!opts.hat) o.hat = chance(0.75) ? { kind: o.goofy, color: pick([0xff4fa0, 0xffd23f, 0x3fd0ff, 0x8aff3f, 0xff7a2f]) } : o.hat;
    o.glasses = chance(0.4);
    o.brows = pick(['raised', 'raised', 'neutral']);
    o.mouth = pick(['grin', 'smile']);
    o.shirtStyle = pick(['stripe', 'tee', 'tee']);
    o.eyeScale = 1.1 + rng() * 0.2;
    o.boots = pick([0xe8e8e8, 0xff4fa0, 0x3fd0ff, 0xf1b92a]);
    o.kneePads = false;
  } else if (skill === 'mid') {
    if (chance(0.3)) o.vest = true;
  }
  return o;
}

export function characterModel(seed = 1, opts = {}) {
  const detail = opts.detail ?? 1;
  const skill = opts.skill ?? 'mid';
  const o = planOutfit(seed, opts, skill);
  const skin = o.skin, shirt = o.shirt, pants = o.pants;
  const skinD = shade(skin, 0.86), skinL = shade(skin, 1.08);
  const shirtD = shade(shirt, 0.78), shirtL = shade(shirt, 1.14);
  const pantsD = shade(pants, 0.72), pantsL = shade(pants, 1.2);
  const hairC = o.hair, hairD = shade(o.hair, 0.72);
  const bootD = shade(o.boots, 0.62), bootL = shade(o.boots, 1.25);
  const SOLE = 0x15130f;
  const packD = shade(o.pack, 0.7), packL = shade(o.pack, 1.18);
  const longSleeve = o.sleeve === 'long' || o.shirtStyle === 'hoodie' || o.shirtStyle === 'jacket' && o.sleeve !== 'short';
  const sleeveLen = o.sleeve === 'short' && o.shirtStyle !== 'hoodie' && o.shirtStyle !== 'jacket' ? 0.2 : o.sleeve === 'rolled' ? 0.4 : 0.66;
  const shirtTex = o.shirtStyle === 'stripe' ? o.stripeColor : shirtD;

  const root = new THREE.Group();
  const body = new THREE.Group(); // everything that leans / bobs
  root.add(body);
  const pelvis = new THREE.Group();
  pelvis.position.set(0, RIG.hipY, 0);
  body.add(pelvis);
  const torso = new THREE.Group();
  torso.position.set(0, RIG.waist, 0);
  pelvis.add(torso);
  const neck = new THREE.Group();
  neck.position.set(0, RIG.neckY, 0);
  torso.add(neck);
  const head = new THREE.Group();
  head.position.set(0, RIG.headY, 0);
  neck.add(head);

  const meshes = [];
  const mat = partMaterial();
  const addMesh = (parent, b, name) => {
    const geo = b.build();
    const m = new THREE.Mesh(geo, mat);
    m.name = name;
    m.castShadow = true;
    m.receiveShadow = false;
    parent.add(m);
    meshes.push(m);
    return m;
  };

  // ---------------------------------------------------------------- pelvis
  {
    const b = new PartBuilder();
    b.box(0, -0.04, 0, 0.43, 0.26, 0.25, pants, { ao: 0.7 });
    b.box(0, 0.075, 0, 0.445, 0.07, 0.262, o.belt, { ao: 0.85 });
    b.box(0, 0.075, -0.135, 0.07, 0.05, 0.014, o.buckle, { ao: 1 });
    b.box(0, 0.075, -0.141, 0.032, 0.026, 0.006, shade(o.buckle, 0.6), { ao: 1 });
    if (detail > 0) {
      if (o.holster || o.vest) {
        b.box(0.235, -0.07, 0.01, 0.05, 0.17, 0.1, shade(0x23262b, 1), {});
        b.box(0.235, 0.02, 0.01, 0.054, 0.02, 0.105, 0x15171a, {});
      }
      if (o.pouch || o.vest) {
        b.box(-0.235, 0.0, -0.035, 0.055, 0.1, 0.09, o.skill === 'pro' ? 0x2b3340 : shade(o.belt, 1.1), {});
        b.box(-0.235, 0.05, -0.035, 0.058, 0.025, 0.094, shade(o.belt, 0.8), {});
      }
      b.box(0, 0.0, 0.15, 0.2, 0.09, 0.06, shade(o.belt, 1.15), {});
      b.box(-0.16, 0.085, -0.125, 0.02, 0.06, 0.02, 0x15171a, {}); // belt loops
      b.box(0.16, 0.085, -0.125, 0.02, 0.06, 0.02, 0x15171a, {});
    }
    addMesh(pelvis, b, 'pelvis');
  }

  // ---------------------------------------------------------------- torso (chest + collar + pack)
  {
    const b = new PartBuilder();
    // chest and shirt
    b.box(0, 0.24, 0, 0.44, 0.54, 0.25, shirt, { taper: [1.1, 1.0], ao: 0.78 });
    if (o.shirtStyle === 'stripe') {
      for (let i = 0; i < 4; i++) b.box(0, 0.06 + i * 0.12, 0, 0.46 - 0.004 * (3 - i), 0.05, 0.262, o.stripeColor, { ao: 0.95 });
    }
    if (o.shirtStyle === 'jacket') {
      b.box(0, 0.25, -0.128, 0.022, 0.5, 0.01, shade(shirt, 1.35), { ao: 1 }); // zipper
      b.box(-0.115, 0.04, -0.128, 0.1, 0.075, 0.012, shirtD, {}); // lower pockets
      b.box(0.115, 0.04, -0.128, 0.1, 0.075, 0.012, shirtD, {});
      b.box(0, 0.12, 0, 0.452, 0.045, 0.262, shirtD, { ao: 0.95 }); // hem band
    }
    if (o.shirtStyle === 'hoodie') {
      b.box(0, 0.08, -0.13, 0.3, 0.11, 0.016, shirtD, {}); // kangaroo pocket
      b.box(0, 0.47, 0.115, 0.28, 0.13, 0.11, shirtD, { ao: 0.9 }); // hood bunched behind the neck
      b.box(-0.03, 0.38, -0.128, 0.012, 0.12, 0.012, 0xe8e8e8, { ao: 1 }); // drawstrings
      b.box(0.03, 0.38, -0.128, 0.012, 0.12, 0.012, 0xe8e8e8, { ao: 1 });
    }
    if (o.shirtStyle === 'henley') {
      b.box(0, 0.42, -0.128, 0.05, 0.14, 0.01, shirtD, {});
      for (let i = 0; i < 3; i++) b.box(0, 0.36 + i * 0.045, -0.134, 0.016, 0.016, 0.006, 0xe8e0d0, { ao: 1 });
    }
    // collar + neck
    const collarC = o.shirtStyle === 'jacket' ? shirtD : o.collar ? shade(shirt, 1.25) : shirtD;
    b.box(0, 0.505, 0, 0.19, 0.045, 0.18, collarC, { ao: 0.9 });
    if (o.shirtStyle === 'jacket') {
      b.box(-0.085, 0.51, -0.05, 0.085, 0.06, 0.09, collarC, { rot: [0, 0.3, -0.15] });
      b.box(0.085, 0.51, -0.05, 0.085, 0.06, 0.09, collarC, { rot: [0, -0.3, 0.15] });
    }
    b.box(0, 0.545, 0, 0.115, 0.06, 0.115, skinD, { ao: 0.8 });
    if (o.scarf) {
      b.box(0, 0.525, -0.005, 0.2, 0.06, 0.2, 0xd8412f, { ao: 0.85 });
      b.box(0.06, 0.4, -0.13, 0.06, 0.2, 0.025, 0xd8412f, {});
    }
    if (o.logo && !o.vest && detail > 0) {
      b.box(0.1, 0.36, -0.128, 0.105, 0.075, 0.012, 0xffffff, { ao: 1 });
      b.box(0.1, 0.36, -0.134, 0.065, 0.04, 0.006, shirt, { ao: 1 });
    }
    if (o.pocketsChest && !o.vest && detail > 0) {
      b.box(-0.1, 0.34, -0.128, 0.095, 0.09, 0.012, shirtD, {});
      b.box(-0.1, 0.385, -0.13, 0.1, 0.025, 0.012, shade(shirt, 0.65), {});
    }
    // tactical vest (pros)
    if (o.vest) {
      const vc = o.vestColor, vd = shade(vc, 0.7), vl = shade(vc, 1.25);
      b.box(0, 0.26, 0, 0.47, 0.4, 0.275, vc, { taper: [1.04, 1.0], ao: 0.75 });
      b.box(0, 0.32, -0.145, 0.3, 0.26, 0.026, vl, { ao: 0.9 });
      if (detail > 0) {
        for (let i = -1; i <= 1; i++) b.box(i * 0.11, 0.13, -0.155, 0.095, 0.11, 0.05, vd, {});
        for (let i = -1; i <= 1; i++) b.box(i * 0.11, 0.19, -0.168, 0.09, 0.02, 0.03, vc, {});
        b.box(-0.17, 0.42, -0.05, 0.06, 0.04, 0.25, vd, {});
        b.box(0.17, 0.42, -0.05, 0.06, 0.04, 0.25, vd, {});
        b.box(0, 0.31, -0.164, 0.06, 0.04, 0.01, 0xd8d8d8, { ao: 1 });
      }
    }
    // backpack
    {
      const ps = o.packStyle;
      const w = ps === 'small' ? 0.26 : 0.34, h = ps === 'tall' ? 0.5 : ps === 'small' ? 0.28 : 0.4, y = ps === 'tall' ? 0.28 : ps === 'small' ? 0.22 : 0.25;
      b.box(0, y, 0.205, w, h, 0.16, o.pack, { taper: [0.93, 0.93], ao: 0.72 });
      b.box(0, y + h / 2 + 0.01, 0.215, w + 0.012, 0.055, 0.18, packL, { ao: 0.85 });
      b.box(0, y + h / 2 - 0.02, 0.29, w * 0.5, 0.05, 0.012, packD, {});
      if (ps !== 'small' && detail > 0) {
        b.box(-w / 2 - 0.035, y - h * 0.22, 0.2, 0.07, h * 0.45, 0.12, packD, { ao: 0.75 });
        b.box(w / 2 + 0.035, y - h * 0.22, 0.2, 0.07, h * 0.45, 0.12, packD, { ao: 0.75 });
      }
      if (ps === 'roll') b.cyl(0, y - h / 2 - 0.045, 0.22, 0.06, 0.06, w + 0.06, 0x8a7a5a, { rot: [0, 0, Math.PI / 2], sides: 8 });
      if (ps === 'standard' && detail > 0) b.box(0, y - h * 0.18, 0.29, w * 0.7, h * 0.3, 0.02, packD, {});
    }
    // straps over the shoulders and across the chest
    if (!o.vest || detail > 0) {
      const sc = o.vest ? shade(o.vestColor, 0.55) : shade(o.pack, 0.5);
      for (const s of [-1, 1]) {
        b.box(s * 0.145, 0.32, -0.127, 0.05, 0.38, 0.012, sc, { ao: 0.9 });
        b.box(s * 0.145, 0.505, -0.005, 0.05, 0.014, 0.25, sc, { ao: 1 });
      }
      b.box(0, 0.33, -0.132, 0.24, 0.024, 0.01, sc, {});
      b.box(0, 0.33, -0.138, 0.036, 0.034, 0.008, 0xc8c8c8, { ao: 1 });
    }
    addMesh(torso, b, 'torso');
  }

  // ---------------------------------------------------------------- head
  const FACE_Z = -0.1375;
  const eyeY = 0.125, eyeX = 0.07;
  let lids = null;
  {
    const b = new PartBuilder();
    b.box(0, 0.035, 0.0, 0.25, 0.12, 0.25, skin, { ao: 0.8 }); // jaw
    b.box(0, 0.17, 0.003, 0.295, 0.19, 0.275, skin, { ao: 0.9 }); // cranium
    b.box(0, 0.115, -0.001, 0.285, 0.1, 0.27, skin, { ao: 0.95 });
    // ears
    b.box(-0.155, 0.12, 0.005, 0.022, 0.07, 0.045, skinD, {});
    b.box(0.155, 0.12, 0.005, 0.022, 0.07, 0.045, skinD, {});
    // eyes
    const es = o.eyeScale;
    for (const s of [-1, 1]) {
      b.box(s * eyeX, eyeY, FACE_Z - 0.003, 0.066 * es, 0.056 * es, 0.012, 0xfafafa, { ao: 1 });
      const px = s * (eyeX - 0.006);
      b.box(px, eyeY - 0.002, FACE_Z - 0.008, 0.034 * es, 0.044 * es, 0.012, o.skill === 'pro' ? 0x3a6a8a : 0x2a1c10, { ao: 1 });
      b.box(px, eyeY, FACE_Z - 0.013, 0.02 * es, 0.026 * es, 0.01, 0x0a0a0a, { ao: 1 });
      b.box(px - s * 0.006, eyeY + 0.012, FACE_Z - 0.017, 0.009, 0.009, 0.006, 0xffffff, { ao: 1 });
      // brows
      const browY = eyeY + 0.052 * es + (o.brows === 'raised' ? 0.014 : 0);
      const tilt = o.brows === 'angry' ? 0.38 : o.brows === 'raised' ? -0.12 : 0.04;
      b.box(s * (eyeX + 0.002), browY, FACE_Z - 0.006, 0.08, 0.02, 0.014, hairD, { rot: [0, 0, -s * tilt], ao: 1 });
    }
    // nose
    b.box(0, 0.075, FACE_Z - 0.022, 0.044, 0.056, 0.044, shade(skin, 0.95), { ao: 0.85 });
    b.box(0, 0.052, FACE_Z - 0.036, 0.05, 0.016, 0.02, skinD, { ao: 0.9 });
    // mouth
    const mz = -0.1265;
    const lip = 0x8a3a30;
    if (o.mouth === 'flat') b.box(0, 0.022, mz, 0.07, 0.014, 0.01, lip, { ao: 1 });
    else if (o.mouth === 'smile') {
      b.box(0, 0.02, mz, 0.06, 0.014, 0.01, lip, { ao: 1 });
      b.box(-0.036, 0.03, mz, 0.016, 0.014, 0.01, lip, { ao: 1 });
      b.box(0.036, 0.03, mz, 0.016, 0.014, 0.01, lip, { ao: 1 });
    } else if (o.mouth === 'smirk') {
      b.box(-0.005, 0.02, mz, 0.06, 0.014, 0.01, lip, { ao: 1 });
      b.box(0.038, 0.03, mz, 0.018, 0.014, 0.01, lip, { ao: 1 });
    } else {
      b.box(0, 0.024, mz, 0.09, 0.03, 0.01, 0x4a1a14, { ao: 1 });
      b.box(0, 0.032, mz - 0.003, 0.082, 0.012, 0.008, 0xf4f4f0, { ao: 1 });
    }
    if (o.freckles && detail > 0) {
      for (const s of [-1, 1]) for (let i = 0; i < 3; i++) b.box(s * (0.05 + i * 0.016), 0.074 - (i % 2) * 0.012, FACE_Z - 0.003, 0.008, 0.008, 0.006, skinD, { ao: 1 });
    }
    if (o.glasses) {
      const gc = o.skill === 'noob' ? 0xff4fa0 : 0x15171a;
      for (const s of [-1, 1]) {
        b.box(s * eyeX, eyeY, FACE_Z - 0.02, 0.095, 0.07, 0.012, gc, { ao: 1 });
        b.box(s * eyeX, eyeY, FACE_Z - 0.027, 0.075, 0.052, 0.006, o.skill === 'noob' ? 0x7ad8ff : 0x23303c, { ao: 1 });
        b.box(s * 0.145, eyeY + 0.01, -0.07, 0.01, 0.016, 0.145, gc, { ao: 1 });
      }
      b.box(0, eyeY + 0.01, FACE_Z - 0.02, 0.05, 0.014, 0.012, gc, { ao: 1 });
    }
    buildHair(b, o, hairC, hairD, skin);
    buildHat(b, o, hairC, shade);
    addMesh(head, b, 'head');

    // eyelids: skin-coloured patches shown for a moment to blink (the mesh is hidden the rest of the time)
    const lb = new PartBuilder();
    for (const s of [-1, 1]) lb.box(s * eyeX, eyeY, FACE_Z - 0.022, 0.082 * es, 0.07 * es, 0.01, skin, { ao: 1 });
    if (o.glasses) lb.box(0, 0, 0, 0.001, 0.001, 0.001, skin, {});
    lids = addMesh(head, lb, 'lids');
    lids.castShadow = false;
    lids.visible = false;
  }
  let ponytail = null;
  if (o.hairStyle === 'ponytail') {
    const b = new PartBuilder();
    b.box(0, -0.06, 0.03, 0.07, 0.14, 0.07, hairC, { taper: [1.2, 1.2], ao: 0.8 });
    b.box(0, -0.18, 0.05, 0.085, 0.14, 0.08, hairC, { taper: [1.1, 1.1], ao: 0.8 });
    b.box(0, -0.29, 0.065, 0.06, 0.12, 0.06, hairD, { taper: [1.4, 1.4], ao: 0.8 });
    b.box(0, 0.0, 0.0, 0.08, 0.04, 0.08, o.shirtAccent, { ao: 1 });
    ponytail = addMesh(head, b, 'ponytail');
    ponytail.position.set(0, 0.2, 0.14);
    const pivot = new THREE.Group();
    pivot.position.set(0, 0.2, 0.14);
    head.add(pivot);
    pivot.add(ponytail);
    ponytail.position.set(0, 0, 0);
    ponytail = pivot;
  }

  // ---------------------------------------------------------------- arms
  const mkArm = (side) => {
    const a = new THREE.Group();
    a.position.set(side * RIG.shoulderX, RIG.shoulderY, 0);
    torso.add(a);
    const left = side < 0;
    const sleeveC = shirt, hemC = shirtD;
    // upper arm
    {
      const b = new PartBuilder();
      b.sx = side;
      const sl = sleeveLen; // how far down the sleeve reaches (m from the shoulder, capped to the upper arm)
      const upTo = Math.min(sl, 0.32);
      b.box(0.012, 0.03, 0, 0.17, 0.09, 0.17, sleeveC, { ao: 0.9 }); // shoulder cap
      b.box(0, 0.03 - (upTo + 0.04) / 2 + 0.0, 0, 0.158, upTo + 0.04, 0.16, sleeveC, { taper: [1.04, 1.0], ao: 0.75 });
      if (upTo < 0.3) {
        b.box(0, -upTo - 0.012, 0, 0.162, 0.024, 0.164, hemC, { ao: 0.85 });
        b.box(0, -(upTo + 0.3) / 2 - 0.005, 0, 0.122, 0.32 - upTo, 0.122, skin, { taper: [1.06, 1.06], ao: 0.8 });
      }
      if (o.sleeve === 'rolled') b.box(0, -upTo + 0.035, 0, 0.176, 0.07, 0.178, shade(sleeveC, 0.88), { ao: 0.9 });
      if (o.sleeveStripe && detail > 0) b.box(0.081, -0.04, 0, 0.012, 0.05, 0.168, 0xffffff, { ao: 1 });
      if (o.vest && detail > 0) b.box(0.01, 0.065, 0, 0.18, 0.04, 0.18, shade(o.vestColor, 1.0), {});
      addMesh(a, b, left ? 'armL' : 'armR');
    }
    const fore = new THREE.Group();
    fore.position.set(0, -RIG.upperArm, 0);
    a.add(fore);
    {
      const b = new PartBuilder();
      b.sx = side;
      const covered = Math.max(0, sleeveLen - 0.32); // sleeve continues over the forearm
      const fl = RIG.foreArm;
      b.box(0, -fl / 2 + 0.01, 0, 0.108, fl + 0.02, 0.108, skin, { taper: [1.12, 1.12], ao: 0.8 });
      if (covered > 0.01) {
        const cl = Math.min(covered, fl);
        b.box(0, -cl / 2 + 0.01, 0, 0.12, cl + 0.01, 0.12, sleeveC, { taper: [1.12, 1.1], ao: 0.8 });
        b.box(0, -cl + 0.0, 0, 0.124, 0.03, 0.124, hemC, { ao: 0.9 });
      } else if (o.sleeve === 'rolled') b.box(0, -0.0, 0, 0.134, 0.05, 0.134, shade(sleeveC, 0.88), { ao: 0.9 });
      if (o.kneePads && o.skill === 'pro' && detail > 0) b.box(0, 0.0, -0.065, 0.1, 0.07, 0.03, 0x23262b, {}); // elbow pad
      if (o.wrist === 'watch' && !left) {
        b.box(0, -0.235, 0, 0.12, 0.04, 0.122, 0x23262b, { ao: 1 });
        b.box(0.0, -0.235, -0.066, 0.05, 0.04, 0.012, 0x7ad8ff, { ao: 1 });
      } else if (o.wrist === 'band') b.box(0, -0.245, 0, 0.122, 0.04, 0.124, o.wristColor, { ao: 0.95 });
      else if (o.wrist === 'bracer' || o.skill === 'pro') {
        b.box(0, -0.18, 0, 0.126, 0.13, 0.126, 0x23262b, { taper: [1.04, 1.04], ao: 0.85 });
        if (detail > 0) b.box(0, -0.18, -0.066, 0.07, 0.06, 0.012, 0x4a5058, {});
      }
      addMesh(fore, b, left ? 'foreL' : 'foreR');
    }
    const hand = new THREE.Group();
    hand.position.set(0, -RIG.foreArm, 0);
    fore.add(hand);
    {
      const b = new PartBuilder();
      b.sx = side;
      const gl = o.gloves === 'none' ? skin : o.glove;
      const glD = shade(gl, 0.8);
      const fingerC = o.gloves === 'fingerless' ? skin : gl;
      b.box(0, -0.034, 0, 0.074, 0.07, 0.094, gl, { ao: 0.8 }); // palm and back of the hand
      b.box(0.0, -0.092, -0.004, 0.07, 0.05, 0.092, fingerC, { ao: 0.78 }); // curled fingers
      b.box(0.0, -0.1, -0.052, 0.068, 0.045, 0.03, fingerC, { ao: 0.85, rot: [0.15, 0, 0] }); // knuckles / finger tips
      b.box(-0.04, -0.04, -0.03, 0.03, 0.07, 0.04, o.gloves === 'full' ? gl : skin, { rot: [0.3, 0, 0], ao: 0.85 }); // thumb (palm side)
      b.box(0, -0.004, 0, 0.082, 0.02, 0.1, glD, { ao: 1 }); // cuff
      if (o.gloves !== 'none' && detail > 0) b.box(0.04, -0.03, 0.0, 0.01, 0.05, 0.09, glD, { ao: 1 }); // knuckle guard
      addMesh(hand, b, left ? 'handL' : 'handR');
    }
    return { a, fore, hand, side };
  };
  const armR = mkArm(1), armL = mkArm(-1);

  // ---------------------------------------------------------------- legs
  const mkLeg = (side) => {
    const l = new THREE.Group();
    l.position.set(side * RIG.hipX, 0, 0);
    pelvis.add(l);
    const left = side < 0;
    const legC = pants;
    {
      const b = new PartBuilder();
      b.sx = side;
      const shorts = o.shorts;
      b.box(0, -0.205, 0, 0.17, 0.46, 0.19, shorts ? skin : legC, { taper: [1.14, 1.0], ao: 0.72 });
      if (shorts) {
        b.box(0, -0.12, 0, 0.205, 0.26, 0.205, legC, { taper: [1.06, 1.04], ao: 0.75 });
        b.box(0, -0.25, 0, 0.21, 0.025, 0.21, pantsD, { ao: 0.9 });
      } else {
        if (o.pantsStyle === 'cargo' && detail > 0) {
          b.box(0.098, -0.17, 0.0, 0.04, 0.15, 0.125, pantsD, { ao: 0.8 });
          b.box(0.1, -0.1, 0.0, 0.044, 0.03, 0.13, shade(pants, 0.55), {});
          b.box(0.12, -0.18, 0.0, 0.01, 0.03, 0.03, 0x15171a, {});
        }
        if (o.pantsStyle === 'stripe') b.box(0.095, -0.2, 0, 0.012, 0.44, 0.05, 0xf2f2f2, { ao: 1 });
        if (detail > 0) b.box(0, -0.43, 0, 0.176, 0.02, 0.2, pantsD, { ao: 0.9 });
      }
      addMesh(l, b, left ? 'thighL' : 'thighR');
    }
    const shin = new THREE.Group();
    shin.position.set(0, -RIG.thigh, 0);
    l.add(shin);
    {
      const b = new PartBuilder();
      b.sx = side;
      const shorts = o.shorts;
      const topY = 0.015;
      const shaft = 0.2; // boot shaft height under the knee
      const legH = RIG.shin + 0.02;
      if (shorts) {
        b.box(0, -0.1, 0, 0.14, 0.19, 0.15, skin, { taper: [1.08, 1.05], ao: 0.8 });
        b.box(0, -0.235, 0, 0.152, 0.12, 0.165, 0xf2f2f2, { ao: 0.8 }); // sock
        b.box(0, -0.285, 0, 0.158, 0.03, 0.17, o.stripeColor, { ao: 0.9 });
      } else {
        b.box(0, topY - legH / 2, 0, 0.138, legH, 0.152, legC, { taper: [1.12, 1.04], ao: 0.75 });
        if (detail > 0 && !shorts) b.box(0, -0.2, 0.0, 0.142, 0.03, 0.17, pantsD, { ao: 0.9 });
      }
      // boot shaft
      b.box(0, -RIG.shin + shaft / 2 - 0.02, -0.003, 0.158, shaft, 0.18, o.boots, { taper: [1.04, 1.04], ao: 0.7 });
      b.box(0, -RIG.shin + shaft - 0.02, -0.003, 0.17, 0.03, 0.19, bootD, { ao: 0.9 });
      if (detail > 0) {
        for (let i = 0; i < 3; i++) b.box(0, -RIG.shin + 0.05 + i * 0.05, -0.095, 0.075, 0.012, 0.012, 0xe8e0d0, { ao: 1 });
        b.box(0, -RIG.shin + 0.12, -0.092, 0.05, 0.16, 0.008, bootL, { ao: 1 });
      }
      if (o.kneePads || o.skill === 'pro') {
        b.box(0, 0.0, -0.085, 0.15, 0.13, 0.045, 0x23262b, { ao: 0.85 });
        b.box(0, 0.0, -0.111, 0.1, 0.08, 0.012, 0x3a4048, { ao: 1 });
      }
      addMesh(shin, b, left ? 'shinL' : 'shinR');
    }
    const foot = new THREE.Group();
    foot.position.set(0, -RIG.shin, 0);
    shin.add(foot);
    {
      const b = new PartBuilder();
      b.sx = side;
      b.box(0, -0.072, -0.052, 0.126, 0.026, 0.33, SOLE, { ao: 0.9 }); // sole
      b.box(0, -0.034, -0.045, 0.118, 0.07, 0.3, o.boots, { taper: [0.94, 0.9], ao: 0.7 });
      b.box(0, -0.04, -0.2, 0.124, 0.065, 0.065, bootD, { ao: 0.75 }); // toe cap
      b.box(0, -0.06, 0.065, 0.12, 0.035, 0.05, shade(SOLE, 1.5), { ao: 1 }); // heel
      if (detail > 0) b.box(0, 0.002, -0.08, 0.06, 0.015, 0.13, 0xe8e0d0, { ao: 1 }); // laces
      addMesh(foot, b, left ? 'footL' : 'footR');
    }
    return { l, shin, foot, side };
  };
  const legR = mkLeg(1), legL = mkLeg(-1);

  return {
    root, body, pelvis, torso, neck, head, armR, armL, legR, legL, lids, ponytail,
    colors: { shirt, skin, pants, hair: hairC, pack: o.pack },
    outfit: o,
    meshes,
    dispose() { for (const m of meshes) m.geometry.dispose(); },
  };
}

// ---------------------------------------------------------------------------
// hair
// ---------------------------------------------------------------------------
function buildHair(b, o, hairC, hairD, skin) {
  const st = o.hairStyle;
  const cap = (top = 0.05) => {
    b.box(0, 0.268, 0.004, 0.31, top, 0.292, hairC, { ao: 0.9 });
    b.box(0, 0.19, 0.147, 0.306, 0.17, 0.04, hairC, { ao: 0.8 });
    b.box(-0.155, 0.225, 0.02, 0.026, 0.09, 0.22, hairC, { ao: 0.9 });
    b.box(0.155, 0.225, 0.02, 0.026, 0.09, 0.22, hairC, { ao: 0.9 });
  };
  const fringe = () => b.box(0, 0.252, -0.14, 0.31, 0.045, 0.03, hairD, { ao: 1 });
  if (st === 'short') { cap(); fringe(); b.box(0.06, 0.27, -0.142, 0.14, 0.05, 0.03, hairC, { rot: [0, 0, -0.1] }); }
  else if (st === 'side') { cap(0.055); b.box(-0.07, 0.262, -0.135, 0.18, 0.075, 0.05, hairC, { rot: [0.15, 0, 0.18] }); b.box(0.02, 0.29, -0.02, 0.2, 0.03, 0.2, hairD, {}); }
  else if (st === 'buzz') { b.box(0, 0.266, 0.0, 0.3, 0.032, 0.282, mix(skin, hairC, 0.78), { ao: 0.9 }); b.box(0, 0.19, 0.142, 0.3, 0.16, 0.012, mix(skin, hairC, 0.7), { ao: 0.9 }); }
  else if (st === 'spiky') {
    cap(0.045);
    const spikes = [[-0.09, -0.07], [0.0, -0.1], [0.09, -0.07], [-0.1, 0.04], [0.0, 0.0], [0.1, 0.04], [-0.05, 0.11], [0.06, 0.11]];
    for (let i = 0; i < spikes.length; i++) {
      const [x, z] = spikes[i];
      b.box(x, 0.325, z, 0.075, 0.13, 0.075, i % 3 === 0 ? hairD : hairC, { taper: [0.1, 0.1], rot: [z * 1.6, 0, -x * 2.2], ao: 0.9 });
    }
  } else if (st === 'long') {
    cap(0.05);
    fringe();
    b.box(0, 0.04, 0.15, 0.31, 0.46, 0.06, hairC, { ao: 0.7 });
    b.box(-0.158, 0.1, 0.03, 0.026, 0.3, 0.22, hairC, { ao: 0.75 });
    b.box(0.158, 0.1, 0.03, 0.026, 0.3, 0.22, hairC, { ao: 0.75 });
  } else if (st === 'ponytail') { cap(0.05); fringe(); b.box(0, 0.2, 0.162, 0.08, 0.06, 0.03, hairD, {}); }
  else if (st === 'beard') {
    cap(0.045);
    b.box(0, 0.025, -0.125, 0.268, 0.1, 0.05, hairC, { ao: 0.8 });
    b.box(0, 0.06, -0.14, 0.14, 0.026, 0.026, hairD, { ao: 1 });
    b.box(-0.136, 0.05, -0.05, 0.026, 0.12, 0.17, hairC, { ao: 0.8 });
    b.box(0.136, 0.05, -0.05, 0.026, 0.12, 0.17, hairC, { ao: 0.8 });
    b.box(0, 0.0, -0.12, 0.2, 0.05, 0.055, hairD, { ao: 0.7 });
  } else if (st === 'mohawk') {
    b.box(0, 0.268, 0.0, 0.3, 0.025, 0.28, mix(skin, hairC, 0.45), { ao: 0.9 });
    b.box(0, 0.33, 0.0, 0.05, 0.12, 0.27, hairC, { taper: [1.0, 0.75], ao: 0.85 });
    b.box(0, 0.37, -0.02, 0.045, 0.06, 0.2, hairD, { taper: [0.9, 0.7], ao: 0.9 });
  }
}

// ---------------------------------------------------------------------------
// hats (positioned on the cranium, whose top is at y = 0.265)
// ---------------------------------------------------------------------------
function buildHat(b, o, hairC) {
  const h = o.hat;
  if (!h) return;
  const c = h.color, cd = shade(c, 0.7), cl = shade(c, 1.2);
  const k = h.kind;
  if (k === 'cap') {
    b.box(0, 0.305, 0.004, 0.316, 0.1, 0.296, c, { taper: [0.96, 0.96], ao: 0.8 });
    b.box(0, 0.36, 0.004, 0.04, 0.012, 0.04, cd, {});
    const z = h.back ? 0.2 : -0.2;
    b.box(0, 0.27, z, 0.27, 0.02, 0.14, cd, { rot: [h.back ? -0.12 : 0.12, 0, 0], ao: 0.85 });
    b.box(0, 0.285, h.back ? 0.15 : -0.15, 0.31, 0.04, 0.03, cd, {});
  } else if (k === 'beanie') {
    b.box(0, 0.305, 0.004, 0.318, 0.11, 0.3, c, { taper: [0.92, 0.92], ao: 0.8 });
    b.box(0, 0.255, 0.004, 0.326, 0.05, 0.306, cd, { ao: 0.85 });
    b.ball(0, 0.375, 0.0, 0.04, 0.04, 0.04, cl, { seg: 6, rings: 3 });
  } else if (k === 'cowboy') {
    const band = shade(c, 0.5);
    b.box(0, 0.268, 0, 0.5, 0.016, 0.34, c, { ao: 0.8 });
    b.box(-0.27, 0.292, 0, 0.12, 0.016, 0.34, c, { rot: [0, 0, 0.42], ao: 0.85 });
    b.box(0.27, 0.292, 0, 0.12, 0.016, 0.34, c, { rot: [0, 0, -0.42], ao: 0.85 });
    b.box(0, 0.275, -0.2, 0.34, 0.016, 0.1, c, { rot: [-0.12, 0, 0], ao: 0.85 });
    b.box(0, 0.275, 0.2, 0.34, 0.016, 0.1, c, { rot: [0.1, 0, 0], ao: 0.85 });
    b.box(0, 0.33, 0, 0.3, 0.12, 0.29, c, { taper: [0.88, 0.9], ao: 0.75 });
    b.box(0, 0.39, 0, 0.26, 0.03, 0.25, shade(c, 0.88), { ao: 0.95 });
    b.box(0, 0.31, 0, 0.312, 0.034, 0.302, band, { ao: 1 });
  } else if (k === 'helmet') {
    b.box(0, 0.295, 0.004, 0.335, 0.12, 0.32, c, { taper: [0.94, 0.94], ao: 0.75 });
    b.box(0, 0.36, 0.0, 0.28, 0.04, 0.27, shade(c, 1.1), { ao: 0.95 });
    b.box(0, 0.255, -0.15, 0.34, 0.035, 0.03, cd, {});
    b.box(-0.17, 0.2, 0.0, 0.02, 0.16, 0.24, cd, { ao: 0.85 }); // ear guards
    b.box(0.17, 0.2, 0.0, 0.02, 0.16, 0.24, cd, { ao: 0.85 });
    b.box(0, 0.335, -0.16, 0.06, 0.05, 0.04, 0x15171a, {}); // night vision mount
    b.box(0, 0.35, 0.16, 0.18, 0.05, 0.02, 0x15171a, {}); // rear net
    b.box(-0.172, 0.1, 0.0, 0.01, 0.014, 0.2, 0x15171a, { rot: [0, 0, 0.5] }); // chin strap
    b.box(0.172, 0.1, 0.0, 0.01, 0.014, 0.2, 0x15171a, { rot: [0, 0, -0.5] });
  } else if (k === 'headband') {
    b.box(0, 0.228, 0.002, 0.3, 0.04, 0.28, c, { ao: 0.85 });
    b.box(-0.04, 0.2, 0.15, 0.04, 0.12, 0.02, c, { rot: [0, 0, 0.2] });
    b.box(0.05, 0.19, 0.15, 0.04, 0.14, 0.02, cd, { rot: [0, 0, -0.25] });
  } else if (k === 'party') {
    b.cyl(0, 0.38, 0, 0.1, 0.0, 0.24, c, { sides: 7, rot: [0, 0, 0.12], ao: 0.8 });
    b.ball(0.03, 0.51, 0.0, 0.025, 0.025, 0.025, 0xffffff, { seg: 5, rings: 3 });
    b.box(0, 0.27, 0, 0.2, 0.012, 0.2, cd, {});
  } else if (k === 'propeller') {
    b.box(0, 0.3, 0.004, 0.318, 0.1, 0.3, c, { taper: [0.92, 0.92], ao: 0.8 });
    b.box(0, 0.35, 0.0, 0.318, 0.02, 0.3, 0xf1b92a, {});
    b.cyl(0, 0.385, 0, 0.012, 0.012, 0.05, 0x888888, { sides: 5 });
    b.box(0, 0.41, 0, 0.3, 0.008, 0.045, 0xd8412f, { rot: [0, 0.6, 0.06] });
    b.box(0, 0.41, 0, 0.3, 0.008, 0.045, 0x2f7bd8, { rot: [0, -0.6, -0.06] });
  } else if (k === 'bucket') {
    b.box(0, 0.31, 0.0, 0.31, 0.11, 0.3, c, { taper: [0.9, 0.9], ao: 0.8 });
    b.box(0, 0.268, 0, 0.42, 0.014, 0.42, cd, { rot: [0, 0, 0], ao: 0.85 });
    b.box(0, 0.268, -0.2, 0.34, 0.014, 0.06, cd, { rot: [-0.18, 0, 0], ao: 0.85 });
  } else if (k === 'cone') {
    b.cyl(0, 0.35, 0, 0.14, 0.05, 0.2, 0xff6a14, { sides: 8, ao: 0.8 });
    b.cyl(0, 0.35, 0, 0.1, 0.082, 0.05, 0xf4f4f0, { sides: 8, noTop: true, noBottom: true, ao: 1 });
    b.box(0, 0.262, 0, 0.3, 0.014, 0.3, 0x15171a, {});
  } else if (k === 'duck') {
    b.ball(0, 0.32, 0.0, 0.1, 0.075, 0.1, 0xffd21f, { seg: 7, rings: 4 });
    b.ball(0, 0.4, -0.04, 0.06, 0.055, 0.06, 0xffd21f, { seg: 6, rings: 3 });
    b.box(0, 0.395, -0.1, 0.06, 0.018, 0.06, 0xff8a1f, {});
    b.box(-0.035, 0.42, -0.07, 0.014, 0.014, 0.014, 0x15171a, {});
    b.box(0.035, 0.42, -0.07, 0.014, 0.014, 0.014, 0x15171a, {});
  }
  void hairC;
}

// ---------------------------------------------------------------------------
// glider (shared geometry per colour: never disposed per character)
// ---------------------------------------------------------------------------
const gliderCache = new Map();
let gliderCanopyMat = null;

function buildGlider(color, accent) {
  const c1 = new THREE.Color(color), c2 = new THREE.Color(accent);
  const pos = [], col = [], idx = [];
  const spanN = 12, chordN = 3;
  const grid = [];
  for (let i = 0; i <= spanN; i++) {
    const s = (i / spanN) * 2 - 1;
    const row = [];
    for (let j = 0; j <= chordN; j++) {
      const c = j / chordN;
      const x = 1.85 * s;
      const z = (c - 0.5) * 1.75 * (1 - 0.18 * s * s);
      const y = 3.62 - 0.72 * s * s + 0.16 * Math.sin(c * Math.PI) + (c - 0.5) * 0.25;
      row.push([x, y, z]);
    }
    grid.push(row);
  }
  for (let i = 0; i < spanN; i++) {
    const cc = i % 4 === 1 || i % 4 === 2 ? c2 : c1;
    for (let j = 0; j < chordN; j++) {
      const base = pos.length / 3;
      for (const [ii, jj] of [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]]) {
        pos.push(...grid[ii][jj]);
        const k = j === 0 ? 0.7 : 1;
        col.push(cc.r * k, cc.g * k, cc.b * k);
      }
      idx.push(base, base + 2, base + 1, base, base + 3, base + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(col), 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  // risers and handle bar
  const b = new PartBuilder();
  b.box(0, 2.07, 0, 0.56, 0.03, 0.03, 0x23262b, {});
  b.box(-0.24, 2.07, 0, 0.05, 0.05, 0.1, 0x15171a, {});
  b.box(0.24, 2.07, 0, 0.05, 0.05, 0.1, 0x15171a, {});
  for (const sx of [-1, 1]) {
    for (const [i, j] of [[sx < 0 ? 4 : 8, 0], [sx < 0 ? 2 : 10, chordN], [sx < 0 ? 5 : 7, chordN]]) b.line([sx * 0.24, 2.07, 0], grid[i][j], 0.012, 0x2a2a2a);
  }
  return { canopy: g, lines: b.build() };
}

export function gliderModel(color = 0xff5a2f, accent = 0xffffff) {
  const key = `${color}|${accent}`;
  let entry = gliderCache.get(key);
  if (!entry) { entry = buildGlider(color, accent); gliderCache.set(key, entry); }
  if (!gliderCanopyMat) gliderCanopyMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.72, side: THREE.DoubleSide });
  const g = new THREE.Group();
  const canopy = new THREE.Mesh(entry.canopy, gliderCanopyMat);
  canopy.castShadow = true;
  const lines = new THREE.Mesh(entry.lines, partMaterial());
  g.add(canopy, lines);
  return g;
}

