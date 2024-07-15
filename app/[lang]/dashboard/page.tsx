'use server';

import { fetchStatictics } from "@/actions/statictics";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Statictic } from "@/types/statictic";
import Link from "next/link";
export default async function page({ params }: { params: { lang: string } }) {
  const res = await fetchStatictics({ lang: params?.lang });
  const statistics_res: Statictic = res?.data?.data;
  const statistics = [
    {
      title: "Patients",
      total: statistics_res?.clients_count,
      link: `/${params?.lang}/dashboard/patients`
    },
    {
      title: "Doctors",
      total: statistics_res?.doctors_count,
      link: `/${params?.lang}/dashboard/doctors`
    },
    {
      title: "Nurses",
      total: statistics_res?.nurses_count,
      link: `/${params?.lang}/dashboard/nurses`
    },
    {
      title: "Pharmacies",
      total: statistics_res?.pharmacy_count,
      link: `/${params?.lang}/dashboard/pharmacies`
    },
    {
      title: "Pharmacy Orders",
      total: statistics_res?.pharamcy_order_count,
      link: `/${params?.lang}/dashboard/pharmacy-orders`
    },
    {
      title: "Nurse Orders",
      total: statistics_res?.nurse_order_count,
      link: `/${params?.lang}/dashboard/nurse-orders`
    },

    {
      title: "Reservations",
      total: statistics_res?.reservations_count,
      link: `/${params?.lang}/dashboard/reservations`
    },
  ]

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2> */}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              {statistics.map(statistic => (

                <Link href={statistic?.link} key={statistic?.title}>
                  <Card  className="cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium capitalize">
                        {statistic?.title}
                      </CardTitle>
                      {/* {statistic?.icon} */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="#8c8c8c" d="M15 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1.75 3.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-1.5 0M2 14C2 7.373 7.373 2 14 2s12 5.373 12 12s-5.373 12-12 12S2 20.627 2 14M14 3.5C8.201 3.5 3.5 8.201 3.5 14S8.201 24.5 14 24.5S24.5 19.799 24.5 14S19.799 3.5 14 3.5" /></svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{statistic.total}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))
              }

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
