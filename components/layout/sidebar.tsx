import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";


export default function Sidebar() {
  return (
    <nav
      className={cn(
        `hidden min-h-full overflow-auto overflow-x-hidden  pt-16 xl:block dark:bg-[#181D26]`,
      )}
    >
      <div className="space-y-4 py-1">
        <div className="px-1 py-.5 ">
          <div className="space-y-1 max-w-[30vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
            
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
