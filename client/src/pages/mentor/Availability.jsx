import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { Button, IconButton, TextField, Snackbar, Alert, Card, CardContent, Typography, Grid, CardActions } from '@mui/material';
import { addSlots, getMentorApplication, deleteSlot } from '@/Api/services/mentorServices';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import SideNav from './partials/SideNav';
import Header from './partials/Header';
import CustomDatePicker from '@/componets/DatePicker';

const MentorAvailability = () => {
  const user = useSelector((state) => state.auth.user);
  const [slot, setSlot] = useState({ from: moment(), to: moment() });
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const handleTimeChange = (field, value) => {
    setSlot({ ...slot, [field]: moment(value) });
  };



  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await getMentorApplication('user/getMentorApplication', user.id);
        // const response = await getMentorAvalableSlots('/user/getAvailableSlots');
        console.log(response);
        setSlots(response.data.response);
      } catch (error) {
        console.error("Failed to fetch mentor data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [user.id]);

  const addSlot = async () => {
    const mentorId = user.id;
    try {

      const slotAddingData = { mentorId, slot };
      const response = await addSlots('user/addSlots', slotAddingData);
      const newSlot = response.addedSlots;

      const formattedDate = moment(newSlot.date).format('dddd, MMMM Do [at] h:mma');
      const formattedStartTime = moment(newSlot.startTime, 'HH:mm').format('h:mma');
      const formattedEndTime = moment(newSlot.endTime, 'HH:mm').format('h:mma');

      setSlots((prevSlots) => [...prevSlots, newSlot]);
      // toast.success(response.message);
      toast.message(response.message, {
        description: `${formattedDate} - ${formattedStartTime}`,
      })
    }

    catch (error) {
      console.log("////////", error.response.data);
      toast.warning(error.response.data)
    }
  };




  const filterSlotsByDate = (date) => {
    console.log(date);
    console.log("..l.l", slots);
    if (!slots) return [];
    return slots.filter(
      (slot) => new Date(slot.date).toDateString() === date.toDateString()
    );
  };
  const availableSlots = filterSlotsByDate(selectedDate);


  const handleRemoveSlot = async (slotId, index) => {
    try {
      const response = await deleteSlot('user/deleteSlot', slotId);
      console.log(response.deletedSlot);
      const deletedSlotId = response.deletedSlot._id
      setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== deletedSlotId));
      toast.error(response.message);
      console.log(index);
    } catch (error) {
      console.log(error.response.data);
      toast.info(error.response.data);

    }
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />
      <SideNav />
      <div className="flex-1 mt-16 md:ml-64 p-4 flex">
        <div className="w-80 p-6 fixed top-16">
          <h3 className="text-xl font-bold mb-4 text-center font-inter">Select a Date</h3>
          <CustomDatePicker className="w-80 p-6 rounded-lg  shadow-md fixed top-16" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        </div>
        <div className="ml-80 flex   overflow-y-auto p-6">
          <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-extrabold mb-6 text-center font-inter">Session Availability</h2>
            <div className="flex flex-col items-center space-y-4 mb-6">
              <LocalizationProvider dateAdapter={AdapterMoment}>
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

            {availableSlots ? <Grid container spacing={2}>
              {availableSlots.filter((slot)=> !slot.isBooked).map((slot, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <Typography variant="h6" component="div" >
                          Slot {index + 1}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          From : {moment(slot.startTime).format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          To: {moment(slot.endTime).format('MMMM Do YYYY, h:mm a')}
                        </Typography>
                      </div>
                      <CardActions>
                        <IconButton onClick={() => handleRemoveSlot(slot._id, index)} className="bg-red-500 text-white p-2 rounded-full">
                          <FaTrash />
                        </IconButton>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid> : <p>no available slots.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;
