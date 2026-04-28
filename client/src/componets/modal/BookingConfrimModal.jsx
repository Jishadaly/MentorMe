// import { createCheckoutSession } from "@/Api/services/menteeService";
// import moment from "moment";


// function BookingConfirmModal({ onClose, mentorData, mentee, slot, price }) {

//   const handleAccept = async () => {

//     const slotId = slot._id;
//     const mentor = mentorData.user._id;

//     try {
//       const data = await createCheckoutSession('user/create-checkout-session',
//         { mentee, mentor, slotId, price });
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         console.error('Error: No URL returned from server');
//       }

//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//     }
//   };


//   return (
//     <div
//       id="static-modal"
//       data-modal-backdrop="static"
//       tabIndex="-1"
//       aria-hidden="true"
//       className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
//     >
//       <div className="relative w-full max-w-2xl p-4 max-h-full">
//         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//           <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//             <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
//               Booking Confirmation
//             </h3>
//             <button
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//               onClick={onClose}
//             >
//               <svg
//                 className="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>
//           <div className="p-4 md:p-5 space-y-4">
//             <p className="text-base leading-relaxed text-gray-800 font-inter">
//               You are about to book a mentorship session with our expert developer, {mentorData.name}.
//             </p>
//             <p className="text-base leading-relaxed text-gray-800 font-inter">
//               This one-hour mentorship session will provide you with the opportunity to discuss your project, get valuable insights, and receive guidance tailored to your needs.
//             </p>
//             <p className="text-base leading-relaxed text-gray-800 font-inter">
//               Please confirm the following details:
//             </p>
//             <ul className="text-base leading-relaxed text-gray-800 font-inter">
//               <li>Date: {moment(slot.date).format('MMMM Do, YYYY')}</li>
//               <li>Time: {moment(slot.startTime, 'HH:mm').format('h:mm A')} - {moment(slot.endTime, 'HH:mm').format('h:mm A')}</li>
//             </ul>
//             <p className="text-base leading-relaxed text-gray-800 font-inter">
//               Click "Confirm" to proceed with the booking. We look forward to helping you achieve your goals!
//             </p>
//           </div>
//           <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//             <button
//               onClick={handleAccept}
//               type="button"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-inter"
//             >
//               I accept
//             </button>
//             <button
//               onClick={onClose}
//               type="button"
//               className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 font-inter"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingConfirmModal;

import { createCheckoutSession } from "@/Api/services/menteeService";
import moment from "moment";
import { FiX, FiCalendar, FiClock, FiUser, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

function BookingConfirmModal({ onClose, mentorData, mentee, slot, price }) {

  const handleAccept = async () => {
    const slotId = slot._id;
    const mentor = mentorData.user._id;

    try {
      const data = await createCheckoutSession('user/create-checkout-session',
        { mentee, mentor, slotId, price });
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Error: No URL returned from server');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <FiCheckCircle className="text-indigo-600" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Confirm Booking
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mentor Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <img 
              src={mentorData.user.profilePic} 
              alt={mentorData.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{mentorData.name}</h4>
              <p className="text-sm text-gray-600">{mentorData.jobTitle}</p>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Session Details</h4>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <FiCalendar className="text-blue-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700">Date</p>
                <p className="text-gray-900 font-semibold">
                  {moment(slot.date).format('dddd, MMMM Do YYYY')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <FiClock className="text-green-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700">Time</p>
                <p className="text-gray-900 font-semibold">
                  {moment(slot.startTime).format('h:mm A')} - {moment(slot.endTime).format('h:mm A')}
                </p>
                <p className="text-xs text-gray-500 mt-1">60 minutes session</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <FiDollarSign className="text-purple-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700">Session Fee</p>
                <p className="text-gray-900 font-semibold text-xl">₹{price}</p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-sm text-indigo-900 leading-relaxed">
              <strong>What to expect:</strong> This 60-minute session will provide personalized guidance, 
              project insights, and expert advice tailored to your needs. You'll receive a meeting link 
              via email after confirmation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-6 py-3 text-white bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
          >
            Confirm & Pay
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default BookingConfirmModal;