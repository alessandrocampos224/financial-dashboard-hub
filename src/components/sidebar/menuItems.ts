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
  Cog,
  CreditCard
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
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
      { label: "Usuários", href: "/settings/users", icon: Users },
      { label: "Perfis", href: "/settings/roles", icon: Shield },
      { label: "Permissões", href: "/settings/permissions", icon: Key },
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
      { label: "Pagamentos", href: "/financial/payments", icon: CreditCard },
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

export type { MenuItem, SubMenuItem };