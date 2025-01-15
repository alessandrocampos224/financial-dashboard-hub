import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function SidebarHeader({ collapsed, setCollapsed }: SidebarHeaderProps) {
  return (
    <div className="flex items-center h-16 px-4 border-b border-border">
      <h1 
        className={cn(
          "font-semibold transition-all duration-300 flex-1",
          collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
        )}
      >
        Sistema
      </h1>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gdrive-hover transition-colors",
          "flex items-center justify-center shrink-0"
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5 text-foreground" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-foreground" />
        )}
      </button>
    </div>
  );
}