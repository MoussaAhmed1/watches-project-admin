import { fetchPatients } from "@/actions/patients";
import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import { NotificationForm } from "@/components/forms/send-notifications";
import { Heading } from "@/components/ui/heading";
import React from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page({ searchParams }: paramsProps) {
  const breadcrumbItems = [
    { title: "Notifications", link: "/dashboard/notifications" },
  ];
  const role = typeof searchParams?.role === "string" ? searchParams?.role : "client";
  const res = await fetchPatients({page:1,limit:10,filters:"",role });
  const totalClients = res?.data?.data;
  console.log("totalClients",totalClients)
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
            title={`Notification`}
            description="(Direct notifications to individuals or entire roles)"
          />
      <NotificationForm users={totalClients}/>
    </div>
  );
}