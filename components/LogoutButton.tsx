"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleLogout } from "@/features/home/actions";

const LogoutButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            className="flex w-full items-center rounded-md px-2 py-1.5 text-start text-sm transition-colors hover:bg-muted"
            aria-label="Logout"
          >
            Logout
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leaving so soon?</AlertDialogTitle>
          <AlertDialogDescription>
            You’re about to log out of your account. We’ll be right here
            whenever you’re ready to jump back in!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await handleLogout();
            }}
            variant="destructive"
            className="cursor-pointer"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
