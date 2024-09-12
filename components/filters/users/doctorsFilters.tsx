"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import useCostomSearchParams from "@/hooks/use-searchParams";
import { ISpecializations } from "@/types/additional-info-specializations";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
    specializations: ISpecializations[]
}

function DoctorsFilters({ specializations }: IProps) {
    const { createQueryString, pathname, searchParams } = useCostomSearchParams();
    const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
    const router = useRouter();
    const t = useTranslations("shared");
    return (
        <Select onValueChange={(e: any) => {
            router.replace(`${pathname}?${createQueryString("specialization_id", e)}`, { scroll: false });
        }} defaultValue={searchParams.get("specialization_id") || ""} dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a specialization" />
            </SelectTrigger>
            <SelectContent className="h-full">
                <SelectGroup>
                    <SelectLabel>{t("specialization")}</SelectLabel>
                    <SelectItem value={""}>{t("all")}</SelectItem>
                    {specializations?.map(spec => (
                        <SelectItem key={spec?.id} value={spec.id}>{getCustomNameKeyLang(spec?.name_en, spec?.name_ar)}</SelectItem>
                    )
                    )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default DoctorsFilters