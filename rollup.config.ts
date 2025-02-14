import typescript from "rollup-plugin-typescript2";
import { createRequire } from 'module';
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
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      clean: true,
      tsconfig: "tsconfig-rollup.json",
      typescript: require("typescript"),
    }),
  ],
};

export default config;
