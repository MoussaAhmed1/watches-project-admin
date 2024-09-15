"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Language } from "@/utils/changeLanguageHandler";
import { Button } from "../ui/button";
import { Languages as LanguagesIcon } from "lucide-react";
import Cookie from 'js-cookie';
const languages = [
  {
    label: "العربية",
    value: "ar",
  },
  {
    label: "English US",
    value: "en",
  },
];
export default function LocaleSwitcher({ lang }: { lang: Language }) {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          languages.map(({ value, label }) =>
          (<DropdownMenuItem
            key={value}
            onClick={() => { Cookie.set("Language", value); }}
          >
            <Link 
            href={redirectedPathName(value)}
            onClick={() => { Cookie.set("Language", value); }}
            >{label}</Link>
          </DropdownMenuItem>)
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
