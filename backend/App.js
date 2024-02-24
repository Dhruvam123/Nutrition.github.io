const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173', // Adjust this to your React app's URL
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Load existing messages from the database file
let messages = [];
const dbFilePath = 'db.json';
const dataFilePath = path.join(__dirname, 'data.json');
const secretKey = 'yourSecretKey'; // Replace with a secure secret key


// app.use(cors()); // Enable CORS for all routes

// // Dummy data storage
let users = [];

// Load existing data from file (if any)
try {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  users = JSON.parse(data);
} catch (error) {
  console.error('Error reading data file:', error.message);
}
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user with the provided username
  const user = users.find((user) => user.username === username);

  if (user && user.password === password) {
    // If user exists and password is correct, generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } else {
    // If user doesn't exist or password is incorrect, return an error
    res.status(401).json({ message: 'Login failed: Invalid credentials' });
  }
});
  // Add this GET route to your server file
  


  

// Route to save user data with token
// app.post('/saveData', (req, res) => {
//   const userData = req.body;

//   // Save data to the dummy storage
//   users.push(userData);

//   // Generate JWT token
//   const token = jwt.sign({ id: userData.id }, secretKey, { expiresIn: '1h' });

//   // Save token to user data
//   userData.token = token;

//   // Write updated data back to the file
//   try {
//     fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');
//     res.status(201).json({ message: 'Data saved successfully', token });
//   } catch (error) {
//     console.error('Error writing data to file:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1500); 
app.post('/saveData', (req, res) => {
  const userData = req.body;

  // Save data to the dummy storage
  users.push(userData);

  // Generate JWT token
  const token = jwt.sign({ id: userData.id }, secretKey, { expiresIn: '1h' });

  // Save token to user data
  userData.token = token;

  // Write updated data back to the file
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');

    // Emit an event to notify clients of the update
    eventEmitter.emit('dataUpdated');

    res.status(201).json({ message: 'Data saved successfully', token });
  } catch (error) {
    console.error('Error writing data to file:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete('/deleteDataByUsername/:username', (req, res) => {
  const usernameToDelete = req.params.username;

  // Log statements for debugging
  console.log('Deleting user with username:', usernameToDelete);

  // Find the index of the user with the given username in the array
  const userIndex = users.findIndex(user => user.username === usernameToDelete);

  if (userIndex !== -1) {
    console.log('User found:', users[userIndex]);

    // Remove the user from the array
    const deletedUser = users.splice(userIndex, 1)[0];

    // Write updated data back to the file
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');

      // Emit an event to notify clients of the update
      eventEmitter.emit('dataUpdated');

      res.status(200).json({ message: 'Data deleted successfully', deletedUser });
    } catch (error) {
      console.error('Error writing data to file:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    console.log('User not found');
    res.status(404).json({ message: 'User not found' });
  }
});




app.get('/getClients', (req, res) => {
  try {
    // Read the data from the data.json file synchronously
    const data = fs.readFileSync(dataFilePath, 'utf-8'); // Replace 'path/to/data.json' with the actual path
    const clients = JSON.parse(data);

    // Return the list of clients as JSON
    res.json(clients);
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/listenForUpdates', (req, res) => {
  const handleDataUpdated = () => {
    res.json({ message: 'Data updated' });

    // Remove the listener after sending the response
    eventEmitter.off('dataUpdated', handleDataUpdated);
  };

  // Attach the listener for data updates
  eventEmitter.once('dataUpdated', handleDataUpdated);
});































try {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  messages = JSON.parse(data);
} catch (error) {
  console.error('Error reading database file:', error.message);
}

app.get('/api/messages', (req, res) => {
  res.json(messages);
});


let messageIdCounter = 0;

// ... (your existing code)

app.post('/api/messages', (req, res) => {
  const { text, sender, details,reciever } = req.body;
  const newMessage = {
    id: ++messageIdCounter,
    text,
    sender,
    reciever,
    details, // Add details property here
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);

  // Save messages to the database file
  fs.writeFile(dbFilePath, JSON.stringify(messages, null, 2), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing to database file:', err.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      // Emit the new message to all connected clients
      io.emit('newMessage', newMessage);
      res.json({ success: true, message: 'Message sent successfully' });
    }
  });
});
app.get('/api/messages/:sender', (req, res) => {
  const sender = req.params.sender;
  const senderMessages = messages.filter(message => message.sender === sender);
  res.json(senderMessages);
});
app.get('/api/messages/reciever/:reciever', (req, res) => {
  const reciever = req.params.reciever;
  const recieverMessages = messages.filter(message => message.reciever === reciever);
  res.json(recieverMessages);
});



const appointmentsFilePath = './appointment.json';

// Load appointments from file
let appointments = loadAppointments();

// Function to load appointments from the JSON file
function loadAppointments() {
  try {
    const data = fs.readFileSync(appointmentsFilePath, 'utf-8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading appointments file:', error);
    return [];
  }
}

// Function to save appointments to the JSON file
function saveAppointments() {
  try {
    const data = JSON.stringify(appointments, null, 2);
    fs.writeFileSync(appointmentsFilePath, data);
  } catch (error) {
    console.error('Error writing to appointments file:', error);
  }
}

// Function to generate a unique ID
function generateAppointmentId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// ...

app.post('/api/appointments', (req, res) => {
  const { clientName, nutritionistName, selectedDate, selectedTime } = req.body;

  // Validate input
  if (!clientName || !nutritionistName || !selectedDate || !selectedTime) {
    return res.status(400).json({ error: 'Invalid input. Please fill in all fields.' });
  }

  // Check for existing appointments on the selected date and time
  const existingAppointment = appointments.find(
    (appointment) => appointment.selectedDate === selectedDate && appointment.selectedTime === selectedTime
  );

  if (existingAppointment) {
    return res.status(400).json({ error: 'Appointment slot is already booked. Please choose another date or time.' });
  }

  // Book the appointment with a unique ID
  const newAppointment = { id: generateAppointmentId(), clientName, nutritionistName, selectedDate, selectedTime, status: 'pending' };
  appointments.push(newAppointment);

  // Save appointments to the file
  saveAppointments();

  res.status(201).json(newAppointment);
});




app.get('/api/appointments1', (req, res) => {
  const { clientName } = req.query;
  const appointments = loadAppointments();

  if (!clientName) {
    return res.status(400).json({ error: 'Client name is required.' });
  }

  // Filter appointments based on the client name
  const clientAppointments = appointments.filter(appointment => appointment.clientName === clientName);

  // Display a success message
  res.json({ message: 'Client appointments fetched successfully.', appointments: clientAppointments });
});
app.get('/api/nutritionists', (req, res) => {
  const nutritionists = users.filter(user => user.role === 'Nutritionist');
  const usernames = nutritionists.map(nutritionist => nutritionist.username);
  res.json(usernames);
});
app.get('/api/appointments', (req, res) => {
  const { nutritionistName } = req.query;

  if (!nutritionistName) {
    return res.status(400).json({ error: 'Nutritionist name is required.' });
  }

  // Filter appointments based on the nutritionist's username
  const filteredAppointments = appointments.filter(appointment => appointment.nutritionistName === nutritionistName);

  res.json({ appointments: filteredAppointments });
});












// Route to approve an appointment
// app.post('/api/appointments/approve/:clientName', (req, res) => {
//   const { clientName } = req.params;

//   const appointmentIndex = appointments.findIndex(appointment => appointment.clientName === clientName);

//   if (appointmentIndex !== -1) {
//     // Update the appointment status to 'approved'
//     appointments[appointmentIndex].status = 'approved';

//     // Save appointments to the file
//     saveAppointments();

//     res.json({ message: 'Appointment approved successfully.' });
//   } else {
//     res.status(404).json({ error: 'Appointment not found.' });
//   }
// });

// // Route to reject an appointment
// app.post('/api/appointments/reject/:clientName', (req, res) => {
//   const { clientName } = req.params;
//   const { cancellationReason } = req.body;

//   const appointmentIndex = appointments.findIndex(appointment => appointment.clientName === clientName);

//   if (appointmentIndex !== -1) {
//     // Update the appointment status to 'rejected'
//     appointments[appointmentIndex].status = 'rejected';
//     appointments[appointmentIndex].cancellationReason = cancellationReason;

//     // Save appointments to the file
//     saveAppointments();

//     res.json({ message: 'Appointment rejected successfully.' });
//   } else {
//     res.status(404).json({ error: 'Appointment not found.' });
//   }
// });


// Route to approve an appointment
app.post('/api/appointments/approve/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;

  const appointmentIndex = appointments.findIndex(appointment => appointment.id === appointmentId);

  if (appointmentIndex !== -1) {
    // Update the appointment status to 'approved'
    appointments[appointmentIndex].status = 'approved';

    // Save appointments to the file
    saveAppointments();

    res.json({ message: 'Appointment approved successfully.' });
  } else {
    res.status(404).json({ error: 'Appointment not found.' });
  }
});

