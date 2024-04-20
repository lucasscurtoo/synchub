'use client'
import React from 'react'
import MessagesSearcher from './searchers/MessagesSearcher'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import ChatInterface from '../messages/ChatInterface'
import SearchAndFilterChats from './searchers/SearchAndFilterChats'

const ChatOverview = () => {
  const { section } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )

  return (
    <div className='flex flex-col items-center h-full bg-white w-fit border-r-05 border-appColors-fadedGray/50 grow'>
      <div className='flex items-center justify-center w-full p-6 space-x-4 border-b-05 border-appColors-fadedGray/50'>
        <h3 className='text-lg text-appColors-text shrink-0'>All {section}</h3>
        <MessagesSearcher />
      </div>
      <div className='w-full p-4 border-b-05 border-appColors-fadedGray/50'>
        {/* <SearchAndFilterChats placeholder='Search or start a new chat' /> */}
      </div>
      <ChatInterface />
    </div>
  )
}

export default ChatOverview
