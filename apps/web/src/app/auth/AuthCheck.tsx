'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import SynchubLoading from '@/components/SynchubLoading'

const AuthCheck = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      // router.push('/auth')
    }
  }, [status, router])

  if (status === 'loading') {
    return <SynchubLoading />
  }
  return null
}

export default AuthCheck
