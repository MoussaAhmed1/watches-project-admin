import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { SingleNotification } from "@/types/notifications";
import { fetchSingleNotification } from "@/actions/notifications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CheckCircle, FileText, Info, Users2 } from 'lucide-react';
import { formatCreatedAtDateAsDateTime } from "@/utils/helperFunctions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
import Link from "next/link";
import { useCallback } from "react";
import { Role } from "@/types/patients";


export const metadata: Metadata = {
  title: "Notification Deatails",
  description:
    "Notification Deatails - Dacatra Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string }
}) => {
  const breadcrumbItems = [
    { title: "Notifications", link: "/dashboard/notifications" },
    { title: "Details", link: "/dashboard/notifications/id" },
  ];
  //----------------------------------------------------------------
  const res = await fetchSingleNotification(params.id);
  const notification: SingleNotification = res?.data?.data;
  const renderRole = ()=>{
    if(notification?.role === Role.CLIENT ){
      return "patients"
    }
    else if(notification?.role === Role.ADMIN ){
      return "admins"
    }
    else if(notification?.role === Role.DOCTOR ){
      return "doctors"
    }
    else if(notification?.role === Role.PHARMACY ){
      return "pharmacies"
    }
    else if(notification?.role === Role.NURSE ){
      return "nurses"
    }
  }
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-baseline justify-between">
        <Heading
          title={`Notification details`}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, flexDirection: "column" }}>
        <Card style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Notification Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul style={{ listStyle: 'none', paddingLeft: 0, display: "flex", flexDirection: "column", gap: 5, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  English Title: {notification?.title_en ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  Arabic Title: {notification?.title_ar ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  English Text: {notification?.text_en ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  Arabic Text: {notification?.text_ar ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Users2 style={{ marginRight: '0.5rem' }} />
                  Role: {notification?.role ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <CalendarClock style={{ marginRight: '0.5rem' }} />
                  Expiration days: {notification?.text_ar} days
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <CheckCircle style={{ marginRight: '0.5rem' }} />
                  Is Read: {notification?.is_read ? "Yes" : "No"}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  Created At: {formatCreatedAtDateAsDateTime(notification?.created_at)}
                </li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
        {notification?.users &&
          <Card className="flex gap-2 flex-row sm:flex-col flex-wrap ">
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center' }}><Users2 style={{ marginRight: '0.5rem' }} /> Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center py-2 ">
                <ScrollArea>
                  <div className="flex gap-4 overflow-hidden flex-wrap">
                    {notification?.users?.map((user) => (
                      <Card key={user?.id} style={{ display:"flex",minWidth: '200px', maxWidth: "240px",minHeight:70, flexWrap: "wrap", alignItems: "center",justifyContent:"start",gap:3,padding:6 }}>
                          <ProfileImg
                            className="w-[40px] h-[40px]"
                            src={user?.avatar}
                            alt={user?.name}
                          />
                       { notification?.role ?  <Link href={`/dashboard/${renderRole()}/${user?.id}`}> <h2 className="text-sm font-bold">{user.name}</h2></Link> :<h2 className="text-sm font-bold">{user.name}</h2>}
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        }
      </div>
    </div>
  );
};

export default page;
