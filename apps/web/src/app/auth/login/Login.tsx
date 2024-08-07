import React from 'react'
import Image from 'next/image'
import LoginForm from './LoginForm'
import { useAuthPageContext } from '../AuthContext'
import { signIn } from 'next-auth/react'
import google from '@assets/images/icons/googleIcon.png'
import github from '@assets/images/icons/gitHubIcon.png'
import twitter from '@assets/images/icons/twitterIcon.png'

const socialMediaIcons = [
  {
    name: 'google',
    imgSrc: google,
    provider: 'google',
    alt: 'Google icon',
    auth: () => signIn(),
  },
  {
    name: 'github',
    imgSrc: github,
    provider: 'github',
    alt: 'GitHub icon',
    auth: () => signIn(),
  },
  {
    name: 'twitter',
    imgSrc: twitter,
    provider: 'twitter',
    alt: 'Twitter icon',
    auth: () => signIn(),
  },
]
const Login = () => {
  //hacer un array de objetos que tengan los nombres de los iconos y las referencias a next-auth
  const { showLogin, setShowLogin } = useAuthPageContext()
  return (
    <div className='flex flex-col w-full'>
      <h1 className='mb-8 text-3xl font-extrabold text-gray-900'>
        Sign in to your account
      </h1>
      <div className='flex flex-col items-center space-y-8'>
        {/* Providers section */}
        <div className='space-y-4'>
          <p className='text-sm font-medium text-gray-600'>Sign in with</p>
          <div className='flex space-x-4'>
            {socialMediaIcons.map(({ name, imgSrc, alt, auth }) => (
              <div
                key={name}
                className='flex items-center justify-center py-2 transition-all rounded-md shadow-md cursor-pointer px-11 hover:ring-1 ring-inset ring-gray-400'
                onClick={auth}
              >
                <Image src={imgSrc} width={18} height={18} alt={alt} />
              </div>
            ))}
          </div>
        </div>

        <p className='text-sm text-appColors-gray'>Or continue with</p>
        {/* Credentials section */}
        <LoginForm />
      </div>
    </div>
  )
}

export default Login

