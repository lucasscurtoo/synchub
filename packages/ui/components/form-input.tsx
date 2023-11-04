import { Input } from '@nextui-org/react'

interface FormInputProps {
  type: string
  name: string
  label: string
  icon?: JSX.Element
}

export function FormInput({
  type,
  name,
  label,
  icon,
}: FormInputProps): JSX.Element {
  return (
    <div className='flex w-full'>
      <Input
        classNames={{
          input: ['bg-transparent', 'text-gray-500', 'text-sm'],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'bg-transparent',
            'shadow-md',
            'hover:bg-transparent',
            'group-data-[hover=true]:bg-transparent',
            'group-data-[focus=true]:bg-transparent',
            'group-data-[focus=true]:ring-1',
            'ring-inset',
            'ring-gray-400',
          ],
          label: 'text-gray-600',
        }}
        endContent={icon}
        label={label}
        labelPlacement='outside'
        name={name}
        placeholder=' '
        type={type}
      />
    </div>
  )
}
