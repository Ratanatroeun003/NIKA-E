import express from 'express';
import { getAllUser } from '../controller/AdminController.js';
import { verifyAdmin, verifyToken } from '../Middleware/authMiddleware.js';
const router = express.Router();

router.get('/getAll', verifyToken, verifyAdmin, getAllUser);
export { router as adminRoute };
