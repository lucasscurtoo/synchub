import React, { useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input } from '@nextui-org/input'

const MessagesSearcher = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Input
      type='text'
      placeholder='Search a message'
      classNames={{
        input:
          'bg-transparent dark:placeholder:text-appColors-lightGrayPrimary',
        inputWrapper: [
          'bg-white',
          'dark:bg-appColors-secondaryDarkGray',
          'hover:bg-white',
          'group-data-[hover=true]:bg-white',
          'group-data-[focus=true]:bg-white',

          'shadow-md',
          'h-0',
          'py-4',
          'w-56',
        ],
      }}
      startContent={
        <div className='p-1 mr-2 rounded-md bg-appColors-primary'>
          <MagnifyingGlassIcon className='w-5 text-appColors-blueWhite' />
        </div>
      }
      ref={inputRef}
    />
  )
}

export default MessagesSearcher

