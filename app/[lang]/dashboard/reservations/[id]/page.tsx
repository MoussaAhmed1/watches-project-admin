import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { AcceptReservationCancelRequest, fetchSingleReservation } from "@/actions/reservations";
import { ISingleReservation } from "@/types/reservations";
import { Heading } from "@/components/ui/heading";
import { formatCreatedAtDateAsDateTime } from "@/utils/helperFunctions";
import { Card } from "@/components/ui/card";
import DoctorInfoCard from "@/components/details/reservation-details/DoctorInfo";
import ClientInfoCard from "@/components/details/reservation-details/UserInfo";
import { CheckCircle, CircleSlash, FileText } from "lucide-react";
import Approve from "@/components/details/role-details/Approve";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservation Details | Dashboard",
};

const page = async ({ params }: { params: { id: string } }) => {
  const res = await fetchSingleReservation(params.id);
  const reservation: ISingleReservation = res?.data?.data;
  const breadcrumbItems = [
    { title: "Reservations", link: "/dashboard/reservations" },
    { title: `${reservation?.number}`, link: `/dashboard/reservations/${reservation?.number}` },
  ];
  const render_data_items =
    [
      {
        data_key: "Start Date",
        data_value: formatCreatedAtDateAsDateTime(reservation?.start_date),
      },
      {
        data_key: "End Date",
        data_value: formatCreatedAtDateAsDateTime(reservation?.end_date),
      },
      {
        data_key: "Reservation Type",
        data_value: reservation?.reservationType,
      },
      {
        data_key: "Is Urgent",
        data_value: reservation?.is_urgent ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />,
      },
      {
        data_key: "Specialization",
        data_value: reservation?.specialization?.name,
      },
      {
        data_key: "Rate",
        data_value: reservation?.rate,
      },
      {
        data_key: "Phone",
        data_value: reservation?.phone || reservation?.family_member?.phone || reservation?.client_info?.phone,
      },
    ]
  const cancel_data_items =
    [
      {
        data_key: "Cancel Reason",
        data_value: reservation?.cancel_reason,
      },
    ]

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col md:flex-row gap-1 items-start">
            <Heading
              title={`Reservations #${reservation?.number}`}
              description={formatCreatedAtDateAsDateTime(reservation?.created_at)}
              customStyle="ml-4"
            />
            <p
              className="mt-[5px] mx-4"
              style={{
                color: reservation?.status === "STARTED"
                  ? "#1976d2"
                  : reservation?.status === "CANCELLED" ? "#8C0101"
                    : reservation?.status === "COMPLETED" ? "#28a745"
                      : "unset",
                background: reservation?.status === "STARTED"
                  ? "#ffe6e6"
                  : reservation?.status === "CANCELLED" ? "#fff5e6"
                    : reservation?.status === "COMPLETED" ? "#ecf8ef"
                      : "unset",
                fontWeight: 400,
                borderRadius: '12px',
                padding: 2
              }}
            >
              {reservation?.status}
            </p>
          </div>
          {(reservation?.status != "CANCELED" && reservation?.status != "COMPLETED") && <div className="px-3">
            {
              <Approve title={reservation?.cancel_request ? "Approve Cancel" : "Cancel Reservation"} successMessage="Request canceled Successfully" defualt method={AcceptReservationCancelRequest} id={params?.id} />
            }
          </div>}

        </div>
        <div className="w-full mx-auto p-4">
          <div className="overflow-hidden min-h-[77dvh]">
            <div className="py-4 px-2 2xl:mx-auto">


              <div className="flex flex-col xl:flex-row jusitfy-center items-start w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                  <Card className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-4 xl:p-5 w-full ">
                    <h6 className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 mb-4">Reservation Details</h6>
                    <div className="flex justify-center items-center w-full h-full space-y-4 flex-col pb-4">

                      {
                        render_data_items?.map(({ data_key, data_value }, index) => (
                          <div className="flex justify-between w-full pb-5" key={data_key} style={{ borderBottom: ((index < render_data_items?.length - 1) || (reservation?.cancel_reason)) ? "1px solid lightgray" : "unset" }}>
                            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
                          </div>
                        ))
                      }
                      {reservation?.cancel_reason &&
                        cancel_data_items?.map(({ data_key, data_value }, index) => (
                          <div className="flex justify-between w-full pb-5" key={data_key} >
                            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
                          </div>
                        ))
                      }

                    </div>
                  </Card>

                  <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <Card className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Attachments</h3>


                      <div className="flex flex-col w-full border-b py-3">
                        <div className="flex space-x-4">
                          <div className="flex flex-col justify-start">
                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Doctor</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <ScrollArea>
                            <div className="flex space-x-4 py-4">
                              {reservation?.attachments?.length > 0 ? reservation?.attachments?.filter(item => item?.provider === "DOCTOR").map(item => (
                                (
                                  <Link key={item?.file}
                                    href={item?.file}
                                    target="_blank"
                                  >
                                    <FileText />
                                  </Link>
                                )))
                                :
                                (<p className="text-lg font-semibold leading-6 dark:text-white text-gray-800"> - </p>
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      </div>


                      <div className="flex flex-col w-full">
                        <div className="flex flex-col space-x-4">
                          <div className="flex flex-col">
                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Client</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <ScrollArea>
                            <div className="flex space-x-4 py-4">
                              {reservation?.attachments?.length > 0 ? reservation?.attachments?.filter(item => item?.provider === "CLIENT").map(item => (
                                (
                                  <Link key={item?.file}
                                    href={item?.file}
                                    target="_blank"
                                  >
                                    <FileText />
                                  </Link>
                                )))
                                :
                                (<p className="text-lg font-semibold leading-6 dark:text-white text-gray-800"> - </p>
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      </div>

                    </Card>
                  </div>
                </div>
                {/* customerDoctorDetails  */}
                <div className="flex flex-col justify-start items-start xl:w-fit w-full space-y-4 md:space-y-6 xl:space-y-9">

                  {reservation?.doctor && <DoctorInfoCard doctor={reservation?.doctor} />}
                  <ClientInfoCard client={reservation?.client_info} />
                  {reservation?.family_member &&
                    <ClientInfoCard client={reservation?.family_member} familyMember={true} />
                  }
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
