'use client'

import { store } from '@/redux/store'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { AppUIProvider } from './AppUIProvider'

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <SessionProvider session={session}>
      <AppUIProvider>
        <Provider store={store}>{children}</Provider>
      </AppUIProvider>
    </SessionProvider>
  )
}
