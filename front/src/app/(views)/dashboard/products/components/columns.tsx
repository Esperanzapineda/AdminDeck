"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Product } from "@/services/utils/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Package } from "lucide-react"
import Image from "next/image"

const columns : ColumnDef<Product>[] = [
    {
        accessorKey: 'image',
        header: 'Imagen',
        cell: ({row}) => {
            const image = row.original.image
            return(
                <div>
                    {image ? (
                        <Image
                            src={image}
                            alt="Product Image"
                            width={50}
                            height={50}
                        />
                    ): (
                        <div>
                            <Package/>
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column}) => (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                Nombre
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                <span>{row.getValue('name')}</span>
                <span>{row.original.brand}</span>
            </div>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Categoría',
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => {
            const status = row.original.status
            return(
                <Badge variant={status === 'ACTIVE' ? 'default' : "secondary"}>
                    {status === 'ACTIVE' ? 'Activo' : 'Archivado'}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                Precio Base
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({ row }) => {
            const price = row.original.price
            const amount = parseFloat(price)
            const formatted = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 2
            }).format(amount)
            return <div> {formatted} </div>
        },

    },
    {
        accessorKey: 'stock',
        header: 'Total en Stock',
        cell: ({ row }) => {
            const stock = row.original.stock
            return(
                <div>
                    {stock} unidades
                </div>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original
            return(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                            <span>Menú</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem> Editar Producto </DropdownMenuItem>
                        <DropdownMenuItem> Eliminar </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export {columns}
