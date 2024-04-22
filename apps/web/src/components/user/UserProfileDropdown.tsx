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

const UserProfileDropdown = () => {
  const userData = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const configModal = useDisclosure()

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className='flex items-center space-x-4 cursor-pointer'>
            <div className='flex flex-col'>
              <Skeleton
                isLoaded={!userData.isLoading && !userData.isUserFirstLoggin}
                className='rounded-xl min-h-5'
              >
                <h3 className='text-base font-semibold text-appColors-textGray'>
                  {userData.fullName}
                </h3>
              </Skeleton>
              <Skeleton
                isLoaded={!userData.isLoading && !userData.isUserFirstLoggin}
                className='mt-2 rounded-xl'
              >
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-normal text-appColors-gray'>
                    {userData && 'My settings'}
                  </p>
                  <AdjustmentsHorizontalIcon className='w-6 text-appColors-gray' />
                </div>
              </Skeleton>
            </div>
            <Skeleton
              isLoaded={!userData.isLoading && !userData.isUserFirstLoggin}
              className='rounded-xl'
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
            aria-label='Custom item styles'
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
                'dark:data-[hover=true]:bg-default-50',
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
                    <h3 className='text-base capitalize text-appColors-text'>
                      {userData.fullName}
                    </h3>
                    <p className='text-sm capitalize text-appColors-text'>
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

                  <p className='text-sm capitalize text-appColors-textGray'>
                    {userData.status}
                  </p>

                  <StatusRender status={userData.state} />
                </div>
              </DropdownItem>
              <DropdownItem
                key='profileInfo'
                onClick={() => dispatch(toggleShowyProfileModal())}
                className='text-appColors-textGray'
              >
                View & edit profile info
              </DropdownItem>
              <DropdownItem key='settings' className='text-appColors-textGray '>
                Settings
              </DropdownItem>
              <DropdownItem
                key='logout'
                onClick={() => signOut()}
                classNames={{
                  base: [
                    'text-appColors-red',
                    'data-[hover=true]:text-appColors-red',
                    'data-[hover=true]:bg-appColors-red/30',
                    'dark:data-[hover=true]:bg-appColors-red/30',
                    'data-[selectable=true]:focus:bg-appColors-red/30',
                    'data-[pressed=true]:opacity-70',
                  ],
                }}
              >
                Log out
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

