import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { AcceptNurseOrderCancelRequest, fetchSingleNurseOrder } from "@/actions/nurse-orders";
import { SingleNurseOrder } from "@/types/nurse-order";
import { Heading } from "@/components/ui/heading";
import { formatCreatedAtDateAsDateTime, shortenText } from "@/utils/helperFunctions";
import { Card } from "@/components/ui/card";
import { CheckCircle, CircleSlash } from "lucide-react";
import Approve from "@/components/details/role-details/Approve";
import CancelWithReason from "@/components/details/role-details/CancelWithReason";
import UserInfoCard from "@/components/details/pharmacy-order/UserInfo";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = async ({ params }: { params: { id: string } }) => {
  const res = await fetchSingleNurseOrder(params.id);
  const NurseOrder: SingleNurseOrder = res?.data?.data;
  const breadcrumbItems = [
    { title: "Nurse Orders", link: "/dashboard/Nurse-orders" },
    { title: `${NurseOrder?.number}`, link: `/dashboard/NurseOrders/${NurseOrder?.number}` },
  ];
  const render_data_items =
    [
      {
        data_key: "Start Date",
        data_value: formatCreatedAtDateAsDateTime(NurseOrder?.date_from),
      },
      {
        data_key: "End Date",
        data_value: formatCreatedAtDateAsDateTime(NurseOrder?.date_to),
      },
      {
        data_key: "Price",
        data_value: NurseOrder?.price,
      },
      // {
      //   data_key: "Is Urgent",
      //   data_value: NurseOrder?. ? <CheckCircle stroke="#39a845" size={18} /> : <CircleSlash style={{ color: '#8C0101' }} size={18} />,
      // },
      {
        data_key: "Rate",
        data_value: NurseOrder?.rate,
      },
      {
        data_key: "Comment",
        data_value: NurseOrder?.comment,
      },
      {
        data_key: "Notes",
        data_value: NurseOrder?.notes,
      },
      {
        data_key: "Address",
        data_value: (<Link
          href={`https://www.google.com/maps/search/?api=1&query=${NurseOrder?.address?.latitude},${NurseOrder?.address?.longitude}`}
          target="_blank"
          style={{ color: '#3A72EC' }}
        >
          {shortenText(NurseOrder?.address?.address,45)}
        </Link>),
      },
    ]
  const cancel_data_items =
    [
      {
        data_key: "Cancel Reason",
        data_value: NurseOrder?.cancel_reason,
      },
    ]
  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="ml-4" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col md:flex-row gap-1 items-start">
            <Heading
              title={`NurseOrders #${NurseOrder?.number}`}
              description={formatCreatedAtDateAsDateTime(NurseOrder?.created_at)}
              customStyle="ml-4"
            />
            <p
              className="mt-[5px] mx-4"
              style={{
                color: NurseOrder?.status === "STARTED"
                  ? "#1976d2"
                  : NurseOrder?.status === "CANCELLED" ? "#8C0101"
                    : NurseOrder?.status === "COMPLETED" ? "#28a745"
                      : "gray",
                background: NurseOrder?.status === "STARTED"
                  ? "#ffe6e6"
                  : NurseOrder?.status === "CANCELLED" ? "#fff5e6"
                    : NurseOrder?.status === "COMPLETED" ? "#ecf8ef"
                      : "#fafafa",
                fontWeight: 400,
                borderRadius: '12px',
                padding: 2
              }}
            >
              {NurseOrder?.status}
            </p>
          </div>
          {NurseOrder?.status != "CANCELED" && <div className="px-3">
            {(NurseOrder?.cancel_request) ?
              <Approve title="Approve Cancel" successMessage="Request canceled Successfully" defualt method={AcceptNurseOrderCancelRequest} id={params?.id} /> :
              <CancelWithReason dialogTitle="Cancel Nurse Order" id={NurseOrder?.id} method={AcceptNurseOrderCancelRequest} />
            }
          </div>}

        </div>
        <div className="w-full mx-auto p-4">
          <div className="overflow-hidden min-h-[77dvh]">
            <div className="py-4 px-2 2xl:mx-auto">


              <div className="flex flex-col xl:flex-row jusitfy-center items-start w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                  <Card className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-4 xl:p-5 w-full min-h-[66vh]">
                    <h6 className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 mb-4">NurseOrder Details</h6>
                    <div className="flex justify-center items-center w-full h-full space-y-4 flex-col pb-4">

                      {
                        render_data_items?.map(({ data_key, data_value }, index) => (
                          <div className="flex justify-between w-full pb-5" key={data_key} style={{ borderBottom: ((index < render_data_items?.length - 1) || (NurseOrder?.cancel_reason!="")) ? "1px solid lightgray" : "unset" }}>
                            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
                          </div>
                        ))
                      }
                      {NurseOrder?.cancel_reason &&
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

                  </div>
                </div>
                {/* customerDoctorDetails  */}
                <div className="flex flex-col justify-start items-start xl:w-fit w-full space-y-4 md:space-y-6 xl:space-y-9">
                  <UserInfoCard user={NurseOrder?.user} />
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
