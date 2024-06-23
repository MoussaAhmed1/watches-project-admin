"use client";

import React from "react";
import * as z from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import doctorSchema from "./doctorSchema";

const DoctorForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form: any = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
  });
  const { control, handleSubmit, formState: { errors }, setValue } = form;

  const onSubmit: SubmitHandler<z.infer<typeof doctorSchema>> = async (data) => {
    console.log(data);
    // Handle form submission
    toast({
      variant: "default",
      title: "Form submitted",
      description: JSON.stringify(data),
    });
  };

  return (
    <Card className="p-10 mx-0 border-0">
      <Form {...form}>
        <form className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-1 gap-8">
            {/* First Name */}
            <FormField name="first_name" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {errors.first_name && <FormMessage>{errors.first_name.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Last Name */}
            <FormField name="last_name" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {errors.last_name && <FormMessage>{errors.last_name.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Birth Date */}
            <FormField name="birth_date" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                {errors.birth_date && <FormMessage>{errors.birth_date.message}</FormMessage>}
              </FormItem>
            )} />
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
            {/* Phone */}
            <FormField name="phone" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Avatar */}
            <FormField name="avatarFile" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input type="file" {...field} onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                {errors.avatarFile && <FormMessage>{errors.avatarFile.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Cover Image */}
            <FormField name="cover_image" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                {errors.cover_image && <FormMessage>{errors.cover_image.message}</FormMessage>}
              </FormItem>
            )} />
            {/* License Images */}
            <FormField name="license_images" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>License Images</FormLabel>
                <FormControl>
                  <Input type="file" multiple {...field} onChange={(e) => field.onChange(Array.from(e.target.files || []))} />
                </FormControl>
                {errors.license_images && <FormMessage>{errors.license_images.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Consultation Prices */}
            <FormField name="video_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Video Consultation Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.video_consultation_price && <FormMessage>{errors.video_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            <FormField name="voice_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Voice Consultation Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.voice_consultation_price && <FormMessage>{errors.voice_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            <FormField name="home_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Home Consultation Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.home_consultation_price && <FormMessage>{errors.home_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            <FormField name="clinic_consultation_price" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Clinic Consultation Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.clinic_consultation_price && <FormMessage>{errors.clinic_consultation_price.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Specialization ID */}
            <FormField name="specialization_id" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {errors.specialization_id && <FormMessage>{errors.specialization_id.message}</FormMessage>}
              </FormItem>
            )} />
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
            {/* Year of Experience */}
            <FormField name="year_of_experience" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Experience</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.year_of_experience && <FormMessage>{errors.year_of_experience.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Is Urgent */}
            <FormField name="is_urgent" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Is Urgent</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                {errors.is_urgent && <FormMessage>{errors.is_urgent.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Latitude */}
            <FormField name="latitude" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {errors.latitude && <FormMessage>{errors.latitude.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Longitude */}
            <FormField name="longitude" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {errors.longitude && <FormMessage>{errors.longitude.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Availability */}
            <FormField name="avaliablity" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  {field.value.map((availability: { day: string | number | readonly string[] | undefined; start_at: string | number | readonly string[] | undefined; end_at: string | number | readonly string[] | undefined; is_active: boolean | undefined; }, index: number) => (
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
            )} />
            {/* Clinic */}
            <FormField name="clinic" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Clinic</FormLabel>
                <FormControl>
                  <Input placeholder="Latitude" value={field.value.latitude} onChange={(e) => field.onChange({ ...field.value, latitude: e.target.value })} />
                  <Input placeholder="Longitude" value={field.value.longitude} onChange={(e) => field.onChange({ ...field.value, longitude: e.target.value })} />
                  <Input placeholder="Address" value={field.value.address} onChange={(e) => field.onChange({ ...field.value, address: e.target.value })} />
                  <Input placeholder="Name" value={field.value.name} onChange={(e) => field.onChange({ ...field.value, name: e.target.value })} />
                  <Switch checked={field.value.is_active} onCheckedChange={(checked) => field.onChange({ ...field.value, is_active: checked })} />
                </FormControl>
                {errors.clinic && <FormMessage>{errors.clinic.message}</FormMessage>}
              </FormItem>
            )} />
          </div>

          <Button type="submit" className="ml-auto">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};

export default DoctorForm;