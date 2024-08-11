import { postFeedback } from '@/Api/services/menteeService';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const Dialog = ({ children, isOpen, onClose }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">{children}</div>
  </div>
);

const DialogTrigger = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-2 right-2 bg-black rounded-full text-white w-5 h-5 flex items-center justify-center cursor-pointer"
  >
    {children}
  </button>
);

const DialogContent = ({ children, className }) => (
  <div className={`${className}`}>{children}</div>
);

const DialogHeader = ({ children }) => <div className="mb-4 ">{children}</div>;
const DialogTitle = ({ children }) => <h2 className="text-xl font-bold font-inter">{children}</h2>;
const DialogDescription = ({ children }) => <p className="text-sm text-gray-600 font-inter">{children}</p>;
const DialogFooter = ({ children }) => <div className="mt-4 flex justify-center">{children}</div>;


const Button = ({ children, type, onClick }) => (
  <button type={type} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md font-inter cursor-pointer" onClick={onClick}>{children}</button>
);

const Label = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 font-inter">{children}</label>;
const Textarea = ({ id, placeholder, className , onChange ,value }) => (
  <textarea id={id} placeholder={placeholder} onChange={onChange}  className={`font-inter mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${className}`} />
);


const StarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function Feedback({ isOpen, onClose  , sessionId , mentorId}) {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(`sessionId${sessionId} , mentorId${mentorId}`);
  },[])
  
  const handleSubmit = async()=>{
    if(text === ''){
      toast.info('Please write feedback')
      return;
    }
    try {

      const datas = {
         feedback: text,
         mentorId:mentorId,
         sessionId:sessionId,
         rating:'3.05'
      };

      const response  = await postFeedback('user/postFeedback' ,datas);
      console.log(response);
      setText('');
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-end ">
        <DialogTrigger onClick={onClose}>
          &times;
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave feedback</DialogTitle>
          <DialogDescription>We'd love to hear what went well or how we can improve the session experience..</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-2">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <StarIcon className="w-6 h-6 text-yellow-500" /> 
            <StarIcon className="w-6 h-6 text-gray-300" />
            <StarIcon className="w-6 h-6 text-gray-300" />
            <span className="text-sm text-gray-600">3.2 out of 5</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts on the mentoring session..."
              className="min-h-[150px]"
              onChange={(e) => setText(e.target.value)}
              value={text} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} >Submit </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Feedback;