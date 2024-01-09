import { Input } from '@nextui-org/react'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const MessagesSearcher = () => {
  return (
    <div className='flex items-center'>
      <div className='p-2 rounded-3xl bg-appColors-blue'>
        <MagnifyingGlassIcon className='w-4 text-appColors-backgroundBlue' />
      </div>
      <input type='text' />
    </div>
  )
}

export default MessagesSearcher
