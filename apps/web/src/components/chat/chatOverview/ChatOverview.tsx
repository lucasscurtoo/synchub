'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { chatType } from '@/types/chatType'
import { selectChat } from '@/redux/reducers/chatSlice'
import { isEmpty } from 'lodash'
import ChatItem from './ChatItem'
import MessagesSearcher from './searchers/MessagesSearcher'
import SearchAndFilterChats from './searchers/SearchAndFilterChats'

const ChatOverview = () => {
  const { section } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const { newChat, selectedChat, chats } = useSelector(
    (state: RootState) => state.chat
  )
  const dispatch = useDispatch()

  const handleSelectChat = (chat: chatType) => {
    dispatch(selectChat(chat))
  }

  return (
    <div className='flex flex-col items-center h-full bg-white dark:bg-appColors-primaryDarkGray w-fit border-r-05 border-appColors-fadedGray/50 grow'>
      <div className='flex items-center justify-center w-full p-6 space-x-4 max-h-20 border-b-05 border-appColors-fadedGray/50'>
        <h3 className='text-lg text-appColors-primaryText dark:text-appColors-blueWhite shrink-0'>
          All {section}
        </h3>
        <MessagesSearcher />
      </div>
      {!isEmpty(newChat?._id) && selectedChat._id === newChat._id && (
        <ChatItem
          chat={newChat}
          isSelected={selectedChat._id === newChat._id}
          onClick={() => handleSelectChat(newChat)}
        />
      )}
      {chats?.map((chat: any) => (
        <ChatItem
          chat={chat}
          isSelected={chat._id === selectedChat._id}
          onClick={() => handleSelectChat(chat)}
        />
      ))}
    </div>
  )
}

export default ChatOverview

