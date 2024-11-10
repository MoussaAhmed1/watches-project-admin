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
import { useEffect, useRef, useState } from "react";
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
import { AddContactLink, editContactLink } from "@/actions/settings/contact-us";
import ImgUpload from "@/components/upload-img";
import { getImageUrl } from "@/actions/storage-actions";
import { useTranslations } from "next-intl";
import { ISocialLink } from "@/types/settings/social-links";
interface IProps {
  socialLink?: ISocialLink
}
const formSchema = z.object({
  title_en: z
    .string()
    .min(4, { message: "Social Link Name must be at least 4 characters" }),
  title_ar: z
    .string()
    .min(4, { message: "Social Link Name must be at least 4 characters" }),
  url: z
    .string()
    .min(20, { message: "Social Link Name must be at least 20 characters" }),
});
export default function NewSocialLink({ socialLink }: IProps) {
  const t = useTranslations("pages.general_settings");
  const title = socialLink ? t("editSocialLink") : t( "createSocialLink");
  const toastMessage = socialLink ? t("socialLinkUpdated") : t( "socialLinkCreated");
  const action = socialLink ? t("save") : t("create");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | undefined>("");
  const [updateLogo, setUpdateLogo] = useState<boolean>(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { toast } = useToast();


  const defaultValues = socialLink
    ? {
      title_en: socialLink?.title_en || "",
      title_ar: socialLink?.title_ar || "",
      url: socialLink?.url || "",
    } : undefined;

  const form = useForm<ISocialLink>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  // const { formState: { errors } } = form;


  const handelchangeLogo = (val: string) => {
    setSelectedFile(val);
    setUpdateLogo(true);
  }
  
  useEffect(() => {
    if (socialLink) {
      setSelectedFile(socialLink?.logo);
      setUpdateLogo(false);
    }
  }, [form, socialLink])

  const onSubmit = async (data: ISocialLink) => {
    setLoading(true);
    let res: any;
    let logo: any;
    let _data: {
      title_en: string,
      title_ar: string,
      url: string,
      logo?: string
    } = {
      title_en: data.title_en,
      title_ar: data.title_ar,
      url: data.url,
    }
    if (selectedFile && updateLogo) {
      const image = new FormData();
      image.set('file', selectedFile);
      logo = await getImageUrl({ image })
      _data = {..._data,logo};
    }

    if (socialLink) {
      res = await editContactLink(_data, socialLink?.id ?? "");
    }

    else {
      res = await AddContactLink({
        title_en: data.title_en,
        title_ar: data.title_ar,
        url: data.url,
        logo
      });
    }

    // router.refresh();
    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("actionFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: title,
        description: toastMessage,
      });
      closeRef?.current?.click();
      if(!selectedFile){
        form.reset();
      }
    }

    setLoading(false);


  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!socialLink ? <Button>
          <Plus className="ltr:mx-1 rtl:ml-2 h-4 w-4" /> {t("addNew")}
        </Button> :
          <Button size="icon"  >
            {<Pencil className="h-4 w-4" />}
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>
            What do you want to get done today?
          </DialogDescription> */}
        </DialogHeader>
        <div>
          <ImgUpload selectedFile={selectedFile} setSelectedFile={handelchangeLogo} />
          {/* {selectedFile && <p style={{ marginLeft: "5px" }}>{"You must Upload Logo"}</p>} */}
        </div>
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
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("socialLinkUrl")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("socialLinkUrl")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex gap-2">
              <Button disabled={loading} className="ml-auto" type="submit">
                {action}
              </Button>
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