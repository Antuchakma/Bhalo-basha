import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../lib/axios";
import { motion } from "framer-motion";
import { MapPin, Trash2, Plus, Home, Bed, Bath } from "lucide-react";
import { Link, useNavigate } from "react-router";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="h-48 bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="h-5 bg-slate-200 rounded w-1/3" />
    </div>
  </div>
);

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {s
    if (!user) { navigate("/login"); return; }
    const fetchMyListings = async () => {
      try {
        const res = await api.get("/api/product/my-listings");
        setMyListings(res.data.products);
      } catch (err) {
        setError("Failed to load your listings");
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      setMyListings((prev) => prev.filter((l) => l._id !== id));
      setDeleteId(null);
    } catch (err) {
      alert("Failed to delete listing");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="relative h-40 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=60')] bg-cover bg-center mix-blend-overlay opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <span className="text-3xl font-bold text-white">
                {user.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{user.fullname || user.username}</h1>
                <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full capitalize border border-teal-200">
                  {user.role}
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-0.5">@{user.username}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" /> {myListings.length} listing{myListings.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Listings Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">My Listings</h2>
          <Link
            to="/add-listing"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition"
          >
            <Plus className="w-4 h-4" /> Add Listing
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && <div className="text-center py-12 text-red-500">{error}</div>}

        {!loading && !error && myListings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-2">No listings yet</h3>
            <p className="text-slate-500 text-sm mb-4">Start by adding your first property listing</p>
            <Link to="/add-listing" className="text-teal-600 text-sm font-medium hover:underline">Add a listing</Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((listing, i) => (
            <motion.div
              key={listing._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={listing.images?.[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=60"}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-bold text-lg">
                  {listing.rent} <span className="text-sm font-normal text-white/80">৳/mo</span>
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 truncate mb-1">{listing.title}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  {listing.bedrooms && <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {listing.bedrooms} bed</span>}
                  {listing.bathrooms && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {listing.bathrooms} bath</span>}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link to={`/listing/${listing._id}`} className="text-teal-600 text-sm font-medium hover:text-teal-700 transition">
                    View Details
                  </Link>
                  <button
                    onClick={() => setDeleteId(listing._id)}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete listing?</h3>
            <p className="text-slate-500 text-sm mb-6">This action cannot be undone. The listing will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
