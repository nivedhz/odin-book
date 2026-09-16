import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load test env vars into process.env.
// Vitest/Vite does not apply the Next.js .env cascade to process.env,
// so modules reading process.env.DATABASE_URL / JWT_SECRET at import
// time would otherwise throw. First file wins (dotenv never overrides
// existing vars), making `.env.test` canonical with fallbacks.
dotenv.config({ path: ".env.test" });
dotenv.config({ path: ".env.local" });
dotenv.config(); // .env as final fallback

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true, // Allows using describe, test, expect without importing them
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
