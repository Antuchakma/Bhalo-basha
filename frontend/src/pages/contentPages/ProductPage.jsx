import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, DollarSign, Bed, Bath, Check, HomeIcon, Phone, MapPinOff, MessageSquare } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import Chat from "../../components/Chat";

function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { user } = useContext(AuthContext);
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
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-teal-900">{product.title}</h1>
            <div className="text-right">
              <p className="text-sm text-teal-600">Posted by</p>
              <p className="font-semibold text-teal-800">{product.user?.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-teal-700" />
                  <div>
                    <p className="font-semibold text-xl">{product.rent} ৳</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock className="w-5 h-5 text-teal-700" />
                  <div>
                    <p className="font-semibold">{product.contractDuration} months</p>
                    <p className="text-sm text-gray-500">contract duration</p>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-teal-700 mt-1" />
                  <div>
                    <p className="font-semibold">{product.location}</p>
                    <p className="text-gray-500">{product.specificAddress}</p>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <HomeIcon className="w-5 h-5 text-teal-700" />
                  <span>{product.propertyType}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-teal-700" />
                  <span>{product.advancePayment} months advance</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Bed className="w-5 h-5 text-teal-700" />
                  <span>{product.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Bath className="w-5 h-5 text-teal-700" />
                  <span>{product.bathrooms} Bathrooms</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.furnished && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Check className="w-5 h-5 text-teal-700" />
                      <span>Furnished</span>
                    </div>
                  )}
                  {product.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <Check className="w-5 h-5 text-teal-700" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Contact Information */}
                <div className="bg-teal-50 p-4 rounded-lg space-y-3">
                <h3 className="text-lg font-semibold text-teal-900">Contact Information</h3>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone className="w-5 h-5 text-teal-700" />
                  <a href={`tel:${product.contactPhone}`} className="hover:text-teal-700">
                    {product.contactPhone}
                  </a>
                </div>
                {user && user.id !== product.user._id && (
                  <button
                    onClick={() => setShowChat(true)}
                    className="flex items-center space-x-2 text-teal-700 hover:text-teal-800 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                )}
              </div>

              {/* Chat Window */}
              {showChat && (
                <Chat
                  listingId={product._id}
                  receiverId={product.user._id}
                  receiverName={product.user.username}
                  onClose={() => setShowChat(false)}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductPage;

