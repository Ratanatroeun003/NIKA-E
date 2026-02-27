import express from 'express';
import connectedDB from './config/db.js';
import { productRoute } from './Routes/ProductRoutes.js';
import { UserRoute } from './Routes/UserRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/user', UserRoute);
connectedDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
