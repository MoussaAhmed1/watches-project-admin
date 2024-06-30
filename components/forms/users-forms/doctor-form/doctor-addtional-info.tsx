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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { removeDoctorLicence, updateDoctorAddtionalInfo } from "@/actions/doctors";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import doctorAddtionalInfoSchema from "./schema/doctorAddtionalInfoSchema";

import { Switch } from "@/components/ui/switch";
import { ISpecializations } from "@/types/additional-info-specializations";
import { getImageUrl } from "@/actions/storage-actions";
import { toFormData } from "axios";
import Map from "@/components/map/map";
import { MapData } from "@/types/map";
import { Separator } from "@/components/ui/separator";
import Cookie from 'js-cookie';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import { License } from "@/types/doctors";
import Image from "next/image";
import { X } from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
export type DoctorAddtionalInfoFormValues = z.infer<typeof doctorAddtionalInfoSchema>;

const workingTimeCards: { id: string, name: string }[] = [
  {
    id: "2",
    name: "Sunday",
  },
  {
    id: "3",
    name: "Monday",
  },
  {
    id: "4",
    name: "Tuesday",

  },
  {
    id: "5",
    name: "Wednesday",

  },
  {
    id: "6",
    name: "Thursday",
  },
  {
    id: "7",
    name: "Friday",
  },
  {
    id: "1",
    name: "Saturday"
  }
];

interface DoctorFormProps {
  specializations: ISpecializations[];
  initialData?: DoctorAddtionalInfoFormValues;
  id: string;
  initialLicensesImages: License[];
  coverImage: string;
}

