import { handleSignUp } from "@/features/auth/sign-up/actions";
import { createUser } from "@/features/auth/sign-up/queries";
import { createSession } from "@/lib/auth/session";
import { Prisma } from "@/lib/generated/prisma/client";
import { redirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/sign-up/queries", () => ({
  createUser: vi.fn(),
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

describe("Login", () => {
  it("returns an error when the form data is invalid", async () => {
    const formData = new FormData();
    formData.set("password", "password");
    formData.set("username", "test");

    const result = await handleSignUp(
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
  it("returns an error when the user email already exists", async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed on the fields: (`email`)",
      {
        code: "P2002",
        clientVersion: "4.6.0",
      },
    );
    vi.mocked(createUser).mockImplementation(() => {
      throw error;
    });

    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("password", "password");
    formData.set("username", "test");

    const result = await handleSignUp(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "Email or username already exists",
    });
  });
  it("returns an error when the username already exists", async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed on the fields: (`username`)",
      {
        code: "P2002",
        clientVersion: "4.6.0",
      },
    );
    vi.mocked(createUser).mockImplementation(() => {
      throw error;
    });

    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("username", "test");
    formData.set("password", "password");

    const result = await handleSignUp(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "Email or username already exists",
    });
  });
  it("returns success when the email and username are unique and form data is valid", async () => {
    vi.mocked(createUser).mockResolvedValue({
      password: "password",
      email: "test@example.com",
      username: "test",
      id: "test",
    });
    vi.mocked(redirect);

    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("username", "test");
    formData.set("password", "password");
    await handleSignUp(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(createUser).toHaveBeenCalled();
    expect(createSession).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalled();
  });
});
