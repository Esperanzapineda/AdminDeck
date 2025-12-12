import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService){}

    async getStats(){
        const totalOrdersPaid = await this.prisma.order.aggregate({
            _sum: {totalAmount: true},
            where:{
                paymentStatus: PaymentStatus.PAID,
                status: {not: OrderStatus.CANCELED}
            }
        });

        const totalOrders = await this.prisma.order.count();

        const totalProducts = await this.prisma.product.count({
            where: {
                status: 'ACTIVE'
            }
        });

        const totalExisteingStock = await this.prisma.productVariant.aggregate({
            _sum: {stock: true}
        })

        const totallClients = await this.prisma.user.count()

        const recentSales = await this.prisma.order.findMany({
            take: 3,
            orderBy: {createdAt: 'desc'},
            include: {
                user: {
                    select:{
                        name:true,
                        email: true
                    }
                }
            }
        });

        return {
            totalRenuene: Number(totalOrdersPaid._sum.totalAmount) || 0,
            totalOrders,
            totalProducts,
            totalExisteingStock: totalExisteingStock._sum.stock || 0,
            totallClients,
            recentSales: recentSales.map(order => ({
                id: order.id,
                name: order.user?.name,
                email: order.user?.email,
                amount: Number(order.totalAmount),
            }))
        }
    }
}
