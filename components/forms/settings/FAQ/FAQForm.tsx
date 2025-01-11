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
import { useToast } from "../../../ui/use-toast";

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
import { AddEditFaqsBody, IFaqs } from "@/types/settings/faqs";
import { AddFAQ, UpdateFAQ } from "@/actions/settings/faq";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
interface IProps {
  faq?: IFaqs;
  id?: string;
}
const formSchema = z.object({
  title_ar: z
    .string().regex(/^[\u0600-\u06FF0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be Arabic characters only' })
    .min(3, { message: "Arabic Name must be at least 3 characters" }),
  title_en: z
    .string().regex(/^[a-zA-Z0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be English characters only' })
    .min(3, { message: "English Name must be at least 3 characters" }),
  descrption_ar: z
    .string().regex(/^[\u0600-\u06FF0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be Arabic characters only' })
    .min(3, { message: "Arabic descrption must be at least 3 characters" }),
  descrption_en: z
    .string().regex(/^[a-zA-Z0-9\s.,;:?!()\-\[\]{}@#$%^&*+=_~'"<>]+$/, { message: 'Must be English characters only' })
    .min(3, { message: "English descrption must be at least 3 characters" }),
});
export default function FAQForm({ faq, id }: IProps) {
  const t = useTranslations("pages.general_settings")
  const tShared = useTranslations("shared")
  const action = faq ? t("save") : t("create");
  const dialogTitle = faq ? t("editFAQ") : t("addFAQ");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<AddEditFaqsBody>({
    resolver: zodResolver(formSchema),
    defaultValues: faq
      ? {
        title_ar: faq?.title_ar || "",
        title_en: faq?.title_en || "",
        descrption_ar: faq?.descrption_ar || "",
        descrption_en: faq?.descrption_en || "",
      }
      : undefined,
  });



  const onSubmit = async (data: AddEditFaqsBody) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing
    let res;
    if (faq) {
      res = await UpdateFAQ({ ...data}, id );
    } else {

      res = await AddFAQ(data);
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: faq ? tShared("updateFailed") : tShared("addFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: faq ? tShared("updatedSuccessfully") : tShared("addedSuccessfully"),
        description: faq ? t(`faqSuccessfullyUpdated`) : t(`faqSuccessfullyAdded`),
      });
    }

    setLoading(false);
    closeRef?.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild >
        {faq ? <Button size="icon" >
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
                name="title_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("titleInEnglish")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("titleInEnglish")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("titleInArabic")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("titleInArabic")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descrption_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("descriptionInEnglish")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("descriptionInEnglish")}
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
                name="descrption_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("descriptionInArabic")}</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{ direction: "rtl" }}
                        placeholder={t("descriptionInArabic")}
                        className="resize-none"
                        {...field}
                        rows={6}
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
                  {tShared("close")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
}
