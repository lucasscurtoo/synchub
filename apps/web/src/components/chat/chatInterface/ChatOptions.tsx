import { BellIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

const ChatOptions = () => {
  return (
    <Dropdown className='w-fit'>
      <DropdownTrigger>
        <div className='p-2 font-semibold bg-white shadow-md cursor-pointer rounded-xl group'>
          <EllipsisVerticalIcon className='transition-all w-7 text-appColors-black group-hover:text-appColors-primary' />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem
          className='transition-all bg-appColors-blueWhite hover:bg-appColors-blueWhite'
          key='clearChat'
        >
          <div className='flex items-center gap-x-4'>
            <div className='p-2 bg-white rounded-lg'>
              <BellIcon className='w-8 text-appColors-primary' />
            </div>
            <p>Mute notifications</p>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default ChatOptions
