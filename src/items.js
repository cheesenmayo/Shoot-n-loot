// Item database: weapons, throwables, gadgets, consumables, ammo + loot tables.
import { weightedPick } from './util.js';

export const RARITIES = [
  { id: 'common', name: 'Common', color: '#b9bec7', css: '#b9bec7', mult: 1.0, weight: 44 },
  { id: 'uncommon', name: 'Uncommon', color: '#5fd35a', css: '#5fd35a', mult: 1.05, weight: 28 },
  { id: 'rare', name: 'Rare', color: '#4aa8ff', css: '#4aa8ff', mult: 1.1, weight: 16 },
  { id: 'epic', name: 'Epic', color: '#c35cff', css: '#c35cff', mult: 1.15, weight: 8 },
  { id: 'legendary', name: 'Legendary', color: '#ffb62e', css: '#ffb62e', mult: 1.2, weight: 4 },
];

export const AMMO = {
  light: { name: 'Light Ammo', icon: '•', color: '#e8c86a', pack: 30, max: 300 },
  medium: { name: 'Medium Ammo', icon: '▮', color: '#d98a3a', pack: 30, max: 240 },
  heavy: { name: 'Heavy Ammo', icon: '▌', color: '#c44a4a', pack: 10, max: 60 },
  shells: { name: 'Shells', icon: '◍', color: '#d95f5f', pack: 8, max: 64 },
  rockets: { name: 'Rockets', icon: '▲', color: '#8a8f96', pack: 3, max: 18 },
};

export const ITEMS = {};
const add = (d) => { ITEMS[d.id] = d; return d; };

const gun = (o) => add({
  kind: 'gun', auto: false, pellets: 1, headshot: 2, spread: 2, adsSpread: 0.4, zoom: 0.82, recoil: 1,
  noise: 140, tracer: 0xffe9a8, minR: 0, maxR: 4, weight: 10, tags: [], falloff: [60, 140, 0.6], range: 300,
  spinUp: 0, burst: 0, ...o,
});

