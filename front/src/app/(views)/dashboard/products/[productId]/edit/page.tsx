
import { notFound } from "next/navigation";
import EditProductForm from "../../components/edit-form";
import { getProductById } from "@/services/utils/product.service";

interface EditPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <EditProductForm product={product} />
    </div>
  );
}