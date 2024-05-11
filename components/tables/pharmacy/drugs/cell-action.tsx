"use client";
import PharmacyDrugsForm from "@/components/forms/pharmacy-drugs/PharmacyDrugsForm";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category, Drug, } from "@/types/pharmacy";
import { Edit, MoreHorizontal, Trash, Eye, Save, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: Drug;
  categories: Category[];
}

export const CellAction: React.FC<CellActionProps> = ({ data, categories }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => { };

  return (
    <div className="flex flex-end grow w-5 md:w-1 xs:w-0">
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
        <PharmacyDrugsForm drug={data} id={data.id} categories={categories} />
      </div>
    </div>
  );
};
