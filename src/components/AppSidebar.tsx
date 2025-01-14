import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, Package, DollarSign, Briefcase, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Settings, label: "Configurações", href: "/settings" },
    { icon: Package, label: "Controle de Estoque", href: "/inventory" },
    { icon: DollarSign, label: "Financeiro", href: "/financial" },
    { icon: Briefcase, label: "Operacional", href: "/operational" },
  ];

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className={cn("font-semibold transition-opacity", collapsed ? "opacity-0" : "opacity-100")}>
          Sistema
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="nav-link"
          >
            <item.icon className="h-5 w-5" />
            <span className={cn("transition-opacity", collapsed ? "opacity-0 hidden" : "opacity-100")}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="nav-link w-full">
          <LogOut className="h-5 w-5" />
          <span className={cn("transition-opacity", collapsed ? "opacity-0 hidden" : "opacity-100")}>
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
}