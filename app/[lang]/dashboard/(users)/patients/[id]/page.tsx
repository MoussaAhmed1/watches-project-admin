import Image from "next/image";
import { Metadata } from "next";
import userAvatar from "../../../../../../public/assets/user-avatar.png";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { AccountProfile, ClientAddtionalInfo, FamilyMember } from "@/types/patients";
import { fetchClientAddtionalInfo, fetchClientFamilyMember, fetchProfileInfo } from "@/actions/patients";
import { AlertCircle, Calendar, CheckCircle, Edit, Info, Languages, Ruler, User, Weight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/app/[lang]/messages";
export const metadata: Metadata = {
  title: "Client Deatails",
  description:
    "Client Deatails - TimeToGo Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string, lang: "ar" | "en" }
}) => {
  const { navigation, shared, pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation.patients, link: "/dashboard/patients" },
    { title: shared.details, link: "/dashboard/patients/id" },
  ];
  //----------------------------------------------------------------
  const res = await fetchProfileInfo({ userId: params.id });
  const user: AccountProfile = res?.data?.data;
  const res_family: { data: { data: FamilyMember[] } } = await fetchClientFamilyMember({ userId: params.id });
  const familyMembers: FamilyMember[] = res_family?.data?.data;
  //fetch Client Addtional Info
  const res_AddtionalInfo = await fetchClientAddtionalInfo({ userId: params.id });
  const user_AddtionalInfo: ClientAddtionalInfo = res_AddtionalInfo?.data?.data;


  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.users.patients_details}
            description={user?.account}
          />
          <Link
            href={`/${params.lang}/dashboard/patients/${params.id}/edit`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Edit className="mx-1 h-4 w-4" /> {pages.users.edit}
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-1 lg:items-center lg:justify-between justify-start items-start">
        </div>
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#1abc9c] text-white">
              <Image
                src={user?.avatar || userAvatar}
                alt={user?.first_name + " " + user?.last_name}
                className="rounded-full"
                width={65}
                height={65}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{pages.users.name}: {user?.first_name + " " + user?.last_name}</h1>
                <h6>{pages.users.phone}: {user?.phone}</h6>
                {user?.email && <h6>{pages.users.email}: {user?.email}</h6>}
              </div>
            </div>
            <div className="tab1">
              <div className="p-4 border-t border-gray-300">
                <h2 className="text-xl font-bold">{pages.users.profileInfo}</h2>
                <div className="grid grid-cols-1">
                  <div className="flex mt-3">
                    <Calendar className="details_icon" />
                    <p className="mr-1">{pages.users.birthDate}:</p>
                    <p>{user?.birth_date}</p>
                  </div>
                  <div className="flex mt-3">
                    <Info className="details_icon" />
                    <p className="mr-1">{pages.users.gender}:</p>
                    <p>{user?.gender}</p>
                  </div>
                  <div className="flex mt-3">
                    <Languages className="details_icon" />
                    <p className="mr-1">{pages.users.language}:</p>
                    <p>{user?.language == "en" ? "English" : "Arabic"}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-300">
                <h2 className="text-xl font-bold mb-2">{pages.users.additionalInfo}</h2>
                <div className="flex-col space-y-3">
                  <p className="flex"><Weight className="details_icon" />{pages.users.weight}: {user_AddtionalInfo?.weight ? user_AddtionalInfo?.weight + " " + pages.users.kg : "-"}</p>
                  <p className="flex"><Ruler className="details_icon" />{pages.users.height}: {user_AddtionalInfo?.height ? user_AddtionalInfo?.height + " " + pages.users.cm : "-"}</p>
                  <p className="flex"><Info className="details_icon" />{pages.users.allergicReactions}: {user_AddtionalInfo?.allergic_reactions || pages.users.none}</p>
                  <p className="flex"><Info className="details_icon" />{pages.users.notes}: {user_AddtionalInfo?.notes || pages.users.none}</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-300">
                <h2 className="text-xl font-bold mb-2">{pages.users.familyMembers}</h2>
                <div className="kinship-list flex gap-3 flex-wrap">
                  {familyMembers?.length > 0 && familyMembers?.map(person => (
                    <div key={person.id} className="kinship-person border md:w-[49%] w-full  border-gray-300">
                      <div className="flex items-center gap-2 border-b border-gray-300 p-2">
                        <Image
                          src={person.avatar || userAvatar}
                          alt={`${person.first_name} ${person.last_name}`}
                          className="avatar rounded-full "
                          width={45}
                          height={45}
                        />
                        <div className="flex flex-col">
                          <h2 className="flex items-center">{pages.users.name}: {person.first_name} {person.last_name}</h2>
                          <p className="flex items-center">{pages.users.kinship}: {person.kinship}</p>
                        </div>
                      </div>

                      <div className="flex-col space-y-3 p-4">
                        <p className="flex items-start"><Info size={16} className="details_icon" /> {pages.users.gender}: {person.gender}</p>
                        <p className="flex items-start"><Calendar size={16} className="details_icon" /> {pages.users.birthDate}: {person.birth_date}</p>
                        <p className="flex items-start"><Info size={16} className="details_icon" /> {pages.users.height}: {person.height} {" "} {pages.users.kg}</p>
                        <p className="flex items-start"><Info size={16} className="details_icon" /> {pages.users.weight}: {person.weight} {" "} {pages.users.cm}</p>
                        <p className="flex items-start"><span><AlertCircle size={16} className="details_icon" /></span> {pages.users.allergicReactions}: {person.allergic_reactions || pages.users.none}</p>
                        <p className="flex items-start"><span><CheckCircle size={16} className="details_icon" /></span> {pages.users.notes}: {person.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default page;
