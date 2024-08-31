import Image from "next/image";
import userAvatar from "../../../../../../public/assets/user-avatar.png";
import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { AccountProfile } from "@/types/patients";
import { fetchProfileInfo } from "@/actions/patients";
import { Calendar, Edit, Info, Languages, ShieldCheck, } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";
export const metadata: Metadata = {
  title: "Admin Deatails",
  description:
    "Admin Deatails - Dacatra Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string,lang:"ar"|"en" }
}) => {

  const {pages,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.users.Admins, link: "/dashboard/admins" },
    { title: shared.details, link: "/dashboard/admins/id" },
  ];
  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const admin: AccountProfile = res?.data?.data;
  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.users.admin_details}
            description={admin?.account}
          />
          <Link href={`/${params?.lang}/dashboard/admins/${params.id}/edit`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Edit className="mx-1 h-4 w-4" /> {pages.users.edit}
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-1 lg:items-center lg:justify-between justify-start items-start">
        </div>
        <div className="w-full mx-auto p-4">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <Image
                src={admin?.avatar || userAvatar}
                alt={admin?.first_name + " " + admin?.last_name}
                className="rounded-full"
                width={65}
                height={65}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{pages.users.name}: {admin?.first_name + " " + admin?.last_name}</h1>
                <h6>{pages.users.phone}: {admin?.phone}</h6>
                {admin?.email && <h6>{pages.users.email}: {admin?.email}</h6>}
              </div>
            </div>
            <div className="tab1">
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.users.profileInfo}</h2>
                <div className="grid grid-cols-1">
                  <div className="flex mt-3">
                    <Calendar className="details_icon" />
                    <p className="mr-1">{pages.users.birthDate}:</p>
                    <p>{admin?.birth_date}</p>
                  </div>
                  <div className="flex mt-3">
                    <Info className="details_icon" />
                    <p className="mr-1">{pages.users.gender}:</p>
                    <p>{admin?.gender}</p>
                  </div>
                  <div className="flex mt-3">
                    <Languages className="details_icon" />
                    <p className="mr-1">{pages.users.language}:</p>
                    <p>{admin?.language == "en" ? "English" : "Arabic"}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.users.permissions}</h2>
                <ul className="list-none">
                  {admin?.premessions?.map((permission) => (
                    <li className="flex mt-3" key={permission}>
                      <ShieldCheck className="details_icon" />
                      <p>{permission}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
