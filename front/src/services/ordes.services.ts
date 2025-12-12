import { axiosApiBack } from "@/services/utils";

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELED' | 'DELIVERED' | 'SENT';
export type PaymentStatus = 'PAID' | 'FAILED' | 'PENDING';

export interface Order {
    id: string;
    orderNumber: string;
    clientName: string;
    clientEmail: string;
    totalAmount: number | string; 
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
    items: {
        id: string;
        quantity: number;
        price: number;
        product: {
            name: string;
        }
    }[];
}

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await axiosApiBack.get('/orders');
    return data;
  } catch (error) {
    console.error("Error obteniendo las ordenes:", error);
    return [];
  }
};