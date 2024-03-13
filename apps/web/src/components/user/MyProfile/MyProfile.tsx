'use client'
import { RootState } from '@/redux/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../CustomInput'
import { toggleShowyProfileModal } from '@/redux/reducers/appSlice'
import { AnimatePresence, motion } from 'framer-motion'

const MyProfile = () => {
  const userData = useSelector((state: RootState) => state.user)
  const modalState = useSelector(
    (state: RootState) => state.app.myProfileModalState
  )
  const dispatch = useDispatch()

  const toggleModal = () => {
    dispatch(toggleShowyProfileModal())
  }

  return (
    <AnimatePresence>
      {modalState && (
        <>
          <div
            className='fixed top-0 left-0 z-10 w-screen h-screen'
            onClick={toggleModal}
          ></div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 20 }}
            className='z-50 bg-white h-full w-128 border-l-[0.5px]'
            tabIndex={-1}
          >
            <div className='z-50 flex items-center justify-between p-5 border-b-[0.5px] text-appColors-text'>
              <h4 className='text-lg'>My profile</h4>
              <XMarkIcon className='w-8 cursor-pointer' onClick={toggleModal} />
            </div>

            <div className='flex flex-col items-center p-5 space-y-16'>
              <Image
                src={userData.profilePicture}
                width={150}
                height={150}
                className='object-cover rounded-6xl aspect-square'
                alt='Profile picture'
              />
              <CustomInput label='Full Name' value={userData.fullName} />
              <CustomInput
                label='Status'
                value={userData.role}
                description='This status will be seen by your colleagues'
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MyProfile
