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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { changeContactLink, deleteContactLink } from "@/actions/contact-us";
import { ISocialLink } from "@/types/social-links";
import { Input } from "@/components/ui/input";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { Save, Trash} from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
import NewSocialLink from "./add-edit-social-link-dialog";
import { useTranslations } from "next-intl";
import { getCustomNameKeyLang } from "@/utils/helperFunctions";

const formSchema = z.object({
  url: z.string().min(10, { message: "URL must be at least 10 characters" })
});

export type ContactUsFormValues = z.infer<typeof formSchema>;
interface Prop {
  socialLink: ISocialLink;
}

export const ContactUsForm: React.FC<Prop> = ({
  socialLink
}) => {
  const t = useTranslations("pages.general_settings");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    setDeleteLoading(true);
    const res = await deleteContactLink(socialLink?.id ?? "");
    // router.refresh();
    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("contactUsUpdateFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: t("contactUsUpdated"),
        description: t(`socialLinkUpdatedSuccessfully`),
      });
    }

    setDeleteLoading(false);
    setOpen(false);

  };
  const defaultValues = {
    url: socialLink?.url,
  };

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactUsFormValues) => {
    setLoading(true);
    const res = await changeContactLink(data.url, socialLink?.id ?? "");
    // router.refresh();
    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("contactUsUpdateFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title:t("contactUsUpdated"),
        description:  t(`socialLinkUpdatedSuccessfully`),
      });
    }

    setLoading(false);

  };

  useEffect(() => {
    form.setValue("url", socialLink?.url)
  }, [form, socialLink])

  return (
    <>
      {open && <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />}
      <div className="flex gap-2">
        <Form {...form} >
          <form className="flex-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-11 w-11 mt-[-3px] rounded-full">
                <AvatarImage
                  src={socialLink.logo ?? ""}
                  alt={socialLink.title_en ?? ""}
                />
                <AvatarFallback>{socialLink.title_en[0]}</AvatarFallback>
              </Avatar>

              <div className="grow relative top-[-3.72vh]">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getCustomNameKeyLang(socialLink?.title_en,socialLink?.title_ar)}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={`${socialLink?.title_en} link`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-1">
                <Button size="icon" disabled={!(form.getValues("url") !== defaultValues?.url) || loading} type="submit" variant="outline">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="flex gap-2">
          <NewSocialLink socialLink={socialLink} />
          <Button
            disabled={deleteLoading}
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </>
  );
};
