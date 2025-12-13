'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { axiosApiBack } from '@/services/utils'
import { Order } from '@/services/ordes.service'
import { OrderHeader } from '../components/details/order-header'
import { OrderProducts } from '../components/details/order-product'
import { OrderInfoCards } from '../components/details/order-info'

export default function OrderDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            if (!params.orderId) return
            try {
                const { data } = await axiosApiBack.get<Order>(`/orders/${params.orderId}`)
                setOrder(data)
            } catch (error) {
                console.error(error)
                toast.error("No se pudo cargar la orden")
                router.push('/dashboard/orders')
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrder()
    }, [params.orderId, router])


    if (!order) return null

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <OrderHeader order={order} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <OrderProducts items={order.items} />
                </div>
                <div className="space-y-6">
                    <OrderInfoCards order={order} />
                </div>
            </div>
        </div>
    )
}