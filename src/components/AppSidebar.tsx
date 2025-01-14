import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Settings,
  Package,
  DollarSign,
  Briefcase,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  Key,
  Percent,
  Tags,
  Award,
  Box,
  Truck,
  Users2,
  ShoppingCart,
  Receipt,
  Wallet,
  Cog
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Settings,
    label: "Configurações",
    href: "/settings",
    submenu: [
      { label: "Roles", href: "/settings/roles", icon: Shield },
      { label: "Permissions", href: "/settings/permissions", icon: Key },
      { label: "Usuários", href: "/settings/users", icon: Users },
    ],
  },
  {
    icon: Package,
    label: "Controle de Estoque",
    href: "/inventory",
    submenu: [
      { label: "Impostos", href: "/inventory/taxes", icon: Percent },
      { label: "Categorias", href: "/inventory/categories", icon: Tags },
      { label: "Marcas", href: "/inventory/brands", icon: Award },
      { label: "Produtos", href: "/inventory/products", icon: Box },
      { label: "Transportadoras", href: "/inventory/carriers", icon: Truck },
    ],
  },
  {
    icon: DollarSign,
    label: "Financeiro",
    href: "/financial",
    submenu: [
      { label: "Clientes", href: "/financial/customers", icon: Users2 },
      { label: "Vendas", href: "/financial/sales", icon: ShoppingCart },
      { label: "Nota Fiscal", href: "/financial/invoices", icon: Receipt },
      { label: "Caixa", href: "/financial/cashier", icon: Wallet },
    ],
  },
  {
    icon: Briefcase,
    label: "Operacional",
    href: "/operational",
    submenu: [
      { label: "Configuração", href: "/operational/settings", icon: Cog },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleMenuClick = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

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

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.href} className="space-y-1">
            {item.submenu ? (
              <button
                onClick={() => handleMenuClick(item.label)}
                className={cn(
                  "nav-link w-full",
                  expandedMenu === item.label && "bg-mint-50 text-mint-600"
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
              <Link to={item.href} className="nav-link">
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
                    className="nav-link pl-6"
                  >
                    <subItem.icon className="h-4 w-4" />
                    <span>{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button onClick={logout} className="nav-link w-full">
          <LogOut className="h-5 w-5" />
          <span className={cn("transition-opacity", collapsed ? "opacity-0 hidden" : "opacity-100")}>
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
}