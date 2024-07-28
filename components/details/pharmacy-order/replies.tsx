import { PharmacyData } from "@/types/pharmacy-order";
import { SharedTable } from "@/components/tables/shared/Shared-table";
import OrderRepliescolumns from "@/components/tables/pharmacy/order/order-replies/columns";
interface PharmacyListProps {
    data: PharmacyData[];
}

export const PharmacyOrderRepliesList: React.FC<PharmacyListProps> = ({ data }) => {
    return (
        <div className="flex-1 space-y-4 w-[98%]">
            <SharedTable
                searchKey="Pharmacy Orders"
                pageNo={1}
                columns={OrderRepliescolumns}
                totalitems={data?.length}
                data={data as unknown as PharmacyData[]}
                pageCount={1}
                withPagination={false}
                withSearch={false}
            />
        </div>
    );
};