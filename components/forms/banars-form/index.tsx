"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CalendarDateRangePicker } from "../../date-range-picker";
import { DateRange } from "react-day-picker";
import Image from "next/image";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  banar: z.object({
    is_active: z.boolean(),
    started_at: z
      .date()
      .nullable()
      .refine((date) => date !== null, {
        message: "Start date is required",
      }),
    ended_at: z
      .date()
      .nullable()
      .refine((date) => date !== null, {
        message: "End date is required",
      }),
    banar: z.any().nullable(),
  }),
});

export type BanarFormValues = z.infer<typeof formSchema>;

interface BanarFormProps {
  banar?: BanarFormValues["banar"];
}

export const BanarsForm: React.FC<BanarFormProps> = ({ banar }) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const action = "Send";

  const form = useForm<BanarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      banar: {
        is_active: banar?.is_active || false,
        started_at: banar?.started_at || null,
        ended_at: banar?.ended_at || null,
        banar: banar?.banar,
      },
    },
  });
  const onSubmit = async (data: BanarFormValues) => {
    console.log(data);
  };

  const handleChange = (isChecked: boolean) => {
    form.setValue("banar.is_active", isChecked);
  };

  const returnDate: (dates: DateRange) => void = ({ from, to }) => {
    if (from && to) {
      const fromDate = from instanceof Date ? from.toISOString() : from;
      const toDate = to instanceof Date ? to.toISOString() : to;
      form.setValue("banar.started_at", new Date(fromDate));
      form.setValue("banar.ended_at", new Date(toDate));
    }
  };

  const [selectedBanar, setSelectedBanar] = React.useState<string | null>(null);
  const handleBanarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    form.setValue("banar.banar", null);

    if (file) {
      setSelectedBanar(URL?.createObjectURL(file));
    }
  };
  return (
    <Card className="p-10 mx-0 border-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormItem style={{ display: "flex", alignItems: "center" }}>
              <FormLabel style={{ marginRight: "70px" }}>
                Banar status
              </FormLabel>
              <FormControl>
                <Switch
                  checked={form.watch("banar.is_active")}
                  onClick={() => handleChange(!form.watch("banar.is_active"))}
                  name="banar.is_active"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.banar?.is_active?.message}
              </FormMessage>
            </FormItem>

            <FormItem style={{ marginTop: "30px" }}>
              <FormLabel>Banar date from - to</FormLabel>
              <FormControl>
                <CalendarDateRangePicker returnDate={returnDate} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.banar?.started_at?.message}
              </FormMessage>
              <FormMessage>
                {form.formState.errors?.banar?.ended_at?.message}
              </FormMessage>
            </FormItem>

            <FormItem
              style={{
                margin: "30px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="flex justify-start  items-center">
                <FormLabel style={{ marginRight: "70px" }}>Banar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="border-0 "
                    {...form.register("banar.banar")}
                    onChange={handleBanarChange}
                  />
                </FormControl>
              </div>
              <FormMessage style={{ marginLeft: "px" }}>
                {form.formState.errors?.banar?.banar?.message
                  ? "Banar file is required"
                  : ""}
              </FormMessage>

              {selectedBanar && (
                <div style={{ width: "200px", height: "200px" }}>
                  <Image
                    src={selectedBanar}
                    alt="Selected Banar"
                    width={1000}
                    height={1000}
                  />
                </div>
              )}
            </FormItem>
          </div>

          <Button disabled={loading} className="ml-auto " type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
