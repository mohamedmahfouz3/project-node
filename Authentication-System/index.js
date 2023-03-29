const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
 
mongoose.set('strictQuery', false);
dotenv.config();

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('Listening on port 4000!!!!!!!!');
  });
};

start();
