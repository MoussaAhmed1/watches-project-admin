import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { fetchSingleDoctor } from "@/actions/doctors";
import { ISingleDoctor } from "@/types/doctors";
import doctorImage from "../../../../../public/assets/doctor.avif";
import { Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = async ({ params }: { params: { doctorId: string } }) => {
  const res = await fetchSingleDoctor(params.doctorId);
  const doctor: ISingleDoctor = res?.data?.data;
  const breadcrumbItems = [
    { title: "Doctors", link: "/dashboard/doctors" },
    { title: `${doctor?.name}`, link: `/dashboard/doctors/${doctor?.name}` },
  ];

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background min-h-screen">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <Heading
            title={`Doctors Details`}
            customStyle="ml-4"
          />
        <div className="w-full mx-auto p-4 ">
          <div className="bg-background shadow-md rounded-lg overflow-hidden border border-gray-400">
            <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
              <Image
                src={doctorImage}
                alt={doctor?.name}
                className="w-32 h-32 rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Name: {doctor?.name}</h1>
                <p>Specialization: {doctor?.specialization.name}</p>
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
              <p>Name: {doctor?.clinic.name}</p>
              <p>Address: {doctor?.clinic.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
