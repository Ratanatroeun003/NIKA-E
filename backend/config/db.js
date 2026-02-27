import mongoose from 'mongoose';

const dbName = 'NIKA-E';
const uri = `mongodb+srv://Ratana:02062005@cluster0.eb9ecgu.mongodb.net/${dbName}?appName=Cluster0`;
const connectedDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Successful Connected');
  } catch (error) {
    console.error('Fail connected', error.message);
    process.exit(1);
  }
};
export default connectedDB;
