import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust the path based on your file structure
import './AppointmentPatient.css';

const AppointmentList1 = () => {
  const { username } = useAuth(); // Using the useAuth hook to access the username
  const [patientAppointments, setPatientAppointments] = useState([]);

  // Function to fetch appointments for the specified client name
  const fetchAppointments = async (clientName) => {
    try {
      const appointmentsResponse = await axios.get(`http://localhost:3001/api/appointments1?clientName=${clientName}`);
      setPatientAppointments(appointmentsResponse.data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    // Fetch appointments initially with the username from the context
    fetchAppointments(username);
  }, [username,patientAppointments]); // Include username in the dependency array

  return (
    // ... rest of the component code

    <div className="appointment-container">
      <h2 className="appointment-header">Appointment List</h2>

      <div>
        <ul className="appointments-list">
          {patientAppointments.map((appointment, index) => (
            <li key={index} className="appointment-item">
              {`Client: ${appointment.clientName}, Date: ${appointment.selectedDate}, Time: ${appointment.selectedTime}, Status: `}
              <span className={appointment.status === 'approved' ? 'approved-status' : 'rejected-status'}>
                {appointment.status}
              </span>
              {appointment.status === 'rejected' ? `, Cancellation Reason: ${appointment.cancellationReason}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentList1;
