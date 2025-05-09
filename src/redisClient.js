const { createClient } = require('redis');
require('dotenv').config();

const redisClient = createClient({
  socket: {
    host: process.env.Host,
    port: process.env.Port,
  },
  username: process.env.UserNameRedis,
  password: process.env.Password,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

(async () => {
  await redisClient.connect();
  console.log("Redis connected successfully");
})();

module.exports = {
  redisClient
};
