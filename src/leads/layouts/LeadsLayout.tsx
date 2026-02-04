import { Link, Outlet, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", to: "/leads" },
  { label: "Kanban", to: "/leads/kanban" },
  { label: "Activity", to: "/leads/activity" },
];

export const LeadsLayout = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <img
            src="/leadflow.png"
            alt="LeadFlow Logo"
            className="h-8 w-8 rounded-sm"
          />
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                LeadFlow
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Accelerate every opportunity
            </p>
          </div>
          <div className="ml-auto flex w-full flex-1 justify-end md:w-auto">
            <div className="">
              <NavigationMenu className="w-full">
                <NavigationMenuList className="gap-2">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.to}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out",
                          isActive(item.to) ? "ring-1" : "text-slate-700 ",
                        )}
                      >
                        <Link to={item.to}>{item.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
