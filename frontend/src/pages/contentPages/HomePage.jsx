import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link } from "react-router";
import api from "../../lib/axios";
import { useNavigate } from "react-router";
import  Footer  from "../../lib/Footer.jsx";


const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);
  const { setUser } = useContext(AuthContext);
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
    <div className="min-h-screen font-[Space Grotesk] bg-gray-50 text-gray-800">
      {/* Navbar */}
<nav className="bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
    <Link to="/" className="text-3xl font-bold text-teal-900">
      Bhalo-Basha
    </Link>
    <div className="flex items-center space-x-6 text-teal-900 font-medium">
      <Link to="/" className="hover:text-teal-700 transition">Home</Link>
      <Link to="/listings" className="hover:text-teal-700 transition">Listings</Link>
      <Link to="/about" className="hover:text-teal-700 transition">About</Link>

      {user ? (
        <div className="relative">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="bg-teal-900 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition transform"
          >
            {user.username} ▼
          </button>
          {navOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-teal-900 shadow-xl rounded-xl p-4 z-50 border border-gray-200">
              <p className="font-semibold">Username: {user.username}</p>
              <p className="font-semibold">Role: {user.role}</p>
              <Link
                to="/profile"
                className="block mt-3 text-teal-900 hover:text-teal-700 font-medium transition"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block mt-2 text-red-600 hover:text-red-500 font-medium w-full text-left transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-teal-900 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition transform"
        >
          Login / Signup
        </Link>
      )}
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <header className="p-12 text-center bg-gradient-to-r from-gray-900 to-teal-600 rounded-b-3xl shadow-lg mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Find Your Perfect Rental
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-sm">
          Stylish, convenient, and safe homes near your university.
        </p>
      </header>

      {/* Listings Section */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-2">Listing #1</h3>
            <p className="text-gray-700 mb-2">Modern apartment near downtown.</p>
            <p className="text-teal-600 font-semibold">Rent: $500/month</p>
          </div>
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-2">Listing #2</h3>
            <p className="text-gray-700 mb-2">Cozy flat with balcony view.</p>
            <p className="text-teal-600 font-semibold">Rent: $650/month</p>
          </div>
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-2">Listing #3</h3>
            <p className="text-gray-700 mb-2">Spacious room near campus.</p>
            <p className="text-teal-600 font-semibold">Rent: $800/month</p>
          </div>
        </div>

        {user && (
          <div className="mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-100">
            <h2 className="text-2xl font-bold mb-2">Hello, {user.username} 👋</h2>
            <p className="text-gray-300 mb-4">Role: {user.role}</p>
            {user.role === "owner" && (
              <Link
                to="/add-listing"
                className="bg-teal-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition transform"
              >
                Add New Listing
              </Link>
            )}
          </div>
        )}

        {!user && (
          <div className="mt-10 text-center p-6 bg-gray-800 rounded-2xl shadow-lg text-gray-100">
            <p className="mb-4 text-lg">Want to see full details? Please log in.</p>
            <Link
              to="/login"
              className="bg-teal-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition transform"
            >
              Login / Signup
            </Link>
          </div>
        )}
      </main>

      <Footer/>
    </div>
  );
};

export default HomePage;
