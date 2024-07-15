import { fetchSingleBanar } from "@/actions/banars";
import { fetchDoctors } from "@/actions/doctors";
import BreadCrumb from "@/components/breadcrumb";
import { BanarsForm } from "@/components/forms/banars-form";
import { Heading } from "@/components/ui/heading";
import { IDoctor } from "@/types/doctors";


export const metadata = {
  title: 'Edit Banner',
};

type Props = {
  params: {
    banarId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
type Headers = {
  banarId: string;
};

export default async function Page({ params, searchParams }: Props) {
  const headers: Headers = {
    banarId: params.banarId,
  };
  const data = await fetchSingleBanar(headers);
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchDoctors({
    page: 1,
    limit: 20,
    filters: search,
    otherfilters: ["is_verified=1"]
  });

  const doctors: IDoctor[] = res?.data?.data || [];
  const breadcrumbItems = [
    {
      title:  "Banners",
      link: "/dashboard/banars",
    },
    {
      title: "Edit Banner",
      link: "/dashboard/banars/edit",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={`Edit Banner`}
        description="(Update banner)"
      />

      <BanarsForm doctors={doctors} banar={data} />
    </div>
  );
}
