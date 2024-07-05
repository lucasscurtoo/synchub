import React from 'react'
import Image from 'next/image'
import Google from '../../../../assets/images/icons/Google.png'
import Github from '../../../../assets/images/icons/Github.png'
import Twitter from '../../../../assets/images/icons/Twitter.png'

import LoginForm from './LoginForm'
import { useAuthPageContext } from '../AuthContext'
import { signIn } from 'next-auth/react'

const socialMediaIcons = [
  {
    name: 'google',
    imgSrc: Google,
    provider: 'google',
    alt: 'Google icon',
    auth: () => signIn(),
  },
  {
    name: 'github',
    imgSrc: Github,
    provider: 'github',
    alt: 'GitHub icon',
    auth: () => signIn(),
  },
  {
    name: 'twitter',
    imgSrc: Twitter,
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

