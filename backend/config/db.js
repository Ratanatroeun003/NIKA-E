import mongoose from 'mongoose';
const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successful Connected');
  } catch (error) {
    console.error('Fail connected', error.message);
    process.exit(1);
  }
};
export default connectedDB;
