import BreadCrumb from "@/components/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { BadgePercent, CalendarClock, Edit, FileText, Hash, Info, RefreshCcw } from 'lucide-react';
import { formatCreatedAtDate } from "@/utils/helperFunctions";
import { fetchSinglePackage } from "@/actions/packages";
import { IClientPackage } from "@/types/packages";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
    const res = await fetchSinglePackage(params.id);
    const ClientPackage: IClientPackage = res?.data?.data;
    const { pages, shared } = await getDictionary(params?.lang)
    const breadcrumbItems = [
        { title: pages.packages.clientPackages, link: "/dashboard/packages/client-packages" },
        { title: pages.packages.packageDetails, link: "/dashboard/packages/client-packages/details" },
    ];

    return (
        <div className="flex-1 space-y-4 p-8">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-baseline justify-between">
                <Heading
                    title={pages.packages.packageDetails}
                    description={ClientPackage?.name_en}
                />
                <Link
                    href={`/dashboard/packages/client-packages/${params.id}/edit`}
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
                                    <Info style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.englishName}: {ClientPackage?.name_en}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Info style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.arabicName}: {ClientPackage?.name_ar}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <BadgePercent style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.price}: {ClientPackage?.price}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <CalendarClock style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.expirationDays}: {ClientPackage?.expiration_days} {pages.packages.days}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Hash style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.numberOfPharmacyOrder}: {ClientPackage?.number_of_pharmacy_order} {pages.packages.orders}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Info style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.createdAt}: {formatCreatedAtDate(ClientPackage?.created_at)}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <RefreshCcw style={{
                                        marginRight: '0.5rem'
                                        ,
                                        marginLeft: '0.5rem'
                                    }} />
                                    {pages.packages.updatedAt}: {formatCreatedAtDate(ClientPackage?.updated_at)}
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
                                    <p>{ClientPackage.description_en ? ClientPackage?.description_en : 'No description provided'}</p>
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
                                    <p>{ClientPackage.description_ar ? ClientPackage?.description_ar : 'No description provided'}</p>
                                </div>
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
