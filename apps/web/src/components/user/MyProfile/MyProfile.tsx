'use client'
import { useRef, useState } from 'react'
import { RootState } from '@/redux/store'
import {
  XMarkIcon,
  CheckCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../CustomInput'
import { toggleShowyProfileModal } from '@/redux/reducers/appSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { Formik, Form, Field } from 'formik'
import { useUpdateUserMutation } from '@/redux/api/userApi'
import DeleteAccModal from './DeleteAccModal'
import { FieldType } from '@/types/common'
import { userDetailsSchema } from '../validations'
import { Spinner } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

const MyProfile = () => {
  const userData = useSelector((state: RootState) => state.user)
  const { myProfileModalState } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleModal = () => {
    dispatch(toggleShowyProfileModal())
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

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
            <div className='z-50 flex items-center justify-between p-5 border-b-[0.5px] text-appColors-primaryText'>
              <h4 className='text-lg'>{t('My profile')}</h4>
              <XMarkIcon className='w-8 cursor-pointer' onClick={toggleModal} />
            </div>
            <Formik
              initialValues={userData}
              validationSchema={userDetailsSchema}
              onSubmit={(values) => {
                const { profilePicture, ...otherValues } = values
                if (profilePicture !== null) {
                  const formData = new FormData()
                  formData.append('profilePicture', profilePicture)
                  formData.append('fullName', otherValues.fullName)
                  formData.append(
                    'profesionalRole',
                    otherValues.profesionalRole
                  )
                  formData.append('status', otherValues.status)
                  updateUser({ id: userData._id, body: formData })
                }
              }}
              enableReinitialize
            >
              {({ dirty }) => (
                <Form>
                  <div className='flex flex-col items-center p-5 space-y-16'>
                    <Field name='profilePicture'>
                      {({ field, form }: any) => {
                        const [preview, setPreview] = useState('')

                        const handleFileChange = (event: any) => {
                          if (event.currentTarget.files[0]) {
                            form.setFieldValue(
                              'profilePicture',
                              event.currentTarget.files[0]
                            )
                            setPreview(
                              URL.createObjectURL(event.currentTarget.files[0])
                            )
                          }
                        }

                        return (
                          <div
                            onClick={handleButtonClick}
                            className='relative transition-all w-fit group'
                          >
                            <div className='absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center m-auto transition-all rounded-6xl group-hover:cursor-pointer group-hover:bg-black/20 '>
                              <PhotoIcon className='hidden w-16 text-white transition-all group-hover:block' />
                            </div>
                            <input
                              type='file'
                              className='hidden'
                              onChange={handleFileChange}
                              ref={fileInputRef}
                            />
                            <Image
                              src={preview || field?.value}
                              width={150}
                              height={150}
                              blurDataURL={userData?.profilePicture}
                              className='object-cover transition-all rounded-6xl aspect-square group-hover:cursor-pointer'
                              alt='Profile picture'
                            />
                          </div>
                        )
                      }}
                    </Field>
                    <Field name='fullName'>
                      {({ field, meta }: FieldType) => (
                        <CustomInput
                          name='fullName'
                          type='text'
                          label={t('Full Name')}
                          field={field}
                          meta={meta}
                        />
                      )}
                    </Field>
                    <Field name='profesionalRole'>
                      {({ field, meta }: FieldType) => (
                        <CustomInput
                          name='profesionalRole'
                          type='text'
                          label={t('Profesional Role')}
                          field={field}
                          meta={meta}
                        />
                      )}
                    </Field>
                    <Field name='status'>
                      {({ field, meta }: FieldType) => (
                        <CustomInput
                          name='status'
                          type='text'
                          label={t('Status')}
                          field={field}
                          meta={meta}
                          description={t(
                            'This status will be seen by your colleagues'
                          )}
                        />
                      )}
                    </Field>

                    {isLoading && <Spinner className='' size='lg' />}

                    {dirty && !isLoading && (
                      <Field
                        as='button'
                        type='submit'
                        className='flex items-center px-8 py-3 space-x-4 transition-all delay-75 cursor-pointer text-appColors-primaryText hover:text-appColors-primary hover:bg-appColors-blueWhite rounded-xl'
                      >
                        <h4 className='text-lg'>{t('Save changes')}</h4>
                        <CheckCircleIcon className='w-6' />
                      </Field>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
            <DeleteAccModal />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MyProfile

