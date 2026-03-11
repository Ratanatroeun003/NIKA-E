import express from 'express';
import connectedDB from './config/db.js';
import { productRoute } from './Routes/ProductRoutes.js';
import { UserRoute } from './Routes/UserRoutes.js';
import { adminRoute } from './Routes/Admin.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/user', UserRoute);
app.use('/api/admin', adminRoute);
connectedDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
