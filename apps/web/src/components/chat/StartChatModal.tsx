import { ChatBubbleOvalLeftIcon, PlusIcon } from '@heroicons/react/24/solid'
import {
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { userType } from '@/types/userType'
import Image from 'next/image'
import RenderStatus from '../user/RenderStatus'
import { useEffect, useState } from 'react'
import { useGetAllUsersQuery } from '@/redux/api/userApi'
import { useDispatch } from 'react-redux'
import { createChat } from '@/redux/reducers/chatSlice'
import SearchAndFilterChats from './chatOverview/searchers/SearchAndFilterChats'

const StartChatModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data: users, isSuccess } = useGetAllUsersQuery('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      setFilteredUsers(users?.data)
    }
  }, [isSuccess, users])

  const handleOpenNewChat = (user: userType) => {
    dispatch(createChat(user))
    onClose()
  }

  return (
    <>
      <div
        onClick={onOpen}
        className='flex items-center px-4 py-2 space-x-2 text-white rounded-lg cursor-pointer bg-appColors-primary'
      >
        <PlusIcon className='w-8' />
        <p className='text-sm font-light'>Start new chat</p>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='max-h-136'
        classNames={{
          base: 'dark:bg-appColors-primaryDarkGray',
        }}
      >
        <ModalContent className='py-8'>
          {filteredUsers?.length > 0 && (
            <>
              <ModalBody className='flex flex-col space-y-4 '>
                <SearchAndFilterChats
                  searchProperty='fullName'
                  styles={{ inputWrapper: '!h-16' }}
                  placeholder='Search or start a new chat'
                  data={users?.data}
                  onFilter={setFilteredUsers}
                />
                <div className='flex w-full'>
                  <Listbox aria-label='Actions'>
                    {filteredUsers.map((user: userType) => (
                      <ListboxItem
                        variant='light'
                        classNames={{
                          base: '!px-0',
                        }}
                        key={user._id}
                        value={user._id}
                      >
                        <div className='flex items-center w-full !h-fit p-2 space-x-4 rounded-lg bg-appColors-blueWhite dark:bg-appColors-secondaryDarkGray'>
                          <Image
                            src={user.profilePicture}
                            alt={user.fullName}
                            width={50}
                            height={50}
                            className='object-cover rounded-xl aspect-square'
                          />
                          <div className='flex items-center justify-between w-full space-x-6 whitespace-nowrap'>
                            <div className='flex flex-col'>
                              <h4 className='font-medium text-md text-appColors-primaryText dark:text-appColors-blueWhite'>
                                {user.fullName}
                              </h4>
                              <RenderStatus status={user.state} />
                            </div>
                            <p className='text-sm font-light text-appColors-textGray dark:text-appColors-lightGrayPrimary'>
                              {user.profesionalRole}
                            </p>
                            <div className='p-2 ml-auto transition-all delay-100 rounded-full cursor-pointer text-appColors-primary hover:bg-appColors-fadedGray/30'>
                              <ChatBubbleOvalLeftIcon
                                className='w-6'
                                onClick={() => handleOpenNewChat(user)}
                              />
                            </div>
                          </div>
                        </div>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default StartChatModal

