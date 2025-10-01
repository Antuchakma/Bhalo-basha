import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router"; // keep react-router
import api from "../../lib/axios";
import Footer from "../../lib/Footer.jsx";
import { UserCircle, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import "@fontsource/space-grotesk";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "About", path: "/about" },
];

const HomePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-base-100 text-base-content font-[Space Grotesk] overflow-x-hidden">
      {/* Navbar */}
      <div className="navbar px-4 sm:px-6 shadow-md h-16 fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        {/* Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold tracking-wide text-teal-900 hover:text-teal-700 transition-colors"
          >
            Bhalo-Basha
          </Link>
        </div>

        {/* Desktop Nav */}
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

          {/* Auth Section */}
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

        {/* Mobile Menu Button */}
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

      {/* Mobile Nav Dropdown */}
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
              className="relative text-base font-medium text-teal-900 hover:text-teal-700 transition-colors
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-teal-700
              after:transition-all after:duration-300 hover:after:w-full"
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

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-teal-600"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Perfect <span className="text-teal-300">Rental</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Stylish, convenient, and safe homes near your university.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/listings"
                className="px-8 py-4 bg-white text-teal-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse Listings
              </Link>
              {user?.role === "owner" ? (
                <Link
                  to="/add-listing"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-700 transition-colors"
                >
                  Add New Listing
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-700 transition-colors"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Bhalo-Basha?
            </h2>
            <p className="text-xl text-gray-600">
              We make finding and renting properties simple and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Search
              </h3>
              <p className="text-gray-600">
                Find properties with our advanced search and filter options
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Properties
              </h3>
              <p className="text-gray-600">
                All properties are verified and authentic listings
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                📞
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Direct Contact
              </h3>
              <p className="text-gray-600">
                Connect directly with property owners
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-teal-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your New Home?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of satisfied renters and property owners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="px-8 py-4 bg-white text-teal-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Searching
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-700 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
