"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/logo/logo-login.png";
import loginImage from "../../../public/assets/login-image.jpg";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/theme-toggler";
import { Language } from "@/utils/changeLanguageHandler";
import LocaleSwitcher from "@/components/shared/locale-switcher";

export default function LoginForm({ lang }: { lang: Language }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center dark:bg-gray-900">
            <div className="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 dark:bg-gray-900">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 mt-[20vh]">
                    <div>
                        <Image alt={"logo"} width={250} height={150} src={logo}
                            className="mx-auto" />
                    </div>
                    <div className="mt-4 flex flex-col items-center ">
                        <div className="w-full flex-1 mt-8">
                            <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                <input
                                    className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-[#24A189] text-gray-100 w-full py-4 rounded-lg hover:bg-[#2ebc94] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="mx-3">
                                     {
                                        lang === "en" ? "Sign in" : "تسجيل الدخول"
                                     }  
                                    </span>
                                </button>
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
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="h-full w-full bg-cover bg-center relative z-3">
                        <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-20 z-2"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent opacity-30"></div>
                        <div className="h-full w-full bg-cover bg-center "
                            style={{
                                backgroundImage: `url(${loginImage.src})`,
                            }}
                        >
                            <div className="absolute rtl:left-5  ltr:right-5 top-2 z-3">
                                <div className="flex items-center gap-2 z-5">
                                    {/*Lang toggle */}
                                    <LocaleSwitcher lang={lang} variant={"default"} />
                                    {/* <ThemeToggle /> */}
                                    <ModeToggle variant="default" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}