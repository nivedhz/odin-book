"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Posts" },
  { href: "/users", label: "Users" },
  { href: "/follower/post", label: "Followers" },
];

const feedRoutes = links.map((link) => link.href);

const PillLinks = () => {
  const pathname = usePathname();
  if (!feedRoutes.includes(pathname)) return null;
  return (
    <nav aria-label="Feed sections" className="flex justify-center py-4">
      <ul className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-foreground font-medium text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PillLinks;
