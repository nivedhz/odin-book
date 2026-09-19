import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/features/auth/login/components/LoginForm";

const Login = () => {
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
            <CardTitle>
              <h1>Welcome back...!</h1>
            </CardTitle>
            <CardDescription>Enter the details below to login</CardDescription>
            <CardAction>
              <Link
                href={"/sign-up"}
                className="text-muted-foreground hover:text-foreground underline"
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
