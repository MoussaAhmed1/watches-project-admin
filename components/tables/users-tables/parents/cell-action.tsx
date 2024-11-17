"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/users";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { removeUser } from "@/actions/users/users-actions";
import { useTranslations } from "next-intl";
import Cookie from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Approve from "@/components/shared/table/Approve";
interface CellActionProps {
  data: IUser;
}
function getSecondSegmentAfterDashboard(url:string) {
  const regex = /\/dashboard\/[^/?]+\/([^/?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";
   const t = useTranslations("tableActions");
   const path = usePathname();
  const role = getSecondSegmentAfterDashboard(path);
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
            onClick={() => router.push(`/${currentLang}/dashboard/users/${role}/${data.id}`)}
          >
            <Eye className="mx-1 h-4 w-4"/> {t("view")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/users/${role}/${data?.id}/edit`)}
          >
             <Edit className="mx-1 h-4 w-4" /> {t("update")}
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Approve successMessage="Deleted Successfully" title="Delete User"  method={removeUser} revalidateData={`/dashboard/${role}`} id={data?.id} >
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

