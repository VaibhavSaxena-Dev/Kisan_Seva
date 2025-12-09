import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: process.env.FRONTEND_PORT ? parseInt(process.env.FRONTEND_PORT, 10) : 8080,
  },
  define: {
    __VITE_API_URL__: JSON.stringify(process.env.VITE_API_URL ||process.env.BACKEND_PORT),
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
