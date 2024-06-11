import { fetchDoctors } from "@/actions/doctors";
import BreadCrumb from "@/components/breadcrumb";
import { BanarsForm } from "@/components/forms/banars-form";
import { Heading } from "@/components/ui/heading";
import { IDoctor } from "@/types/doctors";
import React from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page({ searchParams }: paramsProps) {
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchDoctors({
    page:1,
    limit:20,
    filters: search,
    otherfilters:["is_verified=1"]
  });
  
  const doctors: IDoctor[] = res?.data?.data || [] ;
  console.log('doctors',doctors)
  const breadcrumbItems = [
    {
      title:  "New Banner",
      link: "/dashboard/banars/new",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={`New Banner`}
        description="(Create and manage a new banner)"
      />

      <BanarsForm doctors={doctors}  />
    </div>
  );
}
