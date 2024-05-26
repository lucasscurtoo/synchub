import { useState } from 'react'
import { ChatInput } from '@/components/nextui/ChatInput'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  FaceSmileIcon,
  HandThumbUpIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useSendChatMessageMutation } from '@/redux/api/messageApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useCreateChatMutation } from '@/redux/api/chatApi'

const ChatInputPanel = () => {
  const [textMessage, setTextMessage] = useState('')
  const { _id } = useSelector((state: RootState) => state.user)
  const { selectedChat } = useSelector((state: RootState) => state.chat)
  const [sendChatMessage] = useSendChatMessageMutation()
  const [createChat] = useCreateChatMutation()

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (selectedChat._id === 'NEW_CHAT') {
      createChat({
        senderId: _id,
        receiverId: selectedChat.partnerData._id,
        chatId: selectedChat._id,
        message: textMessage,
      })
    } else {
      sendChatMessage({
        senderId: _id,
        receiverId: selectedChat.partnerData._id,
        chatId: selectedChat._id,
        message: textMessage,
      })
    }
    setTextMessage('')
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className='flex items-center flex-none w-full p-6 bg-white gap-x-4'>
      <div className='p-2 transition-all rounded-full shadow-sm cursor-pointer bg-appColors-blueWhite hover:bg-appColors-babyBlue '>
        <FaceSmileIcon className='w-7 text-appColors-primary' />
      </div>
      <ChatInput
        className='w-1/2 '
        placeholder='Type your message here ...'
        value={textMessage}
        onChange={handleChangeInput}
        onKeyPress={handleEnter}
        endContent={
          <div className='p-2 rounded-full bg-primary'>
            <AnimatePresence mode='wait'>
              {textMessage !== '' ? (
                <motion.div
                  key='paperAirplane'
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  exit={{ opacity: 0 }}
                  onClick={handleSendMessage}
                  className='cursor-pointer'
                >
                  <PaperAirplaneIcon className='w-6 text-white' />
                </motion.div>
              ) : (
                <motion.div
                  key='plus'
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  exit={{ opacity: 0 }}
                  className='cursor-pointer'
                >
                  <PlusIcon className='w-6 text-white' />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        }
      />
      <div className='flex items-center ml-auto gap-x-4'>
        <div className='p-2 transition-all rounded-full shadow-sm cursor-pointer bg-appColors-blueWhite hover:bg-appColors-babyBlue '>
          <MicrophoneIcon className='w-7 text-appColors-primary' />
        </div>
        <div className='p-2 transition-all rounded-full shadow-sm cursor-pointer bg-appColors-blueWhite hover:bg-appColors-babyBlue '>
          <HandThumbUpIcon className='w-7 text-appColors-primary' />
        </div>
      </div>
    </div>
  )
}
export default ChatInputPanel
