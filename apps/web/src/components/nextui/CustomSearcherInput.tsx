import { extendVariants, Input } from '@nextui-org/react'

export const CustomSearcherInput = extendVariants(Input, {
  variants: {
    color: {
      searcher: {
        input: ['bg-transparent', 'placeholder:text-appColors-fadedGray'],
        inputWrapper: [
          'shadow-none',
          'w-full',
          'bg-appColors-backgroundBlue',
          'group-data-[hover=true]:bg-appColors-backgroundBlue',
          'group-data-[focus=true]:bg-appColors-backgroundBlue',
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
