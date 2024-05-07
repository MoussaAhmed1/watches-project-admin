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
import { useRef, useState } from "react";
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
import { AddContactLink, changeContactLink } from "@/actions/contact-us";
import ImgUpload from "@/components/upload-img";
import { toFormData } from "axios";
import { getImageUrl } from "@/actions/storage-actions";
interface IProps {
  CancelRequest?: { reason: string }
  id: string
  dialogTitle: string
  method: (id: string, reason?: string) => Promise<any>;
}
const formSchema = z.object({
  reason: z
    .string()
    .min(3, { message: "Social Link Name must be at least 3 characters" }),

});
export default function CancelWithReason({ CancelRequest, id, dialogTitle, method }: IProps) {
  const action = CancelRequest ? "Continue1" : "Continue";
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | Blob>("");
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const defaultValues = CancelRequest
    ? CancelRequest
    : {
      reason: "",
    };

  const form = useForm<{ reason: string }>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: { reason: string }) => {
    setLoading(true);
    const res = await method(id, data?.reason);
    if (CancelRequest) {
      // TODO: handle social patch after getting reason 
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Cancel failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: "Canceled successfully",
        description: `Reservation has been successfully cancled.`,
      });
    }

    setLoading(false);
    closeRef?.current?.click();

  };
  return (
    <Dialog>
      <DialogTrigger asChild >
        {CancelRequest ? <Button disabled={loading}
          type="button"
          size="lg">
          {dialogTitle}
        </Button> :
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
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Reason to cancel"
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
