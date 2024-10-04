import { fetchDoctors } from "@/actions/doctors";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { BanarsForm } from "@/components/forms/banars-form";
import { Heading } from "@/components/ui/heading";
import { IDoctor } from "@/types/doctors";
import React from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: { lang: "ar" | "en" }
};

export default async function Page({ searchParams, params }: paramsProps) {
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchDoctors({
    page:1,
    limit:20,
    filters: search,
    otherfilters:["is_verified=1"]
  });
  
  const doctors: IDoctor[] = res?.data?.data || [] ;
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    {
      title:  pages.banners.banners,
      link: "/dashboard/banars",
    },
    {
      title:  pages.banners.newBanner,
      link: "/dashboard/banars/new",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.banners.newBanner}
        description={pages.banners.CreateAndManageNewBanner}
      />

      <BanarsForm doctors={doctors}  />
    </div>
  );
}
