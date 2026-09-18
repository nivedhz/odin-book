import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Odin Book",
  description: "A messaging app built for the odin project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
