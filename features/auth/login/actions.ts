"use server";

import z from "zod";
import { InputData, LoginResponse } from "./types";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

/**
 * Get the email and password from the FormData
 *
 * @param {FormData} formData - The form data to get the email and password from
 * @returns {InputData} {email, password} - The email and password
 * */
function getFormData(formData: FormData): InputData {
  return {
    email: formData.get("email"),
    password: formData.get("password"),
  };
}

/**
 * Handles the login form submission
 *
 * @param {FormData} formData - The form data to get the email and password from
 * @returns {LoginResponse} {success, errors} - The response from the server
 * */
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
    const user = await prisma.user.findUnique({
      where: {
        email: validatedFields.data.email,
      },
    });

    if (!user || user.password !== validatedFields.data.password) {
      return {
        success: false,
        errors: {
          email: "Incorrect email or password",
        },
        message: "Incorrect email or password",
      };
    }

    await createSession(user.id);
    return {
      success: true,
      errors: {},
      message: "You have successfully been logged in",
    };
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
}
