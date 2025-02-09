"use client";

import ProfileImg from "@/components/shared/imagesRender/profileImg";
import  { StaticImageData } from "next/image";
import { ReactElement } from "react";

const DetailsCard = ({ title, data }: { title: string, data: { key: string, value: string|StaticImageData, icon: ReactElement, type?: "text" | "img",dir?:"ltr" | "rtl" }[] }) => {
  return (
    <div className="card flex flex-col gap-9">
      <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-gray-700 dark:bg-[#181D26]">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-gray-700">
          <h3 className="font-medium text-black dark:text-white">
            {title}
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {data &&
            data.map((data: { key: string, value: string|StaticImageData, icon: ReactElement, type?: "text" | "img" ,dir?:"ltr" | "rtl" }, indx: number) => (
              <div key={indx}>
                <label className="mb-1 flex items-center gap-1 text-sm font-medium text-black dark:text-white">
                  {data.icon}
                  {data.key}
                </label>
                {
                  data?.type === "img" ?
                  <ProfileImg
                  src={data?.value}
                  alt={data.key}
                  className="w-[50px] h-[50px]"
                />
                    : <p className="text-sm leading-6 text-gray-500 mx-2 rtl:text-right text-left " dir={data?.dir??"ltr"}>{data?.value as string}</p>
                }
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
