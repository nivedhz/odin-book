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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
        <Card className="w-full rounded-2xl">
          <CardHeader>
            <CardTitle>
              <h1 className="font-serif text-2xl font-semibold tracking-tight">
                Sign up to Booko
              </h1>
            </CardTitle>
            <CardDescription>
              Enter your details below to create your account.
            </CardDescription>
            <CardAction>
              <Link
                href="/login"
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Login
              </Link>
            </CardAction>
          </CardHeader>
          <form action={action} aria-label="Sign Up form">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username…"
                      name="username"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com…"
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
                      placeholder="Create a password…"
                      required
                    />
                  </div>
                </div>
                {state.message && (
                  <p className="text-sm text-destructive">{state.message}</p>
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
