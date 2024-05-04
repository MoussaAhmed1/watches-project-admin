"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface IProps {


}

function Cancel({ }: IProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const onConfirm = async () => { };
    const onDelete = async () => {
        setLoading(true);
        // const res = await deleteContactLink(socialLink?.id);
        const res = { error: "" };
        // router.refresh();
        if (res?.error) {
            toast({
                variant: "destructive",
                title: "Contact Us update failed",
                description: res?.error,
            });
        }
        else {
            toast({
                variant: "default",
                title: "Contact Us updated",
                description: `Reservation have been canceled.`,
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
            <Button
                disabled={loading}
                type="button"
                size="lg"
                onClick={() => setOpen(true)}
            >
              Approve Cancel
            </Button>
        </>
    )
}

export default Cancel