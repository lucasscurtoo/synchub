'use client'
import { setAppSection } from '@/redux/reducers/appSlice'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import UserProfileModal from './user/UserProfileDropdown'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const formatedPathname = pathname.startsWith('/')
    ? pathname.substring(1)
    : pathname
  dispatch(setAppSection(formatedPathname))

  return (
    <div className='flex items-center justify-between w-full py-6 px-10 border-b-[0.5px] border-appColors-fadedGray/50 shadow-sm '>
      <h1 className='text-4xl font-medium capitalize text-appColors-text'>
        {t(formatedPathname)}
      </h1>
      <UserProfileModal />
    </div>
  )
}

export default Header

