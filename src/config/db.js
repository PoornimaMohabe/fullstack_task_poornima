const mongoose = require("mongoose")
require('dotenv').config()

const connection_String = `${process.env.DB_URL}/${process.env.Database}`
const mongodb_Connection = mongoose.connect(connection_String)

module.exports = {
  mongodb_Connection
}

