import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = (): Promise<void> => {
  return mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  });
};

export default connectDB;