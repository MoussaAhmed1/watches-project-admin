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

export const metadata = {
  title: 'Banner details',
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
  const banner: IBanner = await fetchSingleBanar(headers);
  const breadcrumbItems = [
    {
      title: "Banners",
      link: "/dashboard/banars",
    },
    {
      title: "Banner details",
      link: "/dashboard/banars/view",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={`Banner details`}
        description={"["+getDateSimpleFormat(banner.started_at) +" - "+ getDateSimpleFormat(banner.ended_at)+"]"}
      />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Card style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Banner Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  ID: {banner.id}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ marginRight: '0.5rem' }} />
                  Started At: {getDateSimpleFormat(banner.started_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ marginRight: '0.5rem' }} />
                  Ended At: {getDateSimpleFormat(banner.ended_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <CheckCircle style={{ marginRight: '0.5rem' }} />
                  Is Active: {banner.is_active ? 'Yes' : 'No'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ marginRight: '0.5rem' }} />
                  Created At: {getDateSimpleFormat(banner.created_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <RefreshCcw style={{ marginRight: '0.5rem' }} />
                  Updated At: {getDateSimpleFormat(banner.updated_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <FileText style={{ marginRight: '0.5rem' }} />
                  Description: {banner.description ? banner?.description : ' - '}
                </li>
              </ul>
              <Separator className="my-1" />
            </CardDescription>
            <div className="relative p-2">
              <CardTitle>Banner Image</CardTitle>
              <ScrollArea>
                <div className="flex space-x-4 py-4">
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
