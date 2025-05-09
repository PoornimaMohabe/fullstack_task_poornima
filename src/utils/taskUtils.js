const TaskModel = require('../models/Task');
const {redisClient} = require('../redisClient');
require('dotenv').config();



async function flushToMongoIfNeeded(taskArray) {
  if (taskArray.length > 0) {
    const docs = taskArray.map(name => ({ name }));
    await TaskModel.insertMany(docs);
    await redisClient.del(process.env.REDIS_KEY);
  }
}

module.exports = { flushToMongoIfNeeded };
