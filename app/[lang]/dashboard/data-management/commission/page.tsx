import { fetchCommission, fetchTermsConditions } from "@/actions/terms-conditions";
import BreadCrumb from "@/components/breadcrumb";
import { CommissionForm } from "@/components/forms/commission";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commission",
  description: "Commission page",
};

export default async function page() {
  const commission = await fetchCommission();
  const breadcrumbItems = [
    {
      title: "Commission",
      link: "/dashboard/data-management/commission",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Commission"
        description="Here you can modify commission within the app."
      />

      <CommissionForm commission={commission}  />
    </div>
  );
}
