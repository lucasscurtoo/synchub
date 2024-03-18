import { Input } from '@nextui-org/react'

interface InputProps {
  label: string
  value: string
  description?: string
  onChange?: (e: any) => void
}

const CustomInput = ({ label, value, description, onChange }: InputProps) => {
  return (
    <Input
      label={label}
      labelPlacement='outside'
      value={value}
      description={description}
      onChange={onChange}
      classNames={{
        input: [
          'bg-transparent !text-appColors-textGray !text-base',
          'group-data-[focus=true]:!text-appColors-text',
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
          '!text-appColors-textGray text-lg !font-normal',
          'group-data-[focus=true]:!text-appColors-text',
        ],
      }}
    />
  )
}
export default CustomInput
