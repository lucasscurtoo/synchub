import type { FieldMetaProps, FieldProps } from 'formik'

export interface FieldType {
  field: React.Component<FieldProps['field']>
  meta?: FieldMetaProps<FieldProps>
}

