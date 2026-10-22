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

In the air: **W** dives, **S** slows, **A/D** steer, **Space** deploys the glider early (it opens automatically near the ground).

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
  **Jumpple** (🍏 run faster and jump higher for 30 s) and **Floorange** (🍊 only edible **mid‑air**: teleports you to the ground
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
tools/                     build, dev server, headless tests and screenshot helpers
dist/game.js               bundled output (committed so index.html works offline)
```

## Development

```bash
npm run build       # production bundle -> dist/game.js
npm run watch       # rebuild on change (unminified + sourcemap)
npm run bundle      # also writes dist/shoot-n-loot.html (everything inlined in one file)
npm test            # headless Chromium: mechanics + input tests (needs `playwright`)
```

`node tools/probe.mjs '<js>' [name|page:name]` runs a snippet inside the loaded game and optionally saves a screenshot
to `tools/shots/` (handy for poking at the world without a GPU).

The tests drive the real game in headless Chromium: chests, pickups, every weapon class, fall damage, Floorange, Jumpple,
grapple, jump pads, storm damage, skydiving, bot navigation through multi‑storey buildings, keyboard/mouse input, pause menu
and graphics presets.
