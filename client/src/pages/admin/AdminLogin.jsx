import React from 'react';
import { Formik, Form } from 'formik';
import { validationShema, initialValue } from '@/utils/validations/loginValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '@/redux/adminAuthSlice';



function AdminLogin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.adminAuth);



  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Submitting form with values:', values);
    setSubmitting(true);
    const { email, password } = values

    dispatch(loginAdmin({endpoint:'admin/login' , adminData : {email, password}}))
      .unwrap()
      .then(() => {
        toast.success("admin logged succesfully");
        navigate('/admin/home');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.error)
      })


    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-black font-extrabold text-4xl font-sans">Sign in</h1>
            <p className="mt-2 text-gray-500">Sign in below to access your account</p>
          </div>
          <div className="mt-5">
            <Formik
              initialValues={initialValue}
              validationSchema={validationShema}
              onSubmit={handleSubmit}
            >

              {({ handleChange, values, errors, touched, isSubmitting }) => (



                <Form>
                  <div className="relative mt-8">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                      autoComplete="NA"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Email Address
                    </label>
                    {touched.email && errors.email && (<div className="absolute mt-1 text-red-500 text-sm">{errors.email}</div>)}
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Password
                    </label>
                    {touched.password && errors.password && (<div className="absolute mt-1 text-red-600 text-sm">{errors.password}</div>)}
                  </div>
                  <div className="my-6">
                    <button
                      type="submit"
                      className="w-full font-semibold rounded-md bg-[rgb(68,64,203)] font-sans  px-3 py-4 text-white focus:bg-[rgb(58,53,186)] focus:outline-none"
                    >
                      Sign in
                    </button>
                  </div>
                  {/* <p className="text-center text-sm text-gray-500">
                Don't have an account yet?
                <a
                  href="#!"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign up
                </a>
                .
              </p> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin
