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
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { AddPackages, updatePackages } from "@/actions/packages";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name_en: z
    .string()
    .min(3, { message: "Package Name must be at least 3 characters" }),
  name_ar: z
    .string()
    .min(3, { message: "Package Name must be at least 3 characters" }),
  description_ar: z
    .string()
    .min(3, { message: "Package description must be at least 3 characters" }),
  description_en: z
    .string()
    .min(3, { message: "Package description must be at least 3 characters" }),
  price: z.coerce.number(),
  expiration_days: z.coerce.number(),
  number_of_pharmacy_order: z.coerce.number(),
});

export type PackageFormValues = z.infer<typeof formSchema>;

interface PackageFormProps {
  initialData?: PackageFormValues;
  id?: string;
}

export const PackageForm: React.FC<PackageFormProps> = ({
  initialData,
  id
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit package" : "Create package";
  const description = initialData ? "Edit a package." : "Add a new package";
  const toastMessage = initialData ? "Package updated." : "Package created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
      name_en: "",
      name_ar: "",
      description_ar: "",
      description_en: "",
      price: 0,
      expiration_days: 0,
      number_of_pharmacy_order: 0,
    };

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? defaultValues : undefined,
  });

  const onSubmit = async (data: PackageFormValues) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (initialData) {
      res = await updatePackages(data,id );
    } else {

      res = await AddPackages(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: initialData ? "Update failed" : "Add failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: initialData ? "Updated successfully" : "Added successfully",
        description: initialData ? `Specialization has been successfully updated.` : `Specialization has been successfully added.`,
      });
    }

    setLoading(false);
    router.push(`/dashboard/packages`);
  };




  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
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
                    <FormLabel>Name in English</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Package name"
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
                    <FormLabel>Name in Arabic</FormLabel>
                    <FormControl>
                      <Input
                        style={{ direction: "rtl" }}
                        disabled={loading}
                        placeholder="Package name"
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
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
                    <FormLabel>Expiration days</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number_of_pharmacy_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of pharmacy order</FormLabel>
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
