import * as THREE from 'three';
import { RARITIES, AMMO } from './items.js';
import { settings, saveSettings, PRESETS } from './settings.js';
import { POIS } from './world/poidata.js';
import { WORLD } from './world/terrain.js';
import { PHASES } from './storm.js';

const settingsHTML = (p) => `
  <div class="label">Graphics</div>
  <div class="seg" data-seg="graphics">
    ${Object.values(PRESETS).map((g) => `<button data-g="${g.id}">${g.label}</button>`).join('')}
  </div>
  <div class="settings" style="margin-top:14px">
    <span><span class="kb">Mouse</span><span class="tc">Look</span> sensitivity</span><input type="range" min="0.2" max="3" step="0.05" data-s="sensitivity"><span class="v" data-v="sensitivity"></span>
    <span>Field of view</span><input type="range" min="60" max="100" step="1" data-s="fov"><span class="v" data-v="fov"></span>
    <span>Volume</span><input type="range" min="0" max="1" step="0.05" data-s="volume"><span class="v" data-v="volume"></span>
    <span>First person view</span><input type="checkbox" data-s="fpv"><span></span>
    <span>Aim assist (touch)</span><input type="checkbox" data-s="aimAssist"><span></span>
    <span>Invert Y</span><input type="checkbox" data-s="invertY"><span></span>
    <span>Show FPS</span><input type="checkbox" data-s="showFps"><span></span>
  </div>
  <div class="label" style="margin-top:14px">Touch controls</div>
  <div class="seg" data-seg="touch">
    <button data-t="auto">Auto</button><button data-t="on">On</button><button data-t="off">Off</button>
  </div>`;

const TOUCHHELP = `
  <div class="keys keys-touch">
    <div><b>Left side</b> drag = move (push far to sprint)</div><div><b>Right side</b> drag = look</div>
    <div><b>FIRE</b> hold to shoot · drag to aim</div><div><b>◎</b> aim down sights</div>
    <div><b>JUMP</b> jump · drop from the bus · glider</div><div><b>▼</b> crouch · <b>↻</b> reload</div>
    <div><b>PICK UP / OPEN</b> appears next to loot</div><div><b>Hotbar</b> tap to switch items</div>
    <div><b>⏸</b> pause · <b>📍</b> map</div><div><b>🧪</b> sandbox tools (Sandbox mode)</div>
  </div>`;

const KEYS = `
  <div class="keys keys-desktop">
    <div><b>W A S D</b> move</div><div><b>Shift</b> sprint</div>
    <div><b>Space</b> jump / open glider</div><div><b>C</b> crouch</div>
    <div><b>LMB</b> fire / use item</div><div><b>RMB</b> aim down sights</div>
    <div><b>E</b> pick up · hold to open chests</div><div><b>R</b> reload</div>
    <div><b>1-6 / Wheel</b> switch item</div><div><b>G</b> drop item</div>
    <div><b>M / Tab</b> map</div><div><b>X</b> swap shoulder · <b>V</b> first person</div>
    <div><b>← → ↑ ↓</b> look (no mouse lock)</div><div><b>Esc</b> pause</div>
    <div><b>B</b> sandbox tools (Sandbox mode)</div><div><b>F3</b> show FPS</div>
  </div>`;

