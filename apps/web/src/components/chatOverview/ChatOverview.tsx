'use client'
import React from 'react'
import MessagesSearcher from './searchers/MessagesSearcher'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import ChatInterface from '../messages/ChatInterface'

const ChatOverview = () => {
  const { section } = useSelector((state: RootState) => state.app)

  return (
    <div className='flex flex-col items-center h-full bg-white w-fit border-r-05 border-appColors-fadedGray/50 grow'>
      <div className='flex items-center justify-center w-full p-6 space-x-4 border-b-05 border-appColors-fadedGray/50'>
        <h3 className='text-lg text-appColors-text shrink-0'>All {section}</h3>
        <MessagesSearcher />
      </div>
      <ChatInterface />
    </div>
  )
}

export default ChatOverview
