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
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { Card } from "@/components/ui/card";
import UserSchema from "./userSchema";

import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import { AddUser, UpdateUser } from "@/actions/users/users-actions";
import { useTranslations } from "next-intl";
import { ICity, IUser, Role } from "@/types/users";
import { shortenText } from "@/utils/helperFunctions";
import Link from "next/link";
import CustomPhoneInput from "../../phone-input";
export type UserFormValues = z.infer<typeof UserSchema>;

interface UserFormProps {
  initialData?: IUser;
  id?: string;
  cityName?: string;
  schools?: IUser[];
  cities?: ICity[];
  readOnly?: boolean;
  _role?: "parents" | "drivers" | "schools" | "security" | "admins";
  closeDailog?: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  id,
  schools,
  cityName,
  cities,
  _role = "parents",
  readOnly = false,
  closeDailog,
}) => {
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const t = useTranslations("pages.users");
  const tShared = useTranslations("shared");
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const getTitle = useCallback(() => {
    if (_role === "security") {
      return t("addSecurity");
    } else if (_role === "parents") {
      return t("addParent");
    } else if (_role === "drivers") {
      return t("addDriver");
    } else if (_role === "schools") {
      return t("addSchool");
    }
    return t("addAdmins");
  }, [_role, t]);
  const getTitleEdit = useCallback(() => {
    if (readOnly) {
      if (_role === "security") {
        return t("viewSecurity");
      } else if (_role === "parents") {
        return t("viewParent");
      } else if (_role === "drivers") {
        return t("viewDriver");
      } else if (_role === "schools") {
        return t("viewSchool");
      }
      return t("viewAdmins");
    }

    if (_role === "security") {
      return t("editSecurity");
    } else if (_role === "parents") {
      return t("editParent");
    } else if (_role === "drivers") {
      return t("editDriver");
    } else if (_role === "schools") {
      return t("editSchool");
    }
    return t("editAdmins");
  }, [_role, readOnly, t]);

  const action = initialData ? tShared("saveChanges") : tShared("create");
  const title = initialData ? getTitleEdit() : getTitle();
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    undefined,
  );

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (typeof initialData?.avatar === "string") {
      setSelectedAvatar(initialData?.avatar);
    }
  }, [initialData]);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData
      ? {
          avatarFile: initialData?.avatar,
          city_id: initialData?.city_id,
          email: initialData?.email,
          name: initialData?.name,
          phone: initialData?.phone,
          gender: initialData?.gender as "male" | "female",
          academic_stage: initialData?.school?.academic_stage,
          school_id: initialData?.school?.id,
        }
      : undefined,
  });
  const {
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    form.setValue("role", Role[_role]);
    if (_role === "schools") {
      form.setValue("gender", "female");
      form.setValue("city_id", initialData?.city_id);
    }
    if(_role === "schools" && initialData){
      form.setValue("academic_stage",initialData?.school?.academic_stage);
    }
      form.setValue
  }, [_role, form]);

  const onSubmit = async (data: UserFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    if (initialData) {
      Object.entries(data).forEach(([key, value]: any) => {
        if (initialData[key as keyof IUser] !== value) {
          formData.append(key, value);
        }
      });
    } else {
      toFormData(data, formData);
    }
    let res;
    if (initialData) {
      res = await UpdateUser(formData, _role, id);
    } else {
      res = await AddUser(formData, _role);
    }

    if (res?.error) {
      toast({
        variant: "destructive",
        title: initialData ? tShared("updateFailed") : tShared("addFailed"),
        description: res?.error,
      });
    } else {
      toast({
        variant: "default",
        title: initialData
          ? tShared("updatedSuccessfully")
          : tShared("addedSuccessfully"),
        description: initialData
          ? t(`profileUpdatedSuccessfully`)
          : t(`profileAddedSuccessfully`),
      });
      //TODO: redirect to dashboard
      if (!initialData) {
        router.push(`/dashboard/users/${_role}`);
      } else {
        if (closeDailog) {
          closeDailog();
        }
      }
    }

    setLoading(false);
  };
  // show error messages
  // console.log(form.formState.errors);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} />
      </div>

      <Card
        className="p-10 mx-0 border-1"
        style={{
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <AvatarPreview selectedAvatar={selectedAvatar} />
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("fullName")} <span className="text-red-800">*</span>
                    </FormLabel>

                    {!readOnly ? (
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={t("fullName")}
                          {...field}
                          readOnly={readOnly}
                        />
                      </FormControl>
                    ) : (
                      <p>{field.value}</p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* academic_stage */}
              {(_role === "schools") && (readOnly||!initialData)  && (
                <FormField
                  name="academic_stage"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("academicStage")} <span className="text-red-800">*</span>
                      </FormLabel>
                      <FormControl>
                      {readOnly ? (
                          <p>
                            {t(field.value as string)}
                          </p>
                        ) : (
                        <ShadcnSelect
                          required
                          {...field}
                          onValueChange={field.onChange}
                          dir={currentLang === "ar" ? "rtl" : "ltr"}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectAcademicStage")} />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            <SelectGroup>
                              <SelectItem value="Kindergarten">{t('Kindergarten')}</SelectItem>
                              <SelectItem value="Primary">{t('Primary')}</SelectItem>
                              <SelectItem value="Intermediate">{t('Intermediate')}</SelectItem>
                              <SelectItem value="Secondary">{t('Secondary')}</SelectItem>
    
                            </SelectGroup>
                          </SelectContent>
                        </ShadcnSelect>)}
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {/* Gender - city_id */}
              {!(_role === "schools") ? (
                <FormField
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("gender")}</FormLabel>
                      <FormControl>
                        {readOnly ? (
                          <p>
                            {field.value === "male" ? t("male") : t("female")}
                          </p>
                        ) : (
                          <ShadcnSelect
                            {...field}
                            onValueChange={field.onChange}
                            dir={currentLang === "ar" ? "rtl" : "ltr"}
                            disabled={readOnly} // Disable select if readonly
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectGender")} />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              <SelectItem value="male">{t("male")}</SelectItem>
                              <SelectItem value="female">
                                {t("female")}
                              </SelectItem>
                            </SelectContent>
                          </ShadcnSelect>
                        )}
                      </FormControl>
                      {errors.gender && (
                        <FormMessage>{errors.gender.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  name="city_id"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("city")} <span className="text-red-800">*</span>
                      </FormLabel>
                      <FormControl>
                        {readOnly ? (
                          <p>{cityName as string}</p>
                        ) : (
                          <ShadcnSelect
                            required
                            {...field}
                            onValueChange={field.onChange}
                            dir={currentLang === "ar" ? "rtl" : "ltr"}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectCity")} />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              <SelectGroup>
                                {cities?.map((city) => (
                                  <SelectItem value={city?.id} key={city?.id}>
                                    {city?.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </ShadcnSelect>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <div>
                <label className="block mb-2 font-medium">{t("phone")}</label>
                {!readOnly ? ( <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <CustomPhoneInput
                      value={field.value}
                      onChange={(value) =>{ 
                        if (!value.startsWith("+")) {
                          value = `+${value}`;
                        }
                        field.onChange(value)}}
                      error={errors.phone?.message}
                    />
                  )}
                />
                ) : (
                  <p
                    dir={"ltr"}
                    className="rtl:text-right text-left overflow-hidden"
                  >
                    {initialData?.phone}
                  </p>
                )}
              </div>
              {/* Avatar */}
              <FormItem
                style={{
                  margin: "-2px 0",
                }}
              >
                <FormLabel className="max-w-30 mx-1">{t("avatar")}</FormLabel>
                {!readOnly ? (
                  <Controller
                    name="avatarFile"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => {
                          field.onChange(
                            e.target.files ? e.target.files[0] : null,
                          );
                          handleAvatarChange(e);
                        }}
                      />
                    )}
                  />
                ) : (
                  <p
                    dir={"ltr"}
                    className="rtl:text-right text-left overflow-hidden"
                  >
                    <Link href={initialData?.avatar ?? ""} target="_blank">
                      {(
                        initialData?.avatar?.split("/avatars/")[1] ?? "-"
                      )}
                    </Link>
                  </p>
                )}

                {errors?.avatarFile?.message && (
                  <FormMessage style={{ marginLeft: "5px" }}>
                    {errors?.avatarFile?.message as any}
                  </FormMessage>
                )}
              </FormItem>
           
            {_role === "security" && (
              <>
                {/* School */}
                <FormField
                  name="school_id"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("school")} <span className="text-red-800">*</span>
                      </FormLabel>
                      <FormControl>
                        {readOnly ? (
                          <p>
                            {
                              schools?.filter(
                                (school) => school?.school?.id === field.value,
                              )[0]?.name
                            }
                          </p>
                        ) : (
                          <ShadcnSelect
                            required
                            {...field}
                            onValueChange={field.onChange}
                            dir={currentLang === "ar" ? "rtl" : "ltr"}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectSchool")} />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              {schools?.map((school) => (
                                <SelectItem
                                  value={school?.school?.id || ""}
                                  key={school?.id}
                                >
                                  {school?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </ShadcnSelect>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
           
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("email")} <span className="text-red-800">*</span>
                    </FormLabel>
                    <FormControl>
                      {!readOnly ? (
                        <FormControl>
                          <Input
                            disabled={loading}
                            readOnly={readOnly}
                            placeholder={t("email")}
                            {...field}
                            type="email"
                            required={!initialData}
                            autoComplete="new-password"
                          />
                        </FormControl>
                      ) : (
                        <p dir={"ltr"} className="rtl:text-right text-left">
                          {field.value}
                        </p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                
                              {!readOnly && (
                                <FormField
                                  control={form.control}
                                  name="password"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        {t("password")} <span className="text-red-800">*</span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          disabled={loading}
                                          placeholder={t("password")}
                                          type="password"
                                          {...field}
                                          autoComplete="new-password"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}
                            
            </div>

            {!readOnly && (
              <Button disabled={loading} className="ml-auto" type="submit">
                {action}
              </Button>
            )}
          </form>
        </Form>
      </Card>
    </>
  );
};
