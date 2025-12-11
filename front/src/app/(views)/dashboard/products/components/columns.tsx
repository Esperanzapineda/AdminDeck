"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu"
import { axiosApiBack } from "@/services/utils"
import { Product } from "@/services/utils/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const ActionCell = ({ product }: { product: Product }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await axiosApiBack.delete(`/products/${product.id}`)
            toast.success("Producto archivado correctamente")
            router.refresh()
        } catch (error) {
            console.error("No se pudo archivar el producto", error)
            toast.error("No se pudo archivar el producto")
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                    Copiar ID
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/products/${product.id}/edit`}>
                        Editar Producto
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                    Archivar / Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'image',
        header: 'Imagen',
        cell: ({ row }) => {
            const image = row.original.image
            return (
                <div className="flex items-center justify-center">
                    {image ? (
                        <Image
                            src={image}
                            alt="Product Image"
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                        />
                    ) : (
                        <div className="h-[50px] w-[50px] bg-muted flex items-center justify-center rounded-md">
                            <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                Nombre
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue('name')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'brand',
        header: 'Marca',
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
            return (
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
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const price = row.original.price
            const amount = parseFloat(price)
            const formatted = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount)
            return <div className="font-medium"> {formatted} </div>
        },

    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
            const stock = row.original.stock
            return (
                <div>
                    {stock} uds.
                </div>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionCell product={row.original} />
    }
]

export { columns }