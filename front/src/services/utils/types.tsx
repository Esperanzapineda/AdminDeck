export enum ProductStatusEnum {
    Active= 'ACTIVE',
    ARCHIVED = 'ARCHIVED'
}


export type Product = {
    id: string;
    name: string;
    status: ProductStatusEnum;
    price: string;
    stock: number;
    category: string;
    brand: string;
    image: string | null;
    createAt: Date;
}

export interface ProductApiResponse {
    id: string
    name: string
    status: 'ACTIVE' | 'ARCHIVED' | string 
    imageUrl?: string
    createdAt: string
    category?: { name: string }
    brand?: { name: string }
    variants?: {
        stock: number
        price: string | number
    }[]
}