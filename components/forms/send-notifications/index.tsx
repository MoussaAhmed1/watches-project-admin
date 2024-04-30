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
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { BellRing, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import useCostomSearchParams from "@/hooks/use-searchParams";
import { IDoctor } from "@/types/doctors";
import { IPatient } from "@/types/patients";
import { INurse } from "@/types/nurse";
import { IPharmacy } from "@/types/pharmacy";

const formSchema = z.object({
  title_en: z
    .string()
    .min(3, { message: "Notification Name must be at least 3 characters" }),
  title_ar: z
    .string()
    .min(3, { message: "Notification Name must be at least 3 characters" }),
  description_ar: z.string().min(10, {
    message: "Notification description must be at least 10 characters.",
  })
    .max(160, {
      message: "Notification description must not be longer than 160 characters.",
    }),
  description_en: z.string().min(10, {
    message: "Notification description must be at least 10 characters.",
  }).max(160, {
    message: "Notification description must not be longer than 160 characters.",
  }),
  role: z.string(),
  specific_person: z.string().optional(),
});

export type NotificationFormValues = z.infer<typeof formSchema>;

interface NotificationFormProps {
  users: IDoctor[] | IPatient[] | INurse[] | IPharmacy[]
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
  const { createQueryString, pathname,searchParams } = useCostomSearchParams();

  const defaultValues = {
    title_en: "",
    title_ar: "",
    description_ar: "",
    description_en: "",

  };

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: NotificationFormValues) => {
    console.log(data)
    // try {
    //   setLoading(true);
    //   //  await AddNotifications(data);
    //   // console.log("notification", res);
    //   router.refresh();
    //   router.push(`/dashboard/notifications`);
    //   toast({
    //     variant: "default",
    //     title: "Notification created",
    //     description: "There was a problem with your request.",
    //   });
    // } catch (error: any) {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem with your request.",
    //   });
    // } finally {
    //   setLoading(false);
    // }
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
              name="description_en"
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
              name="description_ar"
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
                  <Select onValueChange={(e: any) => {
                    router.replace(`${pathname}?${createQueryString("role", e)}`, { scroll: false });
                    field.onChange(e)
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="client">Patients</SelectItem>
                      <SelectItem value="doctor">Doctors</SelectItem>
                      <SelectItem value="pharmacy">Pharmacies</SelectItem>
                      <SelectItem value="nurse">Nurses</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specific_person"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Specific person (Optional)</FormLabel>
                  <Select disabled={!(searchParams?.get("role"))} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users?.length && users?.map((item:any) => {
                        return <SelectItem value={item?.id} key={item?.id}>{(item?.first_name + " " + item?.last_name)}</SelectItem>
                      })
                      }
                    </SelectContent>
                  </Select>
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
