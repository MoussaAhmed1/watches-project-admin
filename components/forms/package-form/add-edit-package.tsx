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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { AddPackages } from "@/actions/packages";

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
  number_of_clinic_order: z.coerce.number(),
});

export type PackageFormValues = z.infer<typeof formSchema>;

interface PackageFormProps {
  initialData: any | null;
  categories: any;
}

export const PackageForm: React.FC<PackageFormProps> = ({
  initialData,
  categories,
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
      number_of_clinic_order: 0,
      };

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: PackageFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/packages/edit-package/${initialData._id}`, data);
      } else {
       await AddPackages(data);
        // console.log("package", res);
      }
      router.refresh();
      router.push(`/dashboard/packages`);
      toast({
        variant: "default",
        title: "Package created",
        description: "There was a problem with your request.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
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
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
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
                    <Input
                      disabled={loading}
                      placeholder="Package description"
                      {...field}
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
                    <Input
                      disabled={loading}
                      placeholder="Package description"
                      {...field}
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
              name="number_of_clinic_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of clinic order</FormLabel>
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
    </>
  );
};
