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
import { useTranslations } from "next-intl";
import { City } from "@/types/map";
import { AddCity, EditCity } from "@/actions/settings/cities-actions";
interface IProps {
  city?: City;
  id?: string;
}

const formSchema = z
  .object({
    code: z
      .string()
      .min(3, { message: "Code must be at least 3 characters" }),
    name_en: z
      .string()
      .min(3, { message: "English Name must be at least 3 characters" }),
    name_ar: z
      .string()
      .min(3, { message: "Arabic Name must be at least 3 characters" }),
    order_by: z.number().int().positive(),
  })
  .required({
    name_en: true,
    name_ar: true,
    order_by: true,
    code: true,
  });
export default function CityForm({ city, id }: IProps) {
  const t = useTranslations("pages.forms");
  const tShared = useTranslations("shared");
  const action = city ? t("save") : t("add");
  const dialogTitle = city ? t("editCity") : t("addCity");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const defaultValues = city
    ? {
        name_en: city.name_en || "",
        name_ar: city.name_ar || "",
        order_by: city?.order_by || "",
        code: city?.code || "",
      }
    : undefined;

  const form = useForm<City>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });


  const onSubmit = async (data: City) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (city) {
      res = await EditCity({ ...data, id });
    } else {
      res = await AddCity(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: city ? tShared("updateFailed") : tShared("addFailed"),
        description: res?.error,
      });
    } else {
      toast({
        variant: "default",
        title: city
          ? tShared("updatedSuccessfully")
          : tShared("addedSuccessfully"),
      });
    }

    setLoading(false);
    closeRef?.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {city ? (
          <Button size="icon">{<Pencil className="h-4 w-4" />}</Button>
        ) : (
          <Button disabled={loading} type="button" size="lg">
            <Plus className="ltr:mx-1 rtl:ml-2 h-5 w-5" /> {dialogTitle}
          </Button>
        )}
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
                    <FormLabel>{t("name_en")}</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
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
                    <FormLabel>{t("name_ar")}</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("order_by")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        {...field}
                        onChange={(event) => {
                          field.onChange(Number(event.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("code")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex gap-2">
              <div>
                <Button disabled={loading} className="ml-auto" type="submit">
                  {action}
                </Button>
              </div>
              <DialogClose asChild>
                <Button type="button" variant="secondary" ref={closeRef}>
                  {t("close")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
