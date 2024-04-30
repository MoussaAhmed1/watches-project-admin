import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";


export default function Sidebar() {
  return (
    <nav
      className={cn(
        `hidden h-full overflow-auto overflow-x-hidden border-r pt-16 xl:block dark:bg-[#181D26]`,
      )}
    >
      <div className="space-y-4 py-1">
        <div className="px-3 py-.5 ">
          <div className="space-y-1">
            
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
