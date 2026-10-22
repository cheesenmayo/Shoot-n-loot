// Static layout of the island. x = east, z = south (the minimap's "down").
// Pure data so both the terrain generator and the POI builders can read it.

export const POIS = [
  {
    id: 'parkour_plaza', name: 'Parkour Plaza', x: 0, z: -40, y: 'auto',
    flatR: 105, blendR: 200, clearR: 120, color: '#38d6ff',
    chests: 9, floorLoot: 34, bias: { parkour: 2.6, floorange: 2 }, rough: 0,
  },
  {
    id: 'distant_desert', name: 'Distant Desert', x: -540, z: 420, y: 6,
    flatR: 190, blendR: 330, clearR: 150, color: '#ffb347',
    chests: 14, floorLoot: 26, bias: { west: 2.2 }, rough: 0.7,
  },
  {
    id: 'floorange_grove', name: 'Floorange Grove', x: 500, z: 400, y: 'auto',
    flatR: 120, blendR: 230, clearR: 130, color: '#ff8a1f',
    chests: 8, floorLoot: 32, bias: { floorange: 6, food: 2.5 }, rough: 1.2, grassOk: true,
  },
  {
    id: 'frostpeak_lodge', name: 'Frostpeak Lodge', x: -400, z: -380, y: 'auto',
    flatR: 80, blendR: 150, clearR: 95, color: '#bfe6ff',
    chests: 8, floorLoot: 22, bias: { heavy: 1.6 }, rough: 0.5,
  },
  {
    id: 'bluewater_lake', name: 'Bluewater Lake', x: 480, z: -430, y: 3,
    flatR: 235, blendR: 340, clearR: 225, color: '#4fa8ff',
    chests: 8, floorLoot: 24, bias: { ranged: 1.3 }, rough: 0.2, grassOk: true,
  },
  {
    id: 'neon_heights', name: 'Neon Heights', x: 10, z: -590, y: 'auto',
    flatR: 140, blendR: 230, clearR: 150, color: '#ff4fd8',
    chests: 14, floorLoot: 40, bias: { smg: 1.5, shield: 1.6 }, rough: 0,
  },
  {
    id: 'pinewood_camp', name: 'Pinewood Camp', x: -650, z: -20, y: 'auto',
    flatR: 85, blendR: 160, clearR: 100, color: '#5bd16a',
    chests: 6, floorLoot: 22, bias: { melee: 1.8 }, rough: 0.4, grassOk: true,
  },
  {
    id: 'rusty_yard', name: 'Rusty Yard', x: 380, z: -20, y: 'auto',
    flatR: 115, blendR: 200, clearR: 125, color: '#d9d2c6',
    chests: 9, floorLoot: 30, bias: { explosive: 1.7, heavy: 1.3 }, rough: 0,
  },
];

export const POI_BY_ID = Object.fromEntries(POIS.map((p) => [p.id, p]));

export const LAKE = { x: 480, z: -430, r: 150, level: 0 };
export const DESERT = { x: -540, z: 420, r: 330 };
export const MOUNTAIN = { x: -500, z: -520, sigma: 215, height: 118 };

// Smaller, unnamed locations scattered over the island. Placed by the world
// generator on suitable terrain; `type` picks the builder.
export const OUTPOST_COUNT = 16;
