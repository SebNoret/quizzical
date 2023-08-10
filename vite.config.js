import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { createHtmlPlugin } from "vite-plugin-html";

const test = "http://localhost:80/dist/";
const dev = "http://localhost:5173/";
const prod = "https://sebnoret.github.io/portfolio/quizz/demo/";
const localProd = "http://localhost:1313/quizz/demo/";

export default defineConfig({
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],

  base: prod,
  build: {
    minify: "esbuild",
  },
});
