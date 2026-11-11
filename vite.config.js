import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Todo-app/",
  server: {
    port: 5173,
  },
});
