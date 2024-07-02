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
import { Card } from "@/components/ui/card";
import ProfileSchema from "./ProfileSchema";
import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import InputDate from "@/components/shared/timepicker/InputDate";
import { updateUsersProfile } from "@/actions/patients";
export type UserFormValues = z.infer<typeof ProfileSchema>;

interface UserFormProps {
  initialData?: UserFormValues;
  id: string;
  revalidatequery:string;
}

export const UserProfileForm: React.FC<UserFormProps> = ({
  initialData,
  id,
  revalidatequery
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = initialData ? "Save changes" : "Create";

  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };

  const defaultValues = {
    first_name: initialData?.first_name,
    last_name: initialData?.last_name,
    birth_date: initialData?.birth_date,
    gender: initialData?.gender,
    phone: initialData?.phone,
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;

  useEffect(() => {
    if (typeof initialData?.avatarFile === 'string') {
      setSelectedAvatar(initialData?.avatarFile)
    }
  }, [initialData])


  const onSubmit = async (data: UserFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);
    formData.set('id', id);
    const res = await updateUsersProfile(formData,id,revalidatequery);

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
        description: initialData ? `Profile has been successfully updated.` : `Profile has been successfully added.`,
      });
    }

    setLoading(false);
  };
  return (
    <>
      <Card className="p-10 mx-0 border-0 min-h-[63dvh]" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
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
                        placeholder="first name"
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
                        placeholder="last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end flex-col items-start gap-1">
                <label htmlFor="date" className="font-medium text-sm">
                  Birth date <span className="text-red-800">*</span>
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
                      <Input type="text" disabled={loading} {...field} />
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
                        placeholder="Edit your avatar"
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
