import Navbar from "@/components/Navbar";
import PillLinks from "@/components/PillLinks";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PillLinks />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
