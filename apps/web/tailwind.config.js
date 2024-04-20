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
          textGray: '#636363',
          fadedGray: '#AFB8CF',
          text: '#374151',
          red: '#F25D5A',
          secondLightBlue: '#B6C1E9',
          successGreen: '#21BD61',
        },
        nextuiColors: {
          danger: '#f31260',
        },
      },
      spacing: {
        100: '28rem', // 448px
        128: '32rem', // 512px
        136: '36rem', // 576px
        144: '40rem', // 640px
        160: '44rem', // 704px
      },
      borderRadius: {
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
        '6xl': '3rem', // 48px
        '7xl': '3.5rem', // 56px
        '8xl': '4rem', // 64px
        '9xl': '4.5rem', // 72px
        '10xl': '5rem', // 80px
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
    require('tailwind-scrollbar'),
    nextui({
      addCommonColors: true,
      defaultTheme: 'light',
    }),
  ],
}
export default config
