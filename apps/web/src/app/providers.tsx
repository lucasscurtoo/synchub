'use client'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { AppUIProvider } from 'ui/providers/index'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppUIProvider key={null} type={undefined} props={undefined}>
      <Provider store={store}>{children}</Provider>
    </AppUIProvider>
  )
}
