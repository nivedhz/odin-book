"use server";

import z from "zod";
import { ProfileEditResponse } from "./types";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { updateProfile } from "./queries";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
});

function getFormData(formData: FormData) {
  return {
    username: formData.get("username"),
    email: formData.get("email"),
  };
}

export async function handleProfileEdit(
  _prevState: ProfileEditResponse,
  FormData: FormData,
): Promise<ProfileEditResponse> {
  const { username: rawUsername, email: rawEmail } = getFormData(FormData);

  const validatedFields = schema.safeParse({
    username: rawUsername,
    email: rawEmail,
  });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }
  try {
    const session = await getSession();
    if (!session?.userId) {
      redirect("/login");
    }
    const userId = session.userId as string;
    await updateProfile(userId, validatedFields.data);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Email or username already exists",
      };
    }
    return {
      success: false,
      message: "Failed to update user",
    };
  }

  redirect("/");
}
