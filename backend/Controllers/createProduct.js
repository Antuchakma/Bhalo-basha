import Product from "../models/product.model.js";  // adjust path if needed

export const createProduct = async (req, res) => {
  try {
    // Attach the user ID to the product
    // Assumes req.user.id is set by your auth middleware
    const newProduct = new Product({ ...req.body, user: req.user.id });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
