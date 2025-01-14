import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  Package,
  DollarSign,
  Briefcase,
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
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";
import { SidebarFooter } from "./sidebar/SidebarFooter";

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

  const handleMenuClick = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-gray-100 border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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