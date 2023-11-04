import React from 'react'
import RegisterForm from './RegisterForm'
import Image from 'next/image'
import Google from 'assets/images/icons/Google.png'
import Github from 'assets/images/icons/Github.png'
import Twitter from 'assets/images/icons/Twitter.png'

interface registerProps {
  handleShowlogin: () => void
}

const socialMediaIcons = [
  {
    name: 'google',
    imgSrc: Google,
    provider: 'google',
    alt: 'Google icon',
  },
  {
    name: 'github',
    imgSrc: Github,
    provider: 'github',
    alt: 'GitHub icon',
  },
  {
    name: 'twitter',
    imgSrc: Twitter,
    provider: 'twitter',
    alt: 'Twitter icon',
  },
]

const Register = ({ handleShowlogin }: registerProps) => {
  return (
    <div className='flex flex-col w-full'>
      <h1 className='mb-8 text-3xl font-extrabold text-gray-900'>
        Sign up into a new account!
      </h1>

      <div className='flex flex-col w-full space-y-8'>
        <div className='space-y-4'>
          <p className='text-sm font-medium text-gray-600'>Sign up with</p>
          <div className='flex justify-between'>
            {socialMediaIcons.map(({ imgSrc, alt }) => (
              <div className='flex items-center justify-center py-2 transition-all rounded-md shadow-md cursor-pointer px-11 hover:ring-1 ring-inset ring-gray-400'>
                <Image src={imgSrc} width={18} height={18} alt={alt} />
              </div>
            ))}
          </div>
          <p className='text-sm text-appColors-gray'>Or continue with</p>
        </div>
        <RegisterForm />
        <div className='flex items-center space-x-10'>
          <p className='text-sm text-gray-600'>Already have an account?</p>
          <p
            className='text-base cursor-pointer text-appColors-blue'
            onClick={handleShowlogin}
          >
            Sign in!
          </p>
        </div>

        <button
          type='submit'
          className='w-full py-3 font-medium text-white transition-all rounded-full bg-appColors-blue hover:bg-blue-800'
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Register
