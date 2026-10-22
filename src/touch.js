// On-screen touch controls: floating move stick (left), drag-to-look (right), action buttons.
// The controller reads `state`; every frame it consumes the look delta and the edge-triggered presses.

const ICONS = {
  fire: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="11" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/><path d="M24 4v9M24 35v9M4 24h9M35 24h9" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>',
  jump: '<svg viewBox="0 0 48 48"><path d="M12 30l12-13 12 13" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  crouch: '<svg viewBox="0 0 48 48"><path d="M12 18l12 13 12-13" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ads: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M24 6v10M24 32v10M6 24h10M32 24h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  reload: '<svg viewBox="0 0 48 48"><path d="M37 17a14 14 0 1 0 2 11" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M38 7v11H27" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pause: '<svg viewBox="0 0 48 48"><path d="M16 11v26M32 11v26" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>',
  map: '<svg viewBox="0 0 48 48"><path d="M24 43s-13-12-13-22a13 13 0 0 1 26 0c0 10-13 22-13 22z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><circle cx="24" cy="21" r="4.5" fill="currentColor"/></svg>',
  next: '<svg viewBox="0 0 48 48"><path d="M17 11l14 13-14 13" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sandbox: '<svg viewBox="0 0 48 48"><path d="M18 5h12M20 5v14L9 38.5A4.5 4.5 0 0 0 13 45h22a4.5 4.5 0 0 0 4-6.5L28 19V5" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 33h20" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/></svg>',
};

const STICK_R = 54; // px of finger travel for full deflection

export class TouchControls {
  constructor(game, root) {
    this.game = game;
    this.root = root;
    this.active = false; // controls currently capture touches
    this.enabled = false; // touch mode on (body.touch)
    this.touches = new Map();
    this.state = {
      moveX: 0, moveY: 0, mag: 0,
      lookDX: 0, lookDY: 0,
      fire: false, firePressed: false,
      jumpHeld: false, jumpPressed: false,
      ads: false, crouch: false,
      interactHeld: false, interactPressed: false,
      reloadPressed: false, nextPressed: false,
    };
    root.innerHTML = `
      <div class="zone zl" data-zone="left"></div>
      <div class="zone zr" data-zone="right"></div>
      <div class="hint" id="t-hint">MOVE</div>
      <div class="stick" id="t-stick"><div class="knob"></div></div>
      <div class="tb tsmall top-l" data-btn="pause">${ICONS.pause}</div>
      <div class="tb tsmall top-l2" data-btn="map">${ICONS.map}</div>
      <div class="tb tsmall top-l3" data-btn="sandbox">${ICONS.sandbox}</div>
      <div class="tb tfire" data-btn="fire">${ICONS.fire}</div>
      <div class="tb tjump" data-btn="jump">${ICONS.jump}<span>JUMP</span></div>
      <div class="tb tads" data-btn="ads">${ICONS.ads}</div>
      <div class="tb tcrouch tsmall" data-btn="crouch">${ICONS.crouch}</div>
      <div class="tb treload tsmall" data-btn="reload">${ICONS.reload}</div>
      <div class="tb tnext" data-btn="next">${ICONS.next}<span>NEXT</span></div>
      <div class="tb tinteract" data-btn="interact"><b id="t-int-label">PICK UP</b></div>`;
    this.$ = (s) => root.querySelector(s);
    this.stickEl = this.$('#t-stick');
    this.knob = this.stickEl.querySelector('.knob');
    this.intEl = this.$('.tinteract');
    this.intLabel = this.$('#t-int-label');
    this.bind();
  }

  bind() {
    const root = this.root;
    root.addEventListener('touchstart', (e) => {
      if (!this.active) return;
      if (e.cancelable) e.preventDefault();
      for (const t of e.changedTouches) this.start(t);
    }, { passive: false });
    const move = (e) => {
      if (!this.active) return;
      for (const t of e.changedTouches) this.move(t);
    };
    const end = (e) => {
      for (const t of e.changedTouches) this.end(t);
    };
    document.addEventListener('touchmove', move, { passive: true });
    document.addEventListener('touchend', end, { passive: true });
    document.addEventListener('touchcancel', end, { passive: true });
    // iOS: no pinch / double tap zoom in the game
    document.addEventListener('gesturestart', (e) => e.preventDefault());
  }

  setEnabled(on) {
    this.enabled = on;
    document.body.classList.toggle('touch', on);
    if (!on) this.setActive(false);
  }

  /** Controls only capture touches while a match is in progress (not in menus). */
  setActive(on) {
    on = on && this.enabled;
    if (on === this.active) return;
    this.active = on;
    this.root.classList.toggle('hidden', !on);
    if (!on) this.releaseAll();
  }

  releaseAll() {
    this.touches.clear();
    const s = this.state;
    s.moveX = s.moveY = s.mag = 0;
    s.fire = s.jumpHeld = s.interactHeld = false;
    this.stickEl.classList.remove('on');
    this.$('#t-hint').classList.remove('off');
  }

