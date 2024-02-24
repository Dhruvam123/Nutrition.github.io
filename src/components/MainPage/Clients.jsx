import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import './Clients.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });
  const [ageData, setAgeData] = useState({ '0-20': 0, '21-40': 0, '41-60': 0, '61+': 0 });

  useEffect(() => {
    // Fetch clients and update charts on component mount
    fetchClients();
    listenForUpdates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getClients');
      setClients(response.data);

      // Update gender and age distribution data
      updateChartData(response.data);

      // Store client data in localStorage
      localStorage.setItem('clients', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const listenForUpdates = async () => {
    try {
      await axios.get('http://localhost:3001/listenForUpdates');
      fetchClients(); // Fetch clients after receiving an update
      listenForUpdates(); // Continue listening for updates
    } catch (error) {
      console.error('Error listening for updates:', error);
    }
  };

  const updateChartData = (clients) => {
    const genderData = { male: 0, female: 0 };
    const ageData = { '0-20': 0, '21-40': 0, '41-60': 0, '61+': 0 };

    clients.forEach((client) => {
      genderData[client.gender]++;
      ageData[getAgeGroup(client.age)]++;
    });

    setGenderData(genderData);
    setAgeData(ageData);
  };

  const getAgeGroup = (age) => {
    if (age <= 20) return '0-20';
    else if (age <= 40) return '21-40';
    else if (age <= 60) return '41-60';
    else return '61+';
  };

  const handleDeleteClient = (username) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (confirmDelete) {
      // Filter out the client to be deleted from the state
      const updatedClients = clients.filter((client) => client.username !== username);
  
      // Update charts with the modified client data
      updateChartData(updatedClients);
  
      // Update localStorage with the modified client data
      localStorage.setItem('clients', JSON.stringify(updatedClients));
  
      // Set the state with the modified client data
      setClients(updatedClients);
    }
  };
  

  return (
    <div className='bg-white container op '>
      <h2>Client List</h2>
      <div className="client-container">
        {clients.map((client) => (
          <div key={client.username} className="client-box">
            <div>
              <strong>Username:</strong> {client.username}
            </div>
            <div>
              <strong>Description:</strong> {client.description}
            </div>
            <div>
              <strong>Age:</strong> {client.age} years old
            </div>
            <div>
              <strong>Gender:</strong> {client.gender}
            </div>
            
            <button onClick={() => handleDeleteClient(client.username)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Gender Distribution</h2>
        <Bar
          data={{
            labels: Object.keys(genderData),
            datasets: [
              {
                label: 'Gender Distribution',
                data: Object.values(genderData),
                backgroundColor: ['#3498db', '#e74c3c'],
              },
            ],
          }}
        />
      </div>

      <div>
        <h2>Age Distribution</h2>
        <Bar
          data={{
            labels: Object.keys(ageData),
            datasets: [
              {
                label: 'Age Distribution',
                data: Object.values(ageData),
                backgroundColor: ['#2ecc71', '#f39c12', '#e67e22', '#9b59b6'],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ClientList;
