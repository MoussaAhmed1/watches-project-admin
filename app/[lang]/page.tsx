import { redirect } from "next/navigation";

export default async function Home() {
  redirect(`/ar/dashboard`);
  return null;
}
