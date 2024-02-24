


import React, { useState, useEffect } from 'react';

import './Appointment.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const AppointmentScheduler = () => {
  const [events, setEvents] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientName1, setClientName1] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTime1, setSelectedTime1] = useState('');
  
  
  const handleDateChange1=(e)=>{
    setSelectedDate1(e.target.value)
  }
  const handleTimeChange1=(e)=>{
    setSelectedTime1(e.target.value)

  }

  useEffect(() => {
    // Load events from localStorage on component mount
    const storedEvents = JSON.parse(localStorage.getItem('appointments')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    // Save events to localStorage whenever events state changes
    localStorage.setItem('appointments', JSON.stringify(events));
  }, [events]);

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };
  const handleClientNameChange1 = (e) => {
    setClientName1(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleCancellationReasonChange = (e) => {
    setCancellationReason(e.target.value);
  };

 
  const handleScheduleAppointment = () => {
    // Validate input before scheduling appointment
    if (!clientName || !selectedDate || !selectedTime) {
      alert('Please fill in all fields before scheduling the appointment.');
      return;
    }

    // Check for existing appointments on the selected date and time
    const existingAppointment = events.find(
      (event) => moment(event.start).isSame(selectedDate, 'day') && event.title === selectedTime
    );

    if (existingAppointment) {
      alert('Appointment slot is already booked. Please choose another date or time.');
      return;
    }

    // Add new appointment
    const newAppointment = {
      title: selectedTime,
      start: new Date(`${selectedDate}T${selectedTime}:00`),
      end: new Date(`${selectedDate}T${selectedTime}:30`),
      client: clientName, // Include client name in the appointment
    };

    // Update the local state
    setEvents([...events, newAppointment]);

    // Clear the form
    clearForm();
  };

  const handleCancelAppointment = () => {
    // Check if the doctor is authenticated
   
  
    // Validate input before canceling appointment
    if (!selectedDate1 || !selectedTime1) {
      alert('Please select the appointment date and time before canceling.');
      return;
    }
  
    // Find the appointment to cancel
    const appointmentToCancel = events.find(
      (event) =>
        moment(event.start).isSame(selectedDate1, 'day') &&
        event.title === selectedTime1 &&
        event.client === clientName1
    );
  
    if (!appointmentToCancel) {
      alert('No matching appointment found for cancellation.');
      return;
    }
  
    // Remove the canceled appointment from the events state
    const updatedEvents = events.filter(
      (event) =>
        !(moment(event.start).isSame(selectedDate1, 'day') && event.title === selectedTime1 && event.client === clientName1)
    );
  
    setEvents(updatedEvents);
  
    // Clear the form
    clearForm1();
  };
  

  const clearForm = () => {
    setClientName('');
    setSelectedDate('');
    setSelectedTime('');
    setCancellationReason('');
  };
  const clearForm1 = () => {
    setClientName1('');
    setSelectedDate1('');
    setSelectedTime1('');
    setCancellationReason1('');
  };

  const handleSortByClientName = () => {
    const sortedEvents = [...events].sort((a, b) => a.client.localeCompare(b.client));
    setEvents(sortedEvents);
  };

  const handleClearAppointments = () => {
    localStorage.removeItem('appointments');
    setEvents([]);
  };

  const EventComponent = ({ event }) => (
    <div className="event-card">
      <strong>{event.title}</strong>
      <p className='honda'>{event.client}</p>
      {event.cancellationReason && (
        <p className="cancellation-reason">Cancellation Reason: {event.cancellationReason}</p>
      )}
    </div>
  );
  

  return (
    <>
    <div class="appointment-scheduler">
    
    <div class="schedule-form">
      <h2>Schedule Appointment</h2>
     
      <div className="input-group">
        <label>Client Name:</label>
        <input type="text" value={clientName} onChange={handleClientNameChange} />
      </div>
      <div className="input-group">
        <label>Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div className="input-group">
        <label>Time:</label>
        <input type="time" value={selectedTime} onChange={handleTimeChange} />
      </div>
      <button className="schedule-btn" onClick={handleScheduleAppointment}>
        Schedule Appointment
      </button>
    </div>

  
    <div class="calendar-container">
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{event:EventComponent} }
      />
    </div>

    
    <div class="cancel-form">
      <h2>Cancel Appointment</h2>
     
      <div className="input-group">
        <label>Client Name:</label>
        <input type="text" value={clientName1} onChange={handleClientNameChange1}/>
      </div>
      <div className="input-group">
        <label>Date:</label>
        <input type="date" value={selectedDate1} onChange={handleDateChange1} />
      </div>
      <div className="input-group">
        <label>Time:</label>
        <input type="time" value={selectedTime1} onChange={handleTimeChange1} />
      </div>
      
      <button className="cancel-btn" onClick={handleCancelAppointment}>
        Cancel Appointment
      </button>

    </div>
    </div>
    </>);
  
  
};

export default AppointmentScheduler;


