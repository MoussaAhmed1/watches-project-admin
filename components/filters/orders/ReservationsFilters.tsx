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
import { useRouter } from "next/navigation";

enum Status {
    ALL = '',
    STARTED = 'STARTED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}


function ReservationsFilters() {
    const { createQueryString, pathname, searchParams } = useCostomSearchParams();
    const router = useRouter();
    return (
        <Select onValueChange={(e: any) => {
            router.replace(`${pathname}?${createQueryString("status", e)}`, { scroll: false });
        }} defaultValue={searchParams.get("status") || ""}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>status</SelectLabel>
                    <SelectItem value={Status.ALL}>All</SelectItem>
                    <SelectItem value={Status.STARTED}>Started</SelectItem>
                    <SelectItem value={Status.CANCELLED}>Cancelled</SelectItem>
                    <SelectItem value={Status.COMPLETED}>Completed</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default ReservationsFilters