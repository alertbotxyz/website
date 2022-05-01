import { createRollupConfigs } from './scripts/base.config.js';
import autoPreprocess from 'svelte-preprocess';
import postcssImport from 'postcss-import';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;
process.env.NODE_ENV = production ? 'production' : 'development';

export const config = {
  staticDir: 'static',
  distDir: 'dist',
  buildDir: 'dist/build',
  serve: !production,
  production,
  rollupWrapper: (rollup) => {
    rollup.plugins = [
      ...rollup.plugins,
      postcss({ plugins: [postcssImport()] }),
    ];
    return rollup;
  },
  svelteWrapper: (svelte) => {
    svelte.preprocess = [
      autoPreprocess({
        postcss: { plugins: [postcssImport()] },
        defaults: { style: 'postcss' },
      }),
    ];
  },
  swWrapper: (worker) => worker,
};

const configs = createRollupConfigs(config);

export default configs;