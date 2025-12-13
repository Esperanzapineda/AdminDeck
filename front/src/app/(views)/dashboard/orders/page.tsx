
import { getAllOrders } from "@/services/ordes.service";
import TableProducts from "../products/components/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function OrdersPage() {
    const data = await getAllOrders();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Ordenes</h2>
                <Button asChild>
                    <Link href='/dashboard/orders/create'>
                    <Plus  className="mr-2 h-4 w-4" /> Nueva Orden
                    </Link>
                </Button>
            </div>
            <TableProducts 
                    columns={columns} 
                    data={data} 
                    searchKey="clientName" 
            />
        </div>
    )
}