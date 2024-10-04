import { fetchPharmacyOrder, fetchTermsConditions } from "@/actions/terms-conditions";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyOrderForm } from "@/components/forms/pharmacy-order-number";
import { Heading } from "@/components/ui/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmacy Orders",
  description: "Pharmacy Order page",
};

export default async function page({params}:{params:{lang:"ar"|"en"}}) {
  const PharmacyOrder = await fetchPharmacyOrder();
  const {pages} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    {
      title: pages.general_settings.pharmacyOrders,
      link: "/dashboard/data-management/pharmacy-order-number",
    },
  ];
  return (
    <div className="flex-1 space-y-2ش p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.general_settings.pharmacyOrders}
        description={pages.general_settings.pharmacyOrdersDescription}
      />

      <PharmacyOrderForm pharmacy_order_number={PharmacyOrder}  />
    </div>
  );
}
