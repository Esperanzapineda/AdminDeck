"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Eye, Clipboard, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Order, OrderStatus } from "@/services/ordes.service"
import Link from "next/link" 

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(amount));
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
        day: "2-digit", 
        month: "short", 
        year: "numeric", 
    }); 
}

const statusMap: Record<OrderStatus, { label: string, color: string }> = {
    PENDING: { label: "Pendiente", color: "bg-yellow-300 hover:bg-yellow-600 border-yellow-600" },
    PAID: { label: "Pagada", color: "bg-green-500 hover:bg-green-600 border-green-600" },
    SENT: { label: "Enviada", color: "bg-blue-500 hover:bg-blue-600 border-blue-600" },
    DELIVERED: { label: "Entregada", color: "bg-emerald-600 hover:bg-emerald-700 border-emerald-600" },
    CANCELED: { label: "Cancelada", color: "bg-red-400 hover:bg-red-600 border-red-600" },
}

const ActionCell = ({ order }: { order: Order }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-foreground text-background">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderNumber)}>
                    <Clipboard className="mr-2 h-4 w-4" /> Copiar N° Orden
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/orders/${order.id}`} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> Ver Detalle
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/orders/${order.id}/edit`} className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" /> Editar Orden
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderNumber",
        header: "N° Orden",
        cell: ({ row }) => <span className="font-mono font-medium">#{row.original.orderNumber}</span>
    },
    {
        accessorKey: "clientName",
        header: "Cliente",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.clientName}</span>
                <span className="text-xs text-foreground">{row.original.clientEmail}</span>
            </div>
        )
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.original.status;
            const config = statusMap[status] || { label: status, color: "bg-gray-500" };
            
            return <Badge className={`${config.color} text-white`}>{config.label}</Badge>
        }
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className=""
            >
                Total
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({ row }) => <div className="font-bold">{formatCurrency(row.original.totalAmount)}</div>
    },
    {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => (
            <div className="text-center w-10  dark:bg-slate-800 rounded-md py-1">
                {row.original.items?.length || 0}
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Fecha",
        cell: ({ row }) => <div className="text-sm text-foreground">{formatDate(row.original.createdAt)}</div>
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionCell order={row.original} />,
    },
]