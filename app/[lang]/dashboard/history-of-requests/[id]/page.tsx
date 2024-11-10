import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { BadgeCheck, Clock2, Image as ImageIcon, Building, Phone, Pill, User, Mail } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { ISingleRequest } from "@/types/watches/requests";
import { fetchSingleRequest } from "@/actions/requests/requests-history-actions";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
import userAvatar from "../../../../../public/assets/user-avatar.png";
import { formatCreatedAtDateAsDateTime, getCustomNameKeyLang, shortenText } from "@/utils/helperFunctions";
import { getDictionary } from "@/app/[lang]/messages";

export const metadata: Metadata = {
  title: "Requests Details | Dacatra Dashboard",
};

const page = async ({ params }: { params: { id: string, lang: "ar" | "en" } }) => {
  const res = await fetchSingleRequest(params.id);
  const request: ISingleRequest = res?.data?.data;
  const { pages, navigation } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: navigation.historyOfRequests, link: "/dashboard/history-of-requests" },
    {
      title: `${request?.code}`,
      link: `/dashboard/history-of-requests/${request?.id}`,
    },
  ];
  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.requestDetails.title}
            description={`${formatCreatedAtDateAsDateTime(request.created_at)} - ${request?.status}`}
          />
        </div>
        <div className="mx-auto w-full mt-2 bg-background">
          <div className="w-full mx-auto p-4 ">
            <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">{pages.users.details}</h2>
                <div className="flex mt-3">
                  <Clock2 className="details_icon" />
                  <p className="mr-1">{pages.requestDetails.createdAt}:</p>
                  <p>{formatCreatedAtDateAsDateTime(request?.created_at)} </p>
                </div>

                <div className="flex mt-3">
                  <BadgeCheck className="details_icon" />
                  <p className="mr-1">{pages.requestDetails.status}:</p>
                  <p>{request.status} </p>
                </div>

                <div className="flex mt-3">
                  <Clock2 className="details_icon" />
                  <p className="mr-1">{pages.requestDetails.updatedAt}:</p>
                  <p>{formatCreatedAtDateAsDateTime(request?.updated_at)} </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">


                <h2 className="text-xl font-bold">{pages.requestDetails.userDetails}{" "}{request?.is_parent ? `(${getCustomNameKeyLang("Parent", "والد")})` : `(${getCustomNameKeyLang("Driver", "سائق")})`}</h2>
                <div className="flex mt-3">
                  <User className="details_icon" />
                  <p className="mr-1">{pages.users.name}:</p>
                  <p>{request?.user?.name} </p>
                </div>
                <div className="flex mt-3 items-center">
                  <ImageIcon className="details_icon" />
                  <p className="mr-1">{pages.users.avatar}:</p>
                  <ProfileImg
                    src={request?.user?.avatar || userAvatar}
                    alt={request?.user?.avatar}
                    className="w-[50px] h-[50px]"
                  />
                </div>
                <div className="flex mt-3">
                  <Phone className="details_icon" />
                  <p className="mr-1">{pages.users.phone}:</p>
                  <p>{request?.user?.phone} </p>
                </div>
                <div className="flex mt-3">
                  <Mail className="details_icon" />
                  <p className="mr-1">{pages.users.email}:</p>
                  <p>{request?.user?.email} </p>
                </div>


              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.requestDetails.watchUserDetails}</h2>
                <div className="flex mt-3">
                  <User className="details_icon" />
                  <p className="mr-1">{pages.users.name}:</p>
                  <p>{request?.watch_user?.name} </p>
                </div>
                <div className="flex mt-3 items-center">
                  <ImageIcon className="details_icon" />
                  <p className="mr-1">{pages.users.avatar}:</p>
                  <ProfileImg
                    src={request?.watch_user?.avatar || userAvatar}
                    alt={request?.watch_user?.avatar}
                    className="w-[50px] h-[50px]"
                  />
                </div>

                <div className="flex mt-3">
                  <Phone className="details_icon" />
                  <p className="mr-1">{pages.users.phone}:</p>
                  <p>{request?.watch_user?.phone} </p>
                </div>

                <div className="flex mt-3 items-center">
                  <Building className="details_icon" />
                  <p className="mr-1">{pages.requestDetails.school}:</p>
                  <p>{request?.watch_user?.school.name} </p>
                </div>

                <div className="flex mt-3 items-center">
                  <ImageIcon className="details_icon" />
                  <p className="mr-1">{pages.requestDetails.school}:</p>
                  <ProfileImg
                    src={request?.watch_user?.school.avatar || userAvatar}
                    alt={request?.watch_user?.school.avatar}
                    className="w-[50px] h-[50px]"
                  />

                </div>


              </div>

              {!(request?.is_parent) ?
                <div className="p-4 border-t border-gray-200">
                  <h2 className="text-xl font-bold">{pages.requestDetails.parentDetails}</h2>
                  <div className="flex mt-3">
                    <User className="details_icon" />
                    <p className="mr-1">{pages.users.name}:</p>
                    <p>{request?.parent?.name} </p>
                  </div>
                  <div className="flex mt-3 items-center">
                    <ImageIcon className="details_icon" />
                    <p className="mr-1">{pages.users.avatar}:</p>
                    <ProfileImg
                      src={request?.parent?.avatar || userAvatar}
                      alt={request?.parent?.avatar}
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                  <div className="flex mt-3">
                    <Phone className="details_icon" />
                    <p className="mr-1">{pages.users.phone}:</p>
                    <p>{request?.parent?.phone} </p>
                  </div>

                  <div className="flex mt-3">
                    <Mail className="details_icon" />
                    <p className="mr-1">{pages.users.email}:</p>
                    <p>{request?.parent?.email} </p>
                  </div>

                </div>
                :
                request?.driver? 
                <div className="p-4 border-t border-gray-200">
                  <h2 className="text-xl font-bold">{pages.requestDetails.driverDetails}</h2>
                  <div className="flex mt-3">
                    <User className="details_icon" />
                    <p className="mr-1">{pages.users.name}:</p>
                    <p>{request?.driver?.name} </p>
                  </div>
                  <div className="flex mt-3 items-center">
                    <ImageIcon className="details_icon" />
                    <p className="mr-1">{pages.users.avatar}:</p>
                    <ProfileImg
                      src={request?.driver?.avatar || userAvatar}
                      alt={request?.driver?.avatar}
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                  <div className="flex mt-3">
                    <Phone className="details_icon" />
                    <p className="mr-1">{pages.users.phone}:</p>
                    <p>{request?.driver?.phone} </p>
                  </div>

                  <div className="flex mt-3">
                    <Mail className="details_icon" />
                    <p className="mr-1">{pages.users.email}:</p>
                    <p>{request?.driver?.email} </p>
                  </div>

                </div>
              :"-"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
