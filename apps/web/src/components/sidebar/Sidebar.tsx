'use client'
import Image from 'next/image'
import React from 'react'
import logoBlack from '@assets/images/logoBlack.svg'
import logoWhite from '@assets/images/logoWhite.svg'
import { ChatBubbleOvalLeftEllipsisIcon as MessageSolidIcon } from '@heroicons/react/24/solid'
import { ChatBubbleOvalLeftEllipsisIcon as MessageOutlineIcon } from '@heroicons/react/24/outline'
import { UsersIcon as GroupSolidIcon } from '@heroicons/react/24/solid'
import { UsersIcon as GroupOutlineIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon as ChannelSolidIcon } from '@heroicons/react/24/solid'
import { UserGroupIcon as ChannelOutlineIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import SidebarButton from './SidebarButton'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

export interface ButtonConfig {
  path: string
  label: string
  IconActive: React.ElementType
  IconInactive: React.ElementType
}

const buttonConfig = [
  {
    path: '/messages',
    label: 'Messages',
    IconActive: MessageSolidIcon,
    IconInactive: MessageOutlineIcon,
  },
  {
    path: '/groups',
    label: 'Groups',
    IconActive: GroupSolidIcon,
    IconInactive: GroupOutlineIcon,
  },
  {
    path: '/channels',
    label: 'Channels',
    IconActive: ChannelSolidIcon,
    IconInactive: ChannelOutlineIcon,
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { systemTheme, theme } = useTheme()

  return (
    <div className='flex flex-col w-1/6 h-full max-w-xs p-8 bg-appColors-blueWhite dark:bg-appColors-secondaryDarkGray'>
      <div className='flex flex-col space-y-10'>
        <Image
          src={
            systemTheme === 'dark' && theme != 'light' ? logoWhite : logoBlack
          }
          width={218}
          height={35}
          className='max-w-[218px] max-h-[35px]'
          alt='Logo image'
        />
        <div className='space-y-6'>
          {buttonConfig.map((button) => (
            <SidebarButton
              key={button.path}
              isActive={pathname === button.path}
              label={t(button.label)}
              path={button.path}
              IconActive={button.IconActive}
              IconInactive={button.IconInactive}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

