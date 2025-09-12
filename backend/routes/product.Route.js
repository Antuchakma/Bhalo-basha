import express from 'express';
import { getAllProducts } from '../Controllers/productController.js';
import { createProduct } from '../Controllers/createProduct.js';


const router = express.Router();

router.get("/",getAllProducts);
router.post("/",createProduct);

export default router;


