import BreadCrumb from "@/components/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { AlarmClock, BadgePercent, CalendarClock, Edit, FileText,Info, RefreshCcw } from 'lucide-react';
import { formatCreatedAtDate } from "@/utils/helperFunctions";
import { fetchPharmacySinglePackage } from "@/actions/packages";
import { IPharmacyPackage } from "@/types/packages";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
    title: 'Package details',
};

type Props = {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};


export default async function Page({ params, searchParams }: Props) {
    const res = await fetchPharmacySinglePackage(params.id);
    const PharmacyPackage: IPharmacyPackage = res?.data?.data;
    const breadcrumbItems = [
        { title: "Pharmacy packages", link: "/dashboard/packages/pharmacy-packages" },
        { title: "Package details", link: "/dashboard/packages/pharmacy-packages/details" },
    ];

    return (
        <div className="flex-1 space-y-4 p-8">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-baseline justify-between">
                <Heading
                    title={`Package details`}
                    description={PharmacyPackage?.name_en}
                />
                <Link
                    href={`/dashboard/packages/pharmacy-packages/${params.id}/edit`}
                    className={cn(buttonVariants({ variant: "default" }))}
                >
                     <Edit className="mx-1 h-4 w-4" /> Edit
                </Link>
            </div>
            <div style={{ display: 'flex', gap: 8, flexDirection: "column" }}>
                <Card style={{ flex: 1 }}>
                    <CardHeader>
                        <CardTitle>Package Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, display: "flex", flexDirection: "column", gap: 5, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Info style={{ marginRight: '0.5rem' }} />
                                    English Name: {PharmacyPackage?.name_en}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Info style={{ marginRight: '0.5rem' }} />
                                    Arabic Name: {PharmacyPackage?.name_ar}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <BadgePercent style={{ marginRight: '0.5rem' }} />
                                    Price: {PharmacyPackage?.price}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <CalendarClock style={{ marginRight: '0.5rem' }} />
                                    Expiration days: {PharmacyPackage?.expiration_days} days
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <AlarmClock style={{ marginRight: '0.5rem' }} />
                                    Advantage minutes: {PharmacyPackage?.advantage_mins} minutes
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Info style={{ marginRight: '0.5rem' }} />
                                    Created At: {formatCreatedAtDate(PharmacyPackage?.created_at)}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <RefreshCcw style={{ marginRight: '0.5rem' }} />
                                    Updated At: {formatCreatedAtDate(PharmacyPackage?.updated_at)}
                                </li>
                            </ul>
                        </CardDescription>
                    </CardContent>
                </Card>
                <div className="flex gap-2 flex-row sm:flex-col flex-wrap">
                    <Card style={{ flex: 1, minWidth: 200 }}>
                        <CardHeader>
                            <CardTitle style={{ display: 'flex', alignItems: 'center' }}><FileText style={{ marginRight: '0.5rem' }} /> English Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <div style={{ margin: 4, display: "flex", flexDirection: "column", gap: 3, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                                    <p>{PharmacyPackage.description_en ? PharmacyPackage?.description_en : 'No description provided'}</p>
                                </div>
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card style={{ flex: 1, minWidth: 200 }}>
                        <CardHeader>
                            <CardTitle style={{ display: 'flex', alignItems: 'center' }}><FileText style={{ marginRight: '0.5rem' }} /> Arabic Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <div style={{ margin: 4, display: "flex", flexDirection: "column", gap: 3, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                                    <p>{PharmacyPackage.description_ar ? PharmacyPackage?.description_ar : 'No description provided'}</p>
                                </div>
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
