import { deleteSession } from "@/lib/auth/session";

export async function handleLogout() {
  await deleteSession();
  return {
    success: true,
    message: "Logout successful",
  };
}
