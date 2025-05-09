const express = require('express');
const taskRouter = express.Router();
const {redisClient} = require('../redisClient');
const TaskModel = require('../models/Task');
require('dotenv').config();

taskRouter.get('/', async (req, res) => {
  try {
    const cacheData = await redisClient.get(process.env.REDIS_KEY);
    const redisTasks = cacheData ? JSON.parse(cacheData) : [];
    const mongoTasks = await TaskModel.find({}, { _id: 0, name: 1 });
    const allTasks = [...redisTasks, ...mongoTasks.map(t => t.name)];
    res.status(200).json({ tasks: allTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  taskRouter
}