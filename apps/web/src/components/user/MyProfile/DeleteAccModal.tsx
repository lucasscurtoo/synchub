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
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const DeleteAccModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [deleteUser, { isLoading, isError, isSuccess }] =
    useDeleteUserMutation()
  const userData = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
        <button className='flex items-center justify-center px-8 py-3 space-x-4 transition-all delay-75 cursor-pointer w-fit text-appColors-danger hover:bg-appColors-danger/20 rounded-xl'>
          <TrashIcon className='w-6' />
          <h4 className='text-lg'>{t('Delete account')}</h4>
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
                  {t('Are you sure you want to delete your account?')}
                </h4>
                <p className='font-light text-center text-appColors-textGray'>
                  {t('By clicking delete your account will be')}{' '}
                  <span className='font-semibold'>{t('permanently')}</span>{' '}
                  {t('deleted')}
                </p>
                {isLoading ? (
                  <Spinner color='primary' />
                ) : (
                  <div className='grid grid-cols-2 gap-4'>
                    <button
                      className='flex items-center justify-center gap-2 py-3 transition-all delay-100 border-2 rounded-full aspect-auto px-7 group hover:bg-appColors-primary border-appColors-primary text-appColors-primary hover:text-white'
                      onClick={onClose}
                    >
                      <XMarkIcon className='w-6' />
                      <p className='text-lg'>{t('Cancel')}</p>
                    </button>
                    <button
                      className='flex items-center justify-center gap-2 py-3 transition-all delay-100 border-2 rounded-full px-7 group hover:bg-appColors-danger border-appColors-danger text-appColors-danger hover:text-white'
                      onClick={handleDeleteAccount}
                    >
                      <TrashIcon className='w-6' />
                      <p className='text-lg'>{t('Delete')}</p>
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

