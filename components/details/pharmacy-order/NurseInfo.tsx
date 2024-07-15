import { Card } from "@/components/ui/card"
import { Star } from "lucide-react";
import NurseIcon from '../../../public/assets/doctor.png'
import { Nurse } from "@/types/reservations";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
interface IProps {
  nurse: Nurse;
}

function NurseInfoCard({ nurse }: IProps) {
  const nurse_data_items =
  [
    {
      data_key: "Phone",
      data_value: nurse?.phone,
    },
    // {
    //   data_key: "Allergic reactions",
    //   data_value: user?.allergic_reactions,
    // },
    // {
    //   data_key: "Height",
    //   data_value: user?.height + " Cm",
    // },
    // {
    //   data_key: "Weight",
    //   data_value: user?.weight + " Kg",
    // },
    // {
    //   data_key: "Notes",
    //   data_value: user?.notes,
    // },
  ]
  return (
    <Card className="grow bg-gray-50 dark:bg-gray-800 xl:w-96 flex justify-between w-full items-center md:items-start px-1 py-6 md:p-3 xl:p-6 flex-col">
      <h6 className="text-xl dark:text-white font-semibold leading-5">Nurse Info</h6>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <ProfileImg
              className="w-[50px] h-[50px]"
              src={nurse?.avatar || NurseIcon}
              alt={nurse?.name}
            />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{nurse?.name}</p>
              <p className="flex items-center gap-1 text-sm dark:text-gray-300 leading-5 text-gray-600">{nurse?.rating} <Star size={15} /></p>
            </div>
          </div>
        </div>

        {nurse_data_items.map(({ data_key, data_value }) => (
          <div className="flex justify-between w-full border-t py-4" key={data_key}>
            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default NurseInfoCard