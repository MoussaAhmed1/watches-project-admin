import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import nurseImage from "../../../../../public/assets/doctor.avif";
import BreadCrumb from "@/components/breadcrumb";
import { AcceptDoctorRequest, fetchSingleDoctor } from "@/actions/doctors";
import { ISingleDoctor } from "@/types/doctors";
import { Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import Approve from "@/components/details/role-details/Approve";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchReviews } from "@/actions/reviews";
import { IReview } from "@/types/reviews";
import Reviews from "@/components/details/doctor-details/reviews";
export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = async ({ params, searchParams }: {
  params: { doctorId: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) => {
  const res = await fetchSingleDoctor(params.doctorId);

  //--------------reviews--------------------------
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";

  const res_reviews = await fetchReviews({
    page,
    limit,
    filters: search,
    otherfilters: [`doctor_id=${params.doctorId}`]
  });
  const totalReivews = res_reviews?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalReivews / limit);
  const reviews: IReview[] = res_reviews?.data?.data || [];
  //----------------------------------------------------------------
  const doctor: ISingleDoctor = res?.data?.data;
  const breadcrumbItems = [
    { title: "Doctors", link: "/dashboard/doctors" },
    { title: `${doctor?.name}`, link: `/dashboard/doctors/${doctor?.name}` },
  ];

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex flex-col lg:flex-row gap-1 lg:items-center lg:justify-between justify-start items-start">
          <Heading
            title={`Doctor Details`}
            customStyle="ml-4"
          />
          {(!doctor?.is_verified) && <div className="px-0 md:px-4">
            <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptDoctorRequest} id={doctor?.user_id} />
          </div>}
        </div>
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <Image
                src={doctor?.avatar||nurseImage}
                alt={doctor?.name}
                className="rounded-full"
                width={65}
                height={65}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Name: {doctor?.name}</h1>
                <p>Specialization: {doctor?.specialization?.name}</p>
                <p>Experience: {doctor?.experience} years</p>
                <div className="flex">
                  <span className="mr-2">Rating:</span>
                  <div className="stars flex">
                    {Array.from(
                      { length: Math.ceil(doctor?.rating) },
                      (ele, index) => (
                        <Star key={index} fill="#f7d722" strokeWidth={0} />
                      ),
                    )}
                    {Array.from(
                      { length: Math.ceil(5 - doctor?.rating) },
                      (ele, index) => (
                        <Star key={index} fill="#111" strokeWidth={0} />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Tabs defaultValue="details" className="w-full m-3">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="review">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="tab1">
                  <div className="p-4">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <p>{doctor?.summery}</p>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <h2 className="text-xl font-bold">Consultation Prices</h2>
                    <div className="grid grid-cols-1 mt-2">
                      <div className="flex mt-3">
                        <p className="mr-3">Video Consultation:</p>
                        <p>{doctor?.video_consultation_price} EGP </p>
                      </div>
                      <div className="flex mt-3">
                        <p className="mr-3">Voice Consultation:</p>
                        <p>{doctor?.voice_consultation_price} EGP </p>
                      </div>
                      <div className="flex mt-3">
                        <p className="mr-3"> Home Consultation:</p>
                        <p>{doctor?.home_consultation_price} EGP </p>
                      </div>
                      <div className="flex mt-3">
                        <p className="mr-3">Clinic Consultation:</p>
                        <p>{doctor?.clinic_consultation_price} EGP </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <h2 className="text-xl font-bold">Clinic Information</h2>
                    <p>Name: {doctor?.clinic?.name ?? "-"}</p>
                    <p>Address: {doctor?.clinic?.address ?? "-"}</p>
                  </div>

                </div>
              </TabsContent>
              <TabsContent value="review">
                <Reviews reviews={reviews} pageCount={pageCount} totalitems={totalReivews} pageNo={page} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
