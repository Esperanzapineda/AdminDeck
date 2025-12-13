import { axiosApiBack } from "@/services/utils";

export interface Brand {
    id: string;
    name: string;
    createdAt: string;
}

export const brandsService = {
    getAll: async () => {
        const { data } = await axiosApiBack.get<Brand[]>('/brands');
        return data;
    },
    create: async (payload: { name: string }) => {
        const { data } = await axiosApiBack.post('/brands', payload);
        return data;
    },
    delete: async (id: string) => {
        const { data } = await axiosApiBack.delete(`/brands/${id}`);
        return data;
    }
};