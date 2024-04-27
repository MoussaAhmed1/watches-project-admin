"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 ">
      {items.map((item, index) => {
        if (!item?.subItems) {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
                
              >
                <span
                  className={cn(
                    "group flex items-center  rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          );
        } else {
          const Icon = Icons[item.icon || "arrowRight"];

          return (
            <Accordion type="single" collapsible key={index} className="py-0 my-0">
              <AccordionItem value="item-1" >
                <AccordionTrigger >
                  {<Icon className="h-4 w-4 mr-2 " />} {item?.title}
                </AccordionTrigger>
                {item?.children?.map((child) => (
                  <AccordionContent key={child?.href}>
                    <Link href={child?.href}>{child?.title}</Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          );
        }
      })}
    </nav>
  );
}
