import Image from 'next/image'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { chatType } from '@/types/chatType'
import { ReactEventHandler } from 'react'

const ChatItem = ({
  chat,
  isSelected,
  onClick,
}: {
  chat: chatType
  isSelected: boolean
  onClick: ReactEventHandler
}) => (
  <div
    className={`${isSelected ? 'bg-appColors-blueWhite' : 'bg-transparent'} cursor-pointer flex flex-col w-full p-6 border-b-05 border-appColors-fadedGray/50`}
    onClick={onClick}
  >
    <div className='flex items-center gap-x-4'>
      <Image
        src={chat?.partnerData.profilePicture}
        alt='Chat partner profile picture'
        width={35}
        height={35}
        className='object-cover rounded-xl aspect-square'
      />
      <h3 className='text-lg text-appColors-primaryText dark:text-appColors-blueWhite'>
        {chat?.partnerData.fullName}
      </h3>
      <StarIconOutline className='w-6 ml-auto transition-all cursor-pointer text-appColors-primary hover:scale-110' />
    </div>
  </div>
)

export default ChatItem
