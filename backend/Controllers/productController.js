import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('user', 'username')  // Populate user information with username
            .sort({ createdAt: -1 });  // Sort by newest first
        res.status(200).json({products});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}