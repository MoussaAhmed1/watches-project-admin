import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchNotifications } from "@/actions/notifications";
import BreadCrumb from "@/components/breadcrumb";
import { NotificationsColumns } from "@/components/tables/notifications-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/notifications";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Notifications", link: "/dashboard/notifications" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:string}
};

export default async function page({ searchParams,params}: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchNotifications({
    page,
    limit,
    filters: search,
  });
  const totalNotifications = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalNotifications / limit);
  const notifications: Notification[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Notifications (${totalNotifications})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/notifications/send-notification`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" />Send New Notification
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="notifications"
          pageNo={page}
          columns={NotificationsColumns}
          totalitems={totalNotifications}
          data={notifications as unknown as Notification[]}
          pageCount={pageCount}
          withSearch={false}
        />
      </div>
    </>
  );
}
