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
import { IDoctor } from "@/types/doctors";
import { Edit, MoreHorizontal, Trash, Eye, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookie from 'js-cookie';
import Approve from "@/components/details/role-details/Approve";
import { AcceptDoctorRequest } from "@/actions/doctors";
import { removeUser } from "@/actions/patients";

interface CellActionProps {
  data: IDoctor;
  toBeVerified?: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, toBeVerified = false }) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {toBeVerified && <DropdownMenuItem
          >
            <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptDoctorRequest} id={data?.user_id} >
              <div className="flex">
                <BadgeCheck className="mr-2 h-4 w-4" />Approve
              </div>
            </Approve>
          </DropdownMenuItem>}
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/doctors/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/doctors/${data?.id}/${data?.user_id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Approve successMessage="Deleted Successfully" title="Delete User"  method={removeUser} revalidateData="/dashboard/doctors" id={data?.user_id} >
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

export const VerificationRequestsCellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const currentLang = Cookie.get("Language") ?? "en";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/doctors/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/doctors/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${currentLang}/dashboard/doctors/${data?.id}/${data?.user_id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Approve successMessage="User Deleted Successfully" title="Delete User"  method={removeUser} revalidateData="/dashboard/doctors" id={data?.user_id} >
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
