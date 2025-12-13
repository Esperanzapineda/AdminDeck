import Link from 'next/link'
import { ArrowLeft, Edit, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Order } from '@/services/ordes.service'
import { OrderStatusBadge } from './badege-order-status';

interface OrderHeaderProps {
    order: Order;
}

export function OrderHeader({ order }: OrderHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild className="-ml-2">
                        <Link href="/dashboard/orders">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Orden #{order.id.slice(0, 8)}...
                    </h2>
                    <OrderStatusBadge status={order.status} />
                </div>
                <p className="text-muted-foreground ml-10 text-sm">
                    Creada el {new Date().toLocaleDateString()} 
                </p>
            </div>
            
            <div className="flex gap-2 ml-10 md:ml-0">
                <Button variant="outline" onClick={() => window.print()} className='hover:bg-foreground hover:text-background'>
                    <Printer className="mr-2 h-4 w-4" /> Imprimir
                </Button>
                <Button asChild>
                    <Link href={`/dashboard/orders/${order.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Editar Orden
                    </Link>
                </Button>
            </div>
        </div>
    )
}