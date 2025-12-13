'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { brandsService } from "@/services/brands.service"
import { BrandFormValues, brandSchema } from "../schema/brand.schema"

export const BrandForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (data: BrandFormValues) => {
    try {
      setLoading(true)
      await brandsService.create(data)
      toast.success("Marca creada correctamente")
      router.refresh()
      router.push(`/dashboard/brands`)
    } catch (error) {
      console.error(error)
      toast.error("Error al crear la marca")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Nueva Marca</h2>
            <p className="text-foreground">Añadir una nueva marca al sistema</p>
        </div>
      </div>
      <Separator className="my-4" />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Ej: Adidas, Nike..." {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild disabled={loading} className="hover:bg-muted">
                <Link href="/dashboard/brands">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Cancelar
                </Link>
            </Button>
            <Button disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" /> Crear Marca
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}