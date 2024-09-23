import { fetchPharmacyCategories } from "@/actions/pharmacy-categories";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { PharmacyForm } from "@/components/forms/users-forms/pharmacy-form/add-edit-pharmacy";
import React from "react";

export default async function Page({params}:{params:{lang:"ar"|"en"}}) {
  const {pages,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.users.pharmacies, link: "/dashboard/pharmacy" },
    { title: shared.create, link: "/dashboard/pharmacy/new" },
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
