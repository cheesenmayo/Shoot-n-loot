// Static data for the sandbox: item categories, spawn options, loadout presets, stat text.
import { AMMO, RARITIES } from './items.js';

export const ENEMY_CAP = 40;

export const CATEGORIES = [
  { id: 'pistol', label: 'Pistols', has: (d) => d.kind === 'gun' && d.cat === 'pistol' },
  { id: 'smg', label: 'SMGs', has: (d) => d.kind === 'gun' && d.cat === 'smg' },
  { id: 'rifle', label: 'Rifles', has: (d) => d.kind === 'gun' && d.cat === 'rifle' },
  { id: 'shotgun', label: 'Shotguns', has: (d) => d.kind === 'gun' && d.cat === 'shotgun' },
  { id: 'sniper', label: 'Snipers', has: (d) => d.kind === 'gun' && d.cat === 'sniper' },
  { id: 'lmg', label: 'Heavy', has: (d) => d.kind === 'gun' && d.cat === 'lmg' },
  { id: 'launcher', label: 'Launchers & crossbow', has: (d) => d.kind === 'gun' && (d.cat === 'launcher' || d.cat === 'bow') },
  { id: 'melee', label: 'Melee', has: (d) => d.kind === 'melee' },
  { id: 'throw', label: 'Throwables', has: (d) => d.kind === 'throw' },
  { id: 'gadget', label: 'Gadgets', has: (d) => d.kind === 'gadget' },
  { id: 'consume', label: 'Consumables', has: (d) => d.kind === 'consume' },
];

export const SKILL_OPTIONS = [['noob', 'Noob'], ['avg', 'Average'], ['pro', 'Pro'], ['dummy', 'Dummy']];
export const COUNT_OPTIONS = [1, 3, 5, 10, 20];
export const PLACE_OPTIONS = [['f10', 'Front 10 m'], ['f20', 'Front 20 m'], ['f40', 'Front 40 m'], ['ring', 'Ring']];
export const HEALTH_OPTIONS = [['normal', 'Normal', 100], ['tough', 'Tough', 250], ['bag', 'Punching bag', 1000]];
export const BEHAVIOUR_OPTIONS = [['hostile', 'Hostile'], ['passive', 'Passive'], ['dummy', 'Dummy']];
export const TIME_OPTIONS = [0.25, 0.5, 1];
export const SKILL_ID = { noob: 'noob', avg: 'mid', pro: 'pro', dummy: 'mid' };

/** Slots 1-5, filled in this order. Ammo for every gun in the kit is topped up. */
export const LOADOUTS = [
  { id: 'assault', name: 'Assault', items: ['ar', 'pump', 'smg', 'big_shield', 'medkit'] },
  { id: 'sniper', name: 'Sniper nest', items: ['bolt_sniper', 'semi_sniper', 'silenced_smg', 'big_shield', 'bandage'] },
  { id: 'demolition', name: 'Demolition', items: ['rocket_launcher', 'grenade_launcher', 'frag', 'dynamite', 'small_shield'] },
  { id: 'parkour', name: 'Parkour kit', items: ['grappler', 'launchpad', 'impulse', 'jumpple', 'floorange'] },
  { id: 'medic', name: 'Medic', items: ['medkit', 'big_shield', 'slurp', 'chug_jug', 'runana'] },
];

const num = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

/** Two short lines of key stats for an item card. */
export function itemStats(def, rarity = 0) {
  const mult = RARITIES[rarity].mult;
  switch (def.kind) {
    case 'gun': {
      const dmg = Math.round(def.dmg * mult);
      return [`${def.pellets > 1 ? `${dmg}×${def.pellets}` : dmg} dmg · ${num(def.rate)}/s`, `${def.mag} rnd · ${AMMO[def.ammo].name}`];
    }
    case 'melee':
      return def.id === 'pickaxe' ? ['Always in slot 1', 'Swing to hit'] : [`${Math.round(def.dmg * mult)} dmg · ${num(def.rate)}/s`, `Melee · ${num(def.range)} m reach`];
    case 'throw':
      return [`${def.dmg ? `${def.dmg} dmg · ` : ''}${num(def.radius)} m radius`, def.desc || `Stack of ${def.stack} · ${num(def.fuse)} s fuse`];
    case 'gadget':
      return [`${def.charges} charges · stack of ${def.stack}`, def.desc || ''];
    default: {
      const parts = [];
      if (def.hp) parts.push(`+${def.hp} HP`);
      if (def.shield) parts.push(`+${def.shield} shield`);
      if (def.hot) parts.push(`+${def.hot.hp}/${def.hot.shield} over ${def.hot.dur} s`);
      if (def.buff) parts.push(`${def.buff.dur} s boost`);
      return [`${parts.join(' · ')} · ${num(def.time)} s`, def.desc || `Stack of ${def.stack}`];
    }
  }
}
