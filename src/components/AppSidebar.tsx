import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { menuItems } from "./sidebar/menuItems";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleMenuClick = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-background border-r border-border transition-all duration-300",
        "fixed md:relative -translate-x-full md:translate-x-0 z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-custom">
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            expandedMenu={expandedMenu}
            handleMenuClick={handleMenuClick}
          />
        ))}
      </nav>

      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}