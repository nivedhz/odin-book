"use server";

import z from "zod";
import { SignUpResponse, ValidatedFields } from "./types";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { createSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

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

async function createUser(data: {
  email: string;
  password: string;
  username: string;
}) {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password),
      username: data.username,
    },
  });
  return user;
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
      errors: validatedFields.error,
      message: "Invalid form data",
    };
  }

  try {
    const user = await createUser(validatedFields.data);
    await createSession(user.id);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return {
        success: false,
        errors: {
          _form: "Email or username already exists",
        },
        message: "Email or username already exists",
      };
    } else {
      return {
        success: false,
        errors: {},
        message: "Something went wrong on the server",
      };
    }
  }
  redirect("/");
}
