'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/services/dashboard.service";
import { DollarSign, Package, Users, PanelBottomDashed, Database} from "lucide-react";

interface DashboardViewProps {
    stats: DashboardStats;
}

export default function DashboardView({ stats }: DashboardViewProps) {
  
  const formatCurrency = (value: number | string | undefined) => {
    const totalValue = Number(value) || 0;
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(totalValue);
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Panel Principal</h2>
      </div>
      <div className="text-sm flex justify-around font-bold">
        <Card className="w-80 mt-10">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle >Ingresos Totales</CardTitle>
            <DollarSign />
          </CardHeader>
          <CardContent>
            <div>{formatCurrency(stats.totalRevenue)}</div>
            <p>
              Total facturado
            </p>
          </CardContent>
        </Card>

        <Card className="w-80 mt-10">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Inventario</CardTitle> 
            <Package/>
          </CardHeader>
          <CardContent>
            <div>{stats.totalProducts}</div>
            <p>
              Productos activos ({stats.totalExisteingStock} en stock)
            </p>
          </CardContent>
        </Card>

        <Card className="w-80 mt-10">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Órdenes</CardTitle>
            <PanelBottomDashed/>
          </CardHeader>
          <CardContent>
            <div>{stats.totalOrders}</div>
            <p>
              Pedidos registrados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex gap-4">
        <Card className="w-1/2 h-60">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Ventas Recientes</CardTitle>
            <Database/>
          </CardHeader>
          <CardContent>
            <div>
                {(!stats.recentSales || stats.recentSales.length === 0) && (
                    <div>
                      Aún no se han registrado ventas en el sistema.
                    </div>
                )}
                {stats.recentSales?.map((sale) => (
                    <div key={sale.id} >
                        <div>
                            <p>{sale.name}</p>
                            <p>{sale.email}</p>
                        </div>
                        <div>+{formatCurrency(sale.amount)}</div>
                    </div>
                ))}
            </div>
            <CardDescription className="text-background mt-8">
                {stats.recentSales?.length 
                    ? `Últimas ${stats.recentSales.length} transacciones registradas.` 
                    : "No hay transacciones recientes."}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="w-1/2 h-60">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Clientes</CardTitle>
            <Users/>
          </CardHeader>
          <CardContent>
            <div>{stats.totalClients}</div>
            <p>
              Usuarios registrados
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}