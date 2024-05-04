import { Card } from "@/components/ui/card"
import { Mail, Star } from "lucide-react";
import DoctorIcon from '../../../public/assets/doctor.png'
import Image from "next/image";
import { Doctor } from "@/types/reservations";
interface IProps{
    doctor:Doctor;
}

function DoctorInfoCard({doctor}:IProps) {
  return (
    <Card className="grow bg-gray-50 dark:bg-gray-800 xl:w-96 flex justify-between w-full items-center md:items-start px-1 py-6 md:p-3 xl:p-6 flex-col">
    <h6 className="text-xl dark:text-white font-semibold leading-5">Doctor Info</h6>
    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
      <div className="flex flex-col justify-start items-start flex-shrink-0">
        <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
          <Image width={50} height={50} src={DoctorIcon || doctor?.avatar} alt="avatar" />
          <div className="flex justify-start items-start flex-col space-y-2">
            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{doctor?.name}</p>
            <p className="flex items-center gap-1 text-sm dark:text-gray-300 leading-5 text-gray-600">{doctor?.rating} <Star size={15} /></p>
          </div>
        </div>
      </div>

      <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">clinic Name</p>
            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{doctor?.clinic?.name}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">clinic address</p>
            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{doctor?.clinic?.address}</p>
          </div>
        </div>
      </div>

    </div>
  </Card>
  )
}

export default DoctorInfoCard