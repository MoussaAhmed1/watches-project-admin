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
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { AddDoctor, updateDoctors } from "@/actions/doctors";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import doctorSchema from "./doctorSchema";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch";
import { ISpecializations } from "@/types/additional-info-specializations";
import { getImageUrl } from "@/actions/storage-actions";
import { toFormData } from "axios";
import Map from "@/components/map/map";
import { MapData } from "@/types/map";
import AvatarPreview from "@/components/shared/AvatarPreview";

export type DoctorFormValues = z.infer<typeof doctorSchema>;

interface DoctorFormProps {
  initialData?: DoctorFormValues;
  id?: string;
  specializations: ISpecializations[];

}

export const DoctorForm: React.FC<DoctorFormProps> = ({
  initialData,
  id,
  specializations
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit doctor" : "Create doctor";
  const description = initialData ? "Edit a doctor." : "Add a new doctor";
  const toastMessage = initialData ? "Doctor updated." : "Doctor created.";
  const action = initialData ? "Save changes" : "Create";

  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };
  
  const defaultValues = initialData
  ? initialData
  : {
    name_en: "",
    name_ar: "",
    description_ar: "",
    description_en: "",
    price: 0,
    expiration_days: 0,
    number_of_pharmacy_order: 0,
  };
  
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    // defaultValues: initialData ? defaultValues : undefined,
  });
  const { control, handleSubmit, formState: { errors } } = form;
  
  useEffect(() => {
      form.setValue("role", "DOCTOR")
  }, [form]);


  // store
  const getUrls = useCallback(
    async (fileList: FileList|File) => {
      const formData = new FormData();
      toFormData(fileList, formData);
      let imagesUrls:string[] = [];
      if(fileList instanceof FileList){
        const imagesArray = Array.from(fileList);
        const _images: FormData[] = [];
        await imagesArray.forEach((img) => {
          _images.push(new FormData());
          _images[_images.length - 1].set('file', img);
        });
         imagesUrls = await Promise.all(
          _images.map(async (img) => (await getImageUrl({ image: img })) as string)
        );
      }else{
        const image = new FormData();
        image.set('file', fileList);
        imagesUrls = await getImageUrl({ image})
      }
      console.log(imagesUrls)
      return imagesUrls;
    },
    [],
  )


  //map:
  const [mapData, setMapData] = useState<MapData | null>();
  useEffect(() => {
    if (mapData) {
      form.setValue("latitude", mapData?.coords?.lat)
      form.setValue("longitude", mapData?.coords?.lng)
      form.clearErrors(["longitude", "latitude"]);
    }
  }, [form, mapData]);


  const onSubmit = async (data: DoctorFormValues) => {
    alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);
    if(data?.cover_image){
      formData.delete('cover_image');
      const cover_image = await getUrls(data?.cover_image as unknown as File);
      formData.set('cover_image', cover_image.toString());
    }
    if(data?.license_images){
      formData.delete('license_images');
      const license_images_array = await getUrls(data?.license_images as unknown as FileList);
      formData.set('license_images', license_images_array.join());
    }

    let res;
    if (initialData) {
      res = await updateDoctors(data, id);
    } else {

      res = await AddDoctor(formData);
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
        description: initialData ? `Doctor has been successfully updated.` : `Doctor has been successfully added.`,
      });
      router.push(`/dashboard/doctors`);
    }

    setLoading(false);
  };
  //show error messages
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
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 mt-2">
                    <FormLabel>birth date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto  w-4 opacity-80" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender */}
              <FormField name="gender" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
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
                      <Input type="number" disabled={loading} {...field} />
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
                          if(e.target.files){
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
                <FormLabel className="max-w-30 mx-1">License Images</FormLabel>
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
              <FormField name="clinic_consultation_price" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Consultation Price <span className="text-gray-600">(optional)</span></FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {errors.clinic_consultation_price && <FormMessage>{errors.clinic_consultation_price.message}</FormMessage>}
                </FormItem>
              )} />
              {/* Specialization ID */}
              <FormField name="specialization_id" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
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
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
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


              {/* Availability */}
              {/* <FormField name="avaliablity" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    {field?.value?.map((availability: { day: string | number | readonly string[] | undefined; start_at: string | number | readonly string[] | undefined; end_at: string | number | readonly string[] | undefined; is_active: boolean | undefined; }, index: number) => (
                      <div key={index} className="flex space-x-4">
                        <Input placeholder="Day" value={availability.day} onChange={(e) => {
                          const updated = [...field.value];
                          updated[index].day = Number(e.target.value);
                          field.onChange(updated);
                        }} />
                        <Input placeholder="Start At" value={availability.start_at} onChange={(e) => {
                          const updated = [...field.value];
                          updated[index].start_at = e.target.value;
                          field.onChange(updated);
                        }} />
                        <Input placeholder="End At" value={availability.end_at} onChange={(e) => {
                          const updated = [...field.value];
                          updated[index].end_at = e.target.value;
                          field.onChange(updated);
                        }} />
                        <Switch checked={availability.is_active} onCheckedChange={(checked) => {
                          const updated = [...field.value];
                          updated[index].is_active = checked;
                          field.onChange(updated);
                        }} />
                      </div>
                    ))}
                  </FormControl>
                  {errors.avaliablity && <FormMessage>{errors.avaliablity.message}</FormMessage>}
                </FormItem>
              )} /> */}
              {/* Clinic */}
              {/* <FormField name="clinic" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic</FormLabel>
                  <FormControl>
                    <Input placeholder="Latitude" value={field.value?.latitude} onChange={(e) => field.onChange({ ...field.value, latitude: e.target.value })} />
                    <Input placeholder="Longitude" value={field.value?.longitude} onChange={(e) => field.onChange({ ...field.value, longitude: e.target.value })} />
                    <Input placeholder="Address" value={field.value?.address} onChange={(e) => field.onChange({ ...field.value, address: e.target.value })} />
                    <Input placeholder="Name" value={field.value?.name} onChange={(e) => field.onChange({ ...field.value, name: e.target.value })} />
                    <Switch checked={field.value?.is_active} onCheckedChange={(checked) => field.onChange({ ...field.value, is_active: checked })} />
                  </FormControl>
                  {errors.clinic && <FormMessage>{errors.clinic.message}</FormMessage>}
                </FormItem>
              )} /> */}
            </div>
            <div className="md:grid md:grid-cols-1 gap-8">
              {/* Summary */}
              <FormField name="summery" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
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
              <FormField name="is_urgent" control={control} render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Is Urgent</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  {errors.is_urgent && <FormMessage>{errors.is_urgent.message}</FormMessage>}
                </FormItem>
              )} />
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
