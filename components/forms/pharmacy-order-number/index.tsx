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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { changePharmacyOrder } from "@/actions/terms-conditions";
import validationRules from "@/utils/zodValidationRules";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  pharmacy_order_number: validationRules?.number,
});

export type PharmacyOrderFormValues = z.infer<typeof formSchema>;
interface Prop {
  pharmacy_order_number: number;
}

export const PharmacyOrderForm: React.FC<Prop> = ({
  pharmacy_order_number,
}) => {
  const { toast } = useToast();
  const t = useTranslations("pages.general_settings")
  const [loading, setLoading] = useState(false);
  const action = t("save");
  const defaultValues = {
    pharmacy_order_number,
  };

  const form = useForm<PharmacyOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: PharmacyOrderFormValues) => {
    const body = {
      pharmacy_order_number: data.pharmacy_order_number,
    };
    try {
      setLoading(true);
      await changePharmacyOrder(body);
      toast({
        variant: "default",
        title: t("pharmacyOrderUpdated"),
        description: t("pharmacyOrdersSuccessfullyUpdated"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("pharmacyOrdersUpdateFailed"),
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
              name="pharmacy_order_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("maximumPharmacyOrders")}</FormLabel>
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
  );
};
