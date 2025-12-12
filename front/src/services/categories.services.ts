import { axiosApiBack } from "@/services/utils"; 

export const getAllCategories = async () => {
  try {
    const { data } = await axiosApiBack.get('/categories');
    
    return data;
  } catch (error) {
    console.error("Error obteniendo las categorías:", error);
    return [];
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await axiosApiBack.get(`/categories/${id}`);
    return data;
  } catch (error) {
    console.error("Error obteniendo las categoría por Id:", error);
    return null;
  }
};