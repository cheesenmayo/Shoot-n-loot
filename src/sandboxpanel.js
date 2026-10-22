// The sandbox tools drawer: three tabs (items, enemies, player) plus a damage readout. Plain DOM, styled in style.css.
import { ITEM_LIST, RARITIES } from './items.js';
import { POIS } from './world/poidata.js';
import { CATEGORIES, SKILL_OPTIONS, COUNT_OPTIONS, PLACE_OPTIONS, HEALTH_OPTIONS, BEHAVIOUR_OPTIONS, TIME_OPTIONS, LOADOUTS, ENEMY_CAP, itemStats } from './sandboxdata.js';
import { renderIcons } from './sandboxicons.js';

const TABS = [['items', 'Items'], ['enemies', 'Enemies'], ['player', 'Player']];
const TOGGLES = [
  ['god', 'God mode', 'No damage, no fall damage'],
  ['infAmmo', 'Infinite ammo', 'Magazines never run dry'],
  ['infItems', 'Infinite consumables', 'Items, grenades and gadgets never run out'],
  ['superSpeed', 'Super speed', 'Run almost twice as fast'],
];

const seg = (opt, entries) => `<div class="seg sbx-seg" data-opt="${opt}">${entries.map(([v, label]) => `<button data-val="${v}">${label}</button>`).join('')}</div>`;
const rarityRow = () => `<div class="sbx-rar" data-opt="rarity">${RARITIES.map((r, i) => `<button data-val="${i}" style="--c:${r.css}"><i></i>${r.name}</button>`).join('')}</div>`;
const fmt = (n) => Math.round(n).toLocaleString('en-US');

export class SandboxPanel {
  constructor(sbx, root) {
    this.sbx = sbx;
    this.game = sbx.game;
    this.acc = 0;
    this.iconsStarted = false;
    const el = document.createElement('div');
    el.id = 'sbx';
    el.className = 'sbx';
    el.innerHTML = this.template();
    root.appendChild(el);
    this.el = el;
    this.$ = (s) => el.querySelector(s);
    this.$$ = (s) => el.querySelectorAll(s);
    this.cards = [...this.$$('.card[data-id]')];
    this.bind();
  }

