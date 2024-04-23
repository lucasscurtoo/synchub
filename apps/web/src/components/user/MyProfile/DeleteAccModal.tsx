import { useDeleteUserMutation } from '@/redux/api/userApi'
import { resetAppSlice } from '@/redux/reducers/appSlice'
import { RootState } from '@/redux/store'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import {
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

const DeleteAccModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [deleteUser, { isLoading, isError, isSuccess }] =
    useDeleteUserMutation()
  const userData = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userData._id)
      console.log(isSuccess, isError)
      dispatch(resetAppSlice())

      signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='mx-auto mt-auto mb-10 w-fit' onClick={onOpen}>
        <button className='flex items-center justify-center px-8 py-3 space-x-4 transition-all delay-75 cursor-pointer w-fit text-appColors-red hover:bg-appColors-red/20 rounded-xl'>
          <TrashIcon className='w-6' />
          <h4 className='text-lg'>Delete account</h4>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='opaque'
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className='flex flex-col items-center p-6 space-y-6 text-center'>
                <h4 className='text-lg whitespace-nowrap'>
                  Are you sure you want to delete your account?
                </h4>
                <p className='font-light text-center text-appColors-textGray'>
                  By clicking delete your account will be{' '}
                  <span className='font-semibold'>permanently</span> deleted
                </p>
                {isLoading ? (
                  <Spinner color='primary' />
                ) : (
                  <div className='flex items-center space-x-4'>
                    <button
                      className='flex items-center justify-center gap-2 py-3 transition-all delay-100 border-2 rounded-full px-7 group hover:bg-appColors-blue border-appColors-blue text-appColors-blue hover:text-white'
                      onClick={onClose}
                    >
                      <XMarkIcon className='w-6' />
                      <p className='text-lg'>Cancel</p>
                    </button>
                    <button
                      className='flex items-center justify-center gap-2 py-3 transition-all delay-100 border-2 rounded-full px-7 group hover:bg-appColors-red border-appColors-red text-appColors-red hover:text-white'
                      onClick={handleDeleteAccount}
                    >
                      <TrashIcon className='w-6' />
                      <p className='text-lg'>Delete</p>
                    </button>
                  </div>
                )}
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default DeleteAccModal

