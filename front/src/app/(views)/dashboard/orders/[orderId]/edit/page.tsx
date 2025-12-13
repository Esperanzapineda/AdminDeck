import { notFound } from "next/navigation";
import OrderForm from "../../components/order-form";
import { getOrderById } from "@/services/ordes.service";

interface EditOrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function EditOrderPage({ params }: EditOrderPageProps) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  
  if (!order) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <OrderForm initialData={order} />
    </div>
  );
}