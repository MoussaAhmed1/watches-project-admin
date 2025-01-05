"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axios-client";
import { Key, Eye, EyeOff } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
const schema = z.object({
  password: z.string()
    .min(8, "Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long."),
  confirmPassword: z.string()
    .min(8, "Confirm Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function PasswordReset({ params }: {
    params: { token: string, }
  }) {

    if(!params?.token){
        redirect("/forget-password")
    }
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const tShared = useTranslations("shared");
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`/auth/reset-password/${params?.token}`, {
        newPassword: data.password,
      });
      toast({
        variant: "default",
        title: tShared("ResetsuccessMsg"),
      });
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: tShared("somthingwentwrong"),
        description: error?.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-pink-50">
      <Card className="w-full max-w-md ">
        <CardContent className="p-6 space-y-6">
          {/* Icon and Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Key className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-semibold">
            {tShared('resetPassword')}
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Password Fields */}
            <div className="space-y-0 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={tShared("password") as string}
                className="w-full"
                {...register("password")}
              />
              <div
                className="relative  inset-y-0 -top-7  left-[93%] rtl:right-[90%] pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-0 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={tShared("confirmPassword") as string}
                className="w-full"
                {...register("confirmPassword")}
              />
              <div
                className="relative inset-y-0 -top-7  left-[93%] rtl:right-[90%] right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Update Button */}
            <Button className="w-full hover:bg-blue-900" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : tShared("UpdatePassword")}
            </Button>

            {/* Links */}
            <div className="text-center space-y-4 pt-2">
            <Link
                className="text-sm text-muted-foreground hover:text-primary"
                href={"/"}
              >
                {tShared("returnToSignIn")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}