import express from 'express';
import fileRoutes from './routes/fileRoutes';

const app = express();
app.use(express.json());

app.use('/uploads', fileRoutes);

export default app;
