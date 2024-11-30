"use client";

import { Upload } from "lucide-react"
import { useCallback, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useTranslations } from "next-intl";
import { onImportFile } from "@/actions/watches/watches-actions";
import { Button } from "../ui/button";

interface IProps {

}

function ImportExelBtn({ }: IProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const tShared = useTranslations("shared");
    const { toast } = useToast();
    const handleImportItems = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0];
            setIsLoading(true);
            if (selectedFile) {
                const file = new FormData();
                 file.append('file', selectedFile);
                const res = await onImportFile({file});
                if (res?.error) {
                    toast({
                        variant: "destructive",
                        title: tShared("uploadFailed"),
                        description: res?.error,
                    });
                }
                if (res?.message==="alreadyExist") {
                    toast({
                        variant: "default",
                        title: tShared("alreadyExist"),
                    });
                }
                else {
                    toast({
                        variant: "default",
                        title: tShared("uploadedSuccessfully"),
                    });
                }
                setIsLoading(false);
                event.target.value = '';
            }
        },
        [tShared, toast],
    )

    return (

        <div>
            <input
                type="file"
                name="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImportItems}
            />
            <Button disabled={isLoading}
                type="button"
                size="lg"
                onClick={() => {
                    fileInputRef?.current?.click()
                }}
                 >
                <Upload className="ltr:mx-1 rtl:ml-2 h-5 w-5" />    {tShared('import')}

            </Button>
        </div>
    )
}

export default ImportExelBtn