import { Builder, makeSign } from '../builder.js';
import { POI_BY_ID } from '../poidata.js';

const CONCRETE = 0xc3c6ca, DARK = 0x5d636c, ORANGE = 0xff7a2f, TEAL = 0x17b3ab, MAGENTA = 0xc93bd1, YELLOW = 0xf2c230, WHITE = 0xe8eaee;
const CYAN_GLOW = 0x35e8ff, PINK_GLOW = 0xff3df0, LIME_GLOW = 0x9dff3a;

export function buildParkourPlaza(world) {
  const poi = POI_BY_ID.parkour_plaza;
  const b = new Builder(world, 11);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z, Y = poi.y;
  const pal = [ORANGE, TEAL, MAGENTA, YELLOW];

  const neon = (x0, z0, x1, z1, y, color, t = 0.12) => {
    // thin glowing outline on top of a platform (visual only)
    b.glow.box(x0, y, z0, x1, y + 0.05, z0 + t, color, { jit: 0, ao: 1 });
    b.glow.box(x0, y, z1 - t, x1, y + 0.05, z1, color, { jit: 0, ao: 1 });
    b.glow.box(x0, y, z0 + t, x0 + t, y + 0.05, z1 - t, color, { jit: 0, ao: 1 });
    b.glow.box(x1 - t, y, z0 + t, x1, y + 0.05, z1 - t, color, { jit: 0, ao: 1 });
  };
  const block = (x, z, w, d, top, color, glowColor, y0 = Y) => {
    b.box(cx + x, y0, cz + z, w, top - y0, d, color, { jit: 0.04, uvScale: 3 });
    if (glowColor !== null) neon(cx + x - w / 2, cz + z - d / 2, cx + x + w / 2, cz + z + d / 2, top, glowColor ?? CYAN_GLOW);
  };

  // --- paved plaza ------------------------------------------------------
  b.slab(cx - 82, Y - 1.6, cz - 82, cx + 82, Y + 0.12, cz + 82, CONCRETE, { colBottom: Y - 1.6, jit: 0.02, uvScale: 6 });
  for (let r = 0; r < 4; r++) {
    const s = 70 - r * 16;
    const c = r % 2 ? 0xe9edf2 : 0x9aa1aa;
    b.solid.box(cx - s, Y + 0.12, cz - s, cx + s, Y + 0.145, cz + s, c, { jit: 0, ao: 1, noBottom: true });
    b.solid.box(cx - s + 1.2, Y + 0.145, cz - s + 1.2, cx + s - 1.2, Y + 0.16, cz + s - 1.2, 0xc3c6ca, { jit: 0, ao: 1, noBottom: true });
  }
  // coloured guide lines to the four arches
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const len = 60;
    b.glow.box(cx + (dx ? 12 * dx : -0.4), Y + 0.165, cz + (dz ? 12 * dz : -0.4), cx + (dx ? (12 + len) * dx : 0.4), Y + 0.185, cz + (dz ? (12 + len) * dz : 0.4), CYAN_GLOW, { jit: 0, ao: 1 });
  }

  // --- the Spire: spiral of jumps around a tall pillar --------------------
  const N = 22, R = 6.8, step = 1.3;
  b.box(cx, Y, cz, 6, step * N + 0.5, 6, DARK, { uvScale: 3 });
  for (let i = 0; i < N; i++) {
    const th = i * 0.72;
    const px = Math.cos(th) * R, pz = Math.sin(th) * R;
    const top = Y + step * (i + 1);
    const c = pal[i % 4];
    b.box(cx + px, top - 0.5, cz + pz, 3.2, 0.5, 3.2, c, { jit: 0.03 });
    neon(cx + px - 1.6, cz + pz - 1.6, cx + px + 1.6, cz + pz + 1.6, top, i % 2 ? CYAN_GLOW : PINK_GLOW);
    if (i < 5) b.floorLoot(cx + px, top, cz + pz, true, 'parkour');
  }
  const deckTop = Y + step * N + 0.5;
  b.box(cx, deckTop - 0.5, cz, 11, 0.5, 11, CONCRETE, { jit: 0.03 });
  neon(cx - 5.5, cz - 5.5, cx + 5.5, cz + 5.5, deckTop, LIME_GLOW);
  b.chest(cx - 2, deckTop, cz + 1.5, 0.6);
  b.chest(cx + 2, deckTop, cz - 1.5, 3.9);
  b.floorLoot(cx + 3, deckTop, cz + 3, true, 'parkour');
  b.floorLoot(cx - 3, deckTop, cz - 3, true, 'parkour');
  // flagpole on the top
  b.cylinder(cx + 4.8, deckTop, cz + 4.8, 0.08, 6, 0xeeeeee, { sides: 5, solid: false });
  b.glow.box(cx + 4.8, deckTop + 4.6, cz + 4.8, cx + 6.6, deckTop + 5.8, cz + 4.9, PINK_GLOW, { jit: 0, ao: 1 });

  // --- rooftop run (gap jumps of increasing height) -------------------------
  const heights = [1.6, 3.0, 4.4, 2.8, 4.2, 5.6, 4.0, 5.4];
  heights.forEach((h, i) => {
    const x = 24 + i * 9;
    block(x, -32, 5, 5, Y + h, i % 2 ? TEAL : ORANGE, i % 2 ? PINK_GLOW : CYAN_GLOW);
    if (i % 3 === 1) b.floorLoot(cx + x, Y + h, cz - 32, true, 'parkour');
  });
  block(96, -32, 6, 6, Y + 6.6, MAGENTA, LIME_GLOW);
  b.chest(cx + 96, Y + 6.6, cz - 32, 1.57);

  // --- ramp park -------------------------------------------------------------
  b.ramp(cx - 62, cz - 46, cx - 54, cz - 30, Y + 0.12, Y + 5, 'z', false, Y - 0.2, ORANGE);
  block(-58, -50, 8, 8, Y + 5, ORANGE, CYAN_GLOW);
  b.chest(cx - 58, Y + 5, cz - 50, 0);
  b.ramp(cx - 50, cz - 34, cx - 44, cz - 28, Y + 0.12, Y + 6, 'z', false, Y - 0.2, TEAL);
  block(-47, -37.5, 6, 7, Y + 6, TEAL, PINK_GLOW);
  b.floorLoot(cx - 47, Y + 6, cz - 37.5, true, 'parkour');
  // a pair of facing quarter pipes
  b.ramp(cx - 40, cz + 6, cx - 28, cz + 10, Y + 0.12, Y + 4, 'x', true, Y - 0.2, MAGENTA);
  b.ramp(cx - 22, cz + 6, cx - 10, cz + 10, Y + 0.12, Y + 4, 'x', false, Y - 0.2, MAGENTA);
  b.floorLoot(cx - 25, Y, cz + 8, false, 'parkour');

  // --- balance beams between two towers -----------------------------------
  block(-25, -62, 6, 6, Y + 6, DARK, CYAN_GLOW);
  block(-25, -92, 6, 6, Y + 6, DARK, PINK_GLOW);
  b.slab(cx - 25.4, Y + 5.6, cz - 89, cx - 24.6, Y + 6, cz - 65, YELLOW, { jit: 0.02 });
  b.slab(cx - 22.6, Y + 5.6, cz - 89, cx - 22.0, Y + 6, cz - 65, YELLOW, { jit: 0.02 });
  b.chest(cx - 25, Y + 6, cz - 92, 3.14);
  b.floorLoot(cx - 25, Y + 6, cz - 62, true, 'parkour');
  // ramp up to the first tower
  b.ramp(cx - 35, cz - 62, cx - 28, cz - 40, Y + 0.12, Y + 2.2, 'z', false, Y - 0.2, CONCRETE);

  // --- stepped pyramid ----------------------------------------------------------
  const pyr = [26, 20, 14, 8];
  pyr.forEach((s, i) => {
    block(12, 56, s, s, Y + 1.3 * (i + 1), i % 2 ? CONCRETE : 0xaab0b8, i === 3 ? LIME_GLOW : null);
  });
  b.chest(cx + 12, Y + 5.2, cz + 56, 0);
  b.floorLoot(cx + 8, Y + 5.2, cz + 56, true, 'parkour');
  b.floorLoot(cx + 4, Y + 3.9, cz + 56, true, 'parkour');
  b.floorLoot(cx + 20, Y + 2.6, cz + 56, true, 'parkour');

  // --- crate stairs + loft ----------------------------------------------------------
  for (let i = 0; i < 3; i++) block(-48 + i * 2.2, 44, 2.2, 2.2, Y + 1.0 * (i + 1), 0xb78a4a, null);
  block(-39, 44, 6, 6, Y + 3, 0xb78a4a, YELLOW);
  b.chest(cx - 39, Y + 3, cz + 44, 1.57);
  for (const [x, z] of [[-30, 56], [-26, 58], [-34, 30], [30, 20], [50, 40], [44, 70]]) b.crate(cx + x, cz + z, 1.4, 0xb78a4a, Y + 0.12);

  // --- an obstacle course near the east side ---------------------------------------------------
  block(50, 10, 4, 4, Y + 2.4, ORANGE, CYAN_GLOW);
  block(58, 17, 4, 4, Y + 3.8, TEAL, PINK_GLOW);
  block(66, 24, 4, 4, Y + 5.2, MAGENTA, CYAN_GLOW);
  block(74, 31, 4, 4, Y + 3.6, YELLOW, PINK_GLOW);
  block(82, 38, 6, 6, Y + 5.0, DARK, LIME_GLOW);
  b.chest(cx + 82, Y + 5.0, cz + 38, 2.4);
  b.floorLoot(cx + 66, Y + 5.2, cz + 24, true, 'parkour');

  // --- taller walls to hop between ------------------------------------------------------------------
  for (let i = 0; i < 5; i++) block(-70 + i * 3.2, 70, 0.8, 8, Y + 2.0 + (i % 2) * 1.0 + i * 0.3, CONCRETE, null);

  // --- ground loot scattered around the paved area --------------------------------------------------------
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2 + 0.3, r = 18 + (i % 5) * 11;
    b.floorLoot(cx + Math.cos(a) * r, Y + 0.12, cz + Math.sin(a) * r, false, 'parkour');
  }
  for (const [x, z] of [[-15, -15], [20, 15], [-8, 35], [35, -8]]) b.chest(cx + x, Y + 0.12, cz + z, Math.random() * 6.28);

  // --- jump pads ---------------------------------------------------------------------------------------------------
  const pads = [
    [12, -12, 21], [-12, 12, 21], [58, -26, 20], [-46, -20, 19], [-4, 78, 20], [40, 10, 18], [-70, 40, 20], [96, -50, 18],
  ];
  for (const [x, z, vy] of pads) {
    const px = cx + x, pz = cz + z;
    b.cylinder(px, Y + 0.12, pz, 1.6, 0.2, 0x252a33, { sides: 14, solid: false });
    b.glow.cyl(px, Y + 0.32, pz, 1.3, 0.05, CYAN_GLOW, { sides: 14 });
    b.glow.cyl(px, Y + 0.37, pz, 0.7, 0.04, 0xffffff, { sides: 10 });
    b.jumpPads.push({ x: px, y: Y + 0.12, z: pz, r: 1.5, vy, vx: 0, vz: 0 });
  }

  // --- arches + signs -------------------------------------------------------------------------------------------------
  const arch = (x, z, rot) => {
    const px = rot ? 0 : 1, pz = rot ? 1 : 0;
    for (const s of [-1, 1]) {
      b.box(cx + x + px * 0 + (rot ? s * 7 : 0), Y, cz + z + (rot ? 0 : s * 7), 1.4, 11, 1.4, DARK, { uvScale: 3 });
    }
    const bw = rot ? 15.4 : 1.6, bd = rot ? 1.6 : 15.4;
    b.box(cx + x, Y + 10, cz + z, bw, 1.4, bd, CONCRETE);
    b.glow.box(cx + x - (rot ? 7.4 : -0.1), Y + 11.4, cz + z - (rot ? -0.1 : 7.4), cx + x + (rot ? 7.4 : 0.1), Y + 11.5, cz + z + (rot ? 0.1 : 7.4), PINK_GLOW, { jit: 0, ao: 1 });
    const sign = makeSign('PARKOUR PLAZA', 12, 3, { bg: '#101a2e', fg: '#35e8ff', border: '#ff3df0', font: 'bold 80px Arial Black, Arial, sans-serif', glow: true });
    sign.position.set(cx + x + (rot ? 0 : 0.9), Y + 8.2, cz + z + (rot ? 0.9 : 0));
    sign.rotation.y = rot ? 0 : Math.PI / 2;
    b.meshes.push(sign);
  };
  arch(-84, 0, false);
  arch(84, 0, false);
  arch(0, -84, true);
  arch(0, 84, true);

  // --- greenery ---------------------------------------------------------------------------------------------------------
  for (const [x, z] of [[-76, -76], [76, -76], [-76, 76], [76, 76], [-40, -76], [40, 76], [76, 20], [-76, 20]]) {
    b.box(cx + x, Y + 0.12, cz + z, 5, 0.6, 5, 0x6b4a2b, { jit: 0.03 });
    world.props.addInstance('oak', cx + x, cz + z, 0.9, 0, Y + 0.7);
  }

  world.addBuilder(b, poi.id);
  return b;
}
