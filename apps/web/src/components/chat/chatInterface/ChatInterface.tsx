import { RootState } from '@/redux/store'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

const ChatInterface = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat)

  return (
    <div className='flex flex-col w-full h-full '>
      {!isEmpty(selectedChat.participants) && (
        <ChatHeader user={selectedChat.partnerData} />
      )}
    </div>
  )
}
export default ChatInterface

