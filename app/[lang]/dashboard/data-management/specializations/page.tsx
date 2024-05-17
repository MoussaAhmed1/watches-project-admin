import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import columns from "@/components/tables/additional-info/specializations/columns";
import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { ISpecializations } from "@/types/additional-info-specializations";
import SpecializationForm from "@/components/forms/specialization/SpecializationForm";

const breadcrumbItems = [{ title: "Specializations", link: "/dashboard/data-management/specializations" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchAdditionalSpecializations({
    page,
    limit,
    filters: search,
  });
  const totalSpecializations = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalSpecializations / limit);
  const specializations: ISpecializations[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Doctor Specialiations(${totalSpecializations})`} />

          <SpecializationForm />
        </div>
        <Separator />

        <SharedTable
          searchKey="Additional info / Specializations"
          pageNo={page}
          columns={columns}
          totalitems={totalSpecializations}
          data={specializations as unknown as ISpecializations[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
