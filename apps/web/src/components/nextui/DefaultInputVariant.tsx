import { extendVariants, Input } from '@nextui-org/react'

export const DefaultInputVariant = extendVariants(Input, {
  variants: {
    color: {
      defaultVariant: {
        input: [
          'bg-transparent !text-appColors-textGray !text-base',
          'group-data-[focus=true]:!text-appColors-primaryText',
          'placeholder:text-sm',
          'placeholder:text-appColors-textGray',
          'dark:placeholder:text-appColors-lightGrayPrimary',
          'dark:!text-appColors-lightGrayPrimary',
          'dark:group-data-[focus=true]:!text-appColors-lightGrayPrimary',
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
          '!text-appColors-primaryText text-lg !font-normal',
          'group-data-[focus=true]:!text-appColors-primaryText',
          'group-data-[focus=true]:!text-appColors-blueWhite',
          'dark:!text-appColors-blueWhite',
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

