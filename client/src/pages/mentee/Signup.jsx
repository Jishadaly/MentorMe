// import { Formik, Form } from 'formik';
// import { validationSchema, initialValue } from '../../utils/validations/userSignupValidation';
// import { userRegister } from '../../Api/services/auth/user-auth-service';
// import { useState } from 'react';
// import { OtpModal } from '@/componets/modal/OtpModal';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '@/utils/fireBase/config';
// import { googleAuth } from '@/redux/services/userAuthServices';
// import { useDispatch } from 'react-redux';
// import GoogleLoginButton from '@/componets/GoogleLoginButton';
// import ReactLoading from 'react-loading';

// const Signup = () => {

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setUserEmail(values.email);
//     setSubmitting(true);

//     try {
//       await userRegister('user/signup', values);
//       setIsModalOpen(true);

//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data)
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   console.log(userEmail)

//   const handleModalCloseup = () => {
//     setIsModalOpen(false);
//   }


//   const handleGoogleAuthClick = async () => {

//    await signInWithPopup(auth, provider).then((data) => {

//       const userData = {
//         name: data.user.displayName,
//         email: data.user.email,
//         profilePic: data.user.photoURL
//       }

//       dispatch(googleAuth({ endpoint: "user/googleLogin", userData: userData }))
//         .unwrap()
//         .then(() => {
//           toast.success("User logged in successfully");
//           navigate('/mentee/home');
//         })
//         .catch((err) => {
//           console.error(err)
//           toast.error("google authentication failed please try again")
//         }
//         );
//     });
//   }

//   return (
//     <div className="h-screen md:flex">
//       <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
//         <div>
//           <h1 className="text-white font-bold text-4xl font-sans">Find Your Mentor</h1>
//           <p className="text-white mt-1">The most popular mentorship platform</p>
//           <button type="button" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
//             Read More
//           </button>
//         </div>
//         <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
//         <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
//         <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
//         <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
//       </div>
//       <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
//         <Formik
//           initialValues={initialValue}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {

//             ({ handleChange, values, handleSubmit, touched, errors, isSubmitting }) => (

//               <Form className="bg-white" onSubmit={handleSubmit}>
//                 <h1 className="text-4xl font-black mb-4 font-sans ">Register</h1>
//                 <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

//                 {touched.name && errors.name && <div className="text-red-400 font-inter text-sm ">{errors.name}</div>}
//                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                   <input className="pl-2 outline-none border-none" type="text" placeholder="Full name" name='name' onChange={handleChange} value={values.name} />
//                 </div>

//                 {touched.email && errors.email && <div className="text-red-400 font-inter text-sm">{errors.email}</div>}
//                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                   </svg>
//                   <input
//                     className="pl-2 outline-none border-none"
//                     type="text"
//                     placeholder="Email Address"
//                     name='email'
//                     onChange={handleChange}
//                     value={values.email} />
//                 </div>

//                 {touched.phone && errors.phone && <div className="text-red-400 font-inter text-sm">{errors.phone}</div>}
//                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//                   </svg>
//                   <input className="pl-2 outline-none border-none"
//                     type="text"
//                     placeholder="Phone"
//                     name='phone'
//                     onChange={handleChange}
//                     value={values.phone} />

//                 </div>

//                 {touched.password && errors.password && <div className="text-red-400 font-inter text-sm">{errors.password}</div>}
//                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                   <input className="pl-2 outline-none border-none"
//                     type={showPassword ? "text" : 'password'}
//                     placeholder="Password"
//                     name='password'
//                     onChange={handleChange}
//                     value={values.password} />

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-400 cursor-pointer"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.003 9.003 0 013.06 9.06m0 0A9.003 9.003 0 0118.825 13.875M12 4.5c3.196 0 6.035 1.527 7.875 4m0 0a9.003 9.003 0 01-13.75 0m7.875 4c-1.44 0-2.88-.56-3.975-1.875M9 9l.016-.011A5.978 5.978 0 0112 7.5c1.5 0 2.879.562 3.984 1.487M15 15l-.016.011A5.978 5.978 0 0112 16.5c-1.5 0-2.879-.562-3.984-1.487" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.06 9.06a9.003 9.003 0 0115.765 4.814m0 0A9.003 9.003 0 013.06 9.06m0 0a9.003 9.003 0 0115.765 4.814M12 4.5c3.196 0 6.035 1.527 7.875 4m0 0a9.003 9.003 0 01-13.75 0m7.875 4c-1.44 0-2.88-.56-3.975-1.875M9 9l.016-.011A5.978 5.978 0 0112 7.5c1.5 0 2.879.562 3.984 1.487M15 15l-.016.011A5.978 5.978 0 0112 16.5c-1.5 0-2.879-.562-3.984-1.487" />
//                     )}
//                   </svg>

