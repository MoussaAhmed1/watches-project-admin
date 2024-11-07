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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { changeAboutUs } from "@/actions/settings/about-us";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  description_ar: z
    .string().regex(/^[\u0600-\u06FF0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be Arabic characters only' })
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
  description_en: z
    .string().regex(/^[a-zA-Z0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be English characters only' })
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
});

export type AboutUsFormValues = z.infer<typeof formSchema>;
interface Prop {
  description_ar: string;
  description_en: string;
}

export const AboutUsForm: React.FC<Prop> = ({
  description_ar,
  description_en,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("pages.general_settings")
  const action = t("save");

  const defaultValues = {
    description_ar,
    description_en,
  };

  const form = useForm<AboutUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: AboutUsFormValues) => {
    const body = {
      static_page_type: "ABOUT_US",
      content_ar: data.description_ar,
      content_en: data.description_en,
    };
    try {
      setLoading(true);
      await changeAboutUs(body);
      router.refresh();
      toast({
        variant: "default",
        title: t("aboutUsUpdated"),
        description: t("aboutUsSuccessfullyUpdated"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("aboutUsUpdateFailed"),
        description:t("requestProblem"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="p-10 mx-0 border-0"
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
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="description_en"
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
              name="description_ar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("descriptionInArabic")}</FormLabel>
                  <FormControl>
                    <Textarea
                      style={{ direction: "rtl" }}
                      className="resize-none"
                      {...field}
                      rows={6}
                    />
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
  );
};
