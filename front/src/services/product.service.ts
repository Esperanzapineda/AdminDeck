export const getProductById = async (id: string) => {
  try {
    const baseUrl = 'http://localhost:3002';     
    const res = await fetch(`${baseUrl}/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error obteniendo el producto:", error);
    return null;
  }
};