  template() {
    const cats = CATEGORIES.map((c) => {
      const defs = ITEM_LIST.filter(c.has);
      return `<div class="sbx-cat"><h4>${c.label}<i>${defs.length}</i></h4><div class="sbx-grid">${defs.map((d) => `
        <button class="card ${d.kind === 'gun' || d.kind === 'melee' ? 'rar' : ''}" data-act="give" data-id="${d.id}">
          <span class="ic">${d.icon}</span>
          <span class="tx"><b class="nm">${d.name}</b><small class="s1"></small><small class="s2"></small></span>
        </button>`).join('')}</div></div>`;
    }).join('');
    const weapons = CATEGORIES.map((c) => {
      const defs = ITEM_LIST.filter((d) => c.has(d) && d.id !== 'pickaxe' && (d.kind === 'gun' || d.kind === 'melee'));
      return defs.length ? `<optgroup label="${c.label}">${defs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('')}</optgroup>` : '';
    }).join('');
    return `
    <div class="sbx-head">
      <div class="sbx-title">Sandbox<small><span class="kb">B to close</span><span class="tc">tools</span></small></div>
      <div class="sbx-tabs">${TABS.map(([id, label]) => `<button data-act="tab" data-id="${id}"><span>${label}${id === 'enemies' ? ' <em id="sbx-badge">0</em>' : ''}</span></button>`).join('')}</div>
      <button class="sbx-x" data-act="close" aria-label="Close sandbox panel">✕</button>
    </div>
    <div class="sbx-body">
      <section data-pane="items">
        <div class="sbx-lbl">Rarity <small>guns &amp; melee</small></div>
        ${rarityRow()}
        <div class="sbx-actions"><button class="sb" data-act="max-ammo">Max ammo</button><button class="sb" data-act="clear-inv">Clear inventory</button></div>
        <div class="sbx-lbl">Loadouts <small>fill slots 1-5</small></div>
        <div class="sbx-presets">${LOADOUTS.map((l) => `<button class="sb preset" data-act="loadout" data-id="${l.id}"><b>${l.name}</b><small>${l.items.map((id) => ITEM_LIST.find((d) => d.id === id).icon).join(' ')}</small></button>`).join('')}</div>
        ${cats}
      </section>
      <section data-pane="enemies">
        <div class="sbx-lbl">Skill</div>${seg('skill', SKILL_OPTIONS)}
        <div class="sbx-lbl">Weapon</div>
        <select class="sbx-sel" data-opt="weapon"><option value="random">Random loadout</option><option value="pickaxe">Pickaxe only</option>${weapons}</select>
        <div class="sbx-lbl sbx-wr">Weapon rarity</div><div class="sbx-wr">${rarityRow()}</div>
        <div class="sbx-lbl">Count</div>${seg('count', COUNT_OPTIONS.map((n) => [n, n]))}
        <div class="sbx-lbl">Placement</div>${seg('place', PLACE_OPTIONS)}
        <div class="sbx-lbl">Health</div>${seg('health', HEALTH_OPTIONS.map((h) => [h[0], h[1]]))}
        <div class="sbx-lbl">Behaviour</div>${seg('behaviour', BEHAVIOUR_OPTIONS)}
        <div class="sbx-actions">
          <button class="sb primary" data-act="spawn" id="sbx-spawn">Spawn</button>
          <button class="sb" data-act="clear-enemies">Clear all enemies</button>
          <button class="sb" data-act="respawn-dummies">Respawn dummies</button>
        </div>
        <div class="sbx-note"><b id="sbx-live">0</b> / ${ENEMY_CAP} enemies alive. Spawning stops at ${ENEMY_CAP}.</div>
      </section>
      <section data-pane="player">
        <div class="sbx-toggles">${TOGGLES.map(([key, name, hint]) => `<button class="tgl" role="switch" aria-checked="false" data-act="toggle" data-key="${key}"><span class="sw"></span><span class="tx"><b>${name}</b><small>${hint}</small></span></button>`).join('')}</div>
        <div class="sbx-actions"><button class="sb primary" data-act="heal">Heal · 100 HP + 100 shield</button></div>
        <div class="sbx-lbl">Teleport</div>
        <div class="sbx-tp">${POIS.map((p) => `<button class="sb tp" data-act="tp" data-id="${p.id}"><i style="background:${p.color}"></i>${p.name}</button>`).join('')}<button class="sb tp sky" data-act="skydrop"><i></i>Sky drop · 300 m</button></div>
        <div class="sbx-lbl">Time scale</div>${seg('time', TIME_OPTIONS.map((t) => [t, `${t}×`]))}
      </section>
    </div>
    <div class="sbx-foot">
      <div class="rd"><span>DMG <b id="rd-total">0</b></span><span>DPS <b id="rd-dps">0</b></span><span>LAST <b id="rd-last">-</b></span></div>
      <button class="sb mini" data-act="reset-stats">Reset</button>
    </div>`;
  }

  bind() {
    const sbx = this.sbx, g = this.game;
    this.el.addEventListener('click', (e) => {
      const seg = e.target.closest('[data-opt] button');
      if (seg && this.el.contains(seg)) {
        const opt = seg.parentElement.closest('[data-opt]').dataset.opt, raw = seg.dataset.val;
        g.audio.play('click');
        if (opt === 'time') sbx.setTimeScale(Number(raw));
        else sbx.setCfg(opt, ['rarity', 'count'].includes(opt) ? Number(raw) : raw);
        seg.blur();
        return;
      }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act, id = b.dataset.id;
      if (act !== 'give') g.audio.play('click');
      switch (act) {
        case 'close': sbx.closePanel(); break;
        case 'tab': sbx.setCfg('tab', id); this.$('.sbx-body').scrollTop = 0; break;
        case 'give': sbx.give(id); this.flash(b); break;
        case 'loadout': sbx.loadout(id); break;
        case 'max-ammo': sbx.maxAmmo(); break;
        case 'clear-inv': sbx.clearInventory(); break;
        case 'spawn': sbx.spawn(); break;
        case 'clear-enemies': sbx.clearEnemies(); break;
        case 'respawn-dummies': sbx.respawnDummies(); break;
        case 'toggle': sbx.setToggle(b.dataset.key, !sbx[b.dataset.key]); break;
        case 'heal': sbx.heal(); break;
        case 'tp': sbx.teleport(id); break;
        case 'skydrop': sbx.skyDrop(); break;
        case 'reset-stats': sbx.resetStats(); break;
        default: break;
      }
      b.blur();
    });
    this.$('.sbx-sel').addEventListener('change', (e) => { g.audio.play('click'); sbx.setCfg('weapon', e.target.value); e.target.blur(); });
  }

