import { Metadata } from "next";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { BadgeCheck, CheckCircle, CircleSlash, Clock2, Edit, Image as ImageIcon, MapPin, Phone, Pill, User } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { IPharmacy } from "@/types/pharmacy";
import { AcceptPharmacyRequest, fetchSinglePharmacy } from "@/actions/pharmacies";
import Approve from "@/components/details/role-details/Approve";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageRender } from "@/components/shared/imagesRender/imagesRender";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import nurseImage from "../../../../../../public/assets/doctor.png";
import userAvatar from "../../../../../../public/assets/user-avatar.png";
import { shortenText } from "@/utils/helperFunctions";
import { getDictionary } from "@/app/[lang]/messages";

export const metadata: Metadata = {
  title: "Pharmacy Details | Dacatra Dashboard",
};

const page = async ({ params }: { params: { pharmacyId: string,lang:"ar"|"en" } }) => {
  const res = await fetchSinglePharmacy(params.pharmacyId);
  const pharmacy: IPharmacy = res?.data?.data;
  const {pages} = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: pages.users.pharmacies, link: "/dashboard/pharmacies" },
    {
      title: `${pharmacy?.ph_name}`,
      link: `/dashboard/pharmacies/${pharmacy?.id}`,
    },
  ];

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.users.pharmacy_details}
          />
          <div className="flex gap-1 justify-end">
            {(!pharmacy?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage={pages.users.requestApprovedSuccessfully} title={pages.users.approveRequest} defualt method={AcceptPharmacyRequest} id={pharmacy?.user_id} />
            </div>}
            <Link
              href={`/dashboard/pharmacies/${params?.pharmacyId}/${pharmacy?.user_id}/edit`}
              className={cn(buttonVariants({ variant: "default" }), "p-5")}
            >
               <Edit className="mx-1 h-5 w-5" /> {pages.users.edit}
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full mt-2 bg-background">
          <div className="w-full mx-auto p-4 ">
            <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
              <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
                <ProfileImg
                  className="w-[100px] h-[100px]"
                  src={pharmacy?.logo[0]?.image || nurseImage}
                  alt={pharmacy?.ph_name}
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">
                  {pages.users.name}: {pharmacy?.ph_name}
                  </h1>
                  <p>{pages.users.experience}: {pharmacy?.expierence} {pages.users.years}</p>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{pages.users.summary}</h2>
                <p>{pharmacy?.summery}</p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">{pages.users.details}</h2>

                <div className="flex mt-3">
                  <BadgeCheck className="details_icon" />
                  <p className="mr-1">{pages.users.isVerified}:</p>
                  <p>{pharmacy?.is_verified ? <CheckCircle stroke="#39a845" className="ms-3" /> : <CircleSlash style={{ color: '#8C0101' }} />} </p>
                </div>

                <div className="flex mt-3">
                  <MapPin className="details_icon" />
                  <p className="mr-1">{pages.users.address}:</p>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${pharmacy?.latitude},${pharmacy?.longitude}`}
                    target="_blank"
                    style={{ color: '#3A72EC' }}
                  >
                    {shortenText(pharmacy?.address, 90)}
                  </Link>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">{pages.users.appointments}</h2>
                <div className="flex mt-3">
                  <Clock2 className="details_icon" />
                  <p className="mr-1">{pages.users.openTime}:</p>
                  <p>{pharmacy?.open_time} </p>
                </div>
                <div className="flex mt-3">
                  <Clock2 className="details_icon" />
                  <p className="mr-1">{pages.users.closeTime}:</p>
                  <p>{pharmacy?.close_time} </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.users.categories}</h2>
                <ul className="list-none">
                  {pharmacy?.categories.map((category) => (
                    <li className="flex mt-3" key={category.id}>
                      <Pill className="details_icon" />
                      <p>{category.name} </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.users.ownerInfo}</h2>
                <div className="flex mt-3">
                  <User className="details_icon" />
                  <p className="mr-1">{pages.users.name}:</p>
                  <p>{pharmacy?.user?.name} </p>
                </div>
                <div className="flex mt-3">
                  <Phone className="details_icon" />
                  <p className="mr-1">{pages.users.phone}:</p>
                  <p>{pharmacy?.user?.phone} </p>
                </div>
                <div className="flex mt-3 items-center">
                  <ImageIcon className="details_icon" />
                  <p className="mr-1">{pages.users.avatar}:</p>
                  <ProfileImg
                    src={pharmacy?.user?.avatar || userAvatar}
                    alt={pharmacy?.user?.avatar}
                    className="w-[50px] h-[50px]"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.users.licenseImages}</h2>
                <div className="flex items-center py-2">
                  <ScrollArea>
                    <div className="flex space-x-4 py-4">
                      {pharmacy?.license.map((lic) => (
                        <ImageRender
                          key={lic.id}
                          src={lic?.mage || userAvatar}
                          className="w-[200px]"
                          aspectRatio="portrait"
                          width={250}
                          height={330}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">{pages.users.logoImages}</h2>
                <div className="flex items-center py-2">
                  <ScrollArea>
                    <div className="flex space-x-4 py-4">
                      {pharmacy?.logo.map((lo) => (
                        <ImageRender
                          key={lo.id}
                          src={lo?.image || userAvatar}
                          className="w-[200px]"
                          aspectRatio="portrait"
                          width={250}
                          height={330}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
