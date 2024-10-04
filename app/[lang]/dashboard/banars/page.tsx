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
import { getDictionary } from "../../messages";


type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  
  params: { lang: "ar" | "en" }
};

export default async function page({ searchParams
  , params
}: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || ITEMS_PER_PAGE;
  const search =
  typeof searchParams?.search === "string" ? searchParams?.search : "";
  const res = await fetchBanners({
    page,
    limit,
    filters: search,
  });
  const banars: IBanner[] = res?.data?.data || [];
  // const totalBanars = res?.data?.meta?.total || 0; //1000
  // const pageCount = Math.ceil(totalBanars / limit);
  const totalBanars = banars?.length || 0;
  const pageCount = 1;
  
  const { pages, shared } = await getDictionary(params?.lang)
  const breadcrumbItems = [{ title: pages.banners.banners, link: "/dashboard/banars" }];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`${pages.banners.banners} (${totalBanars})`}
          />

          <Link
            href={"/dashboard/banars/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" />{shared.add_new}
          </Link>
        </div>
        <Separator />

        <SharedTable
          searchKey={`${pages.banners.banners}`}
          pageNo={page}
          columns={BanarsColumns}
          totalitems={totalBanars}
          data={banars as unknown as IBanner[]}
          pageCount={pageCount}
          withPagination={false}
          withSearch={false}
        />
      </div>
    </>
  );
}
