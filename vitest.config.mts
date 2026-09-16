import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

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
