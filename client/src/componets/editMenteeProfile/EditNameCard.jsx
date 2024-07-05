// import React, { useEffect, useState } from 'react';
// import { updateName } from '@/Api/services/menteeService';
// import { toast } from 'sonner';

// function EditNameCard({ name, menteeId, onUpdate }) {
//   const [userName, setUserName] = useState('');
//   const [laoding, setLoading] = useState(false)
  

//   const handleFirstNameChange = (e) => setUserName(e.target.value);

//   useEffect(() => {
//     setUserName(name);
//   }, [name]);

//   const handleSave = () => {
//     setLoading(true);

//     const promis =  new Promise ((res,rej)=>{
//       setTimeout(() => {
//         const editName = async () => {

//           try {
//           const data = await updateName('user/editProfile', { userId: menteeId, fieldName: "name", newValue: userName });
//           console.log(data);
//           setUserName(data.userName);
//           onUpdate("userName",data.userName);
//           setLoading(false);
//           res(data)
//           } catch (error) {
//             setLoading(false);
//             console.log(error.response.data);
//             rej(error.response);
//           }
//           // const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
//         }
//         editName();
//       }, 1000);
//     }) 

//     toast.promise(promis, {
//       loading: 'Loading...',
//       success: (response) => {
//         return `User name updated`;
//       },
//       error: (err)=> err.data
//     });

//   }

//   return (
//     <div className="bg-white p-6 rounded-3xl shadow-md w-full md:w-1/1 border-solid border-3 border-black">
//       <h3 className="text-xl font-bold font-inter mb-4">Update name</h3>
//       <p className="text-gray-500 mb-4">Your name is only visible to the people you communicate with.</p>
//       <div className="mb-4">
//         <label className="block text-gray-700">First name</label>
//         <input
//           type="text"
//           value={userName}
//           onChange={handleFirstNameChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//         />
//       </div>
//       <button
//         className="bg-indigo-500 w-1/3 text-white py-2 px-4 rounded"
//         onClick={handleSave}
//       >
//         {laoding ? ' Saving' : ' Save'}
//       </button>
//     </div>
//   );
// }

// export default EditNameCard;





import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateName } from '@/Api/services/menteeService';
import { toast } from 'sonner';
import { CSpinner } from '@coreui/react';


const EditNameCard = ({ name, menteeId, onUpdate }) => {
  
  const formik = useFormik({
    initialValues: {
      userName: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const data = await updateName('user/editProfile', {
              userId: menteeId,
              fieldName: 'name',
              newValue: values.userName,
            });
            setSubmitting(false);
            onUpdate('userName', data.userName);
            resolve(data);
          } catch (error) {
            setSubmitting(false);
            reject(error.response.data);
          }
        }, 1000);
      });

      toast.promise(promise, {
        loading: 'Saving...',
        success: 'User name updated successfully',
        error: (err) => `Error: ${err}`,
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue('userName', name);
  }, [name]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md w-full md:w-1/1 border-solid border-3 border-black">
      <h3 className="text-xl font-bold font-inter mb-4">Update name</h3>
      <p className="text-gray-500 mb-4">Your name is only visible to the people you communicate with.</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="userName">
            First name
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            className={`mt-1 p-2 border rounded w-full ${
              formik.touched.userName && formik.errors.userName
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-red-500 text-sm">{formik.errors.userName}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 w-1/3 text-white py-2 px-4 rounded"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "saving" : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default EditNameCard;
