import { buildParkourPlaza } from './parkour.js';
import { buildDesert } from './desert.js';
import { buildGrove } from './grove.js';
import { buildPinewood } from './pine.js';
import { buildLodge } from './lodge.js';
import { buildLake } from './lake.js';
import { buildYard } from './yard.js';
import { buildCity } from './city.js';
import { buildOutposts } from './outposts.js';

export function buildAllPois(world, progress) {
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
  builders.forEach(([label, fn], i) => {
    progress(label, i / builders.length);
    fn(world);
  });
  progress('done', 1);
}
