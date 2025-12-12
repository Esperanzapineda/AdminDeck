import { axiosApiBack } from "@/services/utils";

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalExisteingStock: number;
    totalClients: number;
    
    recentSales: {
        id: string;
        name: string;
        email: string;
        amount: number;
    }[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const { data } = await axiosApiBack.get('/dashboard/stats');
    return data;
  } catch (error) {
    console.error("Error cargando estadísticas del dashboard", error);
    
    return {
        totalRevenue: 0, 
        totalOrders: 0,
        totalProducts: 0,
        totalExisteingStock: 0,
        totalClients: 0,
        recentSales: [], 
    };
  }
};