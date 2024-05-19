import { RootState } from '@/redux/store'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import ChatInputPanel from './ChatInputPanel'

const ChatInterface = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat)

  return (
    <div className='flex flex-col w-full h-full'>
      <ChatHeader user={selectedChat.partnerData} />
      <ChatInputPanel />
    </div>
  )
}
export default ChatInterface

