import React from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { UserCircle, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "Messages", path: "/messages" },
  { name: "About", path: "/about" },
];

function Navbar({ user, setUser, mobileOpen, setMobileOpen }) {
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

  return (
    <>
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
            <div className="relative inline-block">
              <div className="group">
                <div className="btn btn-ghost btn-circle cursor-pointer">
                  <UserCircle className="w-6 h-6 text-teal-900" />
                </div>
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute right-0 mt-2 z-[1] min-w-[200px] transition-all duration-200 ease-in-out">
                  <ul className="py-2 bg-white rounded-lg shadow-lg border border-gray-200">
                    <li className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-100">
                      {user.username} ({user.role})
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                      >
                        View Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/add-listing"
                        className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                      >
                        Add Listing
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
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
              <Link
                to="/add-listing"
                className="text-base font-medium text-teal-900 hover:text-teal-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                Add Listing
              </Link>
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
    </>
  );
}

export default Navbar;