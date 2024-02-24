// OtherComponent.jsx

// ClientsComponent.js

import React from 'react';
import { useDataContext } from './DataContext';
import { useEffect } from 'react';
import './client.css'

const ClientList = () => {
  const { loginData, handleLoginSubmit } = useDataContext();

  // Load data from local storage on component mount
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData && !loginData) {
      handleLoginSubmit(storedFormData);
    }
  }, [loginData, handleLoginSubmit]);

  // Save form data to local storage on loginData change
  useEffect(() => {
    if (loginData) {
      localStorage.setItem('formData', JSON.stringify(loginData));
    }
  }, [loginData]);


  return (
    <div className='pal'>
      <h2>Welcome to the Clients Component</h2>
      {loginData && (
        <div className='flex-col'>
          <div> 
            Logged in as: {loginData.username}
          </div>
          
         
         
          {/* Display other relevant login data */}
          </div>
        
      )}
      {/* Render other components or data based on loginData */}
    </div>
  );
};

export default ClientList;

