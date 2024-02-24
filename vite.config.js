import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://Dhruvam123.github.io/Nutrition.github.io",
  optimizeDeps: {
    include: ['react-bootstrap'],
  },
});
