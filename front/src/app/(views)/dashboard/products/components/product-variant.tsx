"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { ProductFormValues } from "./product-form"

export function ProductVariants() {
  const { control } = useFormContext<ProductFormValues>()
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Variantes y Precios</CardTitle>
        <Button 
          type="button" 
          variant="secondary" 
          size="sm"
          onClick={() => append({ optionName: "Talla", optionValue: "", price: 0, stock: 0 })}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Variante
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative grid gap-4 border p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
            <div className="absolute -top-3 left-4">
                <Badge variant="outline" className="bg-background">Variante {index + 1}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <FormField
                  control={control}
                  name={`variants.${index}.optionName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Tipo (Ej: Talla)</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3">
                <FormField
                  control={control}
                  name={`variants.${index}.optionValue`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Valor (Ej: XL)</FormLabel>
                      <FormControl><Input placeholder="XL, Rojo..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3">
                <FormField
                  control={control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Precio (COP)</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3 flex items-end gap-2">
                <FormField
                  control={control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">Stock</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {fields.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="mb-0.5 text-red-500 hover:text-red-600 hover:bg-red-100/50"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        <p className="text-sm text-red-500 font-medium">
            {control._formState.errors.variants?.root?.message}
        </p>
      </CardContent>
    </Card>
  )
}