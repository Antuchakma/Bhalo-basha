import React, { useEffect, useState, useContext } from "react";
import api from "../../lib/axios";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Footer from "../../lib/Footer.jsx";
import ListingChatBot from "../../components/ListingChatBot";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, SlidersHorizontal, X, Plus } from "lucide-react";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="h-52 bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-slate-200 rounded-full w-20" />
        <div className="h-6 bg-slate-200 rounded-full w-16" />
      </div>
      <div className="h-5 bg-slate-200 rounded w-1/3 mt-2" />
    </div>
  </div>
);

function ListingsPage() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    location: '', propertyType: '', minRent: '', maxRent: '',
    bedrooms: '', furnished: '', listingType: '', genderPreference: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const locationOptions = ['KUET Campus', 'Fulbarigate', 'Boyra', 'Khulna City', 'Daulatpur', 'Sonadanga', 'Khalishpur', 'New Market', 'Gollamari', 'Other'];
  const propertyTypes = ['Apartment', 'House', 'Room', 'Hostel'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const applyFilters = (chatbotFilters = null) => {
    let filtered = [...products];
    const f = chatbotFilters || filters;

    if (f.location) filtered = filtered.filter(p => p.location === f.location);
    if (f.propertyType) filtered = filtered.filter(p => p.propertyType === f.propertyType);
    if (f.minRent) filtered = filtered.filter(p => p.rent >= Number(f.minRent));
    if (f.maxRent) filtered = filtered.filter(p => p.rent <= Number(f.maxRent));
    if (f.bedrooms) filtered = filtered.filter(p => f.bedrooms === "4+" ? p.bedrooms >= 4 : p.bedrooms === Number(f.bedrooms));
    if (f.furnished) filtered = filtered.filter(p => p.furnished === (f.furnished === 'true'));
    if (f.listingType) filtered = filtered.filter(p => p.listingType === f.listingType);
    if (f.genderPreference) filtered = filtered.filter(p => p.genderPreference === f.genderPreference);

    setFilteredProducts(filtered);
    if (chatbotFilters) { setFilters(chatbotFilters); setShowFilters(true); }
  };

  const resetFilters = () => {
    setFilters({ location: '', propertyType: '', minRent: '', maxRent: '', bedrooms: '', furnished: '', listingType: '', genderPreference: '' });
    setFilteredProducts(products);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/product/");
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => { applyFilters(); }, [filters]);

  const selectClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none transition appearance-none cursor-pointer";
  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none transition";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Listings</h1>
            <p className="text-slate-500 text-sm mt-1">
              {loading ? "Loading..." : `${filteredProducts.length} properties available`}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition ${
                showFilters || activeFilterCount > 0
                  ? 'bg-teal-50 border-teal-200 text-teal-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
            {user && (
              <button onClick={() => navigate("/add-listing")} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition">
                <Plus className="w-4 h-4" />
                Add Listing
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <select name="location" value={filters.location} onChange={handleFilterChange} className={selectClass}>
                <option value="">Any Location</option>
                {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select name="propertyType" value={filters.propertyType} onChange={handleFilterChange} className={selectClass}>
                <option value="">Any Property Type</option>
                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="flex gap-2">
                <input type="number" name="minRent" placeholder="Min ৳" value={filters.minRent} onChange={handleFilterChange} className={inputClass} />
                <input type="number" name="maxRent" placeholder="Max ৳" value={filters.maxRent} onChange={handleFilterChange} className={inputClass} />
              </div>
              <input type="number" name="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className={inputClass} />
              <select name="furnished" value={filters.furnished} onChange={handleFilterChange} className={selectClass}>
                <option value="">Furnished Status</option>
                <option value="true">Furnished</option>
                <option value="false">Unfurnished</option>
              </select>
              <select name="listingType" value={filters.listingType} onChange={handleFilterChange} className={selectClass}>
                <option value="">Listing Type</option>
                <option value="owner">Property Owner</option>
                <option value="tenant-roommate">Seeking Roommate</option>
              </select>
              <select name="genderPreference" value={filters.genderPreference} onChange={handleFilterChange} className={selectClass}>
                <option value="">Gender Preference</option>
                <option value="male">Males Only</option>
                <option value="female">Females Only</option>
                <option value="any">Any Gender</option>
              </select>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition">
                  <X className="w-4 h-4" /> Clear all
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-sm text-teal-600 hover:underline">Try again</button>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No listings found</h3>
                <p className="text-slate-500 text-sm mb-4">Try adjusting your filters</p>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-teal-600 text-sm font-medium hover:underline">Clear filters</button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.3, delay: (i % 4) * 0.05 }}
                  >
                    <Link to={`/listing/${product._id}`} className="group block">
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 ring-1 ring-slate-100 hover:ring-teal-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={product.images?.[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=60"}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Price on image */}
                          <div className="absolute bottom-3 left-3">
                            <span className="text-white font-bold text-lg">{product.rent} ৳</span>
                            <span className="text-white/70 text-sm"> /mo</span>
                          </div>

                          {/* Contract badge */}
                          <div className="absolute top-3 right-3">
                            <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                              {product.contractDuration} mo
                            </span>
                          </div>

                          {/* Hover badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-sm ${
                              product.listingType === 'owner'
                                ? 'bg-teal-500/80 text-white'
                                : 'bg-purple-500/80 text-white'
                            }`}>
                              {product.listingType === 'owner' ? 'Owner' : 'Roommate'}
                            </span>
                            {product.genderPreference && product.genderPreference !== 'any' && (
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-sm ${
                                product.genderPreference === 'male' ? 'bg-blue-500/80 text-white' : 'bg-pink-500/80 text-white'
                              }`}>
                                {product.genderPreference === 'male' ? 'Males' : 'Females'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-800 truncate mb-1">{product.title}</h3>
                          <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{product.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            {product.bedrooms && (
                              <span className="flex items-center gap-1">
                                <Bed className="w-3.5 h-3.5" /> {product.bedrooms} bed
                              </span>
                            )}
                            {product.bathrooms && (
                              <span className="flex items-center gap-1">
                                <Bath className="w-3.5 h-3.5" /> {product.bathrooms} bath
                              </span>
                            )}
                            {product.furnished && (
                              <span className="text-teal-600 font-medium">Furnished</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
      <ListingChatBot onFilterChange={applyFilters} />
    </div>
  );
}

export default ListingsPage;
