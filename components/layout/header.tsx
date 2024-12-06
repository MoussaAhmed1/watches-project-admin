import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Image from "next/image";
import Logo_en from "../../public/assets/logo/en_header.png"
import Logo_ar from "../../public/assets/logo/ar_header.png"
import LocaleSwitcher from "../shared/locale-switcher";
import { Language } from "@/utils/changeLanguageHandler";
import { ModeToggle } from "../ui/theme-toggler";
// import LocaleSwitcher from "../locale-switcher";


export default function Header({ lang }: { lang: Language }) {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-[#FAFAFA] dark:border-[#2a3b50]  backdrop-blur z-50 dark:bg-[#0a1c38]">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="flex gap-2 items-center">
        <div className={cn("block xl:!hidden")}>
          <MobileSidebar />
        </div>
        <div>

            <Image
              width={125}
              height={41}
              src={lang=="en"?Logo_en:Logo_ar}
              alt="Logo"
              priority
              style={{ padding: 0, margin: "0 -5px", }}
            />

        </div>

        </div>

        <div className="flex items-center gap-3">
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
