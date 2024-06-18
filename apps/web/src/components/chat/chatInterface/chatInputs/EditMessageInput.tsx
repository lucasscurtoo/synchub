import { ChatInput } from '@/components/nextui/ChatInput'
import useChatInput from '@/hooks/useChatInput'
import { RootState } from '@/redux/store'
import { PaperAirplaneIcon, PencilIcon } from '@heroicons/react/16/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const EditMessageInput = () => {
  const { messageToEdit } = useSelector((state: RootState) => state.messages)
  const {
    textMessage,
    handleChangeInput,
    handleEnter,
    handleEditMessage,
    handleCancelEditMessage,
  } = useChatInput(() => {
    handleEditMessage()
  })

  return (
    <div className='flex flex-col items-center flex-none w-full mt-auto shrink-0'>
      <div className='w-full px-4 py-2 bg-white'>
        <div className='flex flex-col items-start px-4 py-2 rounded-lg bg-appColors-lightGrayPrimary'>
          <p className='text-xs font-semibold text-appColors-gray'>
            Edit message
          </p>
          <p className='text-sm'>{messageToEdit}</p>
        </div>
      </div>
      <div className='flex items-center flex-none w-full p-4 pt-2 bg-white gap-x-4'>
        <div className='p-2 transition-all rounded-full shadow-sm cursor-pointer bg-appColors-blueWhite hover:bg-appColors-babyBlue '>
          <PencilIcon className='w-7 text-appColors-primary' />
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
                {textMessage !== '' && (
                  <motion.div
                    key='paperAirplane'
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                    exit={{ opacity: 0 }}
                    onClick={handleEditMessage}
                    className='cursor-pointer'
                  >
                    <PaperAirplaneIcon className='w-6 text-white' />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          }
        />
        <div className='flex items-center ml-auto gap-x-4'>
          <XMarkIcon
            onClick={handleCancelEditMessage}
            className='w-6 transition-all cursor-pointer text-appColors-black hover:text-appColors-primary'
          />
          <CheckIcon
            onClick={handleEditMessage}
            className='w-6 transition-all cursor-pointer text-appColors-black hover:text-appColors-primary'
          />
        </div>
      </div>
    </div>
  )
}
export default EditMessageInput
