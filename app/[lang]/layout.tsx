import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { Locale, i18n } from '@/i18n.config'
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Dacatra Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale }
}) {
  const session = await getServerSession();
  let messages;
  try {
    messages = (await import(`../../dictionaries/${params.lang}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={params.lang} suppressHydrationWarning dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body  dir={params.lang === "ar" ? "rtl" : "ltr"}
          className={params.lang === "ar" ? noto.className : inter.className}>
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}









