  import React from 'react';
  import {  toast } from 'sonner'
  import { useNavigate } from 'react-router-dom';

  import { verifyOTP } from '@/Api/services/auth/user-auth-service';
  import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
  } from "@material-tailwind/react";

    export function OtpModal({ isOpen, onClose , email }) {
      
      const [otp,setOtp] = React.useState('');
      const [timeLeft, setTimeLeft] = React.useState(60); // Initial time left: 60 seconds
      const navigate = useNavigate();
    
      React.useEffect(() => {
        if (isOpen) {
          const timer = setTimeout(() => {
            if (timeLeft > 0) {
              setTimeLeft(prevTime => prevTime - 1);
            }
          }, 1000);
    
          
          return () => clearTimeout(timer);
        }
      }, [isOpen, timeLeft]);



      const handleChange = (e) => {
            setOtp(e.target.value)
      }

      const handleVerify = async() =>{
        try {
          console.log("//",otp)
          const data = { otp , email }
          const response = await verifyOTP('user/verifyOTP', data );
          const userId = response.data.response._id;
          toast.success(response.data.message)
          navigate( `/chooseRole/${userId}`);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(`Error: ${error.response.data.error}`);
        } else {
          toast.error("An unexpected error occurred");
        }
        console.log(error);
        }
      }

    return (
      <Dialog open={isOpen} size="xs" handler={onClose}>
        <div className="flex items-center justify-between px-4 pt-4">
          
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Verify OTP
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 cursor-pointer"
            onClick={onClose}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody className="px-4 pb-4">
          <Typography className="mb-4" color="gray" variant="lead">
            Please enter the OTP sent to your email. <span className='text-sm text-red-800'>{timeLeft} seconds remaining.</span>
            </Typography>

            <div className="mb-4">
            <Input className="text-center" maxLength={4} placeholder="Enter OTP" value={otp} onChange={handleChange} />
          </div>
          <Button variant="text" color="indigo" className="w-full">
            Resend OTP
          </Button>
        </DialogBody>
        <DialogFooter className="space-x-2 px-4 pb-4">
          <Button variant="text" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gradient" color="indigo" onClick={handleVerify} >
            Verify
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }
