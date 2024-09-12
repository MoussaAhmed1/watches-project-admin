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
import { Category } from "@/types/pharmacy";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n.config";
import { useTranslations } from "next-intl";

interface IProps {
    categories: Category[],
    lang?:Locale
}

function PharmaciesFilters({ categories,lang }: IProps) {
    const { createQueryString, pathname, searchParams } = useCostomSearchParams();
    const t = useTranslations("shared");
    const router = useRouter();
    return (
        <Select onValueChange={(e: any) => {
            router.replace(`${pathname}?${createQueryString("category_id", e)}`, { scroll: false });
        }} defaultValue={searchParams.get("category_id") || ""} dir={lang === "ar" ? "rtl" : "ltr"}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a specialization" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t("category")}</SelectLabel>
                    <SelectItem value={""}>{t("all")}</SelectItem>
                    {categories?.map(spec => (
                        <SelectItem key={spec?.id} value={spec.id}>{getCustomNameKeyLang(spec?.name_en, spec?.name_ar)}</SelectItem>
                    )
                    )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default PharmaciesFilters