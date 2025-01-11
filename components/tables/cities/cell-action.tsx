"use client";
import { Button } from "@/components/ui/button";
import { City } from "@/types/map";
import { Eye, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { AlertModal } from "@/components/modal/alert-modal";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { deleteWatch } from "@/actions/watches/watches-actions";
import { useRouter } from "next/navigation";
import { deleteCity } from "@/actions/settings/cities-actions";
import CityForm from "@/components/forms/cities-forms/CitiesForm";

interface CellActionProps {
  data: City;
  toBeVerified?: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, toBeVerified = false }) => {
  const t = useTranslations("tableActions");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const onConfirm = async () => {
    const res = await deleteCity(data?.id ?? "");
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
      <div className="flex-end grow flex gap-1 justify-start items-center ">
        <Button
          disabled={loading}
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        <CityForm city={data} id={data.id} />
      </div>
    </div>
  );
};


