import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'

const ConfigurationModal = () => {
  return (
    <>
      <div className='flex items-center p-3'>
        <Cog6ToothIcon className='w-8 text-appColors-blue' />
        <h3 className='text-lg text-appColors-gray'>Configuration</h3>
      </div>
    </>
  )
}

export default ConfigurationModal
