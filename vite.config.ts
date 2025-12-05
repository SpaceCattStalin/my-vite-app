import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  assetsInclude: ["**/*.svg"],
  build: {
    assetsInlineLimit: 0 
  },
  plugins: [
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    })
  ],
});