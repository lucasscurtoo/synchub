import { extendVariants, Input } from '@nextui-org/react'

export const GrayInputVariant = extendVariants(Input, {
  variants: {
    color: {
      gray: {
        inputWrapper: [
          '!font-inter',
          'rounded-md',
          'shadow-xl',
          'bg-transparent',
          'hover:bg-transparent',
          'group-data-[hover=true]:bg-transparent',
          'group-data-[focus=true]:bg-transparent',
          'ring-1',
          'ring-inset',
          '!ring-appColors-gray/30',
        ],
        input: [
          'bg-transparent !text-appColors-textGray !text-base',
          'group-data-[focus=true]:!text-appColors-text',
          '!placeholder-appColors-textGray',
          'placeholder:text-sm',
        ],
        innerWrapper: 'bg-transparent',

        description: 'text-appColors-fadedGray text-sm',
        label: [
          '!text-appColors-textGray text-lg',
          'group-data-[focus=true]:!text-appColors-text',
        ],
      },
    },
  },
  defaultVariants: {
    color: 'gray',
    textSize: 'base',
    removeLabel: true,
  },
})
