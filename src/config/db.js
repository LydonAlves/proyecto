const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to the database successfully')
  } catch (error) {
    console.log('Error in connecting to the Database')
  }
}

module.exports = connectDB
