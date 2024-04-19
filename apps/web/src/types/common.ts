import type { FieldMetaProps, FieldProps } from 'Formik'

export interface FieldType {
  field: React.Component<FieldProps['field']>
  meta?: FieldMetaProps<FieldProps>
}
