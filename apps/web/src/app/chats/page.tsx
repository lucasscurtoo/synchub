'use client'
import ChatInterface from '@/components/chat/ChatInterface'
import { useGetAllChatsQuery } from '@/redux/api/chatApi'
import { PlusIcon } from '@heroicons/react/24/solid'
import React from 'react'

const page = () => {
  const { data, isLoading, isError } = useGetAllChatsQuery(
    '6567a2ad2127d4eac55bac56'
  )
  console.log(data)
  return (
    <div className='flex items-center justify-center w-full h-full bg-appColors-backgroundBlue'>
      {data ? (
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
          {/* hacer el modal de start new chat  */}
          <div className='flex items-center px-4 py-2 space-x-2 text-white rounded-lg cursor-pointer bg-appColors-blue'>
            <PlusIcon className='w-8' />
            <p className='text-sm font-light'>Start new chat</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default page
