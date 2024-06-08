import * as Yup from 'yup';

export const initialValues={
  name: '',
  email: '',
  bio: '',
  jobTitle: '',
  company: '',
  location: '',
  programmingLanguages: [],
  skills: [],
  languagePreference: [],
  linkedInProfile: '',
  motivation: ''
}



export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string().required('Bio is required'),
  jobTitle: Yup.string().required('Job Title is required'),
  company: Yup.string(),
  location: Yup.string().required('Location is required'),
  programmingLanguages: Yup.array().of(Yup.string()).min(1, 'At least one programming language is required'),
  skills: Yup.array().of(Yup.string()).min(1, 'At least one skill is required'),
  languagePreference: Yup.array().of(Yup.string()).min(1, 'At least one language preference is required'),
  linkedInProfile: Yup.string().url('Invalid URL').required('LinkedIn Profile Link is required'),
  motivation: Yup.string().required('Motivation is required')
});