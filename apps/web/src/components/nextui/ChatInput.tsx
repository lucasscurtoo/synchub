import { extendVariants, Input } from '@nextui-org/react'

export const ChatInput = extendVariants(Input, {
  variants: {
    color: {
      chatInput: {
        input: [
          'px-2',
          '!text-appColors-textGray !text-base',
          'group-data-[focus=true]:!text-appColors-primaryText',
          'placeholder:text-sm',
          'placeholder:text-appColors-fadedGray',
          'dark:placeholder:text-appColors-lightGrayPrimary',
          'dark:!text-appColors-lightGrayPrimary',
          'dark:group-data-[focus=true]:!text-appColors-lightGrayPrimary',
          'caret-appColors-secondary',
        ],
        inputWrapper: [
          'rounded-md',
          'bg-appColors-blueWhite',
          'group-data-[hover=true]:bg-appColors-blueWhite',
          'group-data-[focus=true]:bg-appColors-blueWhite',
          'shadow-none',
          'rounded-full',
        ],
      },
    },
  },
  defaultVariants: {
    color: 'chatInput',
    removeLabel: true,
  },
})
