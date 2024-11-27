import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import {  Image as ImageIcon, Phone, User, Mail, Clock2, Building } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import userAvatar from "../../../../../public/assets/user-avatar.png";
import { convertUtcToLocal} from "@/utils/helperFunctions";
import { getDictionary } from "@/app/[lang]/messages";
import RequestDetails from "@/components/details/requests-history";
import { IWatch } from "@/types/watches";
import { fetchSingleWatche } from "@/actions/watches/watches-actions";

export const metadata: Metadata = {
  title: "Watch Details",
};

const page = async ({ params }: { params: { id: string, lang: "ar" | "en" } }) => {
  const res = await fetchSingleWatche(params.id);
  const watch: IWatch = res?.data?.data;
  const { pages, navigation } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation.watches, link: "/dashboard/watches" },
    {
      title: `${watch?.IMEI}`,
      link: `/dashboard/watches/${watch?.IMEI}`,
    },
  ];
  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.WatchDetails.title}
          />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 auto-rows-fr">
            <RequestDetails data={[
              {
                key: pages.users.name,
                value: watch?.watch_user?.name,
                icon: <User className="details_icon" />,
                type: "text",
              },
              {
                key: pages.users.avatar,
                value: (watch?.watch_user?.avatar || userAvatar),
                icon: <ImageIcon className="details_icon" />,
                type: "img",
              },
              {
                key: pages.requestDetails.school,
                value: watch?.watch_user?.school.avatar,
                icon: <ImageIcon className="details_icon" />,
                type: "img",
              },
              {
                key: pages.requestDetails.schoolName,
                value: watch?.watch_user?.school.name,
                icon: <Building className="details_icon" />,
                type: "text",
              },
            ]} title={pages.requestDetails.watchUserDetails} />
            <RequestDetails data={[
              {
                key: pages.users.name,
                value: watch?.watch_user?.parent?.name,
                icon: <User className="details_icon" />,
                type: "text",
              },
              {
                key: pages.users.avatar,
                value: (watch?.watch_user?.parent?.avatar || userAvatar),
                icon: <ImageIcon className="details_icon" />,
                type: "img",
              },
              {
                key: pages.users.phone,
                value: watch?.watch_user?.parent?.phone,
                icon: <Phone className="details_icon" />,
                type: "text",
                dir:"ltr",
              },
              {
                key: pages.users.email,
                value: watch?.watch_user?.parent?.email,
                icon: <Mail className="details_icon" />,
                type: "text",
                dir:"ltr",
              },
              {
                key: pages.requestDetails.joiningDate,
                value: convertUtcToLocal(watch?.watch_user?.parent?.created_at),
                icon: <Clock2 className="details_icon" />,
                type: "text",
                dir:"ltr",
              },
            ]} title={pages.requestDetails.parentDetails} />
            {
              watch?.watch_user?.drivers &&
              watch?.watch_user?.drivers?.map((driver, index) => (
                <RequestDetails key={driver?.id} data={[
                  {
                    key: pages.users.name,
                    value: driver?.name,
                    icon: <User className="details_icon" />,
                    type: "text",
                  },
                  {
                    key: pages.users.avatar,
                    value: (driver?.avatar || userAvatar),
                    icon: <ImageIcon className="details_icon" />,
                    type: "img",
                  },
                  {
                    key: pages.users.phone,
                    value: driver?.phone,
                    icon: <Phone className="details_icon" />,
                    type: "text",
                    dir:"ltr",
                  },
                  {
                    key: pages.users.email,
                    value: driver?.email,
                    icon: <Mail className="details_icon" />,
                    type: "text",
                    dir:"ltr",
                  },
                  {
                    key: pages.requestDetails.joiningDate,
                    value: convertUtcToLocal(driver?.created_at),
                    icon: <Clock2 className="details_icon" />,
                    type: "text",
                    dir:"ltr",
                  },

                ]} title={pages.requestDetails.driverDetails + " " + (index+1)} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
