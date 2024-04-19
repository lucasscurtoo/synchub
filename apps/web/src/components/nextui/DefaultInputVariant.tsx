import { extendVariants, Input } from '@nextui-org/react'

export const DefaultInputVariant = extendVariants(Input, {
  variants: {
    color: {
      defaultVariant: {
        input: [
          'bg-transparent !text-appColors-textGray !text-base',
          'group-data-[focus=true]:!text-appColors-text',
          'placeholder:text-sm',
          '!placeholder-appColors-textGray',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
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
        description: 'text-appColors-fadedGray text-sm',
        label: [
          '!text-appColors-text text-lg !font-normal',
          'group-data-[focus=true]:!text-appColors-text',
        ],
        errorMessage: 'absolute',
      },
    },
  },
  defaultVariants: {
    color: 'defaultVariant',
    removeLabel: true,
  },
})
