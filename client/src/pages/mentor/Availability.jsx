import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from '@mui/material';

const MentorAvailability = () => {
  const [slots, setSlots] = useState([{ from: dayjs(), to: dayjs() }]);
  const [open, setOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({ index: null, field: null });

  const handleTimeChange = (index, field, value) => {
    const updatedSlots = slots.map((slot, i) => {
      if (i === index) {
        return { ...slot, [field]: dayjs(value) }; // Ensure value is a dayjs object
      }
      return slot;
    });
    setSlots(updatedSlots);
  };

  const addSlot = () => {
    setSlots([...slots, { from: dayjs(), to: dayjs() }]); // Initialize new slots with dayjs objects
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleClickOpen = (index, field) => {
    setCurrentSlot({ index, field });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateTimePickerChange = (date) => {
    handleTimeChange(currentSlot.index, currentSlot.field, date);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Session Availability</h2>
      {slots.map((slot, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              label="From"
              value={slot.from.format('YYYY-MM-DD HH:mm')}
              onClick={() => handleClickOpen(index, 'from')}
              readOnly
            />
            <TextField
              label="To"
              value={slot.to.format('YYYY-MM-DD HH:mm')}
              onClick={() => handleClickOpen(index, 'to')}
              readOnly
            />
            <IconButton onClick={() => removeSlot(index)} className="bg-red-500 text-white p-2 rounded">
              <FaTrash />
            </IconButton>
          </LocalizationProvider>
        </div>
      ))}
      <div className="flex justify-center mb-6">
        <Button onClick={addSlot} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Slot
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Select Date & Time</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              value={slots[currentSlot.index]?.[currentSlot.field] || dayjs()}
              onChange={handleDateTimePickerChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-gray-600">Cancel</Button>
          <Button onClick={handleClose} className="bg-blue-500 text-white px-4 py-2 rounded">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MentorAvailability;
