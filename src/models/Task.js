const mongoose = require('mongoose');
require('dotenv').config();


const taskSchema = new mongoose.Schema({
  name: {
    type : String, 
    require : true
  },
});


 const TaskModel= mongoose.model(process.env.Collection, taskSchema, );

 module.exports = TaskModel;