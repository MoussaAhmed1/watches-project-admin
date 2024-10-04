import Image from "next/image";
import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import {  Info,MessageSquare,Reply } from "lucide-react";
import userAvatar from "../../../../../public/assets/user-avatar.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchSingleSuggestion } from "@/actions/suggestions";
import { SuggestionsComplaints } from "@/types/suggestions-complaints";
import { getDictionary } from "@/app/[lang]/messages";
export const metadata: Metadata = {
  title: "Message Deatails",
  description:
    "Message Deatails - Dacatra Admin Dashboard",
};

const page = async ({ params }: {
  params: { id: string,lang:"ar"|"en" }
}) => {
  const { pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: pages.messages.messages, link: "/dashboard/messages" },
    { title: pages.messages.messageDetails, link: "/dashboard/patients/id" },
  ];
  //----------------------------------------------------------------
  const res = await fetchSingleSuggestion(params?.id);
  const msg: SuggestionsComplaints = res?.data?.data;
  //fetch Message Addtional Info

  return (
    <>
      <div className="mx-auto w-full mt-8 bg-background">
        <BreadCrumb items={breadcrumbItems} customStyle="mx-5" />
          <div className="flex items-baseline justify-between mx-5">
          <Heading
            title={pages.messages.messageDetails}
            description={msg?.title}
          />
          <Button
            variant={"default"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Reply className="mx-1 h-4 w-4" /> {pages.messages.reply}
          </Button>
          </div>
        <div className="flex flex-col lg:flex-row gap-1 lg:items-center lg:justify-between justify-start items-start">
      </div>
      <div className="w-full mx-auto p-4 ">
        <div className="bg-background shadow-md rounded-lg overflow-hidden border min-h-[77dvh] border-gray-400">
          <div className="flex items-center justify-start p-4 bg-[#3c50e0] text-white">
            <Image
              src={msg?.user?.avatar||userAvatar}
              alt={msg?.user?.name }
              className="rounded-full"
              width={65}
              height={65}
            />
            <div className="mx-2">
              <h1 >{pages.messages.sender}: {msg?.user?.name }</h1>
              <h6>{pages.messages.phone}: {msg?.user?.phone}</h6>
              {msg?.email && <h6>{pages.messages.email}: {msg?.email}</h6>}
            </div>
          </div>
          <div className="tab1">
            <div className="p-4 border-t border-gray-200">
              <h2 className="text-xl my-1 font-bold">{pages.messages.message}</h2>
              <div className="flex-col space-y-4">
                <p className="flex"><Info className="details_icon" />{pages.messages.title}: {msg?.title ?? "-"}</p>
                <p className="flex">
                 <div>
                   <MessageSquare className="details_icon" />
                 </div>
                  {pages.messages.description}: {msg?.description ?? "-"}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
    </>
  );
};

export default page;
