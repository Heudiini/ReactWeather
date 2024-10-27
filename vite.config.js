import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Käsittele .js-tiedostot JSX:n avulla
          [
            "@babel/plugin-transform-react-jsx",
            { pragma: "React.createElement" },
          ],
        ],
      },
    }),
  ],
  esbuild: {
    loader: {
      // Ota käyttöön JSX .js-tiedostoille
      ".js": "jsx",
    },
  },
  resolve: {
    alias: {
      // Jos tarvitset aliasia, lisää tänne
    },
  },
});
