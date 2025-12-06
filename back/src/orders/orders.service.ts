import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor (private prisma:PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;
    // Calcular el total de la orden
    //Recorremos el array de items sumando precio * cantidad
    const totalAmount = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    return this.prisma.order.create({
      data: {
        ...orderData,
        totalAmount: totalAmount,
        orderNumber: `ORD-${Date.now()}`, // Generar un número de orden simple
        status: OrderStatus.PENDING,
        //Creamos los items dentro de la misma creacion de la orden
        items:{
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      // Retornar la orden creada junto con sus items
      include:{
        items:true,
      }
    })
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: { product: true }, //para ver que productos se copmraron en cada item 
        },
      },
        orderBy: {createdAt: 'desc'}
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        }
      }
    });
  }

}
