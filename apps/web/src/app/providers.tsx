'use client'

import { AppUIProvider } from 'ui/providers/index'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppUIProvider key={null} type={undefined} props={undefined}>
      {children}
    </AppUIProvider>
  )
}
