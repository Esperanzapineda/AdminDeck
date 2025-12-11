'use client'

import { Form } from "@/components/ui/form"
import { axiosApiBack } from "@/services/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { ProductGeneralInfo } from "./product-info"
import { ProductVariants } from "./product-variant"

const variantSchema = z.object({
    optionName: z.string().min(1, 'ej: Talla'),
    optionValue: z.string().min(1, 'ej: XL'),
    price: z.coerce.number().positive('Debe ser mayor a 0'),
    stock: z.coerce.number().int().nonnegative('No puede ser negativo'),
})

const formSchema = z.object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    description: z.string().min(5, "Mínimo 5 caracteres"),
    gender: z.string().min(1, 'Seleccione género'),
    categoryId: z.string().uuid('Seleccione una categoría'),
    brandId: z.string().optional().or(z.literal('')), 
    newBrandName: z.string().optional(),
    imageFile: z.custom<File>((v) => v instanceof File, {
        message: 'Seleccione una imagen',
    }).optional(),
    variants: z.array(variantSchema).min(1, 'Agrega al menos una variante'),
})

export type ProductFormValues = z.infer<typeof formSchema>

interface BackVariant {
    id: string;
    optionName: string;
    optionValue: string;
    price: number | string; 
    stock: number;
}

interface BackProduct {
    id: string;
    name: string;
    description: string;
    gender: string;
    categoryId: string;
    brandId?: string | null; 
    variants: BackVariant[];
}

interface EditProductFormProps {
    product: BackProduct; 
}

const EditProductForm = ({ product }: EditProductFormProps) => {
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
                console.log("Error cargando datos", error)
                toast.error("Error cargando listas")
            } finally {
                setIsFetching(false)
            }
        }
        fetchData()
    }, [])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            gender: product.gender,
            categoryId: product.categoryId,
            brandId: product.brandId || '', 
            newBrandName: '',
            imageFile: undefined, 
            variants: product.variants?.map((v) => ({
                optionName: v.optionName,
                optionValue: v.optionValue,
                price: Number(v.price), 
                stock: Number(v.stock)
            })) || []
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
            
            if (data.newBrandName) {
                formData.append('newBrandName', data.newBrandName);
            } else if (data.brandId) {
                formData.append('brandId', data.brandId);
            }

            if (data.imageFile) {
                formData.append('file', data.imageFile);
            }

            formData.append('variants', JSON.stringify(data.variants));

            await axiosApiBack.patch(`/products/${product.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            
            toast.success("Producto actualizado correctamente")
            router.refresh()
            router.push('/dashboard/products')
            
        } catch (error) {
            console.error(error)
            toast.error("Error al actualizar el producto")
        } finally {
            setIsLoading(false)
        }
    }

    if(isFetching){
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8"/></div>
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Editar Producto</h2>
                </div>

                <ProductGeneralInfo categories={categories} brands={brands} />
                <ProductVariants />

                <div className="flex items-center justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/products">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Cancelar
                        </Link>
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Actualizar Cambios
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditProductForm