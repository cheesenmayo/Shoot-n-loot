// Headless integration test: node tools/smoke-test.mjs   (needs playwright, e.g. NODE_PATH=$(npm root -g))
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = join(fileURLToPath(import.meta.url), '..', '..');

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message + '\n' + (e.stack || '').split('\n').slice(0, 5).join('\n')));
await page.goto(`file://${root}/index.html?manual`);
await page.waitForFunction('window.__ready === true', null, { timeout: 240000 });

const results = await page.evaluate(async () => {
  const g = window.__game, { makeStack } = window.__items;
  const out = [];
  const ok = (name, cond, info = '') => out.push({ name, pass: !!cond, info: String(info) });
  const step = (s) => window.__step(s);
  const idle = () => { for (const b of g.bots) b.update = () => {}; };

  g.startMatch();
  idle();
  g.controller.update = () => {}; // tests drive the player's input directly
  const exLog = []; const _ex = g.combat.explode.bind(g.combat); g.combat.explode = (pos, pr) => { exLog.push(`${pr.def.id}@${pos.x.toFixed(1)},${pos.y.toFixed(1)},${pos.z.toFixed(1)}`); _ex(pos, pr); };
  const p = g.player;
  const plaza = g.world.pois[0];
  const toGround = (x, z, y = null) => {
    const gy = y ?? g.world.collision.groundAt(x, z, 999, 0.6);
    p.place(x, gy, z); p.vel.set(0, 0, 0); p.setMode('normal'); p.grounded = true; p.hp = 100; p.shield = 0; p.alive = true;
    p.input.fwd = p.input.strafe = 0;
  };
  const dummy = (x, z, hp = 100) => {
    const b = g.bots[0].ch; b.alive = true; b.setMode('normal'); const gy = g.world.collision.groundAt(x, z, 999, 0.6);
    b.place(x, gy, z); b.vel.set(0, 0, 0); b.grounded = true; b.hp = hp; b.shield = 0; return b;
  };
  const give = (id, rarity = 2, slot = 1, ammo = 200) => {
    p.inv.slots[slot] = makeStack(id, rarity);
    const d = p.inv.slots[slot].def;
    if (d.ammo) p.inv.ammo[d.ammo] = Math.min(ammo, 999);
    p.inv.sel = 0; p.equip(slot); p.equipT = 0; p.refreshHeld(); p.bloom = 0; p.fireCd = 0;
    return p.inv.slots[slot];
  };
  const aimAt = (t, yOff = 1.2) => {
    p.eyePos(p.aimOrigin);
    p.aimDir.set(t.pos.x - p.aimOrigin.x, t.pos.y + yOff - p.aimOrigin.y, t.pos.z - p.aimOrigin.z).normalize();
  };

  // ---- world ----
  ok('world: 8 POIs', g.world.pois.length === 8, g.world.pois.map((x) => x.name).join(', '));
  ok('world: chests & loot', g.loot.chests.length > 120 && g.loot.drops.length > 400, `${g.loot.chests.length} chests, ${g.loot.drops.length} drops`);
  ok('world: buildings indexed', g.world.buildings.length > 40, g.world.buildings.length);
  ok('match: 50 players', g.chars.length === 50 && g.aliveCount === 50);

  // ---- movement on flat ground ----
  toGround(plaza.x + 30, plaza.z + 20);
  const y0 = p.pos.y;
  step(1);
  ok('physics: stays grounded', p.grounded && Math.abs(p.pos.y - y0) < 0.05, p.pos.y - y0);
  p.input.jumpPressed = true; let apex = 0;
  for (let i = 0; i < 40; i++) { step(1 / 30); apex = Math.max(apex, p.pos.y - y0); }
  ok('physics: jump apex ~1.5m', apex > 1.2 && apex < 1.9, apex.toFixed(2));
  p.input.fwd = 1; p.input.sprint = true; step(1);
  const sp = Math.hypot(p.vel.x, p.vel.z);
  ok('physics: sprint speed', sp > 8 && sp < 10, sp.toFixed(2));
  p.input.fwd = 0; p.input.sprint = false;

  // ---- Jumpple ----
  toGround(plaza.x + 30, plaza.z + 20);
  p.buffs.speedT = p.buffs.jumpT = 30; p.buffs.speed = 1.38; p.buffs.jump = 1.6;
  const yj = p.pos.y; let apex2 = 0; p.input.jumpPressed = true;
  for (let i = 0; i < 60; i++) { step(1 / 30); apex2 = Math.max(apex2, p.pos.y - yj); }
  ok('jumpple: jumps higher', apex2 > apex * 1.8, `${apex2.toFixed(2)} vs ${apex.toFixed(2)}`);
  p.buffs.speedT = p.buffs.jumpT = 0;

  // ---- fall damage & Floorange ----
  toGround(plaza.x + 30, plaza.z + 20);
  p.pos.y += 25; p.grounded = false; p.vel.set(0, 0, 0); step(3);
  ok('fall damage exists', p.hp < 80 && p.grounded, `hp ${Math.round(p.hp)}`);
  toGround(plaza.x + 30, plaza.z + 20);
  give('floorange', 0, 2);
  p.equip(2); p.equipT = 0;
  p.input.firePressed = true; step(0.1);
  ok('floorange: refuses on the ground', p.using === null && p.stack.count === 1, p.using);
  p.pos.y += 25; p.grounded = false; p.vel.set(0, 0, 0);
  p.input.firePressed = true; step(0.1);
  ok('floorange: eating starts mid-air', p.using !== null);
  step(0.8);
  ok('floorange: lands w/o damage', p.grounded && p.hp >= 99.9 && p.inv.slots[2] === null, `hp ${p.hp}, y ${(p.pos.y - y0).toFixed(1)}`);
  p.hp = 85; p.pos.y += 20; p.grounded = false; p.vel.set(0, 0, 0);
  give('floorange', 0, 2); p.equip(2); p.equipT = 0; p.input.firePressed = true; step(1.2);
  ok('floorange: heals 10', p.hp >= 94.9 && p.hp <= 95.1 && p.grounded, `hp ${p.hp}`);

  // ---- healing items ----
  toGround(plaza.x + 30, plaza.z + 20);
  p.hp = 40; give('bandage', 0, 3); p.equip(3); p.equipT = 0; p.input.firePressed = true; step(5);
  ok('bandage: +15 hp', Math.abs(p.hp - 55) < 0.5, p.hp);
  p.hp = 60; give('medkit', 1, 3); p.equip(3); p.equipT = 0; p.input.firePressed = true; step(9);
  ok('medkit: full hp', p.hp === 100, p.hp);
  p.shield = 0; give('big_shield', 1, 3); p.equip(3); p.equipT = 0; p.input.firePressed = true; step(6);
  ok('shield potion: +50 shield', p.shield === 50, p.shield);
  p.shield = 60; give('small_shield', 0, 3); p.equip(3); p.equipT = 0; p.input.firePressed = true; step(0.2);
  ok('mini shield: refuses above 50', p.using === null, p.shield);

  // ---- every consumable ----
  const useItem = (id, secs, hp = 100, sh = 0) => { toGround(plaza.x + 30, plaza.z + 20); p.hp = hp; p.shield = sh; give(id, 1, 3); p.equip(3); p.equipT = 0; p.input.firePressed = true; step(secs); };
  useItem('apple', 1.5, 50); ok('apple +5 hp', Math.abs(p.hp - 55) < 0.5, p.hp);
  useItem('banana', 1.5, 50); ok('banana +5 hp', Math.abs(p.hp - 55) < 0.5, p.hp);
  useItem('mushroom', 1.5); ok('shield mushroom +5 shield', p.shield === 5, p.shield);
  useItem('chug_jug', 13, 30); ok('chug jug restores hp+shield', p.hp === 100 && p.shield === 100, `${p.hp}/${p.shield}`);
  useItem('slurp', 2, 60); const h1 = p.hp; step(8); ok('slurp juice heals over time', p.hp > h1 + 5 && p.shield > 3, `${h1}->${p.hp.toFixed(0)} sh ${p.shield.toFixed(0)}`);
  step(10);
  p.buffs.speedT = 0; useItem('jumpple', 1.5); ok('jumpple grants speed+jump buff', p.buffs.speedT > 20 && p.buffs.jumpT > 20, p.buffs.speedT.toFixed(1));
  p.buffs.speedT = p.buffs.jumpT = 0;

  // ---- Runana: 5 s sprint boost + 15 shield (no health), usable at full health / shield ----
  const sprintSpeed = () => { p.input.fwd = 1; p.input.sprint = true; step(1.2); const s = Math.hypot(p.vel.x, p.vel.z); p.input.fwd = 0; p.input.sprint = false; step(0.5); return s; };
  toGround(plaza.x + 30, plaza.z + 20); const baseSpeed = sprintSpeed();
  useItem('runana', 1.5, 80, 20);
  ok('runana: +15 shield, no health', Math.abs(p.shield - 35) < 0.5 && p.hp === 80, `${p.hp}/${p.shield}`);
  ok('runana: boost lasts ~5 s', p.buffs.runT > 3 && p.buffs.runT <= 5, p.buffs.runT.toFixed(2));
  p.input.fwd = 1; p.input.sprint = true; step(1.0); const boosted = Math.hypot(p.vel.x, p.vel.z); p.input.fwd = 0; p.input.sprint = false;
  ok('runana: noticeably faster', boosted > baseSpeed * 1.4, `${boosted.toFixed(2)} vs ${baseSpeed.toFixed(2)}`);
  p.buffs.runT = 4.8; p.inv.slots[3] = makeStack('runana', 0, 2); p.equip(3); p.equipT = 0; p.input.firePressed = true; step(0.3);
  ok('runana: refused while the boost is fresh', p.using === null && p.inv.slots[3].count === 2, p.using);
  step(6);
  ok('runana: boost expires', p.buffs.runT === 0, p.buffs.runT);
  useItem('runana', 1.5, 100, 95);
  ok('runana: shield capped at 100, still usable at full hp', p.shield === 100 && p.buffs.runT > 0, `${p.hp}/${p.shield}`);
  p.buffs.runT = 0;

  // boogie bomb makes the target dance
  toGround(plaza.x - 20, plaza.z + 36);
  const dd = dummy(plaza.x - 20 + 8, plaza.z + 36, 1000);
  give('boogie', 1, 1); p.inv.slots[1].count = 2; p.yaw = -Math.PI / 2; aimAt(dd, 0.3);
  p.input.firePressed = true; step(0.4); p.input.firePressed = false; step(2.5);
  ok('boogie bomb forces a dance', dd.danceT > 0, dd.danceT.toFixed(1));

  // ---- chests & pickups ----
  const chest = g.loot.chests.find((c) => !c.elevated && Math.hypot(c.x - plaza.x, c.z - plaza.z) < 60);
  toGround(chest.x + 1.2, chest.z);
  const before = g.loot.drops.length;
  let t = 0; while (!chest.opened && t < 3) { g.loot.work(chest, p, 0.1); t += 0.1; }
  step(1.5);
  ok('chest: opens in ~1s and spills loot', chest.opened && g.loot.drops.length >= before + 3, `${g.loot.drops.length - before} items, ${t.toFixed(1)}s`);
  const near = g.loot.nearbyDrops(chest.x, chest.z, 5, []);
  let took = 0; for (const d of near) { if (g.loot.take(p, d)) took++; }
  ok('pickup: items taken', took >= 2, `${took}/${near.length} taken`);
  ok('pickup: inventory has items', p.inv.slots.filter(Boolean).length >= 2);

  // ---- weapons ----
  const weapons = [
    ['pistol', 20], ['smg', 15], ['ar', 25], ['burst_ar', 25], ['lever', 30], ['pump', 7], ['tac_shotgun', 7], ['double_barrel', 6],
    ['bolt_sniper', 80], ['semi_sniper', 60], ['lmg', 20], ['minigun', 15], ['revolver', 20], ['hand_cannon', 20], ['silenced_smg', 15], ['heavy_ar', 25], ['auto_shotgun', 7],
  ];
  for (const [id, dist] of weapons) {
    toGround(plaza.x - 20, plaza.z + 36);
    const d = dummy(plaza.x - 20 + dist, plaza.z + 36, 1000);
    const st = give(id, 1);
    p.yaw = -Math.PI / 2; g.controller.yaw = p.yaw;
    p.bodyYaw = p.yaw;
    p.input.fire = true; p.input.firePressed = true;
    let n = 0; for (let i = 0; i < 60; i++) { aimAt(d); p.input.firePressed = i % 5 === 0; step(1 / 30); n++; }
    p.input.fire = false;
    const dmg = 1000 - d.hp;
    ok(`weapon ${id} deals damage @${dist}m`, dmg > 10, `${dmg.toFixed(0)} dmg, mag ${st.mag}/${st.def.mag}, cd ${p.fireCd.toFixed(2)}, reload ${!!p.reload}`);
    d.hp = 1000;
  }
  // explosives
  for (const [id, dist] of [['rocket_launcher', 30], ['grenade_launcher', 20]]) {
    toGround(plaza.x - 20, plaza.z + 36);
    const d = dummy(plaza.x - 20 + dist, plaza.z + 36, 1000);
    give(id, 1);
    p.fireCd = 0; p.reload = null; p.burstLeft = 0; p.input.fire = true; p.input.firePressed = true; aimAt(d, 0.3); step(1 / 30);
    p.input.fire = false; p.input.firePressed = false;
    step(3);
    ok(`weapon ${id} explodes on target`, 1000 - d.hp > 20, `${(1000 - d.hp).toFixed(0)} dmg, mag ${p.stack.mag}, held ${p.stack.def.id}`);
  }
  // throwables
  for (const id of ['frag', 'dynamite']) {
    toGround(plaza.x - 20, plaza.z + 36);
    const d = dummy(plaza.x - 20 + 9, plaza.z + 36, 1000);
    give(id, 0, 1); p.inv.slots[1].count = 3;
    p.yaw = -Math.PI / 2; aimAt(d, 0.3); p.aimDir.y += 0.08; p.aimDir.normalize();
    p.input.firePressed = true; step(0.5); p.input.firePressed = false;
    step(4.5);
    ok(`throwable ${id} damages`, 1000 - d.hp > 20, `${(1000 - d.hp).toFixed(0)} dmg, dummy ${d.pos.x.toFixed(1)}, player ${p.pos.x.toFixed(1)}, ex ${exLog.slice(-2).join(' ')}, cnt ${p.inv.slots[1].count}`);
  }
  // melee
  for (const id of ['pickaxe', 'machete', 'bat', 'katana', 'sledge']) {
    toGround(plaza.x - 20, plaza.z + 36);
    const d = dummy(plaza.x - 20 + 1.9, plaza.z + 36, 1000);
    if (id !== 'pickaxe') give(id, 1); else { p.inv.sel = 0; p.refreshHeld(); }
    p.yaw = -Math.PI / 2; g.controller.yaw = p.yaw;
    p.input.fire = true; step(2); p.input.fire = false;
    ok(`melee ${id} hits`, 1000 - d.hp > 15, `${(1000 - d.hp).toFixed(0)} dmg`);
  }

  // ---- gadgets ----
  toGround(plaza.x + 60, plaza.z + 60);
  give('impulse', 0, 1); p.inv.slots[1].count = 2;
  p.aimDir.set(0, -1, 0); p.aimOrigin.copy(p.pos).setY(p.pos.y + 1.6);
  p.input.firePressed = true; step(0.35); p.input.firePressed = false;
  let maxVy = 0; for (let i = 0; i < 75; i++) { step(1 / 30); maxVy = Math.max(maxVy, p.vel.y); }
  ok('impulse grenade launches the thrower', maxVy > 8, `vy ${maxVy.toFixed(1)}, ex ${exLog.slice(-1)}, projectiles ${g.combat.projectiles.length}, cnt ${p.inv.slots[1] && p.inv.slots[1].count}, sel ${p.inv.sel}, throwT ${p.throwT}`);

  toGround(plaza.x + 16, plaza.z);
  give('grappler', 0, 2);
  const start = p.pos.clone();
  p.eyePos(p.aimOrigin);
  p.aimDir.set(plaza.x + 3 - p.aimOrigin.x, plaza.y + 9 - p.aimOrigin.y, plaza.z - p.aimOrigin.z).normalize();
  p.input.firePressed = true; step(0.05);
  const hooked = !!p.grapple;
  let maxH = 0; for (let i = 0; i < 60; i++) { step(1 / 30); maxH = Math.max(maxH, p.pos.y - start.y); }
  ok('grappler: hooks and pulls', hooked && maxH > 3, `hooked ${hooked}, rose ${maxH.toFixed(1)}m`);

  const pad = g.world.jumpPads[0];
  toGround(pad.x, pad.z, pad.y);
  step(0.1);
  let padApex = 0; for (let i = 0; i < 60; i++) { step(1 / 30); padApex = Math.max(padApex, p.pos.y - pad.y); }
  ok('jump pad launches', padApex > 6, `apex ${padApex.toFixed(1)}m`);
  step(3);
  ok('jump pad: no fall damage', p.hp > 95, p.hp);

  give('launchpad', 0, 2);
  toGround(plaza.x + 90, plaza.z + 90);
  p.input.firePressed = true; step(0.1); p.input.firePressed = false;
  ok('launch pad placeable', g.dynPads.length === 1, g.dynPads.length);

  // ---- storm ----
  toGround(plaza.x + 10, plaza.z + 10);
  g.storm.r = 5; g.storm.cx = plaza.x + 500; g.storm.cz = plaza.z + 500; g.storm.state = 'hold'; g.storm.t = 999;
  const hp0 = p.hp; step(5);
  ok('storm damages players outside', p.hp < hp0 - 3, `${hp0 - p.hp} dmg in 5s`);
  g.storm.r = 1500; g.storm.cx = g.storm.cz = 0;

  // ---- skydive / glide ----
  p.hp = 100; p.place(plaza.x, plaza.y + 300, plaza.z); p.vel.set(0, -10, 0); p.setMode('skydive'); p.input.fwd = 1;
  let glided = false, tt = 0; while (p.mode !== 'normal' && tt < 60) { step(0.1); tt += 0.1; if (p.mode === 'glide') glided = true; }
  ok('skydive -> glide -> landing w/o damage', glided && p.mode === 'normal' && p.hp === 100, `t=${tt.toFixed(1)}s hp ${p.hp}`);
  p.input.fwd = 0;

  // ---- navigation through a multi-storey building ----
  const sal = g.world.buildings.find((b) => b.id === 'saloon');
  const bot = g.bots[1];
  delete bot.update; // restore AI prototype method
  const b = bot.ch; b.alive = true; b.setMode('normal');
  const door = sal.doors[0];
  b.place(door.outX, g.world.collision.groundAt(door.outX, door.outZ, sal.y0 + 0.2, 0.6), door.outZ); b.grounded = true;
  const topChest = g.loot.chests.find((c) => !c.opened && c.x > sal.minX && c.x < sal.maxX && c.z > sal.minZ && c.z < sal.maxZ && c.y > sal.y0 + 2);
  if (topChest) {
    bot.lootTarget = { kind: 'chest', c: topChest }; bot.setGoalForLoot(bot.lootTarget); bot.state = 'loot';
    let reached = false; for (let i = 0; i < 400 && !topChest.opened; i++) { step(0.1); }
    ok('bot climbs stairs & opens upstairs chest', topChest.opened, `bot y ${b.pos.y.toFixed(1)} (floor ${sal.y0.toFixed(1)})`);
  } else ok('saloon has an upstairs chest', false, 'none found');

  return out;
});

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? '  ok ' : 'FAIL '} ${r.name}${r.info ? '  — ' + r.info : ''}`);
}
console.log(errors.length ? `\nconsole errors (${errors.length}):\n` + errors.slice(0, 10).join('\n') : '\nno console errors');
console.log(`\n${results.length - failed}/${results.length} checks passed`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
