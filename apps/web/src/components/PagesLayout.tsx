import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './Header'
import ChatOverview from './chatOverview/ChatOverview'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full h-full'>
      <Sidebar />
      <div className='w-full'>
        <Header />
        <div className='flex items-start h-full'>
          <ChatOverview />
          {children}
        </div>
      </div>
    </div>
  )
}

export default PagesLayout
