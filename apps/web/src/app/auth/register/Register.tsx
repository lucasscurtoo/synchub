import React from 'react'
import RegisterForm from './RegisterForm'
import Image from 'next/image'
import google from '@assets/images/icons/google.png'
import github from '@assets/images/icons/github.png'
import twitter from '@assets/images/icons/twitter.png'

const socialMediaIcons = [
  {
    name: 'google',
    imgSrc: google,
    provider: 'google',
    alt: 'Google icon',
  },
  {
    name: 'github',
    imgSrc: github,
    provider: 'github',
    alt: 'GitHub icon',
  },
  {
    name: 'twitter',
    imgSrc: twitter,
    provider: 'twitter',
    alt: 'Twitter icon',
  },
]

const Register = () => {
  return (
    <div className='flex flex-col w-full'>
      <h1 className='mb-6 text-3xl font-extrabold text-gray-900'>
        Welcome to Synchub!
      </h1>

      <div className='flex flex-col w-full space-y-6'>
        <div className='space-y-4'>
          <p className='text-sm font-medium text-gray-600'>Sign up with</p>
          <div className='flex justify-between'>
            {socialMediaIcons.map(({ name, imgSrc, alt }) => (
              <div
                key={name}
                className='flex items-center justify-center py-2 transition-all rounded-md shadow-md cursor-pointer px-11 hover:ring-1 ring-inset ring-gray-400'
              >
                <Image src={imgSrc} width={18} height={18} alt={alt} />
              </div>
            ))}
          </div>
          <p className='text-sm text-appColors-gray'>Or continue with</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register

