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
      "/api": "https://localhost:5000", //
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
