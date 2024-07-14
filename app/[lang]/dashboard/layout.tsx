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
      <div className="flex min-h-screen relative">
        <div className="hidden xl:block xl:w-[17%] border-r fixed h-full w-0">
          <Sidebar />
        </div>
        <main className="xl:w-[81%] w-full top-10 relative xl:ml-[17%] ml-0">
          {children}
        </main>
      </div>
    </>
  );
}
