import { fetchUsers } from "@/actions/patients";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import { NotificationForm } from "@/components/forms/send-notifications";
import { Heading } from "@/components/ui/heading";
import React from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:"ar"|"en"}
};

export default async function Page({ searchParams,params }: paramsProps) {
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.notification.notifications, link: "/dashboard/notifications" },
    { title: pages.notification.sendNewNotification, link: "/dashboard/notifications/sendNewNotification" },
  ];
  const role = typeof searchParams?.role === "string" ? searchParams?.role : "client";
  const res = await fetchUsers({page:1,limit:100,filters:"",role });
  const totalClients = res?.data?.data;
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
            title={pages.notification.notifications}
            description={`(${pages.notification.directNotifications})`}
          />
      <NotificationForm users={totalClients}/>
    </div>
  );
}
