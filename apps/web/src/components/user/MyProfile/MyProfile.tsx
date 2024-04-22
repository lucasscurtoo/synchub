'use client'
import { useEffect, useState } from 'react'
import { RootState } from '@/redux/store'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../CustomInput'
import { toggleShowyProfileModal } from '@/redux/reducers/appSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { Formik, Form, Field } from 'Formik'
import { useUpdateUserMutation } from '@/redux/api/userApi'
import DeleteAccModal from './DeleteAccModal'

const MyProfile = () => {
  const userData = useSelector((state: RootState) => state.user)
  const { myProfileModalState } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const [updateUser] = useUpdateUserMutation()
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [userValues, setUserValues] = useState(userData)
  const dispatch = useDispatch()

  const toggleModal = () => {
    dispatch(toggleShowyProfileModal())
    setUserValues(userData)
    setShowSaveButton(false)
  }

  const changeInputsValues = (inputToChange: string, newValue: string) => {
    setShowSaveButton(true)
    setUserValues((prevState) => ({
      ...prevState,
      [inputToChange]: newValue.charAt(0).toUpperCase() + newValue.slice(1),
    }))
  }

  useEffect(() => {
    if (userData) {
      setUserValues(userData)
    }
  }, [userData])

  return (
    <AnimatePresence>
      {myProfileModalState && (
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
            className='z-50 bg-white h-full w-128 border-l-[0.5px] flex flex-col'
            tabIndex={-1}
          >
            <div className='z-50 flex items-center justify-between p-5 border-b-[0.5px] text-appColors-text'>
              <h4 className='text-lg'>My profile</h4>
              <XMarkIcon className='w-8 cursor-pointer' onClick={toggleModal} />
            </div>
            <Formik
              initialValues={userValues}
              onSubmit={(values) => {
                updateUser({ id: userData._id, body: values })
                setShowSaveButton(false)
              }}
              enableReinitialize
            >
              <Form>
                <div className='flex flex-col items-center p-5 space-y-16'>
                  <Image
                    src={userValues?.profilePicture}
                    width={150}
                    height={150}
                    className='object-cover rounded-6xl aspect-square'
                    alt='Profile picture'
                  />
                  <CustomInput
                    name='fullName'
                    type='text'
                    label='Full Name'
                    value={userValues?.fullName}
                    onChange={(e) =>
                      changeInputsValues('fullName', e.target.value)
                    }
                  />
                  <CustomInput
                    name='profesionalRole'
                    type='text'
                    label='Profesional Role'
                    value={userValues?.profesionalRole}
                    onChange={(e) =>
                      changeInputsValues('profesionalRole', e.target.value)
                    }
                  />
                  <CustomInput
                    name='status'
                    type='text'
                    label='Status'
                    value={userValues?.status}
                    onChange={(e) =>
                      changeInputsValues('status', e.target.value)
                    }
                    description='This status will be seen by your colleagues'
                  />

                  {showSaveButton && (
                    <Field
                      as='button'
                      type='submit'
                      className='flex items-center px-8 py-3 space-x-4 transition-all delay-75 cursor-pointer text-appColors-text hover:text-appColors-blue hover:bg-appColors-backgroundBlue rounded-xl'
                    >
                      <h4 className='text-lg'>Save changes</h4>
                      <CheckCircleIcon className='w-6' />
                    </Field>
                  )}
                </div>
              </Form>
            </Formik>
            <DeleteAccModal />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MyProfile

