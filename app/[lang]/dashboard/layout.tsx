import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dacatra Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex relative">
        <Sidebar />
        <main className="relative lg:left-72 w-full lg:w-[78%] top-10">
          {children}
        </main>
      </div>
    </>
  );
}
