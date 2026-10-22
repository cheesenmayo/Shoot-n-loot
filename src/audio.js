// Procedural audio: every sound is synthesised with WebAudio, no asset files.

const GUN = {
  pistol:   { n: 0.09, lp: 3400, f: 150, t: 0.08, g: 0.8 },
  revolver: { n: 0.16, lp: 2200, f: 100, t: 0.14, g: 1.0 },
  cannon:   { n: 0.24, lp: 1800, f: 70, t: 0.22, g: 1.2 },
  smg:      { n: 0.07, lp: 3000, f: 130, t: 0.06, g: 0.7 },
  silenced: { n: 0.05, lp: 5200, f: 180, t: 0.03, g: 0.35 },
  rifle:    { n: 0.12, lp: 2400, f: 95, t: 0.1, g: 0.9 },
  heavy:    { n: 0.15, lp: 1900, f: 80, t: 0.13, g: 1.0 },
  lever:    { n: 0.15, lp: 2300, f: 90, t: 0.12, g: 1.0 },
  shotgun:  { n: 0.28, lp: 1500, f: 60, t: 0.22, g: 1.25 },
  sniper:   { n: 0.38, lp: 1700, f: 55, t: 0.28, g: 1.3, echo: true },
  minigun:  { n: 0.06, lp: 2600, f: 110, t: 0.05, g: 0.6 },
  grenadel: { n: 0.14, lp: 900, f: 120, t: 0.2, g: 0.9 },
};

