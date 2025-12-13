"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { axiosApiBack } from "@/services/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"

export type Category = {
  id: string
  name: string
  position: number
}

const CategoryCellAction = ({ category }: { category: Category }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
        await axiosApiBack.delete(`/categories/${category.id}`)
        toast.success("Categoría eliminada/archivada")
        router.refresh()
    } catch (error) {
        console.error(error)
        toast.error("Error al eliminar (¿Quizás tiene productos?)")
    }
  }

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
        
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id)}>
          Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
            <Link href={`/dashboard/categories/${category.id}/edit`} className="w-full cursor-pointer">
                Editar
            </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
            onClick={handleDelete} 
            className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Category>[] = [
{
    accessorKey: "position",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Posición
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },

  },

  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryCellAction category={row.original} />,
  },
]