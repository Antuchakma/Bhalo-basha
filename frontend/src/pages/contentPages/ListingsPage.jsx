import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Footer from "../../lib/Footer.jsx";
import { UserCircle, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import "@fontsource/space-grotesk";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "About", path: "/about" },
];

function ListingsPage() {
  const { user, setUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

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
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-base-100 text-base-content font-[Space Grotesk] overflow-x-hidden">
      {/* Navbar */}
      <div className="navbar px-4 sm:px-6 shadow-md h-16 fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        <div className="flex-1">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold tracking-wide text-teal-900 hover:text-teal-700 transition-colors"
          >
            Bhalo-Basha
          </Link>
        </div>

        <div className="hidden sm:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="relative text-sm font-medium text-teal-900 transition-colors duration-300 hover:text-teal-700
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-teal-700
              after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="btn btn-ghost btn-circle"
              >
                <UserCircle className="w-6 h-6 text-teal-900" />
              </button>
              {profileOpen && (
                <ul className="absolute right-0 mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-48 border border-gray-200">
                  <li className="px-2 py-1 font-semibold text-gray-700">
                    {user.username} ({user.role})
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-2 py-1 text-sm font-medium text-gray-800 hover:text-teal-700 transition-colors"
                    >
                      View Profile
                    </Link>
                  </li>
                  {user.role === "owner" && (
                    <li>
                      <Link
                        to="/add-listing"
                        className="block px-2 py-1 text-sm font-medium text-gray-800 hover:text-teal-700 transition-colors"
                      >
                        Add Listing
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-2 py-1 text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-teal-900 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Login / Signup
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-teal-900" />
            ) : (
              <Menu className="w-6 h-6 text-teal-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`sm:hidden fixed top-16 left-0 w-full bg-white shadow-md border-b border-gray-200 transition-all duration-300 overflow-hidden z-20 ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-base font-medium text-teal-900 hover:text-teal-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <span className="font-semibold text-teal-900">
                {user.username} ({user.role})
              </span>
              {user.role === "owner" && (
                <Link
                  to="/add-listing"
                  className="text-base font-medium text-teal-900 hover:text-teal-700 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Add Listing
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="text-base font-medium text-red-600 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-base font-medium text-teal-900 hover:text-teal-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {/* Main Section */}
      <div className="pt-24 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-teal-900 mb-10">
            Available <span className="text-teal-600">Listings</span>
          </h1>

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
                  {products.map((product) => (
                    <motion.div
                      key={product._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
                    >
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="p-5">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {product.title}
                        </h2>
                        <p className="text-gray-500 text-sm mb-2">
                          {product.location}
                        </p>
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
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default ListingsPage;
