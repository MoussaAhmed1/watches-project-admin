"use client";
import { Button } from "@/components/ui/button";
import { IWatch } from "@/types/watches";
import {  Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { AlertModal } from "@/components/modal/alert-modal";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { deleteWatch } from "@/actions/watches/watches-actions";
import WatchForm from "@/components/forms/watches-forms/watchesForm";

interface CellActionProps {
  data: IWatch;
  toBeVerified?: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, toBeVerified = false }) => {
  const t = useTranslations("tableActions");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const onConfirm = async () => {
    const res = await deleteWatch(data.id);
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
        <WatchForm watch={data} id={data.id} />
      </div>
    </div>
  );
};