// ---- pistols ----------------------------------------------------------------------------------------------
gun({ id: 'pistol', name: 'Pistol', cat: 'pistol', icon: '🔫', model: 'pistol', sound: 'pistol', ammo: 'light', dmg: 24, rate: 6.5, mag: 16, reload: 1.5, spread: 1.6, recoil: 1.2, weight: 14, tags: ['ranged'], falloff: [35, 90, 0.55], maxR: 3 });
gun({ id: 'revolver', name: 'Revolver', cat: 'pistol', icon: '🤠', model: 'revolver', sound: 'revolver', ammo: 'medium', dmg: 62, rate: 1.7, mag: 6, reload: 2.8, spread: 0.9, headshot: 2.2, recoil: 3, weight: 9, tags: ['west', 'ranged'], falloff: [50, 120, 0.6], maxR: 4 });
gun({ id: 'hand_cannon', name: 'Hand Cannon', cat: 'pistol', icon: '💥', model: 'hand_cannon', sound: 'cannon', ammo: 'heavy', dmg: 78, rate: 1.9, mag: 7, reload: 2.5, spread: 0.8, headshot: 2.0, recoil: 4, weight: 4, minR: 3, noise: 200, falloff: [60, 130, 0.65] });
// ---- SMGs -----------------------------------------------------------------------------------------------------
gun({ id: 'smg', name: 'Submachine Gun', cat: 'smg', icon: '🔫', model: 'smg', sound: 'smg', ammo: 'light', dmg: 17, rate: 12, mag: 30, reload: 2.1, spread: 3.2, auto: true, headshot: 1.7, recoil: 0.7, weight: 14, tags: ['smg', 'ranged'], falloff: [28, 70, 0.5], noise: 120 });
gun({ id: 'silenced_smg', name: 'Suppressed SMG', cat: 'smg', icon: '🤫', model: 'silenced_smg', sound: 'silenced', ammo: 'light', dmg: 18, rate: 11, mag: 30, reload: 2.0, spread: 2.6, auto: true, headshot: 1.7, recoil: 0.6, weight: 8, tags: ['smg'], falloff: [30, 75, 0.5], noise: 35, tracer: 0xbfe1ff, minR: 1 });
// ---- assault rifles ---------------------------------------------------------------------------------------------
gun({ id: 'ar', name: 'Assault Rifle', cat: 'rifle', icon: '🔫', model: 'ar', sound: 'rifle', ammo: 'medium', dmg: 30, rate: 5.6, mag: 30, reload: 2.4, spread: 2.2, auto: true, headshot: 1.9, recoil: 0.9, weight: 18, tags: ['ranged'], falloff: [70, 170, 0.6], noise: 160 });
gun({ id: 'burst_ar', name: 'Burst Rifle', cat: 'rifle', icon: '🔫', model: 'burst_ar', sound: 'rifle', ammo: 'medium', dmg: 32, rate: 2.3, burst: 3, mag: 30, reload: 2.5, spread: 1.6, headshot: 2.0, recoil: 1.0, weight: 10, tags: ['ranged'], falloff: [80, 190, 0.65] });
gun({ id: 'heavy_ar', name: 'Heavy Assault Rifle', cat: 'rifle', icon: '🔫', model: 'heavy_ar', sound: 'heavy', ammo: 'medium', dmg: 42, rate: 4.0, mag: 25, reload: 2.9, spread: 2.0, auto: true, headshot: 1.9, recoil: 1.6, weight: 5, minR: 2, tags: ['ranged'], falloff: [80, 190, 0.65], noise: 180 });
gun({ id: 'lever', name: 'Lever-Action Rifle', cat: 'rifle', icon: '🤠', model: 'lever', sound: 'lever', ammo: 'medium', dmg: 56, rate: 1.3, mag: 8, reload: 2.9, spread: 0.7, headshot: 2.3, recoil: 2.4, weight: 8, tags: ['west', 'ranged'], falloff: [90, 220, 0.7], zoom: 0.7, minR: 0, maxR: 4 });
// ---- shotguns --------------------------------------------------------------------------------------------------------
gun({ id: 'pump', name: 'Pump Shotgun', cat: 'shotgun', icon: '🔫', model: 'pump', sound: 'shotgun', ammo: 'shells', dmg: 11, pellets: 10, rate: 0.95, mag: 5, reload: 4.4, spread: 5.5, headshot: 1.8, recoil: 5, weight: 13, tags: ['shotgun', 'ranged'], falloff: [8, 28, 0.2], range: 60, noise: 170, tracer: 0xffd27a });
gun({ id: 'tac_shotgun', name: 'Tactical Shotgun', cat: 'shotgun', icon: '🔫', model: 'tac_shotgun', sound: 'shotgun', ammo: 'shells', dmg: 8, pellets: 9, rate: 2.2, mag: 6, reload: 4.0, spread: 5.0, headshot: 1.6, recoil: 3, weight: 11, tags: ['shotgun', 'ranged'], falloff: [8, 26, 0.2], range: 55, noise: 170, tracer: 0xffd27a });
gun({ id: 'double_barrel', name: 'Double Barrel', cat: 'shotgun', icon: '🤠', model: 'double_barrel', sound: 'shotgun', ammo: 'shells', dmg: 13, pellets: 12, rate: 1.4, mag: 2, reload: 2.4, spread: 6.5, headshot: 1.8, recoil: 6, weight: 8, tags: ['west', 'shotgun'], falloff: [7, 24, 0.15], range: 50, noise: 190, tracer: 0xffd27a });
gun({ id: 'auto_shotgun', name: 'Auto Shotgun', cat: 'shotgun', icon: '🔫', model: 'auto_shotgun', sound: 'shotgun', ammo: 'shells', dmg: 7, pellets: 8, rate: 3.4, mag: 10, reload: 4.6, spread: 5.8, auto: true, headshot: 1.5, recoil: 2.4, weight: 4, minR: 2, tags: ['shotgun'], falloff: [8, 24, 0.2], range: 50, noise: 170, tracer: 0xffd27a });
// ---- snipers --------------------------------------------------------------------------------------------------------------------
gun({ id: 'bolt_sniper', name: 'Bolt-Action Sniper', cat: 'sniper', icon: '🎯', model: 'bolt_sniper', sound: 'sniper', ammo: 'heavy', dmg: 105, rate: 0.8, mag: 1, reload: 2.6, spread: 0.2, adsSpread: 0.05, headshot: 2.5, zoom: 0.22, recoil: 6, weight: 6, minR: 1, tags: ['ranged', 'heavy'], falloff: [300, 700, 1], range: 900, noise: 260, tracer: 0xffffff });
gun({ id: 'semi_sniper', name: 'Semi-Auto Sniper', cat: 'sniper', icon: '🎯', model: 'semi_sniper', sound: 'sniper', ammo: 'heavy', dmg: 68, rate: 1.7, mag: 10, reload: 3.0, spread: 0.4, adsSpread: 0.1, headshot: 2.3, zoom: 0.3, recoil: 3.5, weight: 5, minR: 1, tags: ['ranged', 'heavy'], falloff: [250, 600, 1], range: 800, noise: 240, tracer: 0xffffff });
// ---- heavy -------------------------------------------------------------------------------------------------------------------------------
gun({ id: 'lmg', name: 'Light Machine Gun', cat: 'lmg', icon: '🔫', model: 'lmg', sound: 'rifle', ammo: 'medium', dmg: 23, rate: 8.5, mag: 60, reload: 4.3, spread: 3.0, auto: true, headshot: 1.7, recoil: 0.8, weight: 5, minR: 1, tags: ['heavy', 'ranged'], falloff: [60, 150, 0.55], noise: 170 });
gun({ id: 'minigun', name: 'Minigun', cat: 'lmg', icon: '🌀', model: 'minigun', sound: 'minigun', ammo: 'medium', dmg: 17, rate: 20, mag: 150, reload: 5.5, spread: 4.5, auto: true, headshot: 1.4, recoil: 0.35, spinUp: 0.7, weight: 2, minR: 3, tags: ['heavy'], falloff: [50, 130, 0.5], noise: 200, speedPenalty: 0.7 });
// ---- explosive --------------------------------------------------------------------------------------------------------------------------------
gun({ id: 'rocket_launcher', name: 'Rocket Launcher', cat: 'launcher', icon: '🚀', model: 'launcher', sound: 'rocket', ammo: 'rockets', dmg: 105, rate: 0.7, mag: 1, reload: 3.5, spread: 0.3, projectile: { speed: 58, gravity: 0, radius: 5.5, fuse: 6, kind: 'rocket' }, weight: 5, minR: 1, tags: ['explosive', 'heavy'], noise: 230, headshot: 1 });
gun({ id: 'grenade_launcher', name: 'Grenade Launcher', cat: 'launcher', icon: '💣', model: 'grenade_launcher', sound: 'grenadel', ammo: 'rockets', dmg: 75, rate: 1.6, mag: 6, reload: 4.2, spread: 0.5, projectile: { speed: 30, gravity: 18, radius: 5, fuse: 2.2, bounce: 0.45, kind: 'grenade' }, weight: 5, minR: 1, tags: ['explosive'], noise: 200, headshot: 1 });
gun({ id: 'crossbow', name: 'Crossbow', cat: 'bow', icon: '🏹', model: 'crossbow', sound: 'crossbow', ammo: 'heavy', dmg: 92, rate: 0.9, mag: 1, reload: 2.2, spread: 0.3, projectile: { speed: 150, gravity: 3, radius: 0, fuse: 4, kind: 'bolt' }, headshot: 2.2, weight: 5, minR: 1, tags: ['ranged'], noise: 25, tracer: 0xdddddd, zoom: 0.6 });

