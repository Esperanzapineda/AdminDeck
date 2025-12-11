import { axiosApiBack } from '@/services/utils'
import { Product, ProductApiResponse, ProductStatusEnum } from '@/services/utils/types'
import { columns } from './components/columns'
import TableProducts from './components/data-table'

const getProducts = async () : Promise<Product[]> => {
    try {
        const {data} = await axiosApiBack.get<ProductApiResponse[]>('/products')
        return data.map((item) => {
            const totalStock = item.variants?.reduce((acc: number, variant) => acc + variant.stock, 0) || 0;
            const price = item.variants?.[0]?.price ? Number(item.variants[0].price)
            : 0
            return {
                id: item.id || '',
                name: item.name || 'Sin Nombre', 
                status: (item.status as ProductStatusEnum)|| 'ARCHIVED',
                price: price.toString(),
                stock: totalStock,
                category: item.category?.name || 'Sin categoría',
                brand: item.brand?.name || 'Sin marca',
                image: item.imageUrl || '',
                createAt: new Date(item.createdAt),
            }
        })
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return []
        
    }
}

const ProductsPage =  async () => {
    const data = await getProducts();
    return (
        <div>
            <div>
                <h2 >Productos</h2>
                {/* Boton crear Producto */}
            </div>
        
            <div>
                <TableProducts columns={columns} data={data} />
            </div>
        </div>
    )
}

export default ProductsPage
