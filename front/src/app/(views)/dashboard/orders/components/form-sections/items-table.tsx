import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { OrderFormValues } from '../../schemas/order.schema'

interface ItemsTableProps {
    fields: { id: string; productName: string; price: number; quantity: number }[];
    remove: (index: number) => void;
    isEditing: boolean;
}

const ItemsTable = ({ fields, remove, isEditing }: ItemsTableProps) => {
    const { register, watch } = useFormContext<OrderFormValues>()

    return (
        <div className="border rounded-md bg-white">
            <Table className='bg-foreground'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-background'>Producto</TableHead>
                        <TableHead className="w-[120px] text-background">Cantidad</TableHead>
                        <TableHead className="w-[150px] text-background">Precio Unit.</TableHead>
                        <TableHead className="text-right text-background">Subtotal</TableHead>
                        {!isEditing && <TableHead className="w-[50px]"></TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-background">
                                El carrito está vacío.
                            </TableCell>
                        </TableRow>
                    )}
                    {fields.map((field, index) => {
                        const price = watch(`items.${index}.price`) || 0
                        const quantity = watch(`items.${index}.quantity`) || 0
                        const total = Number(price) * Number(quantity)

                        return (
                            <TableRow key={field.id}>
                                <TableCell className="font-medium">
                                    {watch(`items.${index}.productName`)}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        {...register(`items.${index}.quantity`)}
                                        className="h-8"
                                        min={1}
                                        disabled={isEditing}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        {...register(`items.${index}.price`)}
                                        className="h-8"
                                        disabled={isEditing}
                                    />
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    ${total.toLocaleString()}
                                </TableCell>
                                {!isEditing && (
                                    <TableCell>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
export default ItemsTable