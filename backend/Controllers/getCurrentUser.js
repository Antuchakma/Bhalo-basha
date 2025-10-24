import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};