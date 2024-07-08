import { Input } from '@nextui-org/react'
import type { FieldMetaProps, FieldProps } from 'formik'

interface FormInputProps {
  type: string
  name: string
  label: string
  icon?: JSX.Element
  isInvalid?: boolean
  field: React.Component<FieldProps['field']>
  meta?: FieldMetaProps<FieldProps>
}

export function FormInput({
  type,
  name,
  label,
  icon,
  field,
  meta,
}: FormInputProps): JSX.Element {
  return (
    <div className='flex w-full'>
      <Input
        classNames={
          !meta?.error && meta?.touched
            ? {
                input: ['bg-transparent', 'text-gray-500', 'text-sm'],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'shadow-md',
                  'bg-transparent',
                  'hover:bg-transparent',
                  'group-data-[hover=true]:bg-transparent',
                  'group-data-[focus=true]:bg-transparent',
                  'group-data-[focus=true]:ring-1',
                  'ring-inset',
                  'ring-gray-400',
                ],
                label: 'text-gray-600',
              }
            : {}
        }
        color={meta?.error && meta.touched ? 'danger' : 'default'}
        endContent={icon}
        errorMessage={meta?.error && meta.touched ? meta.error : ''}
        isInvalid={Boolean(meta?.touched && meta.error)}
        label={label}
        labelPlacement='outside'
        name={name}
        placeholder=' '
        type={type}
        {...field}
      />
    </div>
  )
}

