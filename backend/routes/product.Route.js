import express from 'express';
import { getAllProducts } from '../Controllers/productController.js';
import { createProduct } from '../Controllers/createProduct.js';
import { getProductById } from '../Controllers/getProductById.js';
import { deleteProduct } from '../Controllers/deleteProduct.js';


const router = express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.post("/",createProduct);
router.delete("/:id",deleteProduct);

export default router;


