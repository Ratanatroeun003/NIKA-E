import express from 'express';
import {
  deleteProduct,
  deleteUser,
  getAllProduct,
  getAllUser,
  getAuditLogs,
  getProductById,
  updateProduct,
  updateUserRole,
  uploadProductImage,
} from '../controller/AdminController.js';
import { verifyAdmin, verifyToken } from '../Middleware/authMiddleware.js';
import { uploadProduct } from '../Middleware/cloudinaryConfig.js';
const router = express.Router();

router.get('/getAll', verifyToken, verifyAdmin, getAllUser);
router.get('/audit-logs/:userId', verifyToken, verifyAdmin, getAuditLogs);
router.put(
  '/updateUserRole/:id/role',
  verifyToken,
  verifyAdmin,
  updateUserRole,
);
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteUser);
router.get('/getAllProduct', verifyToken, verifyAdmin, getAllProduct);
router.post(
  '/upload',
  verifyToken,
  verifyAdmin,
  uploadProduct.single('image'),
  uploadProductImage,
);
router.get('/getProductById/:id', verifyToken, verifyAdmin, getProductById);
router.put('/updateProduct/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/deleteProduct/:id', verifyToken, verifyAdmin, deleteProduct);

export { router as adminRoute };
