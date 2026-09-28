"use client";
import { useRouter } from "next/navigation";
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

const AccountAvatar = ({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="account toggle"
            className="cursor-pointer rounded-full"
          >
            <Avatar>
              <AvatarFallback>{username[0]}</AvatarFallback>
              <AvatarBadge className="bg-brand animate-pulse" />
            </Avatar>
          </button>
        }
      />
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center gap-3 py-2">
            <Avatar size="sm" className="shrink-0">
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div
              className="flex min-w-0 flex-1 flex-col gap-1"
              onClick={() => {
                router.push(`/profile/${userId}`);
              }}
            >
              <p className="text-sm font-medium leading-none">View Profile</p>
              <p className="truncate text-xs leading-none text-muted-foreground">
                {username}
              </p>
            </div>
          </DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountAvatar;
