const {redisClient} = require('./redisClient');
const { flushToMongoIfNeeded } = require('./utils/taskUtils');
require('dotenv').config();

module.exports = function setupWebSocket(io) {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('add', async (taskName) => {
      try {
        let taskList = [];
        const cached = await redisClient.get(process.env.REDIS_KEY);
        if (cached) taskList = JSON.parse(cached);

        taskList.push(taskName);

        if (taskList.length > 50) {
          await flushToMongoIfNeeded(taskList);
          taskList = [];
        }

        await redisClient.set(process.env.REDIS_KEY, JSON.stringify(taskList));
        io.emit('taskListUpdated', taskList);
      } catch (err) {
        console.error('WebSocket add error:', err);
      }
    });
  });
};