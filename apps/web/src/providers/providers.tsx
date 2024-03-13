'use client'

import { persistor, store } from '@/redux/store'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { AppUIProvider } from './AppUIProvider'
import { PersistGate } from 'redux-persist/integration/react'

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </AppUIProvider>
    </SessionProvider>
  )
}
