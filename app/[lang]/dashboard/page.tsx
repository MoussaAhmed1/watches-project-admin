import { redirect } from "next/navigation";

export default async function page() {
  redirect("/dashboard/history-of-requests/pending-requests")
}
