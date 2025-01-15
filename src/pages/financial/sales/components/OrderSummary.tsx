import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Item } from "@/types/item";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderSummaryProps {
  items: Item[];
  updateQuantity: (itemId: string, increment: boolean) => void;
  removeItem: (itemId: string) => void;
  total: number;
  selectedCustomer: any;
  onSave: () => void;
}

export function OrderSummary({
  items,
  updateQuantity,
  removeItem,
  total,
  selectedCustomer,
  onSave,
}: OrderSummaryProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Qtd</TableHead>
              <TableHead>Valor Unit.</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product?.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, false)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {item.unitary?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {item.amount?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total do Pedido:</span>
            <span className="text-2xl font-bold">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              className="w-full"
              disabled={!selectedCustomer || items.length === 0}
              onClick={onSave}
            >
              Finalizar Venda
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}