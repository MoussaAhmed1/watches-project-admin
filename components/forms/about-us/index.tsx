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
import { Textarea } from "@/components/ui/textarea";
import useCostomSearchParams from "@/hooks/use-searchParams";
import { IDoctor } from "@/types/doctors";
import { IUser } from "@/types/patients";
import { INurse } from "@/types/nurses";
import { IPharmacy } from "@/types/pharmacy";
import { changeAboutUs } from "@/actions/about-us";

const formSchema = z.object({
  description_ar: z
    .string().regex(/^[\u0600-\u06FF0-9\s]+$/, { message: 'Must be Arabic characters only' })
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
  description_en: z
    .string().regex(/^[a-zA-Z0-9\s]+$/, { message: 'Must be English characters only' })
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
  const action = "Save";
  const { createQueryString, pathname, searchParams } = useCostomSearchParams();

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
        title: "About Us updated",
        description: "About Us have been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "About Us update failed",
        description: "There was a problem with your request.",
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
              name="description_ar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description in Arabic</FormLabel>
                  <FormControl>
                    <Textarea
                      style={{ direction: "rtl" }}
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
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
