import { ITEMS_PER_PAGE } from "@/actions/Global-variables";
import { fetchBanners } from "@/actions/banars";
import BreadCrumb from "@/components/breadcrumb";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import { BanarsColumns } from "@/components/tables/banars-table/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { IBanner } from "@/types/banars";

const breadcrumbItems = [{ title: "Banners", link: "/dashboard/banars" }];

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
  const res = await fetchBanners({
    page,
    limit,
    filters: search,
  });
  const totalBanars = res?.data?.meta?.total || 0; //1000
  const pageCount = Math.ceil(totalBanars / limit);
  const banars: IBanner[] = res?.data?.data || [] ;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Banners (${totalBanars})`}
          />

          <Link
            href={"/dashboard/banars/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey="Banners"
          pageNo={page}
          columns={BanarsColumns}
          totalitems={totalBanars}
          data={banars as unknown as IBanner[] }
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
