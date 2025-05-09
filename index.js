const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const setupWebSocket = require('./src/websocket');
const { mongodb_Connection } = require('./src/config/db');
const { taskRouter } = require('./src/routes/fetchTasks');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/fetchAllTasks', taskRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

//socket server
setupWebSocket(io);

const PORT = process.env.SERVER_PORT || 5000;
server.listen(PORT, async () => {
  try {
    await mongodb_Connection
    console.log("MongoDB connected successfully");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB or Redis:", error.message);
  }
});
