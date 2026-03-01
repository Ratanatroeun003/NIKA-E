import express from 'express';
import { LoginUser, RegisterUser } from '../controller/UserController.js';
import { upload } from '../Middleware/cloudinaryConfig.js';
const router = express.Router();

router.post('/RegisterUser', upload.single('avatar'), RegisterUser);
router.post('/LoginUser', LoginUser);
export { router as UserRoute };
