import { Card } from "@/components/ui/card"
import UserIcon from '../../../public/assets/user.png'
import Image from "next/image";
import { ClientInfo, FamilyMember } from "@/types/reservations";
interface IProps {
  client: ClientInfo;
  familyMember?: boolean;

}

function ClientInfoCard({ client, familyMember }: IProps) {
  const client_data_items =
    [
      {
        data_key: "Height",
        data_value: client?.height,
      },
      {
        data_key: "Weight",
        data_value: client?.weight,
      },
    ]
  return (
    <Card className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-1 py-6 md:p-3 xl:p-4 flex-col">
      <h6 style={{ paddingBottom: familyMember ? "10px" : "1px" }} className="text-xl dark:text-white font-semibold leading-5">{familyMember ? "Family-Member Info" : "Client Info"}</h6>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        {<div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <Image width={50} height={50} src={UserIcon || client?.avatar} alt="avatar" />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{client?.name}</p>
            </div>
          </div>
        </div>}

        {client_data_items.map(({ data_key, data_value }) => (
          <div className="flex justify-between w-full border-t py-4" key={data_key}>
            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
          </div>
        ))}

        {familyMember && <div className="flex justify-between w-full border-t py-4">
          <p className="text-base dark:text-white leading-4 text-gray-800">Kinship</p>
          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{client?.kinship}</p>
        </div>}

        {!familyMember && <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">client address</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{client?.address ?? "-"}</p>
            </div>
          </div>
        </div>}

      </div>
    </Card>
  )
}

export default ClientInfoCard