"use client";

import { useActionState } from "react";
import { handleSignUp } from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const SignUpForm = () => {
  const [state, action, _pending] = useActionState(handleSignUp, {
    success: false,
    message: "",
  });
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div className="flex flex-col gap-4">
        <Link
          href={"/"}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground self-start"
        >
          <ArrowLeft width={14} />
          Home
        </Link>
        <Card className="w-full min-w-sm">
          <CardHeader>
            <CardTitle>Sign up to Booko</CardTitle>
            <CardDescription>
              Enter the details below to create your account
            </CardDescription>
            <CardAction>
              <Link
                href={"/login"}
                className="text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>
            </CardAction>
          </CardHeader>
          <form action={action}>
            <CardContent>
              <div className="flex flex-col gap-2 pb-4">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      name="username"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      name="email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="········"
                      required
                    />
                  </div>
                </div>
                {state.message && (
                  <p className="text-red-600 text-sm">{state.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;
