import express from "express";
import { getAllProducts } from "../Controllers/productController.js";
import { createProduct } from "../Controllers/createProduct.js";
import { getProductById } from "../Controllers/getProductById.js";
import { deleteProduct } from "../Controllers/deleteProduct.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // <--- Add this

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.array("images", 5), createProduct); // <-- handle up to 5 images
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
