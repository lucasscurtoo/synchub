import * as Yup from 'yup'

export const userDetailsSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  profesionalRole: Yup.string().required('Profesional role is required'),
  status: Yup.string().required('Status is required'),
  profilePicture: Yup.mixed().required('Profile picture is required'),
})
