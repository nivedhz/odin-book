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

const AccountAvatar = ({ username }: { username: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button>
            <Avatar>
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
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
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">View Profile</p>
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
  );
};

export default AccountAvatar;
