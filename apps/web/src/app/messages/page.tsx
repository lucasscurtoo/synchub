'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import StartChatModal from '@/components/chat/StartChatModal'
import ChatInterface from '@/components/chat/chatInterface/ChatInterface'
import { isEmpty } from 'lodash'
import { useGetAllChatsMutation } from '@/redux/api/chatApi'
import dynamic from 'next/dynamic'

const page = () => {
  const { newChat, selectedChat } = useSelector(
    (state: RootState) => state.chat
  )
  const { _id } = useSelector((state: RootState) => state.user)
  const { t } = useTranslation()
  const [getAllChats] = useGetAllChatsMutation()

  const ChatInterface = dynamic(
    () => import('../../components/chat/chatInterface/ChatInterface'),
    {
      ssr: false,
    }
  )

  useEffect(() => {
    if (!isEmpty(_id)) {
      getAllChats(_id)
    }
  }, [_id])

  return (
    <div className='flex items-center justify-center w-full h-full grow-0 bg-appColors-blueWhite dark:bg-appColors-secondaryDarkGray'>
      {!isEmpty(selectedChat._id) || !isEmpty(newChat._id) ? (
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