// ---- melee -----------------------------------------------------------------------------------------------------------------------------------------------
const melee = (o) => add({ kind: 'melee', range: 2.7, arc: 1.1, knock: 3, noise: 20, minR: 0, maxR: 4, weight: 8, tags: ['melee'], ...o });
melee({ id: 'pickaxe', name: 'Pickaxe', icon: '⛏️', model: 'pickaxe', dmg: 20, rate: 1.9, weight: 0, maxR: 0 });
melee({ id: 'machete', name: 'Machete', icon: '🔪', model: 'machete', dmg: 33, rate: 1.7, weight: 10, knock: 2 });
melee({ id: 'bat', name: 'Baseball Bat', icon: '🏏', model: 'bat', dmg: 38, rate: 1.3, weight: 9, knock: 9 });
melee({ id: 'katana', name: 'Katana', icon: '🗡️', model: 'katana', dmg: 27, rate: 3.1, weight: 5, minR: 2, range: 2.9 });
melee({ id: 'sledge', name: 'Sledgehammer', icon: '🔨', model: 'sledge', dmg: 68, rate: 0.75, weight: 5, minR: 1, knock: 14, range: 3.0 });

// ---- throwables ------------------------------------------------------------------------------------------------------------------------------------------------
const throwable = (o) => add({ kind: 'throw', stack: 6, noise: 60, minR: 0, maxR: 4, weight: 8, tags: ['explosive'], throwSpeed: 21, gravity: 20, bounce: 0.4, ...o });
throwable({ id: 'frag', name: 'Frag Grenade', icon: '💣', model: 'frag', dmg: 100, radius: 6.5, fuse: 2.2, stack: 6, weight: 12 });
throwable({ id: 'impulse', name: 'Impulse Grenade', icon: '🌀', model: 'impulse', dmg: 0, radius: 9, fuse: 1.3, impulse: 26, stack: 4, weight: 10, tags: ['parkour'], bounce: 0.3 });
throwable({ id: 'dynamite', name: 'Dynamite', icon: '🧨', model: 'dynamite', dmg: 140, radius: 8, fuse: 3.4, stack: 4, weight: 7, tags: ['west', 'explosive'], throwSpeed: 18 });
throwable({ id: 'boogie', name: 'Boogie Bomb', icon: '🪩', model: 'boogie', dmg: 0, radius: 9, fuse: 1.1, dance: 5.5, stack: 4, weight: 4, minR: 1, tags: ['explosive'], bounce: 0.5 });

