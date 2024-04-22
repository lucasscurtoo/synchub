import * as Yup from 'yup'

export const userDetailsSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(/^[a-zA-Z ]*$/, 'Only characters are allowed'),
  profesionalRole: Yup.string()
    .required('Profesional role is required')

    .matches(/^[a-zA-Z ]*$/, 'Only characters are allowed'),
  status: Yup.string()
    .notRequired()
    .matches(/^[a-zA-Z\s\W]+$/, 'Not numbers allowed'),

  profilePicture: Yup.mixed().required('Profile picture is required'),
})

