import { handleLogin } from "@/features/auth/login/actions";
import { getUser } from "@/features/auth/login/queries";
import { comparePasswordWithHash } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/login/queries", () => ({
  getUser: vi.fn(),
}));

vi.mock("@/lib/auth/password", () => ({
  comparePasswordWithHash: vi.fn(),
}));

vi.mock("@/lib/auth/session", () => ({
  createSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("Login Logic", () => {
  it("returns an error when the form fields are invalid", async () => {
    vi.mocked(getUser).mockResolvedValue(null);

    const formData = new FormData();
    formData.set("email", "test@example.com");

    const result = await handleLogin(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "Invalid form data",
    });
  });
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
  it("returns generic error when the password is wrong", async () => {
    vi.mocked(getUser).mockResolvedValue({
      username: "test",
      email: "test@example.com",
      password: "password",
      id: "test",
    });
    vi.mocked(comparePasswordWithHash).mockResolvedValue(false);
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
  it("returns generic error when the email is wrong", async () => {
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
  it("returns success when the email and password are correct", async () => {
    vi.mocked(getUser).mockResolvedValue({
      id: "test",
      username: "test",
      email: "test@example.com",
      password: "password",
    });
    vi.mocked(comparePasswordWithHash).mockResolvedValue(true);
    vi.mocked(createSession);

    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("password", "password");

    await handleLogin(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(createSession).toHaveBeenCalled();
  });
});
