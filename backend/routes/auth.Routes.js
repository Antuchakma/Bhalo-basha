import express from "express"
import { Login, Logout, Signup } from "../Controllers/authController.js";
import { getCurrentUser } from "../Controllers/getCurrentUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/signup", Signup);
router.get("/me", authMiddleware, getCurrentUser);

export default router;