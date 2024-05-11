import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  useDisclosure,
  Skeleton,
} from '@nextui-org/react'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import StatusRender from './RenderStatus'
import { toggleShowyProfileModal } from '@/redux/reducers/appSlice'
import ConfigurationModal from './settings/SettingsModal'
import { signOut } from 'next-auth/react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

const UserProfileDropdown = () => {
  const userData = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const configModal = useDisclosure()
  const { t } = useTranslation()
  return (
    <>
      <Dropdown
        classNames={{
          content: 'dark:bg-appColors-secondaryDarkGray',
        }}
      >
        <DropdownTrigger>
          <div className='flex items-center space-x-4 cursor-pointer'>
            <div className='flex flex-col'>
              <Skeleton
                isLoaded={!userData.isLoading && !userData.isUserFirstLoggin}
                className='rounded-xl min-h-5 dark:bg-appColors-secondaryDarkGray'
              >
                <h3 className='text-base font-semibold text-appColors-textGray dark:text-appColors-blueWhite'>
                  {userData.fullName}
                </h3>
              </Skeleton>
              <Skeleton
                isLoaded={!userData.isLoading && !userData.isUserFirstLoggin}
                className='mt-2 rounded-xl dark:bg-appColors-secondaryDarkGray'
              >
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-normal text-appColors-gray dark:text-appColors-lightGrayPrimary'>
                    {userData && t('My settings')}
                  </p>
                  <AdjustmentsHorizontalIcon className='w-6 text-appColors-gray dark:text-appColors-lightGrayPrimary' />
                </div>
              </Skeleton>
            </div>
            <Skeleton
              isLoaded={!userData.isLoading && !userData.isUserFirstLoggin}
              className='rounded-xl dark:bg-appColors-secondaryDarkGray'
            >
              <Image
                src={userData.profilePicture}
                width={50}
                height={50}
                blurDataURL={userData.profilePicture}
                className='object-cover rounded-xl aspect-square'
                alt='Profile picture'
              />
            </Skeleton>
          </div>
        </DropdownTrigger>
        {!userData.isLoading && (
          <DropdownMenu
            disabledKeys={['profile']}
            className='p-3'
            onAction={(key) => {
              if (key === 'settings') {
                configModal.onOpen()
              }
            }}
            itemClasses={{
              base: [
                'rounded-md',
                'text-default-500',
                'transition-opacity',
                'data-[hover=true]:text-foreground',
                'data-[hover=true]:bg-default-100',
                'dark:data-[hover=true]:bg-black-900',
                'data-[selectable=true]:focus:bg-default-50',
                'data-[pressed=true]:opacity-70',
                'data-[focus-visible=true]:ring-default-500',
              ],
            }}
          >
            <DropdownSection classNames={{ group: 'space-y-2' }}>
              <DropdownItem
                isReadOnly
                key='profile'
                className='mb-2 opacity-100'
              >
                <div className='grid items-center grid-cols-2 gap-y-2 gap-x-3'>
                  <div className='flex flex-col space-y-0'>
                    <h3 className='text-base capitalize text-appColors-primaryText dark:text-appColors-blueWhite'>
                      {userData.fullName}
                    </h3>
                    <p className='text-sm capitalize text-appColors-primaryText dark:text-appColors-lightGrayPrimary'>
                      {userData.profesionalRole}
                    </p>
                  </div>
                  <Image
                    src={userData.profilePicture}
                    width={50}
                    height={50}
                    blurDataURL={userData.profilePicture}
                    className='object-cover ml-3 rounded-xl aspect-square'
                    alt='Profile picture'
                  />

                  <p className='text-sm capitalize text-appColors-textGray dark:text-appColors-lightGraySecondary'>
                    {userData.status}
                  </p>

                  <StatusRender status={userData.state} />
                </div>
              </DropdownItem>
              <DropdownItem
                key='profileInfo'
                onClick={() => dispatch(toggleShowyProfileModal())}
                className='text-appColors-textGray dark:text-appColors-lightGrayPrimary'
              >
                {t('View & edit profile info')}
              </DropdownItem>
              <DropdownItem
                key='settings'
                className='text-appColors-textGray dark:text-appColors-lightGrayPrimary'
              >
                {t('Settings')}
              </DropdownItem>
              <DropdownItem
                key='logout'
                onClick={() => signOut()}
                classNames={{
                  base: [
                    'text-appColors-danger',
                    'data-[hover=true]:text-appColors-danger',
                    'data-[hover=true]:bg-appColors-danger/30',
                    'dark:data-[hover=true]:bg-appColors-danger/30',
                    'data-[selectable=true]:focus:bg-appColors-danger/30',
                    'data-[pressed=true]:opacity-70',
                  ],
                }}
              >
                {t('Log out')}
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        )}
      </Dropdown>
      <ConfigurationModal disclosure={configModal} />
    </>
  )
}

export default UserProfileDropdown

