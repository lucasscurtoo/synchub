import { ChatBubbleOvalLeftIcon, PlusIcon } from '@heroicons/react/24/solid'
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import SearchAndFilterChats from '../chatOverview/searchers/SearchAndFilterChats'
import { userType } from '@/types/userType'
import Image from 'next/image'
import RenderStatus from '../user/RenderStatus'
import { FixedSizeList as List } from 'react-window'
import { useState } from 'react'

const fakeUsers = [
  {
    fullName: 'Amy Watts',
    password: 'lucas0992',
    email: 'amywatts24@gmail.com',
    status: 'Developing 💻',
    state: 'Active',
    profesionalRole: 'FullstackDev',
    organization: 'lucasOrg',
    profilePicture:
      'https://images.unsplash.com/photo-1614460132343-62aa9fa8d6f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    fullName: 'John Smith',
    password: 'password123',
    email: 'john.smith@example.com',
    status: 'Working on new features',
    state: 'Active',
    profesionalRole: 'Frontend Developer',
    organization: 'Tech Company',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    fullName: 'Emma Johnson',
    password: 'emma2022',
    email: 'emma.johnson@example.com',
    status: 'Out of office',
    state: 'Inactive',
    profesionalRole: 'UX Designer',
    organization: 'Design Studio',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    fullName: 'Michael Davis',
    password: 'michael567',
    email: 'michael.davis@example.com',
    status: 'On vacation 🏖️',
    state: 'Active',
    profesionalRole: 'Backend Developer',
    organization: 'Software Company',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
]

const Row = ({
  index,
  style,
  data,
}: {
  index: number
  style: any
  data: any
}) => {
  const user = data[index]
  return (
    <div
      style={style}
      key={index}
      className='flex items-center w-full !h-fit p-2 space-x-4 rounded-lg bg-appColors-backgroundBlue'
    >
      <Image
        src={user.profilePicture}
        alt={user.fullName}
        width={50}
        height={50}
        className='object-cover rounded-xl aspect-square'
      />
      <div className='flex items-center justify-between w-full space-x-6 whitespace-nowrap'>
        <div className='flex flex-col'>
          <h4 className='font-medium text-md text-appColors-text'>
            {user.fullName}
          </h4>
          <RenderStatus status={user.state} />
        </div>
        <p className='text-sm font-light text-appColors-textGray'>
          {user.profesionalRole}
        </p>
        <div className='p-2 ml-auto transition-all delay-100 rounded-full cursor-pointer text-appColors-blue hover:bg-appColors-fadedGray/30'>
          <ChatBubbleOvalLeftIcon className='w-6' />
        </div>
      </div>
    </div>
  )
}

const StartChatModal = ({ users }: { users?: userType }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [filteredUsers, setFilteredUsers] = useState(fakeUsers)

  return (
    <>
      <div
        onClick={onOpen}
        className='flex items-center px-4 py-2 space-x-2 text-white rounded-lg cursor-pointer bg-appColors-blue'
      >
        <PlusIcon className='w-8' />
        <p className='text-sm font-light'>Start new chat</p>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='max-h-136'>
        <ModalContent className='py-8'>
          <>
            <ModalBody className='flex flex-col space-y-4'>
              <SearchAndFilterChats
                searchProperty='fullName'
                styles={{ inputWrapper: '!h-16' }}
                placeholder='Search or start a new chat'
                data={fakeUsers}
                onFilter={setFilteredUsers}
              />
              <div className='flex w-full'>
                <List
                  width='100%'
                  height={500}
                  itemCount={filteredUsers.length}
                  itemSize={100}
                  itemData={filteredUsers}
                  className='w-full py-2 scrollbar-none'
                >
                  {Row}
                </List>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
export default StartChatModal
