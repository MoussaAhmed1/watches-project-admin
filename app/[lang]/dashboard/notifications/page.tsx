import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import { NotificationForm } from "@/components/forms/send-notifications";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Notifications", link: "/dashboard/notifications" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
            title={`Notification`}
            description="(Direct notifications to individuals or entire roles)"
          />
      <NotificationForm />
    </div>
  );
}
