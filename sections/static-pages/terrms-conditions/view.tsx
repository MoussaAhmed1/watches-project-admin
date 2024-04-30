"use client";

import { changeTermsConditions } from "@/actions/terms-conditions";
import { Heading } from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import BreadCrumb from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";

export default function TermsConditionsView({
  description,
}: {
  description: { description_ar: string; description_en: string };
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description_ar: description?.description_ar,
      description_en: description?.description_en,
    },
  });
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const body = {
      static_page_type: "TERMS_AND_CONDITIONS",
      content_ar: data.description_ar,
      content_en: data.description_en,
    };
    try {
      const res = await changeTermsConditions(body);
      toast({
        variant: "default",
        title: "Terms and Conditions updated",
        description: "Terms and Conditions have been successfully updated.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions update failed",
        description: "There was a problem with your request.",
      });
    }
    setLoading(false);
  };
  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    backgroundColor: isLoading ? "#ccc" : "",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 0.3s",
    width: "100px",
  };
  const breadcrumbItems = [
    { title: "Terms and Conditions", link: "/dashboard/settings/terms-conditions" },
  ];

  return (
    <Card style={{padding: "40px" ,margin: "0",border: "none", boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >

    <div  className=" mt-8">
        <BreadCrumb items={breadcrumbItems} />
      <Heading title="Terms and conditions" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "40px 0" }}>
        <div className="flex flex-col">
          <label className="mb-1">Arabic Description:</label>
          <textarea
            {...register("description_ar", { required: true })}
            onChange={(e) => setValue("description_ar", e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            style={{ direction: "rtl" }}
            rows={6}

          />
          {errors.description_ar && (
            <span style={{ color: "red" }}>Arabic description is required</span>
          )}
        </div>
        <div style={{ margin: "80px 0" }} className="flex flex-col my-20">
          <label className="mb-1">English Description:</label>
          <textarea
            {...register("description_en", { required: true })}
            onChange={(e) => setValue("description_en", e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            rows={6}

          />
          {errors.description_en && (
            <span style={{ color: "red" }}>
              English description is required
            </span>
          )}
        </div>
        <button type="submit" style={buttonStyle} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
    </Card>
  );
}
