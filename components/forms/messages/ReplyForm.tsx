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
import { AddWatch, EditWatch } from "@/actions/watches/watches-actions";
import { useTranslations } from "next-intl";
import { Reply } from "@/types/settings/suggestions-complaints";
import { ReplyOnSuggestion } from "@/actions/suggestions";
import { Textarea } from "@/components/ui/textarea";
interface IProps {
  email?: string;
  children: React.ReactNode;
}
const formSchema = z.object({
  message_header: z
    .string()
    .min(10, {
      message: "Notification description must be at least 10 characters.",
    })
    .max(160, "must not be longer than 160 characters."),
  message_body: z
    .string()
    .min(10, {
      message: "Notification description must be at least 10 characters.",
    })
    .max(160, "must not be longer than 160 characters."),
  send_to: z.string().email({ message: "Enter a valid email address" }),
  type: z.array(z.string()),
});
export default function ReplyForm({ email, children }: IProps) {
  const t = useTranslations("pages.notification");
  const tShared = useTranslations("shared");
  const action = t("send");
  const dialogTitle = t("replyMessages");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const defaultValues = {
    message_header: "",
    message_body: "",
    send_to: email || "",
    type: ["email"],
  };

  const form = useForm<Reply>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { reset } = form;

  const onSubmit = async (data: Reply) => {
    setLoading(true);
    // alert(JSON.stringify(data)); //testing

    const res = await ReplyOnSuggestion(data);

    if (res?.error) {
      toast({
        variant: "destructive",
        title: t("somethingWentWrong"),
        description: res?.error,
      });
    } else {
      toast({
        variant: "default",
        title: t("messageSent"),
      });
    }
    setLoading(false);
    closeRef?.current?.click();
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="message_header"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("title")}</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="send_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message_body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")}</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} rows={6} />
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
