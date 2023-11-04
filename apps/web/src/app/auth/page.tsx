//crear dos modales e ir switcheando entre uno y otro para el login y el register
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Player } from '@lottiefiles/react-lottie-player'
import chatAnimation from '../../../assets/gifs/chatAnimation.json'
import Logo from '../../../assets/images/Logo.png'
import Login from './Login'
import Register from './register/Register'

const Page = () => {
  const [showLogin, setShowLogin] = useState(true)

  const handleToggleLogin = () => {
    setShowLogin(!showLogin)
  }

  return (
    <div className='flex items-center justify-center w-full h-full overflow-hidden bg-appColors-backgroundBlue'>
      <div className='flex items-center rounded-6xl shadow-appShadow'>
        <div className='h-full p-8 space-y-4 bg-white border-r-[0.1px] border-opacity-30 border-appColors-fadedGray rounded-l-6xl'>
          <div className='flex flex-col items-start justify-start'>
            <Image width={240} height={40} src={Logo} alt='Synchub logo' />
          </div>
          {showLogin ? (
            <Login handleShowlogin={handleToggleLogin} />
          ) : (
            <Register handleShowlogin={handleToggleLogin} />
          )}
        </div>
        <div className='bg-appColors-backgroundBlue '>
          <Player
            autoplay
            loop
            src={chatAnimation}
            style={{ height: '560px', width: '520px' }}
          ></Player>
        </div>
      </div>
    </div>
  )
}

export default Page
