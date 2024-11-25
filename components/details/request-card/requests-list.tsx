"use client"

import { HistoryOfRequests } from "@/types/watches/requests"
import RequestCard from "./request-card"
import { Separator } from "@radix-ui/react-separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
interface IProps {
    requests: HistoryOfRequests[];

}

function RequestsList({ requests }: IProps) {
    return (
        <ScrollArea className="rounded-md border h-[75vh] p-2" >
            {
                requests.map((request) => (
                    <div key={request.id} className="w-full">
                        <RequestCard
                            
                            request={request}
                        />
                        <Separator className="my-4 w-full" />
                    </div>
                ))
            }
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}

export default RequestsList