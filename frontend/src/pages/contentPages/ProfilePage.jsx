import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Trash2, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyListings = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/product/my-listings", {
          withCredentials: true,
        });
        setMyListings(res.data.products);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load your listings");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`http://localhost:5002/api/product/${id}`, {
        withCredentials: true,
      });
      setMyListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete listing");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-teal-700">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>

        {/* My Listings Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
            <Link
              to="/add-listing"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              + Add New Listing
            </Link>
          </div>

          {loading && (
            <div className="text-center py-8 text-gray-500">Loading your listings...</div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">{error}</div>
          )}

          {!loading && !error && myListings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              You haven't posted any listings yet.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((listing) => (
              <motion.div
                key={listing._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <img
                  src={listing.images?.[0] || "/placeholder.jpg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {listing.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">{listing.rent} ৳ /month</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/listing/${listing._id}`}
                      className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="text-red-500 hover:text-red-600 p-2"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;