import { axiosApiBack } from "@/services/utils";
import { log } from "console";

export interface DashboardStats {
    totalRenuene: number;
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
    console.log("Dashboard stats loaded:", data.totalClients);
    console.log("total ventas", data.totalRenuene);
    console.log(data.recentSales);
    
    
    return data;
  } catch (error) {
    console.error("Error cargando estadísticas del dashboard", error);
    
    return {
        totalRenuene: 0, 
        totalOrders: 0,
        totalProducts: 0,
        totalExisteingStock: 0,
        totalClients: 0,
        recentSales: [], 
    };
  }
};