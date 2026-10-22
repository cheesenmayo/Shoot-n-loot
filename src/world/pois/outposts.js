import { Builder } from '../builder.js';
import { findSites } from './common.js';
import { cabin, tent, campfire, watchTower } from './common.js';
import { OUTPOST_COUNT } from '../poidata.js';
import { WORLD } from '../terrain.js';

// Small unnamed camps scattered over the island so the gaps between POIs have something in them.
export function buildOutposts(world) {
  const sites = findSites(world, {
    count: OUTPOST_COUNT, seed: 505, radius: 860, minSep: 150, flatness: 1.0, footprint: 8, tries: 12000,
    accept: (x, z, h) => h < 45 && Math.hypot(x, z) < WORLD.islandR - 60 && !(world.homesteads || []).some((s) => Math.hypot(x - s.x, z - s.z) < 120),
  });
  const b = new Builder(world, 99);
  b.poiId = 'outpost';
  world.outposts = [];
  for (const s of sites) {
    const r = s.rng;
    const kind = Math.floor(r() * 5);
    const y = s.h;
    if (kind === 0) {
      cabin(b, { x: s.x, z: s.z, w: 7.5, d: 6.5, side: ['N', 'S', 'E', 'W'][Math.floor(r() * 4)], y: y, chests: 1, spots: 2 });
      campfire(b, s.x + 9, s.z + 4);
    } else if (kind === 1) {
      tent(b, s.x - 3, s.z, 0xc9602b);
      tent(b, s.x + 3, s.z + 1, 0x2f7a9a);
      tent(b, s.x, s.z - 4, 0x7a9a2f);
      campfire(b, s.x, s.z + 4.5);
      b.chest(s.x + 6, b.h(s.x + 6, s.z), s.z, 0);
      b.crate(s.x - 6, s.z + 3, 1.2);
      b.floorLoot(s.x + 2, b.h(s.x + 2, s.z + 8), s.z + 8, false);
      b.floorLoot(s.x - 5, b.h(s.x - 5, s.z - 3), s.z - 3, false);
    } else if (kind === 2) {
      watchTower(b, s.x, s.z, { height: 9 + Math.floor(r() * 4) });
      b.crate(s.x - 5, s.z + 4, 1.1);
      b.floorLoot(s.x + 5, b.h(s.x + 5, s.z + 5), s.z + 5, false);
    } else if (kind === 3) {
      // ruined stone walls
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + r();
        const x = s.x + Math.cos(a) * 5, z = s.z + Math.sin(a) * 5;
        const w = 2 + r() * 3, h = 1.2 + r() * 2.5;
        b.box(x, b.h(x, z) - 0.3, z, i % 2 ? w : 0.8, h, i % 2 ? 0.8 : w, 0x8a867e, { jit: 0.1 });
      }
      b.chest(s.x, b.h(s.x, s.z), s.z, 0);
      b.floorLoot(s.x + 3, b.h(s.x + 3, s.z + 3), s.z + 3, false);
      b.floorLoot(s.x - 3, b.h(s.x - 3, s.z - 2), s.z - 2, false);
    } else {
      const d = b.building({
        id: 'shed', x: s.x, z: s.z, w: 9, d: 7, floors: 1, color: 0x8c5a3a, trim: 0x3a2716, floorColor: 0x6a4a2e, baseColor: 0x77706a,
        roofColor: 0x6a5545, doors: [{ side: 'S', off: 0 }], roof: 'flat', parapet: 0.4, y,
      });
      b.stockBuilding(d, { chests: 1, floorSpots: 2 });
      b.hay(s.x + 7, s.z + 2, y); b.hay(s.x + 8.8, s.z + 2, y);
      b.fence(s.x - 6, s.z + 9, s.x + 6, s.z + 9);
    }
    world.outposts.push({ x: s.x, z: s.z });
  }
  world.addBuilder(b, 'outposts');
}
