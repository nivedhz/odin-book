import dotenv from "dotenv";

// Ensure workers also have process.env populated (config-time
// process.env does not always propagate to all pool workers).
// First file wins, so `.env.test` stays canonical.
dotenv.config({ path: ".env.test" });
dotenv.config({ path: ".env.local" });
dotenv.config(); // .env as final fallback

import "@testing-library/jest-dom/vitest";
