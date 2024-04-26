'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import SynchubLoading from '@/components/SynchubLoading'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useLazyGetUserByIdQuery } from '@/redux/api/userApi'
import i18n from '@/i18n/i18n.config'

const AuthCheck = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [useGetUser] = useLazyGetUserByIdQuery()

  const userData = useSelector((state: RootState) => state.user)
  const { language, section } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  useEffect(() => {
    if (!session) {
      router.push('/auth')
    } else {
      // If the user is not in the store, get it
      if (userData._id == '') {
        useGetUser(session.user.id)
      }
      i18n.changeLanguage(language)
      router.push(section)
    }
  }, [status, router])

  if (status === 'loading') {
    return <SynchubLoading />
  }
  return null
}

export default AuthCheck

