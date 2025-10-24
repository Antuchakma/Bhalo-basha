import Product from "../models/product.model.js";

export const getMyListings = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id })
            .sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching user's products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};