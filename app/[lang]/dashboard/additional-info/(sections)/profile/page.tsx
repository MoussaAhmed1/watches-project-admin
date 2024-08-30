import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import columns from "@/components/tables/additional-info/profile/columns";
import { fetchAdditionalProfile } from "@/actions/additional-info-profile";
import { AdditionalInfoProfile } from "@/types/additional-info-profile";

const breadcrumbItems = [{ title: "Additional info / Profile", link: "/dashboard/additional-info/profile" }];

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
  const res = await fetchAdditionalProfile();
  const totalInfo = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalInfo / limit);
  const profileInfo: AdditionalInfoProfile[] = res?.data?.data || [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Additional info / Profile (${totalInfo})`} />

          <Link
            href={"/dashboard/additional-info/profile/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="Additional info / Profile"
          pageNo={page}
          columns={columns}
          totalitems={totalInfo}
          data={[profileInfo] as unknown as AdditionalInfoProfile[]}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
