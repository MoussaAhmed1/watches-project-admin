import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { AcceptNurseRequest, fetchSingleNurse } from "@/actions/nurses";
import nurseImage from "../../../../../../public/assets/doctor.avif";
import { Edit, Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import Approve from "@/components/details/role-details/Approve";
import { ISingleNurse } from "@/types/nurses";
import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchReviews } from "@/actions/reviews";
import { IReview } from "@/types/reviews";
import Reviews from "@/components/details/doctor-details/reviews";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageRender } from "@/components/shared/imagesRender/imagesRender";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nurse Details | Dacatra Dashboard",
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
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={`Nurse Details`}
          />
          <div className="flex gap-1 justify-end">
            {(!nurse?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptNurseRequest} id={nurse?.user_id} />
            </div>}
            <Link
              href={`/dashboard/nurses/${params?.nurseId}/${nurse?.user_id}/edit`}
              className={cn(buttonVariants({ variant: "default" }), "p-5")}
            >
              <Edit className="mr-2 h-5 w-5" /> Edit
            </Link>
          </div>
        </div>
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <ProfileImg
                className="w-[100px] h-[100px]"
                src={nurse?.avatar||nurseImage}
                alt={nurse?.name}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Name: {nurse?.name}</h1>
                <p>Experience: {nurse?.experience} years</p>
                <p>Phone: {nurse?.phone}</p>
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
                      <ScrollArea>
                        <div className="flex space-x-4 py-4">
                          {nurse?.license_images?.map((lic) => (
                            <ImageRender
                              key={lic?.id}
                              src={lic?.image}
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