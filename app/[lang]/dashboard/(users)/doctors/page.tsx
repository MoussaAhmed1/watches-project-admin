import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { fetchDoctors } from "@/actions/doctors";
import { getDictionary } from "@/app/[lang]/dictionaries";
import BreadCrumb from "@/components/breadcrumb";
import DoctorsFilters from "@/components/filters/users/doctorsFilters";
import { columns } from "@/components/tables/doctors-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ISpecializations } from "@/types/additional-info-specializations";
import { IDoctor } from "@/types/doctors";
import { Plus } from "lucide-react";
import Link from "next/link";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:"ar"|"en"}
};

export default async function page({ searchParams,params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const specialization_id =
  typeof searchParams?.specialization_id === "string" ? searchParams?.specialization_id : "";
  
  const res = await fetchDoctors({
    page,
    limit,
    filters: search,
    otherfilters: ["is_verified=1", `specialization.id=${specialization_id}`]
  });
  const totalDoctors = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalDoctors / limit);
  const doctors: Employee[] = res?.data?.data || [];
  
  // ISpecializations filters
  const res_specs = await fetchAdditionalSpecializations({
    page:1,
    limit:100,
    
  });
  const specializations: ISpecializations[] = res_specs?.data?.data || [];
  const {navigation,shared} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.doctors, link: "/dashboard/doctors" }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.doctors} (${totalDoctors})`}
          />
          <Link
            href={`/${params?.lang}/dashboard/doctors/new`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" />{shared.add_new}
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="doctors"
          pageNo={page}
          columns={columns}
          totalitems={totalDoctors}
          data={doctors as unknown as IDoctor[]}
          pageCount={pageCount}
        >
          <DoctorsFilters specializations={specializations}/>
        </SharedTable>
      </div>
    </>
  );
}
