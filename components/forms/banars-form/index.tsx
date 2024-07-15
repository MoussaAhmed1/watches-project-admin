"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IDoctor } from "@/types/doctors";
import { toFormData } from "axios";
import { addBanar, editBanar } from "@/actions/banars";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { IBanner } from "@/types/banars";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema: any = z.object({
  is_active: z.boolean(),
  started_at:
    z.date({
      required_error: "Start date is required",
    }).nullable().refine((date) => date !== null, {
      message: "Start date is required",
    }),
  ended_at: z.date({
    required_error: "End date is required",
  }).nullable().refine((date) => date !== null, {
    message: "End date is required",
  }),
  banar: z.union([
    z.any().refine((file): file is File => file instanceof File, {
      message: 'File must be uploaded',
    }).refine(
      (file) => file && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type),
      {
        message: 'File must be an image (jpeg, png, gif)',
      }
    ),
    z.string().refine((url) => {
      try {
        const { pathname } = new URL(url);
        const extension = pathname.split('.').pop();
        return ['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(extension?.toLowerCase() ?? '');
      } catch (error) {
        return false;
      }
    }, {
      message: 'String must be a valid image URL (jpeg, png, gif)',
    })
  ]),
  doctor_id: z.string().nullable().optional(),
  description: z.string().optional(),
});

export type BanarFormValues = z.infer<typeof formSchema>;

interface BanarFormProps {
  banar?: IBanner;
  doctors: IDoctor[];
}

export const BanarsForm: React.FC<BanarFormProps> = ({ banar, doctors }) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const action = "Send";
  const router = useRouter();
  const form = useForm<BanarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: banar ? {
      is_active: banar?.is_active || false,
      started_at: new Date(banar?.started_at) || null,
      ended_at: new Date(banar?.ended_at) || null,
      banar: banar?.banar,
      description: banar?.description || "",
      doctor_id: banar?.doctor_id || undefined,
    } : undefined,
  });
  const { control, formState: { errors } } = form;

  const onSubmit = async (data: BanarFormValues) => {
    setLoading(true)
    const formData = new FormData();
    toFormData(data, formData);
    if (banar) {
      formData.set('id', banar?.id);
      //handel which to send 
      if (typeof (form.getValues("banar")) === "string") {
        formData.delete('banar');
      }
      const res = await editBanar(formData, banar?.id);
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Action failed",
          description: res?.error,
        });
      } else {
        toast({
          variant: "default",
          title: "Action updated",
          description: 'Update success!',
        });
        router.back();
      }
    } else {
      const res = await addBanar(formData);
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Action failed",
          description: res?.error,
        });
      } else {
        toast({
          variant: "default",
          title: "Action updated",
          description: `Added success!`,
        });
        router.back();
      }
    }
    setLoading(false);
  };

  const handleChange = (isChecked: boolean) => {
    form.setValue("is_active", isChecked);
  };

  React.useEffect(() => {
    if (banar) {
      setSelectedBanar(banar?.banar);
    }
  }, [banar]);

  const [selectedBanar, setSelectedBanar] = React.useState<string | null>(null);
  const handleBanarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // form.setValue("banar", file);

    if (file) {
      setSelectedBanar(URL?.createObjectURL(file));
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
          <div className="md:grid md:grid-cols-1 gap-10">
            {/* banar Image */}
            <FormItem
              style={{
                margin: "-2px 0",
              }}
            >
              <FormLabel className="max-w-30 mx-1">Banner Image</FormLabel>
              <div>
                <Controller
                  name="banar"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      name="file"
                      multiple={false}
                      accept="image/*"
                      onChange={async (e) => {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                        handleBanarChange(e);
                      }}
                    />
                  )}
                />
              </div>
              {errors?.banar?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.banar?.message as any}</FormMessage>}

              {selectedBanar && <div
                style={{
                  color: "darkgray",
                  padding: 0,
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  borderColor: "darkgray",
                  position: "relative",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <Image
                  src={selectedBanar ?? ""}
                  style={{
                    objectFit: "cover",
                  }}
                  fill
                  alt="CoverImage"
                />
              </div>}

            </FormItem>
            <div className="md:grid md:grid-cols-2 gap-8">
            {
              //start date 
            }
            <FormField
              control={form.control}
              name="started_at"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              //End date 
            }
            <FormField
              control={form.control}
              name="ended_at"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <FormField
              control={form.control}
              name="doctor_id"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Specific Doctor (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem disabled value={""}>Select a person</SelectItem>
                      {doctors?.length && doctors?.map((item: IDoctor) => {
                        return <SelectItem value={item?.id} key={item?.id}>{(item?.name)}</SelectItem>
                      })
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description(Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description in English"
                      className="resize-none"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Banner status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(e: string) => {
                        form.setValue("is_active", e === "true");
                      }}
                      defaultValue={form.getValues("is_active") !== undefined ? `${form.getValues("is_active")}` : undefined}
                      className="flex flex-col space-y-1"
                    >

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"true"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Active
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"false"} />
                        </FormControl>
                        <FormLabel className="font-normal">Disabled</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto " type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
