import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './Header'
import MyProfile from './user/MyProfile/MyProfile'
import UserDetailsModal from './UserDetailsModal/UserDetailsModal'
import ChatOverview from './chat/chatOverview/ChatOverview'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full h-full'>
      <Sidebar />
      <div className='flex flex-col w-full h-full max-h-screen overflow-hidden'>
        <UserDetailsModal />
        <Header />
        <div className='flex items-start flex-grow h-fit'>
          <ChatOverview />
          {children}
          <MyProfile />
        </div>
      </div>
    </div>
  )
}

export default PagesLayout

