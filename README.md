# Shoot 'n' Loot

A Fortnite‑inspired 3D battle royale that runs entirely in your browser. Drop from the battle bus
onto a ~2 km island, loot chests and the ground, and outlast **49 bots** while the storm closes in.
Everything (terrain, buildings, characters, weapons, sounds) is generated procedurally. There are no asset files.

## Play

The compiled game is committed, so you can simply **open `index.html`** in a modern desktop browser
(Chrome / Edge / Firefox, WebGL2 required). Or run it from a local server:

```bash
npm install
npm start          # builds and serves on http://localhost:8080
```

Click **PLAY**, then click inside the game to capture the mouse (Esc releases it and pauses).
If your browser refuses pointer lock, move the mouse to look, or use the arrow keys.
Click **SANDBOX** instead for a practice range with every item and spawnable enemies (see [Sandbox](#sandbox)).

### On a phone or tablet

Touch controls switch on automatically (or force them under *Touch controls* in the settings). Play in **landscape**;
the game asks you to rotate and pauses while you hold the device upright. Phones start on **Low** graphics.

| Touch | Action |
|---|---|
| left side, drag | floating joystick: move (push it all the way to sprint) |
| right side, drag | look around |
| **FIRE** (hold) | shoot / use the selected item. Drag while holding to aim |
| ◎ | aim down sights (toggle; scopes zoom in) |
| **JUMP** | jump, drop from the bus, open the glider |
| ▼ / ↻ | crouch (toggle) / reload |
| **PICK UP / OPEN** | appears next to loot and chests (hold it to open a chest) |
| hotbar | tap a slot to switch items |
| ⏸ / pin | pause menu / map |
| 🧪 (flask, Sandbox only) | open the sandbox tools |

Aim assist (on by default, optional in settings) gently pulls shots and the camera toward an enemy near the crosshair.

## Controls

| Key | Action | Key | Action |
|---|---|---|---|
| **W A S D** | move | **LMB** | fire / use selected item |
| **Shift** | sprint | **RMB** | aim down sights (scopes zoom in) |
| **Space** | jump · jump from bus · open glider | **R** | reload |
| **C** | crouch | **E** | pick up · *hold* to open a chest |
| **1–6 / wheel** | select slot | **G** | drop selected item |
| **M / Tab** | map | **X** / **V** | swap shoulder / first person |
| **Esc** | pause / settings | **← → ↑ ↓** | look (when mouse lock is unavailable) |
| **B** *(Sandbox)* | open / close the sandbox tools | **F3** | show FPS |

In the air: **W** dives, **S** slows, **A/D** steer, **Space** deploys the glider early (it opens automatically near the ground).

## Sandbox

**SANDBOX** on the title screen drops you alone on the ground at Parkour Plaza: no bus, no storm, no placement and no
Victory Royale, but the whole island is still there with its chests and ground loot. Press **B** (the flask button on a
phone, or *Sandbox tools* in the pause menu) to open the tools drawer. While it is open the simulation stands still
(the camera and HUD keep running, nothing can shoot you), so you can browse, spawn and teleport in peace; closing it
(B, ✕ or Esc) resumes play. A second Esc pauses as usual, and the pause menu says **Leave sandbox**.

* **Items**: every item in the game with a rendered thumbnail and its key stats, grouped by category. Pick a rarity
  (Common to Legendary, clamped to what each item can be) and click an item to get it: stackables fill their stack,
  weapons take the first free slot (otherwise they replace the selected one; the pickaxe is never touched), the item is
  equipped and its ammo topped up. **Max ammo**, **Clear inventory** (keeps the pickaxe) and five loadouts
  (*Assault, Sniper nest, Demolition, Parkour kit, Medic*) fill slots 1-5 with matching ammo.
* **Enemies**: spawn real bots with the normal AI. Choose a skill (*Noob / Average / Pro / Dummy*), a weapon (random loadout,
  pickaxe only or any weapon at the chosen rarity), a count (1, 3, 5, 10, 20), a placement (10 / 20 / 40 m in front of you
  or a ring around you), health (*Normal 100 / Tough 250 / Punching bag 1000 with auto-regen*) and behaviour
  (*Hostile* hunts you, *Passive* idles until hit, *Dummy* never moves or shoots). **Clear all enemies** and **Respawn dummies**
  are one click away. Up to **40** enemies can be alive at once; enemies never hurt each other, and corpses disappear
  after a few seconds (they still drop their loot). The minimap shows enemies as red dots and a bar under the damage
  readout shows the health of whoever you hit last.
* **Player**: God mode (no damage, no fall damage), Infinite ammo, Infinite consumables, Super speed, **Heal**, teleports to all
  eight locations (always to a safe spot on the ground), a 300 m **Sky drop**, and a time scale (0.25× / 0.5× / 1×) for
  studying animations and projectiles. Enemies stay where they are when you teleport (hostile ones come running after
  you), so use **Clear all enemies** for a clean slate.
* **Readout**: total damage, DPS over the last 3 s and the last hit (with a HEAD flag) are shown on the HUD and in the
  drawer footer, with a reset button.
* If you are eliminated you respawn at the same spot after about 1.5 s with full health and your inventory (unless God mode
  is on). Your panel choices (tab, rarity, spawn options) are remembered between visits.

## Look and feel

Everything is procedural (no asset files), and a lot of it moves:

* **Camera** – a close over-the-shoulder view (2.1 m behind, 0.6 m to the side) that eases between stances: crouching,
  sprinting (it drifts back a little), aiming down sights and swapping shoulders glide instead of snapping. **X** swaps shoulders
  and **V** switches to first person (hands and weapon stay in view).
* **Characters** – each of the 50 players has a distinct outfit (nine hair styles, hats from caps to cowboy hats, faces, vests and
  pads for the pros, goofy gear for the beginners). A model is 17 merged meshes with a proper skeleton (pelvis, spine, neck, shoulders,
  elbows, wrists, hips, knees, ankles).
* **Animation** – a procedural animator with two-bone IK drives everything: foot-planted walk / run / sprint / crouch / strafe /
  backpedal cycles that follow the stick, jumps and landings that absorb the impact, weapon holds per class (the support hand is
  placed on the weapon's own grip), per-weapon recoil, reloads per mechanism (magazines, revolver cylinders, shotgun shells, bolt,
  lever, rocket tubes, crossbows) with the matching gun parts moving (slides, pumps, bolts, levers, hammers, a spinning
  minigun), distinct swings for each melee weapon, throws, eating / drinking / bandaging, hit reactions and knock-backs, direction-aware
  death falls, skydiving, gliding, swimming and dancing. Characters far from the camera switch to a cheaper pose.
* **Items** – every weapon, consumable, ammo box and the chest is a detailed model built from merged vertex-coloured meshes (a few
  draw calls each), with grip, magazine and ejection anchors and named moving parts the animator uses.
* **Effects** – ejected shell casings (brass, red for shotguns), gun smoke and rocket back-blast, surface-specific impacts,
  explosions with a flash, shock ring and debris, dust and snow puffs under running feet, landing dust rings, a cyan trail and
  speed lines for the **Runana** boost (and for fast skydives), loot that pops in, shimmers and flies to you when picked up, and a chest
  whose lid strains, springs open and settles.
* **World** – trees and bushes sway in the wind, tumbleweeds roll and hop across the desert, birds circle the lake, forests and
  peaks, chimneys and campfires smoke, snow falls around Frostpeak, pollen drifts in the green areas, dust blows in the desert,
  Neon Heights flickers, the water has two layers of ripples, the Battle Bus has a propeller, a flag and a contrail.

## Graphics

Pick **Low / Default / Ultra** on the title screen or in the pause menu. It changes live:

| | Low | Default | Ultra |
|---|---|---|---|
| Resolution scale | 0.75× | 1× | native (up to 2×) |
| Shadows | off | 2048 map | 4096 map, longer range |
| View distance | 450 m | 800 m | 1400 m |
| Grass | none | 48 m radius | 85 m radius, denser |
| Terrain detail | coarse LOD | normal | LOD + normal‑mapped detail |
| Particles | 40 % | 75 % | 100 % |

## The island

Eight named locations plus camps, homesteads and lone chests scattered between them:

* **Distant Desert** – flat sand plains with mesas on the rim, a Wild West town (saloon, hotel, bank, sheriff,
  store, stables, train station with a parked train) and **occasional Wild West homesteads with chests** across the desert.
* **Parkour Plaza** – a plaza full of parkour: a 22‑step spiral **Spire**, rooftop gap runs, ramps and quarter pipes,
  balance beams, a stepped pyramid, crate stairs, wall hops and **launch pads**. Parkour loot (grapplers, impulse grenades,
  jumpples, launch pads) is more common here.
* **Floorange Grove** – an orange orchard with a farm, barn, silo, windmill and a juice factory. Floranges grow here.
* **Frostpeak Lodge** – snowy mountain lodge, ski lift, frozen pond and a summit hut.
* **Bluewater Lake** – lakeside cabins, a long pier and a lighthouse island.
* **Neon Heights** – a small city of skyscrapers, a mall, bank and offices (multi‑storey, walkable stairs and roofs).
* **Pinewood Camp** – ranger station, cabins, sawmill and fire tower in dense forest.
* **Rusty Yard** – container yard, warehouses and a gantry crane.

## Loot

Rarities: Common · Uncommon · Rare · Epic · Legendary (each tier hits a little harder / reloads a little faster).
Items lie on the ground (follow the coloured beams) or in glowing chests.

* **Melee** – Pickaxe (always equipped), Machete, Baseball Bat, Katana, Sledgehammer
* **Pistols** – Pistol, Revolver, Hand Cannon · **SMGs** – SMG, Suppressed SMG
* **Rifles** – Assault Rifle, Burst Rifle, Heavy AR, Lever‑Action Rifle
* **Shotguns** – Pump, Tactical, Double Barrel, Auto Shotgun · **Snipers** – Bolt‑Action, Semi‑Auto
* **Heavy** – LMG, Minigun · **Explosives** – Rocket Launcher, Grenade Launcher · **Crossbow**
* **Throwables** – Frag Grenade, **Impulse Grenade** (shoves players, great for traversal), Dynamite, Boogie Bomb
* **Gadgets** – **Grappler** (swing to any surface), **Launch Pad**
* **Consumables** – Apple, Banana, Shield Mushroom, Bandage, Medkit, Mini Shield, Shield Potion, Chug Jug, Slurp Juice,
  **Jumpple** (🍏 run faster and jump higher for 30 s), **Runana** (🏃 a sprint boost for 5 s and up to 15 shield, no health)
  and **Floorange** (🍊 only edible **mid‑air**: teleports you to the ground
  with no fall damage and heals 10 HP)

Fall damage is real: drops from more than ~6 m hurt, so keep a Floorange or a launch pad handy.

## Battle royale

* 50 players: you + 49 bots. The bus flies a random route over the island and everyone jumps whenever they like. Bots choose
  random landing spots (popular POIs and out‑of‑the‑way corners alike).
* Bots come in three tiers: **pro** (accurate, strafes, throws grenades, heals smartly, plans around the storm),
  **average** and **terrible** (wild aim, slow reactions, sometimes idle, often late to the storm). Bots loot, use stairs and
  doors, fight, heal, hear gunshots and drop their loot when eliminated.
* The storm shrinks over seven phases and gets deadlier. The last one alive wins the Victory Royale.

## Project layout

```
index.html, style.css      page shell + HUD styles
src/main.js, game.js       bootstrap, game loop, match lifecycle
src/world/                 terrain (LOD chunks), sky, water, props, colliders, POI builders (pois/*.js)
src/entities/              character (shared by player + bots), player controller/camera, bot AI
src/items.js, loot.js      item database + loot tables, ground items & chests
src/combat.js, fx.js       hitscan/projectiles/explosions, particles & tracers
src/hud.js, audio.js       HUD / menus / minimap, synthesised sound
src/entities/anim/         the procedural animator: IK, locomotion, weapon holds + reloads, melee swings, death, muzzle flash
src/charmodel.js, models.js  character models (merged parts), item / ammo / chest models
src/world/ambient.js       tumbleweeds, birds, smoke, snow, pollen, dust, neon flicker
src/sandbox*.js            sandbox mode: state + actions (sandbox.js), drawer UI (sandboxpanel.js), item thumbnails, data
tools/                     build, dev server, headless tests and screenshot helpers
dist/game.js               bundled output (committed so index.html works offline)
```

## Development

```bash
npm run build       # production bundle -> dist/game.js
npm run watch       # rebuild on change (unminified + sourcemap)
npm run bundle      # also writes dist/shoot-n-loot.html (everything inlined in one file)
npm test            # headless Chromium: mechanics, input, touch, animation, models, effects, world and sandbox tests (needs `playwright`)
```

The individual suites (`node tools/<name>.mjs`): `smoke-test` (mechanics), `input-test`, `mobile-test`, `anim-test` (rig budget, foot
sliding, hands on grips, every state NaN-free, leaks, cost), `model-test` (every item model, draw calls, anchors, parts),
`fx-test` (casings, impacts, pickup flight, chest lid, bus), `world-test` (layout hash, ambient layer, draw-call budgets) and
`sandbox-test`. Preview helpers write contact sheets to `tools/shots/` (look at them with an image viewer):
`anim-preview.mjs <sheet>`, `model-preview.mjs [guns|melee|misc|ammo]`, `world-budget.mjs`.

`node tools/sandbox-test.mjs [--shots]` drives the Sandbox mode through its real UI on a desktop viewport and on an emulated
phone (title button, B key / flask button, panel clicks, Esc handling, every item, spawn options, the 40 enemy cap, cheats,
teleports, death and respawn, enter / leave cycles without leaks); `--shots` writes panel screenshots to `tools/shots/`.

`node tools/probe.mjs '<js>' [name|page:name]` runs a snippet inside the loaded game and optionally saves a screenshot
to `tools/shots/` (handy for poking at the world without a GPU).

The tests drive the real game in headless Chromium: chests, pickups, every weapon class, fall damage, Floorange, Jumpple,
grapple, jump pads, storm damage, skydiving, bot navigation through multi‑storey buildings, keyboard/mouse input, pause menu
and graphics presets. `tools/mobile-test.mjs` emulates a phone and drives the touch controls with real multi‑touch events
(`node tools/mobile-shots.mjs` saves HUD screenshots for several devices).
