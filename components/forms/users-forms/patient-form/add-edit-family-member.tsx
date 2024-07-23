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
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { AddFamilyMember } from "@/actions/patients";
import { Card } from "@/components/ui/card";

import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import InputDate from "@/components/shared/timepicker/InputDate";
import FamilymemberSchema from "./familyMemberSchema";
import { Textarea } from "@/components/ui/textarea";
import Kinship from "@/types/patients";


export type FamilyMemberFormValues = z.infer<typeof FamilymemberSchema>;

interface FamilyMemberFormProps {
  initialData?: FamilyMemberFormValues;
  id: string;
  _role?: "CLIENT";
}

export const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  initialData,
  id,
  _role = "CLIENT"
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const title = "Create patient";
  const description = "Add a new patient.";
  const action = initialData ? "Save changes" : "Create";
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };
  const form = useForm<FamilyMemberFormValues>({
    resolver: zodResolver(FamilymemberSchema),
    // defaultValues: initialData ? defaultValues : undefined,
  });
  const { control, formState: { errors } } = form;

  useEffect(() => {
    form.setValue("role", _role)
  }, [_role, form]);


  const onSubmit = async (data: FamilyMemberFormValues) => {
    // alert(JSON.stringify(data)); //testing

    if(data.kinship === Kinship.Other){
      data.kinship = data.kinship_ifOther as any
      delete data.kinship_ifOther;
    }
    else{
      delete data.kinship_ifOther;
    }
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);
    const res = await AddFamilyMember(formData,id);

    if (res?.error) {
      toast({
        variant: "destructive",
        title: initialData ? "Update failed" : "Add failed",
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: initialData ? "Updated successfully" : "Added successfully",
        description: _role === "CLIENT" ? `Patient has been successfully updated.` : `Admin has been successfully added.`,
      });
      if (_role === "CLIENT") {
        router.push(`/dashboard/patients`);

      }
    }

    setLoading(false);
  };
  //show error messages
  // console.log(form.formState.errors);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>

      <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <AvatarPreview selectedAvatar={selectedAvatar} />
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end flex-col items-start gap-1">
                <label htmlFor="date" className="font-medium text-sm">
                  birth date <span className="text-red-800">*</span>
                </label>
                <div className="flex-col w-full">
                  <InputDate
                    value={form.getValues("birth_date")}
                    onChange={(val) => {
                      form.setValue("birth_date", val);
                    }}
                    disableFuture
                    maxWidth={"100%"}
                  />
                  {errors.birth_date && (
                    <span className="error-text">
                      {errors.birth_date.message}
                    </span>
                  )}
                </div>
              </div>
              {/* Gender */}
              <FormField name="gender" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender <span className="text-red-800">*</span></FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )} />


              {/* Avatar */}
              <FormItem
                style={{
                  margin: "-2px 0",
                }}
              >
                <FormLabel className="max-w-30 mx-1">Avatar</FormLabel>
                <Controller
                  name="avatarFile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={(e) => {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                        handleAvatarChange(e);
                      }}
                    />
                  )}
                />

                {errors?.avatarFile?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.avatarFile?.message as any}</FormMessage>}
              </FormItem>

              <FormField
                control={form.control}
                name="kinship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kinship</FormLabel>
                    <Select required onValueChange={(e: any) => {
                      field.onChange(e);
                      if(e===Kinship.Other){
                        setIsOther(true);
                      }
                      else{
                        setIsOther(false);
                      }
                    }} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a kinship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Kinship.Parent}>Parent</SelectItem>
                        <SelectItem value={Kinship.Child}>Child</SelectItem>
                        <SelectItem value={Kinship.Sibling}>Sibling</SelectItem>
                        <SelectItem value={Kinship.Spouse}>Spouse</SelectItem>
                        <SelectItem value={Kinship.Grandparent}>Grandparent</SelectItem>
                        <SelectItem value={Kinship.Grandchild}>Grandchild</SelectItem>
                        <SelectItem value={Kinship.UncleAunt}>UncleAunt</SelectItem>
                        <SelectItem value={Kinship.NieceNephew}>NieceNephew</SelectItem>
                        <SelectItem value={Kinship.Cousin}>Cousin</SelectItem>
                        <SelectItem value={Kinship.Other}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isOther && <div className="md:grid md:grid-cols-1 gap-8">
              {/* kinship */}
              <FormField  name="kinship_ifOther" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>kindship </FormLabel>
                  <FormControl>
                    <Input required={isOther} type="text" {...field} />
                  </FormControl>
                  {errors.kinship_ifOther && <FormMessage>{errors.kinship_ifOther.message}</FormMessage>}
                </FormItem>
              )} />
            </div>}
            <div className="md:grid md:grid-cols-2 gap-8">

              {/* weight */}
              <FormField name="weight" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {errors.weight && <FormMessage>{errors.weight.message}</FormMessage>}
                </FormItem>
              )} />

              {/* height */}
              <FormField name="height" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Height </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {errors.height && <FormMessage>{errors.height.message}</FormMessage>}
                </FormItem>
              )} />

            </div>
            <div className="md:grid md:grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="allergic_reactions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergic Reactions </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Allergic Reactions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Notes */}
              <FormField name="notes" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  {errors.notes && <FormMessage>{errors.notes.message}</FormMessage>}
                </FormItem>
              )} />

            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};
