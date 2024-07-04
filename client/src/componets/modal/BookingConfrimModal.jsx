import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "@/Api/services/menteeService";
import { toast } from "sonner";
import moment from "moment";


function BookingConfirmModal({ onClose , mentorData , mentee , slot , price}) {
     console.log("11111111",mentorData);
    const handleAccept = async ()=>{
      
      const slotId = slot._id;
      const mentor = mentorData.user;
        try {
            const data = await createCheckoutSession('user/create-checkout-session',
               { mentee , mentor , slotId , price });
            if (data.url) {
              window.location.href = data.url; // Redirect to the Stripe Checkout page
            } else {
              console.error('Error: No URL returned from server');
            }
            
          } catch (error) {
            console.error('Error creating checkout session:', error);
          }
        };


   
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl p-4 max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
              Booking Confirmation
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
    <p className="text-base leading-relaxed text-gray-800 font-inter">
        You are about to book a mentorship session with our expert developer, {mentorData.name}.
    </p>
    <p className="text-base leading-relaxed text-gray-800 font-inter">
        This one-hour mentorship session will provide you with the opportunity to discuss your project, get valuable insights, and receive guidance tailored to your needs.
    </p>
    <p className="text-base leading-relaxed text-gray-800 font-inter">
        Please confirm the following details:
    </p>
    <ul className="text-base leading-relaxed text-gray-800 font-inter">
        <li>Date: {moment(slot.date).format('MMMM Do, YYYY')}</li>
        <li>Time: {moment(slot.startTime, 'HH:mm').format('h:mm A')} - {moment(slot.endTime, 'HH:mm').format('h:mm A')}</li>
    </ul>
    <p className="text-base leading-relaxed text-gray-800 font-inter">
        Click "Confirm" to proceed with the booking. We look forward to helping you achieve your goals!
    </p>
</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleAccept}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-inter"
            >
              I accept
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 font-inter"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmModal;
