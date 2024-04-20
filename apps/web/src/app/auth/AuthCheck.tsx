'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import SynchubLoading from '@/components/SynchubLoading'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useLazyGetUserByIdQuery } from '@/redux/api/userApi'

const AuthCheck = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [useGetUser] = useLazyGetUserByIdQuery()

  const userData = useSelector((state: RootState) => state.user)
  const section = useSelector(
    (state: RootState) => state.persistedAppReducer.app.section
  )
  useEffect(() => {
    if (!session) {
      router.push('/auth')
    } else {
      // If the user is not in the store, get it
      if (userData._id == '') {
        useGetUser(session.user.id)
      }
      router.push(section)
    }
  }, [status, router])

  if (status === 'loading') {
    return <SynchubLoading />
  }
  return null
}

export default AuthCheck
