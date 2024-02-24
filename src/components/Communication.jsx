import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Communication.css';

import { useAuth } from './AuthContext';

const Communication = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { username } = useAuth();
  const [selfmessages, setSelfMessages] = useState([]);
  const [showAllSelfMessages, setShowAllSelfMessages] = useState(false);
  const [nutritionists, setNutritionists] = useState([]);
  const [selectedNutritionist, setSelectedNutritionist] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3001'); // Update with your server URL
    setSocket(socket);

    // Fetch existing messages from the server only if they haven't been cleared
    const messagesCleared = sessionStorage.getItem('messagesCleared');

    axios.get(`http://localhost:3001/api/messages/reciever/${username}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error(`Error fetching messages for reciever ${username}:`, error));

    // Fetch nutritionists when the component mounts
    fetchNutritionists();

    if (username) {
      axios.get(`http://localhost:3001/api/messages/${username}`)
        .then((response) => setSelfMessages(response.data))
        .catch((error) => console.error(`Error fetching messages for sender ${username}:`, error));
    }

    // Listen for new messages from the server
    socket.on('newMessage', (newMessage) => {
      if (newMessage.sender === username) {
        setSelfMessages((prevMessages) => [...prevMessages, newMessage]);
        notifyOtherInstances(newMessage);
      } else if (newMessage.reciever === username) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.disconnect(); // Disconnect socket when the component unmounts
    };
  }, [username]);

  useEffect(() => {
    // Save messages to sessionStorage whenever messages change
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Save selfmessages to sessionStorage whenever selfmessages change
    sessionStorage.setItem('selfmessages', JSON.stringify(selfmessages));
  }, [selfmessages]);

  const fetchNutritionists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/nutritionists');
      setNutritionists(response.data);
    } catch (error) {
      console.error('Error fetching Nutritionists:', error);
    }
  };

  const sendMessage = () => {
    if (message.trim() === '' || selectedNutritionist === '') return;

    // Send a message to the server
    axios.post('http://localhost:3001/api/messages', { text: message, sender: username, reciever: selectedNutritionist })
      .then(() => setMessage(''))
      .catch((error) => console.error('Error sending message:', error));
  };

  const clearMessages = () => {
    // Clear messages from both state and session storage
    setSelfMessages([]);
    setMessages([]);
    sessionStorage.removeItem('selfmessages');
    sessionStorage.removeItem('messages');
    sessionStorage.setItem('messagesCleared', 'true');
  };

  const toggleShowAllSelfMessages = () => {
    setShowAllSelfMessages((prev) => !prev);
  };

  return (
    <div className="communication-container">
      <h2>Patient Component</h2>
      <div className="message-container">
        {selfmessages.slice(0, showAllSelfMessages ? selfmessages.length : 3).map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'doctor' ? 'doctor' : 'patient'}`}
          >
            {msg.sender === 'doctor' ? <strong>Doctor: </strong> : <strong>You: </strong>}
            {msg.text}
          </div>
        ))}
        {selfmessages.length > 3 && (
          <button onClick={toggleShowAllSelfMessages}>
            {showAllSelfMessages ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message doctor`}
          >
            <strong>{msg.sender}:</strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <select value={selectedNutritionist} onChange={(e) => setSelectedNutritionist(e.target.value)}>
          <option value="" disabled>Select a nutritionist</option>
          {nutritionists.map((nutritionist, index) => (
            <option key={index} value={nutritionist}>{nutritionist}</option>
          ))}
        </select>
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearMessages}>Clear All</button>
      </div>
    </div>
  );
};

export default Communication;
