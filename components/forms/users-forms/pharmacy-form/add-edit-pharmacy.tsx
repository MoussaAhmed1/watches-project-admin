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
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { AddPharmacy, updatePharmacys } from "@/actions/pharmacy";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getImageUrl } from "@/actions/storage-actions";
import { toFormData } from "axios";
import Map from "@/components/map/map";
import { MapData } from "@/types/map";
import AvatarPreview from "@/components/shared/AvatarPreview";
import pharmacySchema from "./pharmacySchema";
import { Category } from "@/types/pharmacy";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import Cookie from 'js-cookie';
import { Separator } from "@/components/ui/separator";
import InputDate from "@/components/shared/timepicker/InputDate";

export type PharmacyFormValues = z.infer<typeof pharmacySchema>;

interface PharmacyFormProps {
  initialData?: PharmacyFormValues;
  id?: string;
  categories: Category[];

}

export const PharmacyForm: React.FC<PharmacyFormProps> = ({
  initialData,
  id,
  categories
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const currentLang = Cookie.get("Language");
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit pharmacy" : "Create pharmacy";
  const description = initialData ? "Edit a pharmacy." : "Add a new pharmacy";
  const action = initialData ? "Save changes" : "Create";

  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };
  const form = useForm<PharmacyFormValues>({
    resolver: zodResolver(pharmacySchema),
    // defaultValues: initialData ? defaultValues : undefined,
  });
  const { control, formState: { errors } } = form;

  useEffect(() => {
    form.setValue("role", "PHARMACY")
  }, [form]);


  // store
  const getUrls = useCallback(
    async (fileList: FileList | File) => {
      const formData = new FormData();
      toFormData(fileList, formData);
      let imagesUrls: string[] = [];
      if (fileList instanceof FileList) {
        const imagesArray = Array.from(fileList);
        const _images: FormData[] = [];
        await imagesArray.forEach((img) => {
          _images.push(new FormData());
          _images[_images.length - 1].set('file', img);
        });
        imagesUrls = await Promise.all(
          _images.map(async (img) => (await getImageUrl({ image: img })) as string)
        );
      } else {
        const image = new FormData();
        image.set('file', fileList);
        imagesUrls = await getImageUrl({ image })
      }
      return imagesUrls;
    },
    [],
  )


  //map:
  const [mapData, setMapData] = useState<MapData | null>();
  useEffect(() => {
    if (mapData) {
      form.setValue("latitude", mapData?.coords?.lat);
      form.setValue("longitude", mapData?.coords?.lng);
      form.setValue("address", currentLang === 'en' ? mapData?.address.add_en : mapData?.address.add_ar);
      form.clearErrors(["longitude", "latitude"]);
    }
  }, [currentLang, form, mapData]);


  const onSubmit = async (data: PharmacyFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);
    if (data?.logo_images) {
      formData.delete('logo_images');
      const logo_images = await getUrls(data?.logo_images as unknown as File);
      formData.set('logo_images', logo_images.toString());
    }
    if (data?.license_images) {
      formData.delete('license_images[]');
      const license_images_array = await getUrls(data?.license_images as unknown as FileList);
      formData.set('license_images', license_images_array.join());
    }

    let res;
    if (initialData) {
      res = await updatePharmacys(data, id);
    } else {

      res = await AddPharmacy(formData);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: initialData ? "Update failed" : "Add failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: initialData ? "Updated successfully" : "Added successfully",
        description: initialData ? `Pharmacy has been successfully updated.` : `Pharmacy has been successfully added.`,
      });
      router.push(`/dashboard/pharmacies`);
    }

    setLoading(false);
  };
  //show error messages
  // console.log(form.formState.errors);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>

      <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <AvatarPreview selectedAvatar={selectedAvatar} />
            <h5>Owner Info:</h5>
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end flex-col items-start gap-1">
                <label htmlFor="date" className="font-medium text-sm">
                  birth date <span className="text-red-800">*</span>
                </label>
                <div className="flex-col w-full">
                  <InputDate
                    value={form.getValues("birth_date")}
                    onChange={(val) => {
                      form.setValue("birth_date", val);
                    }}
                    disableFuture
                    maxWidth={"100%"}
                  />
                  {errors.birth_date && (
                    <span className="error-text">
                      {errors.birth_date.message}
                    </span>
                  )}
                </div>
              </div>
              {/* Gender */}
              <FormField name="gender" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender <span className="text-red-800">*</span></FormLabel>
                  <FormControl>
                    <ShadcnSelect  {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </ShadcnSelect >
                  </FormControl>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )} />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Avatar */}
              <FormItem
                style={{
                  margin: "-2px 0",
                }}
              >
                <FormLabel className="max-w-30 mx-1">Avatar</FormLabel>
                <div>
                  <Controller
                    name="avatarFile"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => {
                          field.onChange(e.target.files ? e.target.files[0] : null);
                          handleAvatarChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                {errors?.avatarFile?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.avatarFile?.message as any}</FormMessage>}
              </FormItem>
              {/* Logo Image */}
              <FormItem
                style={{
                  margin: "-2px 0",
                }}
              >
                <FormLabel className="max-w-30 mx-1">Logo Image <span className="text-red-800">*</span></FormLabel>
                <div>
                  <Controller
                    name="logo_images"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        name="file"
                        multiple={false}
                        accept="image/*"
                        onChange={async (e) => {
                          field.onChange(e.target.files ? e.target.files[0] : null);
                          if (e.target.files) {
                            getUrls(e.target.files[0])
                          }
                          // handleAvatarChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                {errors?.logo_images?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.logo_images?.message as any}</FormMessage>}
              </FormItem>
              {/* License Images */}
              <FormItem
                style={{
                  margin: "-2px 0",
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
                          // if(e.target.files){
                          //   getUrls(e.target.files)
                          // }
                        }}
                      />
                    )}
                  />
                </div>
                {errors?.license_images?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.license_images?.message as any}</FormMessage>}
              </FormItem>

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
            </div>

            <div className="md:grid md:grid-cols-1 gap-8">
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
                    onChange={(values: any) => {
                      form.clearErrors("categories");
                      form.setValue(
                        "categories",
                        values!.map((val: any) => val.value)
                      );
                    }}
                    className="w-full"
                    options={
                      categories.map((cate) => {
                        return { label: getCustomNameKeyLang(cate?.name_en, cate?.name_ar) ?? "", value: cate.id }
                      })
                    }
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
              // defaultPos={workArea?.id ? { lat: workArea.latitude, lng: workArea.longitude } : null}
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
