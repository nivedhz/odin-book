import LogoutButton from "@/features/home/components/LogoutButton";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  return (
    <>
      {session ? (
        <LogoutButton />
      ) : (
        <>
          <Link href={"/login"}>Login</Link>
          <Link href={"/sign-up"}>Sign Up</Link>
        </>
      )}
    </>
  );
}
