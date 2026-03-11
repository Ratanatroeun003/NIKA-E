import express from 'express';
import {
  GetProfile,
  LoginUser,
  RegisterUser,
  UpdateUser,
} from '../controller/UserController.js';
import { upload } from '../Middleware/cloudinaryConfig.js';
import { verifyToken } from '../Middleware/authMiddleware.js';
const router = express.Router();

router.post('/RegisterUser', upload.single('avatar'), RegisterUser);
router.post('/LoginUser', LoginUser);
router.get('/get-profile', verifyToken, GetProfile);
router.put('/update-user', verifyToken, upload.single('avatar'), UpdateUser);
export { router as UserRoute };
