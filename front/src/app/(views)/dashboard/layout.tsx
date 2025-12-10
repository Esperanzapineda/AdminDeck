
import DasboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { FC } from 'react'

interface LayoutAuthProps {
    children: React.ReactNode
}

const DashboardLayout: FC<LayoutAuthProps> = ({children}) => {
  return (
    <SidebarProvider>
        <DasboardSidebar />
            <main>
                <SidebarTrigger/>
                <div>
                    { children }
                </div>
            </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
