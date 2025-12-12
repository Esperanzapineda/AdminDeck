'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/services/dashboard.services";
import { DollarSign, Package, CreditCard, Users} from "lucide-react";

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
    <div >
      <div >
        <h2 >Panel Principal</h2>
      </div>

      <div>
        <Card>
          <CardHeader >
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

        <Card>
          <CardHeader>
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

        <Card>
          <CardHeader>
            <CardTitle>Órdenes</CardTitle>
            <CreditCard/>
          </CardHeader>
          <CardContent>
            <div>{stats.totalOrders}</div>
            <p>
              Pedidos registrados
            </p>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
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

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
            <CardDescription>
                {stats.recentSales?.length 
                    ? `Últimas ${stats.recentSales.length} transacciones registradas.` 
                    : "No hay transacciones recientes."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div >
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
          </CardContent>
        </Card>

      </div>
    </div>
  );
}