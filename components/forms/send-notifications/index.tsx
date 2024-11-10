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
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import useCostomSearchParams from "@/hooks/use-searchParams";
import { IUser, Role } from "@/types/users";
import { sendNotifications } from "@/actions/notifications";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadcnSelect } from "@/components/ui/select";
import { useTranslations } from "next-intl";



const formSchema = z.object({
  title_en: z
    .string()
    .min(3, { message: "Notification Name must be at least 3 characters" }).max(160, "must not be longer than 160 characters."),
  title_ar: z
    .string()
    .min(3, { message: "Notification Name must be at least 3 characters" }).max(160, "must not be longer than 160 characters."),
  message_ar: z.string().min(10, {
    message: "Notification description must be at least 10 characters.",
  }).max(160, "must not be longer than 160 characters.")
    .max(160, {
      message: "Notification description must not be longer than 160 characters.",
    }).max(160, "must not be longer than 160 characters."),
  message_en: z.string().min(10, {
    message: "Notification description must be at least 10 characters.",
  }).max(160, {
    message: "Notification description must not be longer than 160 characters.",
  }).max(160, "must not be longer than 160 characters."),
  role: z.string().min(1, { message: "Please select a role" }),
  users_id: z.union([
    z.null(),
    z.array(z.string()),
  ]),
}).required(
  { role: true, }
);

export type NotificationFormValues = z.infer<typeof formSchema>;

interface NotificationFormProps {
  users: IUser[]
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  users
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("pages.notification");
  const tShared = useTranslations("pages.notification");
  const action = tShared("send");
  const { createQueryString, pathname } = useCostomSearchParams();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  
  // const { getValues } = useFormContext();
  const defaultValues = {
    title_en: "",
    title_ar: "",
    message_ar: "",
    message_en: "",
    role: "",
    users_id: [],
  };

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    formState: { errors },
    setValue,
    reset
  } = form;
  const onSubmit = async (data: NotificationFormValues) => {
    // alert(JSON.stringify(data));
    setLoading(true);
    const res = await sendNotifications(data);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("somethingWentWrong"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title:t("notificationCreated"),
        description: t("messageSent"),
      });
      reset();
    }
    setLoading(false);

  };

  return (
    <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="title_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("titleInEnglish")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("descriptionInEnglish")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title_ar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("titleInArabic")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message_ar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("descriptionInArabic")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              // TODO select from Roles
            }
            <FormField

              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("role")}</FormLabel>
                  <ShadcnSelect dir={currentLang === "ar" ? "rtl" : "ltr"} required onValueChange={(e: any) => {
                    router.replace(`${pathname}?${createQueryString("role", e)}`, { scroll: false });
                    field.onChange(e);
                    setValue("users_id", null, { shouldValidate: false })
                  }} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* <SelectItem value={Role.SUPERADMIN}>Superadmin</SelectItem> */}
                      {/* <SelectItem value={Role.ADMIN}>Admin</SelectItem> */}
                      <SelectItem value={Role.parents}>{t("parents")}</SelectItem>
                      <SelectItem value={Role.drivers}>{t("drivers")}</SelectItem>
                      <SelectItem value={Role.schools}>{t("schools")}</SelectItem>
                      <SelectItem value={Role.security}>{t("security")}</SelectItem>
                    </SelectContent>
                  </ShadcnSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              //users_id
            }
            {(form.getValues("role")) &&
              <div className="">
                <label htmlFor="users_id" className="font-medium text-sm">
                  {t("specificPerson")}
                </label>
                <div className="flex-col w-full ">
                  <Select
                    id="users_id"
                    isSearchable={true}
                    isClearable={true}
                    isMulti
                    isDisabled={!(form.getValues("role"))}
                    onChange={(values) => {
                      form.clearErrors("users_id");
                      setValue(
                        "users_id",
                        values!.map((val) => val.value)
                      );
                    }}
                    options={
                      users?.map((user) => {
                        return { label: user.name, value: user.id }
                      })
                    }
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
                      multiValueLabel: (styles: any) => ({
                        ...styles,
                        color: "#4D4D4D",
                        background: "#E6E6E6"
                      }),
                      option: (styles: any) => {
                        return {
                          ...styles,
                          // backgroundColor:"green",
                          color: "black"
                        }
                      }
                    }}
                  // theme={(theme) => ({
                  //   ...theme,
                  //   borderRadius: 0,
                  //   colors: {
                  //     ...theme.colors,
                  //     primary25: 'green',
                  //     primary: 'gray',
                  //     neutral0: 'gray',
                  //   },
                  // })}
                  />
                  {errors.users_id && (
                    <span className="error-text">
                      {errors.users_id.message}
                    </span>
                  )}
                </div>
              </div>
            }
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
