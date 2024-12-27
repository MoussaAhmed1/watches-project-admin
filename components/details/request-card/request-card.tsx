"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HistoryOfRequests } from "@/types/watches/requests";
import { convertUtcToLocal, getCustomNameKeyLang } from "@/utils/helperFunctions";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CheckCheck, Clock2, Eye, Hash, User, Watch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';
import Approve from "@/components/shared/table/Approve";
import { Button } from "@/components/ui/button";

interface IProps {
    request: HistoryOfRequests;
}

function RequestCard({ request }: IProps) {
    const router = useRouter();
    const t = useTranslations("tableColumns");
    const tUser = useTranslations("pages.users");
    const tDetails = useTranslations("pages.requestDetails");
    const currentLang = Cookie.get("Language") ?? "en";
    return (
        <section className="antialiased bg-[#FAFAFA] dark:bg-[#181D26] shadow-lg rounded-xl" dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <article
                className="w-full flex flex-wrap bg-[#FAFAFA] dark:bg-[#181D26] border border-stroke  dark:border-gray-700 md:flex-nowrap shadow-lg  group rounded-md">
                <div className="w-full">
                    <div className="py-1 flex items-center justify-between border-b border-stroke px-2 dark:border-gray-700">
                        <h1 className="font-medium flex items-center text-black dark:text-white w-fit text-left " dir={currentLang === "en" ? "rtl" : "ltr"}>
                            {request?.number}
                            <Hash className="" />
                        </h1>
                        <div className="flex items-baseline gap-2 py-1 ">
                            <Button
                                variant={"ghost"}
                                className="sm:mt-0 p-3 rounded-lg"
                                onClick={() => router.push(`/dashboard/history-of-requests/${request.id}`)}
                            >
                                <Eye className="mx-1 h-5 w-5 text-gray-600" />

                            </Button>
                        </div>
                    </div>
                    <div className="flex px-2 py-3 flex-row gap-md-5 gap-3 flex-wrap">
                        <div className="flex items-center">
                            <label className="flex items-center gap-1 text-md font-semibold text-black dark:text-white">
                                <User className=" h-5 w-5" />
                                {t("name")}
                                :
                            </label>
                            <div className="flex items-center gap-1 text-gray-500 dark:text-white mx-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage
                                        src={request?.user?.avatar ?? ""}
                                        alt={request?.user?.name ?? ""}
                                    />
                                    <AvatarFallback>{request?.user?.name[0]}</AvatarFallback>
                                </Avatar>
                                <p className="text-gray-500 dark:text-white">
                                    {request?.user?.name}
                                    {request?.is_parent ? ` (${getCustomNameKeyLang("Parent", "والد")})` : `(${getCustomNameKeyLang("Driver", "سائق")})`}
                                </p>

                            </div>
                        </div>


                        <div className="flex">
                            <label className="flex items-center gap-1 text-md font-semibold text-black dark:text-white">
                                <Watch className=" h-5 w-5" />
                                {t("student")}
                                :
                            </label>
                            <div className="flex items-center gap-1  text-gray-500 dark:text-white mx-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage
                                        src={request?.watch_user?.avatar ?? ""}
                                        alt={request?.watch_user?.avatar ?? ""}
                                    />
                                    <AvatarFallback>{request?.watch_user?.name}</AvatarFallback>
                                </Avatar>
                                <p >
                                    {request?.watch_user?.name}
                                </p>

                            </div>
                        </div>


                        <div className="flex">
                            <label className="flex items-center gap-1 text-md font-semibold text-black dark:text-white">
                                <Clock2 className="" />
                                {t("createdAt")}
                                :
                            </label>
                            <div className="flex items-center gap-1 text-gray-500 dark:text-white  mx-2">
                                <p className="text-gray-500 dark:text-white rtl:text-right text-left" dir="ltr">
                                    {convertUtcToLocal(request?.created_at)}
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <label className="flex items-center gap-1 text-md font-semibold text-black dark:text-white">
                                <Clock2 className="" />
                                {tDetails("updatedAt")}
                                :
                            </label>
                            <div className="flex items-center gap-1 text-gray-500 dark:text-white  mx-2">
                                <p className="text-gray-500 dark:text-white rtl:text-right text-left" dir="ltr">
                                    {convertUtcToLocal(request?.updated_at)}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        </section>
    )
}

export default RequestCard