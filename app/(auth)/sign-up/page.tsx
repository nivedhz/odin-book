import type { Metadata } from "next";
import SignUpForm from "@/features/auth/sign-up/components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your Booko account to join the reading room.",
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
