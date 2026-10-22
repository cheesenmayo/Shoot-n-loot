// Bundles src/main.js (+ three.js) into dist/game.js as a classic script so that
// index.html also works when opened straight from disk (file://).
import * as esbuild from 'esbuild';

const options = {
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  outfile: 'dist/game.js',
  legalComments: 'none',
  logLevel: 'info',
};

if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context({ ...options, minify: false, sourcemap: true });
  await ctx.watch();
  console.log('watching src/ ...');
} else {
  await esbuild.build({ ...options, minify: !process.argv.includes('--dev') });
}
