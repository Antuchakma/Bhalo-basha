// src/components/Footer.jsx
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-teal-900">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Bhalo-Basha</h3>
          <p className="text-gray-700">
            Your trusted rental platform to find the perfect home near your university.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-teal-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/listings" className="hover:text-teal-700 transition">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-teal-700 transition">
                About
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/profile" className="hover:text-teal-700 transition">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-700">Email: support@bhalo-basha.com</p>
          <p className="text-gray-700">Phone: +880 123 456 789</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-teal-700 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-teal-700 transition">
              Instagram
            </a>
            <a href="#" className="hover:text-teal-700 transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Bhalo-Basha. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
