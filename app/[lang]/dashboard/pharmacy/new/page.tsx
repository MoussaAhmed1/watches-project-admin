import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyForm } from "@/components/forms/users-forms/pharmacy-form/add-edit-pharmacy";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "pharmacies", link: "/dashboard/pharmacies" },
    { title: "Create", link: "/dashboard/pharmacies/new" },
  ];
  const categoriesRes = await fetchPharmacyCategories({
    page: 1,
    limit: 10,

  });
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}   />
      <PharmacyForm categories={categoriesRes?.data?.data} />
    </div>
  );
}
