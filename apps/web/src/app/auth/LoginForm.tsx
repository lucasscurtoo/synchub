import React, { useState } from 'react'
import { FormInput } from 'ui/components/form-input'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false)

  const handleShowPass = () => {
    setShowPass(!showPass)
    console.log(showPass)
  }
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
              onClick={handleShowPass}
            />
          ) : (
            <EyeIcon
              className='w-6 text-gray-600 cursor-pointer'
              onClick={handleShowPass}
            />
          )
        }
      />
    </div>
  )
}

export default LoginForm
