'use client'

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { columns } from "./components/columns"
import { brandsService, Brand } from "@/services/brands.service"
import DataTable from "../products/components/data-table"

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBrands = async () => {
        try {
            const data = await brandsService.getAll()
            setBrands(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    loadBrands()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Marcas</h2>
            <p className="text-foreground">Total: ({brands.length})</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/brands/create">
                <Plus className="mr-2 h-4 w-4" /> Nueva Marca
            </Link>
        </Button>
      </div>
      <Separator />
      
      <DataTable 
        searchKey="name" 
        columns={columns} 
        data={brands} 
      />
    </div>
  )
}