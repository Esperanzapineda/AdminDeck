'use client'

import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { axiosApiBack } from '@/services/utils'
import { Order } from '@/services/ordes.service'
import { OrderFormValues, orderFormSchema, ProductOption } from '../schemas/order.schema'
import { ClientInfo } from './form-sections/client-info'
import ProductAdded from './form-sections/product-added'
import ItemsTable from './form-sections/items-table'

interface OrderFormProps {
    initialData?: Order | null
}

export default function OrderForm({ initialData }: OrderFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<ProductOption[]>([])

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data } = await axiosApiBack.get<ProductOption[]>('/products')
                setProducts(data)
            } catch (error) {
                console.error(error)
                toast.error("Error cargando productos")
            }
        }
        loadProducts()
    }, [])

    const form = useForm({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            clientName: initialData?.clientName || '',
            clientEmail: initialData?.clientEmail || '',
            status: initialData?.status || 'PENDING',
            items: initialData?.items?.map((item) => ({
                productId: item.product?.id || '', 
                productName: item.product?.name || 'Producto Desconocido',
                quantity: Number(item.quantity),
                price: Number(item.price)
            })) || [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    })

    const isEditing = !!initialData;
    const itemsValues = form.watch("items")
    
    const totalAmount = (itemsValues || []).reduce((sum, item) => {
        return sum + (Number(item.price || 0) * Number(item.quantity || 0))
    }, 0)

    const handleAddProduct = (product: ProductOption) => {
        const exists = itemsValues.some(item => item.productId === product.id);
        if(exists) {
            toast.warning("El producto ya está en la lista");
            return;
        }

        const basePrice = Number(product.variants?.[0]?.price || 0);

        append({
            productId: product.id,
            productName: product.name,
            quantity: 1,
            price: basePrice
        })
    }

    async function onSubmit(data: OrderFormValues) {
        setIsLoading(true)
        console.log("Enviando data:", data);

        try {
            const payload = {
                clientName: data.clientName,
                clientEmail: data.clientEmail,
                status: data.status,
                items: data.items.map(item => ({
                    productId: item.productId,
                    quantity: Number(item.quantity),
                    price: Number(item.price)
                }))
            };

            if (initialData) {
                await axiosApiBack.patch(`/orders/${initialData.id}`, payload)
                toast.success("Orden actualizada correctamente")
            } else {
                await axiosApiBack.post('/orders', payload)
                toast.success("Orden creada exitosamente")
            }
            
            router.refresh()
            router.push('/dashboard/orders')
            
        } catch (error) {
            console.error("Error en submit:", error)
            toast.error("Error al guardar la orden. Revisa la consola.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Editar Orden" : "Nueva Orden"}
                </h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">                    
                    <ClientInfo />
                    <ProductAdded 
                        products={products} 
                        onAddProduct={handleAddProduct} 
                    />

                    <ItemsTable 
                        fields={fields} 
                        remove={remove} 
                        isEditing={isEditing} 
                    />

                    {form.formState.errors.items && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.items.message || "Debes agregar al menos un producto."}
                        </p>
                    )}

                    <div className="flex justify-end items-center gap-4 p-4 bg-muted/20 rounded-lg">
                        <span className="text-foreground">Total Orden:</span>
                        <div className="text-3xl font-bold">
                            ${totalAmount.toLocaleString('es-CO')}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button variant="outline" type="button" asChild className="hover:bg-foreground hover:text-background">
                            <Link href="/dashboard/orders">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                            </Link>
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" /> Guardar Orden
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}