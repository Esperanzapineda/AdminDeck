import Image from 'next/image'
import React, { FC } from 'react'

interface LayoutAuthProps {
    children: React.ReactNode
}

const layoutAuth: FC<LayoutAuthProps> = ({children}) => {
    return (
        <div>
            {children} 
        </div>
    )
}

export default layoutAuth