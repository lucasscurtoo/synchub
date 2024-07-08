import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useAuthPageContext } from '../AuthContext'
import { Formik, Field, Form, FieldProps } from 'Formik'
import { FieldMetaProps } from 'Formik'
import { signUpSchema } from '../Validations'
import { useRegisterMutation } from '@/redux/api/authApi'
import { FormInput } from '@/components/form/FormInput'
import { signIn } from 'next-auth/react'

interface FieldType {
  field: React.Component<FieldProps['field']>
  meta: FieldMetaProps<FieldProps>
}

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false)
  const [showRepeatedPass, setShowRepeatedPass] = useState(false)
  const { setShowLogin } = useAuthPageContext()
  const [register] = useRegisterMutation()

  return (
    <div className='flex flex-col w-full'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatedPass: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values): Promise<void> => {
          const data = await register(values).unwrap()
          if (data?.status === 201) {
            signIn('credentials', {
              email: values.email,
              password: values.password,
              redirect: true,
            })
          }
        }}
      >
        <Form className='space-y-4'>
          <Field name='email'>
            {({ field, meta }: FieldType) => (
              <FormInput
                name='email'
                type='email'
                label='Email address'
                field={field}
                meta={meta}
              />
            )}
          </Field>
          <Field name='password'>
            {({ field, meta }: FieldType) => (
              <FormInput
                name='password'
                type={showPass ? 'text' : 'password'}
                label='Password'
                field={field}
                meta={meta}
                icon={
                  showPass ? (
                    <EyeSlashIcon
                      className='w-6 text-gray-600 cursor-pointer'
                      onClick={() => setShowPass(!showPass)}
                    />
                  ) : (
                    <EyeIcon
                      className='w-6 text-gray-600 cursor-pointer'
                      onClick={() => setShowPass(!showPass)}
                    />
                  )
                }
              />
            )}
          </Field>
          <Field name='repeatedPass'>
            {({ field, meta }: FieldType) => (
              <FormInput
                name='repeatedPass'
                type={showRepeatedPass ? 'text' : 'password'}
                label='Repeat Password'
                field={field}
                meta={meta}
                icon={
                  showRepeatedPass ? (
                    <EyeSlashIcon
                      className='w-6 text-gray-600 cursor-pointer'
                      onClick={() => setShowRepeatedPass(!showRepeatedPass)}
                    />
                  ) : (
                    <EyeIcon
                      className='w-6 text-gray-600 cursor-pointer'
                      onClick={() => setShowRepeatedPass(!showRepeatedPass)}
                    />
                  )
                }
              />
            )}
          </Field>
          <div className='flex items-center space-x-10'>
            <p className='text-sm text-gray-600'>Already have an account?</p>
            <p
              className='text-base cursor-pointer text-appColors-primary'
              onClick={() => setShowLogin(true)}
            >
              Sign in!
            </p>
          </div>

          <button
            type='submit'
            className='w-full py-3 font-medium text-white transition-all rounded-full bg-appColors-primary hover:bg-blue-800'
          >
            Sign Up!
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterForm

