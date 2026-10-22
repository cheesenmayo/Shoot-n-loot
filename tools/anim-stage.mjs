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
    // a quiet spot: flat terrain, no colliders around
    const c = g.world.collision, t = g.world.terrain;
    const free = (x, z) => {
      const h0 = t.height(x, z);
      if (h0 < 3) return false;
      for (let a = 0; a < 12; a++) {
        for (const r of [2, 5, 8]) {
          const px = x + Math.cos(a * 0.5236) * r, pz = z + Math.sin(a * 0.5236) * r;
          if (Math.abs(t.height(px, pz) - h0) > 0.12 || c.groundAt(px, pz, 999, 0.6) - h0 > 0.01) return false;
        }
      }
      return true;
    };
    S.x = 0; S.z = 0;
    outer: for (let r = 0; r < 700; r += 25) {
      for (let a = 0; a < 16; a++) {
        const x = Math.cos(a / 16 * 6.2832) * r, z = Math.sin(a / 16 * 6.2832) * r;
        if (free(x, z)) { S.x = x; S.z = z; break outer; }
      }
    }
    S.floor = c.groundAt(S.x, S.z, 999, 0.6);
    // open water (deep enough to swim) for the swimming poses
    S.wx = 1500; S.wz = 0;
    for (let r = 300; r < 3000; r += 40) {
      let found = false;
      for (let a = 0; a < 12 && !found; a++) {
        const x = Math.cos(a * 0.5236) * r, z = Math.sin(a * 0.5236) * r;
        if ([[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]].every(([dx, dz]) => t.height(x + dx, z + dz) < -3)) { S.wx = x; S.wz = z; found = true; }
      }
      if (found) break;
    }
    S.ready = true;
    if (!S.full) S.clean();
  };

  /** Hides the world (everything but lights, sky and characters) and lays a plain ground disc: renders ~20x faster in software GL. */
  S.clean = () => {
    const keep = new Set(g.chars.map((c) => c.root));
    S.hidden = [];
    for (const k of g.scene.children) {
      if (k.isLight || keep.has(k) || k.name === 'sky' || k.type === 'Object3D') continue;
      S.hidden.push(k); k.visible = false;
    }
    g.addJumpPad({ x: 0, y: -50, z: 0, r: 1, vy: 0, vx: 0, vz: 0, expires: 1e9 });
    const pad = g.dynPads[g.dynPads.length - 1];
    const disc = pad.mesh.children[0].clone();
    disc.material = disc.material.clone();
    disc.material.color.setHex(0x7d8a64);
    disc.material.roughness = 0.95;
    disc.scale.set(180, 1, 180);
    disc.position.set(S.x, S.floor - 0.09, S.z);
    disc.receiveShadow = true;
    g.scene.add(disc);
    g.scene.remove(pad.mesh);
    g.dynPads.splice(g.dynPads.indexOf(pad), 1); g.refreshPads();
    S.disc = disc;
  };

  S.groundAt = (x, z) => g.world.collision.groundAt(x, z, 999, 0.6);
  S.player = () => g.player;
  S.dummy = (i = 0) => g.bots[i].ch;

  /** Puts a character on the stage, upright and idle. */
  S.reset = (c0 = g.player, o = {}) => {
    const c = c0 || g.player;
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
    if (c.held) { c.held.parent?.remove(c.held); c.held = null; }
    c.heldId = null;
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

  S.walkTo = (fwd, strafe, sprint, crouch, settle = 0.7) => { const p = S.subject; p.input.fwd = fwd; p.input.strafe = strafe; p.input.sprint = !!sprint; p.input.crouch = !!crouch; S.step(settle); };
  S.stop = () => { const p = S.subject; p.input.fwd = 0; p.input.strafe = 0; p.input.sprint = false; p.input.crouch = false; p.input.fire = false; p.input.ads = false; };
  /** n snapshots spread over sec seconds. */
  S.frames = (sec, n, label = '') => { const dt = sec / n; for (let i = 0; i < n; i++) { S.snap(label + 't=' + (i * dt).toFixed(2)); S.step(dt); } };

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
    c.model.head.visible = view !== 'fpv'; // the game hides the head (hair, hat) in first person
    if (view === 'fpv') {
      // the game's first-person camera: at the eye height, a little behind the eyes (see player.js)
      c.eyePos(cam.position);
      cam.position.x += sy * 0.15; cam.position.z += cy * 0.15;
      cam.fov = c.ads && c.stack?.def.kind === 'gun' ? 70 / c.stack.def.zoom : 70;
      cam.lookAt(cam.position.x + fx * 50, cam.position.y + fy * 50, cam.position.z + fz * 50);
    } else if (view === 'tps' || view === 'far') {
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
      const d = view === 'wide' ? 5.2 : view === 'face' || view === 'faceS' ? 1.15 : 3.4;
      const cx = px, cz = pz;
      let ox = 0, oz = 0;
      if (view === 'side' || view === 'wide') { ox = brx * d; oz = brz * d; }
      else if (view === 'front') { ox = bfx * d; oz = bfz * d; }
      else if (view === 'back') { ox = -bfx * d; oz = -bfz * d; }
      else if (view === 'sideL') { ox = -brx * d; oz = -brz * d; }
      else if (view === 'face') { ox = bfx * d; oz = bfz * d; }
      else if (view === 'faceS') { ox = brx * d; oz = brz * d; }
      else if (view === 'top') { ox = brx * 0.4; oz = brz * 0.4; }
      const face = view === 'face' || view === 'faceS';
      const h = view === 'top' ? 4.2 : face ? 1.55 : 1.15;
      cam.position.set(cx + ox, py + h, cz + oz);
      cam.fov = view === 'wide' ? 34 : 38;
      cam.lookAt(cx, py + (view === 'top' ? 0.4 : face ? 1.55 : 0.95), cz);
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
    for (const v of S.cur.views) {
      S.cam(v, c);
      g.world.update(g.camera, c.pos, 0, g.time);
      g.render();
      // grab the pixels in the same task as the render (the drawing buffer is not preserved)
      S.cur.frames.push({ v, label, url: g.canvas.toDataURL('image/jpeg', 0.92) });
    }
  };
  S.clearSheet = () => { S.sheet.length = 0; S.cur = null; };

  // ---- measurements -------------------------------------------------------------------------------------------------
  /** World position of a rig object. */
  S.wpos = (obj) => { const v = new obj.position.constructor(); obj.getWorldPosition(v); return v; };
  return 'stage ready';
}
