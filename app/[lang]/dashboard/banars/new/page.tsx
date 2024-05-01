import BreadCrumb from "@/components/breadcrumb";
import { BanarsForm } from "@/components/forms/banars-form";
import { Heading } from "@/components/ui/heading";
import React from "react";



export default async function Page() {
  const banar = {
    id: "222195e2-ab5a-4667-be06-08d4ea546a80",
    banar:
      "http://31.220.73.176:3000/v1/storage/banars/i will amazingly edit your picture or poster for a hot instagram post or your brand_-1714414408645.jpeg",
    started_at: new Date("2024-04-25T23:00:00.000Z"),
    ended_at: new Date("2024-06-17T23:00:00.000Z"),
    is_active: true,
  };

  const breadcrumbItems = [
    {
      title: banar ? "Edit Banar" : "New Banar",
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

      <BanarsForm banar={banar} />
    </div>
  );
}
