import { Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order } from '@/services/ordes.service'

interface OrderProductsProps {
    items: Order['items'];
}

export function OrderProducts({ items }: OrderProductsProps) {
    const safeItems = items || []
    
    const totalAmount = safeItems.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity))
    }, 0)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-background" />
                    Productos
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-center">Cant.</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {safeItems.map((item) => (
                            <TableRow key={item.id || Math.random()}>
                                <TableCell className="font-medium">
                                    {item.product?.name || "Producto Eliminado"}
                                </TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">${Number(item.price).toLocaleString()}</TableCell>
                                <TableCell className="text-right font-bold">
                                    ${(Number(item.price) * item.quantity).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                <div className="p-6 bg-muted/10 flex flex-col items-end gap-2">
                    <div className="flex justify-between w-full max-w-xs text-sm">
                        <span className="text-background">Subtotal:</span>
                        <span>${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs text-sm">
                        <span className="text-background">Impuestos (0%):</span>
                        <span>$0.00</span>
                    </div>
                    <Separator className="my-2 w-full max-w-xs" />
                    <div className="flex justify-between w-full max-w-xs text-lg font-bold">
                        <span>Total:</span>
                        <span>${totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}