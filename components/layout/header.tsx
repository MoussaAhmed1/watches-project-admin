import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/logo/logo-icon.svg"
import LocaleSwitcher from "../shared/locale-switcher";
import { Language } from "@/utils/changeLanguageHandler";
import { ModeToggle } from "../ui/theme-toggler";
// import LocaleSwitcher from "../locale-switcher";


export default function Header({ lang }: { lang: Language }) {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b dark:border-gray-700 bg-background/95 backdrop-blur z-50 dark:bg-[#181D26]">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden xl:flex">
          <Link
            href={"/"}
            className="flex items-center gap-1"
          >
            <Image
              width={30}
              height={30}
              src={Logo}
              alt="Logo"
              priority
              style={{ padding: 0, margin: "0px", }}
            />
            <h2 className="text-2xl font-bold tracking-tight">Dacatra</h2>
          </Link>
        </div>
        <div className={cn("block xl:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {/*Lang toggle */}
          <UserNav lang={lang} />
          <LocaleSwitcher lang={lang} />
          {/* <ThemeToggle /> */}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
