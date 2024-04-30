import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './Header'
import ChatOverview from './chatOverview/ChatOverview'
import MyProfile from './user/MyProfile/MyProfile'
import UserDetailsModal from './UserDetailsModal/UserDetailsModal'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full h-full'>
      <Sidebar />
      <div className='flex flex-col w-full h-full'>
        <UserDetailsModal />
        <Header />
        <div className='flex items-start flex-grow h-fit bg-appColors-backgroundBlue'>
          <ChatOverview />
          {children}
          <MyProfile />
        </div>
      </div>
    </div>
  )
}

export default PagesLayout

