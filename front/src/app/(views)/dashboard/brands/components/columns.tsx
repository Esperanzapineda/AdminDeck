'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Brand, brandsService } from "@/services/brands.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"

const ActionsCell = ({ brand }: { brand: Brand }) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await brandsService.delete(brand.id)
            toast.success("Marca eliminada")
            router.refresh()
        } catch (error) {
            console.error("Error eliminando la marca:", error)
            toast.error("No se puede eliminar. Verifica que no tenga productos.")
        }finally{
            setIsDeleting(false)
        }
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
        </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
                <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro de eliminar la marca?</AlertDialogTitle>
                      <AlertDialogDescription>
                          Esta acción es irreversible. Se eliminará permanentemente la marca 
                          <span className="font-bold text-foreground"> {brand.name}</span>.
                          Asegúrate de que no tenga productos asociados.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                      
                      <AlertDialogAction 
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-red-600 hover:bg-red-700" 
                      >
                          {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Eliminar Marca
                      </AlertDialogAction>
                  </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
        
    )
}

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Creación",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Eliminar",
    cell: ({ row }) => <ActionsCell brand={row.original} />,
  },
]