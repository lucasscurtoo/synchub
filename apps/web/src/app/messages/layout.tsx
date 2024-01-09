import PagesLayout from '@/components/PagesLayout'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full'>
      <PagesLayout children={children} />
    </div>
  )
}

export default layout