// ---- gadgets ------------------------------------------------------------------------------------------------------------------------------------------------------
add({ id: 'grappler', name: 'Grappler', kind: 'gadget', icon: '🪝', model: 'grappler', stack: 12, charges: 6, range: 70, weight: 9, tags: ['parkour'], minR: 0, maxR: 4, noise: 40, gadget: 'grapple' });
add({ id: 'launchpad', name: 'Launch Pad', kind: 'gadget', icon: '⏫', model: 'launchpad', stack: 4, charges: 2, weight: 7, tags: ['parkour'], minR: 0, maxR: 3, noise: 50, gadget: 'launchpad' });

// ---- consumables -------------------------------------------------------------------------------------------------------------------------------------------------------
const cons = (o) => add({ kind: 'consume', stack: 6, minR: 0, maxR: 4, weight: 10, tags: ['heal'], hp: 0, shield: 0, hpCap: 100, shieldCap: 100, time: 1, ...o });
cons({ id: 'apple', name: 'Apple', icon: '🍎', model: 'apple', hp: 5, time: 1.0, stack: 6, weight: 16, tags: ['food'], maxR: 0 });
cons({ id: 'banana', name: 'Banana', icon: '🍌', model: 'banana', hp: 5, time: 1.0, stack: 6, weight: 12, tags: ['food'], maxR: 0 });
cons({ id: 'mushroom', name: 'Shield Mushroom', icon: '🍄', model: 'mushroom', shield: 5, time: 1.0, stack: 6, weight: 12, tags: ['food', 'shield'], maxR: 0 });
cons({ id: 'bandage', name: 'Bandage', icon: '🩹', model: 'bandage', hp: 15, hpCap: 75, time: 3.8, stack: 8, weight: 22 });
cons({ id: 'medkit', name: 'Medkit', icon: '🧰', model: 'medkit', hp: 100, hpCap: 100, time: 7.5, stack: 3, weight: 9, minR: 1 });
cons({ id: 'small_shield', name: 'Mini Shield', icon: '🧪', model: 'small_shield', shield: 25, shieldCap: 50, time: 2.4, stack: 6, weight: 22, tags: ['shield'] });
cons({ id: 'big_shield', name: 'Shield Potion', icon: '🔵', model: 'big_shield', shield: 50, shieldCap: 100, time: 4.6, stack: 3, weight: 11, minR: 1, tags: ['shield'] });
cons({ id: 'chug_jug', name: 'Chug Jug', icon: '🏺', model: 'chug_jug', hp: 100, shield: 100, time: 12, stack: 1, weight: 2, minR: 3, tags: ['shield'] });
cons({ id: 'slurp', name: 'Slurp Juice', icon: '🧃', model: 'slurp', hot: { hp: 30, shield: 30, dur: 14 }, time: 1.6, stack: 3, weight: 5, minR: 2, tags: ['shield'] });
cons({ id: 'jumpple', name: 'Jumpple', icon: '🍏', model: 'jumpple', hp: 5, time: 1.0, stack: 4, weight: 8, buff: { speed: 1.38, jump: 1.6, dur: 30 }, tags: ['parkour', 'food'], maxR: 2 });
cons({ id: 'floorange', name: 'Floorange', icon: '🍊', model: 'floorange', hp: 10, time: 0.55, stack: 4, weight: 8, airOnly: true, tags: ['floorange', 'food'], maxR: 1 });

