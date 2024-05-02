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
import { IPatient } from "@/types/patients";
import { INurse } from "@/types/nurse";
import { IPharmacy } from "@/types/pharmacy";
import { changeAboutUs } from "@/actions/about-us";
import { changeTermsConditions } from "@/actions/terms-conditions";

const formSchema = z.object({
  description_ar: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
  description_en: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
});

export type TermsConditionsFormValues = z.infer<typeof formSchema>;
interface Prop {
  description_ar: string;
  description_en: string;
}

export const TermsConditionsForm: React.FC<Prop> = ({
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

  const form = useForm<TermsConditionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: TermsConditionsFormValues) => {
    const body = {
      static_page_type: "TERMS_AND_CONDITIONS",
      content_ar: data.description_ar,
      content_en: data.description_en,
    };
    try {
      setLoading(true);
      await changeTermsConditions(body);
      router.refresh();
      toast({
        variant: "default",
        title: "Terms and Conditions updated",
        description: "Terms and Conditions have been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions update failed",
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