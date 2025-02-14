import { createRequire } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import sucrase from '@rollup/plugin-sucrase';
import typescript from '@rollup/plugin-typescript';

const require = createRequire(import.meta.url);
const pkg = JSON.parse(
  require('fs').readFileSync(new URL('./package.json', import.meta.url))
);

const config = {
  input: "./index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: 'named'
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      exports: 'named'
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: ['src/**/*', 'components/**/*'],
      exclude: 'node_modules/**'
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript', 'jsx']
    }),
    typescript({
      exclude: ['node_modules/**'],
      tsconfig: './tsconfig.json',
      outputToFilesystem: true,
      compilerOptions: {
        sourceMap: true,
        inlineSources: true,
        declarationMap: true
      }
    })
  ],
};

export default config;