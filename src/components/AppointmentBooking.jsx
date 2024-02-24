// AppointmentBooking.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentBooking.css'

const AppointmentBooking = () => {
  const [clientName, setClientName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [nutritionists, setNutritionists] = useState([]);
  const [selectedNutritionist, setSelectedNutritionist] = useState('');

// ...

const handleNutritionistChange = (e) => {
  setSelectedNutritionist(e.target.value);
};

  useEffect(() => {
    // Fetch Nutritionist usernames when component mounts
    fetchNutritionists();
  }, []);

  const fetchNutritionists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/nutritionists');
      setNutritionists(response.data);
    } catch (error) {
      console.error('Error fetching Nutritionists:', error);
    }
  };

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBookAppointment = () => {
    // Validate input before booking appointment
    if (!clientName || !selectedDate || !selectedTime) {
      alert('Please fill in all fields before booking the appointment.');
      return;
    }

    // Send a request to the server to book the appointment
    axios.post('http://localhost:3001/api/appointments', {
      clientName,
      selectedDate,
      selectedTime,
      nutritionistName: selectedNutritionist,
    })
    .then(response => {
      alert('Appointment booked successfully!');
      // Optionally, you can reset the form or perform any other actions after booking
      setClientName('');
      setSelectedDate('');
      setSelectedTime('');
    })
    .catch(error => {
      console.error('Error booking appointment:', error);
    
      // Check if the error contains a response from the server
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error booking appointment: ${error.response.data.error}`);
      } else {
        alert('Error booking appointment. Please try again.');
      }
    
      // Optionally, you can log the error details to the console for further investigation
      console.log('Error details:', error.response);
    });
  };

  return (
    <div className='booking-container'>
      <h2 className='booking-title'>Book an Appointment</h2>
      <div>

      <label className='booking-label'>Nutritionist Name:</label>
<select className='booking-input' value={selectedNutritionist} onChange={handleNutritionistChange}>
  <option value="" disabled>Select a Nutritionist</option>
  {nutritionists.map(nutritionist => (
    <option key={nutritionist} value={nutritionist}>{nutritionist}</option>
  ))}
</select>
      </div>
      <div>
      <label className='booking-label'>Client Name:</label>
      <input type="text" className='booking-input' value={clientName} onChange={handleClientNameChange} />
    </div>
      <div>
        <label className='booking-label'>Date:</label>
        <input type="date" className='booking-input' value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <label className='booking-label'>Time:</label>
        <input type="time" className='booking-input' value={selectedTime} onChange={handleTimeChange} />
      </div>
      <button className='booking-button' onClick={handleBookAppointment}>Book Appointment</button>
    </div>
  );
};

export default AppointmentBooking;
