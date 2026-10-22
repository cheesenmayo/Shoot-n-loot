import { buildParkourPlaza } from './parkour.js';
import { buildDesert } from './desert.js';
import { buildGrove } from './grove.js';
import { buildPinewood } from './pine.js';
import { buildLodge } from './lodge.js';
import { buildLake } from './lake.js';
import { buildYard } from './yard.js';
import { buildCity } from './city.js';
import { buildOutposts } from './outposts.js';

const tick = () => new Promise((r) => setTimeout(r, 0));

export async function buildAllPois(world, progress) {
  const builders = [
    ['Parkour Plaza', buildParkourPlaza],
    ['Distant Desert', buildDesert],
    ['Floorange Grove', buildGrove],
    ['Pinewood Camp', buildPinewood],
    ['Frostpeak Lodge', buildLodge],
    ['Bluewater Lake', buildLake],
    ['Rusty Yard', buildYard],
    ['Neon Heights', buildCity],
    ['Outposts', buildOutposts],
  ];
  for (let i = 0; i < builders.length; i++) {
    const [label, fn] = builders[i];
    progress(label, i / builders.length);
    await tick(); // let the browser repaint the loading bar between locations
    fn(world);
  }
  progress('done', 1);
}
