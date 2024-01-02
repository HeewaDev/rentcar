const mongoose = require('mongoose');

async function connectDb() {
  try {
    await mongoose.connect('mongodb+srv://hiwasedradin:hiwa1234@hiwacluster.50lvx2t.mongodb.net/RenterKRD', {
     
    });
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection unsuccessful:', error.message);
  }
}
connectDb()
module.exports = connectDb;
