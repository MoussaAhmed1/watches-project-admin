"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface IProps {
    title: string;
    id: string;
    successMessage: string;
    defualt: boolean,
    method: (id: string) => Promise<any>;
    children?: React.ReactNode;

}

function Approve({ title, defualt = false, successMessage, method, id, children }: IProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const onConfirm = async () => {
        setLoading(true);
        const res = await method(id);
        if (res?.error) {
            toast({
                variant: "destructive",
                title: "Action failed",
                description: res?.error,
            });
        }
        else {
            toast({
                variant: "default",
                title: "Action updated",
                description: successMessage ? successMessage : `Request has been Approved.`,
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
                defualt={defualt}
            />
            {!children ?
                <Button
                    disabled={loading}
                    type="button"
                    size="lg"
                    onClick={() => setOpen(true)}
                >
                    {title}
                </Button>
                : (
                    <Button
                        disabled={loading}
                        type="button"
                        style={{ all: "unset", width: "100%" }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpen(true)
                        }}
                    >
                        {children}
                    </Button>
                )}
        </>
    )
}

export default Approve