import express from 'express';
import {
  createProduct,
  getAllProduct,
  latestProduct,
  recommendedProduct,
} from '../controller/ProductController.js';
const router = express.Router();
// create product
router.post('/createProduct', createProduct);
//get all product
router.get('/getAllProduct', getAllProduct);
// recommended product
router.get('/recommendedPro', recommendedProduct);
router.get('/latestProduct', latestProduct);
export { router as productRoute };
