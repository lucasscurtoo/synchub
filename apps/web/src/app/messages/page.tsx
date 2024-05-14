'use client'
import React from 'react'
import { useGetAllChatsQuery } from '@/redux/api/chatApi'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import StartChatModal from '@/components/chat/StartChatModal'
import ChatInterface from '@/components/chat/chatInterface/ChatInterface'
import { isEmpty } from 'lodash'

const page = () => {
  const { newChat } = useSelector((state: RootState) => state.chat)
  const { data, isLoading, isError } = useGetAllChatsQuery(
    '6567a2ad2127d4eac55bac56'
  )

  const { t } = useTranslation()
  return (
    <div className='flex items-center justify-center w-full h-full bg-appColors-blueWhite dark:bg-appColors-secondaryDarkGray'>
      {data?.data || !isEmpty(newChat.participants.chatPartner) ? (
        <ChatInterface />
      ) : (
        <div className='flex flex-col items-center space-y-4'>
          <h2 className='text-4xl font-medium text-appColors-primaryText dark:text-appColors-blueWhite'>
            {t('Select a chat to start!')}
          </h2>
          <p className='text-sm font-light text-center text-appColors-textGray dark:text-appColors-lightGrayPrimary'>
            {t('Select a chat and start messaging with')} <br />
            {t('friends, partners or anyone!')}
          </p>
          <StartChatModal />
        </div>
      )}
    </div>
  )
}

export default page

