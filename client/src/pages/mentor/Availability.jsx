// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { FaPlus, FaTrash } from 'react-icons/fa';
// import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
// import { Button, IconButton, TextField, Snackbar, Alert, Card, CardContent, Typography, Grid, CardActions } from '@mui/material';
// import { addSlots, getMentorApplication, deleteSlot } from '@/Api/services/mentorServices';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import SideNav from './partials/SideNav';
// import Header from './partials/Header';
// import CustomDatePicker from '@/componets/DatePicker';

// const MentorAvailability = () => {
//   const user = useSelector((state) => state.auth.user);
//   const [slot, setSlot] = useState({ from: moment(), to: moment() });
//   const [slots, setSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [loading, setLoading] = useState(true);

//   const handleTimeChange = (field, value) => {
//     setSlot({ ...slot, [field]: moment(value) });
//   };



//   useEffect(() => {
//     const fetchMentor = async () => {
//       try {
//         const response = await getMentorApplication('user/getMentorApplication', user.id);
//         // const response = await getMentorAvalableSlots('/user/getAvailableSlots');
//         console.log(response);
//         setSlots(response.data.response);
//       } catch (error) {
//         console.error("Failed to fetch mentor data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMentor();
//   }, [user.id]);

//   const addSlot = async () => {
//     const mentorId = user.id;
//     try {

//       const slotAddingData = { mentorId, slot };
//       const response = await addSlots('user/addSlots', slotAddingData);
//       const newSlot = response.addedSlots;

//       const formattedDate = moment(newSlot.date).format('dddd, MMMM Do [at] h:mma');
//       const formattedStartTime = moment(newSlot.startTime, 'HH:mm').format('h:mma');
//       const formattedEndTime = moment(newSlot.endTime, 'HH:mm').format('h:mma');

//       setSlots((prevSlots) => [...prevSlots, newSlot]);
//       // toast.success(response.message);
//       toast.message(response.message, {
//         description: `${formattedDate} - ${formattedStartTime}`,
//       })
//     }

//     catch (error) {
//       console.log("////////", error.response.data);
//       toast.warning(error.response.data)
//     }
//   };




//   const filterSlotsByDate = (date) => {
//     console.log(date);
//     console.log("..l.l", slots);
//     if (!slots) return [];
//     return slots.filter(
//       (slot) => new Date(slot.date).toDateString() === date.toDateString()
//     );
//   };
//   const availableSlots = filterSlotsByDate(selectedDate);


//   const handleRemoveSlot = async (slotId, index) => {
//     try {
//       const response = await deleteSlot('user/deleteSlot', slotId);
//       console.log(response.deletedSlot);
//       const deletedSlotId = response.deletedSlot._id
//       setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== deletedSlotId));
//       toast.error(response.message);
//       console.log(index);
//     } catch (error) {
//       console.log(error.response.data);
//       toast.info(error.response.data);

//     }
//   }

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }


//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="flex-1 mt-16 md:ml-64 p-4 flex">
//         <div className="w-80 p-6 fixed top-16">
//           <h3 className="text-xl font-bold mb-4 text-center font-inter">Select a Date</h3>
//           <CustomDatePicker className="w-80 p-6 rounded-lg  shadow-md fixed top-16" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

//         </div>
//         <div className="ml-80 flex   overflow-y-auto p-6">
//           <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-3xl font-extrabold mb-6 text-center font-inter">Session Availability</h2>
//             <div className="flex flex-col items-center space-y-4 mb-6">
//               <LocalizationProvider dateAdapter={AdapterMoment}>
//                 <MobileDateTimePicker
//                   label="From"
//                   value={slot.from}
//                   onChange={(date) => handleTimeChange('from', date)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//                 <MobileDateTimePicker
//                   label="To"
//                   value={slot.to}
//                   onChange={(date) => handleTimeChange('to', date)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </LocalizationProvider>
//               <Button onClick={addSlot} className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center">
//                 <FaPlus className="mr-2" /> Add Slot
//               </Button>
//             </div>

