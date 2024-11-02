import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";

import Image from "next/image";
import { X } from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
import { useToast } from "@/components/ui/use-toast";

interface image {
    id: string;
    image: string;
}
interface IProps {
    name: string;
    title: string;
    ismulti?: boolean;
    isremovable?: boolean;
    control: any;
    removeLicencefn: ({ id }: { id: string }) => Promise<any>;
    license_images_errors: string | undefined;
    setHasupload: (isupload: boolean) => void;
    initialImages: image[];
    previewUrls: string[] | [];
    setPreviewUrls: (Urls: string[]) => void;
}

function ImagesUploadfield({
    name,
    title,
    control,
    ismulti = false,
    isremovable = false,
    removeLicencefn,
    license_images_errors,
    setHasupload,
    initialImages,
    previewUrls,
    setPreviewUrls
}: IProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleFileChange = (fileList: FileList) => {
        const fileArray = Array.from(fileList);
        const urls = fileArray.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    //remove files
    const [open, setOpen] = useState(false);
    const [selectedImgId, setSelectedImgId] = useState<string | undefined>(
        undefined,
    );

    const onRemoveLicense = useCallback(async () => {
        setLoading(true);
        if (selectedImgId) {
            const res = await removeLicencefn({ id: selectedImgId });
            if (res?.error) {
                toast({
                    variant: "destructive",
                    title: "Delete failed",
                    description: res?.error,
                });
            } else {
                toast({
                    variant: "default",
                    title: "Deleted successfully",
                    description: `Image has been successfully deleted.`,
                });
                setOpen(false);
            }
        }
        setLoading(false);
    }, [removeLicencefn, selectedImgId, toast]);
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onRemoveLicense}
                loading={loading}
            />
            <FormItem
                style={{
                    margin: "0px 0",
                    padding: "0px",
                }}
            >
                <FormLabel className="max-w-30 mx-1">
                    {title} <span className="text-red-800">*</span>
                </FormLabel>
                <div>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="file"
                                name="file"
                                multiple={ismulti}
                                accept="image/*"
                                onChange={(e) => {
                                    if (ismulti) {
                                        field.onChange(e.target.files ? e.target.files : null);
                                    }
                                    else {
                                        field.onChange(e.target.files ? e.target.files[0] : null);
                                    }
                                    if (e.target.files) {
                                        handleFileChange(e.target.files);
                                        setHasupload(true);
                                    } else {
                                        setHasupload(false);
                                    }
                                }}
                            />
                        )}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        overflow: "auto",
                        maxWidth: "100%",
                        flexWrap: "wrap",
                        flexShrink: "no-shrink",
                    }}
                >
                    {initialImages?.map((image: { id: string; image: string }, index: number) => (
                        <div
                            key={image?.id}
                            style={{
                                color: "darkgray",
                                padding: 0,
                                width: 100,
                                height: 100,
                                overflow: "hidden",
                                borderColor: "darkgray",
                                position: "relative",
                                borderRadius: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            <Button
                                variant={"link"}
                                type="button"
                                onClick={() => {
                                    setOpen(true);
                                    setSelectedImgId(image.id);
                                }}
                                style={{
                                    position: "absolute",
                                    top: -4,
                                    right: 0,
                                    zIndex: 5,
                                    padding: 0,
                                    display:isremovable?"block":"none"
                                }}
                            >
                                <X color="red" />
                            </Button>
                            <Image
                                src={image?.image}
                                style={{
                                    objectFit: "cover",
                                }}
                                fill
                                alt="licensesImage"
                            />
                        </div>
                    ))
                    }

                    {previewUrls?.map((image: string, index: number) => (
                        <div
                            key={index}
                            style={{
                                color: "darkgray",
                                padding: 0,
                                width: 100,
                                height: 100,
                                overflow: "hidden",
                                borderColor: "darkgray",
                                position: "relative",
                                borderRadius: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            <Image
                                src={image}
                                style={{
                                    objectFit: "cover",
                                }}
                                fill
                                alt="licensesImage"
                            />
                        </div>
                    ))}
                </div>
                {license_images_errors && (
                    <FormMessage style={{ marginLeft: "5px" }}>
                        {license_images_errors as any}
                    </FormMessage>
                )}
            </FormItem>
        </>
    );
}

export default ImagesUploadfield;
