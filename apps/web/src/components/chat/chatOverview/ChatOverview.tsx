'use client'
import React from 'react'
import MessagesSearcher from './searchers/MessagesSearcher'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import SearchAndFilterChats from './searchers/SearchAndFilterChats'
import Image from 'next/image'
import { isEmpty } from 'lodash'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

const ChatOverview = () => {
  const { section } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const { newChat, selectedChat } = useSelector(
    (state: RootState) => state.chat
  )
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className='flex flex-col items-center h-full bg-white dark:bg-appColors-primaryDarkGray w-fit border-r-05 border-appColors-fadedGray/50 grow'>
      <div className='flex items-center justify-center w-full p-6 space-x-4 max-h-20 border-b-05 border-appColors-fadedGray/50'>
        <h3 className='text-lg text-appColors-primaryText dark:text-appColors-blueWhite shrink-0'>
          All {section}
        </h3>
        <MessagesSearcher />
      </div>
      <div className='w-full p-4 border-b-05 border-appColors-fadedGray/50'>
        {/* <SearchAndFilterChats placeholder='Search or start a new chat' /> */}
      </div>
      {!isEmpty(newChat.participants.chatPartner) && (
        <div
          className={`${selectedChat.chatId === newChat.chatId ? 'bg-appColors-blueWhite' : 'bg-transparent'} flex flex-col w-full p-6 border-b-05 border-appColors-fadedGray/50`}
        >
          <div className='flex items-center gap-x-4'>
            <Image
              src={user.profilePicture}
              alt='Chat partner profile picture'
              width={35}
              height={35}
              className='object-cover rounded-xl aspect-square'
            />
            <h3 className='text-lg text-appColors-primaryText dark:text-appColors-blueWhite'>
              {user.fullName}
            </h3>
            <StarIconOutline className='w-6 ml-auto transition-all cursor-pointer text-appColors-primary hover:scale-110' />
          </div>
        </div>
      )}
      {/* // Iterar sobre los chats */}
      {/* // validar que los chatsId entre selectedChat y chat (iterado) .chatId sean iguales para cambiarle el color */}
      <div
        className={`flex flex-col w-full p-6 border-b-05 border-appColors-fadedGray/50`}
      >
        <div className='flex items-center gap-x-4'>
          <Image
            src={user.profilePicture}
            alt='Chat partner profile picture'
            width={35}
            height={35}
            className='object-cover rounded-xl aspect-square'
          />
          <h3 className='text-lg text-appColors-primaryText dark:text-appColors-blueWhite'>
            {user.fullName}
          </h3>
          <StarIconOutline className='w-6 ml-auto transition-all cursor-pointer text-appColors-primary hover:scale-110' />
        </div>
      </div>
    </div>
  )
}

export default ChatOverview

