import { axiosApiBack } from '@/services/utils'
import { Product, ProductApiResponse, ProductStatusEnum } from '@/services/utils/types'
import { columns } from './components/columns'
import TableProducts from './components/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

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
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
                    <p className="text-foreground">Total: ({data.length}) </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/products/create">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                    </Link>
                </Button>
            </div>
        
            <div>
                <TableProducts columns={columns} data={data} />
            </div>
        </div>
    )
}

export default ProductsPage
