'use client'
import { RootState } from '@/redux/store'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import UserDetailsForm from './UserDetailsForm'

const UserDetailsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isUserFirstLoggin } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (isUserFirstLoggin) {
      onOpen()
    }
  }, [isUserFirstLoggin])

  return (
    <Modal
      backdrop='opaque'
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      className='!max-w-3xl'
    >
      <ModalContent className='p-4'>
        {(onClose) => (
          <div className='w-160'>
            <ModalHeader className='flex flex-col gap-1'>
              <h3 className='text-2xl font-semibold text-appColors-text'>
                User details
              </h3>
              <p className='text-base font-normal text-appColors-textGray'>
                Update your personal details and photo here
              </p>
            </ModalHeader>
            <ModalBody className='mt-2'>
              <UserDetailsForm onClose={onClose} />
            </ModalBody>
            <ModalFooter className='flex justify-start'></ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}
export default UserDetailsModal
