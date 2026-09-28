import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "./ui/button";
import AccountAvatar from "./AccountAvatar";
import CreatePostButton from "./CreatePostButton";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const session = await getSession();
  const username = String(session?.username);
  const userId = String(session?.userId);
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Booko
            <span aria-hidden="true" className="text-brand">
              .
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {session ? (
            <>
              <CreatePostButton />
              <AccountAvatar username={username} userId={userId} />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
