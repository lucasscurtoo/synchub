'use client'
import React from 'react'
import Image from 'next/image'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion } from 'framer-motion'
import chatAnimation from '@assets/gifs/chatAnimation.json'
import logo from '@assets/images/logo.png'
import Login from './login/Login'
import Register from './register/Register'
import { AuthPageContextProvider, useAuthPageContext } from './AuthContext'

const Page = () => {
  return (
    <AuthPageContextProvider>
      <div className='flex items-center justify-center w-full h-full overflow-hidden bg-appColors-blueWhite'>
        <div className='flex items-center overflow-hidden rounded-6xl shadow-appShadow w-fit'>
          <div className='h-full p-8 space-y-4 bg-white border-r-[0.1px] border-opacity-30 border-appColors-fadedGray rounded-l-6xl'>
            <div className='flex flex-col items-start justify-start'>
              <Image width={240} height={40} src={logo} alt='Synchub logo' />
            </div>
            <AuthContent />
          </div>
          <div className=' bg-appColors-blueWhite'>
            <Player
              autoplay
              loop
              src={chatAnimation}
              style={{
                height: '500px',
                width: '600px',
              }}
            ></Player>
          </div>
        </div>
      </div>
    </AuthPageContextProvider>
  )
}
// This is made like this, cause if we load the hook before the context it returns an error.
// because its loading the hook to use the context without the context loaded.
const AuthContent = () => {
  const { showLogin } = useAuthPageContext()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      key={showLogin ? 'login' : 'register'}
    >
      {showLogin ? <Login /> : <Register />}
    </motion.div>
  )
}

export default Page

