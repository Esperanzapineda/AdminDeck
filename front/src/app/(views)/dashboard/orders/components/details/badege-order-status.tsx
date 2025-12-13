import { Badge } from '@/components/ui/badge'

interface OrderStatusBadgeProps {
    status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const styles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
        PAID: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
        SENT: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
        DELIVERED: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
        CANCELED: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
    }
    
    const labels: Record<string, string> = {
        PENDING: "Pendiente",
        PAID: "Pagada",
        SENT: "Enviada",
        DELIVERED: "Entregada",
        CANCELED: "Cancelada",
    }

    return (
        <Badge variant="outline" className={`${styles[status] || "bg-gray-100"} px-3 py-1`}>
            {labels[status] || status}
        </Badge>
    )
}