import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  return (
    <div className="w-full"> {/* Container with full width */}
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        inline
        calendarClassName="bg-white rounded-lg shadow-md "  // Remove width-full class
        wrapperClassName="w-full"  // Ensure the wrapper takes full width
        minDate={today}
      />
    </div>
  );
};

export default CustomDatePicker;

