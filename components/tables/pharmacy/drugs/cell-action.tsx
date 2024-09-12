"use client";

import { deleteProduct } from "@/actions/pharmacies";
import PharmacyDrugsForm from "@/components/forms/pharmacy-drugs/PharmacyDrugsForm";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Category, Drug, } from "@/types/pharmacy";
import {  Trash, } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
interface CellActionProps {
  data: Drug;
  categories: Category[];
}

export const CellAction: React.FC<CellActionProps> = ({ data, categories }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const onConfirm = async () => {
    const res = await deleteProduct(data.id);
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
        description: `Product has been successfully deleted.`,
      });
    }

    setLoading(false);
  };
 const t = useTranslations("tableActions");
  return (
    <div className="flex flex-end grow w-5 md:w-1 xs:w-0" key={data.id}>
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
