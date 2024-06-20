import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Button,
  IconButton,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { addSlots } from '@/Api/services/mentorServices';
import { useSelector } from 'react-redux';

const MentorAvailability = () => {
  const user = useSelector((state) => state.auth.user);
  
  const [slots, setSlots] = useState([{ from: dayjs(), to: dayjs() }]);
  console.log(slots.map((v,i)=>console.log(i,": ",v.from , " , " , v.to )));
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  const handleTimeChange = (index, field, value) => {
    const updatedSlots = slots.map((slot, i) => {
      if (i === index) {
        return { ...slot, [field]: dayjs(value) }; // Ensure value is a dayjs object
      }
      return slot;
    });
    setSlots(updatedSlots);
  }

  const addSlot = () => {
    setSlots([...slots, { from: dayjs(), to: dayjs() }]); // Initialize new slots with dayjs objects
  }

  const removeSlot = (index) => {
    setSlots(slots.filter(( _ , i ) => i !== index));
  }

  const saveAvailability = async() => {

    console.log("post slots",slots.map(slots => slots));
    const mentorId = user.id;
    const slotAddingDatas= {mentorId ,slots}
    const response = await addSlots('user/addSlots', slotAddingDatas);
    // setSnackbarMessage('Availability saved successfully!');
    // setSnackbarSeverity('success');
    // setOpenSnackbar(true);

  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Session Availability</h2>
      {slots.map((slot, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              label="From"
              value={slot.from}
              onChange={(date) => handleTimeChange(index, 'from', date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDateTimePicker
              label="To"
              value={slot.to}
              onChange={(date) => handleTimeChange(index, 'to', date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <IconButton onClick={() => removeSlot(index)} className="bg-red-500 text-white p-2 rounded">
              <FaTrash />
            </IconButton>
          </LocalizationProvider>
        </div>
      ))}
      <div className="flex justify-center mb-6 space-x-4">
        <Button onClick={addSlot} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Slot
        </Button>
        <Button onClick={saveAvailability} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Availability
        </Button>
      </div>
      {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default MentorAvailability;