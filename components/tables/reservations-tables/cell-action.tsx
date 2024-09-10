"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IReservation } from "@/types/reservations";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookie from 'js-cookie';
import { useTranslations } from "next-intl";
interface CellActionProps {
  data:  IReservation;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";
  const onConfirm = async () => {};
   const t = useTranslations("tableActions");

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
            onClick={() => router.push(`/${currentLang}/dashboard/reservations/${data.id}`)}
          >
            <Eye className="mx-1 h-4 w-4"/> {t("view")}
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/user/${data.id}`)}
          >
             <Edit className="mx-1 h-4 w-4" /> {t("update")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mx-1 h-4 w-4" /> {t("delete")}
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
