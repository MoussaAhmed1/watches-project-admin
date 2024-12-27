"use client";
import { Button } from "@/components/ui/button";
import { SuggestionsComplaints } from "@/types/suggestions/suggestions-complaints";
import { MoreHorizontal, Eye, Reply } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { useTranslations } from "next-intl";
import ReplyForm from "@/components/forms/messages/ReplyForm";

interface CellActionProps {
  data: SuggestionsComplaints;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";
  const t = useTranslations("tableActions");
  return (
    <>
      <div className="flex flex-end grow" key={data.id}>
        <div className="flex-end grow flex gap-1 justify-start items-center ">
          <Button
            variant={"outline"}
            className="sm:mt-0 p-3 rounded-lg"
            onClick={() => router.push(`/${currentLang}/dashboard/messages/${data.id}`)}
          >
            <Eye className="h-4 w-4 text-gray-600" />

          </Button>
            <ReplyForm email={data?.email}>
            <Button
            variant={"outline"}
            className="sm:mt-0 p-3 rounded-lg"
          >
            <Reply className="h-4 w-4 text-gray-600" />
          </Button>
            </ReplyForm>
        </div>
      </div>
    </>
  );
};
