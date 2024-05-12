import { Card } from "@/components/ui/card";
import { CircleSlash, Mail, Star } from "lucide-react";
import DoctorIcon from "../../../public/assets/doctor.png";
import Image from "next/image";
import { Doctor } from "@/types/reservations";
import { Category } from "@/types/pharmacy";
import Noitems from "../no-items/NoItems";
interface IProps {
  drugs: { name: string; id: string, category_id: string }[];
  categories: Category[];
}

function DrugsCard({ drugs, categories }: IProps) {
  return (
    <Card className="grow bg-gray-50 dark:bg-gray-800 xl:w-96 flex justify-between w-full items-center md:items-start px-1 py-6 md:p-3 xl:p-6 flex-col">
      <h6 className="text-xl dark:text-white font-semibold leading-5">Drugs</h6>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center flex-col w-full md:justify-start items-center  pb-4 min-h-16">
            {drugs?.length>0 ? drugs?.map((drug, index) => (
              <div
                className={`flex justify-between w-full pb-2 mt-10 border-b border-gray-200`}
                key={drug?.name}
              >
                <p className="text-base dark:text-white leading-4 text-gray-800">
                  {drug?.name}
                </p>
                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                  {categories?.find(cate => cate.id === drug?.category_id)?.name ?? "-"}
                </p>
              </div>
            )):(
              <Noitems
              title={`No items`}
              icon={<CircleSlash style={{ color: "gray", fontSize: "4.2em" }}
              />}
              minHeight={250}
            />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DrugsCard;
