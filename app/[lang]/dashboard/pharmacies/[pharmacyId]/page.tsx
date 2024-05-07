import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import doctorImage from "../../../../../public/assets/doctor.avif";
import { CheckCircle, CircleSlash, Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { IPharmacy } from "@/types/pharmacy";
import { AcceptPharmacyRequest, fetchSinglePharmacy } from "@/actions/pharmacies";
import { formatCreatedAtDate } from "@/utils/helperFunctions";
import Approve from "@/components/details/role-details/Approve";
export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
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
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex flex-col md:flex-row gap-1 items-center justify-between">
          <Heading
            title={`Pharmacy Details`}
            customStyle="ml-4"
          />
          {(!pharmacy?.is_verified) && <div className="px-4">
            <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptPharmacyRequest} id={params?.pharmacyId} />
          </div>}
        </div>
        <div className="mx-auto w-full mt-8 bg-background">
          <div className="w-full mx-auto p-4 ">
            <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
              <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
                {pharmacy?.logo?.map((logo) => (
                  <Image
                    key={logo.id}
                    src={logo.image}
                    alt={pharmacy?.ph_name}
                    className="w-32 h-32 rounded-full"
                    width={500}
                    height={500}
                  />
                ))}
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
                <p className="mb-2">Created at: {formatCreatedAtDate(pharmacy?.created_at)}</p>
                <p className="mb-2">Updated at: {formatCreatedAtDate(pharmacy?.updated_at)}</p>
                <p className="flex items-center mb-2">Is verified: {pharmacy?.is_verified ? <CheckCircle stroke="#39a845" className="ms-3" /> : <CircleSlash style={{ color: '#8C0101' }} />}</p>
                <p className="mb-2">Address: {pharmacy?.address}</p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-2">Appointments</h2>
                <p className="mb-2">Open at: {pharmacy?.open_time}</p>
                <p>Close at: {pharmacy?.close_time}</p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Categories</h2>
                <ul className="list-disc list-inside">
                  {pharmacy?.categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Licenses</h2>
                <div className="flex items-center py-2">
                  {pharmacy?.license.map((license) => (
                    <div key={license.id} className="w-1/4 mx-2">
                      <Image
                        src={license.mage}
                        alt={license?.mage}
                        width={500}
                        height={500}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold">Logo</h2>
                <div className="flex items-center py-1">
                  {pharmacy?.logo.map((logo) => (
                    <div key={logo.id} className="w-1/4 mx-2">
                      <Image
                        src={logo.image}
                        alt={logo?.image}
                        width={1000}
                        height={1000}
                      />
                    </div>
                  ))}
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
