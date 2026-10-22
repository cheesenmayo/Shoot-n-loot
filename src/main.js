import { Game } from './game.js';
import { ITEMS, makeStack } from './items.js';

const canvas = document.getElementById('game');
const ui = document.getElementById('ui');
const game = new Game(canvas, ui);
window.__game = game;
window.__items = { ITEMS, makeStack };

const manual = /[?&]manual/.test(location.search);

// Test hooks (used by tools/*.mjs): advance the simulation without waiting on the renderer.
window.__step = (seconds, dt = 1 / 30) => {
  const n = Math.round(seconds / dt);
  for (let i = 0; i < n; i++) game.step(dt);
};
window.__shot = () => {
  game.render();
  return canvas.toDataURL('image/png');
};

game
  .init()
  .then(() => {
    window.__ready = true;
    if (manual) return;
    const loop = (t) => {
      game.frame(t);
      requestAnimationFrame(loop);
    };
    game.lastT = performance.now();
    requestAnimationFrame(loop);
  })
  .catch((e) => {
    console.error(e);
    const t = document.getElementById('loadtxt');
    if (t) t.textContent = 'Failed to start: ' + e.message;
  });
