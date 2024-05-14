import { RootState } from '@/redux/store'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { useLazyGetChatPartnerQuery } from '@/redux/api/userApi'
import { useEffect } from 'react'

const ChatInterface = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat)
  const [getUser, { data: chatPartner }] = useLazyGetChatPartnerQuery()

  useEffect(() => {
    const fetchData = async () => {
      getUser(selectedChat.participants.chatPartner)
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col w-full h-full '>
      {!isEmpty(selectedChat.participants) && (
        <ChatHeader user={chatPartner?.data} />
      )}
    </div>
  )
}
export default ChatInterface
