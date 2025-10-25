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
    enum: [
      'KUET Campus',
      'Fulbarigate',
      'Boyra',
      'Khulna City',
      'Daulatpur',
      'Sonadanga',
      'Khalishpur',
      'New Market',
      'Gollamari',
      'Other'
    ]
  },
  specificAddress: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Apartment', 'House', 'Room', 'Hostel'],
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    default: false,
  },
  amenities: {
    type: [String],
    default: [],
  },
  listingType: {
    type: String,
    required: true,
    enum: ['owner', 'tenant-roommate'],
  },
  listingTypeDetails: {
    type: String,
  },
  genderPreference: {
    type: String,
    required: true,
    enum: ['male', 'female', 'any'],
  },
  contactPhone: {
    type: String,
    required: true,
  },
  advancePayment: {
    type: Number, // Number of months of advance payment required
    required: true,
    min: 0,
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