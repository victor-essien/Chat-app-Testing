const express = require('express');
const socketIO = require('socket.io');

// Create an express server
const app = express();
const port = process.env.PORT || 8080; // Use the assigned port or default to 3000


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create a Socket.IO instance
const io = socketIO(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Handle client connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming chat messages
  socket.on('chat message', (message) => {
    console.log('Message:', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
