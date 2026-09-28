import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Odin Book",
  description: "A messaging app built for the odin project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {children}
    </main>
  );
}
