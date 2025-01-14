import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const { logout } = useAuth();

  return (
    <div className="p-4 border-t border-gray-200">
      <button onClick={logout} className="nav-link w-full">
        <LogOut className="h-5 w-5" />
        <span className={cn("transition-opacity", collapsed ? "opacity-0 hidden" : "opacity-100")}>
          Sair
        </span>
      </button>
    </div>
  );
}