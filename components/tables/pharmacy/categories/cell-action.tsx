"use client";
import { deleteCategory } from "@/actions/pharmacy-categories";
import PharmacyCategoryForm from "@/components/forms/pharmacy-category/PharmacyCategoryForm";
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
import { PharmacyCategories } from "@/types/pharmacy-categories";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: PharmacyCategories;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const onConfirm = async () => {
    const res = await deleteCategory(data.id);
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
        description: `Pharmacy Category has been successfully deleted.`,
      });
    }

    setLoading(false);
    setOpen(false);

  };


  return (
    <div className="flex flex-end grow">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex-end grow flex gap-1 justify-center items-center ">
        <Button
          disabled={loading}
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        <PharmacyCategoryForm category={data} id={data.id} />
      </div>
    </div>
  );
};
