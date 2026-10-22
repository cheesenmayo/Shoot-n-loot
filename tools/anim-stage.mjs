// Shared page-side stage for tools/anim-preview.mjs and tools/anim-test.mjs.
// stageInit() runs inside the page (after window.__ready) and defines window.__S: a quiet flat arena with the
// player (or any character) as the subject, helpers to give items / drive input / advance the simulation,
// camera presets that match the game's close third-person view, and a contact-sheet recorder.

export function stageInit() {
  const g = window.__game;
  const { makeStack } = window.__items;
  const S = (window.__S = {});
  const out = [];
  S.sheet = out;
  S.tile = [300, 360];
  S.views = ['tps'];
  S.cur = null;
  S.ready = false;

  S.init = () => {
    if (S.ready) return;
    g.startMatch();
    g.forcedJump = true; // everybody stays on the (invisible) bus
    g.bus.update = () => {};
    for (const b of g.bots) b.update = () => {};
    g.controller.update = () => {};
    const plaza = g.world.pois[0];
    S.x = plaza.x + 30; S.z = plaza.z + 20;
    S.ready = true;
  };

  S.groundAt = (x, z) => g.world.collision.groundAt(x, z, 999, 0.6);
  S.player = () => g.player;
  S.dummy = (i = 0) => g.bots[i].ch;

  /** Puts a character on the stage, upright and idle. */
  S.reset = (c = g.player, o = {}) => {
    const x = o.x ?? S.x, z = o.z ?? S.z;
    c.alive = true; c.deadT = 0; c.deadGround = false; c.deadWater = false;
    c.hp = 100; c.shield = 0; c.swimming = false; c.crouching = false; c.sprinting = false; c.ads = false;
    c.setMode('normal');
    c.place(x, o.y ?? S.groundAt(x, z), z);
    c.vel.set(0, 0, 0); c.grounded = true; c.airTime = 0; c.danceT = 0; c.grapple = null;
    c.reload = null; c.using = null; c.swingT = 0; c.throwT = 0; c.pendingThrow = null; c.equipT = 0; c.fireCd = 0; c.burstLeft = 0; c.flashT = 0; c.spin = 0; c.recoil = 0; c.bloom = 0;
    c.yaw = o.yaw ?? 0; c.pitch = o.pitch ?? 0; c.bodyYaw = c.yaw;
    if (c === g.player) { g.controller.yaw = c.yaw; g.controller.pitch = c.pitch; }
    for (const k of Object.keys(c.input)) c.input[k] = typeof c.input[k] === 'boolean' ? false : 0;
    c.buffs.speedT = c.buffs.jumpT = c.buffs.runT = 0;
    c.hot = null;
    c.lastShotT = -99;
    c.renderOn = true;
    c.root.visible = true;
    c.root.rotation.set(0, c.bodyYaw, 0);
    // a fresh animator so no earlier pose / spring state leaks in
    c.anim.dispose();
    c.anim = new c.anim.constructor(c);
    c.refreshHeld();
    S.subject = c;
    return c;
  };

  S.give = (id, rarity = 2, slot = 1, ammo = 200, c = S.subject || g.player) => {
    c.inv.slots[slot] = makeStack(id, rarity);
    const d = c.inv.slots[slot].def;
    if (d.ammo) c.inv.ammo[d.ammo] = Math.min(ammo, 999);
    c.inv.sel = 0; c.equip(slot); c.equipT = 0; c.refreshHeld(); c.bloom = 0; c.fireCd = 0;
    return c.inv.slots[slot];
  };
  S.hold = (id, c = S.subject || g.player) => {
    if (id === 'pickaxe') { c.inv.sel = 0; c.equipT = 0; c.refreshHeld(); return c.inv.slots[0]; }
    return S.give(id, 2, 1, 200, c);
  };

  S.step = (sec, dt = 1 / 60) => { window.__step(sec, dt); };
  /** Advances while calling fn(t) before every tick (scripted input). */
  S.run = (sec, fn, dt = 1 / 60) => {
    const n = Math.round(sec / dt);
    for (let i = 0; i < n; i++) { if (fn) fn(i * dt, i); g.step(dt); }
  };

  // ---- cameras ----------------------------------------------------------------------------------------------
  const cam = g.camera;
  S.cam = (view = 'tps', c = S.subject || g.player) => {
    const yaw = c === g.player ? g.controller.yaw : c.yaw;
    const pit = c.pitch;
    const sy = Math.sin(yaw), cy = Math.cos(yaw);
    const cp = Math.cos(pit), sp = Math.sin(pit);
    const fx = -sy * cp, fy = sp, fz = -cy * cp;
    const rx = cy, rz = -sy;
    let px = c.pos.x, py = c.pos.y, pz = c.pos.z;
    const crouch = c.crouching ? 1.2 : 1.6;
    if (view === 'tps' || view === 'far') {
      let dist = view === 'tps' ? 2.1 : 4.6, off = view === 'tps' ? 0.6 : 0.9, fov = 70;
      const st = c.stack;
      if (view === 'tps' && c.ads && st?.def.kind === 'gun') { dist = 1.0; off = 0.34; fov = 70 * st.def.zoom; }
      cam.position.set(px + rx * off - fx * dist, py + crouch + fy * -dist, pz + rz * off - fz * dist);
      cam.fov = fov;
      cam.lookAt(cam.position.x + fx * 50, cam.position.y + fy * 50, cam.position.z + fz * 50);
    } else {
      // free views relative to the body's facing, framing the whole character
      const b = c.bodyYaw;
      const bsy = Math.sin(b), bcy = Math.cos(b);
      const bfx = -bsy, bfz = -bcy, brx = bcy, brz = -bsy;
      const d = view === 'wide' ? 5.2 : 3.4;
      const cx = px, cz = pz;
      let ox = 0, oz = 0;
      if (view === 'side' || view === 'wide') { ox = brx * d; oz = brz * d; }
      else if (view === 'front') { ox = bfx * d; oz = bfz * d; }
      else if (view === 'back') { ox = -bfx * d; oz = -bfz * d; }
      else if (view === 'sideL') { ox = -brx * d; oz = -brz * d; }
      else if (view === 'top') { ox = brx * 0.4; oz = brz * 0.4; }
      const h = view === 'top' ? 4.2 : 1.15;
      cam.position.set(cx + ox, py + h, cz + oz);
      cam.fov = view === 'wide' ? 34 : 38;
      cam.lookAt(cx, py + (view === 'top' ? 0.4 : 0.95), cz);
    }
    cam.aspect = S.tile[0] / S.tile[1];
    cam.updateProjectionMatrix();
  };

  // ---- contact sheets -----------------------------------------------------------------------------------------
  S.begin = (title, views = S.views) => {
    S.cur = { title, views, frames: [] };
    S.sheet.push(S.cur);
  };
  S.snap = (label = '', c = S.subject || g.player) => {
    const [w, h] = S.tile;
    for (const v of S.cur.views) {
      S.cam(v, c);
      g.world.update(g.camera, c.pos, 0, g.time);
      g.render();
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const x = cv.getContext('2d');
      x.drawImage(g.canvas, 0, 0, w, h);
      S.cur.frames.push({ v, label, cv });
    }
  };
  S.compose = (cols = 6) => {
    const [w, h] = S.tile;
    const bar = 22;
    // rows: per scenario, per view
    const rows = [];
    for (const sc of S.sheet) {
      rows.push({ title: sc.title });
      for (const v of sc.views) {
        const fr = sc.frames.filter((f) => f.v === v);
        for (let i = 0; i < fr.length; i += cols) rows.push({ frames: fr.slice(i, i + cols), view: v });
      }
    }
    const H = rows.reduce((a, r) => a + (r.title ? bar : h), 0);
    const W = w * cols;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const x = cv.getContext('2d');
    x.fillStyle = '#10141c'; x.fillRect(0, 0, W, H);
    let y = 0;
    for (const r of rows) {
      if (r.title) {
        x.fillStyle = '#1d2736'; x.fillRect(0, y, W, bar);
        x.fillStyle = '#ffd86b'; x.font = 'bold 14px monospace'; x.textBaseline = 'middle';
        x.fillText(r.title, 8, y + bar / 2);
        y += bar;
        continue;
      }
      r.frames.forEach((f, i) => {
        x.drawImage(f.cv, i * w, y);
        x.strokeStyle = '#10141c'; x.strokeRect(i * w, y, w, h);
        x.fillStyle = 'rgba(0,0,0,0.55)'; x.fillRect(i * w, y, w, 16);
        x.fillStyle = '#fff'; x.font = '11px monospace'; x.textBaseline = 'top';
        x.fillText(`${f.v} ${f.label}`, i * w + 4, y + 2);
      });
      y += h;
    }
    return cv.toDataURL('image/png');
  };
  S.clearSheet = () => { S.sheet.length = 0; S.cur = null; };

  // ---- measurements -------------------------------------------------------------------------------------------------
  /** World position of a rig object. */
  S.wpos = (obj) => { const v = new obj.position.constructor(); obj.getWorldPosition(v); return v; };
  return 'stage ready';
}
