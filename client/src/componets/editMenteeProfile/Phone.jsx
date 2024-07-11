import React, { useEffect, useState } from 'react';
import { updateName } from '@/Api/services/menteeService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup here
import { toast } from 'sonner';
import { validationSchema } from '@/utils/validations/userSignupValidation';
import { CSpinner } from '@coreui/react';


function Phone({ phoneNo, menteeId, onUpdate }) {
  const initialPhoneValue = { phone: phoneNo };
  
  const handleSave = (values , {setSubmitting}) => {
    

    const promis =  new Promise ((res,rej)=>{
      
      setTimeout(() => {
        
        const editName = async () => {
          
          try {
            console.log(values);
          const data = await updateName('user/editProfile', { userId: menteeId, fieldName: "phone", newValue: values.phone });
          console.log(data.phone);
          onUpdate("phone",data.phone);
          setSubmitting(false);
          res(data)
          } catch (error) {
            
            setSubmitting(false);
            rej(error);
          }finally{
            setSubmitting(false);
          }
          // const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
        }
        editName();
      }, 1000);
    }) 

    toast.promise(promis, {
      loading: 'Updating..',
      success: (data) => {
        return `Phone number updated`;
      },
      error: 'Error',
    });

  }

  return (
    <Formik
      initialValues={initialPhoneValue}
      validationSchema={Yup.object({
        phone: validationSchema.fields.phone
      })}
      onSubmit={handleSave}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded-3xl shadow-md w-full md:w-1/1 border-solid border-3 border-black">
          <h3 className="text-xl font-bold font-inter mb-4">Update Phone Number</h3>
          <p className="text-gray-500 mb-4 font-inter">Your phone number is only visible to the people you communicate with.</p>
          <div className="mb-4">
            <label className="block text-gray-700 font-inter text-xs">Phone number</label>
            <Field
              type="text"
              name="phone"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 w-1/3 text-white py-2 px-4 rounded font-inter font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ?  "Saving" : 'Save'}
          </button>
        </Form>
      )}
        
      
    </Formik>

    
  );
}

export default Phone;