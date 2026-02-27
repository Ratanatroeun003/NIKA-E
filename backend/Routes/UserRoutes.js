import express from 'express';
import { LoginUser, RegisterUser } from '../controller/UserController.js';
const router = express.Router();

router.post('/RegisterUser', RegisterUser);
router.post('/LoginUser', LoginUser);
export { router as UserRoute };
