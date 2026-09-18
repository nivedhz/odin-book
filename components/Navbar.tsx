import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";
import { Avatar, AvatarBadge, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = async () => {
  const session = await getSession();
  const username = String(session?.username);
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
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button>
                    <Avatar>
                      <AvatarFallback>
                        {username[0].toUpperCase()}
                      </AvatarFallback>
                      <AvatarBadge className="bg-green-500 animate-pulse" />
                    </Avatar>
                  </button>
                }
              />
              <DropdownMenuContent className={"w-56"}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className={"flex gap-3 py-2"}>
                    <Avatar>
                      <AvatarFallback>
                        {username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium leading-none">
                        View Profile
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {username}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Posts</DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
