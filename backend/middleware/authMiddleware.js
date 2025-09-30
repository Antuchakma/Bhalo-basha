// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // import your User model

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // JWT stored in cookie
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fetch full user object from DB (excluding password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach full user object to request
    req.user = user;

    next(); // pass control to the next middleware/route
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Token is invalid or expired" });
  }
};
