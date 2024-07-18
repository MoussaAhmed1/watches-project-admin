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
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { removePharmacyLicence, removePharmacyLogo, updatePharmacyAddtionalInfo } from "@/actions/pharmacy";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/map/map";
import { MapData } from "@/types/map";
import { pharmacyAddtionalInfoSchema } from "./pharmacySchema";
import { Category, License, Logo } from "@/types/pharmacy";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import Cookie from 'js-cookie';
import { Separator } from "@/components/ui/separator";
import UseImagesStore from "@/hooks/use-images-store";
import ImagesUploadfield from "@/components/shared/fileUpload/imagesUpload";

export type PharmacyFormValues = z.infer<typeof pharmacyAddtionalInfoSchema>;

interface PharmacyFormProps {
  initialData?: PharmacyFormValues;
  id: string;
  categories: Category[];
  initialLicensesImages: License[];
  LogoImage: Logo[];

}

export const PharmacyAddtionalInfoForm: React.FC<PharmacyFormProps> = ({
  initialData,
  id,
  categories,
  initialLicensesImages,
  LogoImage
}) => {
  const { toast } = useToast();
  const currentLang = Cookie.get("Language");
  const [loading, setLoading] = useState(false);
  const action = "Save changes";

  const defaultValues = initialData;
  const form = useForm<PharmacyFormValues>({
    resolver: zodResolver(pharmacyAddtionalInfoSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;

  //categories options 

  const categoriesOptions = useMemo(() => categories.map((cate) => {
    return { label: getCustomNameKeyLang(cate?.name_en, cate?.name_ar) ?? "", value: cate.id }
  }), [categories])

  // store
  const { getUrls } = UseImagesStore();

  //new Images
  //License
  const [previewUrls, setPreviewUrls] = useState<string[] | []>([]);
  const [hasuploadLicense, setHasuploadLicense] = useState(false)

  //Logo
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string[] | []>([]);
  const [hasuploadLogo, setHasuploadLogo] = useState(false)
  //map:
  const InitialMapData = initialData?.latitude
    ? {
      coords: {
        lat: initialData?.latitude,
        lng: initialData?.longitude,
      },
      address: {
        add_ar: initialData?.address,
        add_en: initialData?.address,
      },
    }
    : null;
  const [mapData, setMapData] = useState<MapData | null>(InitialMapData);
  useEffect(() => {
    if (mapData) {
      form.setValue("latitude", mapData?.coords?.lat);
      form.setValue("longitude", mapData?.coords?.lng);
      form.setValue("address", currentLang === 'en' ? mapData?.address.add_en : mapData?.address.add_ar);
      form.clearErrors(["longitude", "latitude"]);
    }
  }, [currentLang, form, mapData]);


  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    //TODO
    // logo_images
    if (data?.logo_images && hasuploadLogo) {
      const logo_images = await getUrls(data?.logo_images as unknown as File);
      data.logo_images = logo_images as unknown as string;
    }
    //license_images
    if (data?.license_images && hasuploadLicense) {
      const license_images_array = await getUrls(data?.license_images as unknown as FileList);
      data.license_images = license_images_array?.join();
    }
    else {
      data.license_images = null as unknown as any;
    }

    const res = await updatePharmacyAddtionalInfo({ data, userId: id });
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: "Updated successfully",
        description: `Pharmacy has been successfully updated.`,
      });
    }
    setLoading(false);
    //remove files from preview
    setPreviewUrls([])
    setPreviewLogoUrl([])
    setHasuploadLicense(false);
    setHasuploadLogo(false);
  };
  //show error messages
  // console.log(form.formState.errors);

  return (
    <>
      <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-1 gap-8">
              {/* License Images */}
              <ImagesUploadfield
                control={control}
                initialImages={initialLicensesImages.map(license => ({ id: license?.id, image: license?.mage }))}
                license_images_errors={errors?.license_images?.message}
                title={"License Images"}
                name={"license_images"}
                removeLicencefn={removePharmacyLicence}
                setHasupload={setHasuploadLicense}
                previewUrls={previewUrls}
                setPreviewUrls={setPreviewUrls}
                ismulti
                isremovable
              />

              {/* Logo Image */}
              <ImagesUploadfield
                control={control}
                initialImages={LogoImage}
                license_images_errors={errors?.logo_images?.message}
                title={"Logo Images"}
                name={"logo_images"}
                removeLicencefn={removePharmacyLogo}
                setHasupload={setHasuploadLogo}
                previewUrls={previewLogoUrl}
                setPreviewUrls={setPreviewLogoUrl}
                ismulti={false}
                isremovable
              />

            </div>

            <div className="md:grid md:grid-cols-1 gap-8">
              {/* Year of Experience */}
              <FormField name="expierence" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience <span className="text-red-800">*</span></FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {errors.expierence && <FormMessage>{errors.expierence.message}</FormMessage>}
                </FormItem>
              )} />
              {/* Summary */}
              <FormField name="summery" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary <span className="text-red-800">*</span></FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  {errors.summery && <FormMessage>{errors.summery.message}</FormMessage>}
                </FormItem>
              )} />
            </div>
            <Separator style={{ margin: "25px 0" }} />
            <h5 style={{ margin: "12px 0" }} className="text-gray-500">Pharmacy Info:</h5>
            <div className="md:grid md:grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="ph_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pharmacy name <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Pharmacy name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label htmlFor="categories" className="font-medium text-sm">
                  {("Categories")} <span className="text-red-800">*</span>
                </label>
                <div className="flex-col w-full ">
                  <Select
                    id="categories"
                    isSearchable={true}
                    isClearable={true}
                    isMulti
                    defaultValue={initialData?.categories?.map((category) =>
                      categoriesOptions.find(
                        (option) => option.value === category
                      )
                    )}
                    onChange={(values: any) => {
                      form.clearErrors("categories");
                      form.setValue(
                        "categories",
                        values!.map((val: any) => val.value)
                      );
                    }}
                    className="w-full"
                    options={categoriesOptions}
                  />
                  {errors.categories && (
                    <span className="error-text">
                      {errors.categories.message}
                    </span>
                  )}
                </div>
              </div>
              {/* Latitude */}

              {/* Longitude */}
              <Map
                setMapData={setMapData}
                defaultPos={(initialData?.latitude && initialData?.longitude) ? { lat: initialData?.latitude, lng: initialData?.longitude } : null}
              />
              {errors.longitude && <FormMessage>{errors.longitude.message}</FormMessage>}

              <FormField
                control={form.control}
                name="address"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>address <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* {errors.latitude && <FormMessage>{errors.latitude.message}</FormMessage>} */}
            </div>
            {/* TimePicker */}
            <div className="flex space-x-2">
              <div>
                <FormLabel className="max-w-30 mx-1">Open Time <span className="text-red-800">*</span></FormLabel>
                <CustomTimePicker
                  val={form.getValues("open_time") ?? undefined}
                  setval={(val) => {
                    form.clearErrors("open_time");
                    form.setValue(
                      "open_time",
                      val
                    );
                  }} />
              </div>
              <div>
                <FormLabel className="max-w-30 mx-1">Close Time <span className="text-red-800">*</span></FormLabel>
                <CustomTimePicker
                  val={form.getValues("close_time") ?? undefined}
                  setval={(val) => {
                    form.clearErrors("close_time");
                    form.setValue(
                      "close_time",
                      val
                    );
                  }} />
              </div>
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};
