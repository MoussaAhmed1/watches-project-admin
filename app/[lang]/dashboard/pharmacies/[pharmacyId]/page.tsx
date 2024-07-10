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
export const metadata: Metadata = {
  title: "Pharmacy Details | Dacatra Dashboard",
};

const page = async ({ params }: { params: { pharmacyId: string } }) => {
  const res = await fetchSinglePharmacy(params.pharmacyId);
  const pharmacy: IPharmacy = res?.data?.data;
  const breadcrumbItems = [
    { title: "Pharmacies", link: "/dashboard/pharmacies" },
    {
      title: `${pharmacy?.ph_name}`,
      link: `/dashboard/pharmacies/${pharmacy?.id}`,
    },
  ];

  return (
    <>
      <div className="mx-auto w-full mt-4 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={`Pharmacy Details`}
          />
          <div className="flex gap-1 justify-end">
          {(!pharmacy?.is_verified) && <div className="px-0 md:px-4">
            <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptPharmacyRequest} id={pharmacy?.user_id} />
          </div>}
            <Link
              href={`/dashboard/pharmacies/${params?.pharmacyId}/${pharmacy?.user_id}/edit`}
              className={cn(buttonVariants({ variant: "default" }), "p-5")}
            >
              <Edit className="mr-2 h-5 w-5" /> Edit
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full mt-2 bg-background">
          <div className="w-full mx-auto p-4 ">
            <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
              <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
                <ProfileImg
                  className="w-[100px] h-[100px]"
                  src={pharmacy?.logo[0].image}
                  alt={pharmacy?.ph_name}
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">
                    Name: {pharmacy?.ph_name}
                  </h1>
                  <p>Experience: {pharmacy?.expierence} years</p>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">Summary</h2>
                <p>{pharmacy?.summery}</p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">Details</h2>

                <div className="flex mt-3">
                  <BadgeCheck className="details_icon" />
                  <p className="mr-1">Is verified:</p>
                  <p>{pharmacy?.is_verified ? <CheckCircle stroke="#39a845" className="ms-3" /> : <CircleSlash style={{ color: '#8C0101' }} />} </p>
                </div>

                <div className="flex mt-3">
                  <MapPin className="details_icon" />
                  <p className="mr-1">Address:</p>
                  <p>{pharmacy?.address}</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">Appointments</h2>
                <div className="flex mt-3">
                  <Clock2 className="details_icon" />
                  <p className="mr-1">Open at:</p>
                  <p>{pharmacy?.open_time} </p>
                </div>
                <div className="flex mt-3">
                  <Clock2 className="details_icon" />
                  <p className="mr-1">Close at:</p>
                  <p>{pharmacy?.close_time} </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Categories</h2>
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
                <h2 className="text-xl font-bold">Owner Info</h2>
                <div className="flex mt-3">
                  <User className="details_icon" />
                  <p className="mr-1">Name:</p>
                  <p>{pharmacy?.user?.name} </p>
                </div>
                <div className="flex mt-3">
                  <Phone className="details_icon" />
                  <p className="mr-1">Phone:</p>
                  <p>{pharmacy?.user?.phone} </p>
                </div>
                <div className="flex mt-3 items-center">
                  <ImageIcon className="details_icon"/>
                  <p className="mr-1">Avatar:</p>
                  <ProfileImg
                    src={pharmacy?.user?.avatar??""}
                    alt={pharmacy?.user?.avatar}
                    className="w-[50px] h-[50px]"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Licenses</h2>
                <div className="flex items-center py-2">
                  <ScrollArea>
                    <div className="flex space-x-4 py-4">
                      {pharmacy?.license.map((lic) => (
                        <ImageRender
                          key={lic.id}
                          src={lic?.mage}
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
                <h2 className="text-xl font-bold">Logo</h2>
                <div className="flex items-center py-2">
                  <ScrollArea>
                    <div className="flex space-x-4 py-4">
                      {pharmacy?.logo.map((lo) => (
                        <ImageRender
                          key={lo.id}
                          src={lo?.image}
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
