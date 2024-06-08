"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { BellRing, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import useCostomSearchParams from "@/hooks/use-searchParams";
import { IPatient } from "@/types/patients";
import { sendNotifications } from "@/actions/notifications";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadcnSelect } from "@/components/ui/select";

enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  DOCTOR = 'DOCTOR',
  PHARMACY = 'PHARMACY',
  NURSE = 'NURSE',
}

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
  specific_person: z.union([
    z.null(),
    z.array(z.string()),
  ]),
}).required(
  { role: true, }
);

export type NotificationFormValues = z.infer<typeof formSchema>;

interface NotificationFormProps {
  users: IPatient[]
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  users
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = "Create notification";
  const description = "Add a new notification";
  const toastMessage = "Notification Sent.";
  const action = "Send";
  const { createQueryString, pathname, searchParams } = useCostomSearchParams();

  // const { getValues } = useFormContext();
  const defaultValues = {
    title_en: "",
    title_ar: "",
    message_ar: "",
    message_en: "",
    role: "",
    specific_person: [],
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
        title: "Uh oh! Something went wrong.",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: "Notification created",
        description: "Message has been successfully sent",
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
                  <FormLabel>Title in English</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Notification Title"
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
                  <FormLabel>Description in English</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description in English"
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
                  <FormLabel>Title in Arabic</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Notification Title"
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
                  <FormLabel>Description in Arabic</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description in Arabic"
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
                  <FormLabel>Role</FormLabel>
                  <ShadcnSelect required onValueChange={(e: any) => {
                    router.replace(`${pathname}?${createQueryString("role", e)}`, { scroll: false });
                    field.onChange(e);
                    setValue("specific_person", null, { shouldValidate: false })
                  }} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.SUPERADMIN}>Superadmin</SelectItem>
                      <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      <SelectItem value={Role.CLIENT}>Client</SelectItem>
                      <SelectItem value={Role.DOCTOR}>Doctor</SelectItem>
                      <SelectItem value={Role.PHARMACY}>Pharmacy</SelectItem>
                      <SelectItem value={Role.NURSE}>Nurse</SelectItem>
                    </SelectContent>
                  </ShadcnSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              //specific_person
            }
            {(form.getValues("role")) &&
              <div className="">
                <label htmlFor="specific_person" className="font-medium text-sm">
                  {("Specific person")}
                </label>
                <div className="flex-col w-full ">
                  <Select
                    id="specific_person"
                    isSearchable={true}
                    isClearable={true}
                    isMulti
                    isDisabled={!(form.getValues("role"))}
                    onChange={(values) => {
                      form.clearErrors("specific_person");
                      setValue(
                        "specific_person",
                        values!.map((val) => val.value)
                      );
                    }}
                    className="w-full"
                    options={
                      users.map((user) => {
                        return { label: user.first_name + " " +  user?.last_name, value: user.id }
                      })
                    }
                  />
                  {errors.specific_person && (
                    <span className="error-text">
                      {errors.specific_person.message}
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
