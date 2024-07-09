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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/packages/${packageType}/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/packages/${packageType}/${data.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
