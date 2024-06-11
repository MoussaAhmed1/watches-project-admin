"use client";
import * as React from "react";
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CalendarDateRangePicker } from "../../date-range-picker";
import { DateRange } from "react-day-picker";
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
      (file) => file && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      {
        message: 'File must be an image (jpeg, png, gif)',
      }
    ),
    z.string().refine((url) => {
      try {
        const { pathname } = new URL(url);
        const extension = pathname.split('.').pop();
        return ['jpeg', 'jpg', 'png', 'gif'].includes(extension?.toLowerCase() ?? '');
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
  banar?: IBanner ;
  doctors: IDoctor[];
}

export const BanarsForm: React.FC<BanarFormProps> = ({ banar, doctors }) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const action = "Send";
  const router = useRouter();
  const form = useForm<BanarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: banar ?  {
      is_active: banar?.is_active || false,
      started_at: new Date(banar?.started_at) || null,
      ended_at: new Date(banar?.ended_at) || null,
      banar: banar?.banar,
      description: banar?.description || "",
      doctor_id: banar?.doctor_id || undefined,
    }:undefined,
  });
  const { control, formState: { errors }, setValue } = form;

  const onSubmit = async (data: BanarFormValues) => {
    const formData = new FormData();
    toFormData(data, formData);
    if (banar) {
      formData.set('id', banar?.id);
      //handel which to send 
      if(typeof(form.getValues("banar"))==="string"){
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
  };

  const handleChange = (isChecked: boolean) => {
    form.setValue("is_active", isChecked);
  };

  React.useEffect(() => {
    if (banar) {
  //     form.setValue("is_active", banar?.is_active || false);
  //     form.setValue("started_at", banar?.started_at || null);
  //     form.setValue("ended_at", banar?.ended_at || null);
  //     form.setValue("banar", banar?.banar);
  //     form.setValue("doctor_id", banar?.doctor_id);
  //     form.setValue("description", banar?.description);
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
          <div className=" md:grid md:grid-cols-1 gap-8">
            {selectedBanar && (
              <div style={{ maxWidth: "100%", height: '250px', overflow: "hidden", position: 'relative', }}>
                <Image
                  src={selectedBanar}
                  alt="Selected Banner"
                  fill
                  objectFit="cover"
                  style={{
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}
            <FormItem
              style={{
                margin: "30px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormLabel className="max-w-30 mx-1">Banner</FormLabel>
              <div>
                <Controller
                  name="banar"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                        handleBanarChange(e);
                      }}
                    />
                  )}
                />
              </div>
              {errors?.banar?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.banar?.message as any}</FormMessage>}
            </FormItem>
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
                            "w-[240px] pl-3 text-left font-normal",
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
                            "w-[240px] pl-3 text-left font-normal",
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
            <FormItem style={{ display: "flex", alignItems: "center" }}>
              <FormLabel style={{ marginRight: "70px" }}>
                Banner status
              </FormLabel>
              <FormControl>
                <Switch
                  checked={form.watch("is_active")}
                  onClick={() => handleChange(!form.watch("is_active"))}
                  name="is_active"
                />
              </FormControl>
              <FormMessage style={{ marginLeft: "px" }}>
                {form.formState.errors?.is_active?.message
                  ? "is_active file is required"
                  : ""}
              </FormMessage>
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
