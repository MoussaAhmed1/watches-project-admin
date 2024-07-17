"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { removeNurseLicence, updateNurseAddtionalInfo } from "@/actions/nurses";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { LicenseImage } from "@/types/nurses";
import Image from "next/image";
import { X } from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
import nurseAddtionalInfoSchema from "./nurse-addtionalInfoSchema";
import UseImagesStore from "@/hooks/use-images-store";
export type NurseAddtionalInfoFormValues = z.infer<typeof nurseAddtionalInfoSchema>;

interface NurseFormProps {
  initialData?: NurseAddtionalInfoFormValues;
  id: string;
  initialLicensesImages: LicenseImage[];
}

export const NurseAddtionalInfoForm: React.FC<NurseFormProps> = ({
  initialData,
  id,
  initialLicensesImages,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = "Save changes";

  const defaultValues = initialData;

  const form = useForm<NurseAddtionalInfoFormValues>({
    resolver: zodResolver(nurseAddtionalInfoSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;

  const [hasupload, setHasupload] = useState(false)
  // store
  const {getUrls} = UseImagesStore();


  //new Images
  const [previewUrls, setPreviewUrls] = useState<string[] | []>([]);

  const handleFileChange = (fileList: FileList) => {
    const fileArray = Array.from(fileList);
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };


  //remove files 
  const [open, setOpen] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState<string | undefined>(undefined);

  const onRemoveLicense = useCallback(
    async () => {
      if (selectedImgId) {
        const res = await removeNurseLicence({ id: selectedImgId });
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
            description: `Nurse license has been successfully deleted.`,
          });
          setOpen(false);
          //remove old from preview
          // const remaining_images = licensesImages.filter((image) =>image.id !== id);
          // setLicensesImages(remaining_images);
        }
      }
    },
    [selectedImgId, toast],
  )

  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);

    //license_images
    if (data?.license_images && hasupload) {
      const license_images_array = await getUrls(data?.license_images as unknown as FileList);
      data.license_images = license_images_array?.join();
    }
    else {
      data.license_images = null as unknown as any;
    }

    const res = await updateNurseAddtionalInfo({ data, userId: id });
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Updat failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: "Updated successfully",
        description: `Nurse has been successfully updated.`,
      });
    }

    setLoading(false);
    //remove files from preview
    setPreviewUrls([])
    // form.reset();
    setHasupload(false);
  };
  //show error messages
  // console.log(form.formState.errors);

  return (
    <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onRemoveLicense}
        loading={loading}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-1 gap-8">
            {/* License Images */}
            <FormItem
              style={{
                margin: "0px 0",
                padding: "0px",
              }}
            >
              <FormLabel className="max-w-30 mx-1">License Images <span className="text-red-800">*</span></FormLabel>
              <div>
                <Controller
                  name="license_images"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      name="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files ? e.target.files : null);
                        if (e.target.files) {
                          handleFileChange(e.target.files);
                          setHasupload(true);
                        }
                        else {
                          setHasupload(false);
                        }
                      }}
                    />
                  )}
                />
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                overflow: "auto",
                maxWidth: "100%",
                flexWrap: "wrap",
                flexShrink: "no-shrink",
              }}>
                {initialLicensesImages?.map((image: LicenseImage, index: number) => (
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
                        padding: 0
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
                ))}
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
              {errors?.license_images?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.license_images?.message as any}</FormMessage>}
            </FormItem>

          </div>
         
            {/* Year of Experience */}
            <FormField name="experience" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.experience && <FormMessage>{errors.experience.message}</FormMessage>}
              </FormItem>
            )} />

          
          <div className="md:grid md:grid-cols-1 gap-8">
            {/* Summary */}
            <FormField name="summary" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Summary <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                {errors.summary && <FormMessage>{errors.summary.message}</FormMessage>}
              </FormItem>
            )} />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
