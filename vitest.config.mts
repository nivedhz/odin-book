import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// dotenv files with fallbacks
dotenv.config({ path: ".env.test" });
dotenv.config({ path: ".env.local" });
dotenv.config(); // defaults to .env

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    isolate: false,
  },
  resolve: {
    tsconfigPaths: true,
  },
});
