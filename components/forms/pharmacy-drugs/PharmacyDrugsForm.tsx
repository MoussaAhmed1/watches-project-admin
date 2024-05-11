"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";

import { Input } from "@/components/ui/input";
import { ISocialLink } from "@/types/social-links";
import { Pencil, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectItem } from "@radix-ui/react-select";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Drug } from "@/types/pharmacy";
import useCostomSearchParams from "@/hooks/use-searchParams";
import { AddPharmacyDrug, UpdatePharmacyDrug } from "@/actions/pharmacies";
interface IProps {
  categories: Category[],
  drug?: Drug
  id?: string
}
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "English Name must be at least 3 characters" }),
  category_id: z.string(),
}).required({
  name: true,
  category_id: true
});
export default function PharmacyDrugsForm({ drug, id, categories }: IProps) {
  const action = drug ? "Save" : "Create";
  const dialogTitle = drug ? "Edit Product" : "Create Product";
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [categoryIdError, setCategoryIdError] = useState("");
  const defaultValues = drug
    ? drug
    : {
      name: "",
      category_id: "",
    };

  const form = useForm<Drug>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });



  const onSubmit = async (data: Drug) => {
    //validation
    setCategoryIdError("");
    if (data.category_id === "") {
      setCategoryIdError("Required");
      return;
    }
    //submitting
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (drug) {
      res = await UpdatePharmacyDrug(data, id);
    } else {

      res = await AddPharmacyDrug(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: drug ? "Update failed" : "Add failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: drug ? "Updated successfully" : "Added successfully",
        description: drug ? `Product has been successfully updated.` : `Product has been successfully added.`,
      });
    }

    setLoading(false);
    reset();
    closeRef?.current?.click();
  };
  const {
    setValue, getValues, reset
  } = form;

  return (
    <Dialog>
      <DialogTrigger asChild >
        {drug ? <Button size="icon" >
          {<Pencil className="h-4 w-4" />}
        </Button>
          :
          <Button disabled={loading}
            type="button"
            size="lg" >
            {dialogTitle}
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {/* <DialogDescription>
            What do you want to get done today?
          </DialogDescription> */}
        </DialogHeader>


        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel className="my-1">Category</FormLabel>
              <select defaultValue={getValues("category_id") || ""} name="category_id" id="Category" placeholder="Select a Category" onChange={(e: any) => {
                setValue("category_id", e?.target?.value);
                setCategoryIdError("");
              }} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black">
                <option value={""} disabled>Select a Category</option>
                {categories?.length && categories?.map((item: any) => {
                  return <option value={item?.id} key={item?.id}>{(item?.name)}</option>
                })
                }
              </select>
              {categoryIdError && <FormMessage>{categoryIdError}</FormMessage>}
            </div>
            <DialogFooter>
              <div>
                <Button disabled={loading} className="ml-auto" type="submit">
                  {action}
                </Button>
              </div>
              <DialogClose asChild >
                <Button type="button" variant="secondary" ref={closeRef}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
