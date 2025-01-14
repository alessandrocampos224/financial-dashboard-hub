import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  const stats = [
    {
      title: "Contas a Receber",
      value: "R$ 24.500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Pedidos",
      value: "145",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />
      
      <main className="flex-1">
        <Header />
        
        <div className="p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title} className="p-6 hover-scale glass-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
                  </div>
                  <div className={cn(
                    "p-3 rounded-full",
                    stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                  )}>
                    <stat.icon className={cn(
                      "w-5 h-5",
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    )} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span className={cn(
                    "text-sm ml-1",
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}