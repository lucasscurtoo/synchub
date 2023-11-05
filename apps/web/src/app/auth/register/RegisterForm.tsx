import React, { useState, useMemo } from 'react'
import { FormInput } from 'ui/components/form-input'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useAuthPageContext } from '../AuthContext'
import { Formik, Field, Form, FieldProps } from 'Formik'
import type { FieldMetaProps } from 'Formik'
import { signUpSchema } from '../Validations'

interface FieldType {
  field: React.Component<FieldProps['field']>
  meta: FieldMetaProps<FieldProps>
}

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false)
  const [showRepeatedPass, setShowRepeatedPass] = useState(false)
  const { showLogin, setShowLogin } = useAuthPageContext()

  return (
    <div className='flex flex-col w-full'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatedPass: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          console.log(values)
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
              className='text-base cursor-pointer text-appColors-blue'
              onClick={() => setShowLogin(true)}
            >
              Sign in!
            </p>
          </div>

          <button
            type='submit'
            className='w-full py-3 font-medium text-white transition-all rounded-full bg-appColors-blue hover:bg-blue-800'
          >
            Sign Up!
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterForm