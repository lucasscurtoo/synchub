'use client'
import React from 'react'
import MessagesSearcher from './searchers/MessagesSearcher'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

const ChatOverview = () => {
  const { section } = useSelector((state: RootState) => state.app)

  return (
    <div className='flex flex-col items-center h-full border-r-05 border-appColors-fadedGray/50'>
      <div className='flex items-center justify-center w-full p-6 space-x-4 border-b-05 border-appColors-fadedGray/50'>
        <h3 className='text-lg text-gray-900 shrink-0'>All {section}</h3>
        <MessagesSearcher />
      </div>
    </div>
  )
}

export default ChatOverview
