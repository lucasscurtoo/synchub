import { extendVariants, Input } from '@nextui-org/react'

export const CustomSearcherInput = extendVariants(Input, {
  variants: {
    color: {
      searcher: {
        input:
          'bg-transparent placeholder:text-appColors-fadedGray dark:placeholder:text-appColors-lightGrayPrimary',
        inputWrapper: [
          'shadow-none',
          'w-full',
          'bg-appColors-blueWhite',
          'dark:bg-appColors-secondaryDarkGray',
          'dark:group-data-[hover=true]:bg-appColors-black',
          'dark:group-data-[focus=true]:bg-appColors-black',
          'group-data-[hover=true]:bg-appColors-blueWhite',
          'group-data-[focus=true]:bg-appColors-blueWhite',
          'h-8',
        ],
      },
    },
  },
  defaultVariants: {
    color: 'searcher',
    textSize: 'base',
    removeLabel: true,
  },
})

