import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ProductOption } from '../../schemas/order.schema'

interface ProductAdderProps {
    products: ProductOption[];
    onAddProduct: (product: ProductOption) => void;
}
const  ProductAdded = ({ products, onAddProduct }: ProductAdderProps) => {
    const [selectedProduct, setSelectedProduct] = useState<string>('')

    const handleAddItem = () => {
        const product = products.find(p => p.id === selectedProduct)
        if (!product) return
        onAddProduct(product)
        setSelectedProduct('')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Agregar Productos al Carrito</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger className='border border-background'>
                            <SelectValue placeholder="Buscar en inventario..." className='bg-foreground'/>
                        </SelectTrigger>
                        <SelectContent className="bg-background text-foreground">
                            {products.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                    {p.name} - ${Number(p.variants?.[0]?.price || 0).toLocaleString()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="button" onClick={handleAddItem} disabled={!selectedProduct} 
                    className='bg-background text-foreground hover:bg-foreground hover:text-background hover:border hover:border-background'
                >
                    <Plus className="mr-2 h-4 w-4" /> Agregar
                </Button>
            </CardContent>
        </Card>
    )
}

export default ProductAdded