"use client"
import { cn } from "@/lib/utils";
import { ChevronRightIcon,ChevronLeftIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
  customStyle?: string
};

export default function BreadCrumb({ items, customStyle }: BreadCrumbPropsType) {
  const t = useTranslations("shared");
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  return (
    <div className={`mb-[0px] mt-1 flex  items-center space-x-1 text-sm text-muted-foreground ${customStyle}`}>
      <Link
        href={`/${currentLang}/dashboard`}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {t("dashboard")}
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4 rtl:hidden" />
          <ChevronLeftIcon className="h-4 w-4 ltr:hidden" />
          <Link
            href={`/${currentLang}/${item.link}`}
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
