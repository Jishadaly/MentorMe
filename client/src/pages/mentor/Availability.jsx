import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, IconButton, TextField, Snackbar, Alert, Card, CardContent, Typography, Grid, CardActions } from '@mui/material';
import { addSlots } from '@/Api/services/mentorServices';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import SideNav from './partials/SideNav';
import Header from './partials/Header';

const MentorAvailability = () => {
  const user = useSelector((state) => state.auth.user);
  const [slot, setSlot] = useState({ from: dayjs(), to: dayjs() });
  const [slots, setSlots] = useState([]); // Maintain an array of successfully added slots
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleTimeChange = (field, value) => {
    setSlot({ ...slot, [field]: dayjs(value) }); // Ensure value is a dayjs object
  };

  const addSlot = async () => {
  console.log("slos", slot);

    const mentorId = user.id;
    try {
      const slotAddingData = { mentorId, slot };
      const response = await addSlots('user/addSlots', slotAddingData);
      setSlots([...slots, slot]); // Add the slot to the successfully added slots
      toast.success(response.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Backend Error:", error.response.data.message);
        toast.error(error.response.data.message);
      } 
    }
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />
      <SideNav />
      <div className="flex-1 mt-16 md:ml-64 p-4 flex justify-center">
        <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Session Availability</h2>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="From"
                value={slot.from}
                onChange={(date) => handleTimeChange('from', date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <MobileDateTimePicker
                label="To"
                value={slot.to}
                onChange={(date) => handleTimeChange('to', date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <Button onClick={addSlot} className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center">
              <FaPlus className="mr-2" /> Add Slot
            </Button>
          </div>
          <Grid container spacing={2}>
            {slots.map((slot, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <Typography variant="h6" component="div">
                        Slot {index + 1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        From: {slot.from.format('YYYY-MM-DD HH:mm')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        To: {slot.to.format('YYYY-MM-DD HH:mm')}
                      </Typography>
                    </div>
                    <CardActions>
                      <IconButton onClick={() => removeSlot(index)} className="bg-red-500 text-white p-2 rounded-full">
                        <FaTrash />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;
