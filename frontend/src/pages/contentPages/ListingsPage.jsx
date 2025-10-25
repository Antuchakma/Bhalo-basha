import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Footer from "../../lib/Footer.jsx";
import ListingChatBot from "../../components/ListingChatBot";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { UserCircle, Menu, X } from "lucide-react";
import "@fontsource/space-grotesk";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "Messages", path: "/messages" },
  { name: "About", path: "/about" },
];

function ListingsPage() {
  const { user, setUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minRent: '',
    maxRent: '',
    bedrooms: '',
    furnished: '',
    listingType: '',
    genderPreference: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const locationOptions = [
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
  ];

  const propertyTypes = ['Apartment', 'House', 'Room', 'Hostel'];
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log('Filter changed:', { name, value });
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = (chatbotFilters = null) => {
    let filtered = [...products];
    const activeFilters = chatbotFilters || filters;
    
    // Debug log for listing type filter
    console.log('Current filters:', activeFilters);
    console.log('Available products:', products.map(p => ({
      title: p.title,
      listingType: p.listingType
    })));

    if (activeFilters.location) {
      filtered = filtered.filter(product => product.location === activeFilters.location);
    }

    if (activeFilters.propertyType) {
      filtered = filtered.filter(product => product.propertyType === activeFilters.propertyType);
    }

    if (activeFilters.minRent) {
      filtered = filtered.filter(product => product.rent >= Number(activeFilters.minRent));
    }

    if (activeFilters.maxRent) {
      filtered = filtered.filter(product => product.rent <= Number(activeFilters.maxRent));
    }

    if (activeFilters.bedrooms) {
      filtered = filtered.filter(product => {
        if (activeFilters.bedrooms === "4+") {
          return product.bedrooms >= 4;
        }
        return product.bedrooms === Number(activeFilters.bedrooms);
      });
    }

    if (activeFilters.furnished) {
      filtered = filtered.filter(product => product.furnished === (activeFilters.furnished === 'true'));
    }

    if (activeFilters.listingType) {
      console.log('Active filter value:', activeFilters.listingType);
      filtered = filtered.filter(product => {
        console.log('Product:', {
          title: product.title,
          listingType: product.listingType,
          matches: product.listingType === activeFilters.listingType
        });
        return product.listingType === activeFilters.listingType;
      });
    }

    if (activeFilters.genderPreference) {
      filtered = filtered.filter(product => product.genderPreference === activeFilters.genderPreference);
    }

    setFilteredProducts(filtered);
    
    if (chatbotFilters) {
      setFilters(chatbotFilters);
      setShowFilters(true);
    }
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      minRent: '',
      maxRent: '',
      bedrooms: '',
      furnished: '',
    });
    setFilteredProducts(products);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5002/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/product/");
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="w-screen min-h-screen bg-base-100 text-base-content font-[Space Grotesk] overflow-x-hidden">
      <Navbar 
        user={user}
        setUser={setUser}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Section */}
      <div className="pt-24 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header with Add Listing Button */}
          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-teal-900">
                Available <span className="text-teal-600">Listings</span>
              </h1>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/add-listing")}
                  className="px-6 py-3 bg-teal-900 text-white font-semibold rounded-full shadow-md hover:bg-teal-800 transition-all"
                >
                  + Add Listing
                </motion.button>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-teal-900">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-teal-600 hover:text-teal-700"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              {showFilters && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <select
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Location</option>
                      {locationOptions.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>

                    <select
                      name="propertyType"
                      value={filters.propertyType}
                      onChange={handleFilterChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Property Type</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="minRent"
                        placeholder="Min Rent"
                        value={filters.minRent}
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                      />
                      <input
                        type="number"
                        name="maxRent"
                        placeholder="Max Rent"
                        value={filters.maxRent}
                        onChange={handleFilterChange}
                        className="input input-bordered w-full"
                      />
                    </div>

                    <input
                      type="number"
                      name="bedrooms"
                      placeholder="Bedrooms"
                      value={filters.bedrooms}
                      onChange={handleFilterChange}
                      className="input input-bordered w-full"
                    />

                    <select
                      name="furnished"
                      value={filters.furnished}
                      onChange={handleFilterChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Furnished Status</option>
                      <option value="true">Furnished</option>
                      <option value="false">Unfurnished</option>
                    </select>

                    <select
                      name="listingType"
                      value={filters.listingType}
                      onChange={handleFilterChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Listing Type</option>
                      <option value="owner">Property Owner</option>
                      <option value="tenant-roommate">Tenant Seeking Roommate</option>
                    </select>

                    <select
                      name="genderPreference"
                      value={filters.genderPreference}
                      onChange={handleFilterChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Gender Preference</option>
                      <option value="male">Males Only</option>
                      <option value="female">Females Only</option>
                      <option value="any">Any Gender</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {loading && (
            <div className="text-center mt-10 text-gray-600 text-lg">
              Loading listings...
            </div>
          )}
          {error && (
            <div className="text-center mt-10 text-red-500 text-lg">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                  No listings available yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/listing/${product._id}`} // <-- clickable
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
                      >
                        <img
                          src={product.images?.[0] || "/placeholder.jpg"}
                          alt={product.title}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-5">
                          {/* Badges for listing type and gender preference */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.listingType === 'owner' 
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {product.listingType === 'owner' ? 'Property Owner' : 'Tenant Seeking Roommate'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              !product.genderPreference || product.genderPreference === 'any'
                                ? 'bg-gray-100 text-gray-800'
                                : product.genderPreference === 'male'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-pink-100 text-pink-800'
                            }`}>
                              {!product.genderPreference || product.genderPreference === 'any' 
                                ? 'Any Gender' 
                                : `${product.genderPreference === 'male' ? 'Males' : 'Females'} Only`}
                            </span>
                          </div>

                          <h2 className="text-xl font-semibold text-gray-800">
                            {product.title}
                          </h2>
                          <div className="flex justify-between items-start">
                            <p className="text-gray-500 text-sm">
                              {product.location}
                            </p>
                            <p className="text-xs text-teal-600">
                              Posted by {product.user?.username}
                            </p>
                          </div>
                          <p className="text-gray-600 line-clamp-2 text-sm mb-3">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-teal-700 font-bold">
                              {product.rent} ৳ /month
                            </p>
                            <p className="text-xs text-gray-400">
                              {product.contractDuration} mo contract
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <Footer />
      
      {/* Chatbot */}
      <ListingChatBot onFilterChange={applyFilters} />
    </div>
  );
}

export default ListingsPage;
