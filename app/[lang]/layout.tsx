import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Roboto, Cairo } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { Locale, i18n } from '@/i18n.config'
import { notFound } from "next/navigation";
import { authOptions } from "../api/auth/_options";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Roboto({ subsets: ["latin"], weight: ["100","400","500", "700"] });
const noto = Cairo({ subsets: ["arabic"] });

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
  const session = await getServerSession(authOptions);
  let messages;
  try {
    messages = (await import(`../../messages/${params.lang}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={params.lang} suppressHydrationWarning dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body  dir={params.lang === "ar" ? "rtl" : "ltr"}
          className={params.lang === "ar" ? noto.className : inter.className}>
        <Providers session={session}>
          <Toaster />
          <NextIntlClientProvider locale={params.lang} messages={messages}>
            {children}
          </NextIntlClientProvider>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}









