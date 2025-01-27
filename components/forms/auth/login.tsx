"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/logo/logo-login.png";
import blackWatch from "../../../public/assets/blackWatch.png";
import pinkWatch from "../../../public/assets/pinkWatch.png";
import schoolpattern from "../../../public/assets/schoolpattern.png";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/theme-toggler";
import { Language } from "@/utils/changeLanguageHandler";
import LocaleSwitcher from "@/components/shared/locale-switcher";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({ lang }: { lang: Language }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const tShared = useTranslations("shared");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username: email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      setError("something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center dark:bg-gray-900 overflow-hidden">
      <div className="m-0  bg-white shadow sm:rounded-lg flex justify-center flex-1 dark:bg-gray-900">
        <div className="lg:w-1/2  p-6 sm:p-12 mt-[10vh]">
          <div>
            <Image
              alt={"logo"}
              width={250}
              height={150}
              src={logo}
              className="mx-auto"
            />
          </div>
          <div className="mt-0 flex flex-col items-center ">
            <div className="w-full flex-1 mt-0">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                <input
                  className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder={tShared("email") as string}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative">
                  <div className="space-y-0 relative">
                    <input
                      className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type={showPassword ? "text" : "password"}
                      placeholder={tShared("password") as string}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="relative inset-y-0 -top-9  left-[90%] rtl:right-[87%] pr-3 flex items-center "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 cursor-pointer" />
                      ) : (
                        <Eye className="w-5 h-5 cursor-pointer" />
                      )}
                    </div>
                  </div>
                </div>
                <button className="mt-5 tracking-wide font-semibold bg-[#027BA7] text-gray-100 w-full py-4 rounded-lg hover:bg-[#027BA7] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="mx-3">
                    {lang === "en" ? "Sign in" : "تسجيل الدخول"}
                  </span>
                </button>
                <p className="mx-2 mt-2 text-sm font-bold text-primary">
                  <Link href="/auth/reset-password" className="no-underline">
                    {lang === "en" ? "Forget password?" : "هل نسيت كلمة السر؟"}
                  </Link>
                </p>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  {error && (
                    <div className="text-red-500 w-fit text-sm py-1 px-3 rounded-md mt-2">
                      {error}
                    </div>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center hidden lg:flex">
          <div className="h-full w-full bg-cover bg-center relative z-3">
            {/* <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-20 z-2"></div> */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent opacity-30"></div> */}
            <div
              className="h-full w-full bg-cover bg-center relative z-1"
              style={{
                backgroundColor: `#027BA7`,
                height: "100%",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <div className="w-full h-full  dark:bg-gray-900 opacity-40 absolute z-2 top-0 dark:opacity-20 " style={{
                backgroundImage: `url(${schoolpattern.src})`,
                backgroundSize: `cover`,
                }}>

              </div>
              <div className="absolute rtl:left-5  ltr:right-5 top-2 z-100">
                <div className="flex items-center gap-2 z-5">
                  {/*Lang toggle */}
                  <LocaleSwitcher lang={lang} variant={"default"} />
                  {/* <ThemeToggle /> */}
                  <ModeToggle variant="default" />
                </div>
              </div>
              <div className="w-[500px] h-[500px] bg-[#b9bec2] dark:bg-gray-900 z-15  relative" style={{borderRadius: `50%`}}>
                <div className="w-[520px] h-[520px] border-2 border-white dark:border-[#b9bec2] absolute z-25" style={{borderRadius: `50%`}}> </div>
              <Image
                alt={"login"}
                src={lang === "ar" ? pinkWatch : blackWatch}
                className="object-cover opacity-100 absolute z-22 "
                width={150}
                height={150}
              />
                <Image
                  alt={"login"}
                  src={lang === "ar" ?  blackWatch : pinkWatch}
                  className="object-cover opacity-100 absolute z-2"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
