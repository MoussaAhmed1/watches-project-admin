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
      <div className="flex min-h-screen">
        <div className=" hidden xl:block min-w-[16.5%] border-r">
          <Sidebar />
        </div>
        <main className="mt-10 xl:min-w-[83.5%] w-full  top-10">
          {children}
        </main>
      </div>
    </>
  );
}
