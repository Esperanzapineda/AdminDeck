import { axiosApiBack } from "@/services/utils";
import { isAxiosError } from "axios";


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
            id: string;
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

export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const {data} = await axiosApiBack.get(`/orders/${id}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response?.status === 404) {
            console.error(`Orden con id ${id} no encontrada.`);
        }
        console.error(`Error obteniendo la orden con id ${id}:`, error);
        return null;
    }
}

export const createOrder = async (orderData: Partial<Order>): Promise<Order | null> => {
    try {
        const { data } = await axiosApiBack.post('/orders', orderData);
        return data;
    } catch (error) {
        console.error("Error creando la orden:", error);
        return null;
    }
}

export const updateOrder = async (id: string, orderData: Partial<Order>): Promise<Order | null> => {
    try {
        const { data } = await axiosApiBack.put(`/orders/${id}`, orderData);
        return data;
    } catch (error) {
        console.error(`Error actualizando la orden con id ${id}:`, error);
        return null;
    }
}