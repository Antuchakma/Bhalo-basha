import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link } from "react-router";
import api from "../../lib/axios";
import { useNavigate } from "react-router";



const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);


  const { setUser } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null); // clear user from context
    navigate("/"); // go back to homepage
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen font-[Space Grotesk] bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Bhalo-Basha
            </Link>
            <Link to="/" className="hover:text-indigo-500">Home</Link>
            <Link to="/listings" className="hover:text-indigo-500">Listings</Link>
            <Link to="/about" className="hover:text-indigo-500">About</Link>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setNavOpen(!navOpen)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md"
                >
                  {user.username} ▼
                </button>
                {navOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-3 z-50">
                    <p className="font-medium">Username: {user.username}</p>
                    <p className="font-medium">Role: {user.role}</p>
                    <Link
                      to="/profile"
                      className="block mt-2 text-indigo-600 hover:underline"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}  
                      className="block mt-1 text-red-600 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="p-6 text-center bg-gradient-to-r from-indigo-50 to-indigo-100">
        <h1 className="text-3xl font-bold mb-2">Welcome to Bhalo-Basha</h1>
        <p className="text-gray-700">Find your perfect rental home near your university.</p>
      </header>

      {/* Listings Section */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO: replace with map over real listings */}
          <div className="p-4 shadow rounded-lg bg-white">Listing #1</div>
          <div className="p-4 shadow rounded-lg bg-white">Listing #2</div>
          <div className="p-4 shadow rounded-lg bg-white">Listing #3</div>
        </div>

        {/* Logged-in Conditional Section */}
        {user && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Hello, {user.username} 👋</h2>
            <p className="mb-2">Role: {user.role}</p>
            {user.role === "owner" && (
              <Link
                to="/add-listing"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Add New Listing
              </Link>
            )}
          </div>
        )}

        {/* Guest message */}
        {!user && (
          <div className="mt-8 text-center p-6 bg-white rounded-lg shadow">
            <p className="mb-4">Want to see full details? Please log in.</p>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Login / Signup
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
