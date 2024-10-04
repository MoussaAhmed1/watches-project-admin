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
import { getDictionary } from "@/app/[lang]/messages";

export const metadata = {
    title: 'Package details',
};

type Props = {
    params: {
        id: string;
        lang: "ar" | "en"
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};


export default async function Page({ params, searchParams }: Props) {
    const res = await fetchPharmacySinglePackage(params.id);
    const PharmacyPackage: IPharmacyPackage = res?.data?.data;
    const { pages, shared } = await getDictionary(params?.lang)
    const breadcrumbItems = [
        { title: pages.packages.pharmacyPackages, link: "/dashboard/packages/pharmacy-packages" },
        { title: pages.packages.packageDetails, link: "/dashboard/packages/pharmacy-packages/details" },
    ];
    return (
        <div className="flex-1 space-y-4 p-8">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-baseline justify-between">
                <Heading
                    title={pages.packages.packageDetails}
                    description={PharmacyPackage?.name_en}
                />
                <Link
                    href={`/dashboard/packages/pharmacy-packages/${params.id}/edit`}
                    className={cn(buttonVariants({ variant: "default" }))}
                >
                     <Edit className="mx-1 h-4 w-4" />{shared.edit}
                </Link>
            </div>
            <div style={{ display: 'flex', gap: 8, flexDirection: "column" }}>
                <Card style={{ flex: 1 }}>
                    <CardHeader>
                        <CardTitle>{pages.packages.packageDetails}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, display: "flex", flexDirection: "column", gap: 5, fontSize: 15 }} className="text-gray-600 dark:text-gray-200">
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Info style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.englishName}: {PharmacyPackage?.name_en}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Info style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.arabicName}: {PharmacyPackage?.name_ar}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <BadgePercent style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.price}: {PharmacyPackage?.price}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <CalendarClock style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.expirationDays}: {PharmacyPackage?.expiration_days} {pages.packages.days}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <AlarmClock style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.advantageMinutes}: {PharmacyPackage?.advantage_mins} {pages.packages.min}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Info style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.createdAt}: {formatCreatedAtDate(PharmacyPackage?.created_at)}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <RefreshCcw style={{ marginRight: '0.5rem',
                                        marginLeft: '0.5rem' }} />
                                    {pages.packages.updatedAt}: {formatCreatedAtDate(PharmacyPackage?.updated_at)}
                                </li>
                            </ul>
                        </CardDescription>
                    </CardContent>
                </Card>
                <div className="flex gap-2 flex-row sm:flex-col flex-wrap">
                    <Card style={{ flex: 1, minWidth: 200 }}>
                        <CardHeader>
                            <CardTitle style={{ display: 'flex', alignItems: 'center' }}><FileText style={{
                                marginRight: '0.5rem'
                                ,
                                marginLeft: '0.5rem'
                            }} /> {pages.packages.englishDescription}</CardTitle>
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
                            <CardTitle style={{ display: 'flex', alignItems: 'center' }}><FileText style={{
                                marginRight: '0.5rem'
                                ,
                                marginLeft: '0.5rem'
                            }} /> {pages.packages.arabicDescription}</CardTitle>
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
