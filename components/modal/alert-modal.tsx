"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useTranslations } from "next-intl";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  message?:string;
  defualt?:boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  message,
  defualt=false
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("shared");
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t("are_you_sure")}
      description={t("action_cannot_be_undone")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 gap-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button disabled={loading} variant={defualt?"default":"destructive"} onClick={onConfirm}>
          {t("continue")}
        </Button>
      </div>
    </Modal>
  );
};
