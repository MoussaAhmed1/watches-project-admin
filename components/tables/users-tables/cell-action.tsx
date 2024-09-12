"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/patients";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';
import Approve from "@/components/details/role-details/Approve";
import { removeUser } from "@/actions/patients";
import { useTranslations } from "next-intl";
interface CellActionProps {
  data:  IUser;
  role?: "patients" | "admins";
}

export const CellAction: React.FC<CellActionProps> = ({ data,role }) => {
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
            onClick={() => router.push(`/${currentLang}/dashboard/${role}/${data.id}`)}
          >
            <Eye className="mx-1 h-4 w-4" /> {t("view")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/${role}/${data?.id}/edit`)}
          >
            <Edit className="mx-1 h-4 w-4" /> {t("update")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Approve successMessage={t("user_deleted_successfully")} title={t("delete_user")} method={removeUser} revalidateData="/dashboard/patients" id={data?.id} >
              <div className="flex">
                <Trash className="mx-1 h-4 w-4" /> {t("delete")}
              </div>
            </Approve>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
