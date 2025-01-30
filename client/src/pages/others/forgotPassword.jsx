import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { sendForgotLink } from '../../redux/services/userAuthServices';
import { toast } from 'sonner';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate('');

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Please enter a valid email address'
            )
            .test(
                'is-not-temporary',
                'Temporary email addresses are not allowed',
                (value) => !/(mailinator|temp-mail|yopmail)/i.test(value)
            )
    });


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
           
            const response = await sendForgotLink('user/sendForgotPasswordLink', values);
            toast.success('resend password sended in your mail , check your mail');
            setSubmitting(false)
            resetForm()
        } catch (error) {
            toast.error(error.message)
            setSubmitting(false)
        }
    }

    return (
        <div className="h-screen md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-extrabold text-4xl font-inter">Forgot Password</h1>
                    <p className="text-white mt-1 font-inter">Enter your email to reset your password</p>
                    <button type="button" onClick={() => navigate('/')} className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
                        Go home
                    </button>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, touched, errors, isSubmitting }) => (
                        <Form className="bg-white">
                            <h1 className="text-4xl font-black mb-4 font-inter">Forgot Password</h1>
                            <p className="text-sm font-normal text-gray-600 mb-7 font-inter">Enter your email to receive a password reset link</p>

                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input
                                    className="pl-2 outline-none border-none font-inter"
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                {touched.email && errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 font-inter"
                            >
                                {isSubmitting ? <ReactLoading type="cylon" color="#4338CA" height={10} width={10} /> : 'send password reset link'}
                            </button>

                            <div className="mt-4">
                                <span onClick={() => navigate('/signup')} className="text-sm font-inter">
                                    Don't have an account? <a className="text-blue-500">Sign up</a>
                                </span>
                            </div>

                        </Form>
                    )}
                </Formik>



            </div>

        </div>
    );
}

export default ForgotPassword;