export class AudioSys {
  constructor() {
    this.ctx = null;
    this.volume = 0.6;
    this.listener = { x: 0, y: 0, z: 0, yaw: 0 };
    this.last = {};
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    const c = this.ctx;
    this.master = c.createGain();
    this.master.gain.value = this.volume;
    this.comp = c.createDynamicsCompressor();
    this.comp.threshold.value = -12;
    this.comp.ratio.value = 6;
    this.master.connect(this.comp);
    this.comp.connect(c.destination);
    // shared noise buffer
    const len = c.sampleRate * 2;
    this.noise = c.createBuffer(1, len, c.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // loops: wind + storm
    this.wind = this._loop(900, 0.0);
    this.storm = this._loop(220, 0.0);
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.value = v;
  }

  _loop(freq, gain) {
    const c = this.ctx;
    const src = c.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = freq;
    f.Q.value = 0.6;
    const g = c.createGain();
    g.gain.value = gain;
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start();
    return { g, f };
  }

  setWind(level) {
    if (!this.ctx) return;
    this.wind.g.gain.setTargetAtTime(level * 0.35, this.ctx.currentTime, 0.15);
    this.wind.f.frequency.setTargetAtTime(500 + level * 1200, this.ctx.currentTime, 0.2);
  }
  setStorm(level) {
    if (!this.ctx) return;
    this.storm.g.gain.setTargetAtTime(level * 0.5, this.ctx.currentTime, 0.3);
    this.storm.f.frequency.setTargetAtTime(160 + level * 260, this.ctx.currentTime, 0.4);
  }

  setListener(x, y, z, yaw) {
    const l = this.listener;
    l.x = x; l.y = y; l.z = z; l.yaw = yaw;
  }

  // -- low level ---------------------------------------------------------------------------------------------
  _out(vol, pan = 0) {
    const c = this.ctx;
    const g = c.createGain();
    g.gain.value = vol;
    let node = g;
    if (c.createStereoPanner) {
      const p = c.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan));
      g.connect(p);
      node = p;
    }
    node.connect(this.master);
    return g;
  }

  _noise(dur, lp, vol, out, { hp = 0, attack = 0.002, decayTo = 0.0001, when = 0, sweepTo = null } = {}) {
    const c = this.ctx, t = c.currentTime + when;
    const src = c.createBufferSource();
    src.buffer = this.noise;
    src.loopStart = Math.random();
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(lp, t);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(decayTo, t + dur);
    src.connect(f);
    let last = f;
    if (hp) {
      const h = c.createBiquadFilter();
      h.type = 'highpass';
      h.frequency.value = hp;
      f.connect(h);
      last = h;
    }
    last.connect(g);
    g.connect(out);
    src.start(t, Math.random() * 1.5);
    src.stop(t + dur + 0.05);
  }

  _tone(freq, dur, vol, out, { type = 'sine', to = null, when = 0, attack = 0.003 } = {}) {
    const c = this.ctx, t = c.currentTime + when;
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  _spatial(pos, maxDist = 200) {
    const l = this.listener;
    const dx = pos.x - l.x, dy = pos.y - l.y, dz = pos.z - l.z;
    const d = Math.hypot(dx, dy, dz);
    if (d > maxDist) return null;
    const near = 1 - d / maxDist;
    const vol = near * near / (1 + d * 0.015);
    // listener right vector
    const rx = Math.cos(l.yaw), rz = -Math.sin(l.yaw);
    const pan = d > 0.5 ? (dx * rx + dz * rz) / d : 0;
    return { vol, pan, d };
  }

  _throttle(key, ms) {
    const now = performance.now();
    if (now - (this.last[key] || 0) < ms) return true;
    this.last[key] = now;
    return false;
  }

  // -- public API ----------------------------------------------------------------------------------------------------
  /** Play a sound; `pos` makes it positional. */
  play(type, pos = null, o = {}) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    let vol = o.vol ?? 1, pan = 0, dist = 0;
    if (pos) {
      const s = this._spatial(pos, o.max ?? 200);
      if (!s) return;
      vol *= s.vol; pan = s.pan; dist = s.d;
      if (vol < 0.004) return;
    }
    if (type.startsWith('gun:')) return this._gun(type.slice(4), vol, pan, dist);
    const out = this._out(vol * 0.9, pan);
    switch (type) {
      case 'explosion': {
        this._noise(1.4, 1600, 1.0, out, { sweepTo: 70, attack: 0.004 });
        this._tone(60, 0.8, 1.0, out, { to: 28 });
        this._noise(0.25, 6000, 0.5, out, { hp: 1000 });
        break;
      }
      case 'impulse':
        this._tone(220, 0.5, 0.7, out, { to: 40 });
        this._noise(0.4, 1200, 0.5, out, { sweepTo: 200 });
        this._tone(900, 0.3, 0.2, out, { to: 2400, type: 'triangle' });
        break;
      case 'boogie':
        for (let i = 0; i < 6; i++) this._tone(500 + i * 140, 0.12, 0.25, out, { when: i * 0.07, type: 'square' });
        break;
      case 'swing': this._noise(0.16, 2400, 0.5, out, { attack: 0.04, sweepTo: 600, hp: 300 }); break;
      case 'melee_hit': this._tone(140, 0.12, 0.9, out, { to: 60 }); this._noise(0.08, 3000, 0.6, out); break;
      case 'hit': this._tone(1500, 0.05, 0.5, out, { type: 'triangle' }); break;
      case 'headshot': this._tone(2300, 0.09, 0.5, out, { type: 'triangle' }); this._tone(3400, 0.14, 0.35, out, { when: 0.04, type: 'triangle' }); break;
      case 'hurt': this._noise(0.12, 500, 0.9, out); this._tone(120, 0.15, 0.7, out, { to: 60 }); break;
      case 'shield_break': this._tone(1800, 0.3, 0.4, out, { to: 300, type: 'sawtooth' }); this._noise(0.3, 5000, 0.3, out); break;
      case 'pickup': this._tone(660, 0.07, 0.4, out, { type: 'triangle' }); this._tone(990, 0.1, 0.4, out, { when: 0.06, type: 'triangle' }); break;
      case 'ammo': this._noise(0.05, 4000, 0.4, out); this._noise(0.05, 3000, 0.4, out, { when: 0.07 }); break;
      case 'chest': {
        this._noise(0.5, 800, 0.5, out, { sweepTo: 200, attack: 0.1 });
        [523, 659, 784, 1047, 1319].forEach((f, i) => this._tone(f, 0.35, 0.3, out, { when: 0.15 + i * 0.07, type: 'triangle' }));
        break;
      }
      case 'chest_hum': this._tone(1568, 0.5, 0.12, out, { type: 'sine' }); this._tone(2093, 0.6, 0.08, out, { when: 0.12 }); break;
      case 'step': this._noise(0.07, o.lp ?? 900, 0.5, out, { attack: 0.004 }); break;
      case 'land': this._noise(0.18, 600, 0.9, out); this._tone(70, 0.15, 0.8, out, { to: 40 }); break;
      case 'jump': this._noise(0.08, 1200, 0.25, out, { hp: 200 }); break;
      case 'reload': this._noise(0.04, 5000, 0.5, out); this._tone(300, 0.05, 0.4, out, { type: 'square', when: 0.04 }); this._noise(0.05, 4500, 0.6, out, { when: 0.55 }); break;
      case 'equip': this._noise(0.05, 3500, 0.35, out); this._tone(420, 0.04, 0.25, out, { type: 'square', when: 0.03 }); break;
      case 'eat': for (let i = 0; i < 3; i++) this._noise(0.07, 2200, 0.5, out, { when: i * 0.22 }); break;
      case 'drink': for (let i = 0; i < 4; i++) this._tone(200 - i * 20, 0.12, 0.4, out, { when: i * 0.25, to: 120 }); break;
      case 'heal': [523, 659, 784].forEach((f, i) => this._tone(f, 0.25, 0.3, out, { when: i * 0.08, type: 'triangle' })); break;
      case 'shield': [784, 988, 1175, 1568].forEach((f, i) => this._tone(f, 0.3, 0.25, out, { when: i * 0.07, type: 'sine' })); break;
      case 'jumpple': [440, 660, 880, 1320].forEach((f, i) => this._tone(f, 0.12, 0.3, out, { when: i * 0.05, type: 'square' })); break;
      case 'floorange': this._tone(300, 0.35, 0.5, out, { to: 1800, type: 'triangle' }); this._noise(0.3, 6000, 0.3, out, { hp: 2000 }); break;
      case 'grapple': this._noise(0.25, 5000, 0.5, out, { hp: 1500, sweepTo: 1500 }); this._tone(1200, 0.2, 0.2, out, { to: 400, type: 'sawtooth' }); break;
      case 'launchpad': this._tone(180, 0.35, 0.7, out, { to: 700, type: 'sine' }); this._tone(360, 0.3, 0.3, out, { to: 1400, type: 'triangle' }); break;
      case 'place': this._tone(200, 0.12, 0.5, out, { to: 90 }); break;
      case 'glider': this._noise(0.4, 1600, 0.8, out, { attack: 0.02, hp: 300 }); this._tone(160, 0.2, 0.4, out, { to: 80 }); break;
      case 'bus': this._tone(90, 1.0, 0.2, out, { type: 'sawtooth', to: 85 }); break;
      case 'elim': this._tone(300, 0.5, 0.5, out, { to: 90, type: 'sawtooth' }); break;
      case 'win': [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => this._tone(f, 0.28, 0.35, out, { when: i * 0.14, type: 'triangle' })); break;
      case 'storm_warn': this._tone(392, 0.5, 0.35, out, { type: 'triangle' }); this._tone(330, 0.7, 0.35, out, { when: 0.35, type: 'triangle' }); break;
      case 'click': this._tone(900, 0.03, 0.25, out, { type: 'square' }); break;
      case 'dry': this._noise(0.03, 3000, 0.35, out); break;
      default: break;
    }
  }

  _gun(kind, vol, pan, dist) {
    const p = GUN[kind];
    if (kind === 'rocket') {
      const out = this._out(vol, pan);
      this._noise(0.9, 2500, 0.8, out, { sweepTo: 300, attack: 0.05, hp: 200 });
      this._tone(100, 0.4, 0.8, out, { to: 40 });
      return;
    }
    if (kind === 'crossbow') {
      const out = this._out(vol, pan);
      this._tone(700, 0.18, 0.5, out, { to: 160, type: 'sawtooth' });
      this._noise(0.05, 5000, 0.4, out);
      return;
    }
    if (!p) return;
    const out = this._out(vol * p.g, pan);
    const lp = p.lp * (dist > 60 ? Math.max(0.35, 1 - (dist - 60) / 400) : 1);
    this._noise(p.n, lp, 0.9, out, { attack: 0.0015 });
    this._tone(p.f, p.t, 0.9, out, { to: p.f * 0.4 });
    if (p.echo && dist > 20) {
      const o2 = this._out(vol * 0.35, pan);
      this._noise(p.n * 1.6, lp * 0.6, 0.6, o2, { when: Math.min(0.9, dist / 340) });
    }
  }

  /** Looser rate limit helper used by gameplay code for far-off gunfire. */
  throttled(key, ms) { return this._throttle(key, ms); }
}
