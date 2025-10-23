import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs

    const newProduct = new Product({
      ...req.body,
      images: imageUrls,
      user: req.user.id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
