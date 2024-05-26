import { useEffect } from 'react'
import { RootState } from '@/redux/store'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux'
import ChatInputPanel from './ChatInputPanel'
import RenderMessagesSections from '../messages/RenderMessagesSections'
import { useGetChatMessagesMutation } from '@/redux/api/messageApi'

const ChatInterface = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat)
  const { messages } = useSelector((state: RootState) => state.messages)

  const [getMessages] = useGetChatMessagesMutation()

  useEffect(() => {
    if (selectedChat._id) {
      getMessages(selectedChat._id)
    }
  }, [selectedChat._id])

  return (
    <div className='flex flex-col w-full h-full'>
      <ChatHeader user={selectedChat.partnerData} />
      {/* I dont like doing this but is the only way i finded */}
      <div className='flex-1 overflow-y-auto max-h-[calc(100vh-289px)]'>
        <RenderMessagesSections
          messages={messages}
          selectedChat={selectedChat}
        />
      </div>
      <ChatInputPanel />
    </div>
  )
}
export default ChatInterface

