import { useDeleteMessageMutation } from '@/redux/api/messageApi'
import { setMessageToEdit } from '@/redux/reducers/messagesSlice'
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useDispatch } from 'react-redux'

const MessageOptions = ({
  messageId,
  message,
  open,
  onClose,
  isOnTime,
}: {
  messageId: string
  message: string
  open: boolean
  onClose: () => void
  isOnTime: boolean
}) => {
  const [deleteMessage] = useDeleteMessageMutation()
  const dispatch = useDispatch()

  const handleEditMessage = () => {
    dispatch(setMessageToEdit({ message, messageId }))
    onClose()
  }

  const handleDeleteMessage = () => {
    deleteMessage({ messageId })
  }

  const disabledKeys = !isOnTime ? ['editMessage', 'deleteMessage'] : []

  return (
    <Dropdown
      aria-label='Dropdown'
      className='w-fit'
      placement='top'
      isOpen={open}
      onClose={onClose}
      closeOnSelect={false}
    >
      <DropdownTrigger>{''}</DropdownTrigger>
      <DropdownMenu
        disabledKeys={disabledKeys}
        className='flex flex-col items-start w-full gap-y-2'
      >
        <DropdownItem
          onClick={handleEditMessage}
          className='w-full p-2 transition-all bg-transparent rounded-lg hover:bg-appColors-blueWhite'
          key='editMessage'
          aria-label='Edit message'
        >
          <div className='flex items-center gap-x-2 '>
            <PencilIcon className='w-6 text-appColors-primaryText' />
            <p className='text-sm text-appColors-primaryText'>Edit message</p>
          </div>
        </DropdownItem>

        <DropdownItem
          onClick={handleDeleteMessage}
          className='w-full p-2 transition-all bg-transparent rounded-lg hover:bg-appColors-blueWhite'
          key='deleteMessage'
          aria-label='Delete message'
        >
          <div className='flex items-center gap-x-2 '>
            <TrashIcon className='w-6 text-appColors-primaryText' />
            <p className='text-sm text-appColors-primaryText'>Delete message</p>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default MessageOptions
