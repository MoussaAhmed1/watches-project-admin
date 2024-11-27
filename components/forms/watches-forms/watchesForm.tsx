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
import { AddEditWatchBody, IWatch } from "@/types/watches";
import { AddWatch, EditWatch } from "@/actions/watches/watches-actions";
import { useTranslations } from "next-intl";
interface IProps {
  watch?: IWatch;
  id?: string;
}
const formSchema = z.object({
  IMEI: z
    .string()
    .min(3, { message: "IMEI must be at least 3 numbers" }),
}).required({
  IMEI: true,
});
export default function WatchForm({ watch, id }: IProps) {
  const t = useTranslations("pages.forms");
  const tShared = useTranslations("shared");
  const action = watch ? t("save") : t("add");
  const dialogTitle = watch ? t("editWatch") : t("addWatch");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const defaultValues = watch
    ? {
      IMEI: watch?.IMEI || "",
    }
    : undefined;

  const form = useForm<AddEditWatchBody>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });


  const {
    reset
  } = form;


  const onSubmit = async (data: AddEditWatchBody) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (watch) {
      res = await EditWatch({ ...data, id });
    } else {

      res = await AddWatch(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: watch ? tShared("updateFailed") : tShared("addFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: watch ? tShared("updatedSuccessfully") : tShared("addedSuccessfully"),
      });
    }

    setLoading(false);
    reset();
    closeRef?.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild >
        {watch ? <Button size="icon" >
          {<Pencil className="h-4 w-4" />}
        </Button>
          :
          <Button disabled={loading}
            type="button"
            size="lg" >
            <Plus className="ltr:mx-1 rtl:ml-2 h-5 w-5" />    {dialogTitle}

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
                name="IMEI"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("IMEI")}</FormLabel>
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
              <DialogClose asChild >
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
