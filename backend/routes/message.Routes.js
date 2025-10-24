import express from "express";
import { sendMessage, getMessages, getUnreadCount, getConversations } from "../Controllers/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conversations", authMiddleware, getConversations);
router.post("/", authMiddleware, sendMessage);
router.get("/:userId/:listingId", authMiddleware, getMessages);
router.get("/unread", authMiddleware, getUnreadCount);

export default router;