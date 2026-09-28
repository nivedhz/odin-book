import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center sm:px-6">
      <p className="font-serif text-6xl font-semibold tracking-tight tabular-nums">
        404
      </p>
      <h1 className="text-xl font-semibold tracking-tight text-balance">
        This page wandered off the shelf
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants(), "mt-2")}
      >
        <ArrowLeft data-icon="inline-start" />
        Back to feed
      </Link>
    </div>
  );
}
