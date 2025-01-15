import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis 
} from "recharts";
import { DollarSign, Receipt, ShoppingCart, TrendingUp } from "lucide-react";

const salesData = [
  { month: "Jan", total: 4500 },
  { month: "Fev", total: 6200 },
  { month: "Mar", total: 7800 },
  { month: "Abr", total: 5400 },
  { month: "Mai", total: 8900 },
  { month: "Jun", total: 9100 },
];

const invoicesData = [
  { name: "Seg", total: 12 },
  { name: "Ter", total: 8 },
  { name: "Qua", total: 15 },
  { name: "Qui", total: 10 },
  { name: "Sex", total: 18 },
];

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-6">
      <Card className="dark:bg-gdrive-surface">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 45.231,89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card className="dark:bg-gdrive-surface">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            +12% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card className="dark:bg-gdrive-surface">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notas Fiscais</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">489</div>
          <p className="text-xs text-muted-foreground">
            +8% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card className="dark:bg-gdrive-surface">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">32.8%</div>
          <p className="text-xs text-muted-foreground">
            +4.3% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-2 dark:bg-gdrive-surface">
        <CardHeader>
          <CardTitle>Vendas Mensais</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[240px]" config={{}}>
            <AreaChart data={salesData}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `R$${value}`} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.2}
              />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2 dark:bg-gdrive-surface">
        <CardHeader>
          <CardTitle>Notas Fiscais Emitidas (Última Semana)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[240px]" config={{}}>
            <BarChart data={invoicesData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Bar
                dataKey="total"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}