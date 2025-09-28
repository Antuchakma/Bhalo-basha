import Product from "../models/product.model.js";

export const getProductById = async (req, res) => {
    const { id } = req.params;  // Extract the product ID from the request parameters
    try {
        const product = await Product.findById(id);  // Fetch the product by ID from the database
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }   
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }   
}