//                 </div>

//                 {touched.confirmPassword && errors.confirmPassword && <div className="text-red-400 font-inter text-sm">{errors.confirmPassword}</div>}
//                 <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
                  
//                   <input className="pl-2 outline-none border-none"
//                     type={showConfirmPassword ? "text" : 'password'}
//                     placeholder="Confrm Password"
//                     name='confirmPassword'
//                     onChange={handleChange}
//                     value={values.confirmPassword} />

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-400 cursor-pointer"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showPassword ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.003 9.003 0 013.06 9.06m0 0A9.003 9.003 0 0118.825 13.875M12 4.5c3.196 0 6.035 1.527 7.875 4m0 0a9.003 9.003 0 01-13.75 0m7.875 4c-1.44 0-2.88-.56-3.975-1.875M9 9l.016-.011A5.978 5.978 0 0112 7.5c1.5 0 2.879.562 3.984 1.487M15 15l-.016.011A5.978 5.978 0 0112 16.5c-1.5 0-2.879-.562-3.984-1.487" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.06 9.06a9.003 9.003 0 0115.765 4.814m0 0A9.003 9.003 0 013.06 9.06m0 0a9.003 9.003 0 0115.765 4.814M12 4.5c3.196 0 6.035 1.527 7.875 4m0 0a9.003 9.003 0 01-13.75 0m7.875 4c-1.44 0-2.88-.56-3.975-1.875M9 9l.016-.011A5.978 5.978 0 0112 7.5c1.5 0 2.879.562 3.984 1.487M15 15l-.016.011A5.978 5.978 0 0112 16.5c-1.5 0-2.879-.562-3.984-1.487" />
//                     )}
//                   </svg>
//                 </div>
//                 <button type="submit"
//                   disabled={isSubmitting}
//                   className="block w-full bg-gradient-to-r from-indigo-600 to-purple-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 font-inter"
//                 >
//                   {isSubmitting ? <ReactLoading type="spokes" color="#fff" height={20} width={20} /> : 'Signup'}
//                 </button>
//                 <div className="flex items-center my-4">
//                   <hr className="flex-grow border-gray-300" />
//                   <span className="px-4 text-gray-500">or</span>
//                   <hr className="flex-grow border-gray-300" />
//                 </div>

//                 <GoogleLoginButton handleGoogleAuthClick={handleGoogleAuthClick} />

//                 <div className="mt-4">
//                   <span onClick={() => navigate('/mentee/login')} className="text-sm font-sans " >Already have an account? <a className="text-blue-500">Sign in</a></span>
//                 </div>
//               </Form>
//             )}

//         </Formik>


//       </div>

//       <OtpModal isOpen={isModalOpen} onClose={handleModalCloseup} email={userEmail} />
//     </div>
//   );
// }

// export default Signup;




import { Formik, Form } from "formik";
import { validationSchema, initialValue } from "../../utils/validations/userSignupValidation";
import { userRegister } from "../../Api/services/auth/user-auth-service";
import { useState } from "react";
import { OtpModal } from "@/componets/modal/OtpModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/fireBase/config";
import { googleAuth } from "@/redux/services/userAuthServices";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "@/componets/GoogleLoginButton";
import ReactLoading from "react-loading";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    setUserEmail(values.email);
    setSubmitting(true);

    try {
      await userRegister("user/signup", values);
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error?.response?.data || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuthClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);

      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        profilePic: data.user.photoURL,
      };

      await dispatch(
        googleAuth({ endpoint: "user/googleLogin", userData })
      ).unwrap();

      toast.success("User logged in successfully");
      navigate("/mentee/home");
    } catch (err) {
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join MentorMe and start learning
          </p>
        </div>

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, touched, errors, isSubmitting }) => (
            <Form className="space-y-4">

              {/* Name */}
              <div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-indigo-500">
                  <User size={18} className="text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent text-sm"
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-indigo-500">
                  <Mail size={18} className="text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent text-sm"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-indigo-500">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={values.phone}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent text-sm"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-indigo-500">
                  <Lock size={18} className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-indigo-500">
                  <Lock size={18} className="text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-xl font-semibold"
              >
                {isSubmitting ? (
                  <ReactLoading type="spin" color="#fff" height={22} width={22} />
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Google */}
              <GoogleLoginButton handleGoogleAuthClick={handleGoogleAuthClick} />

              {/* Footer */}
              <div className="text-center text-sm mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/mentee/login")}
                  className="text-indigo-600 cursor-pointer font-medium"
                >
                  Sign in
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <OtpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={userEmail}
      />
    </div>
  );
};

export default Signup;
