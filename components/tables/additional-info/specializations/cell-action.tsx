"use client";

import { deleteSpecialization } from "@/actions/additional-info-specializations";
import SpecializationForm from "@/components/forms/specialization/SpecializationForm";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ISpecializations } from "@/types/additional-info-specializations";
import { Trash, } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
interface CellActionProps {
  data: ISpecializations;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const t = useTranslations("tableActions");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const onConfirm = async () => {
    const res = await deleteSpecialization(data.id);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("deleteFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: t("deletedSuccessfully"),
      });
    }

    setLoading(false);
    setOpen(false);

  };
  return (
    <div className="flex flex-end grow" key={data.id}>
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
        <SpecializationForm specialization={data} id={data.id} />
      </div>
    </div>
  );
};
