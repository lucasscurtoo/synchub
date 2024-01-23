import { nextui } from '@nextui-org/theme'

const config = {
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../.././node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        appColors: {
          backgroundBlue: '#F8F9FD',
          blue: '#3D64FD',
          lightBlue: '#DCE6FF',
          gray: '#6B7280',
          fadedGray: '#AFB8CF',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
        '9xl': '4.5rem',
        '10xl': '5rem',
      },
      borderWidth: {
        '05': '0.5px',
      },
      boxShadow: {
        appShadow: '0 4px 15px 0 rgba(0,0,0, 0.3)',
      },
      fontFamily: {
        inter: 'Inter',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: 'light',
    }),
  ],
}
export default config
