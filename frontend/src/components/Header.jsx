import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserCircle, Menu, X, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../lib/axios';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "About", path: "/about" },
];

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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
    const fetchUnreadCount = async () => {
      try {
        if (!user) {
          setUnreadCount(0);
          return;
        }
        const response = await axios.get('http://localhost:5002/api/messages/unread', {
          withCredentials: true
        });
        setUnreadCount(response.data.count || 0); // Ensure we get a number, default to 0
      } catch (err) {
        console.error('Error fetching unread count:', err);
        setUnreadCount(0);
      }
    };

    // Initial fetch
    fetchUnreadCount();
    
    // Set up polling only if user is logged in
    if (user) {
      const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30 seconds
      return () => {
        clearInterval(interval);
        setUnreadCount(0); // Reset count when unmounting
      };
    }

    return () => {
      setUnreadCount(0); // Reset count when user logs out
    };
  }, [user]);

  return (
    <>
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
              <span>{link.name}</span>
            </Link>
          ))}

          {user && (
            <Link
              to="/messages"
              className="relative text-sm font-medium text-teal-900 transition-colors duration-300 hover:text-teal-700
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-teal-700
              after:transition-all after:duration-300 hover:after:w-full"
            >
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            </Link>
          )}

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

                  <li>
                    <Link
                      to="/add-listing"
                      className="block px-2 py-1 text-sm font-medium text-gray-800 hover:text-teal-700 transition-colors"
                    >
                      Add Listing
                    </Link>
                  </li>

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
          {user && (
            <Link
              to="/messages"
              className="mr-4 relative"
            >
              <MessageSquare className="w-6 h-6 text-teal-900" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}
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

export default Header;