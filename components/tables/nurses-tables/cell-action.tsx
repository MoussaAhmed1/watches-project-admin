"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INurse } from "@/types/nurses";
import { Edit, MoreHorizontal, Trash, Eye, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookie from 'js-cookie';
import Approve from "@/components/details/role-details/Approve";
import { AcceptNurseRequest } from "@/actions/nurses";
import { removeUser } from "@/actions/patients";
interface CellActionProps {
  data: INurse;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";
  const onConfirm = async () => {
    setLoading(true);
    await removeUser({ id: data?.user_id, revalidateData: "/dashboard/nurses" })
    setLoading(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {!data?.is_verified && <DropdownMenuItem>
            <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptNurseRequest} id={data?.user_id} >
              <div className="flex">
                <BadgeCheck className="mr-2 h-4 w-4" />Approve
              </div>
            </Approve>
          </DropdownMenuItem>}
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/nurses/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/nurses/${data?.id}/${data?.user_id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Approve successMessage="User Deleted Successfully" title="Delete User" method={removeUser} revalidateData="/dashboard/nurses" id={data?.user_id} >
              <div className="flex">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </div>
            </Approve>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
