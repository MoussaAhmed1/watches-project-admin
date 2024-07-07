import Image from "next/image";
import { Metadata } from "next";
import nurseImage from "../../../../../public/assets/doctor.avif";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { AccountProfile, ClientAddtionalInfo } from "@/types/patients";
import { fetchClientAddtionalInfo, fetchProfileInfo } from "@/actions/patients";
import { Calendar, Info, Languages } from "lucide-react";
export const metadata: Metadata = {
  title: "Client Deatails",
  description:
    "Client Deatails - Dacatra Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string }
}) => {
  const breadcrumbItems = [
    { title: "Patients", link: "/dashboard/patients" },
    { title: "Details", link: "/dashboard/patients/id" },
  ];
  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const user: AccountProfile = res?.data?.data;
  //fetch Client Addtional Info
  const res_AddtionalInfo = await fetchClientAddtionalInfo({ userId: params.id });
  const user_AddtionalInfo: ClientAddtionalInfo = res_AddtionalInfo?.data?.data;

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex flex-col lg:flex-row gap-1 lg:items-center lg:justify-between justify-start items-start">
          <Heading
            title={`Patient Details`}
            description={user?.first_name + " " + user?.last_name}
            customStyle="ml-4"
          />
        </div>
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <Image
                src={user?.avatar || nurseImage}
                alt={user?.first_name + " " + user?.last_name}
                className="rounded-full"
                width={65}
                height={65}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Name: {user?.first_name + " " + user?.last_name}</h1>
                <h6>Phone: {user?.phone}</h6>
                {user?.email && <h6>Email: {user?.email}</h6>}
              </div>
            </div>
            <div className="tab1">
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Profile Info</h2>
                <div className="grid grid-cols-1">
                  <div className="flex mt-3">
                    <Calendar className="details_icon" />
                    <p className="mr-1">Birth Date:</p>
                    <p>{user?.birth_date}</p>
                  </div>
                  <div className="flex mt-3">
                    <Info className="details_icon" />
                    <p className="mr-1">Gender:</p>
                    <p>{user?.gender}</p>
                  </div>
                  <div className="flex mt-3">
                    <Languages className="details_icon" />
                    <p className="mr-1">Language:</p>
                    <p>{user?.language == "en" ? "English" : "Arabic"}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Additional Info</h2>
                <p>weight: {user_AddtionalInfo?.weight ?? "-"}</p>
                <p>height: {user_AddtionalInfo?.height ?? "-"}</p>
                <p>Allergic reactions: {user_AddtionalInfo?.allergic_reactions ?? "-"}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
