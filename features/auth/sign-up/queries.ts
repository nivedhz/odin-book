import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

export async function createUser(data: {
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
