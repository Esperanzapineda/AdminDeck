
import { getAllOrders } from "@/services/ordes.services";
import TableProducts from "../products/components/data-table";
import { columns } from "./components/columns";

export default async function OrdersPage() {
  const data = await getAllOrders();

  return (
    <div>
      
      <TableProducts 
          columns={columns} 
          data={data} 
          searchKey="clientName" 
      />
    </div>
  )
}