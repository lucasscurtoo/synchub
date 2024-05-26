interface SenderTextMessageProps {
  message: string
  sentTime: string
  isSender: boolean
}

const TextMessage = ({
  message,
  sentTime,
  isSender,
}: SenderTextMessageProps) => {
  const formattedSentTime = new Date(sentTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <div
      className={`${isSender ? 'ml-auto' : 'mr-auto'} flex flex-col gap-y-2`}
    >
      <div
        className={`${isSender ? 'bg-appColors-primary text-appColors-blueWhite' : 'bg-appColors-babyBlue text-appColors-black'} p-4 rounded-full rounded-br-none  max-w-100 w-fit `}
      >
        {message}
      </div>
      <p className='ml-auto text-xs text-appColors-fadedGray'>
        {formattedSentTime}
      </p>
    </div>
  )
}
export default TextMessage
