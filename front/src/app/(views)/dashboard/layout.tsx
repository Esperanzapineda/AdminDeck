
import DasboardSidebar from '@/components/dashboard/DashboardSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { FC } from 'react'

interface LayoutAuthProps {
    children: React.ReactNode
}

const DashboardLayout: FC<LayoutAuthProps> = ({children}) => {
  return (
    <SidebarProvider>
        <DasboardSidebar />
            <main className="flex-1 w-full overflow-y-auto">
                <SidebarTrigger className='w-12 h-16'/>
                <div>
                    { children }
                </div>
            </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
