import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { fetchDoctors } from "@/actions/doctors";
import { getDictionary } from "@/app/[lang]/messages";
import BreadCrumb from "@/components/breadcrumb";
import DoctorsFilters from "@/components/filters/users/doctorsFilters";
import { verificationRequestsColumns } from "@/components/tables/doctors-tables/columns";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { ISpecializations } from "@/types/additional-info-specializations";
import { IDoctor } from "@/types/doctors";
import type { Locale } from "@/i18n.config";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params:{lang:Locale}
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
    otherfilters: ["is_verified=0", `specialization.id=${specialization_id}`]
  });
  const totalDoctors = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalDoctors / limit);
  const doctors: Employee[] = res?.data?.data || [];
  // ISpecializations filters
  const res_specs = await fetchAdditionalSpecializations({
    page: 1,
    limit: 100,
    
  });
  const specializations: ISpecializations[] = res_specs?.data?.data || [];
  const {navigation} = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: navigation.doctorsRequests, link: "/dashboard/doctors" }];
  
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${navigation.doctorsRequests} (${totalDoctors})`}
          />
        </div>
        <Separator />

        <SharedTable
          searchKey="doctors"
          pageNo={page}
          columns={verificationRequestsColumns}
          totalitems={totalDoctors}
          data={doctors as unknown as IDoctor[]}
          pageCount={pageCount}
        >
          <DoctorsFilters specializations={specializations} />
        </SharedTable>
      </div>
    </>
  );
}
