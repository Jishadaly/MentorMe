import * as Yup from 'yup'

export const initialValue ={
   email : '',
   password : '',
   confirmPassword :'',
   phone : '',
   name: ''
}


export  const  validationSchema = Yup.object({
	name: Yup.string()
		.max(30, 'Must be 30 characters or less')
		.required('Required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Required'),
	password: Yup.string()
		.required('Required')
		.min(8, 'Must be at least 8 characters')
		.matches(/[A-Z]/, 'Must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Must contain at least one number')
		.matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
	confirmPassword: Yup.string()
		.required('Required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	phone: Yup.string()
		.required('Required')
		.matches(/^\d{10}$/, 'Invalid phone number, must be 10 digits')
})
