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
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { changeCommission, changeTermsConditions } from "@/actions/terms-conditions";
import validationRules from "@/utils/zodValidationRules";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  commission: validationRules?.number,
});

export type CommissionFormValues = z.infer<typeof formSchema>;
interface Prop {
  commission: number;
}

export const CommissionForm: React.FC<Prop> = ({
  commission,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = "Save";
  const defaultValues = {
    commission,
  };

  const form = useForm<CommissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: CommissionFormValues) => {
    const body = {
      commission: data.commission,
    };
    try {
      setLoading(true);
      await changeCommission(body);
      toast({
        variant: "default",
        title: "Commission updated",
        description: "Commission have been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Commission update failed",
        description: error,
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
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission</FormLabel>
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
