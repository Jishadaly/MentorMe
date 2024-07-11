import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  summary: Yup.string()
    .required('Summary is required')
    .test(
      'max-words',
      'Summary must be 200 words or less',
      value => value && value.split(' ').length <= 200
    ),
  image: Yup.mixed().required('Image is required'),
});