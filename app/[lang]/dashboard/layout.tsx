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
      <div className="flex min-h-screen relative" >
        <div className="hidden xl:block xl:w-[17%]  h-full w-0 border-r rtl:border-r-0 rtl:border-l fixed z-20 shadow-lg">
          <Sidebar />
        </div>
        <main className="xl:w-[83%] w-full top-10 relative ltr:xl:ml-[17%] ml-0  rtl:xl:mr-[17%] rtl:mr-0" >
          {children}
        </main>
      </div>
    </>
  );
}
