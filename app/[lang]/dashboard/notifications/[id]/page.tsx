import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CheckCircle, Info, Users2 } from 'lucide-react';
import { convertUtcToLocal } from "@/utils/helperFunctions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
import Link from "next/link";
import { Role } from "@/types/users";
import { getDictionary } from "@/app/[lang]/messages";
import { fetchSingleNotification } from "@/actions/notifications";
import { SingleNotification } from "@/types/notifications";
import userAvatar from "../../../../../public/assets/user-avatar.png";


export const metadata: Metadata = {
  title: "Notification Deatails",
  description:
    "Notification Deatails - Dacatra Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string,lang:"ar"|"en" }
}) => {
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.notification.notifications, link: "/dashboard/notifications" },
    { title: pages.notification.notificationDetails, link: "/dashboard/notifications/sendNewNotification" },
  ];
  //----------------------------------------------------------------
  const res = await fetchSingleNotification(params.id);
  const notification: SingleNotification = res?.data?.data;
  const renderRole = ()=>{
    if(notification?.role === Role.parents ){
      return "parents"
    }
    else if(notification?.role === Role.admins ){
      return "admins"
    }
    else if(notification?.role === Role.drivers ){
      return "drivers"
    }
    else if(notification?.role === Role.schools ){
      return "schools"
    }
    else if(notification?.role === Role.security ){
      return "security"
    }
  }
  const renderRoleAstext = ()=>{
    if(notification?.role === Role.parents ){
      return pages.notification.parents
    }
    else if(notification?.role === Role.admins ){
      return pages.notification.admin
    }
    else if(notification?.role === Role.drivers ){
      return pages.notification.drivers
    }
    else if(notification?.role === Role.schools ){
      return pages.notification.schools
    }
    else if(notification?.role === Role.security ){
      return pages.notification.security
    }
  }
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-baseline justify-between">
        <Heading
          title={pages.notification.notifications}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, flexDirection: "column" }}>
        <Card style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>{pages.notification.notifications}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul style={{ listStyle: 'none', paddingLeft: 0, display: "flex", flexDirection: "column", gap: 5, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.englishTitle}: {notification?.title_en ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.arabicTitle}: {notification?.title_ar ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.englishText}: {notification?.text_en ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.arabicText}: {notification?.text_ar ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Users2 style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.role}: {renderRoleAstext() ?? " - "}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <CalendarClock style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                 {pages.notification.expirationDays}: {notification?.text_ar} {pages.notification.days}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <CheckCircle style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.isRead}: {notification?.is_read ? pages.notification.yes : pages.notification.no}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} className="rtl:text-right text-left" dir="ltr">
                  <Info style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} />
                  {pages.notification.createdAt}: {convertUtcToLocal(notification?.created_at)}
                </li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
        {notification?.users &&
          <Card className="flex gap-2 flex-row sm:flex-col flex-wrap ">
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center' }}><Users2 style={{ marginRight: '0.5rem',marginLeft:"0.5rem" }} /> {pages.notification.users}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center py-2 ">
                <ScrollArea>
                  <div className="flex gap-4 overflow-hidden flex-wrap">
                    {notification?.users?.map((user) => (
                      <Card key={user?.id} style={{ display:"flex",minWidth: '200px', maxWidth: "240px",minHeight:70, flexWrap: "wrap", alignItems: "center",justifyContent:"start",gap:3,padding:6 }}>
                          <ProfileImg
                            className="w-[40px] h-[40px]"
                            src={user?.avatar?? userAvatar}
                            alt={user?.name}
                          />
                       { notification?.role ?  <Link href={`/dashboard/users/${renderRole()}/${user?.id}`}> <h2 className="text-sm font-bold">{user?.name}</h2></Link> :<h2 className="text-sm font-bold">{user?.name}</h2>}
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
