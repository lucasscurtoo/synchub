'use client'
import ChatInterface from '@/components/messages/ChatInterface'
import StartChatModal from '@/components/messages/StartChatModal'
import { useGetAllChatsQuery } from '@/redux/api/chatApi'
import React from 'react'

const page = () => {
  const { data, isLoading, isError } = useGetAllChatsQuery(
    '6567a2ad2127d4eac55bac56'
  )
  console.log(data)
  return (
    <div className='flex items-center justify-center w-full h-full bg-appColors-backgroundBlue'>
      {data?.data ? (
        <ChatInterface />
      ) : (
        <div className='flex flex-col items-center space-y-4'>
          <h2 className='text-4xl font-medium text-appColors-text'>
            Select a chat to start!
          </h2>
          <p className='text-sm font-light text-center text-appColors-textGray'>
            Select a chat and start messaging with <br /> friends, partners or
            anyone!
          </p>
          <StartChatModal />
        </div>
      )}
    </div>
  )
}

export default page
