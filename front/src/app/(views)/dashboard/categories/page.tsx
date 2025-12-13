import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
import { getAllCategories } from "@/services/categories.service";
import DataTable from "../products/components/data-table";
import { Separator } from "@/components/ui/separator";

export default async function CategoriesPage() {
  const data = await getAllCategories();
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Categorías</h2>
      <Button asChild>
        <Link href="/dashboard/categories/create">
        <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
        </Link>
      </Button>
      </div>
      <Separator/>

      <DataTable columns={columns} data={data} />

    </div>
  );
}