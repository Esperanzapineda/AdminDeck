"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductFormValues } from "./product-form"
import { Textarea } from "@/components/ui/textarea"
import { ArrowBigUp } from "lucide-react"

interface GeneralInfoProps {
    categories: { id: string; name: string }[]
    brands: { id: string; name: string }[]
}

export function ProductGeneralInfo({ categories, brands }: GeneralInfoProps) {
    const { control } = useFormContext<ProductFormValues>()

  return (
    <Card>
        <CardHeader>
            <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
        
        <FormField
            control={control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nombre del Producto <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                    <Input  {...field} 
                    className="border border-background text-background"
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={control}
            name="imageFile"
            render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                    <FormLabel>Imagen del producto<span className="text-red-500">*</span></FormLabel>
                    <ArrowBigUp/>
                    <FormControl>
                        <Input
                            {...fieldProps}
                            type="file"
                            accept="image/*" 
                            onChange={(event) => {
                                onChange(event.target.files && event.target.files[0]);
                            }}
                            className="border border-background"
                            
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={control}
                name="categoryId"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Categoría <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="border border-background">
                            <SelectValue 
                            placeholder="Seleccionar" 
                            />
                        </SelectTrigger>
                            </FormControl>
                    <SelectContent className="bg-background text-foreground">
                        {categories.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                    </SelectContent>
                    </Select>
                    <FormMessage/>
                </FormItem>
                )}
            />

            <FormField
                control={control}
                name="brandId"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                        <SelectTrigger className="border border-background">
                            <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background text-foreground">
                        {brands.map((b) => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <FormField
            control={control}
            name="gender"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Género <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="border border-background">
                            <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                        </FormControl>
                    <SelectContent  className="bg-background text-foreground">
                    <SelectItem value="Hombre">Hombre</SelectItem>
                    <SelectItem value="Mujer">Mujer</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                    <SelectItem value="Niño">Niño</SelectItem>
                    <SelectItem value="Niña">Niña</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Descripción <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                    <Textarea className="resize-none border border-background" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </CardContent>
        </Card>
    )
}