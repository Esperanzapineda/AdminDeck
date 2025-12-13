import { Boxes, Home, Shapes, ShoppingCart } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import Link from 'next/link'
import { Separator } from '../ui/separator'

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Categorias",
    url: "/dashboard/categories",
    icon: Shapes,
  },
  {
    title: "Marcas",
    url: "/dashboard/brands",
    icon: Shapes,
  },
  {
    title: "Productos",
    url: "/dashboard/products",
    icon: Boxes,
  },
  {
    title: "Ventas",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  }
]

const DasboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='hover:bg-foreground hover:text-background'>AdminDeck</SidebarGroupLabel>
          <Separator/>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} >
                      <item.icon className='h-20 w-20'/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DasboardSidebar