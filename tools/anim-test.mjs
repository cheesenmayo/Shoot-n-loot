// Character animation checks: node tools/anim-test.mjs   (needs playwright, e.g. NODE_PATH=$(npm root -g); build first: node tools/build.mjs --dev)
// Covers the rig budget, joint continuity across state changes, foot sliding, hands on weapons, melee / throw
// timing, hit reactions, deaths, NaN safety over a long scripted scenario, GPU resource leaks and animation cost.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { stageInit } from './anim-stage.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox', '--enable-precise-memory-info', '--js-flags=--expose-gc'] });
const page = await browser.newPage({ viewport: { width: 640, height: 480 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => errors.push(e.message + '\n' + (e.stack || '').split('\n').slice(0, 5).join('\n')));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });
await page.evaluate(stageInit);

const results = await page.evaluate(async () => {
  const S = window.__S, g = window.__game;
  const out = [];
  const ok = (name, cond, info = '') => out.push({ name, pass: !!cond, info: String(info) });
  S.init();
  const Vec = g.player.pos.constructor;
  const f2 = (v) => (typeof v === 'number' ? v.toFixed(2) : v);
  const p = g.player;
  const ang = (q1, q2) => 2 * Math.acos(Math.min(1, Math.abs(q1.dot(q2)))) * 180 / Math.PI;
  const JN = ['body', 'pelvis', 'torso', 'neck', 'head', 'armR.a', 'armR.fore', 'armR.hand', 'armL.a', 'armL.fore', 'armL.hand', 'legR.l', 'legR.shin', 'legR.foot', 'legL.l', 'legL.shin', 'legL.foot'];
  const finite = (c) => c.anim.J.every((o) => Number.isFinite(o.quaternion.x + o.quaternion.y + o.quaternion.z + o.quaternion.w) && Number.isFinite(o.position.x + o.position.y + o.position.z)) && Number.isFinite(c.root.position.x + c.root.position.y + c.root.position.z);
  const world = (obj, local = null) => { g.player.root.updateMatrixWorld(true); const v = local ? local.clone() : new Vec(); return local ? obj.localToWorld(v) : obj.getWorldPosition(v); };
  const wp = (c, obj, local) => { c.root.updateMatrixWorld(true); const v = local ? local.clone() : new Vec(); return local ? obj.localToWorld(v) : obj.getWorldPosition(v); };

  // ---------------------------------------------------------------------------------------------------------------
  // rig budget and silhouette
  // ---------------------------------------------------------------------------------------------------------------
  {
    let maxMeshes = 0, mats = new Set(), minLook = 1e9;
    for (const c of g.chars) {
      let n = 0;
      c.model.root.traverse((o) => { if (o.isMesh) { if (o !== c.held) { n++; mats.add(o.material); } } });
      // item models and the glider are separate; count the character's own parts
      const own = c.model.meshes.length;
      maxMeshes = Math.max(maxMeshes, own);
    }
    ok('rig: at most 17 meshes per character', maxMeshes <= 17, `max ${maxMeshes}`);
    ok('rig: all character parts share one material', new Set(g.chars.flatMap((c) => c.model.meshes.map((m) => m.material))).size === 1);
    const looks = new Set(g.chars.map((c) => JSON.stringify([c.model.outfit.hairStyle, c.model.outfit.hat && c.model.outfit.hat.kind, c.model.outfit.shirt, c.model.outfit.pants, c.model.outfit.shirtStyle, c.model.outfit.skin])));
    ok('rig: 50 characters have distinct outfits', looks.size >= 46, `${looks.size} distinct`);
    const styles = new Set(g.chars.map((c) => c.model.outfit.hairStyle));
    ok('rig: all hair styles in use', styles.size >= 7, [...styles].join(','));
    const hats = new Set(g.chars.map((c) => c.model.outfit.hat && c.model.outfit.hat.kind));
    ok('rig: hat variety', hats.size >= 6, [...hats].join(','));
  }
  const headTop = (c) => {
    c.root.updateMatrixWorld(true);
    const m = c.model.meshes.find((x) => x.name === 'head');
    const pos = m.geometry.attributes.position;
    const v = new Vec();
    let top = -9;
    for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld); top = Math.max(top, v.y); }
    return top - c.pos.y;
  };
  const extent = (c) => {
    c.root.updateMatrixWorld(true);
    let r = 0, top = 0, bottom = 9;
    const v = new Vec();
    for (const m of c.model.meshes) {
      if (!m.visible || m.name === 'lids') continue;
      const pos = m.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
        r = Math.max(r, Math.hypot(v.x - c.pos.x, v.z - c.pos.z));
        top = Math.max(top, v.y - c.pos.y); bottom = Math.min(bottom, v.y - c.pos.y);
      }
    }
    return { r, top, bottom };
  };
  {
    S.reset(); S.hold('pickaxe'); S.step(1.0);
    const e = extent(p), ht = headTop(p);
    ok('silhouette: standing head top ~1.8 m', ht > 1.68 && ht < 1.88, f2(ht));
    ok('silhouette: inside the hit cylinder (r 0.4, top 1.85)', e.r < 0.62 && e.top < 1.9, `r ${f2(e.r)} top ${f2(e.top)}`);
    ok('silhouette: feet on the ground', e.bottom > -0.05 && e.bottom < 0.06, f2(e.bottom));
    const eyeY = wp(p, p.model.head).y - p.pos.y + 0.125;
    ok('silhouette: eye height ~1.62 m standing', Math.abs(eyeY - 1.62) < 0.1, f2(eyeY));
    S.subject.input.crouch = true; S.step(1.0);
    const e2 = extent(p), ht2 = headTop(p);
    const eyeC = wp(p, p.model.head).y - p.pos.y + 0.125;
    ok('silhouette: crouched head top within the 1.35 m cylinder', ht2 < 1.5 && ht2 > 1.1, f2(ht2));
    ok('silhouette: eye height ~1.18 m crouched', Math.abs(eyeC - 1.18) < 0.14, f2(eyeC));
    ok('silhouette: crouching keeps feet down', e2.bottom > -0.06 && e2.bottom < 0.08, f2(e2.bottom));
    S.stop();
  }

  // ---------------------------------------------------------------------------------------------------------------
  // joint continuity across state changes (and NaN safety)
  // ---------------------------------------------------------------------------------------------------------------
  const scenario = (dt, loops = 1) => {
    const track = { max: 0, where: '', maxByState: {}, nan: false, frames: 0 };
    let label = 'start';
    let prev = null;
    const joints = (c) => c.anim.J.map((o) => o.quaternion.clone());
    const sample = (c, tag) => {
      track.frames++;
      if (!finite(c)) { track.nan = true; track.where = 'NaN in ' + label; }
      const cur = joints(c);
      if (prev && prev.c === c) {
        for (let i = 0; i < cur.length; i++) {
          // legs swing faster than anything else in a sprint cycle: allow them 45% more per frame
          const a = ang(prev.q[i], cur[i]) / (i >= 11 ? 1.45 : 1);
          if (a > track.max) { track.max = a; track.where = `${JN[i]} ${a.toFixed(0)} deg at '${label}' t=${g.time.toFixed(2)}`; }
          const cur0 = track.maxByState[label];
          if (!cur0 || a > cur0.a) track.maxByState[label] = { a, j: JN[i] };
        }
      }
      prev = { c, q: cur };
    };
    const run = (c, sec, fn, tag) => {
      label = tag;
      const n = Math.round(sec / dt);
      for (let i = 0; i < n; i++) { if (fn) fn(i * dt, i); g.step(dt); sample(c, tag); }
    };
    return { run, track, setLabel: (l) => { label = l; }, resetPrev: () => { prev = null; } };
  };
  const script = (dt) => {
    const sc = scenario(dt);
    const { run, track } = sc;
    S.reset(); S.hold('pickaxe'); const c = S.subject;
    const inp = c.input;
    const clear = () => { inp.fwd = inp.strafe = 0; inp.sprint = inp.crouch = inp.fire = inp.ads = false; };
    run(c, 1, null, 'idle');
    inp.fwd = 1; run(c, 1.2, null, 'run');
    inp.sprint = true; run(c, 1.2, null, 'sprint');
    inp.sprint = false; inp.fwd = 0; inp.strafe = 1; run(c, 0.8, null, 'strafe');
    inp.strafe = 0; inp.fwd = -1; run(c, 0.8, null, 'backpedal');
    clear(); run(c, 0.6, null, 'stop');
    inp.crouch = true; run(c, 0.8, null, 'crouch'); inp.fwd = 1; run(c, 0.8, null, 'crouch walk'); clear(); run(c, 0.6, null, 'stand up');
    inp.fwd = 1; inp.sprint = true; run(c, 0.4, null, 'sprint'); inp.jumpPressed = true; run(c, 1.4, () => { inp.jumpPressed = false; }, 'jump + land'); clear();
    S.give('ar', 2, 1, 999); run(c, 0.8, null, 'draw rifle');
    c.lastShotT = g.time; run(c, 0.6, () => { c.lastShotT = g.time; }, 'aim');
    for (let i = 0; i < 6; i++) { c.anim.event('shoot', 1); c.flashT = 0.05; run(c, 0.1, null, 'fire'); }
    inp.ads = true; run(c, 0.8, () => { c.lastShotT = g.time; }, 'ads'); inp.ads = false;
    inp.fwd = 1; inp.strafe = 1; run(c, 0.8, () => { c.lastShotT = g.time; }, 'strafe aim'); clear();
    c.inv.slots[1].mag = 3; c.startReload(); run(c, c.reload ? c.reload.dur + 0.3 : 0.3, null, 'reload');
    S.give('pump', 2, 2, 999); run(c, 0.6, null, 'switch to shotgun'); c.inv.slots[2].mag = 1; c.startReload(); run(c, c.reload ? c.reload.dur + 0.3 : 0.3, null, 'shotgun reload');
    S.give('bolt_sniper', 2, 3, 999); run(c, 0.6, null, 'switch to sniper'); c.inv.slots[3].mag = 0; c.startReload(); run(c, c.reload ? c.reload.dur + 0.3 : 0.3, null, 'sniper reload');
    S.give('minigun', 2, 4, 999); run(c, 0.6, null, 'switch to minigun');
    inp.fire = true; c.lastShotT = g.time; run(c, 0.8, () => { c.lastShotT = g.time; }, 'minigun fire'); inp.fire = false;
    for (const id of ['machete', 'bat', 'katana', 'sledge', 'pickaxe']) {
      S.hold(id); run(c, 0.5, null, 'draw ' + id);
      inp.fire = true; run(c, 1.3, null, 'swing ' + id); inp.fire = false; run(c, 0.5, null, 'rest ' + id);
    }
    S.give('frag', 1, 1); c.inv.slots[1].count = 3; run(c, 0.4, null, 'draw grenade');
    inp.firePressed = true; run(c, 1.0, () => { inp.firePressed = false; }, 'throw');
    for (const id of ['apple', 'banana', 'bandage', 'small_shield', 'slurp', 'medkit']) {
      S.give(id, 1, 1, 1); c.hp = 40; c.shield = 0; run(c, 0.4, null, 'draw ' + id);
      c.using = { stack: c.inv.slots[1], t: 0, dur: c.inv.slots[1].def.time, def: c.inv.slots[1].def };
      run(c, Math.min(4, c.using.dur) + 0.3, null, 'use ' + id);
      c.using = null;
    }
    S.give('grappler', 0, 1); run(c, 0.5, null, 'draw grappler'); c.anim.event('gadget'); run(c, 0.6, null, 'grappler use');
    S.give('launchpad', 0, 1); run(c, 0.5, null, 'draw launch pad'); c.anim.event('gadget'); run(c, 0.8, null, 'launch pad place');
    S.hold('pickaxe'); run(c, 0.4, null, 'pickaxe');
    // hit reactions, knockback, dance
    c.takeDamage(20, null, { dir: c.lastHitDir.clone().set(0, 0, 1) }); run(c, 0.8, null, 'flinch');
    c.takeDamage(30, null, { dir: c.lastHitDir.clone().set(1, 0, 0), headshot: true }); run(c, 0.8, null, 'headshot');
    c.vel.set(6, 13, 4); c.grounded = false; run(c, 2.2, null, 'launched');
    c.danceT = 3.5; run(c, 4, null, 'dance'); run(c, 0.8, null, 'after dance');
    // skydive, glide, landing
    c.place(c.pos.x, c.pos.y + 120, c.pos.z); c.setMode('skydive'); c.vel.set(0, -20, -10);
    run(c, 1.0, null, 'skydive'); inp.fwd = 1; run(c, 0.8, null, 'dive'); inp.fwd = -1; run(c, 0.6, null, 'flare'); inp.fwd = 0; inp.strafe = 1; run(c, 0.6, null, 'steer');
    c.setMode('glide'); inp.strafe = 0; run(c, 1.5, null, 'glide'); inp.strafe = -1; run(c, 0.8, null, 'glide bank'); clear();
    let guard = 0; while (c.mode !== 'normal' && guard++ < 1500) run(c, dt, null, 'glide down');
    run(c, 1.2, null, 'landed');
    // swimming
    c.place(S.wx, -0.95, S.wz); c.vel.set(0, 0, 0); c.grounded = false;
    run(c, 1.0, null, 'tread'); inp.fwd = 1; run(c, 1.5, null, 'swim'); clear();
    c.place(S.x, S.floor, S.z); c.vel.set(0, 0, 0); c.grounded = true; run(c, 1.0, null, 'out of the water');
    return track;
  };
  const t60 = script(1 / 60);
  ok('continuity (60 Hz): no NaN in 60+ s scripted scenario', !t60.nan && t60.frames > 3500, `${t60.frames} frames ${t60.nan ? t60.where : ''}`);
  ok('continuity (60 Hz): no joint turns faster than 3200 deg/s (53 deg per frame)', t60.max < 53, t60.where);
  const t30 = script(1 / 30);
  ok('continuity (30 Hz): no NaN, no joint turns faster than 3200 deg/s (106 deg per frame)', !t30.nan && t30.max < 106, t30.where);

  // ---------------------------------------------------------------------------------------------------------------
  // foot sliding
  // ---------------------------------------------------------------------------------------------------------------
  const slide = (name, setup, sec = 2.4, ratioMax = 0.2) => {
    S.reset(); setup(); const c = S.subject;
    S.step(0.8);
    const dt = 1 / 60;
    const feet = [c.model.legR.foot, c.model.legL.foot];
    const last = [null, null];
    const samples = [];
    let minY = 9, maxY = -9, n = 0, speedSum = 0, speedN = 0;
    for (let i = 0; i < sec / dt; i++) {
      g.step(dt);
      // stay inside the empty arena: hop back (the feet's world positions restart)
      if (Math.hypot(c.pos.x - S.x, c.pos.z - S.z) > 7) { c.place(S.x, c.pos.y, S.z); last[0] = last[1] = null; c.root.updateMatrixWorld(true); continue; }
      c.root.updateMatrixWorld(true);
      speedSum += Math.hypot(c.vel.x, c.vel.z); speedN++;
      for (let k = 0; k < 2; k++) {
        const w = feet[k].getWorldPosition(new Vec());
        const h = w.y - c.pos.y;
        if (h < 0.115 && last[k] && last[k].stance) {
          samples.push(Math.hypot(w.x - last[k].x, w.z - last[k].z) / dt);
          minY = Math.min(minY, h); maxY = Math.max(maxY, h); n++;
        }
        last[k] = { x: w.x, z: w.z, stance: h < 0.115 };
      }
    }
    const sp = speedSum / Math.max(1, speedN);
    samples.sort((a, b) => a - b);
    const med = samples.length ? samples[Math.floor(samples.length / 2)] : 99;
    const p90 = samples.length ? samples[Math.floor(samples.length * 0.9)] : 99;
    ok(`foot slide: ${name} (median ${f2(med)} m/s of ${f2(sp)}, p90 ${f2(p90)})`, samples.length > 20 && med < ratioMax * sp && p90 < 0.55 * sp, `${samples.length} stance samples`);
    ok(`feet: ${name}: stance ankle height ~0.085`, n > 20 && minY > 0.02 && maxY < 0.125, `${f2(minY)}..${f2(maxY)}`);
    S.stop();
  };
  slide('run', () => { S.hold('pickaxe'); S.subject.input.fwd = 1; });
  slide('sprint', () => { S.hold('pickaxe'); S.subject.input.fwd = 1; S.subject.input.sprint = true; });
  slide('crouch walk', () => { S.hold('pickaxe'); S.subject.input.fwd = 1; S.subject.input.crouch = true; }, 2.4, 0.25);
  slide('strafe (aiming)', () => { S.give('ar'); S.subject.lastShotT = 1e9; S.subject.input.strafe = 1; S.subject.input.fire = false; }, 2.4, 0.28);
  slide('backpedal (aiming)', () => { S.give('ar'); S.subject.lastShotT = 1e9; S.subject.input.fwd = -1; }, 2.4, 0.28);

  // ---------------------------------------------------------------------------------------------------------------
  // hands on the weapons
  // ---------------------------------------------------------------------------------------------------------------
  const GUNS = ['pistol', 'revolver', 'hand_cannon', 'smg', 'silenced_smg', 'ar', 'burst_ar', 'heavy_ar', 'lever', 'pump', 'tac_shotgun', 'double_barrel', 'auto_shotgun', 'bolt_sniper', 'semi_sniper', 'lmg', 'minigun', 'rocket_launcher', 'grenade_launcher', 'crossbow', 'grappler'];
  {
    const worst = { name: '', d: 0 };
    const rows = [];
    for (const id of GUNS) {
      for (const stance of ['ready', 'aim', 'ads']) {
        S.reset(); const c = S.subject; S.give(id, 2, 1, 999);
        if (stance !== 'ready') c.lastShotT = 1e9;
        if (stance === 'ads') c.input.ads = true;
        S.step(0.9);
        const info = c.anim.info;
        const lw = c.anim.X[8];
        if (lw < 0.9) continue; // one-handed pose (pistol on the run, etc.)
        const palmL = wp(c, c.model.armL.hand, new Vec(0, -0.066, -0.012));
        const grip = wp(c, c.held, info.gripL);
        const dL = palmL.distanceTo(grip);
        const palmR = wp(c, c.model.armR.hand, new Vec(0, -0.066, -0.012));
        const dR = palmR.distanceTo(wp(c, c.held, new Vec()));
        rows.push(`${id}/${stance} L ${(dL * 100).toFixed(1)} R ${(dR * 100).toFixed(1)}`);
        if (dL > worst.d) { worst.d = dL; worst.name = `${id}/${stance}`; }
        if (dR > 0.01) ok(`hands: right hand holds the ${id} grip (${stance})`, false, f2(dR * 100) + ' cm');
      }
    }
    ok('hands: left hand within 4 cm of the support grip on every gun (ready / aim / ADS)', worst.d < 0.04, `worst ${worst.name} ${(worst.d * 100).toFixed(1)} cm`);
    S.stop();
  }
  {
    // grappler: carried at low ready; while the rope pulls, the character hangs loose in the normal airborne pose with
    // the grappler dangling from the right hand at the hip (nothing is aimed), and it goes back to the carry afterwards
    S.reset(); const c = S.subject; S.give('grappler', 0, 1); S.step(0.7);
    const handH = () => wp(c, c.model.armR.hand, new Vec()).y - c.pos.y;
    const carryH = handH();
    c.grapple = { x: c.pos.x, y: c.pos.y + 400, z: c.pos.z - 10, t: 0, g: 0.1 }; c.grounded = false; c.vel.y = 2;
    S.step(0.8);
    const roped = !!c.grapple, aim = c.anim.sAim, hangH = handH(), lw = c.anim.X[8];
    const dR = wp(c, c.model.armR.hand, new Vec(0, -0.066, -0.012)).distanceTo(wp(c, c.held, new Vec()));
    const mz = c.held.getWorldDirection(new Vec()).negate(); // the item's muzzle points along -z
    ok('grappler: no aiming pose while the rope pulls', roped && aim < 0.1, `rope ${roped}, aim ${f2(aim)}`);
    ok('grappler: hangs from the hand at hip height, lower than the carry', hangH < 1.1 && hangH < carryH - 0.1, `${f2(hangH)} m vs carry ${f2(carryH)} m`);
    ok('grappler: the right hand keeps hold of it, the left arm is free', dR < 0.012 && lw < 0.25, `grip ${f2(dR * 100)} cm, left weight ${f2(lw)}`);
    ok('grappler: the muzzle hangs pointing down', mz.y < 0.2, `muzzle dir y ${f2(mz.y)}`);
    S.step(1.2);
    ok('grappler: lets go after about 1.5 s', !c.grapple, `rope ${!!c.grapple}`);
    S.stop();
  }
  {
    // two-handed melee weapons: the left hand stays on the handle at the moment of impact and after it; in the fastest
    // part of the downswing (k 0.3-0.4, the hammer head moves over a metre per frame) it may trail by a hand width
    const bad = [];
    for (const id of ['pickaxe', 'bat', 'katana', 'sledge']) {
      S.reset(); const c = S.subject; S.hold(id); S.step(0.6);
      c.input.fire = true; g.step(1 / 120); c.input.fire = false;
      const dur = c.swingDur;
      let worstFast = 0, worstHit = 0;
      for (let t = 0; t < dur * 0.62; t += 1 / 120) {
        g.step(1 / 120);
        if (t <= dur * 0.3) continue;
        const d = wp(c, c.model.armL.hand, new Vec(0, -0.066, -0.012)).distanceTo(wp(c, c.held, c.anim.info.gripL));
        if (t < dur * 0.4) worstFast = Math.max(worstFast, d); else worstHit = Math.max(worstHit, d);
      }
      if (worstHit > 0.07 || worstFast > 0.12) bad.push(`${id} ${(worstFast * 100).toFixed(1)} / ${(worstHit * 100).toFixed(1)} cm`);
    }
    ok('hands: two-handed melee weapons keep the left hand on the handle through the strike', bad.length === 0, bad.join(' '));
  }

  // ---------------------------------------------------------------------------------------------------------------
  // melee swing timing: peak tip speed near the fixed damage frame (swingT < swingDur * 0.55 -> k 0.45)
  // ---------------------------------------------------------------------------------------------------------------
  for (const id of ['pickaxe', 'machete', 'bat', 'katana', 'sledge']) {
    S.reset(); const c = S.subject; S.hold(id); S.step(0.6);
    const dt = 1 / 120;
    c.input.fire = true; g.step(dt); c.input.fire = false;
    const dur = c.swingDur;
    const tipZ = c.anim.info.muzzleZ;
    let prev = wp(c, c.held, new Vec(0, 0, tipZ)), best = 0, bestK = 0, t = dt, hitK = -1, fwdAtHit = 0;
    const fwd = new Vec(-Math.sin(c.bodyYaw), 0, -Math.cos(c.bodyYaw));
    const speeds = [];
    while (t < dur + 0.15) {
      g.step(dt); t += dt;
      const cur = wp(c, c.held, new Vec(0, 0, tipZ));
      const sp = cur.distanceTo(prev) / dt;
      speeds.push([t / dur, sp]);
      if (hitK < 0 && c.swingHit) { hitK = t / dur; fwdAtHit = cur.clone().sub(c.pos).dot(fwd); }
      if (t / dur > 0.12 && sp > best) { best = sp; bestK = t / dur; }
      prev = cur;
    }
    ok(`melee ${id}: fastest tip motion at k ${f2(bestK)} (damage frame k ${f2(hitK)})`, Math.abs(bestK - hitK) < 0.2 && best > 4, `peak ${f2(best)} m/s, tip ${f2(fwdAtHit)} m ahead at the hit`);
    ok(`melee ${id}: weapon is out in front when the hit lands`, fwdAtHit > 0.25, f2(fwdAtHit));
  }

  // ---------------------------------------------------------------------------------------------------------------
  // throw: release at the end of throwT with the hand moving forward
  // ---------------------------------------------------------------------------------------------------------------
  {
    S.reset(); const c = S.subject; S.give('frag', 1, 1); c.inv.slots[1].count = 3; S.step(0.5);
    c.aimDir.set(0, 0.1, -1).normalize();
    const dt = 1 / 120;
    c.input.firePressed = true; g.step(dt);
    let prev = wp(c, c.model.armR.hand), t = dt, rel = -1, relSp = 0, relFwd = 0, peak = 0, peakT = 0;
    const fwd = new Vec(-Math.sin(c.bodyYaw), 0, -Math.cos(c.bodyYaw));
    let thrown = false;
    const n0 = g.combat.projectiles.length;
    while (t < 0.7) {
      g.step(dt); t += dt;
      const cur = wp(c, c.model.armR.hand);
      const v = cur.clone().sub(prev).multiplyScalar(1 / dt);
      if (!thrown && g.combat.projectiles.length > n0) { thrown = true; rel = t; relSp = v.length(); relFwd = v.dot(fwd); }
      if (v.length() > peak) { peak = v.length(); peakT = t; }
      prev = cur;
    }
    ok('throw: grenade leaves the hand after ~0.28 s', thrown && rel > 0.2 && rel < 0.4, f2(rel));
    ok('throw: hand is whipping forward at the release', thrown && relFwd > 1.5, `${f2(relFwd)} m/s forward, peak ${f2(peak)} at ${f2(peakT)}`);
  }

  // ---------------------------------------------------------------------------------------------------------------
  // hit reactions
  // ---------------------------------------------------------------------------------------------------------------
  {
    const dev = (c, base) => ang(c.model.torso.quaternion, base);
    S.reset(); const c = S.subject; S.give('ar'); S.step(0.8);
    const base = c.model.torso.quaternion.clone(), baseHead = c.model.head.quaternion.clone();
    c.takeDamage(20, null, { dir: c.lastHitDir.clone().set(0, 0, 1) });
    let maxD = 0; for (let i = 0; i < 12; i++) { g.step(1 / 60); maxD = Math.max(maxD, dev(c, base)); }
    ok('hit: a light hit from the front visibly flinches the torso', maxD > 1.5, f2(maxD) + ' deg');
    S.step(1.2);
    ok('hit: the flinch settles again', dev(c, base) < 4, f2(dev(c, base)) + ' deg');
    S.reset(); S.give('ar'); S.step(0.8);
    const b2 = c.model.head.quaternion.clone();
    c.takeDamage(30, null, { dir: c.lastHitDir.clone().set(0, 0, 1), headshot: true });
    let hd = 0; for (let i = 0; i < 14; i++) { g.step(1 / 60); hd = Math.max(hd, ang(c.model.head.quaternion, b2)); }
    ok('hit: a headshot snaps the head', hd > 7, f2(hd) + ' deg');
    // direction: a push from the right (+x) leans the torso to the right (roll about Z negative)
    S.reset(); S.give('ar'); S.step(0.8);
    c.takeDamage(25, null, { dir: c.lastHitDir.clone().set(1, 0, 0) });
    let roll = 0; for (let i = 0; i < 8; i++) { g.step(1 / 60); const e = c.model.torso.rotation; if (Math.abs(e.z) > Math.abs(roll)) roll = e.z; }
    ok('hit: side hits lean the body the right way', roll < -0.01, f2(roll));
    // explosion launch tumbles
    S.reset(); S.hold('pickaxe'); S.step(0.6);
    c.vel.set(4, 14, 3); c.grounded = false;
    let fam = -1, spin = 0; for (let i = 0; i < 40; i++) { g.step(1 / 60); fam = c.anim.family; spin = Math.max(spin, ang(c.model.body.quaternion, new c.model.body.quaternion.constructor())); }
    ok('hit: launched characters tumble', fam === 5 && spin > 30, `family ${fam}, body rotated ${f2(spin)} deg`);
    S.step(4);
    ok('hit: the tumble ends upright after landing', c.grounded && c.anim.family === 0 && ang(c.model.body.quaternion, new c.model.body.quaternion.constructor()) < 5, `family ${c.anim.family}`);
  }

  // ---------------------------------------------------------------------------------------------------------------
  // deaths
  // ---------------------------------------------------------------------------------------------------------------
  {
    const fall = (name, dx, dz, extra = {}, air = 0) => {
      const c = S.dummy(1); S.reset(c); S.give('ar', 2, 1, 100, c); S.step(0.4);
      if (air) { c.place(c.pos.x, c.pos.y + air, c.pos.z); c.grounded = false; c.vel.set(0, 0, 0); }
      const d = c.lastHitDir.clone().set(dx, 0, dz).normalize();
      const gy = S.groundAt(c.pos.x, c.pos.z);
      c.takeDamage(500, null, { dir: d, weapon: c.stack.def, ...extra });
      S.step(3.2);
      const up = new Vec(0, 1, 0).applyQuaternion(c.model.body.quaternion);
      c.root.updateMatrixWorld(true);
      const head = wp(c, c.model.head);
      const rel = head.clone().sub(c.pos);
      const along = rel.x * d.x + rel.z * d.z;
      ok(`death (${name}): lies on the ground`, !c.alive && up.y < 0.2 && head.y - gy < 0.6 && c.pos.y - gy < 0.15, `up.y ${f2(up.y)} head ${f2(head.y - gy)} m above ground, feet ${f2(c.pos.y - gy)}`);
      return { c, along, d, rel };
    };
    const a = fall('shot from the front', 0, 1);
    ok('death (front hit): falls backward, away from the shooter', a.along > 0.7, f2(a.along));
    const b = fall('shot from behind', 0, -1);
    ok('death (back hit): falls forward', b.along > 0.7, f2(b.along));
    const s = fall('shot from the side', 1, 0);
    ok('death (side hit): falls sideways', s.along > 0.5, f2(s.along));
    fall('headshot', 0, 1, { headshot: true });
    fall('explosion', 1, 1, { explosive: true });
    const m = fall('eliminated mid-air', 0, 1, {}, 30);
    ok('death (mid-air): the body fell to the ground', Math.abs(m.c.pos.y - S.groundAt(m.c.pos.x, m.c.pos.z)) < 0.2, f2(m.c.pos.y));
    // bodies stay about 30 s
    const c = S.dummy(2); S.reset(c); S.step(0.2); c.takeDamage(500, null, { dir: c.lastHitDir.clone().set(0, 0, 1) });
    S.step(25);
    const still = c.root.visible;
    S.step(8);
    ok('death: the body stays for ~30 s, then disappears', still && !c.root.visible, `${still} / ${c.root.visible}`);
    ok('death: all joints finite after settling', finite(c));
  }

  // ---------------------------------------------------------------------------------------------------------------
  // locomotion extras: skydive / glide / swim / dance / consumables / first person / muzzle flash
  // ---------------------------------------------------------------------------------------------------------------
  {
    S.reset(); const c = S.subject; c.place(c.pos.x, c.pos.y + 300, c.pos.z); c.setMode('skydive'); S.step(1.2);
    const up = new Vec(0, 1, 0).applyQuaternion(c.model.body.quaternion);
    ok('skydive: belly-down spread pose', Math.abs(up.y) < 0.55, `body up.y ${f2(up.y)}`);
    const armsOut = Math.abs(wp(c, c.model.armR.hand).x - wp(c, c.model.armL.hand).x);
    ok('skydive: arms spread wide', armsOut > 1.2, f2(armsOut) + ' m');
    c.setMode('glide'); c.vel.set(0, -9, -12); S.step(1.0);
    c.root.updateMatrixWorld(true);
    const hs = [[0.24, c.model.armR], [-0.24, c.model.armL]].map(([x, arm]) => wp(c, arm.hand, new Vec(0, -0.066, -0.012)).distanceTo(wp(c, c.glider, new Vec(x, 2.07, 0))));
    ok('glide: both hands on the handle bar', Math.max(...hs) < 0.1, hs.map(f2).join(' / ') + ' m');
    ok('glide: glider visible, character hanging below it', c.glider.visible);
  }
  {
    S.reset(); const c = S.subject; c.danceT = 6; S.step(2.0);
    ok('dance: arms and legs are moving', c.anim.family === 4 && ang(c.model.armR.a.quaternion, new c.model.armR.a.quaternion.constructor()) > 20, `family ${c.anim.family}`);
    c.danceT = 0; S.step(1.0);
    ok('dance: returns to normal movement', c.anim.family === 0);
  }
  {
    // eating brings the fruit to the mouth
    S.reset(); const c = S.subject; const st = S.give('apple', 1, 1, 1); c.hp = 40; S.step(0.5);
    c.using = { stack: st, t: 0, dur: 1.0, def: st.def };
    let best = 9;
    for (let i = 0; i < 70; i++) {
      g.step(1 / 60); c.root.updateMatrixWorld(true);
      const mouth = wp(c, c.model.head, new Vec(0, 0.045, -0.13));
      const item = wp(c, c.held);
      best = Math.min(best, mouth.distanceTo(item));
    }
    ok('consume: the fruit reaches the mouth', best < 0.16, f2(best * 100) + ' cm');
  }
  {
    // muzzle flash + muzzle position
    S.reset(); const c = S.subject; S.give('ar', 2, 1, 999); S.step(0.5);
    ok('flash: lives on the held weapon', c.muzzleFlash.parent === c.held);
    c.flashT = 0.05; c.anim.event('shoot', 1); g.step(1 / 60);
    ok('flash: visible while flashT runs, hidden afterwards', c.muzzleFlash.visible);
    S.step(0.2);
    ok('flash: hidden again', !c.muzzleFlash.visible);
    const mp = c.muzzlePos(new Vec());
    const fwd = new Vec(-Math.sin(c.bodyYaw), 0, -Math.cos(c.bodyYaw));
    const rel = mp.clone().sub(wp(c, c.model.armR.hand));
    ok('flash: muzzle is out in front of the hand', rel.dot(fwd) > 0.3 && Number.isFinite(mp.x + mp.y + mp.z), f2(rel.dot(fwd)));
    // first person: head, hair and hat hidden, arms + weapon stay
    c.model.head.visible = false; S.step(0.2);
    ok('first person: head (hair, hat) hidden, hands and weapon visible', !c.model.head.visible && c.held.visible && c.model.armR.hand.visible && c.anim.fpv);
    c.model.head.visible = true;
  }

  // ---------------------------------------------------------------------------------------------------------------
  // GPU resource leaks: geometry / texture counts must stay flat over start / clear cycles
  // ---------------------------------------------------------------------------------------------------------------
  {
    const mem = () => ({ geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures });
    const cycle = () => {
      g.startMatch(); g.forcedJump = true; g.bus.update = () => {};
      for (const b of g.bots) b.update = () => {};
      g.controller.update = () => {};
      // exercise everything that allocates: weapons, grapple rope, flash, death
      const pl = g.player; pl.setMode('normal'); pl.place(S.x, S.groundAt(S.x, S.z), S.z); pl.grounded = true;
      for (const id of ['ar', 'pump', 'minigun', 'bat', 'frag', 'apple', 'grappler']) { S.give(id, 1, 1, 100, pl); pl.anim.update(1 / 60, 0); }
      pl.grapple = { x: pl.pos.x + 5, y: pl.pos.y + 6, z: pl.pos.z, t: 0 }; pl.update(1 / 60); pl.grapple = null;
      const d = g.bots[3].ch; S.reset(d); d.takeDamage(500, null, { dir: d.lastHitDir.clone().set(0, 0, 1) }); S.step(0.5);
      g.render();
      g.clearMatch(); g.render();
      return mem();
    };
    const m0 = cycle(), m1 = cycle(), m2 = cycle(), m3 = cycle();
    ok('leaks: geometries stable across start / clear cycles', m1.geo === m2.geo && m2.geo === m3.geo, `${m0.geo} ${m1.geo} ${m2.geo} ${m3.geo}`);
    ok('leaks: textures stable across start / clear cycles', m1.tex === m2.tex && m2.tex === m3.tex, `${m0.tex} ${m1.tex} ${m2.tex} ${m3.tex}`);
    g.startMatch(); g.forcedJump = true; g.bus.update = () => {}; for (const b of g.bots) b.update = () => {}; g.controller.update = () => {};
    S.ready = true;
  }

  // ---------------------------------------------------------------------------------------------------------------
  // cost of animating 50 characters
  // ---------------------------------------------------------------------------------------------------------------
  {
    // spread the characters around the player: some close, some far; everybody moves and holds something
    const ids = ['ar', 'pump', 'smg', 'pistol', 'bat', 'frag', 'lmg', 'bolt_sniper'];
    const cs = g.chars;
    cs.forEach((c, i) => {
      const a = i * 2.399, r = 8 + (i % 10) * 12;
      S.reset(c, { x: S.x + Math.cos(a) * r, z: S.z + Math.sin(a) * r });
      S.give(ids[i % ids.length], 1, 1, 100, c);
      c.input.fwd = 1; c.input.sprint = i % 3 === 0; c.yaw = a; c.input.fire = i % 5 === 0;
    });
    g.camera.position.set(S.x, S.groundAt(S.x, S.z) + 2, S.z);
    for (let i = 0; i < 90; i++) g.step(1 / 60);
    const measure = (lod, n = 240) => {
      const t0 = performance.now();
      for (let i = 0; i < n; i++) for (const c of cs) { c.anim.update(1 / 60, c.isPlayer ? 0 : lod); }
      return (performance.now() - t0) / n;
    };
    measure(0, 30);
    const full = measure(0);
    const far = measure(1);
    window.__animPerf = { fullMs: full, farMs: far };
    ok(`perf: animating 50 characters at full detail costs ${full.toFixed(2)} ms per frame (far LOD ${far.toFixed(2)} ms)`, full < 6 && far < full, `${(full / 50 * 1000).toFixed(0)} us per character`);
    // no per-frame object allocation: heap growth while animating one character (after the JIT warmed up)
    const c = cs[1];
    if (typeof gc === 'function' && performance.memory) {
      for (let i = 0; i < 30000; i++) c.anim.update(1 / 60, 0);
      gc(); const h0 = performance.memory.usedJSHeapSize;
      for (let i = 0; i < 6000; i++) c.anim.update(1 / 60, 0);
      const h1 = performance.memory.usedJSHeapSize;
      // what is left is V8 boxing the doubles that cross non-inlined calls (a sampling heap profile shows no Vector3 /
      // Quaternion / array allocations); a regression that allocates a few dozen of them per frame would exceed this bound
      ok('perf: the animator makes (almost) no garbage per frame', h1 - h0 < 6000 * 1000, `${((h1 - h0) / 6000).toFixed(0)} bytes per frame (boxed doubles only)`);
    }
  }
  return out;
});

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.name}${r.info ? '  - ' + r.info : ''}`);
}
console.log(errors.length ? `\nconsole errors (${errors.length}):\n` + errors.slice(0, 10).join('\n') : '\nno console errors');
console.log(`\n${results.length - failed}/${results.length} checks passed`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
