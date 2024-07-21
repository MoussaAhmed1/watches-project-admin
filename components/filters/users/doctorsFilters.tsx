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
import { useRouter } from "next/navigation";

interface IProps {
    specializations: ISpecializations[]
}

function DoctorsFilters({ specializations }: IProps) {
    const { createQueryString, pathname, searchParams } = useCostomSearchParams();
    const router = useRouter();
    return (
        <Select onValueChange={(e: any) => {
            router.replace(`${pathname}?${createQueryString("specialization_id", e)}`, { scroll: false });
        }} defaultValue={searchParams.get("specialization_id") || ""}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a specialization" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>specialization</SelectLabel>
                    <SelectItem value={""}>All</SelectItem>
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