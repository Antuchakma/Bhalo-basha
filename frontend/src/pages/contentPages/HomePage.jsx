import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link } from "react-router"; // keep react-router
import Header from "../../components/Header";
import Footer from "../../lib/Footer.jsx";
import { motion } from "framer-motion";
import "@fontsource/space-grotesk";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-screen min-h-screen bg-base-100 text-base-content font-[Space Grotesk] overflow-x-hidden">
      <Header />
      
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
