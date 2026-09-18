import { handleLogin } from "@/features/auth/login/actions";
import { getUser } from "@/features/auth/login/queries";

import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/login/queries", () => ({
  getUser: vi.fn(),
}));

vi.mock("@/lib/password", () => ({
  comparePasswordWithHash: vi.fn(),
}));

vi.mock("@/lib/session", () => ({
  createSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("Login", () => {
  it("returns an error when the user does not exist", async () => {
    vi.mocked(getUser).mockResolvedValue(null);

    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("password", "password");

    const result = await handleLogin(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "Incorrect email or password",
    });
  });
});
