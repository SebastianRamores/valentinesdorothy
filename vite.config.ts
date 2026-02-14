import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

async function getPlugins() {
  const plugins = [react(), runtimeErrorOverlay()];

  // Only include these in dev on Replit
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    plugins.push(cartographer(), devBanner());
  }

  return plugins;
}

export default defineConfig(async () => ({
  plugins: await getPlugins(),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.url.replace("file://", ""), "client", "src"),
      "@shared": path.resolve(import.meta.url.replace("file://", ""), "shared"),
      "@assets": path.resolve(import.meta.url.replace("file://", ""), "attached_assets"),
    },
  },
  root: path.resolve(process.cwd(), "client"),
  build: {
    outDir: path.resolve(process.cwd(), "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
