import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
import { getAllCategories } from "@/services/categories.services";
import DataTable from "../products/components/data-table";

export default async function CategoriesPage() {
  const data = await getAllCategories();
  return (
    <div >
      <div >
        <h2 >Categorías</h2>
        <Button asChild>
            <Link href="/dashboard/categories/create">
                <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
            </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}