import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input } from '@nextui-org/input'

const MessagesSearcher = () => {
  return (
    <Input
      type='text'
      placeholder='Search a message'
      classNames={{
        input: ['bg-transparent'],
        inputWrapper: [
          'bg-white',
          'hover:bg-white',
          'group-data-[hover=true]:bg-white',
          'group-data-[focus=true]:bg-white',
          'shadow-md',
          'max-w-60',
          'h-0',
          'py-4',
        ],
      }}
      startContent={
        <div className='p-1 rounded-md bg-appColors-blue mr-4'>
          <MagnifyingGlassIcon className='w-5 text-appColors-backgroundBlue' />
        </div>
      }
    />
  )
}

export default MessagesSearcher
