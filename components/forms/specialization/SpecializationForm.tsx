"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";

import { Input } from "@/components/ui/input";
import { Pencil, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddEditSpecializationBody, ISpecializations } from "@/types/additional-info-specializations";
import { AddSpecialization, UpdateSpecialization } from "@/actions/additional-info-specializations";
interface IProps {
  specialization?: ISpecializations;
  id?: string;
}
const formSchema = z.object({
  name_ar: z
    .string()
    .min(3, { message: "Arabic Name must be at least 3 characters" }),
  name_en: z
    .string()
    .min(3, { message: "English Name must be at least 3 characters" }),
}).required({
  name_ar: true,
  name_en: true,
});
export default function SpecializationForm({ specialization, id }: IProps) {
  const action = specialization ? "Save" : "Create";
  const dialogTitle = specialization ? "Edit Specialization" : "Add Specialization";
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [categoryIdError, setCategoryIdError] = useState("");
  const defaultValues = specialization
    ? specialization
    : {
      name_ar: "",
      name_en: "",
    };

  const form = useForm<AddEditSpecializationBody>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });



  const onSubmit = async (data: AddEditSpecializationBody) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (specialization) {
      res = await UpdateSpecialization({ ...data, id });
    } else {

      res = await AddSpecialization(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: specialization ? "Update failed" : "Add failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: specialization ? "Updated successfully" : "Added successfully",
        description: specialization ? `Specialization has been successfully updated.` : `Specialization has been successfully added.`,
      });
    }

    setLoading(false);
    reset();
    closeRef?.current?.click();
  };
  const {
    reset
  } = form;

  return (
    <Dialog>
      <DialogTrigger asChild >
        {specialization ? <Button size="icon" >
          {<Pencil className="h-4 w-4" />}
        </Button>
          :
          <Button disabled={loading}
            type="button"
            size="lg" >
            <Plus className="mr-2 h-5 w-5" />    {dialogTitle}

          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="name_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name In English</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Specialization Name"
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
                    <FormLabel>Name In Arabic</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Specialization Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
