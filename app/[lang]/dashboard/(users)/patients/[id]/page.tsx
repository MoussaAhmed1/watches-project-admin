import Image from "next/image";
import { Metadata } from "next";
import nurseImage from "../../../../../../public/assets/doctor.avif";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { AccountProfile, ClientAddtionalInfo, FamilyMember } from "@/types/patients";
import { fetchClientAddtionalInfo, fetchClientFamilyMember, fetchProfileInfo } from "@/actions/patients";
import { AlertCircle, Calendar, CheckCircle, Edit, Info, Languages, Ruler, User, Weight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
            title={`Patient Details`}
            description={user?.account}
          />
          <Link
            href={`/dashboard/patients/${params.id}/edit`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-1 lg:items-center lg:justify-between justify-start items-start">
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
                <h2 className="text-xl font-bold mb-2">Additional Info</h2>
                <div className="flex-col space-y-3">
                  <p className="flex"><Weight className="details_icon" />weight: {user_AddtionalInfo?.weight ? user_AddtionalInfo?.weight + " Kg" : "-"}</p>
                  <p className="flex"><Ruler className="details_icon" />height: {user_AddtionalInfo?.height ? user_AddtionalInfo?.height + " Cm" : "-"}</p>
                  <p className="flex"><Info className="details_icon" />Allergic reactions: {user_AddtionalInfo?.allergic_reactions ?? "-"}</p>
                  <p className="flex"><Info className="details_icon" />Notes: {user_AddtionalInfo?.notes ?? "-"}</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">Family Members</h2>
                <div className="kinship-list flex gap-3 flex-wrap">
                  {familyMembers?.length > 0 && familyMembers?.map(person => (
                    <div key={person.id} className="kinship-person border min-w-[300px] border-gray-200">
                      <div className="flex items-center gap-2 border border-gray-200 p-2">
                        <Image
                          src={person.avatar || nurseImage}
                          alt={`${person.first_name} ${person.last_name}`}
                          className="avatar rounded-full "
                          width={45}
                          height={45}
                        />
                        <div className="flex flex-col">
                          <h2 className="flex items-center">Name: {person.first_name} {person.last_name}</h2>
                          <p className="flex items-center">Kinship: {person.kinship}</p>
                        </div>
                      </div>

                      <div className="flex-col space-y-3 p-4">
                        <p className="flex items-center"><Info size={16} className="details_icon" /> Gender: {person.gender}</p>
                        <p className="flex items-center"><Calendar size={16} className="details_icon" /> Birth Date: {person.birth_date}</p>
                        <p className="flex items-center"><Info size={16} className="details_icon" /> Height: {person.height} cm</p>
                        <p className="flex items-center"><Info size={16} className="details_icon" /> Weight: {person.weight} kg</p>
                        <p className="flex items-center"><AlertCircle size={16} className="details_icon" /> Allergic Reactions: {person.allergic_reactions || 'None'}</p>
                        <p className="flex items-center"><CheckCircle size={16} className="details_icon" /> Notes: {person.notes}</p>
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
