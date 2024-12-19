import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "localhost", // atau IP lokal Anda
    port: 5173,
    // proxy: {
    //   "/api": "http://localhost:5000", //
    // },
    proxy: {
      // "/api": "http://localhost:5000", //
      "/api": "https://db.airf.my.id", //
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