export class HUD {
  constructor(game, root) {
    this.game = game;
    this.root = root;
    root.innerHTML = `
    <div id="screen-loading" class="screen dim">
      <div class="title-wrap">
        <div class="logo">Shoot 'n' Loot<small>Battle Royale</small></div>
        <div class="loadbar"><div id="loadfill"></div></div>
        <div class="loadtxt" id="loadtxt">Loading…</div>
      </div>
    </div>

    <div id="screen-title" class="screen dim hidden">
      <div class="title-wrap">
        <div class="logo">Shoot 'n' Loot<small>Battle Royale</small></div>
        <div class="tagline">50 PLAYERS · 8 LOCATIONS · 1 VICTORY ROYALE</div>
        <div class="tagline" style="font-size:12px;opacity:.65"><span class="kb">Best on a desktop browser with keyboard and mouse</span><span class="tc">Touch controls are on · play in landscape</span></div>
        <div class="tagline" id="gfx-note" style="color:#7fe8ff"></div>
        <div class="row"><button class="btn" id="btn-play">Play</button><button class="btn cyan" id="btn-sandbox">Sandbox</button></div>
        <div class="row" style="align-items:stretch">
          <div class="panel">${settingsHTML('t')}</div>
          <div class="panel"><div class="label">Controls</div>${KEYS}${TOUCHHELP}</div>
        </div>
      </div>
    </div>

    <div id="screen-pause" class="screen dim hidden">
      <div class="title-wrap">
        <div class="logo" style="font-size:56px">Paused</div>
        <div class="row"><button class="btn" id="btn-resume">Resume</button><button class="btn cyan small hidden" id="btn-sbx">Sandbox tools</button><button class="btn alt" id="btn-quit">Leave match</button></div>
        <div class="row" style="align-items:stretch">
          <div class="panel">${settingsHTML('p')}</div>
          <div class="panel"><div class="label">Controls</div>${KEYS}${TOUCHHELP}</div>
        </div>
      </div>
    </div>

    <div id="screen-result" class="screen dim hidden">
      <div class="result">
        <h1 id="res-title">Victory Royale</h1>
        <div id="res-sub" style="font-size:20px;opacity:.9"></div>
        <div class="stats" id="res-stats"></div>
        <div class="row">
          <button class="btn" id="btn-again">Play again</button>
          <button class="btn alt" id="btn-spec">Spectate</button>
          <button class="btn alt" id="btn-lobby">Lobby</button>
        </div>
      </div>
    </div>

    <div id="screen-rotate" class="screen hidden" style="z-index:60;background:#0b1020">
      <div class="title-wrap"><div style="font-size:64px">📱</div><div class="logo" style="font-size:34px">Rotate your device</div><div class="tagline">Shoot 'n' Loot plays in landscape</div></div>
    </div>
    <div id="touch" class="hidden"></div>

    <div id="hud" class="hidden">
      <div class="vignette dmg" id="v-dmg"></div>
      <div class="vignette storm" id="v-storm"></div>
      <div class="vignette water" id="v-water"></div>
      <div class="vignette speed" id="v-speed"></div>
      <div class="scope" id="scope"></div>
      <div class="feed" id="feed"></div>
      <div class="storm" id="storm"><span class="chip" id="storm-chip"><span id="storm-txt"></span></span></div>
      <div class="sbxread hidden" id="sbx-read"><div class="chip"><span id="sbx-stats"></span></div><div class="sbxtarget hidden" id="sbx-target"><span id="sbx-tn"></span><div class="pb"><div id="sbx-tf"></div></div><span id="sbx-tv"></span></div><div class="sbxtags" id="sbx-tags"></div><div class="sbxhint kb"><kbd>B</kbd> sandbox tools</div></div>
      <div class="topright">
        <div class="counters">
          <div class="chip" id="chip-alive"><span><span id="alive-ic">👥</span> <span id="alive">50</span></span></div>
          <div class="chip"><span>☠ <span id="kills">0</span></span></div>
        </div>
        <div class="minimap"><canvas id="minimap" width="200" height="200"></canvas></div>
      </div>
      <div class="toasts" id="toasts"></div>
      <div class="crosshair" id="cross"><i class="h" style="left:-14px"></i><i class="h" style="left:5px"></i><i class="v" style="top:-14px"></i><i class="v" style="top:5px"></i><i class="dot"></i></div>
      <div class="hitmarker" id="hit"></div>
      <div class="prompt hidden" id="prompt"></div>
      <div class="castbar hidden" id="cast"><span id="cast-txt"></span><div class="pb"><div id="cast-fill"></div></div></div>
      <div class="pickups" id="pickups"></div>
      <div class="vitals">
        <div class="bar shield"><div id="shield-fill"></div><span id="shield-txt">0</span></div>
        <div class="bar hp"><div id="hp-fill"></div><span id="hp-txt">100</span></div>
      </div>
      <div class="buffs" id="buffs"></div>
      <div class="hotbar" id="hotbar"></div>
      <div class="ammo" id="ammo"></div>
      <div class="busui hidden" id="busui"><div class="big"><span class="kb">PRESS SPACE TO JUMP</span><span class="tc">TAP JUMP TO DROP</span></div><div class="sm"><span class="kb">Soar over the island · look for a landing spot (M for map)</span><span class="tc">Soar over the island · pick a landing spot on the map</span></div></div>
      <div class="fps hidden" id="fps"></div>
      <div id="floaters"></div>
      <div id="dirs"></div>
    </div>
    <div class="bigmap hidden" id="bigmap"><canvas id="bigmap-cv" width="1024" height="1024"></canvas><div class="hint"><span class="kb">M or TAB to close</span><span class="tc">Tap to close</span></div></div>
    `;
    this.$ = (s) => root.querySelector(s);
    this.mm = this.$('#minimap').getContext('2d');
    this.bm = this.$('#bigmap-cv').getContext('2d');
    this.lastHot = '';
    this.mmT = 0;
    this.toastT = [];
    this.floaters = [];
    this.floatPool = [];
    this.dirs = [];
    this.mapOpen = false;
    this.dmgA = 0;
    this.fallA = 0;
    this.elimTimer = 0;
    this.fpsAcc = 0; this.fpsN = 0;
    this.bindMenus();
  }

