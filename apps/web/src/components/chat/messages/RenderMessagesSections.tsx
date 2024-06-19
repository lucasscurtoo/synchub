import { formatDateForChatSections, formatDateYMD } from '@/lib/utils'
import TextMessage from './TextMessage'
import { chatType } from '@/types/chatType'
import { some } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface Message {
  _id: string
  message: string
  sentTime: string
  userOwner: string
}

const RenderMessagesSections = ({
  selectedChat,
}: {
  selectedChat: chatType
}) => {
  const { messages } = useSelector((state: RootState) => state.messages)
  const groupMessagesByDate = (
    messages: Message[]
  ): Record<string, Message[]> => {
    const sortedMessages = [...messages].sort(
      (a, b) => new Date(b.sentTime).getTime() - new Date(a.sentTime).getTime()
    )

    return sortedMessages.reduce(
      (groups, message) => {
        const formattedDate = formatDateYMD(message.sentTime)
        if (!groups[formattedDate]) {
          groups[formattedDate] = []
        }
        groups[formattedDate].unshift(message)
        return groups
      },
      {} as Record<string, Message[]>
    )
  }

  return (
    <div className='flex flex-col-reverse flex-1 h-full overflow-y-auto scrollbar-none'>
      {messages && some(messages, (message) => message.message !== '') ? (
        Object.entries(groupMessagesByDate(messages)).map(
          ([date, messagesOfDay]) => {
            const formattedDate = formatDateForChatSections(new Date(date))
            return (
              <div className='flex flex-col w-auto p-4 gap-y-4' key={date}>
                <h2 className='mx-auto text-xs text-appColors-fadedGray'>
                  {formattedDate}
                </h2>
                {messagesOfDay.map((mess) => (
                  <TextMessage
                    key={mess.sentTime}
                    sentTime={mess.sentTime}
                    message={mess.message}
                    messageId={mess._id}
                    isSender={
                      selectedChat.partnerData._id === mess.userOwner
                        ? false
                        : true
                    }
                  />
                ))}
              </div>
            )
          }
        )
      ) : (
        <div className='flex flex-col items-center h-full p-4'>
          <h2 className='text-xs text-appColors-fadedGray'>Today</h2>
          <h2 className='mt-auto text-base text-appColors-fadedGray'>
            Send a message to start a new chat...
          </h2>
        </div>
      )}
    </div>
  )
}
export default RenderMessagesSections
