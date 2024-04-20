import { ReactElement } from 'react'
import type { FieldMetaProps, FieldProps } from 'Formik'
import { DefaultInputVariant } from '../nextui/DefaultInputVariant'

interface InputProps {
  label: string
  value?: string
  description?: string
  placeholder?: string
  onChange?: (e: any) => void
  icon?: ReactElement
  field?: React.Component<FieldProps['field']>
  meta?: FieldMetaProps<FieldProps>
  name: string
  type: string
  isRequired?: boolean
}

const CustomInput = ({
  label,
  value,
  description,
  placeholder,
  onChange,
  icon,
  field,
  meta,
  name,
  type,
  isRequired,
}: InputProps) => {
  return (
    <DefaultInputVariant
      name={name}
      label={label}
      labelPlacement='outside'
      placeholder={placeholder}
      value={value}
      description={description}
      onChange={onChange}
      endContent={icon}
      isRequired={isRequired}
      color='defaultVariant'
      errorMessage={meta?.error && meta.touched ? meta.error : ''}
      isInvalid={Boolean(meta?.touched && meta.error)}
      type={type}
      {...field}
    />
  )
}
export default CustomInput
