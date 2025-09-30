import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  contractDuration: {
    type: Number,
    required: true, 
    min: 1, // Minimum duration in months
  },
  location: {  
    type: String,
    required: true,
  },    
    images: {   
    type: [String], // Array of image URLs
    default: [],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
},

{    timestamps: true,});

const Product = mongoose.model("Product", productSchema);

export default Product;