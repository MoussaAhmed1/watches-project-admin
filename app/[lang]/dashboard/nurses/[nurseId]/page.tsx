import Image from "next/image";
import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { AcceptNurseRequest, fetchSingleNurse } from "@/actions/nurses";
import nurseImage from "../../../../../public/assets/doctor.avif";
import { Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import Approve from "@/components/details/role-details/Approve";
import { ISingleNurse } from "@/types/nurses";
import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchReviews } from "@/actions/reviews";
import { IReview } from "@/types/reviews";
import Reviews from "@/components/details/doctor-details/reviews";
export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = async ({ params, searchParams }: {
  params: { nurseId: string }, searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) => {
  const res = await fetchSingleNurse(params.nurseId);
  const nurse: ISingleNurse = res?.data?.data;
  //--------------reviews--------------------------
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";

  const res_reviews = await fetchReviews({
    page,
    limit,
    filters: search,
    otherfilters: [`nurse_id=${params.nurseId}`]
  });
  const totalReivews = res_reviews?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalReivews / limit);
  const reviews: IReview[] = res_reviews?.data?.data || [];
  //----------------------------------------------------------------
  const breadcrumbItems = [
    { title: "Nurses", link: "/dashboard/nurses" },
    { title: `${nurse?.name}`, link: `/dashboard/nurses/${nurse?.name}` },
  ];

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex flex-col md:flex-row gap-1 items-center justify-between">
          <Heading
            title={`Nurse Details`}
            customStyle="ml-4"
          />
          {(!nurse?.is_verified) && <div className="px-4">
            <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptNurseRequest} id={nurse?.user_id} />
          </div>}
        </div>
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <Image
                src={nurseImage}
                alt={nurse?.name}
                className="w-32 h-32 rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Name: {nurse?.name}</h1>
                {/* <p>Specialization: {nurse?.specialization.name}</p> */}
                <p>Experience: {nurse?.experience} years</p>
                <div className="flex">
                  <span className="mr-2">Rating:</span>
                  <div className="stars flex">
                    {Array.from(
                      { length: Math.ceil(nurse?.rating) },
                      (ele, index) => (
                        <Star key={index} fill="#f7d722" strokeWidth={0} />
                      ),
                    )}
                    {Array.from(
                      { length: Math.ceil(5 - nurse?.rating) },
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
                <div className="details">
                  <div className="p-4">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <p>{nurse?.summery}</p>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <h2 className="text-xl font-bold">Licenses</h2>
                    <div className="flex items-center py-2">
                      {nurse?.license_images.map(({ image }) => (
                        <div key={image} className="w-1/4 mx-2">
                          <Image
                            src={image}
                            alt={"license"}
                            width={500}
                            height={500}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="review">
                <Reviews reviews={reviews} pageCount={pageCount} totalitems={totalReivews} pageNo={page} />
              </TabsContent>
            </Tabs>

            {/* <div className="p-4 border-t border-gray-200">
              <h2 className="text-xl font-bold">Consultation Prices</h2>
              <div className="grid grid-cols-1 mt-2">
                <div className="flex mt-3">
                  <p className="mr-3">Video Consultation:</p>
                  <p>{nurse?.video_consultation_price} EGP </p>
                </div>
                <div className="flex mt-3">
                  <p className="mr-3">Voice Consultation:</p>
                  <p>{nurse?.voice_consultation_price} EGP </p>
                </div>
                <div className="flex mt-3">
                  <p className="mr-3"> Home Consultation:</p>
                  <p>{nurse?.home_consultation_price} EGP </p>
                </div>
                <div className="flex mt-3">
                  <p className="mr-3">Clinic Consultation:</p>
                  <p>{nurse?.clinic_consultation_price} EGP </p>
                </div>
              </div>
            </div> */}

            {/* <div className="p-4 border-t border-gray-200">
              <h2 className="text-xl font-bold">Clinic Information</h2>
              <p>Name: {nurse?.clinic.name}</p>
              <p>Address: {nurse?.clinic.address}</p>
            </div> */}

          </div>
        </div>
      </div>
    </>
  );
};

export default page;