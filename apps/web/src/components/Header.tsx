'use client'
import appSlice, { setAppSection } from '@/redux/reducers/appSlice'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const formatedPathname = pathname.startsWith('/')
    ? pathname.substring(1)
    : pathname
  dispatch(setAppSection(formatedPathname))

  return (
    <div className='flex items-center w-full py-6 px-10 border-b-[0.5px] border-appColors-fadedGray/50 shadow-sm '>
      <h1 className='text-4xl font-medium text-gray-900 capitalize'>
        {formatedPathname}
      </h1>
    </div>
  )
}

export default Header
