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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { AcceptDoctorRequest, AddDoctor } from "@/actions/doctors";
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
export type DoctorFormValues = z.infer<typeof doctorAddtionalInfoSchema>;

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
  initialData?: DoctorFormValues;
  id: string;
}

export const DoctorAddtionalInfoForm: React.FC<DoctorFormProps> = ({
  specializations,
  initialData,
  id
}) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = "Create";

  const defaultValues = initialData;

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorAddtionalInfoSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;


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
  const [ClinicMapData, setClinicMapData] = useState<MapData | null>();
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

  const onSubmit = async (data: DoctorFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);

    //Availability
    const Availabilityarray = data.avaliablity.map((value) => value.is_active);
    if (Availabilityarray.length === 0) {
      setError("Availability shouldn't be empty")
      return;
    }
    formData.delete('avaliablity');
    formData.set('avaliablity', Availabilityarray.join());
    if (data?.cover_image) {
      formData.delete('cover_image');
      const cover_image = await getUrls(data?.cover_image as unknown as File);
      formData.set('cover_image', cover_image.toString());
    }
    if (data?.license_images) {
      formData.delete('license_images[]');
      const license_images_array = await getUrls(data?.license_images as unknown as FileList);
      formData.set('license_images', license_images_array.join());
    }

    const res = await AddDoctor(formData);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Add failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: "Added successfully",
        description: `Doctor has been successfully added.`,
      });
      if (res?.data?.id) {
        AcceptDoctorRequest(res?.data?.id);
      }
      router.push(`/dashboard/doctors`);
    }

    setLoading(false);
  };
  //show error messages
  // console.log(form.formState.errors);

  return (
    <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* <AvatarPreview selectedAvatar={selectedAvatar} /> */}
          <div className="md:grid md:grid-cols-2 gap-8">
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
              defaultPos={id ? { lat: initialData?.latitude, lng: initialData?.longitude } : null}
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
                      onValueChange={field.onChange}
                      defaultValue={field.value ? `${field.value}` : undefined}
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