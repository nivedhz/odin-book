import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test", quiet: true });
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true }); // defaults to .env

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
