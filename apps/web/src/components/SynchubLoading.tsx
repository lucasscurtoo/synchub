import Image from 'next/image'
import React from 'react'
import Logo from '../../assets/images/Logo.png'
import Typewriter from 'typewriter-effect'

const SynchubLoading = () => {
  return (
    <div className='absolute flex flex-col items-center justify-center w-full space-y-10 top-32 h-80'>
      <Image width={360} height={200} src={Logo} alt='Synchub logo' />
      <Typewriter
        options={{
          strings: [
            'Welcome to Synchub! Connecting teams for effortless collaboration',
            'Empowering teams, one message at a time. Your productivity starts here!',
          ],
          autoStart: true,
          loop: true,
          cursor: '|',
          wrapperClassName: 'text-2xl font-medium font-inter text-gray-600',
          delay: 80,
        }}
      />
    </div>
  )
}

export default SynchubLoading
