import { fetchSingleBanar } from "@/actions/banars";
import BreadCrumb from "@/components/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { IBanner } from "@/types/banars";
import Image from "next/image";
import { Calendar, CheckCircle, FileText, Info, RefreshCcw } from 'lucide-react';
import { formatCreatedAtDate } from "@/utils/helperFunctions";

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
      title: "Banner details",
      link: "/dashboard/banars/view",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title={`Banner details`}
        description={banner?.id}
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
                  <Info  style={{ marginRight: '0.5rem' }} />
                  ID: {banner.id}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ marginRight: '0.5rem' }} />
                  Created At: {formatCreatedAtDate(banner.created_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <RefreshCcw style={{ marginRight: '0.5rem' }} />
                  Updated At: {formatCreatedAtDate(banner.updated_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ marginRight: '0.5rem' }} />
                  Started At: {formatCreatedAtDate(banner.started_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Calendar style={{ marginRight: '0.5rem' }} />
                  Ended At: {formatCreatedAtDate(banner.ended_at)}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <FileText style={{ marginRight: '0.5rem'  }} />
                  Description: {banner.description ? banner?.description : 'No description provided'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <CheckCircle style={{ marginRight: '0.5rem' }} />
                  Is Active: {banner.is_active ? 'Yes' : 'No'}
                </li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>

        <Card style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Banner Image</CardTitle>
          </CardHeader>
          <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src={banner.banar}
              alt="Banner Image"
              width={400}
              height={200}
              style={{ borderRadius: '10px' }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
