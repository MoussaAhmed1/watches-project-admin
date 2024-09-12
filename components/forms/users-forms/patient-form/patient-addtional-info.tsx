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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { updateClientAddtionalInfo } from "@/actions/patients";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import patientAddtionalInfoSchema from "./patient-addtionalInfoSchema";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
export type PatientAddtionalInfoFormValues = z.infer<typeof patientAddtionalInfoSchema>;

interface PatientFormProps {
  initialData?: PatientAddtionalInfoFormValues;
  id: string;
}

export const PatientAddtionalInfoForm: React.FC<PatientFormProps> = ({
  initialData,
  id,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const t = useTranslations("pages.users");
  const tShared = useTranslations('shared');
  const action = initialData ? tShared("saveChanges") : tShared("create");;
  const defaultValues = initialData;

  const form = useForm<PatientAddtionalInfoFormValues>({
    resolver: zodResolver(patientAddtionalInfoSchema),
    defaultValues
  });
  const { control, formState: { errors } } = form;


  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);


    const res = await updateClientAddtionalInfo(data, id);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: tShared("updateFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: tShared("updatedSuccessfully"),
        description: t(`profileUpdatedSuccessfully`),
      });
    }

    setLoading(false);
  };
  //show error messages
  // console.log(form.formState.errors);

  return (
    <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-2 gap-8">

            {/* weight */}
            <FormField name="weight" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>{t("weight")} </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.weight && <FormMessage>{errors.weight.message}</FormMessage>}
              </FormItem>
            )} />

            {/* height */}
            <FormField name="height" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>{t("height")} </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {errors.height && <FormMessage>{errors.height.message}</FormMessage>}
              </FormItem>
            )} />
          </div>

          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="allergic_reactions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("allergicReactions")} </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("allergicReactions")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Notes */}
            <FormField name="notes" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>{t("notes")} </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                {errors.notes && <FormMessage>{errors.notes.message}</FormMessage>}
              </FormItem>
            )} />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
