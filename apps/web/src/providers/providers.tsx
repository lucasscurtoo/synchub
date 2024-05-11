'use client'

import { RootState, store } from '@/redux/store'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Provider, useSelector } from 'react-redux'
import { AppUIProvider } from './AppUIProvider'
import { ThemeProvider } from 'next-themes'

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    // <PersistGate loading={null} persistor={persistor}>
    <SessionProvider session={session}>
      <AppUIProvider>
        <Provider store={store}>
          <ThemeProvider
            defaultTheme='system'
            enableSystem
            attribute='class'
            themes={['light', 'dark']}
          >
            {children}
          </ThemeProvider>
        </Provider>
      </AppUIProvider>
    </SessionProvider>
    // </PersistGate>
  )
}

