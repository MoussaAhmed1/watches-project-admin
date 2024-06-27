import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import "@/styles/sideNav.module.css";

export default function Sidebar() {
  return (
    <nav
      className={cn(
        `hidden min-h-full overflow-auto overflow-x-hidden  pt-16 xl:block dark:bg-[#181D26]`,
      )}
    >
      <div className="space-y-2 py-1 side-nav">
        <div className="px-.5 py-.5 side-nav">
          <div className="space-y-1 max-w-[30vw] max-h-[90vh] overflow-y-auto overflow-x-hidden side-nav">
            
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