export const DoctorAddtionalInfoForm: React.FC<DoctorFormProps> = ({
  specializations,
  initialData,
  id,
  initialLicensesImages,
  coverImage
}) => {
  const currentLang = Cookie.get("Language");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = "Save changes";

  const defaultValues = initialData;

  const form = useForm<DoctorAddtionalInfoFormValues>({
    resolver: zodResolver(doctorAddtionalInfoSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;

  const [hasupload, setHasupload] = useState(false)
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

  const InitialClinicMapData = initialData?.clinic
    ? {
      coords: {
        lat: initialData?.clinic?.latitude ?? 0,
        lng: initialData?.clinic?.longitude ?? 0,
      },
      address: {
        add_ar: initialData?.clinic?.address ?? "",
        add_en: initialData?.clinic?.address ?? "",
      },
    }
    : null;

  const InitialMapData = initialData
    ? {
      coords: {
        lat: initialData?.latitude ?? 0,
        lng: initialData?.longitude ?? 0,
      },
      address: {
        add_ar: "",
        add_en: "",
      },
    }
    : null;

  //map:
  const [mapData, setMapData] = useState<MapData | null>(InitialMapData);
  const [ClinicMapData, setClinicMapData] = useState<MapData | null>(InitialClinicMapData);
  useEffect(() => {
    if (mapData) {
      form.setValue("latitude", mapData?.coords?.lat)
      form.setValue("longitude", mapData?.coords?.lng)
      form.clearErrors(["longitude", "latitude"]);
    }
  }, [form, mapData]);

  useEffect(() => {
    if (ClinicMapData) {
      form.setValue("clinic.latitude", ClinicMapData?.coords?.lat)
      form.setValue("clinic.longitude", ClinicMapData?.coords?.lng)
      form.setValue("clinic.address", currentLang === 'en' ? ClinicMapData?.address.add_en : ClinicMapData?.address.add_ar);
      form.clearErrors(["clinic.longitude", "clinic.latitude", "clinic.address"]);
    }
  }, [form, ClinicMapData, currentLang]);

  const [error, setError] = useState("");

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
        const res = await removeDoctorLicence({ id: selectedImgId });
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
            description: `Doctor license has been successfully deleted.`,
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
    //Availability
    const Availabilityarray = data.avaliablity.map((value: any) => value.is_active);
    if (Availabilityarray.length === 0) {
      setError("Availability shouldn't be empty")
      return;
    }
    //cover_image
    if (data?.cover_image) {
      const cover_image = await getUrls(data?.cover_image as unknown as File);
      data.cover_image = cover_image as unknown as string;
    }
    //license_images
    if (data?.license_images && hasupload) {
      const license_images_array = await getUrls(data?.license_images as unknown as FileList);
      data.license_images = license_images_array?.join();
    }
    else {
      data.license_images = null as unknown as any;
    }
    //lat & long
    data.latitude = data.latitude.toString();
    data.longitude = data.longitude.toString();

    const res = await updateDoctorAddtionalInfo({ data, userId: id });
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
        description: `Doctor has been successfully updated.`,
      });
    }

    setLoading(false);
    //remove files from preview
    setPreviewUrls([])
    form.reset();
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
                {initialLicensesImages?.map((image: License, index: number) => (
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


            {/* Cover Image */}
            <FormItem
              style={{
                margin: "-2px 0",
              }}
            >
              <FormLabel className="max-w-30 mx-1">Cover Image</FormLabel>
              <div>
                <Controller
                  name="cover_image"
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
              {errors?.cover_image?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.cover_image?.message as any}</FormMessage>}

              <div
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
                  src={coverImage}
                  style={{
                    objectFit: "cover",
                  }}
                  fill
                  alt="CoverImage"
                />
              </div>

            </FormItem>

          </div>
          {/* <AvatarPreview selectedAvatar={selectedAvatar} /> */}
          <div className="md:grid md:grid-cols-2 gap-8">
            {/* Consultation Prices */}
            <FormField name="video_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Video Consultation Price <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} {...field} />
                </FormControl>
                {errors.video_consultation_price && <FormMessage>{errors.video_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            <FormField name="voice_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Voice Consultation Price <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.voice_consultation_price && <FormMessage>{errors.voice_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            <FormField name="home_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Home Consultation Price <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.home_consultation_price && <FormMessage>{errors.home_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Specialization ID */}
            <FormField name="specialization_id" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        specializations.map(specialization => <SelectItem key={specialization?.id} value={specialization?.id}>{specialization?.name_en}</SelectItem>)
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                {errors.specialization_id && <FormMessage>{errors.specialization_id.message}</FormMessage>}
              </FormItem>
            )} />


            {/* Year of Experience */}
            <FormField name="year_of_experience" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Experience <span className="text-red-800">*</span></FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.year_of_experience && <FormMessage>{errors.year_of_experience.message}</FormMessage>}
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

            {/* Latitude */}

            {/* Longitude */}
            <Map
              setMapData={setMapData}
              defaultPos={(initialData?.latitude && initialData?.longitude) ? { lat: initialData?.latitude, lng: initialData?.longitude } : null}
            />
            {errors.longitude && <FormMessage>{errors.longitude.message}</FormMessage>}
            {/* {errors.latitude && <FormMessage>{errors.latitude.message}</FormMessage>} */}

            {/* Is Urgent */}
            <FormField
              control={form.control}
              name="is_urgent"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is Urgent</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value ? `${field.value}` : undefined}
                      className="flex flex-col space-y-1"
                    >

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"true"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"false"} />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator style={{ margin: "25px 0 10px 0" }} />
            <h5 style={{ margin: "5px 0 0 0", color: error ? "red" : "unset" }} className="text-gray-500">Availablity:</h5>
            {error && <h5 style={{ color: error ? "red" : "unset" }}>{error}</h5>}
            {  /* availablity */}
            {
              workingTimeCards.map((availbleday: { id: string, name: string }, ind: number) => {
                return (
                  <div className="flex space-x-10 items-center " key={availbleday?.id}>
                    <input value={availbleday?.id} name={`avaliablity.${ind}.id`} className="hidden" />
                    <div className="min-w-[10%]">
                      <FormField name={`avaliablity.${ind}.is_active`} control={control} render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{availbleday?.name}</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={(e) => {
                              field.onChange(e);
                              const remainAvaliablity: any[] = form.getValues("avaliablity")
                              const day = remainAvaliablity[ind]
                              day.id = availbleday?.id;
                              remainAvaliablity[ind] = day;
                              form.setValue(
                                "avaliablity",
                                [...remainAvaliablity]
                              );
                            }} />
                          </FormControl>
                          {errors.is_urgent && <FormMessage>{errors.is_urgent.message}</FormMessage>}
                        </FormItem>
                      )} />
                    </div>

                    {/* TimePicker */}
                    {<div className="flex space-x-5">
                      <div>
                        <FormLabel className="max-w-30 mx-1">Start Time <span className="text-red-800">*</span></FormLabel>
                        <CustomTimePicker
                          val={form.getValues(`avaliablity.${ind}.start_at`) ?? undefined}
                          setval={(val) => {
                            form.clearErrors(`avaliablity.${ind}.start_at`);
                            const remainAvaliablity: any[] = form.getValues("avaliablity")
                            const day = remainAvaliablity[ind]
                            day.start_at = val;
                            remainAvaliablity[ind] = day;
                            form.setValue(
                              "avaliablity",
                              [...remainAvaliablity]
                            );
                          }} />
                      </div>
                      <div>
                        <FormLabel className="max-w-30 mx-1">End Time <span className="text-red-800">*</span></FormLabel>
                        <CustomTimePicker
                          val={form.getValues("avaliablity.0.end_at") ?? undefined}
                          setval={(val) => {
                            form.clearErrors(`avaliablity.${ind}.end_at`);
                            const remainAvaliablity: any[] = form.getValues("avaliablity")
                            const day = remainAvaliablity[ind]
                            day.end_at = val;
                            remainAvaliablity[ind] = day;
                            form.setValue(
                              "avaliablity",
                              [...remainAvaliablity]
                            );
                          }} />
                      </div>
                    </div>}
                  </div>
                )
              })
            }

            <Separator style={{ margin: "25px 0 10px 0" }} />
            <h5 style={{ margin: "5px 0 0 0" }} className="text-gray-500">Clinic Info<span className="text-gray-600">(optional)</span>:</h5>
            <FormField
              control={form.control}
              name="clinic.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Clinic name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField name="clinic_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Clinic Consultation Price </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.clinic_consultation_price && <FormMessage>{errors.clinic_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Latitude */}

            {/* Longitude */}
            <Map
              setMapData={setClinicMapData}
              defaultPos={initialData?.clinic ? { lat: initialData?.clinic.latitude, lng: initialData?.clinic.longitude } : null}
            />
            {errors.clinic?.longitude && <FormMessage>{errors.clinic.longitude.message}</FormMessage>}

            <FormField
              control={form.control}
              name="clinic.address"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic address <span className="text-red-800">*</span></FormLabel>
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
            {/* Is Active */}
            <FormField
              control={form.control}
              name="clinic.is_active"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is Active</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(e: string) => {
                        form.setValue("clinic.is_active", e === "true");
                      }}
                      defaultValue={form.getValues("clinic.is_active") !== undefined ? `${form.getValues("clinic.is_active")}` : undefined}
                      className="flex flex-col space-y-1"
                    >

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"true"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Active
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"false"} />
                        </FormControl>
                        <FormLabel className="font-normal">Disabled</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
