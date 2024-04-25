import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/logo/logo-icon.svg"
export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-50">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:flex">
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
            style={{padding:0,margin:"0px",}}
          />
          <h2 className="text-2xl font-bold tracking-tight">Dacatra</h2>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
