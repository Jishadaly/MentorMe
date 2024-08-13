import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '../../redux/services/userAuthServices'; // Import your password reset service
import { toast } from 'sonner';
import ReactLoading from 'react-loading';
import { useLocation } from 'react-router-dom';


function ResetPassword() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('token'); // Get the token from query parameters

    useEffect(() => {
        // Handle token validation or display an error if token is invalid/expired
        if (!token) {
            toast.error('Invalid or missing token');
        }
    }, [token]);

    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Must contain at least one number')
            .matches(/[!@#$%^&*]/, 'Must contain at least one special character'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (!token) {
                throw new Error('Token is missing');
            }
            const { password } = values;
            const data = {
                token,
                password
            }
            await resetPassword('user/resetPassword', data);
            toast.success('Password has been reset successfully');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-4xl font-bold mb-4 font-inter">Reset Password</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, values, touched, errors, isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700  font-inter">New Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="New Password"
                                    className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none shadow-sm p-2 font-inter"
                                    onChange={handleChange}
                                    value={values.password}
                                />
                                {touched.password && errors.password && (
                                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 font-inter">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none font-inter"
                                    onChange={handleChange}
                                    value={values.confirmPassword}

                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex justify-center items-center w-full bg-gradient-to-r from-indigo-600 to-purple-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 font-inter cursor-pointer"
                            >
                                {isSubmitting ? <ReactLoading type="spokes" color="#fff" height={20} width={20}  /> : 'Reset Password'}
                            </button>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ResetPassword;           