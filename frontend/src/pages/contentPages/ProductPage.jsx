import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react";

function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-teal-900 font-semibold mb-6 hover:text-teal-700 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Image Gallery */}
        {product.images && product.images.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 object-cover md:col-span-2 rounded-t-2xl"
            />
            {product.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Image ${i + 1}`}
                className="w-full h-64 object-cover"
              />
            ))}
          </div>
        ) : (
          <img
            src="/placeholder.jpg"
            alt="Placeholder"
            className="w-full h-96 object-cover rounded-t-2xl"
          />
        )}

        {/* Details Section */}
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-teal-900">{product.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-700">
            <p className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-700" />
              <span>{product.location}</span>
            </p>
            <p className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-teal-700" />
              <span className="font-semibold">{product.rent} ৳ /month</span>
            </p>
            <p className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-teal-700" />
              <span>{product.contractDuration} month contract</span>
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductPage;

