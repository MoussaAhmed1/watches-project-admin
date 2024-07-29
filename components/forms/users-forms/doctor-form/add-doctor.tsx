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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import {  AddDoctor } from "@/actions/doctors";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import doctorSchema from "./schema/doctorSchema";
import { Switch } from "@/components/ui/switch";
import { ISpecializations } from "@/types/additional-info-specializations";
import { toFormData } from "axios";
import Map from "@/components/map/map";
import { MapData } from "@/types/map";
import AvatarPreview from "@/components/shared/AvatarPreview";
import { Separator } from "@/components/ui/separator";
import Cookie from 'js-cookie';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import InputDate from "@/components/shared/timepicker/InputDate";
import UseImagesStore from "@/hooks/use-images-store";
export type DoctorFormValues = z.infer<typeof doctorSchema>;

export const workingTimeCards: { id: string, name: string }[] = [
   {
    id: "1",
    name: "Saturday"
  },
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
];
interface DoctorFormProps {
  specializations: ISpecializations[];

}

export const DoctorForm: React.FC<DoctorFormProps> = ({
  specializations
}) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = "Create doctor";
  const description = "Add a new doctor";
  const action = "Create";

  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
  });
  const { control, formState: { errors } } = form;

  useEffect(() => {
    form.setValue("role", "DOCTOR")
  }, [form]);


  // store
  const { getUrls } = UseImagesStore();


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
  const [ClinicError, setClinicError] = useState("");

  const onSubmit = async (data: DoctorFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);

    //Availability
    const Availabilityarray = data.avaliablity.filter((value: any) => value.is_active);
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
    const _Availabilityarray =  Availabilityarray.map((day:any)=>{
      if(typeof day.end_at === "string"){
        day.end_at = +day.end_at
      }
      if(typeof day.start_at === "string"){
        day.start_at = +day.start_at
      }
      if(typeof day.day === "string"){
        day.day = +day.day
      }
      return day;
    })
    formData.set('avaliablity', JSON.stringify(_Availabilityarray));
    alert(JSON.stringify(_Availabilityarray))
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
      router.push(`/dashboard/doctors`);
    }

    setLoading(false);
  };

  //show error messages
  // console.log(form.formState.errors);

  useEffect(() => {
    const handleOnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (typeof window !== 'undefined') {
        event.preventDefault();
        return (event.returnValue = '');
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      const confirmationMessage = 'Are you sure you want to leave this page? Your changes may not be saved.';
      if (!window.confirm(confirmationMessage)) {
        event.preventDefault();
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('beforeunload', handleOnBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  console.log(form.formState.errors);

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
                        placeholder="Doctor name"
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
                        placeholder="Doctor name"
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
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
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
              // defaultPos={workArea?.id ? { lat: workArea.latitude, lng: workArea.longitude } : null}
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
                      <input value={availbleday?.id} name={`avaliablity.${ind}.day`} className="hidden" />
                      <div className="min-w-[10%]">
                        <FormField name={`avaliablity.${ind}.is_active`} control={control} render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{availbleday?.name}</FormLabel>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={(e) => {
                                field.onChange(e);
                                const remainAvaliablity: any[] = form.getValues("avaliablity")
                                const day = remainAvaliablity[ind]
                                day.day = availbleday?.id;
                                remainAvaliablity[ind] = day;
                                form.setValue(
                                  "avaliablity",
                                  [...remainAvaliablity]
                                );
                              }} />
                            </FormControl>
                            {errors.avaliablity && <FormMessage>{errors.avaliablity.message}</FormMessage>}
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
              // defaultPos={workArea?.id ? { lat: workArea.latitude, lng: workArea.longitude } : null}
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
            {ClinicError && <FormMessage>{"You should add Clinic Info"}</FormMessage>}
          </form>
        </Form>
      </Card>
    </>
  );
};
