import { ITEMS, AMMO, makeStack, isStackable } from './items.js';

export const SLOT_COUNT = 6;

export class Inventory {
  constructor() {
    this.slots = new Array(SLOT_COUNT).fill(null);
    this.slots[0] = makeStack('pickaxe');
    this.sel = 0;
    this.lastSel = 1;
    this.ammo = { light: 0, medium: 0, heavy: 0, shells: 0, rockets: 0 };
  }

  get current() { return this.slots[this.sel]; }

  addAmmo(type, n) {
    const cap = AMMO[type].max;
    const add = Math.max(0, Math.min(n, cap - this.ammo[type]));
    this.ammo[type] += add;
    return add;
  }

  freeSlot() {
    for (let i = 1; i < SLOT_COUNT; i++) if (!this.slots[i]) return i;
    return -1;
  }

  /**
   * Try to take a ground drop. Mutates drop.count. Returns
   * { taken: bool, swapped: stack|null, slot }.
   */
  pickup(drop) {
    if (drop.ammo) {
      const added = this.addAmmo(drop.ammo, drop.count);
      drop.count -= added;
      return { taken: added > 0, swapped: null, slot: -1, ammo: added };
    }
    const st = drop.stack;
    const def = st.def;
    if (isStackable(def)) {
      for (let i = 1; i < SLOT_COUNT; i++) {
        const s = this.slots[i];
        if (s && s.def === def && s.count < def.stack) {
          const add = Math.min(def.stack - s.count, st.count);
          s.count += add;
          st.count -= add;
          if (st.count <= 0) return { taken: true, swapped: null, slot: i };
        }
      }
      if (st.count > 0) {
        const f = this.freeSlot();
        if (f >= 0) {
          this.slots[f] = { ...st };
          st.count = 0;
          return { taken: true, swapped: null, slot: f };
        }
        return { taken: false, swapped: null, slot: -1 };
      }
      return { taken: true, swapped: null, slot: -1 };
    }
    // guns / melee: one per slot, swap when full
    const f = this.freeSlot();
    if (f >= 0) {
      this.slots[f] = st;
      drop.count = 0;
      return { taken: true, swapped: null, slot: f };
    }
    let target = this.sel > 0 ? this.sel : this.lastSel;
    if (target <= 0) target = 1;
    const out = this.slots[target];
    this.slots[target] = st;
    drop.count = 0;
    return { taken: true, swapped: out, slot: target };
  }

  remove(i) {
    const s = this.slots[i];
    this.slots[i] = null;
    return s;
  }

  countOf(id) {
    let n = 0;
    for (const s of this.slots) if (s && s.def.id === id) n += s.count;
    return n;
  }
  find(pred) {
    for (let i = 1; i < SLOT_COUNT; i++) if (this.slots[i] && pred(this.slots[i])) return i;
    return -1;
  }
}

export { ITEMS, makeStack };
