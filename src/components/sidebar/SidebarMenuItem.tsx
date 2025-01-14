import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface MenuItemProps {
  item: {
    icon: LucideIcon;
    label: string;
    href: string;
    submenu?: SubMenuItem[];
  };
  collapsed: boolean;
  expandedMenu: string | null;
  handleMenuClick: (label: string) => void;
}

export function SidebarMenuItem({ item, collapsed, expandedMenu, handleMenuClick }: MenuItemProps) {
  return (
    <div className="space-y-1">
      {item.submenu ? (
        <button
          onClick={() => handleMenuClick(item.label)}
          className={cn(
            "nav-link w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
            "hover:bg-mint-50 hover:text-mint-600 dark:hover:bg-mint-900/10 dark:hover:text-mint-400",
            expandedMenu === item.label && "bg-mint-50 text-mint-600 dark:bg-mint-900/10 dark:text-mint-400"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className={cn("flex-1 text-left", collapsed ? "hidden" : "block")}>
            {item.label}
          </span>
          {!collapsed && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedMenu === item.label && "rotate-90"
              )}
            />
          )}
        </button>
      ) : (
        <Link 
          to={item.href} 
          className={cn(
            "nav-link flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
            "hover:bg-mint-50 hover:text-mint-600 dark:hover:bg-mint-900/10 dark:hover:text-mint-400"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className={cn("flex-1", collapsed ? "hidden" : "block")}>
            {item.label}
          </span>
        </Link>
      )}

      {item.submenu && expandedMenu === item.label && !collapsed && (
        <div className="ml-6 space-y-1">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.href}
              to={subItem.href}
              className={cn(
                "nav-link flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-mint-50 hover:text-mint-600 dark:hover:bg-mint-900/10 dark:hover:text-mint-400"
              )}
            >
              <subItem.icon className="h-4 w-4" />
              <span>{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}