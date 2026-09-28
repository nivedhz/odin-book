import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/features/auth/login/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Booko account to join the reading room.",
};

const Login = () => {
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
                Welcome back
              </h1>
            </CardTitle>
            <CardDescription>
              Enter your details below to log in.
            </CardDescription>
            <CardAction>
              <Link
                href="/sign-up"
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Sign Up
              </Link>
            </CardAction>
          </CardHeader>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default Login;
