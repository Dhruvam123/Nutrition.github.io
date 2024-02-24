import React from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
    const {username}=useAuth();
    const navigate=useNavigate();
  const handleLogout = async () => {

    try {
    
        
      const response = await axios.delete(`http://localhost:3001/deleteDataByUsername/${username}`);

      if (response.status === 200) {
        console.log('User data deleted successfully');
        // Redirect to the login page or perform additional logout logic
        navigate("/")
      } else {
        console.error('Error deleting user data:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error:', error.message);
    }

  };

  return (
    <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
  );
};

export default LogoutButton;
