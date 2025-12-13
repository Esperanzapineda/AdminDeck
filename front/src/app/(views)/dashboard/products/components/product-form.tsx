'use client'
import { Form } from "@/components/ui/form"
import { axiosApiBack } from "@/services/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { ProductGeneralInfo } from "./product-info"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProductVariants } from "./product-variant"

const variantSchema = z.object({
    optionName: z.string().min(1, 'ej: Talla'),
    optionValue: z.string().min(1, 'ej: XL'),
    price: z.coerce.number().positive('Debe ser mayor a 0'),
    stock: z.coerce.number().int().nonnegative('No puede ser negativo'),
})

const formSchema = z.object({
    name: z.string().min(2, 'Minimo 2 caracteres'),
    description: z.string().min(5, "Minimo 5 caracteres"),
    gender: z.string().min(1, 'seleccione genero'),
    categoryId: z.string().uuid('Seleccione una categoria'),
    brandId: z.string().optional().or(z.literal('')), 
    imageFile: z.custom<File>((v) => v instanceof File, {
        message: 'Seleccione una imagen del producto',
    }).optional(),

    variants: z.array(variantSchema).min(1, 'Agrega al menos una variante'),
})

export type ProductFormValues = z.infer<typeof formSchema>

const ProductForm = () => {
    const [isLoading , setIsLoading] = useState(false)
    const router = useRouter()

    const [categories, setCategories] = useState<{id: string, name:string}[]>([])
    const [brands, setBrands] = useState<{id: string, name: string}[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    axiosApiBack.get('/categories'),
                    axiosApiBack.get('/brands'), 
                ])
                setCategories(catRes.data)
                setBrands(brandRes.data)
            } catch (error) {
                console.log("Error cargando ..",error)
                toast.error("No se pudieron cargar las categorias y marcas")
            }finally{
                setIsFetching(false)
            }
        }
        fetchData()
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '', description: '', gender: '', categoryId: '', brandId: '',
            imageFile: undefined,
            variants: [{optionName: 'Talla', optionValue: '', price: 0, stock: 0}]
        },
    })

async function onSubmit(data: ProductFormValues){
    setIsLoading(true)
    try {
        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('gender', data.gender);
        formData.append('categoryId', data.categoryId);
        
        if (data.brandId) {
            formData.append('brandId', data.brandId);
        }

        if (data.imageFile) {
            formData.append('file', data.imageFile); 
        }

        formData.append('variants', JSON.stringify(data.variants));

        await axiosApiBack.post('/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        toast.success("Producto creado exitosamente")
        router.refresh()
        router.push('/dashboard/products')
    } catch (error) {
        console.error(error)
        // @ts-ignore
        const message = error.response?.data?.message || "Error creando el producto";
        toast.error(Array.isArray(message) ? message[0] : message)
    } finally {
        setIsLoading(false)
    }
}
    if(isFetching){
        return <div className="flex justify-center p-10"> <Loader2 className="animate-spin text-primary h-8 w-8"/></div>
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-10">
                <ProductGeneralInfo categories={categories} brands={brands} />
                
                <ProductVariants />

                <div className="flex items-center justify-end gap-4">
                    <Button variant="outline" asChild className="hover:bg-foreground hover:text-background">
                        <Link href="/dashboard/products">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Cancelar
                        </Link>
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Guardar Producto
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ProductForm