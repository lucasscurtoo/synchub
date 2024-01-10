import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'

interface ProvidersProps {
  children: React.ReactNode
}

export function AppUIProvider({ children }: ProvidersProps): JSX.Element {
  return <NextUIProvider>{children}</NextUIProvider>
}

type NextThemeProviderProps = ProvidersProps & {
  themeProps?: ThemeProviderProps
}

export function NextThemeProvider({
  children,
  themeProps,
}: NextThemeProviderProps): JSX.Element {
  return (
    <ThemeProvider
      defaultTheme='system'
      themes={['light', 'dark', 'system']}
      {...themeProps}
    >
      {children}
    </ThemeProvider>
  )
}
