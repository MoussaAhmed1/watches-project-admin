"use client";
import { deleteBanner } from "@/actions/banars";
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
import { IBanner } from "@/types/banars";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Cookie from 'js-cookie';
interface CellActionProps {
  data: IBanner;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
    const currentLang = Cookie.get("Language") ?? "en";
  const router = useRouter();
  const { toast } = useToast();
 const t = useTranslations("tableActions");
  const onConfirm = async () => {
    setLoading(true);
    const res = await deleteBanner({ id: data?.id });
    if (res?.error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: res?.error,
      });
    } else {
      toast({
        title: "Deleted success!",
        variant: "default",
        description: res?.error,
      });
    };
    setLoading(false);
    setOpen(false);
  }
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
            onClick={() => router.push(`/dashboard/banars/${data.id}`)}
          >
            <Eye className="mx-1 h-4 w-4"/> {t("view")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/banars/${data.id}/edit`)}
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
