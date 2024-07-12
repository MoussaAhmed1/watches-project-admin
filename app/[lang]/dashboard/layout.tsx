import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dacatra Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params:{lang:Locale}
}) {
  return (
    <>
      <Header lang={params.lang} />
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
