"use server";

import z from "zod";
import { SignUpResponse, ValidatedFields } from "./types";
import { Prisma } from "@/lib/generated/prisma/client";
import { createSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { createUser } from "./queries";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

function getFormData(formData: FormData): ValidatedFields {
  return {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
}

export async function handleSignUp(
  _prevState: SignUpResponse,
  formData: FormData,
): Promise<SignUpResponse> {
  const {
    username: rawUsername,
    email: rawEmail,
    password: rawPassword,
  } = getFormData(formData);

  const validatedFields = schema.safeParse({
    username: rawUsername,
    email: rawEmail,
    password: rawPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    const user = await createUser(validatedFields.data);
    await createSession(user.id);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return {
        success: false,
        message: "Email or username already exists",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong on the server",
      };
    }
  }
  redirect("/");
}
