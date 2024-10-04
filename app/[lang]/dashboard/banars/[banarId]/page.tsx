import { fetchSingleBanar } from "@/actions/banars";
import BreadCrumb from "@/components/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { IBanner } from "@/types/banars";
import { Calendar, CheckCircle, FileText, Info, RefreshCcw } from 'lucide-react';
import { getDateSimpleFormat } from "@/utils/helperFunctions";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageRender } from "@/components/shared/imagesRender/imagesRender";
import { getDictionary } from "@/app/[lang]/messages";

export const metadata = {
  title: 'Banner details',
};

type Props = {
  params: {
    banarId: string;
    lang: "ar" | "en";
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
  const { pages } = await getDictionary(params?.lang)
  const banner: IBanner = await fetchSingleBanar(headers);
  const breadcrumbItems = [
    {
      title:pages.banners.banners,
      link: "/dashboard/banars",
    },
    {
      title: pages.banners.bannerDetails,
      link: "/dashboard/banars/view",
    },
  ];

  return (
    <div className="flex-1 space-y-2 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={pages.banners.bannerDetails}
        description={"["+getDateSimpleFormat(banner.started_at) +" - "+ getDateSimpleFormat(banner.ended_at)+"]"}
      />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Card style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>{pages.banners.bannerDetails}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <Calendar style={{ margin: '.5rem 0.5rem' }} />
                  {pages.banners.startDate}: {getDateSimpleFormat(banner.started_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ margin: '.5rem 0.5rem' }} />
                  {pages.banners.endDate}: {getDateSimpleFormat(banner.ended_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <CheckCircle style={{ margin: '.5rem 0.5rem' }} />
                  {pages.banners.isActive}: {banner.is_active ? pages.banners.yes : pages.banners.no}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ margin: '.5rem 0.5rem' }} />
                  {pages.banners.createdAt}: {getDateSimpleFormat(banner.created_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <RefreshCcw style={{ margin: '.5rem 0.5rem' }} />
                  {pages.banners.updatedAt}: {getDateSimpleFormat(banner.updated_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <FileText style={{ margin: '.5rem 0.5rem' }} />
                  {pages.banners.description}: {banner.description ? banner?.description : ' - '}
                </li>
              </ul>
              <Separator className="my-1" />
            </CardDescription>
            <div className="relative p-2">
              <CardTitle>{pages.banners.bannerImage}</CardTitle>
              <ScrollArea>
                <div className="flex space-x-4 py-4" dir={params.lang === "ar" ? "rtl" : "ltr"}>
                  <ImageRender
                    src={banner?.banar}
                    className="w-[200px]"
                    aspectRatio="portrait"
                    width={350}
                    height={330}
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
