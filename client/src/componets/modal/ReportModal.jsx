import React, { useState } from 'react';
import { toast } from 'sonner';
import { reportBlog } from '@/Api/services/menteeService';

const ReportModal = ({ isOpen, onClose, onSubmit, blogId }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedReason(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedReason) {
      toast.info('Please select a reason for reporting.');
      return;
    }
    try {
      const data = {
        reason:selectedReason , 
        additionalDetails:additionalDetails ,
        blogId:blogId
      }
      const response = await reportBlog('user/report', data);
      toast.success(response.message);
      console.log(response);
      onClose();
      setAdditionalDetails('')
      setSelectedReason('')
    } catch (error) {
      console.log(error);
      onClose();
      setAdditionalDetails('')
      setSelectedReason('')
    }

  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:max-w-[425px] relative">
          <button
            type="button"
            className="absolute  top-2 right-2 bg-black rounded-full text-white w-5 h-5 flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="mb-4">
            <h2 className="text-xl font-semibold font-inter">Report this Blog</h2>
            <p className="text-gray-600 font-inter">Please select the reason for your report.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="font-medium font-inter">Reason for report</label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="inappropriate-content"
                      checked={selectedReason === 'inappropriate-content'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="inappropriate-content ">Inappropriate Content</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="spam"
                      checked={selectedReason === 'spam'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="spam">Spam</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="harassment"
                      checked={selectedReason === 'harassment'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="harassment">Harassment</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="misleading-info"
                      checked={selectedReason === 'misleading-info'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="misleading-info">Misleading Information</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="other"
                      checked={selectedReason === 'other'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="report-details " className='font-inter'>Additional details</label>
                <textarea
                  id="report-details"
                  placeholder="Provide additional details about your report (optional)"
                  className="min-h-[100px] border border-gray-300 rounded-md p-2 font-inter"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-inter"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ReportModal;