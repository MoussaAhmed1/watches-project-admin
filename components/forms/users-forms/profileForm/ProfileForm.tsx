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
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { Card } from "@/components/ui/card";
import ProfileSchema from "./ProfileSchema";
import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import InputDate from "@/components/shared/timepicker/InputDate";
import { updateUsersProfile } from "@/actions/patients";
import { useSession } from "next-auth/react";
import { navItems } from "@/constants/data";
import Select, { StylesConfig } from "react-select";
import { usePathname, useRouter } from "next/navigation";
import { reloadSession } from "@/lib/funcs";
import { IUser } from "@/types/patients";
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
  const { toast } = useToast();
  const t = useTranslations("pages.users");
  const tShared = useTranslations('shared');
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const [loading, setLoading] = useState(false);
  const action = initialData ? tShared("saveChanges") : tShared("create");
  const { update, data: session } = useSession();
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
    premessions: initialData?.premessions,
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
    if (revalidatequery === "/dashboard/admins" && data?.premessions) {
      toFormData({ ...data, premessions: data?.premessions.join() }, formData);
    }
    else {
      toFormData( data , formData);
    }
    formData.set('id', id);
    //phone changed 
    const hasChanged = data.phone !== initialData?.phone;
    if (!hasChanged) {
      formData.delete('phone');
    }

    const newUser: { error: string } & IUser = await updateUsersProfile(formData, id, revalidatequery);

    if (newUser?.error) {
      toast({
        variant: "destructive",
        title: initialData ? tShared("updateFailed") : tShared("addFailed"),
        description: newUser?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: initialData ? tShared("updatedSuccessfully") : tShared("addedSuccessfully"),
        description: initialData ?  t(`profileUpdatedSuccessfully`) : t(`profileAddedSuccessfully`) ,
      });
      if (id === "") {
        await update({
          ...session,
          user: {
            ...newUser,
            name: newUser?.first_name + " " + newUser?.last_name,
            first_name: newUser?.first_name,
            last_name: newUser?.last_name,
            image: newUser?.avatar,
            avatar: newUser?.avatar,
            premessions:data?.premessions
          }
        })
        reloadSession();
        router.refresh();
      }
    }
    setLoading(false);
  };

  //premessions options 
  const PermissionsOptions = useMemo(() => navItems?.map((nav) => {
    return { label: (nav?.title) ?? "", value: nav.title }
  }), [])


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
                    <FormLabel>{t("firstName")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("firstName")}
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
                    <FormLabel>{t("lastName")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("lastName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            {revalidatequery === "/dashboard/admins" && <div className="md:grid md:grid-cols-1 gap-8">
              <div>
                <label htmlFor="premessions" className="font-medium text-sm">
                {t("permissions")} <span className="text-red-800">*</span>
                </label>
                <div className="flex-col w-full" style={{
                  cursor:!isAllowToModifyPermissions?"not-allowed":"pointer"
                }}>
                  <Select
                    id="premessions"
                    isSearchable={true}
                    isClearable={false}
                    isDisabled={!isAllowToModifyPermissions}
                    isMulti
                    defaultValue={initialData?.premessions?.map((permission) =>
                      PermissionsOptions.find(
                        (option) => option.value === permission
                      )
                    )}
                    onChange={(values: any) => {
                      form.clearErrors("premessions");
                      form.setValue(
                        "premessions",
                        values!.map((val: any) => val.value)
                      );
                    }}
                    options={PermissionsOptions}
                    closeMenuOnSelect={false}
                    className="w-full"
                    styles={{
                      control: (state) => ({ ...state, backgroundColor: 'transparent' }) as any,
                      // multiValue: (styles:any) => {
                      //   return {
                      //     ...styles,
                      //     backgroundColor: "green",
                      //   };
                      // },
                      multiValueLabel: (styles:any) => ({
                        ...styles,
                        color: "#4D4D4D",
                        background:"#E6E6E6"
                      }),
                      option: (styles:any) => {
                        return {
                          ...styles,
                          // backgroundColor:"blue",
                          color:"black"
                        }
                      }}}
                    // theme={(theme) => ({
                    //   ...theme,
                    //   borderRadius: 0,
                    //   colors: {
                    //     ...theme.colors,
                    //     primary25: 'blue',
                    //     primary: 'gray',
                    //     neutral0: 'gray',
                    //   },
                    // })}
                  />
                  {errors.premessions && (
                    <span className="error-text">
                      {errors.premessions.message}
                    </span>
                  )}
                </div>
              </div>
            </div>}
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};
