"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HistoryOfRequests } from "@/types/watches/requests";
import { MoreHorizontal, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';
import { useTranslations } from "next-intl";

interface CellActionProps {
  data: HistoryOfRequests;
  toBeVerified?: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, toBeVerified = false }) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";
 const t = useTranslations("tableActions");
  return (
    <>
      <DropdownMenu modal={false} dir={currentLang === "ar" ? "rtl" : "ltr"}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t("open_menu")}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/history-of-requests/${data.id}`)}
          >
            <Eye className="mx-1 h-4 w-4"/> {t("view")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

