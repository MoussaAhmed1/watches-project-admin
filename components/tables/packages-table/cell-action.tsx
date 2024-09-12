"use client";
import { deleteClientPackage, deletePharmacyPackage } from "@/actions/packages";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { IClientPackage, IPharmacyPackage } from "@/types/packages";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookie from 'js-cookie';
import { useTranslations } from "next-intl";
interface CellActionProps {
  data: IClientPackage | IPharmacyPackage;
  packageType?: "client-packages" | "pharmacy-packages";
}

export const CellAction: React.FC<CellActionProps> = ({ data, packageType = "client-packages" }) => {
  const [loading, setLoading] = useState(false);  
  const currentLang = Cookie.get("Language") ?? "en";
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
   const t = useTranslations("tableActions");
  const onConfirm = async () => {
    const DeleteMethod = packageType === "pharmacy-packages" ? deletePharmacyPackage : deleteClientPackage;
    const res = await DeleteMethod(data.id);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: "Deleted successfully",
        description: `Package has been successfully deleted.`,
      });
    }

    setLoading(false);
    setOpen(false);
  };

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
            onClick={() => router.push(`/${currentLang}/dashboard/packages/${packageType}/${data.id}`)}
          >
            <Eye className="mx-1 h-4 w-4"/> {t("view")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/packages/${packageType}/${data.id}/edit`)}
          >
             <Edit className="mx-1 h-4 w-4" /> {t("update")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mx-1 h-4 w-4" /> {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
