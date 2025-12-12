'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { axiosApiBack } from '@/services/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z.object({
    name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
    position: z.coerce.number().int().optional(),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface Category {
    id: string,
    name: string
    position?: number,
}
interface CategoryFormProps {
    categoryDataInitial?: Category
}
const CategoryForm = ({categoryDataInitial}: CategoryFormProps) => {
    const router = useRouter()
    const [isLoading , setIsLoading ] = useState(false)
    
    const title = categoryDataInitial ? "'Editar Categoría" : "Crear Categoría"
    const action = categoryDataInitial ? "Actualizar" : "Crear"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: categoryDataInitial ? categoryDataInitial.name : '',
            position: categoryDataInitial?.position ?? 0,
        },
    })

    async function onSubmit(data: CategoryFormValues) {
        setIsLoading(true)
        try {
            if(categoryDataInitial){
                await axiosApiBack.patch(`/categories/${categoryDataInitial.id}`, data)
                toast.success('Categoría actualizada')
            }else {
                await axiosApiBack.post('/categories', data)
                toast.success('Categoría creada correctamente')
            }
            router.refresh()
            router.push('/dashboard/categories')

        } catch (error) {
            console.error('Error al guardar la categoría:', error)
            toast.error('Error al guardar la categoría')
        } finally {
            setIsLoading(false)
        }
    }
    
  return (
    <div> 
        <div>
            <h2>{title}</h2>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name= 'name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder='Ej: Zapatos' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name= 'position'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Posisción</FormLabel>
                            <FormControl>
                                <Input type='number' 
                                    placeholder='0' {...field}
                                    value={field.value as number} 
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormDescription>Orden de aparicion(opcional)</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />     
                <div>
                    <Button asChild>
                        <Link href='/dashboard/categories'>
                            <ArrowLeft /> Cancelar
                        </Link>
                    </Button>

                    <Button type='submit'>
                        {isLoading && <Loader2 className='animate-spin'/>}
                        <Save/> {action}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default CategoryForm