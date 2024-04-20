import { Formik, Field, Form } from 'Formik'
import CustomInput from '../user/CustomInput'
import * as Yup from 'yup'
import { Tooltip } from '@nextui-org/react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import UserPhotoUploader from './UserPhotoUploader'
import { FieldType } from '@/types/common'

const userDetailsSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  profesionalRole: Yup.string().required('Profesional role is required'),
  status: Yup.string().required('Status is required'),
})

const UserDetailsForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <Formik
      initialValues={{
        fullName: '',
        profesionalRole: '',
        status: '',
      }}
      validationSchema={userDetailsSchema}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col justify-start gap-10 py-2 w-fit'>
            <Field name='fullName'>
              {({ field, meta }: FieldType) => (
                <CustomInput
                  label='Full Name'
                  placeholder='e. g. JhonDhot'
                  name='fullName'
                  type='text'
                  field={field}
                  meta={meta}
                  isRequired
                  icon={
                    <Tooltip
                      placement='right'
                      showArrow={true}
                      content='Status (cambiar)'
                    >
                      <InformationCircleIcon className='w-6 text-appColors-textGray' />
                    </Tooltip>
                  }
                />
              )}
            </Field>
            <Field name='profesionalRole'>
              {({ field, meta }: FieldType) => (
                <CustomInput
                  label='Profesional Role'
                  placeholder='e. g. FullStack Developer'
                  name='profesionalRole'
                  type='text'
                  field={field}
                  meta={meta}
                  isRequired
                  icon={
                    <Tooltip
                      placement='right'
                      showArrow={true}
                      content='Status (cambiar)'
                    >
                      <InformationCircleIcon className='w-6 text-appColors-textGray' />
                    </Tooltip>
                  }
                />
              )}
            </Field>
            <Field name='status'>
              {({ field, meta }: FieldType) => (
                <CustomInput
                  label='Status'
                  placeholder='e. g. Developing💻'
                  name='status'
                  type='text'
                  field={field}
                  meta={meta}
                  icon={
                    <Tooltip
                      placement='right'
                      showArrow={true}
                      content='Status (cambiar)'
                    >
                      <InformationCircleIcon className='w-6 text-appColors-textGray' />
                    </Tooltip>
                  }
                />
              )}
            </Field>
          </div>
          <div className='flex flex-col justify-start gap-6'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-lg font-medium text-appColors-text'>
                Upload your photo
                <span className='text-base text-nextuiColors-danger'> *</span>
              </h3>
              <p className='text-sm font-normal text-appColors-textGray'>
                This photo will be seen by your colleagues
              </p>
            </div>
            <UserPhotoUploader />
          </div>
        </div>
        <div className='flex items-center justify-between mt-5'>
          <button
            onClick={onClose}
            className='px-10 py-2 font-medium border rounded-full text-appColors-textGray border-appColors-textGray'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-10 py-2 font-medium rounded-full text-appColors-backgroundBlue bg-appColors-blue'
          >
            Continue
          </button>
        </div>
      </Form>
    </Formik>
  )
}
export default UserDetailsForm