//             {availableSlots ? <Grid container spacing={2}>
//               {availableSlots.filter((slot)=> !slot.isBooked).map((slot, index) => (
//                 <Grid item xs={12} key={index}>
//                   <Card>
//                     <CardContent className="flex items-center justify-between">
//                       <div>
//                         <Typography variant="h6" component="div" >
//                           Slot {index + 1}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           From : {moment(slot.startTime).format('MMMM Do YYYY, h:mm a')}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           To: {moment(slot.endTime).format('MMMM Do YYYY, h:mm a')}
//                         </Typography>
//                       </div>
//                       <CardActions>
//                         <IconButton onClick={() => handleRemoveSlot(slot._id, index)} className="bg-red-500 text-white p-2 rounded-full">
//                           <FaTrash />
//                         </IconButton>
//                       </CardActions>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid> : <p>no available slots.</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorAvailability;


import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { 
  FiClock, FiDollarSign, FiCalendar, FiTrash2, FiPlus, 
  FiEdit2, FiSave, FiX, FiCheck 
} from 'react-icons/fi';
import { addBulkSlots, getMentorApplication, deleteSlot, updateSlotPrice } from '@/Api/services/mentorServices';

const MentorAvailability = () => {
  const user = useSelector((state) => state.auth.user);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [isAddingSlots, setIsAddingSlots] = useState(false);
  const [editingPrices, setEditingPrices] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Configuration state
  const [config, setConfig] = useState({
    dateRange: {
      start: moment().format('YYYY-MM-DD'),
      end: moment().add(7, 'days').format('YYYY-MM-DD')
    },
    timeSlots: {
      start: '09:00',
      end: '17:00'
    },
    sessionDuration: 60,
    breakDuration: 15,
    price: 2000,
    selectedDays: [1, 2, 3, 4, 5] // Monday to Friday
  });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const sessionDurations = [30, 45, 60, 90, 120];
  const breakDurations = [0, 15, 30, 45];

  useEffect(() => {
    fetchSlots();
  }, [user.id, selectedMonth]);

  const fetchSlots = async () => {
    try {
      const response = await getMentorApplication('user/getMentorApplication', user.id);
      setSlots(response.data.response || []);
    } catch (error) {
      console.error("Failed to fetch slots", error);
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBulkSlots = async () => {
    try {
      setLoading(true);
      const response = await addBulkSlots('user/availability/bulk', {
        mentorId: user.id,
        ...config
      });

      setSlots(prev => [...prev, ...response.addedSlots]);
      toast.success(response.message);
      setIsAddingSlots(false);
      
      // Reset config
      setConfig(prev => ({
        ...prev,
        dateRange: {
          start: moment().format('YYYY-MM-DD'),
          end: moment().add(7, 'days').format('YYYY-MM-DD')
        }
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add slots");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    
    try {
      await deleteSlot('user/availability', slotId);
      setSlots(prev => prev.filter(slot => slot._id !== slotId));
      toast.success("Slot deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete slot");
    }
  };

  const handleUpdatePrices = async () => {
    try {
      if (selectedSlots.length === 0) {
        toast.error("Please select slots to update");
        return;
      }

      await updateSlotPrice('user/availability/price', {
        slotIds: selectedSlots,
        newPrice: config.price
      });

      setSlots(prev => prev.map(slot => 
        selectedSlots.includes(slot._id) ? { ...slot, price: config.price } : slot
      ));

      toast.success(`Updated ${selectedSlots.length} slots`);
      setEditingPrices(false);
      setSelectedSlots([]);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update prices");
    }
  };

  const toggleDaySelection = (dayIndex) => {
    setConfig(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayIndex)
        ? prev.selectedDays.filter(d => d !== dayIndex)
        : [...prev.selectedDays, dayIndex]
    }));
  };

  const toggleSlotSelection = (slotId) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  // Group slots by date
  const groupedSlots = slots.reduce((acc, slot) => {
    const date = moment(slot.date).format('YYYY-MM-DD');
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  // Filter slots for selected month
  const monthSlots = Object.keys(groupedSlots)
    .filter(date => moment(date).isSame(selectedMonth, 'month'))
    .sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Availability Management</h1>
            <p className="text-gray-600 mt-1">Manage your session slots and pricing</p>
          </div>
          <div className="flex gap-3">
            {editingPrices ? (
              <>
                <button
                  onClick={() => {
                    setEditingPrices(false);
                    setSelectedSlots([]);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <FiX size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePrices}
                  disabled={selectedSlots.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave size={18} />
                  Save ({selectedSlots.length})
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingPrices(true)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <FiEdit2 size={18} />
                  Edit Prices
                </button>
                <button
                  onClick={() => setIsAddingSlots(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <FiPlus size={18} />
                  Add Availability
                </button>
              </>
            )}
          </div>
        </div>

        {/* Add Slots Panel */}
        {isAddingSlots && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 animate-slideDown">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Availability</h2>
              <button
                onClick={() => setIsAddingSlots(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Date Range
                </label>
                <div className="space-y-3">
                  <input
                    type="date"
                    value={config.dateRange.start}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min={moment().format('YYYY-MM-DD')}
                  />
                  <input
                    type="date"
                    value={config.dateRange.end}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min={config.dateRange.start}
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiClock className="inline mr-2" />
                  Daily Time Range
                </label>
                <div className="space-y-3">
                  <input
                    type="time"
                    value={config.timeSlots.start}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      timeSlots: { ...prev.timeSlots, start: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    value={config.timeSlots.end}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      timeSlots: { ...prev.timeSlots, end: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Session & Break Duration */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Session Duration
                  </label>
                  <select
                    value={config.sessionDuration}
                    onChange={(e) => setConfig(prev => ({ ...prev, sessionDuration: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {sessionDurations.map(duration => (
                      <option key={duration} value={duration}>{duration} minutes</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Break Between Sessions
                  </label>
                  <select
                    value={config.breakDuration}
                    onChange={(e) => setConfig(prev => ({ ...prev, breakDuration: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {breakDurations.map(duration => (
                      <option key={duration} value={duration}>
                        {duration === 0 ? 'No break' : `${duration} minutes`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Days Selection */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Days
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDaySelection(index)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      config.selectedDays.includes(index)
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Price per Session
                </label>
                <input
                  type="number"
                  value={config.price}
                  onChange={(e) => setConfig(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsAddingSlots(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBulkSlots}
                disabled={config.selectedDays.length === 0}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiCheck size={18} />
                Create Slots
              </button>
            </div>
          </div>
        )}

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
          <button
            onClick={() => setSelectedMonth(prev => moment(prev).subtract(1, 'month'))}
            className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            ← Previous
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            {selectedMonth.format('MMMM YYYY')}
          </h2>
          <button
            onClick={() => setSelectedMonth(prev => moment(prev).add(1, 'month'))}
            className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Slots Calendar View */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading availability...</p>
            </div>
          ) : monthSlots.length > 0 ? (
            monthSlots.map(date => (
              <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">
                    {moment(date).format('dddd, MMMM Do YYYY')}
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    {groupedSlots[date].filter(s => !s.isBooked).length} available slots
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {groupedSlots[date]
                      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                      .map(slot => (
                        <div
                          key={slot._id}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            slot.isBooked
                              ? 'bg-gray-50 border-gray-300'
                              : editingPrices && selectedSlots.includes(slot._id)
                              ? 'bg-indigo-50 border-indigo-500'
                              : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
                          }`}
                          onClick={() => editingPrices && !slot.isBooked && toggleSlotSelection(slot._id)}
                        >
                          {editingPrices && !slot.isBooked && (
                            <div className="absolute top-2 right-2">
                              <input
                                type="checkbox"
                                checked={selectedSlots.includes(slot._id)}
                                onChange={() => toggleSlotSelection(slot._id)}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mb-2">
                            <FiClock className={slot.isBooked ? 'text-gray-400' : 'text-indigo-600'} />
                            <span className={`font-semibold ${slot.isBooked ? 'text-gray-500' : 'text-gray-900'}`}>
                              {moment(slot.startTime).format('h:mm A')} - {moment(slot.endTime).format('h:mm A')}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm">
                              <FiDollarSign className={slot.isBooked ? 'text-gray-400' : 'text-green-600'} />
                              <span className={`font-semibold ${slot.isBooked ? 'text-gray-500' : 'text-green-600'}`}>
                                ₹{slot.price}
                              </span>
                            </div>
                            
                            {slot.isBooked ? (
                              <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full font-medium">
                                Booked
                              </span>
                            ) : (
                              !editingPrices && (
                                <button
                                  onClick={() => handleDeleteSlot(slot._id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <FiCalendar className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No slots for this month</h3>
              <p className="text-gray-600 mb-6">Add your availability to start accepting bookings</p>
              <button
                onClick={() => setIsAddingSlots(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Availability
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;