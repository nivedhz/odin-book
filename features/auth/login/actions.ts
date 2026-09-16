"use server";

import z from "zod";
import { InputData, LoginResponse } from "./types";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";
import { comparePasswordWithHash } from "@/lib/auth/password";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

function getFormData(formData: FormData): InputData {
  return {
    email: formData.get("email"),
    password: formData.get("password"),
  };
}
async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function handleLogin(
  _prevState: LoginResponse,
  formData: FormData,
): Promise<LoginResponse> {
  const { email: rawEmail, password: rawPassword } = getFormData(formData);

  const validatedFields = schema.safeParse({
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
    const user = await getUser(validatedFields.data.email);
    if (!user) {
      return {
        success: false,
        errors: {
          email: "Incorrect email or password",
        },
        message: "Incorrect email or password",
      };
    }
    const passwordStatus = await comparePasswordWithHash(
      validatedFields.data.password,
      user.password,
    );
    if (!passwordStatus) {
      return {
        success: false,
        errors: {
          password: "Incorrect email or password",
        },
        message: "Incorrect email or password",
      };
    }

    await createSession(user.id);
  } catch (err) {
    return {
      success: false,
      errors: {
        _form: "Something went wrong on the server",
        error: err,
      },
      message: "Something went wrong on the server",
    };
  }
  redirect("/");
}
