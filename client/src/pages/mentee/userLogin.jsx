import React from 'react';
import { Formik, Form } from 'formik';
import { validationShema , initialValue } from '@/utils/validations/loginValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch , useSelector } from 'react-redux';
import { loginUser } from '@/redux/services/userAuthServices';


function UserLogin(){

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const handleSubmit = async (values, { setSubmitting }) => {
    
    setSubmitting(true);
    const { email, password } = values;
    dispatch(loginUser({ endpoint: 'user/login', userData: { email, password } }))
      .unwrap()
      .then(() => {
        toast.success("User logged in successfully");
        navigate('/mentee/home');
      })
      .catch((err) => {
        console.error("ererrer",err)
        toast.error(err.error)
      }
    );
  };

  
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Find Your Mentor</h1>
          <p className="text-white mt-1">The most popular mentorship platform</p>
          <button type="button" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <Formik
          initialValues={initialValue}
          validationSchema={validationShema}
          onSubmit={handleSubmit}
        >
          
          {({ handleChange, values, touched, errors, isSubmitting }) => (
            <Form className="bg-white">
              <h1 className="text-4xl font-black mb-4 font-sans">Login</h1>
              {error && <p>{error.message}</p>}
              <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
               
              </div>
              {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                
              </div>
              {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                {isSubmitting ? 'Submitting...' : 'Login'}
              </button>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-4 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <button
                type="button"
                className="flex items-center justify-center w-full border-2 border-gray-300 bg-white py-2 rounded-2xl text-gray-600 font-semibold mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.35 11.1h-9.1v2.73h5.27c-.23 1.37-.92 2.53-1.94 3.3v2.75h3.12c1.83-1.69 2.88-4.19 2.88-7.03 0-.66-.07-1.3-.2-1.92z" fill="#4285F4" />
                  <path d="M12.25 22c2.47 0 4.54-.82 6.06-2.22l-3.12-2.75c-.88.6-2.01.96-3.23.96-2.48 0-4.58-1.68-5.33-3.94H3.34v2.77C4.88 19.74 8.28 22 12.25 22z" fill="#34A853" />
                  <path d="M6.92 13.05c-.2-.6-.32-1.24-.32-1.91s.12-1.31.32-1.91V6.47H3.34c-.68 1.29-1.07 2.77-1.07 4.35s.39 3.06 1.07 4.35l3.58-2.12z" fill="#FBBC05" />
                  <path d="M12.25 4.96c1.34 0 2.55.46 3.49 1.36l2.6-2.6C16.8 2.33 14.72 1.33 12.25 1.33 8.28 1.33 4.88 3.59 3.34 6.47l3.58 2.12c.75-2.26 2.85-3.94 5.33-3.94z" fill="#EA4335" />
                </svg>
                Login with Google
              </button>
              <div className="mt-4">
                <span onClick={() => navigate('/signup')} className="text-sm font-sans">
                  Don't have an account? <a className="text-blue-500">Sign up</a>
                </span>
              </div>
              <div className="mt-4">
                <span onClick={() => navigate('/mentor/login')} className="text-sm font-sans cursor-pointer">
                   <a className="text-blue-500">login as a Mentor</a>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserLogin;
