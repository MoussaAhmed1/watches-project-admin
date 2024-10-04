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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { AddPharmacyPackage, updatePharmacyPackage } from "@/actions/packages";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name_en: z
    .string().regex(/^[a-zA-Z0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be English characters only' })
    .min(3, { message: "Package Name must be at least 3 characters" }),
  name_ar: z
    .string().regex(/^[\u0600-\u06FF0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be Arabic characters only' })
    .min(3, { message: "Package Name must be at least 3 characters" }),
  description_ar: z
    .string().regex(/^[\u0600-\u06FF0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be Arabic characters only' })
    .min(3, { message: "Package description must be at least 3 characters" }),
  description_en: z
    .string().regex(/^[a-zA-Z0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be English characters only' })
    .min(3, { message: "Package description must be at least 3 characters" }),
  price: z.coerce.number().positive('Must be a positive number'),
  expiration_days: z.coerce.number().positive('Must be a positive number'),
  advantage_mins: z.coerce.number().positive('Must be a positive number'),
});

export type PharmacyPackageFormValues = z.infer<typeof formSchema>;

interface PackageFormProps {
  initialData?: PharmacyPackageFormValues;
  id?: string;
}

export const PharmacyPackageForm: React.FC<PackageFormProps> = ({
  initialData,
  id
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("pages.packages");
  const tShared = useTranslations("shared");
  const [loading, setLoading] = useState(false);
  const title = initialData ? t("editPharmacyPackage") : t("createPharmacyPackage");
  const action = initialData ? tShared("saveChanges") : tShared("create");

  const defaultValues = initialData
    ? initialData
    : {
      name_en: "",
      name_ar: "",
      description_ar: "",
      description_en: "",
      price: 0,
      expiration_days: 0,
      advantage_mins: 0,
    };

  const form = useForm<PharmacyPackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? defaultValues : undefined,
  });

  const onSubmit = async (data: PharmacyPackageFormValues) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (initialData) {
      res = await updatePharmacyPackage(data,id );
    } else {

      res = await AddPharmacyPackage(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: initialData ? tShared("updatefailed") : tShared("addfailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: initialData ? tShared("updatedSuccessfully") : tShared("addedSuccessfully"),
        description: initialData ? t("PackageHasBeenSuccessfullyUpdated") : t("PackageHasBeenSuccessfullyAdded"),
      });
    }

    setLoading(false);
    router.push(`/dashboard/packages/pharmacy-packages`);
  };




  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title}  />
      </div>

      <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("englishName")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("englishName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("arabicName")}</FormLabel>
                    <FormControl>
                      <Input
                        style={{ direction: "rtl" }}
                        disabled={loading}
                        placeholder={t("arabicName")}
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
                    <FormLabel>{t("descriptionInEnglish")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("descriptionInEnglish")}
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
                name="description_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("descriptionInArabic")}</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{ direction: "rtl" }}
                        placeholder={t("descriptionInArabic")}
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("price")}</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiration_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("expirationDays")}</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="advantage_mins"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("advantageMinutes")}</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
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
    </>
  );
};
