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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { removeDoctorLicence, updateDoctorAddtionalInfo } from "@/actions/doctors";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import doctorAddtionalInfoSchema from "./schema/doctorAddtionalInfoSchema";

import { Switch } from "@/components/ui/switch";
import { ISpecializations } from "@/types/additional-info-specializations";
import Map from "@/components/map/map";
import { MapData } from "@/types/map";
import { Separator } from "@/components/ui/separator";
import Cookie from 'js-cookie';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import { License } from "@/types/doctors";
import Image from "next/image";
import UseImagesStore from "@/hooks/use-images-store";
import ImagesUploadfield from "@/components/shared/fileUpload/imagesUpload";
export type DoctorAddtionalInfoFormValues = z.infer<typeof doctorAddtionalInfoSchema>;

export const workingTimeCards: { id: string, name: string }[] = [
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

  const defaultValues = {
    ...initialData, clinic: {
      latitude: initialData?.clinic?.latitude || undefined,
      longitude: initialData?.clinic?.longitude || undefined,
      address: initialData?.clinic?.address || undefined,
      name: initialData?.clinic?.name || undefined,
      is_active: initialData?.clinic?.is_active || undefined,
    }
  };
  const form = useForm<DoctorAddtionalInfoFormValues>({
    resolver: zodResolver(doctorAddtionalInfoSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;

  // store
  const { getUrls } = UseImagesStore();

  const InitialClinicMapData: MapData | null = initialData?.clinic
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

  const InitialMapData = initialData?.latitude
    ? {
      coords: {
        lat: initialData?.latitude,
        lng: initialData?.longitude,
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
  const [ClinicError, setClinicError] = useState("");

  //new Images
  const [previewUrls, setPreviewUrls] = useState<string[] | []>([]);
  const [hasupload, setHasupload] = useState(false)



  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    //Availability
    const Availabilityarray = data.avaliablity.map((value: any) => value.is_active);
    if (Availabilityarray.length === 0) {
      setError("Availability shouldn't be empty")
      setLoading(false);
      return;
    } else {
      setError("")
    }

    if (((data?.clinic_consultation_price !== 0) && data?.clinic?.name === undefined) ||
      ((data?.clinic_consultation_price === 0) && data?.clinic?.name !== undefined)) {
      setClinicError("Clinic Error")
      setLoading(false);
      return;
    }
    else {
      setClinicError("")
    }
    data = {
      ...data,
      clinic: data?.clinic_consultation_price === 0 ? null : data?.clinic
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
    setHasupload(false);
  };
  //show error messages

  return (
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
              initialImages={initialLicensesImages}
              license_images_errors={errors?.license_images?.message}
              title={"License Images"}
              name={"license_images"}
              removeLicencefn={removeDoctorLicence}
              setHasupload={setHasupload}
              previewUrls={previewUrls}
              setPreviewUrls={setPreviewUrls}
              ismulti
              isremovable
            />
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
                  src={coverImage ?? ""}
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
          {ClinicError && <FormMessage>{"You should add Clinic Info"}</FormMessage>}
        </form>
      </Form>
    </Card>
  );
};
