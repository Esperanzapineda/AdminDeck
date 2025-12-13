import { CreditCard, Mail, Target, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/services/ordes.service'

interface OrderInfoCardsProps {
    order: Order;
}

export function OrderInfoCards({ order }: OrderInfoCardsProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <User className="h-4 w-4 text-background" />
                        Cliente
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-background">Nombre</span>
                        <span className="text-base font-medium">{order.clientName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-background ">Correo</span>
                        <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-background" />
                            <span className="text-sm hover:underline cursor-pointer">
                                {order.clientEmail}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-background" />
                        Datos de Pago
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-background">Método:</span>
                        <span>Efectivo / Transferencia</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-background">Estado:</span>
                        <span className="font-medium">
                            {order.status === 'PAID' ? 'Pagado' : order.status === 'CANCELED' ? 'Rechazada' : order.status === 'DELIVERED' ? 'Pagado' : 'Pendiente'}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}