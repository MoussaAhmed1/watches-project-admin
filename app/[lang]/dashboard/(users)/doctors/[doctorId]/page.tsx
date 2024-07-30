import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import nurseImage from "../../../../../../public/assets/doctor.png";
import { AcceptDoctorRequest, fetchSingleDoctor } from "@/actions/doctors";
import { ISingleDoctor } from "@/types/doctors";
import { Edit, Home, Hotel, Info, MapPin, PhoneCall, Star, Video } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import Approve from "@/components/details/role-details/Approve";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchReviews } from "@/actions/reviews";
import { IReview } from "@/types/reviews";
import Reviews from "@/components/details/doctor-details/reviews";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageRender } from "@/components/shared/imagesRender/imagesRender";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
import AvaliablityRendering from "@/components/details/doctor-details/AvaliablityRendering";
import { shortenText } from "@/utils/helperFunctions";

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
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
        <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={`Doctor Details`}
          />
          <div className="flex gap-1 justify-end">
            {(!doctor?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptDoctorRequest} id={doctor?.user_id} />
            </div>}
            <Link
              href={`/dashboard/doctors/${params?.doctorId}/${doctor?.user_id}/edit`}
              className={cn(buttonVariants({ variant: "default" }), "p-5")}

            >
              <Edit className="mr-2 h-5 w-5" /> Edit
            </Link>
          </div>
        </div>
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-x-hidden border min-h-[77dvh] border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <ProfileImg
                className="w-[100px] h-[100px]"
                src={doctor?.avatar || nurseImage}
                alt={doctor?.name}
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Name: {doctor?.name}</h1>
                <p>Specialization: {doctor?.specialization?.name}</p>
                <p>Experience: {doctor?.experience} years</p>
                <p>Phone: {doctor?.phone}</p>
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
                      { length: Math.floor(5 - doctor?.rating) },
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
                <TabsTrigger value="availibilty">Avaliablity</TabsTrigger>
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
                        <Video className="details_icon" />
                        <p className="mr-1">Video Consultation:</p>
                        <p>{doctor?.video_consultation_price} EGP </p>
                      </div>
                      <div className="flex mt-3">
                        <PhoneCall className="details_icon" />
                        <p className="mr-1">Voice Consultation:</p>
                        <p>{doctor?.voice_consultation_price} EGP </p>
                      </div>
                      <div className="flex mt-3">
                        <Home className="details_icon" />
                        <p className="mr-1"> Home Consultation:</p>
                        <p>{doctor?.home_consultation_price} EGP </p>
                      </div>
                      <div className="flex mt-3">
                        <Hotel className="details_icon" />
                        <p className="mr-1">Clinic Consultation:</p>
                        <p>{doctor?.clinic_consultation_price} EGP </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <h2 className="text-xl font-bold">Clinic Information</h2>
                    <div className="flex mt-3">
                      <Info className="details_icon" />
                      <p className="mr-1">Name:</p>
                      <p>{doctor?.clinic?.name ?? "-"} </p>
                    </div>
                    <div className="flex mt-3">
                      <MapPin className="details_icon" />
                      <p className="mr-1">Address:</p>
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${doctor?.clinic?.latitude},${doctor?.clinic?.longitude}`}
                        target="_blank"
                        style={{ color: '#3A72EC' }}
                      >
                        {shortenText(doctor?.clinic?.address, 90)}
                      </Link>
                    </div>
                  </div>
                  <Separator className="my-1" />
                  <div className="relative p-2">
                    <h2 className="text-xl font-bold">License Images</h2>
                    <ScrollArea>
                      <div className="flex space-x-4 py-4">
                        {doctor?.licenses?.length && doctor?.licenses?.map((license) => (
                          <ImageRender
                            key={license?.id}
                            src={license?.image}
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
                  {doctor?.cover_image &&
                    <>
                      <Separator className="my-1" />
                      <div className="relative p-2">
                        <h2 className="text-xl font-bold">Cover Images</h2>
                        <ScrollArea>
                          <div className="flex space-x-4 py-4">
                            <ImageRender
                              src={doctor?.cover_image}
                              className="w-[200px]"
                              aspectRatio="portrait"
                              width={250}
                              height={330}
                            />
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </>
                  }
                </div>
              </TabsContent>
              <TabsContent value="review">
                <Reviews reviews={reviews} pageCount={pageCount} totalitems={totalReivews} pageNo={page} />
              </TabsContent>
              <TabsContent value="availibilty">
                <Separator className="my-4 w-[98%]" />
                <AvaliablityRendering availibilty={doctor?.availibilty?.sort((a:any, b:any) => a.day - b.day)} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
