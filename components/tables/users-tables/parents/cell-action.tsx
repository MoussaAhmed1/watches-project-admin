"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/users";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { removeUser } from "@/actions/users/users-actions";
import { useTranslations } from "next-intl";
import UserFormAction from "@/components/forms/users-forms/editUser";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
  toBeVerified?: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, toBeVerified = false }) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
   const t = useTranslations("tableActions");
  const {role} = useParams();
  const onConfirm = async () => {
    const res = await removeUser({id:data.id,revalidateData:`/dashboard/${role}`});
    if (res?.error) {
      toast({
        variant: "destructive",
        title:  t("deleteFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: t("deletedSuccessfully"),
      });
      router.refresh();
    }

    setLoading(false);
    setOpen(false);

  };
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

