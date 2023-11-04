import React, { useState } from 'react'
import { FormInput } from 'ui/components/form-input'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false)
  const [showRepeatedPass, setShowRepeatedPass] = useState(false)

  return (
    <div className='flex flex-col w-full space-y-8'>
      <FormInput type='email' label='Email address' name='email' />
      <FormInput
        type={showPass ? 'text' : 'password'}
        label='Password'
        name='password'
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
      <FormInput
        type={showRepeatedPass ? 'text' : 'password'}
        label='Repeat Password'
        name='password'
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
    </div>
  )
}

export default RegisterForm
