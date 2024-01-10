'use client'
import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useAuthPageContext } from '../AuthContext'
import { Formik, Field, Form, FieldProps } from 'Formik'
import type { FieldMetaProps } from 'Formik'
import { signInSchema } from '../Validations'
import { signIn } from 'next-auth/react'
import { FormInput } from '@/components/form/FormInput'

interface FieldType {
  field: React.Component<FieldProps['field']>
  meta: FieldMetaProps<FieldProps>
}

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false)
  const { showLogin, setShowLogin } = useAuthPageContext()

  return (
    <div className='flex flex-col w-full space-y-8'>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          console.log(values)
          signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: true,
          })
        }}
      >
        <Form>
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
          <div className='flex flex-col w-full space-y-8'>
            <div className='flex items-center space-x-10'>
              <p className='text-sm text-gray-600'>
                Don't you have an account?
              </p>
              <p
                className='text-base cursor-pointer text-appColors-blue'
                onClick={() => setShowLogin(false)}
              >
                Sign up!
              </p>
            </div>
            <button
              type='submit'
              className='w-full py-3 font-medium text-white transition-all rounded-full bg-appColors-blue hover:bg-blue-800'
            >
              Sign in
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
