"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PillLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-center py-4">
      <ul className="flex gap-4">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-sm text-background "
              : "text-sm text-muted-foreground"
          }
        >
          <li
            className={
              pathname === "/"
                ? "bg-foreground px-2 py-1 rounded-full"
                : "hover:bg-muted-foreground/40 px-2 py-1 rounded-full"
            }
          >
            Posts
          </li>
        </Link>
        <Link
          href="/users"
          className={
            pathname === "/users"
              ? "text-sm text-background "
              : "text-sm text-muted-foreground"
          }
        >
          <li
            className={
              pathname === "/users"
                ? "bg-foreground px-2 py-1 rounded-full"
                : "hover:bg-muted-foreground/40 px-2 py-1 rounded-full"
            }
          >
            Users
          </li>
        </Link>
        <Link
          href="/follower/post"
          className={
            pathname === "/follower/post"
              ? "text-sm text-background "
              : "text-sm text-muted-foreground"
          }
        >
          <li
            className={
              pathname === "/follower/post"
                ? "bg-foreground px-2 py-1 rounded-full"
                : "hover:bg-muted-foreground/40 px-2 py-1 rounded-full"
            }
          >
            Followers
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default PillLinks;
