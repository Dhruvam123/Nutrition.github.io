// import React, { useState, useEffect } from 'react';

// const MessageDisplay = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/getMessages');
//       if (response.ok) {
//         const data = await response.json();
//         setMessages(data);
//       } else {
//         console.error('Failed to fetch messages:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error.message);
//     }
//   };
//   const userId=1;

//   // const sendMessage = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:3001/api/sendMessageToClient', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ userId, messages }),
//   //     });
  
//   //     if (response.ok) {
//   //       const result = await response.json();
//   //       console.log(result); // Handle success response
//   //     } else {
//   //       const errorText = await response.text(); // Fetch the error message as text
//   //       console.error(errorText); // Handle error response
//   //     }
//   //   } catch (error) {
//   //     console.error('Error sending message to client:', error.message);
//   //   }
//   // };
  
//   const sendMessageToClient = () => {
//     // Make a POST request to the server to send the message to a specific user
//     fetch('http://localhost:3001/api/sendMessageToClient', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId, messages }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         console.log('Message sent successfully');
//       } else {
//         console.error('Error: User not found');
//       }
//     })
//     .catch(error => {
//       console.error('Error sending message:', error);
//     });
//   };
  

//   const handleInputChange = (event) => {
//     setNewMessage(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Messages</h2>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message.message}</li>
//         ))}
//       </ul>
//       <div>
//         <input type="text" value={newMessage} onChange={handleInputChange} />
//         <button onClick={sendMessageToClient}>Send Message to Client</button>
//       </div>
//     </div>
//   );
// };

// export default MessageDisplay;
// src/DoctorComponent.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './MessageDisplay.css';
import { useAuth } from './AuthContext';

const MessageDisplay = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selfmessages, setSelfMessages] = useState([]);
  const { username } = useAuth();
  const [nutritionistClients, setNutritionistClients] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    setSocket(socket);

    const sender = 'doctor';

    // Fetch stored messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem(`${username}_selfmessages`)) || [];
    setSelfMessages(storedMessages);

    axios.get(`http://localhost:3001/api/clientNames?nutritionistName=${username}`)
      .then((response) => setNutritionistClients(response.data.clientNames || []))
      .catch((error) => console.error('Error fetching clients for nutritionist:', error));

    socket.on('newMessage', (newMessage) => {
      if (newMessage.sender === username) {
        setSelfMessages((prevMessages) => [...prevMessages, newMessage]);
        notifyOtherInstances(newMessage);
      } else if (newMessage.reciever === username) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    // Save messages to localStorage whenever selfmessages change
    localStorage.setItem(`${username}_selfmessages`, JSON.stringify(selfmessages));
  }, [selfmessages, username]);

  const sendMessage = () => {
    if (message.trim() === '' || selectedClient === '') return;

    axios.post('http://localhost:3001/api/messages', { text: message, sender: username, reciever: selectedClient })
      .then(() => setMessage(''))
      .catch((error) => console.error('Error sending message:', error));
  };

  const clearAllMessages = () => {
    // Update the state to clear all messages on the frontend
    setSelfMessages([]);
    sessionStorage.removeItem(`${username}_selfmessages`); // Clear sessionStorage
  };

 const fetchMessagesBySender = (sender) => {
  axios.get(`http://localhost:3001/api/messages/${sender}`)
    .then((response) => {
      const filteredMessages = response.data.filter((msg) => msg.reciever === username);
      setMessages(filteredMessages);
    })
    .catch((error) => console.error(`Error fetching messages for reciever ${username}:`, error));
};


  const handleSenderChange = (e) => {
    const selectedSender = e.target.value;
    setSelectedClient(selectedSender);
    fetchMessagesBySender(selectedSender);
  };

  return (
    <div className="message-display-container">
      <h2>Doctor Component</h2>
      <div className="message-container">
        {selfmessages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === username ? 'doctor' : 'patient'}`}
          >
            {msg.sender === username ? <strong>{username} </strong> : <strong> ....</strong>}
            {msg.text}
          </div>
        ))}
      </div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message doctor`}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <select value={selectedClient} onChange={handleSenderChange}>
          <option value="" disabled>Select a client</option>
          {nutritionistClients.map((client, index) => (
            <option key={index} value={client}>{client}</option>
          ))}
        </select>
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearAllMessages}>Clear All</button>
      </div>
    </div>
  );
};

export default MessageDisplay;






