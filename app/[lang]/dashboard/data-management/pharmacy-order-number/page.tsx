import { fetchPharmacyOrder, fetchTermsConditions } from "@/actions/terms-conditions";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyOrderForm } from "@/components/forms/pharmacy-order-number";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmacy Orders",
  description: "Pharmacy Order page",
};

export default async function page() {
  const PharmacyOrder = await fetchPharmacyOrder();
  const breadcrumbItems = [
    {
      title: "Pharmacy Orders",
      link: "/dashboard/data-management/pharmacy-order-number",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Pharmacy Orders"
        description="Here you can modify the maximum number of pharmacy orders within the app."
      />

      <PharmacyOrderForm pharmacy_order_number={PharmacyOrder}  />
    </div>
  );
}
