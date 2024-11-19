import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { validationShema, initialValue } from '@/utils/validations/loginValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/services/userAuthServices';
import ReactLoading from 'react-loading';
import GoogleLoginButton from '../../componets/GoogleLoginButton';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/utils/fireBase/config';
import { googleAuth } from '@/redux/services/userAuthServices';


function UserLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

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
        console.error("ererrer", err)
        toast.error(err)
      }
      );


  };

  const handleGoogleAuthClick = async () => {

    await signInWithPopup(auth, provider).then((data) => {
 
       const userData = {
         name: data.user.displayName,
         email: data.user.email,
         profilePic: data.user.photoURL
       }
 
       dispatch(googleAuth({ endpoint: "user/googleLogin", userData: userData }))
         .unwrap()
         .then(() => {
           toast.success("User logged in successfully");
           navigate('/mentee/home');
         })
         .catch((err) => {
           console.error(err)
           toast.error("google authentication failed please try again")
         }
         );
     });
   }


  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-inter">Find Your Mentor</h1>
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
                  type={showPassword ? 'text' : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.003 9.003 0 013.06 9.06m0 0A9.003 9.003 0 0118.825 13.875M12 4.5c3.196 0 6.035 1.527 7.875 4m0 0a9.003 9.003 0 01-13.75 0m7.875 4c-1.44 0-2.88-.56-3.975-1.875M9 9l.016-.011A5.978 5.978 0 0112 7.5c1.5 0 2.879.562 3.984 1.487M15 15l-.016.011A5.978 5.978 0 0112 16.5c-1.5 0-2.879-.562-3.984-1.487" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.06 9.06a9.003 9.003 0 0115.765 4.814m0 0A9.003 9.003 0 013.06 9.06m0 0a9.003 9.003 0 0115.765 4.814M12 4.5c3.196 0 6.035 1.527 7.875 4m0 0a9.003 9.003 0 01-13.75 0m7.875 4c-1.44 0-2.88-.56-3.975-1.875M9 9l.016-.011A5.978 5.978 0 0112 7.5c1.5 0 2.879.562 3.984 1.487M15 15l-.016.011A5.978 5.978 0 0112 16.5c-1.5 0-2.879-.562-3.984-1.487" />
                  )}
                </svg>

              </div>
              {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 font-inter"
              >
                {isSubmitting ? <ReactLoading type="spokes" color="#fff" height={20} width={20} /> : 'Login'}
              </button>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-4 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <GoogleLoginButton handleGoogleAuthClick={handleGoogleAuthClick }  />
              <div className="mt-4">
                <span onClick={() => navigate('/signup')} className="text-sm font-sans ">
                  Don't have an account? <a className="text-blue-500">Sign up</a>
                </span>
              </div>
              <div >
              <span onClick={() => navigate('/mentor/login')} className="text-sm font-sans cursor-pointer">
                login as a Mentor? <a className="text-blue-500">mentor login</a>
                </span>
              </div>
              
              <div >
                <span onClick={() => navigate('/forgotPassword')} className="text-sm font-sans">
                  Don't know the password? <a className="text-blue-500">forgot password</a>
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