import { extendVariants, Input } from '@nextui-org/react'

export const CustomSearcherInput = extendVariants(Input, {
  variants: {
    color: {
      searcher: {
        input: ['bg-transparent', 'placeholder:text-appColors-fadedGray'],
        inputWrapper: [
          'shadow-none',
          'w-full',
          'bg-appColors-blueWhite',
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

