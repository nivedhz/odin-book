import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await getSession();
  return (
    <nav className="flex justify-between items-center px-20 py-4 border-b border-gray-200/20">
      <div className="">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white">
            Booko
          </h1>
        </Link>
      </div>
      <ul className="flex gap-4">
        {session ? (
          <li className="flex gap-4 items-center">
            <p>{session?.username as string}</p>
            <LogoutButton />
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">
                <Button
                  variant={"ghost"}
                  className={"py-4 px-6 cursor-pointer"}
                >
                  Login
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/sign-up">
                <Button className={"py-4 px-6 cursor-pointer"}>Sign Up</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
