import { Formik, Field, Form } from 'formik'
import CustomInput from '../user/CustomInput'
import { Tooltip } from '@nextui-org/react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import UserPhotoUploader from './UserPhotoUploader'
import { FieldType } from '@/types/common'
import { useUpdateUserMutation } from '@/redux/api/userApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { userDetailsSchema } from '../user/validations'
import { useTranslation } from 'react-i18next'

const UserDetailsForm = ({ onClose }: { onClose: () => void }) => {
  const [updateUser] = useUpdateUserMutation()
  const { _id } = useSelector((state: RootState) => state.user)
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        fullName: '',
        profesionalRole: '',
        status: '',
        profilePicture: null,
      }}
      validationSchema={userDetailsSchema}
      onSubmit={(values) => {
        const { profilePicture, ...otherValues } = values
        if (profilePicture !== null) {
          const formData = new FormData()
          formData.append('profilePicture', profilePicture)
          formData.append('fullName', otherValues.fullName)
          formData.append('profesionalRole', otherValues.profesionalRole)
          formData.append('status', otherValues.status)
          updateUser({ id: _id, body: formData })
          onClose()
        }
      }}
    >
      <Form>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col justify-start gap-10 py-2 w-fit'>
            <Field name='fullName'>
              {({ field, meta }: FieldType) => (
                <CustomInput
                  label={t('Full Name')}
                  placeholder={t('e. g. Jhon Dhot')}
                  name='fullName'
                  type='text'
                  field={field}
                  meta={meta}
                  isRequired
                  icon={
                    <Tooltip
                      placement='right'
                      showArrow={true}
                      content={t(
                        'Provide your full name, separated by a space.'
                      )}
                    >
                      <InformationCircleIcon className='w-6 text-appColors-textGray dark:text-appColors-lightGrayPrimary' />
                    </Tooltip>
                  }
                />
              )}
            </Field>
            <Field name='profesionalRole'>
              {({ field, meta }: FieldType) => (
                <CustomInput
                  label={t('Profesional Role')}
                  placeholder={t('e. g. FullStack Developer')}
                  name='profesionalRole'
                  type='text'
                  field={field}
                  meta={meta}
                  isRequired
                  icon={
                    <Tooltip
                      placement='right'
                      showArrow={true}
                      content={t(
                        'This is your profesional role, career or job.'
                      )}
                    >
                      <InformationCircleIcon className='w-6 text-appColors-textGray dark:text-appColors-lightGrayPrimary' />
                    </Tooltip>
                  }
                />
              )}
            </Field>
            <Field name='status'>
              {({ field, meta }: FieldType) => (
                <CustomInput
                  label={t('Status')}
                  placeholder={t('e. g. Developing💻')}
                  name='status'
                  type='text'
                  field={field}
                  meta={meta}
                  icon={
                    <Tooltip
                      placement='right'
                      showArrow={true}
                      content={t(
                        'This is your current status, mood or activity, or anything you want to share.'
                      )}
                    >
                      <InformationCircleIcon className='w-6 text-appColors-textGray dark:text-appColors-lightGrayPrimary' />
                    </Tooltip>
                  }
                />
              )}
            </Field>
          </div>
          <div className='flex flex-col justify-start gap-6'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-lg font-medium text-appColors-primaryText dark:text-appColors-blueWhite'>
                {t('Upload your photo')}
                <span className='text-base text-nextuiColors-danger'> *</span>
              </h3>
              <p className='text-sm font-normal text-appColors-textGray dark:text-appColors-lightGrayPrimary'>
                {t('This photo will be seen by your colleagues')}
              </p>
            </div>
            <UserPhotoUploader />
          </div>
        </div>
        <div className='flex items-center justify-between mt-5'>
          <button
            onClick={onClose}
            className='px-10 py-2 font-medium border rounded-full text-appColors-textGray border-appColors-textGray dark:border-appColors-lightGrayPrimary dark:text-appColors-lightGrayPrimary'
          >
            {t('Cancel')}
          </button>
          <button
            type='submit'
            className='px-10 py-2 font-medium rounded-full text-appColors-blueWhite bg-appColors-primary'
          >
            {t('Continue')}
          </button>
        </div>
      </Form>
    </Formik>
  )
}
export default UserDetailsForm

