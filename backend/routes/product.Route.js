import express from "express";
import { getAllProducts } from "../Controllers/productController.js";
import { createProduct } from "../Controllers/createProduct.js";
import { getProductById } from "../Controllers/getProductById.js";
import { deleteProduct } from "../Controllers/deleteProduct.js";
import { getMyListings } from "../Controllers/getMyListings.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/my-listings", authMiddleware, getMyListings);
router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.array("images", 5), createProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
