"use client";

import { Heading } from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { changeAboutUs } from "@/actions/about-us";

export default function AboutUsView({
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
      static_page_type: "ABOUT_US",
      content_ar: data.description_ar,
      content_en: data.description_en,
    };
    try {
      const res = await changeAboutUs(body);
      toast({
        variant: "default",
        title: "About Us updated",
        description: "About Us have been successfully updated.",
      });
    } catch (err) {
      toast({
        variant: "default",
        title: "About Us update failed",
        description: "There was a problem with your request.",
      });
    }
    setLoading(false);
  };
  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    backgroundColor: isLoading ? "#ccc" : "#2563EB",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 0.3s",
    width: "100px",
  };
  return (
    <div style={{ padding: "40px" }} className=" mt-8">
      <Heading title="About Us" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "40px 0" }}>
        <div className="flex flex-col">
          <label className="mb-1">Arabic Description:</label>
          <textarea
            {...register("description_ar", { required: true })}
            onChange={(e) => setValue("description_ar", e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            style={{ height: "250px", direction: "rtl" }}
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
            style={{ height: "250px" }}
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
  );
}
