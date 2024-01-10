import React from 'react'
import MessagesSearcher from './searchers/MessagesSearcher'

const ChatOverview = () => {
  return (
    <div className='flex flex-col items-center border-r-[0.5px] border-appColors-fadedGray/50'>
      <div className='flex items-center justify-center w-full'>
        <h3 className='text-lg text-gray-900'>All messages</h3>
        <MessagesSearcher />
      </div>
    </div>
  )
}

export default ChatOverview
