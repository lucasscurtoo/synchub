'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '../../../assets/images/LogoBlack.svg'
import { ChatBubbleOvalLeftEllipsisIcon as MessageSolidIcon } from '@heroicons/react/24/solid'
import { ChatBubbleOvalLeftEllipsisIcon as MessageOutlineIcon } from '@heroicons/react/24/outline'
import { UsersIcon as GroupSolidIcon } from '@heroicons/react/24/solid'
import { UsersIcon as GroupOutlineIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon as ChannelSolidIcon } from '@heroicons/react/24/solid'
import { UserGroupIcon as ChannelOutlineIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import SidebarButton from './SidebarButton'
import ConfigurationModal from './ConfigurationModal'

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

  return (
    <div className='flex flex-col w-1/4 h-full max-w-xs p-8 bg-appColors-backgroundBlue'>
      <div className='flex flex-col space-y-10'>
        <Image src={Logo} width={250} height={200} alt='Logo image' />
        <div className='space-y-6'>
          {buttonConfig.map((button) => (
            <SidebarButton
              key={button.path}
              isActive={pathname === button.path}
              label={button.label}
              path={button.path}
              IconActive={button.IconActive}
              IconInactive={button.IconInactive}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col mt-auto'>
        <ConfigurationModal />
      </div>
    </div>
  )
}

export default Sidebar
