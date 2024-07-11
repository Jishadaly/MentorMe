import React, { useEffect, useState } from 'react';
import { updateName } from '@/Api/services/menteeService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup here
import { toast } from 'sonner';
import { validationSchema } from '@/utils/validations/userSignupValidation';
import { CSpinner } from '@coreui/react';


function ReserPassword({ menteeId, onUpdate }) {
  const initialPassValue = { password: " " };

  const handleSave = (values, { setSubmitting, resetForm }) => {

    console.log(values);
    const promis = new Promise((res, rej) => {

      setTimeout(() => {

        const editName = async () => {

          try {
            console.log(values);
            const data = await updateName('user/editProfile', { userId: menteeId, fieldName: "password", newValue: values.confirmPassword })
            console.log(data);
            setSubmitting(false);
            res(data)
          } catch (error) {
            setSubmitting(false);
            rej(error);
          } finally {
            setSubmitting(false);
          }
          
        }
        editName();
      }, 1000);
    })

    toast.promise(promis, {
      loading: 'Updating..',
      success: (data) => {
        resetForm()
        return `password reset successfully`;
      },
      error: 'Error',
    });
  }

  return (
    <Formik
      initialValues={initialPassValue}
      validationSchema={Yup.object({
        password: validationSchema.fields.password,
        confirmPassword: validationSchema.fields.confirmPassword
      })}
      onSubmit={handleSave}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded-3xl shadow-md w-full md:w-1/1 border-solid border-3 border-black">
          <h3 className="text-xl font-bold font-inter mb-4">Change password</h3>
          <p className="text-gray-500 mb-4 font-inter">Your new password must be a minimum of 8 characters
            and include at least one number, one capital letter,
            and one special character.</p>
          <div className="mb-4">
            <label className="block text-gray-700 font-inter text-xs">Password</label>
            <Field
              type="text"
              name="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-inter text-xs">New password</label>
            <Field
              type="text"
              name="confirmPassword"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 w-1/3 text-white py-2 px-4 rounded font-inter font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving" : 'Save'}
          </button>
        </Form>
      )}


    </Formik>


  );
}

export default ReserPassword;