export const ITEM_LIST = Object.values(ITEMS);
export const isStackable = (d) => d.kind === 'throw' || d.kind === 'consume' || d.kind === 'gadget';
export const GUNS = ITEM_LIST.filter((i) => i.kind === 'gun');

// ---------------------------------------------------------------------------
// Stack helpers
// ---------------------------------------------------------------------------
export function makeStack(id, rarity = 0, count = null) {
  const def = ITEMS[id];
  const r = Math.min(Math.max(rarity, def.minR ?? 0), def.maxR ?? 4);
  const st = { def, rarity: r, count: count ?? (def.kind === 'gadget' ? def.charges : def.kind === 'consume' || def.kind === 'throw' ? 1 : 1) };
  if (def.kind === 'gun') st.mag = def.mag;
  return st;
}

export const gunDamage = (st) => st.def.dmg * RARITIES[st.rarity].mult;
export const gunReload = (st) => st.def.reload * (1 - st.rarity * 0.04);
export function dpsOf(st) {
  const d = st.def;
  if (d.kind === 'melee') return d.dmg * RARITIES[st.rarity].mult * d.rate * 0.8;
  if (d.kind === 'gun') {
    const per = d.projectile ? d.dmg : d.dmg * d.pellets * (d.pellets > 1 ? 0.55 : 1);
    return per * RARITIES[st.rarity].mult * d.rate * Math.min(1, d.mag / (d.rate * 4));
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Loot rolling
// ---------------------------------------------------------------------------
const CAT_WEIGHTS = { weapon: 46, heal: 26, ammo: 20, throw: 5, gadget: 3 };

function itemsFor(group) {
  switch (group) {
    case 'weapon': return ITEM_LIST.filter((i) => (i.kind === 'gun' || (i.kind === 'melee' && i.weight > 0)));
    case 'heal': return ITEM_LIST.filter((i) => i.kind === 'consume');
    case 'throw': return ITEM_LIST.filter((i) => i.kind === 'throw');
    case 'gadget': return ITEM_LIST.filter((i) => i.kind === 'gadget');
    default: return [];
  }
}
const POOLS = {};
for (const g of ['weapon', 'heal', 'throw', 'gadget']) POOLS[g] = itemsFor(g);

function rollRarity(def, bias = 0) {
  const weights = RARITIES.map((r, i) => {
    if (i < (def.minR ?? 0) || i > (def.maxR ?? 4)) return [i, 0];
    // bias > 0 shifts toward higher tiers (chests)
    const w = r.weight * Math.pow(1 + bias, i);
    return [i, w];
  });
  return weightedPick(weights);
}

/**
 * Roll a single loot entry. `bias`: poi bias map (tag -> multiplier),
 * `focus`: tag that this loot spot prefers, `rarityBias`: chest quality.
 */
export function rollLoot({ bias = {}, focus = null, rarityBias = 0, forceGroup = null, rng = Math.random } = {}) {
  if (focus === 'floorange') {
    const id = rng() < 0.7 ? 'floorange' : rng() < 0.5 ? 'apple' : 'banana';
    return { id, rarity: 0, count: 1 + Math.floor(rng() * 3) };
  }
  const groups = forceGroup ? [[forceGroup, 1]] : Object.entries(CAT_WEIGHTS).map(([g, w]) => {
    let ww = w;
    if (focus === 'parkour' && (g === 'gadget' || g === 'throw')) ww *= 3.5;
    if (focus === 'west' && g === 'weapon') ww *= 1.3;
    return [g, ww];
  });
  const group = forceGroup ?? weightedPick(groups, rng);
  if (group === 'ammo') {
    const type = weightedPick([['light', 28], ['medium', 28], ['shells', 18], ['heavy', 12], ['rockets', 6]], rng);
    return { ammo: type, count: AMMO[type].pack };
  }
  const pool = POOLS[group];
  const entries = pool.map((def) => {
    let w = def.weight;
    for (const tag of def.tags) {
      if (bias[tag]) w *= bias[tag];
      if (focus && focus === tag) w *= 4;
    }
    return [def, w];
  });
  const def = weightedPick(entries, rng);
  const rarity = def.kind === 'consume' || def.kind === 'throw' || def.kind === 'gadget' ? rollRarity({ minR: 0, maxR: 0 }, 0) : rollRarity(def, rarityBias);
  let count = 1;
  if (def.kind === 'consume' || def.kind === 'throw') count = def.stack >= 6 ? 1 + Math.floor(rng() * 3) : 1;
  if (def.kind === 'gadget') count = def.charges;
  return { id: def.id, rarity, count };
}

/** What a chest contains (3-5 entries). */
export function rollChest(bias = {}, focus = null, rng = Math.random) {
  const out = [];
  const w = rollLoot({ bias, focus, rarityBias: 0.55, forceGroup: 'weapon', rng });
  out.push(w);
  const def = ITEMS[w.id];
  if (def && def.ammo) out.push({ ammo: def.ammo, count: AMMO[def.ammo].pack * 2 });
  out.push(rollLoot({ bias, focus, forceGroup: 'heal', rng }));
  if (rng() < 0.7) out.push(rollLoot({ bias, focus, forceGroup: 'heal', rng }));
  if (rng() < 0.55) out.push(rollLoot({ bias, focus, forceGroup: rng() < 0.7 ? 'throw' : 'gadget', rng }));
  if (focus === 'parkour' && rng() < 0.6) {
    const id = rng() < 0.5 ? 'jumpple' : 'grappler';
    out.push({ id, rarity: 0, count: id === 'jumpple' ? 2 : ITEMS.grappler.charges });
  }
  if (rng() < 0.35) out.push(rollLoot({ bias, focus, forceGroup: 'weapon', rarityBias: 0.3, rng }));
  return out;
}
