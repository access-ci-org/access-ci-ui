// import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, "src/index.jsx"),
  //     name: "AccessCiUi",
  //     fileName: "access-ci-ui",
  //   },
  // },
  plugins: [preact()],
});