  start(t) {
    const el = t.target.closest ? t.target.closest('[data-btn]') : null;
    const s = this.state;
    const id = t.identifier;
    if (el) {
      const name = el.dataset.btn;
      this.touches.set(id, { role: 'btn', name, el, x: t.clientX, y: t.clientY });
      el.classList.add('down');
      switch (name) {
        case 'fire': s.fire = true; s.firePressed = true; break;
        case 'jump': s.jumpHeld = true; s.jumpPressed = true; break;
        case 'ads': s.ads = !s.ads; el.classList.toggle('on', s.ads); break;
        case 'crouch': s.crouch = !s.crouch; el.classList.toggle('on', s.crouch); break;
        case 'reload': s.reloadPressed = true; break;
        case 'interact': s.interactHeld = true; s.interactPressed = true; break;
        case 'next': s.nextPressed = true; break;
        default: break; // pause / map / sandbox fire on release
      }
      return;
    }
    const zone = t.target.dataset?.zone;
    if (zone === 'left') {
      if ([...this.touches.values()].some((v) => v.role === 'stick')) return;
      const x = Math.min(Math.max(t.clientX, STICK_R + 14), innerWidth - STICK_R - 14);
      const y = Math.min(Math.max(t.clientY, STICK_R + 14), innerHeight - STICK_R - 14);
      this.touches.set(id, { role: 'stick', ox: x, oy: y });
      this.stickEl.style.left = x + 'px';
      this.stickEl.style.top = y + 'px';
      this.knob.style.transform = 'translate(0px,0px)';
      this.stickEl.classList.add('on');
      this.$('#t-hint').classList.add('off');
    } else if (zone === 'right') {
      this.touches.set(id, { role: 'look', x: t.clientX, y: t.clientY });
    }
  }

  move(t) {
    const rec = this.touches.get(t.identifier);
    if (!rec) return;
    const s = this.state;
    if (rec.role === 'stick') {
      const vx = (t.clientX - rec.ox) / STICK_R, vy = (t.clientY - rec.oy) / STICK_R;
      const len = Math.hypot(vx, vy);
      const d = Math.min(1, len); // deflection 0..1
      const ux = len > 0 ? vx / len : 0, uy = len > 0 ? vy / len : 0;
      this.knob.style.transform = `translate(${ux * d * STICK_R}px,${uy * d * STICK_R}px)`;
      if (d < 0.14) {
        s.moveX = s.moveY = s.mag = 0;
      } else {
        // dead zone, then a slightly eased response so small nudges stay precise
        const mag = Math.pow((d - 0.14) / 0.86, 1.1);
        s.moveX = ux * mag;
        s.moveY = uy * mag;
        s.mag = mag;
      }
    } else if (rec.role === 'look' || (rec.role === 'btn' && rec.name === 'fire')) {
      s.lookDX += t.clientX - rec.x;
      s.lookDY += t.clientY - rec.y;
      rec.x = t.clientX;
      rec.y = t.clientY;
    }
  }

  end(t) {
    const rec = this.touches.get(t.identifier);
    if (!rec) return;
    this.touches.delete(t.identifier);
    const s = this.state;
    if (rec.role === 'stick') {
      s.moveX = s.moveY = s.mag = 0;
      this.stickEl.classList.remove('on');
      this.$('#t-hint').classList.remove('off');
    } else if (rec.role === 'btn') {
      rec.el.classList.remove('down');
      switch (rec.name) {
        case 'fire': s.fire = false; break;
        case 'jump': s.jumpHeld = false; break;
        case 'interact': s.interactHeld = false; break;
        case 'pause': this.game.pause(); break;
        case 'map': this.game.hud.toggleMap(); break;
        case 'sandbox': this.game.sbx?.toggle(); break;
        default: break;
      }
    }
  }

  /** Called by the controller each frame. */
  consumeLook() {
    const s = this.state;
    const dx = s.lookDX, dy = s.lookDY;
    s.lookDX = s.lookDY = 0;
    return [dx, dy];
  }

  /** Reflect game state on the buttons (visible interact button, spectator layout, toggles). */
  update(ctrl) {
    const ch = ctrl.char;
    const dead = !!ch && !ch.alive;
    const bus = !!ch && ch.mode === 'bus';
    const air = !!ch && (ch.mode === 'skydive' || ch.mode === 'glide');
    const r = this.root;
    r.classList.toggle('dead', dead);
    r.classList.toggle('bus', bus);
    r.classList.toggle('air', air);
    r.classList.toggle('sbx', this.game.sandbox);
    const target = !dead && !bus && !air ? ctrl.target : null;
    this.intEl.classList.toggle('show', !!target);
    if (target) {
      const label = target.type === 'chest' ? 'OPEN' : 'PICK UP';
      if (this.intLabel.textContent !== label) this.intLabel.textContent = label;
    }
    // toggles that the character can switch off by itself
    const adsBtn = this.$('.tads'), crBtn = this.$('.tcrouch');
    if (ch && ch.stack?.def.kind !== 'gun' && this.state.ads) { this.state.ads = false; adsBtn.classList.remove('on'); }
    adsBtn.classList.toggle('on', this.state.ads);
    crBtn.classList.toggle('on', this.state.crouch);
    const jl = this.$('.tjump span');
    const want = bus ? 'DROP' : air ? 'GLIDE' : 'JUMP';
    if (jl.textContent !== want) jl.textContent = want;
  }
}
