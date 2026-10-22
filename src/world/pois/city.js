import { Builder } from '../builder.js';
import { POI_BY_ID } from '../poidata.js';
import { wallSign } from './common.js';
import { mulberry32 } from '../../util.js';

const ASPHALT = 0x3a3d42, SIDEWALK = 0xaeb1b5;
const GLOWS = [0x35e8ff, 0xff3df0, 0xffd23f, 0x9dff3a];
const NEON_STYLE = (bg, fg, border) => ({ bg, fg, border, font: 'bold 72px Arial Black, Arial', glow: true });

export function buildCity(world) {
  const poi = POI_BY_ID.neon_heights;
  const b = new Builder(world, 81);
  b.poiId = poi.id;
  const cx = poi.x, cz = poi.z, Y = poi.y;
  const rng = mulberry32(8181);
  const P = 64, BS = 50;

  // street level + sidewalks
  b.mapRect(cx - 112, cz - 112, cx + 112, cz + 112, '#4a4e55');
  for (const i of [-1, 0, 1]) for (const j of [-1, 0, 1]) b.mapRect(cx + i * P - BS / 2, cz + j * P - BS / 2, cx + i * P + BS / 2, cz + j * P + BS / 2, '#9aa0a8');
  b.slab(cx - 112, Y - 1.5, cz - 112, cx + 112, Y + 0.05, cz + 112, ASPHALT, { colBottom: Y - 1.5, jit: 0.01, uvScale: 5 });
  for (const i of [-1, 0, 1]) for (const j of [-1, 0, 1]) {
    b.slab(cx + i * P - BS / 2, Y, cz + j * P - BS / 2, cx + i * P + BS / 2, Y + 0.18, cz + j * P + BS / 2, SIDEWALK, { jit: 0.02, uvScale: 4 });
  }
  // lane markings
  for (const k of [-96, -32, 32, 96]) {
    for (let t = -108; t < 108; t += 8) {
      b.solid.box(cx + t, Y + 0.05, cz + k - 0.15, cx + t + 4, Y + 0.075, cz + k + 0.15, 0xe9d24a, { jit: 0, ao: 1, noBottom: true });
      b.solid.box(cx + k - 0.15, Y + 0.05, cz + t, cx + k + 0.15, Y + 0.075, cz + t + 4, 0xe9d24a, { jit: 0, ao: 1, noBottom: true });
    }
  }

  const tower = (x, z, w, d, h, color = 0x9aa4b0, beacon = GLOWS[Math.floor(rng() * 4)]) => {
    b.box(cx + x, Y + 0.18, cz + z, w, h, d, color, { batch: b.tower, uvX: 12, uvY: 27, jit: 0.04, ao: 0.9 });
    // rooftop
    b.box(cx + x, Y + 0.18 + h, cz + z, w + 0.6, 0.8, d + 0.6, 0x3a4048, { jit: 0.02 });
    b.box(cx + x + w * 0.2, Y + 0.18 + h + 0.8, cz + z - d * 0.2, 3, 2, 3, 0x6b7279, { jit: 0.05 });
    b.cylinder(cx + x - w * 0.25, Y + 0.18 + h + 0.8, cz + z + d * 0.2, 0.15, 8, 0xb0b5ba, { sides: 5, solid: false });
    b.glow.blob(cx + x - w * 0.25, Y + 0.18 + h + 9, cz + z + d * 0.2, 0.5, 0.5, 0.5, beacon, { seg: 6, rings: 3, wobble: 0, ao: 1 });
    // neon crown
    b.glow.box(cx + x - w / 2 - 0.05, Y + 0.18 + h - 1.2, cz + z - d / 2 - 0.05, cx + x + w / 2 + 0.05, Y + 0.18 + h - 0.9, cz + z + d / 2 + 0.05, beacon, { jit: 0, ao: 1 });
    // chests / loot at the base entrance plaza
    b.chest(cx + x + w / 2 + 2, Y + 0.18, cz + z, 0);
    b.floorLoot(cx + x - w / 2 - 2, Y + 0.18, cz + z, false);
  };

  const modern = (id, x, z, w, d, floors, side, color, sign, signStyle, o = {}) => {
    const desc = b.building({
      id, x: cx + x, z: cz + z, w, d, floors, floorH: o.floorH ?? 3.4, color, trim: 0x2d3440, floorColor: 0x8a8f96, baseColor: 0x6b7178,
      slabColor: 0xaab0b6, roofColor: 0x4b5159, stairColor: 0x9aa0a6, doors: o.doors ?? [{ side, off: 0 }], roof: 'flat', parapet: 0.9, band: floors > 1,
      windowW: 1.9, windowH: 1.6, windowSpacing: 3.6, doorW: o.doorW ?? 2.2, y: Y + 0.18,
    });
    if (sign) wallSign(b, desc, side, sign, { y: desc.y0 + 3.0, h: 1.1, w: Math.min(w - 1, Math.max(4, sign.length * 0.8)), style: signStyle });
    b.stockBuilding(desc, { chests: o.chests ?? 2, floorSpots: o.spots ?? 3 });
    // roof clutter
    b.box(cx + x + w * 0.25, desc.topY, cz + z, 2.4, 1.2, 2.4, 0x777e86, { jit: 0.05 });
    return desc;
  };

  const car = (x, z, alongX, color) => {
    const y = Y + 0.05;
    const w = alongX ? 4.3 : 1.9, d = alongX ? 1.9 : 4.3;
    b.box(cx + x, y + 0.25, cz + z, w, 0.75, d, color, { jit: 0.03, uvScale: 4 });
    b.box(cx + x, y + 1.0, cz + z, alongX ? 2.3 : 1.7, 0.6, alongX ? 1.7 : 2.3, 0x1d2a38, { jit: 0.02, ao: 1 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      b.solid.box(cx + x + sx * (alongX ? 1.4 : 0.85) - 0.3, y, cz + z + sz * (alongX ? 0.85 : 1.4) - 0.3, cx + x + sx * (alongX ? 1.4 : 0.85) + 0.3, y + 0.55, cz + z + sz * (alongX ? 0.85 : 1.4) + 0.3, 0x111111, { ao: 1 });
    }
  };
  const carColors = [0xc0392b, 0x2980b9, 0xf1c40f, 0x27ae60, 0xecf0f1, 0x8e44ad, 0x34495e, 0xe67e22];
  for (let i = 0; i < 26; i++) {
    const street = [-96, -32, 32, 96][Math.floor(rng() * 4)];
    const t = -100 + rng() * 200;
    if (Math.abs(t) < 8) continue;
    const alongX = rng() < 0.5;
    const off = (rng() < 0.5 ? -1 : 1) * 4;
    const x = alongX ? t : street + off, z = alongX ? street + off : t;
    car(x, z, alongX, carColors[Math.floor(rng() * carColors.length)]);
    if (rng() < 0.3) b.floorLoot(cx + x, Y + 2, cz + z, false);
  }

  // street lights
  for (const k of [-96, -32, 32, 96]) {
    for (let t = -100; t <= 100; t += 25) {
      for (const [x, z] of [[t, k - 7.5], [k - 7.5, t]]) {
        b.solid.cyl(cx + x, Y + 0.05, cz + z, 0.12, 6, 0x3b3f45, { sides: 5 });
        b.glow.blob(cx + x, Y + 6.1, cz + z, 0.4, 0.2, 0.4, 0xfff2c0, { seg: 5, rings: 3, wobble: 0, ao: 1 });
      }
    }
  }

  // ---- blocks -----------------------------------------------------------------------------------------
  // centre: the Neon Tower plaza
  tower(0, 0, 22, 22, 78, 0x7f8fa6, 0xff3df0);
  for (const [x, z] of [[-14, -14], [14, 14], [-14, 14], [14, -14]]) {
    b.cylinder(cx + x, Y + 0.18, cz + z, 1.6, 0.5, 0x55606b, { sides: 8 });
    world.props.addInstance('oak', cx + x, cz + z, 0.55, 0, Y + 0.7);
  }
  // north row
  modern('office_a', -64 + 8, -64 - 10, 22, 18, 3, 'S', 0xd9d6cf, 'NEON OFFICES', NEON_STYLE('#101a2e', '#35e8ff', '#35e8ff'));
  modern('cafe', -64 - 12, -64 + 16, 14, 9, 1, 'S', 0xf0b090, 'CAFE', NEON_STYLE('#2a1020', '#ff9ad8', '#ff3df0'), { chests: 1 });
  modern('mall', 0, -64, 38, 24, 2, 'S', 0xe6e2da, 'NEON MALL', NEON_STYLE('#1a1030', '#ff3df0', '#35e8ff'), { doors: [{ side: 'S', off: -8 }, { side: 'S', off: 8 }, { side: 'N', off: 0 }], chests: 4, spots: 6, doorW: 3 });
  tower(64 - 6, -64 - 8, 20, 20, 54, 0x8a98a8, 0xffd23f);
  modern('hotel_shop', 64 + 6, -64 + 18, 16, 9, 1, 'S', 0xb9c7d8, 'MINI MART', NEON_STYLE('#102a20', '#9dff3a', '#9dff3a'), { chests: 1 });
  // middle row
  modern('bank', -64, 0, 24, 20, 3, 'E', 0xcfc8b6, 'FIRST NEON BANK', NEON_STYLE('#1a2a1a', '#ffe28a', '#ffe28a'), { chests: 3 });
  tower(64, 0, 22, 22, 44, 0x9c8f8f, 0x35e8ff);
  // south row
  modern('warehouse', -64, 64, 32, 20, 1, 'N', 0x8a8f96, 'LOADING DOCK', NEON_STYLE('#2a2a10', '#ffd23f', '#ffd23f'), { floorH: 5, doors: [{ side: 'N', off: -6 }, { side: 'N', off: 8 }], doorW: 3.6, chests: 3, spots: 5 });
  modern('office_b', 0, 64 + 4, 24, 18, 3, 'N', 0xc9d3dc, 'SKYVIEW', NEON_STYLE('#101a2e', '#9dff3a', '#9dff3a'));
  tower(64 + 6, 64 + 8, 20, 20, 62, 0x7d93a6, 0xff3df0);
  modern('diner', 64 - 8, 64 - 14, 14, 9, 1, 'N', 0xe8625a, 'DINER', NEON_STYLE('#2a1010', '#ff6a5a', '#ff3df0'), { chests: 1 });

  // billboard + neon arch over the main avenue
  for (const s of [-1, 1]) b.box(cx + s * 9, Y + 0.05, cz - 106, 1.6, 12, 1.6, 0x3a4048, {});
  b.box(cx, Y + 11, cz - 106, 20, 1.6, 1.6, 0x3a4048, {});
  b.glow.box(cx - 9.6, Y + 11.5, cz - 106.1, cx + 9.6, Y + 11.7, cz - 105.9, 0xff3df0, { jit: 0, ao: 1 });
  // loot on streets
  for (let i = 0; i < 20; i++) {
    const street = [-96, -32, 32, 96][Math.floor(rng() * 4)];
    const t = -100 + rng() * 200;
    const alongX = rng() < 0.5;
    b.floorLoot(cx + (alongX ? t : street + 2), Y + 0.06, cz + (alongX ? street + 2 : t), false);
  }
  world.addBuilder(b, poi.id);
}
