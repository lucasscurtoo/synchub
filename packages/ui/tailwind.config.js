// tailwind.config.js
import { nextui } from '@nextui-org/react'
import tailwindConfig from '../../apps/web/tailwind.config'

/** @type {import('tailwindcss').Config} */
export const config = {
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
  presets: [tailwindConfig],
}

