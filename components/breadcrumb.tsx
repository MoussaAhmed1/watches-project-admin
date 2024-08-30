import { cn } from "@/lib/utils";
import { ChevronRightIcon,ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
  customStyle?: string
};

export default function BreadCrumb({ items, customStyle }: BreadCrumbPropsType) {
  return (
    <div className={`mb-[0px] mt-1 flex  items-center space-x-1 text-sm text-muted-foreground ${customStyle}`}>
      <Link
        href={"/dashboard"}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        Dashboard
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4 rtl:hidden" />
          <ChevronLeftIcon className="h-4 w-4 ltr:hidden" />
          <Link
            href={item.link}
            className={cn(
              "font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
