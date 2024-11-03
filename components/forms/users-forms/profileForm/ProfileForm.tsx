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
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { Card } from "@/components/ui/card";
import ProfileSchema from "./ProfileSchema";
// import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import InputDate from "@/components/shared/timepicker/InputDate";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { reloadSession } from "@/lib/funcs";
import { useTranslations } from "next-intl";

export type UserFormValues = z.infer<typeof ProfileSchema>;

interface UserFormProps {
  initialData?: UserFormValues;
  id: string;
  revalidatequery: string;
  isAllowToModifyPermissions?: boolean;
}


export const UserProfileForm: React.FC<UserFormProps> = ({
  initialData,
  id,
  revalidatequery,
  isAllowToModifyPermissions
}) => {
  // const { toast } = useToast();
  const t = useTranslations("pages.users");
  const tShared = useTranslations('shared');
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const [loading, setLoading] = useState(false);
  const action = initialData ? tShared("saveChanges") : tShared("create");
  // const { update, data: session } = useSession();
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };
  const defaultValues = {
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
    // const formData = new FormData();
    // if (revalidatequery === "/dashboard/admins" && data?.premessions) {
    //   toFormData({ ...data, premessions: data?.premessions.join() }, formData);
    // }
    // else {
    //   toFormData( data , formData);
    // }
    // formData.set('id', id);
    // //phone changed 
    // const hasChanged = data.phone !== initialData?.phone;
    // if (!hasChanged) {
    //   formData.delete('phone');
    // }

    // const newUser: { error: string } & IUser = await updateUsersProfile(formData, id, revalidatequery);

    // if (newUser?.error) {
    //   toast({
    //     variant: "destructive",
    //     title: initialData ? tShared("updateFailed") : tShared("addFailed"),
    //     description: newUser?.error,
    //   });
    // }
    // else {
    //   toast({
    //     variant: "default",
    //     title: initialData ? tShared("updatedSuccessfully") : tShared("addedSuccessfully"),
    //     description: initialData ?  t(`profileUpdatedSuccessfully`) : t(`profileAddedSuccessfully`) ,
    //   });
    //   if (id === "") {
    //     await update({
    //       ...session,
    //       user: {
    //         ...newUser,
    //         name: newUser?.first_name + " " + newUser?.last_name,
    //         first_name: newUser?.first_name,
    //         last_name: newUser?.last_name,
    //         image: newUser?.avatar,
    //         avatar: newUser?.avatar,
    //         premessions:data?.premessions
    //       }
    //     })
        reloadSession();
        router.refresh();
      // }
    // }
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
              <div className="flex w-full justify-end flex-col items-start gap-1">
                <label htmlFor="date" className="font-medium text-sm">
                {t("birthDate")} <span className="text-red-800">*</span>
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
                  <FormLabel>{t("gender")} <span className="text-red-800">*</span></FormLabel>
                  <FormControl>
                    <ShadcnSelect {...field} onValueChange={field.onChange} dir={currentLang === "ar" ? "rtl" : "ltr"}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectGender")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t("male")}</SelectItem>
                        <SelectItem value="female">{t("female")}</SelectItem>
                      </SelectContent>
                    </ShadcnSelect>
                  </FormControl>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )} />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input dir="ltr" type="text" disabled={loading} {...field} />
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
                <FormLabel className="max-w-30 mx-1">{t("avatar")}</FormLabel>
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
