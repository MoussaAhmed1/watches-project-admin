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

interface IProps {
    categories: Category[]
}

function PharmaciesFilters({ categories }: IProps) {
    const { createQueryString, pathname, searchParams } = useCostomSearchParams();
    const router = useRouter();
    return (
        <Select onValueChange={(e: any) => {
            router.replace(`${pathname}?${createQueryString("category_id", e)}`, { scroll: false });
        }} defaultValue={searchParams.get("category_id") || ""}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a specialization" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value={""}>All</SelectItem>
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