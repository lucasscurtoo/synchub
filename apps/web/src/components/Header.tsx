'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
  const pathname = usePathname()

  return (
    <div className='flex items-center w-full py-6 px-10 border-b-[0.5px] border-appColors-fadedGray/50 shadow-sm '>
      <h1 className='text-4xl font-medium text-gray-900 capitalize'>
        {pathname.startsWith('/') ? pathname.substring(1) : pathname}
      </h1>
    </div>
  )
}

export default Header
