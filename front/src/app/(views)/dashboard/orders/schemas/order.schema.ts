import z from 'zod'

export const orderItemSchema = z.object({
    productId: z.string().min(1, "Selecciona un producto"),
    productName: z.string(),
    quantity: z.coerce.number().min(1, "Mínimo 1"),
    price: z.coerce.number().min(0),
})

export const orderFormSchema = z.object({
    clientName: z.string().min(2, "Nombre requerido"),
    clientEmail: z.string().email("Correo inválido"),
    status: z.enum(['PENDING', 'PAID', 'SENT', 'DELIVERED', 'CANCELED']),
    items: z.array(orderItemSchema).min(1, "Agrega al menos un producto a la orden"),
})

export type OrderFormValues = z.infer<typeof orderFormSchema>

export interface ProductOption {
    id: string;
    name: string;
    variants: { price: number | string }[];
}