  flash(btn) {
    btn.classList.remove('got');
    void btn.offsetWidth;
    btn.classList.add('got');
  }

  width() { return this.sbx.open ? this.el.offsetWidth : 0; }

  /** The HUD narrows to the part of the screen the drawer leaves free. */
  insetHud(on) {
    const hud = this.game.hud.$('#hud');
    if (hud) hud.style.right = on ? `${this.el.offsetWidth}px` : '';
  }

  show() {
    this.sync();
    this.el.classList.add('on');
    document.body.classList.add('sbxopen');
    this.insetHud(true);
    if (!this.iconsStarted) {
      this.iconsStarted = true;
      const ids = ITEM_LIST.map((d) => d.id);
      renderIcons(this.game, ids, (id, url) => {
        const card = this.cards.find((c) => c.dataset.id === id);
        if (card) card.querySelector('.ic').innerHTML = `<img src="${url}" alt="" draggable="false">`;
      }).catch(() => { /* emoji icons stay */ });
    }
  }

  hide() {
    this.el.classList.remove('on');
    document.body.classList.remove('sbxopen');
    this.insetHud(false);
    const a = document.activeElement;
    if (a && this.el.contains(a)) a.blur();
  }

  /** Reflect the sandbox state (options, toggles, counts) in the controls. */
  sync() {
    const sbx = this.sbx, c = sbx.cfg;
    const set = (sel, v) => this.$$(sel).forEach((el) => el.classList.toggle('on', el.dataset.val === String(v)));
    this.$$('.sbx-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.id === c.tab));
    this.$$('[data-pane]').forEach((s) => { s.hidden = s.dataset.pane !== c.tab; });
    set('[data-opt=rarity] button', c.rarity);
    for (const k of ['skill', 'count', 'place', 'health', 'behaviour']) set(`[data-opt=${k}] button`, c[k]);
    set('[data-opt=time] button', sbx.timeScale);
    this.$('.sbx-sel').value = c.weapon;
    this.$$('.sbx-wr').forEach((el) => el.classList.toggle('hidden', c.weapon === 'random' || c.weapon === 'pickaxe'));
    this.$$('.tgl').forEach((b) => b.setAttribute('aria-checked', String(!!sbx[b.dataset.key])));
    // card stats follow the selected rarity; weapon cards pick up its colour
    this.el.style.setProperty('--rc', RARITIES[c.rarity].css);
    for (const card of this.cards) {
      const d = ITEM_LIST.find((x) => x.id === card.dataset.id);
      const tier = card.classList.contains('rar') ? Math.min(Math.max(c.rarity, d.minR ?? 0), d.maxR ?? 4) : 0;
      if (card.dataset.tier !== String(tier)) {
        card.dataset.tier = tier;
        const [s1, s2] = itemStats(d, tier);
        card.querySelector('.s1').textContent = s1;
        card.querySelector('.s2').textContent = s2;
        if (card.classList.contains('rar')) card.style.setProperty('--rc', RARITIES[tier].css);
      }
    }
    this.live();
  }

  /** The numbers that change on their own: enemy count, spawn button, damage readout. */
  live() {
    const sbx = this.sbx, c = sbx.cfg, s = sbx.stats, last = s.last;
    const n = sbx.liveCount();
    this.$('#sbx-live').textContent = n;
    this.$('#sbx-badge').textContent = n;
    const spawn = this.$('#sbx-spawn');
    spawn.textContent = `Spawn ${Math.min(c.count, Math.max(0, ENEMY_CAP - n))}`;
    spawn.disabled = n >= ENEMY_CAP;
    this.$('#rd-total').textContent = fmt(s.total);
    this.$('#rd-dps').textContent = fmt(sbx.dps());
    this.$('#rd-last').textContent = last ? `${fmt(last.v)}${last.head ? ' HEAD' : ''}` : '-';
  }

  /** Called every frame; refreshes the live numbers a few times a second while the panel is open. */
  tick(dt) {
    if (!this.sbx.open) return;
    this.acc += dt;
    if (this.acc < 0.2) return;
    this.acc = 0;
    this.live();
  }
}