  // ---- menus -------------------------------------------------------------------------------------------------------------------------------
  bindMenus() {
    const g = this.game;
    const root = this.root;
    root.querySelectorAll('[data-seg=graphics]').forEach((seg) => {
      seg.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-g]');
        if (!b) return;
        g.audio.init();
        g.audio.play('click');
        g.applyGraphics(b.dataset.g, true);
        this.syncSettings();
      });
    });
    root.querySelectorAll('[data-seg=touch]').forEach((seg) => {
      seg.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-t]');
        if (!b) return;
        settings.touch = b.dataset.t;
        saveSettings();
        g.audio.play('click');
        g.refreshTouch();
        this.syncSettings();
      });
    });
    // tap a hotbar slot to switch items
    this.$('#hotbar').addEventListener('touchstart', (e) => {
      const slot = e.target.closest('.slot');
      if (!slot || slot.dataset.i === undefined) return;
      if (e.cancelable) e.preventDefault();
      g.controller.equipSlot(parseInt(slot.dataset.i, 10));
    }, { passive: false });
    this.$('#bigmap').addEventListener('click', () => { if (this.mapOpen) this.toggleMap(); });
    root.querySelectorAll('input[data-s]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const k = inp.dataset.s;
        settings[k] = inp.type === 'checkbox' ? inp.checked : parseFloat(inp.value);
        if (k === 'volume') g.audio.setVolume(settings.volume);
        if (k === 'fov') { g.camera.fov = settings.fov; g.camera.updateProjectionMatrix(); }
        saveSettings();
        this.syncSettings();
      });
    });
    this.$('#btn-play').addEventListener('click', () => { g.audio.init(); g.audio.play('click'); g.startMatch(); });
    this.$('#btn-sandbox').addEventListener('click', () => { g.audio.init(); g.audio.play('click'); g.startSandbox(); });
    this.$('#btn-resume').addEventListener('click', () => { g.audio.play('click'); g.resume(); });
    this.$('#btn-sbx').addEventListener('click', () => { g.audio.play('click'); g.resume(true); g.sbx.openPanel(); });
    this.$('#btn-quit').addEventListener('click', () => { g.audio.play('click'); g.returnToMenu(); });
    this.$('#btn-again').addEventListener('click', () => { g.audio.play('click'); g.startMatch(); });
    this.$('#btn-lobby').addEventListener('click', () => { g.audio.play('click'); g.returnToMenu(); });
    this.$('#btn-spec').addEventListener('click', () => { g.audio.play('click'); this.show('result', false); g.spectate(); });
    this.syncSettings();
  }

  syncSettings() {
    const root = this.root;
    root.querySelectorAll('[data-seg=graphics] button').forEach((b) => b.classList.toggle('on', b.dataset.g === settings.graphics));
    root.querySelectorAll('[data-seg=touch] button').forEach((b) => b.classList.toggle('on', b.dataset.t === settings.touch));
    root.querySelectorAll('input[data-s]').forEach((inp) => {
      const k = inp.dataset.s;
      if (inp.type === 'checkbox') inp.checked = !!settings[k]; else inp.value = settings[k];
    });
    root.querySelectorAll('[data-v]').forEach((el) => {
      const k = el.dataset.v;
      el.textContent = k === 'volume' ? Math.round(settings[k] * 100) + '%' : k === 'fov' ? settings[k] + '°' : settings[k].toFixed(2) + 'x';
    });
  }

  show(name, on) {
    const el = this.$('#screen-' + name);
    if (el) el.classList.toggle('hidden', !on);
  }

  loading(label, p) {
    this.$('#loadfill').style.width = Math.round(p * 100) + '%';
    this.$('#loadtxt').textContent = label;
  }

  setNote(msg) { this.$('#gfx-note').textContent = msg; }

  /** Sandbox flavour of the HUD: SANDBOX chip with the enemy count, damage readout, pause-menu wording. */
  setSandbox(on) {
    document.body.classList.toggle('sandbox', on);
    this.$('#btn-quit').textContent = on ? 'Leave sandbox' : 'Leave match';
    this.$('#btn-sbx').classList.toggle('hidden', !on);
    this.$('#alive-ic').textContent = on ? 'SANDBOX ·' : '👥';
    this.$('#chip-alive').title = on ? 'Enemies alive' : 'Players alive';
    this.$('#sbx-read').classList.toggle('hidden', !on);
    this.lastRead = '';
    this.readT = 0;
  }

  showHud(on) { this.$('#hud').classList.toggle('hidden', !on); }

  // ---- notifications -----------------------------------------------------------------------------------------------------------------------
  toast(msg) {
    const box = this.$('#toasts');
    if (box.lastChild && box.lastChild.textContent === msg) return;
    const d = document.createElement('div');
    d.textContent = msg;
    box.appendChild(d);
    setTimeout(() => d.remove(), 2600);
    while (box.children.length > 3) box.firstChild.remove();
  }

  stormMessage(msg) { this.toast(msg); }

  pickupToast(name, rarity, isAmmo, desc = '') {
    const box = this.$('#pickups');
    const d = document.createElement('div');
    d.textContent = name;
    if (desc) {
      const sm = document.createElement('small');
      sm.textContent = desc;
      sm.style.cssText = 'display:block;font-weight:600;opacity:.8;font-size:12px;max-width:260px';
      d.appendChild(sm);
    }
    d.style.borderRightColor = isAmmo ? '#ddd' : RARITIES[rarity].css;
    box.appendChild(d);
    setTimeout(() => d.remove(), desc ? 3600 : 1800);
    while (box.children.length > 4) box.firstChild.remove();
  }

  feed(html, cls = '') {
    const box = this.$('#feed');
    const d = document.createElement('div');
    d.innerHTML = html;
    if (cls) d.className = cls;
    box.appendChild(d);
    setTimeout(() => d.remove(), 7000);
    while (box.children.length > 6) box.firstChild.remove();
  }

  elimToast(name, count) {
    const old = this.$('.elimtoast');
    if (old) old.remove();
    const d = document.createElement('div');
    d.className = 'elimtoast';
    d.innerHTML = `ELIMINATED ${name}<small>${count} ${count === 1 ? 'elimination' : 'eliminations'}</small>`;
    this.$('#hud').appendChild(d);
    setTimeout(() => d.remove(), 2400);
  }

  hitmarker(head) {
    const h = this.$('#hit');
    h.classList.remove('on', 'head');
    void h.offsetWidth;
    h.classList.add('on');
    if (head) h.classList.add('head');
  }

  flashDamage(a = 0.5) { this.dmgA = Math.min(1, this.dmgA + a); }

  hitFrom(pos) {
    const cam = this.game.camera;
    const f = new THREE.Vector3();
    cam.getWorldDirection(f);
    const ang = Math.atan2(pos.x - cam.position.x, -(pos.z - cam.position.z)) - Math.atan2(f.x, -f.z);
    const el = document.createElement('div');
    el.className = 'dirhit';
    el.style.transform = `rotate(${ang}rad)`;
    el.style.opacity = '1';
    el.style.transition = 'opacity 1.1s ease-out';
    this.$('#dirs').appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '0'; });
    setTimeout(() => el.remove(), 1200);
  }

  damageNumber(pos, amount, head) {
    let el = this.floatPool.pop();
    if (!el) { el = document.createElement('div'); el.className = 'dmgnum'; this.$('#floaters').appendChild(el); }
    el.textContent = Math.round(amount);
    el.style.color = head ? '#ff4a4a' : '#ffe14a';
    el.style.fontSize = head ? '26px' : '20px';
    el.style.display = 'block';
    this.floaters.push({ el, pos: pos.clone(), t: 0, dx: (Math.random() - 0.5) * 40 });
  }

  setPrompt(target, ch, progress) {
    const el = this.$('#prompt');
    if (!target) { el.classList.add('hidden'); this.promptKey = ''; return; }
    let html;
    const key = (k) => (this.game.touchMode ? '' : `<span class="pk">${k}</span>`);
    if (target.type === 'chest') {
      html = `${key('E')}${this.game.touchMode ? 'Hold OPEN' : 'Hold to open'} Chest<div class="pb"><div style="width:${Math.round(progress * 100)}%"></div></div>`;
    } else {
      const d = target.d;
      const name = d.ammo ? `${AMMO[d.ammo].name} (${d.count})` : `${d.stack.def.name}${d.stack.count > 1 ? ' ×' + d.stack.count : ''}`;
      const col = d.ammo ? '#ddd' : RARITIES[d.stack.rarity].css;
      const full = !d.ammo && ch.inv.freeSlot() < 0 && !['consume', 'throw', 'gadget'].includes(d.stack.def.kind);
      html = `${key('E')}${full ? 'Swap' : 'Pick up'} <b style="color:${col}">${name}</b>${d.stack ? ` <span style="opacity:.7;font-size:13px">${RARITIES[d.stack.rarity].name}</span>` : ''}`;
    }
    if (html !== this.promptKey) { el.innerHTML = html; this.promptKey = html; }
    el.classList.remove('hidden');
  }

  toggleMap() {
    this.mapOpen = !this.mapOpen;
    this.$('#bigmap').classList.toggle('hidden', !this.mapOpen);
    if (this.mapOpen) this.drawBigMap();
  }

  // ---- per-frame ----------------------------------------------------------------------------------------------------------------------------------
  update(dt, fps) {
    const g = this.game, ch = g.player;
    if (!ch) return;
    const inMatch = g.state === 'bus' || g.state === 'playing' || g.state === 'dead' || g.state === 'ended';
    const sbx = g.sandbox ? g.sbx : null;
    this.$('#alive').textContent = sbx ? sbx.liveCount() : g.aliveCount;
    this.$('#kills').textContent = ch.kills;
    if (sbx) this.updateReadout(dt, sbx);

    // vitals
    const hp = Math.max(0, Math.ceil(ch.hp)), sh = Math.max(0, Math.ceil(ch.shield));
    this.$('#hp-fill').style.width = hp + '%';
    this.$('#shield-fill').style.width = sh + '%';
    this.$('#hp-txt').textContent = hp;
    this.$('#shield-txt').textContent = sh;
    this.$('.bar.hp').classList.toggle('low', hp <= 30);

    // storm text
    const s = g.storm;
    const chip = this.$('#storm-chip');
    if (s.active) {
      const t = Math.ceil(s.remaining);
      const mm = Math.floor(t / 60), ss = String(t % 60).padStart(2, '0');
      let txt;
      if (s.state === 'hold') txt = `⛈ Storm closes in ${mm}:${ss}`;
      else if (s.state === 'shrink') txt = `⛈ Storm shrinking ${mm}:${ss}`;
      else txt = '⛈ Final circle';
      this.$('#storm-txt').textContent = txt;
      chip.classList.toggle('warn', s.state === 'shrink' || !!ch.inStorm);
      chip.style.display = 'inline-block';
    } else chip.style.display = 'none';

    // vignettes
    this.dmgA = Math.max(0, this.dmgA - dt * 1.6);
    this.$('#v-dmg').style.opacity = this.dmgA;
    this.$('#v-storm').style.opacity = ch.alive && ch.inStorm ? 0.55 + Math.sin(g.time * 4) * 0.15 : 0;
    this.$('#v-water').style.opacity = g.camera.position.y < 0 ? 1 : 0;
    // speed lines: the Runana boost and a fast skydive
    const spT = !ch.alive ? 0 : Math.max(ch.buffs.runT > 0 ? Math.min(1, ch.buffs.runT / 0.6) * 0.75 : 0, ch.mode === 'skydive' ? Math.min(1, -ch.vel.y / 70) * 0.55 : 0);
    this.speedA = (this.speedA || 0) + (spT - (this.speedA || 0)) * Math.min(1, dt * 8);
    this.$('#v-speed').style.opacity = this.speedA < 0.01 ? 0 : this.speedA.toFixed(3);
    this.$('#cross').classList.toggle('assist', !!g.controller?.assisting);
    this.$('#scope').style.display = g.controller?.scoped ? 'block' : 'none';

    // bus / action prompts
    this.$('#busui').classList.toggle('hidden', !(g.state === 'bus' && ch.mode === 'bus' && ch.alive));
    const alive = ch.alive;
    const normal = alive && ch.mode === 'normal';
    this.$('#cross').style.display = normal && !g.controller?.scoped && g.inputEnabled() ? 'block' : 'none';
    this.$('#hotbar').style.display = this.$('.vitals').style.display = alive && ch.mode !== 'bus' ? '' : 'none';
    this.$('#ammo').style.display = normal ? '' : 'none';
    this.$('.vitals').style.display = alive ? '' : 'none';
    this.$('#hotbar').style.display = alive ? '' : 'none';

    // crosshair spread
    if (normal) {
      const st = ch.stack;
      let spread = 3;
      if (st?.def.kind === 'gun') spread = g.combat.spreadFor(ch, st.def) + ch.bloom * 0.3;
      const gap = 3 + Math.min(40, spread * 4.5);
      const c = this.$('#cross').children;
      c[0].style.left = -gap - 9 + 'px'; c[1].style.left = gap + 'px'; c[2].style.top = -gap - 9 + 'px'; c[3].style.top = gap + 'px';
    }

    // cast bar
    const cast = this.$('#cast');
    let label = null, prog = 0;
    if (normal && ch.using) { label = ch.using.def.id === 'bandage' || ch.using.def.id === 'medkit' ? 'Healing' : ch.using.def.airOnly ? 'Floorange…' : 'Using ' + ch.using.def.name; prog = ch.using.t / ch.using.dur; }
    else if (normal && ch.reload) { label = 'Reloading'; prog = ch.reload.t / ch.reload.dur; }
    if (label) { cast.classList.remove('hidden'); this.$('#cast-txt').textContent = label; this.$('#cast-fill').style.width = Math.round(prog * 100) + '%'; }
    else cast.classList.add('hidden');

    this.updateHotbar(ch);
    this.updateBuffs(ch);

    // minimap
    this.mmT -= dt;
    if (this.mmT <= 0) { this.mmT = 0.05; this.drawMinimap(); }
    if (this.mapOpen) { this.bmT = (this.bmT || 0) - dt; if (this.bmT <= 0) { this.bmT = 0.2; this.drawBigMap(); } }

    // floaters
    const cam = g.camera;
    const v = new THREE.Vector3();
    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const f = this.floaters[i];
      f.t += dt;
      if (f.t > 0.9) { f.el.style.display = 'none'; this.floatPool.push(f.el); this.floaters.splice(i, 1); continue; }
      v.copy(f.pos); v.y += f.t * 1.2;
      v.project(cam);
      if (v.z > 1) { f.el.style.display = 'none'; continue; }
      f.el.style.display = 'block';
      f.el.style.transform = `translate(${(v.x * 0.5 + 0.5) * innerWidth + f.dx * f.t}px, ${(-v.y * 0.5 + 0.5) * innerHeight}px) scale(${1 + (0.3 - f.t) * 0.5})`;
      f.el.style.opacity = String(1 - f.t / 0.9);
    }

    // fps
    this.fpsAcc += fps; this.fpsN++;
    const fp = this.$('#fps');
    fp.classList.toggle('hidden', !settings.showFps);
    if (settings.showFps && this.fpsN >= 20) { fp.textContent = Math.round(this.fpsAcc / this.fpsN) + ' FPS'; this.fpsAcc = 0; this.fpsN = 0; }
    void inMatch;
  }

  /** Sandbox damage readout (top centre) and a tag for every active cheat. */
  updateReadout(dt, sbx) {
    this.readT -= dt;
    if (this.readT > 0) return;
    this.readT = 0.2;
    this.updateTarget(sbx);
    const n = (v) => Math.round(v).toLocaleString('en-US');
    const s = sbx.stats, last = s.last;
    const tags = [sbx.god && '🛡 GOD', sbx.infAmmo && '∞ AMMO', sbx.infItems && '∞ ITEMS', sbx.superSpeed && '⚡ SPEED', sbx.timeScale !== 1 && `⏱ ${sbx.timeScale}×`].filter(Boolean);
    const html = `DMG <b>${n(s.total)}</b> · DPS <b>${n(sbx.dps())}</b> · LAST <b>${last ? n(last.v) + (last.head ? ' HEAD' : '') : '-'}</b>|${tags.map((t) => `<i>${t}</i>`).join('')}`;
    if (html === this.lastRead) return;
    this.lastRead = html;
    const [a, b] = html.split('|');
    this.$('#sbx-stats').innerHTML = a;
    this.$('#sbx-tags').innerHTML = b;
  }

  /** Health bar of the enemy that was hit last (shown for a few seconds). */
  updateTarget(sbx) {
    const s = sbx.stats, t = s.target, el = this.$('#sbx-target');
    const show = !!t && this.game.time - s.targetT < 4;
    el.classList.toggle('hidden', !show);
    if (!show) return;
    const hp = Math.max(0, Math.ceil(t.hp)), max = s.targetMax;
    this.$('#sbx-tn').textContent = t.name;
    this.$('#sbx-tf').style.width = Math.min(100, (hp / max) * 100) + '%';
    this.$('#sbx-tv').textContent = hp > 0 ? `${hp} / ${max}` : 'KO';
  }

  /** Little timers above the health bar for temporary boosts (Jumpple, Runana). */
  updateBuffs(ch) {
    const b = ch.buffs;
    const list = [];
    if (ch.alive && b.runT > 0) list.push(['run', '🏃 Runana', b.runT]);
    if (ch.alive && b.speedT > 0) list.push(['jump', '🍏 Jumpple', b.speedT]);
    const sig = list.map((x) => x[0] + Math.ceil(x[2])).join('|');
    if (sig === this.lastBuffs) return;
    this.lastBuffs = sig;
    this.$('#buffs').innerHTML = list.map(([cls, name, t]) => `<div class="buff ${cls}">${name}<b>${Math.ceil(t)}s</b></div>`).join('');
  }

  updateHotbar(ch) {
    const slots = ch.inv.slots;
    const sbx = this.game.sandbox ? this.game.sbx : null;
    const infItems = !!sbx?.infItems, infAmmo = !!sbx?.infAmmo;
    const stackable = (d) => d.kind === 'consume' || d.kind === 'throw' || d.kind === 'gadget';
    let sig = ch.inv.sel + (infItems ? 'i' : '') + (infAmmo ? 'a' : '') + '|';
    for (const s of slots) sig += s ? `${s.def.id}:${s.count}:${s.rarity}:${s.mag ?? ''};` : '-;';
    if (sig !== this.lastHot) {
      this.lastHot = sig;
      let html = '';
      slots.forEach((s, i) => {
        if (!s) { html += `<div class="slot empty" data-i="${i}"><span class="n">${i + 1}</span></div>`; return; }
        const col = RARITIES[s.rarity].css;
        html += `<div class="slot ${i === ch.inv.sel ? 'sel' : ''}" data-i="${i}"><span class="n">${i + 1}</span><span class="ic">${s.def.icon}</span>${s.count > 1 || s.def.kind === 'gadget' ? `<span class="cnt">${infItems && stackable(s.def) ? '∞' : s.count}</span>` : ''}<span class="nm">${s.def.id === 'pickaxe' ? '' : s.def.name}</span><span class="rar" style="background:${s.def.id === 'pickaxe' ? 'transparent' : col}"></span></div>`;
      });
      this.$('#hotbar').innerHTML = html;
    }
    // ammo readout
    const st = ch.stack, a = this.$('#ammo');
    let html = '';
    if (st) {
      const d = st.def;
      const col = RARITIES[st.rarity].css;
      if (d.kind === 'gun') html = `<div class="big">${st.mag}<small> / ${infAmmo ? '∞' : ch.inv.ammo[d.ammo]}</small></div><div class="wn" style="color:${col}">${d.name}</div>`;
      else if (d.id !== 'pickaxe') html = `<div class="big">${infItems && stackable(d) ? '∞' : st.count}</div><div class="wn" style="color:${col}">${d.name}</div>`;
      else html = `<div class="wn">${d.name}</div>`;
    }
    if (html !== this.lastAmmo) { a.innerHTML = html; this.lastAmmo = html; }
  }

  // ---- minimap -----------------------------------------------------------------------------------------------------------------------------------------
  drawMinimap() {
    const g = this.game, ctx = this.mm, ch = g.player;
    const W = 200;
    const src = g.world.minimapCanvas;
    if (!src) { ctx.fillStyle = '#1c3a5a'; ctx.fillRect(0, 0, W, W); return; }
    ctx.clearRect(0, 0, W, W);
    const span = 380; // metres shown across the minimap
    const px = ch.alive || ch.mode === 'bus' ? (ch.mode === 'bus' ? g.bus.pos : ch.pos) : (g.controller.spectate.target?.pos || ch.pos);
    const k = src.width / WORLD.size;
    const sx = (px.x + WORLD.half - span / 2) * k, sy = (px.z + WORLD.half - span / 2) * k, sw = span * k;
    ctx.fillStyle = '#1c3a5a';
    ctx.fillRect(0, 0, W, W);
    ctx.drawImage(src, sx, sy, sw, sw, 0, 0, W, W);
    const toX = (x) => ((x - px.x) / span + 0.5) * W, toY = (z) => ((z - px.z) / span + 0.5) * W, sc = W / span;
    this.drawOverlays(ctx, toX, toY, sc, false);
    // player arrow
    ctx.save();
    ctx.translate(W / 2, W / 2);
    ctx.rotate(-(ch.alive ? g.controller.yaw : 0));
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -8); ctx.lineTo(6, 7); ctx.lineTo(0, 3); ctx.lineTo(-6, 7); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  drawOverlays(ctx, toX, toY, sc, big) {
    const g = this.game, s = g.storm, bus = g.bus;
    if (s.active) {
      // storm tint outside the safe circle
      ctx.save();
      ctx.beginPath();
      const size = 4000;
      ctx.rect(toX(-size), toY(-size), size * 2 * sc, size * 2 * sc);
      ctx.arc(toX(s.cx), toY(s.cz), s.r * sc, 0, Math.PI * 2, true);
      ctx.fillStyle = 'rgba(150,60,230,0.38)';
      ctx.fill('evenodd');
      ctx.restore();
      ctx.lineWidth = big ? 3 : 2;
      ctx.strokeStyle = '#fff';
      ctx.beginPath(); ctx.arc(toX(s.cx), toY(s.cz), Math.max(1, s.r * sc), 0, Math.PI * 2); ctx.stroke();
      if (s.state !== 'done' && s.nr > 1) {
        ctx.strokeStyle = '#7fd0ff';
        ctx.setLineDash([6, 5]);
        ctx.beginPath(); ctx.arc(toX(s.nx), toY(s.nz), Math.max(1, s.nr * sc), 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    if (bus.active || (g.state === 'bus')) {
      ctx.strokeStyle = 'rgba(255,230,120,0.9)';
      ctx.lineWidth = big ? 3 : 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath(); ctx.moveTo(toX(bus.start.x), toY(bus.start.z)); ctx.lineTo(toX(bus.end.x), toY(bus.end.z)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath(); ctx.arc(toX(bus.pos.x), toY(bus.pos.z), big ? 9 : 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#000'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    // dynamic markers: the player's own landing pings aren't a thing; show POI dots
    for (const p of POIS) {
      const x = toX(p.x), y = toY(p.z);
      if (!big && (x < -10 || y < -10 || x > 210 || y > 210)) continue;
      ctx.fillStyle = p.color;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, y, big ? 7 : 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      if (!big) {
        ctx.font = 'bold 10px "Trebuchet MS", sans-serif';
        ctx.textAlign = 'center';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0,0,0,0.85)';
        ctx.strokeText(p.name, x, y + 14);
        ctx.fillStyle = '#fff';
        ctx.fillText(p.name, x, y + 14);
      }
      if (big) {
        ctx.font = 'bold 22px "Trebuchet MS", sans-serif';
        ctx.textAlign = 'center';
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(0,0,0,0.85)';
        ctx.strokeText(p.name, x, y - 14);
        ctx.fillStyle = '#fff';
        ctx.fillText(p.name, x, y - 14);
      }
    }
    // sandbox enemies show up as red dots
    if (g.sandbox) {
      ctx.fillStyle = '#ff4a4a';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = big ? 2 : 1;
      for (const e of g.sbx.enemies) {
        if (!e.ch.alive) continue;
        const x = toX(e.ch.pos.x), y = toY(e.ch.pos.z);
        if (!big && (x < -4 || y < -4 || x > 204 || y > 204)) continue;
        ctx.beginPath(); ctx.arc(x, y, big ? 6 : 3.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
    }
  }

  drawBigMap() {
    const g = this.game, ctx = this.bm, src = g.world.minimapCanvas;
    if (!src) return;
    const W = 1024;
    ctx.clearRect(0, 0, W, W);
    ctx.drawImage(src, 0, 0, W, W);
    const k = W / WORLD.size;
    const toX = (x) => (x + WORLD.half) * k, toY = (z) => (z + WORLD.half) * k;
    this.drawOverlays(ctx, toX, toY, k, true);
    const ch = g.player;
    const p = ch.mode === 'bus' ? g.bus.pos : ch.pos;
    ctx.save();
    ctx.translate(toX(p.x), toY(p.z));
    ctx.rotate(-(g.controller.yaw));
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(11, 13); ctx.lineTo(0, 6); ctx.lineTo(-11, 13); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  // ---- results --------------------------------------------------------------------------------------------------------------------------------------------------
  showResult({ win, placement, kills, damage, time, killer, total }) {
    const t = this.$('#res-title');
    t.textContent = win ? 'Victory Royale!' : `#${placement} of ${total}`;
    t.className = win ? 'win' : 'lose';
    this.$('#res-sub').textContent = win ? 'You are the last one standing.' : killer ? `Eliminated by ${killer}` : 'Eliminated';
    const mm = Math.floor(time / 60), ss = String(Math.floor(time % 60)).padStart(2, '0');
    this.$('#res-stats').innerHTML = `<div><b>${kills}</b>Eliminations</div><div><b>${Math.round(damage)}</b>Damage dealt</div><div><b>${mm}:${ss}</b>Survived</div><div><b>#${placement}</b>Placement</div>`;
    this.show('result', true);
    this.$('#btn-spec').style.display = win ? 'none' : '';
  }
}
export { PHASES };