// Route to reject an appointment
app.post('/api/appointments/reject/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;
  const { cancellationReason } = req.body;

  const appointmentIndex = appointments.findIndex(appointment => appointment.id === appointmentId);

  if (appointmentIndex !== -1) {
    // Update the appointment status to 'rejected'
    appointments[appointmentIndex].status = 'rejected';
    appointments[appointmentIndex].cancellationReason = cancellationReason;

    // Save appointments to the file
    saveAppointments();

    res.json({ message: 'Appointment rejected successfully.' });
  } else {
    res.status(404).json({ error: 'Appointment not found.' });
  }
});






























// Assuming you have an endpoint to fetch client names
app.get('/api/clientNames', (req, res) => {
  const { nutritionistName } = req.query;

  // Filter appointments based on the nutritionist's username
  const filteredAppointments = appointments.filter(appointment => appointment.nutritionistName === nutritionistName);

  // Extract client names from the filtered appointments   
  const clientNames = filteredAppointments.map(appointment => appointment.clientName);

  // Remove duplicates using Set and convert back to an array
  const uniqueClientNames = [...new Set(clientNames)];

  res.json({ clientNames: uniqueClientNames });
});













io.on('connection', (socket) => {
  console.log(`User connected with socket ID: ${socket.id}`);

  // Handle joining a room based on client type (e.g., doctor or client)
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected with socket ID: ${socket.id}`);
  });
});

server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});














