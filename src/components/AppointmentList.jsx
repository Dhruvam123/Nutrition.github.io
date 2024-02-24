import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';
import { useAuth } from './AuthContext';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancellationReason, setCancellationReason] = useState('');
  const {username}=useAuth();

  useEffect(() => {
    // Fetch appointments from the server
    axios.get(`http://localhost:3001/api/appointments?nutritionistName=${username}`)
      .then((response) => {
        setAppointments(response.data.appointments || []);
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  }, [appointments]);

  const handleApprove = (appointmentId) => {
    axios.post(`http://localhost:3001/api/appointments/approve/${appointmentId}`)
      .then((response) => {
        console.log(response.data.message);
        // Refresh the list of appointments
        axios.get(`http://localhost:3001/api/appointments?nutritionistName=${username}`)
          .then((response) => {
            setAppointments(response.data.appointments || []);
          })
          .catch((error) => console.error('Error fetching appointments:', error));
      })
      .catch((error) => console.error('Error approving appointment:', error));
  };

  const handleReject = (appointmentId) => {
    if (!cancellationReason) {
      alert('Please provide a cancellation reason before rejecting.');
      return;
    }

    axios.post(`http://localhost:3001/api/appointments/reject/${appointmentId}`, {
      cancellationReason,
    })
      .then((response) => {
        console.log(response.data.message);
        // Refresh the list of appointments
        axios.get(`http://localhost:3001/api/appointments?nutritionistName=${username}`)
          .then((response) => {
            setAppointments(response.data.appointments || []);
          })
          .catch((error) => console.error('Error fetching appointments:', error));
      })
      .catch((error) => console.error('Error rejecting appointment:', error));

    // Clear the cancellation reason after rejecting
    setCancellationReason('');
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-header">Appointment List</h2>
      <div className="appointment-form">
        <label className="label-cancellation-reason">Cancellation Reason:</label>
        <input
          type="text"
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
          className="input-cancellation-reason"
        />
      </div>
      <ul className="appointments-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            {`Client: ${appointment.clientName}, Date: ${appointment.selectedDate}, Time: ${appointment.selectedTime}, Status: `}
            <span className={appointment.status === 'approved' ? 'approved-status' : 'rejected-status'}>
              {appointment.status}
            </span>
            {appointment.status === 'rejected' ? `, Cancellation Reason: ${appointment.cancellationReason}` : ''}
            <button onClick={() => handleApprove(appointment.id)} className="button-approve">Approve</button>
            <button onClick={() => handleReject(appointment.id)} className="button-reject">Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
