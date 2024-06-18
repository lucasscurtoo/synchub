import { useEffect } from 'react'
import { RootState } from '@/redux/store'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux'
import ChatInputPanel from './chatInputs/ChatInputPanel'
import RenderMessagesSections from '../messages/RenderMessagesSections'
import {
  useGetChatMessagesMutation,
  useListenForMessageEditQuery,
  useListenForMessagesQuery,
} from '@/redux/api/messageApi'
import EditMessageInput from './chatInputs/EditMessageInput'

const ChatInterface = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat)
  const { messageToEdit } = useSelector((state: RootState) => state.messages)
  const [getMessages] = useGetChatMessagesMutation()
  useListenForMessagesQuery('')
  useListenForMessageEditQuery('')

  useEffect(() => {
    if (selectedChat._id !== '') {
      getMessages(selectedChat._id)
    }
  }, [selectedChat._id, getMessages])

  return (
    <div className='relative flex flex-col w-full h-full'>
      <ChatHeader user={selectedChat.partnerData} />
      <div
        className={`${messageToEdit ? 'max-h-[calc(100vh-340px)]' : 'max-h-[calc(100vh-289px)]'} flex-1 overflow-y-auto `}
      >
        <RenderMessagesSections selectedChat={selectedChat} />
      </div>
      {messageToEdit === '' ? <ChatInputPanel /> : <EditMessageInput />}
    </div>
  )
}
export default ChatInterface

