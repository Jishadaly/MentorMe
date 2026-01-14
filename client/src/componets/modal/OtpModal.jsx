// import React, { useState, useRef } from 'react';
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom';

// import { verifyOTP, resendOtp } from '@/Api/services/auth/user-auth-service';
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Input,
//   Typography,
// } from "@material-tailwind/react";

// export function OtpModal({ isOpen, onClose, email }) {

//   const [otp, setOtp] = useState('');
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [showResentOtpBtn, setShowResentOtpBtn] = useState(false);
//   const intervalRef = useRef(null)
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime > 0) {
//             return prevTime - 1;
//           } else {
//             setShowResentOtpBtn(true);
//             clearInterval(intervalRef.current);
//             intervalRef.current = null;
//             return 0;
//           }
//         });
//       }, 1000);
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, []);

//   const handleChange = (e) => {
//     setOtp(e.target.value)
//   }

//   const handleVerify = async () => {
//     try {

//       const data = { otp, email }
//       const response = await verifyOTP('user/verifyOTP', data);
//       const userId = response.data.response._id;
//       toast.success(response.data.message)
//       navigate(`/chooseRole/${userId}`);
//     } catch (error) {
//       toast.error(error.response.data)
//     }
//   }

//   const handleResendOtp = () => {
//     setTimeLeft(60);
//     setShowResentOtpBtn(false);
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     intervalRef.current = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime > 0) {
//           return prevTime - 1;
//         } else {
//           setShowResentOtpBtn(true);
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//           return 0;
//         }
//       });
//     }, 1000);

//     new Promise((resolve, reject) => {
//       resendOtp('user/resendOtp', email)
//         .then(response => {
//           resolve(response)
//         })
//         .catch(error => {
//           reject(error)
//         })
//     })
//       .then(response => {
//         console.log("resend otp succefully", response);
//       }).catch((error) => {
//         console.log(error);
//       })

//   }

//   return (
//     <Dialog open={isOpen} size="xs" handler={onClose}>
//       <div className="flex items-center justify-between px-4 pt-4">

//         <DialogHeader className="flex flex-col items-start">
//           <Typography className="mb-1" variant="h4">
//             Verify OTP
//           </Typography>
//         </DialogHeader>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="h-5 w-5 cursor-pointer"
//           onClick={onClose}
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//       <DialogBody className="px-4 pb-4">
//         <Typography className="mb-4" color="gray" variant="lead">
//           Please enter the OTP sent to your email. <span className='text-sm text-red-800'>{timeLeft} seconds remaining. </span>
//         </Typography>

//         <div className="mb-4">
//           <Input className="text-center" maxLength={4} placeholder="Enter OTP" value={otp} onChange={handleChange} />
//         </div>
//         {showResentOtpBtn && <Button onClick={handleResendOtp} variant="text" color="indigo" className="w-full">
//           Resend OTP
//         </Button>}

//       </DialogBody>
//       <DialogFooter className="space-x-2 px-4 pb-4">
//         <Button variant="text" color="gray" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="gradient" color="indigo" onClick={handleVerify} >
//           Verify
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { verifyOTP, resendOtp } from "@/Api/services/auth/user-auth-service";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";

export function OtpModal({ isOpen, onClose, email }) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResendBtn, setShowResendBtn] = useState(false);

  const intervalRef = useRef(null);
  const navigate = useNavigate();

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!isOpen) return;

    startTimer();

    return () => clearTimer();
  }, [isOpen]);

  const startTimer = () => {
    clearTimer();
    setTimeLeft(60);
    setShowResendBtn(false);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setShowResendBtn(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  /* ================= HANDLERS ================= */
  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      const response = await verifyOTP("user/verifyOTP", { otp, email });
      const userId = response.data.response._id;

      toast.success(response.data.message);
      onClose();
      navigate(`/chooseRole/${userId}`);
    } catch (error) {
      toast.error(error?.response?.data || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp("user/resendOtp", email);
      toast.success("OTP resent successfully");
      startTimer();
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <Dialog open={isOpen} size="xs" handler={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <DialogHeader className="flex flex-col items-start p-0">
          <Typography variant="h4" className="font-bold">
            Verify OTP 🔐
          </Typography>
          <Typography variant="small" color="gray">
            Enter the 4-digit code sent to your email
          </Typography>
        </DialogHeader>

        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      {/* Body */}
      <DialogBody className="px-5 py-6">
        <div className="text-center mb-4">
          <Typography variant="small" color="gray">
            Time remaining:
            <span className="text-red-600 font-semibold ml-1">
              {timeLeft}s
            </span>
          </Typography>
        </div>

        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={4}
          placeholder="••••"
          className="text-center text-lg tracking-widest"
        />

        {showResendBtn && (
          <Button
            variant="text"
            color="indigo"
            onClick={handleResendOtp}
            className="w-full mt-4"
          >
            Resend OTP
          </Button>
        )}
      </DialogBody>

      {/* Footer */}
      <DialogFooter className="px-5 pb-5 gap-2">
        <Button variant="text" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="indigo" onClick={handleVerify}>
          Verify
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
