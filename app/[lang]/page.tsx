import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/_options";
import LoginForm from "@/components/forms/auth/login";

export default async function Home({ params }: { params: { lang: "ar" | "en" } }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <LoginForm  lang={params.lang} />
}
