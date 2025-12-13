import ProductForm from "../components/product-form";

export default function CreateProductPage() {
  return (
    <div className="flex-1 p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Nuevo Producto</h2>
        <p className="text-foreground">
          Completa la información del producto y define sus variantes.
        </p>
      </div>
      <ProductForm />
    </div>
  )
}