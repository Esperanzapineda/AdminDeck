"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Order, OrderStatus } from "@/services/ordes.services"

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(Number(amount));
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
}

const statusMap: Record<OrderStatus, { label: string, color: string }> = {
    PENDING: { label: "Pendiente", color: "bg-yellow-500 hover:bg-yellow-600" },
    PAID: { label: "Pagada", color: "bg-green-500 hover:bg-green-600" },
    SENT: { label: "Enviada", color: "bg-blue-500 hover:bg-blue-600" },
    DELIVERED: { label: "Entregada", color: "bg-emerald-600 hover:bg-emerald-700" },
    CANCELED: { label: "Cancelada", color: "bg-red-500 hover:bg-red-600" },
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "N° Orden",
    cell: ({ row }) => <span>#{row.original.orderNumber}</span>
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
    cell: ({ row }) => (
        <div>
            <span>{row.original.clientName}</span>
            <span>{row.original.clientEmail}</span>
        </div>
    )
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
        const status = row.original.status;
        const config = statusMap[status] || { label: status, color: "bg-gray-500" };
        
        return <Badge className={config.color}>{config.label}</Badge>
    }
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown/>
          </Button>
        )
      },
    cell: ({ row }) => <div className="font-medium">{formatCurrency(row.original.totalAmount)}</div>
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => <div >{row.original.items?.length || 0} prod.</div>
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderNumber)}>
              Copiar N° Orden
            </DropdownMenuItem>
            
            <DropdownMenuItem disabled>
                <Eye/> Ver Detalle
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]