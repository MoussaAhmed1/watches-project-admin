import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import columns from "@/components/tables/additional-info/specializations/columns";
import { fetchAdditionalSpecializations } from "@/actions/additional-info-specializations";
import { AdditionalSpecializations } from "@/types/additional-info-specializations";

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
  const totalSpecializations = res?.data?.meta?.total ||  0; //1000
  const pageCount = Math.ceil(totalSpecializations / limit);
  const specializations: AdditionalSpecializations[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Doctor Specialiations(${totalSpecializations})`} />

          <Link
            href={"/dashboard/additional-info/specializations/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="Additional info / Specializations"
          pageNo={page}
          columns={columns}
          totalitems={totalSpecializations}
          data={specializations as unknown as AdditionalSpecializations[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
