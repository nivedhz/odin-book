"use server";
import { deleteSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export async function handleLogout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
