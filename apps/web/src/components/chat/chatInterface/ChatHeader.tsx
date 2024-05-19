import { VideoCameraIcon } from '@heroicons/react/24/solid'
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/16/solid'
import Image from 'next/image'

const ChatHeader = ({
  user,
}: {
  user: { fullName: string; profilePicture: string }
}) => {
  return (
    <div className='flex items-center justify-between p-4 max-h-20 border-b-05 border-appColors-fadedGray/50'>
      <div className='flex items-center gap-x-2'>
        <Image
          src={user?.profilePicture}
          width={50}
          height={50}
          blurDataURL={user?.profilePicture}
          className='object-cover rounded-xl aspect-square'
          alt='Profile picture'
        />
        <h3 className='text-base font-semibold text-appColors-primaryText dark:text-appColors-blueWhite'>
          {user?.fullName}
        </h3>
      </div>
      <div className='flex items-center gap-x-4'>
        <div className='p-2 bg-white shadow-md cursor-pointer rounded-xl group'>
          <VideoCameraIcon className='transition-all w-7 text-appColors-black group-hover:text-appColors-primary' />
        </div>
        <div className='p-2 bg-white shadow-md cursor-pointer rounded-xl group'>
          <MagnifyingGlassIcon className='transition-all w-7 text-appColors-black group-hover:text-appColors-primary' />
        </div>
        <div className='p-2 bg-white shadow-md cursor-pointer rounded-xl group'>
          <EllipsisVerticalIcon className='transition-all w-7 text-appColors-black group-hover:text-appColors-primary' />
        </div>
      </div>
    </div>
  )
}
export default ChatHeader

