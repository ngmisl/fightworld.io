import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import paths from "vite-tsconfig-paths";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [paths({ projects: ["tsconfig.json"] }), react()],
  resolve: {
    alias: {
      util: "rollup-plugin-node-polyfills/polyfills/util",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
