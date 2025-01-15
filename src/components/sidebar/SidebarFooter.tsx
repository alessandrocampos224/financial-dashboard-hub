import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // O redirecionamento será feito pelo AuthContext após o logout bem-sucedido
    } catch (error) {
      console.error("Erro durante logout:", error);
      // Mesmo se houver erro, vamos limpar o estado local
      window.location.href = "/login";
      toast.error("Erro ao fazer logout. Por favor, tente novamente.");
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <button onClick={handleLogout} className="nav-link w-full flex items-center gap-2">
        <LogOut className="h-5 w-5" />
        <span className={cn("transition-opacity", collapsed ? "opacity-0 hidden" : "opacity-100")}>
          Sair
        </span>
      </button>
    </div>
  );
}