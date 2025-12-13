import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { OrderFormValues } from '../../schemas/order.schema'

export function ClientInfo() {
    const { control } = useFormContext<OrderFormValues>()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="clientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre Cliente</FormLabel>
                            <FormControl>
                                <Input {...field} className='border border-background text-background'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="clientEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                                <Input {...field} className='border border-background text-background'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado del Pedido</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl>
                                    <SelectTrigger className='border border-background text-background'>
                                    <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-background text-foreground">
                                    <SelectItem value="PENDING">Pendiente</SelectItem>
                                    <SelectItem value="PAID">Pagada</SelectItem>
                                    <SelectItem value="SENT">Enviada</SelectItem>
                                    <SelectItem value="DELIVERED">Entregada</SelectItem>
                                    <SelectItem value="CANCELED">Cancelada</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}