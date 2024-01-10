import { Input } from '@nextui-org/react'
import React from 'react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

const MessagesSearcher = () => {
  return (
    <Input
      type='text'
      label='Messages'
      startContent={
        <div className='p-2 rounded-3xl bg-appColors-blue'>
          <MagnifyingGlassCircleIcon className='w-8 bg-appColors-backgroundBlue' />
        </div>
      }
    />
  )
}

export default MessagesSearcher
