import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MessageOptions from './MessageOptions'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface TextMessageProps {
  messageId: string
  message: string
  sentTime: string
  isSender: boolean
}

const TextMessage = ({
  messageId,
  message,
  sentTime,
  isSender,
}: TextMessageProps) => {
  const formattedSentTime = new Date(sentTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const [showContextMenu, setShowContextMenu] = useState(false)
  const [messageHovered, setMessageHovered] = useState(false)
  const [isOnTime, setIsOnTime] = useState(false)

  const handleContextMenu = (event: any) => {
    event.preventDefault()
    const currentDate = new Date()
    const messageDate = new Date(sentTime)
    const diffBtwDates = Number(currentDate) - Number(messageDate)
    if (diffBtwDates <= 300000) {
      setShowContextMenu(true)
      setIsOnTime(true)
    } else {
      setShowContextMenu(true)
      setIsOnTime(false)
    }
  }

  const handleCloseMenu = () => {
    setShowContextMenu(false)
  }

  return (
    <div
      className={`${isSender ? 'ml-auto  items-end' : 'mr-auto  items-start'} flex flex-col gap-y-2`}
    >
      <div className='relative'>
        {isSender && showContextMenu && (
          <div className='absolute left-1/2'>
            <MessageOptions
              messageId={messageId}
              message={message}
              open={showContextMenu}
              onClose={handleCloseMenu}
              isOnTime={isOnTime}
            />
          </div>
        )}

        <div
          className='flex items-center gap-x-2'
          onMouseOver={() => setMessageHovered(true)}
          onMouseLeave={() => setMessageHovered(false)}
        >
          <AnimatePresence>
            {isSender && messageHovered && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0, originX: 1 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0, originX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={handleContextMenu}
                className={`${!isSender ? 'order-2' : ''} py-2 px-4 rounded-xl border-2 border-appColors-darkLightBlue`}
              >
                <ChevronDownIcon
                  className={`${showContextMenu && 'rotate-180 transition-all'} w-4`}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onContextMenu={handleContextMenu}
            className={`${isSender ? 'bg-appColors-primary text-appColors-blueWhite rounded-br-none' : 'bg-appColors-babyBlue text-appColors-black rounded-bl-none'} p-4 rounded-full shadow-sm max-w-100 w-fit `}
          >
            {message}
          </div>
        </div>
      </div>

      <p className='text-xs text-appColors-fadedGray'>{formattedSentTime}</p>
    </div>
  )
}
export default TextMessage
