import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import "@fontsource/space-grotesk";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Footer from "../../lib/Footer.jsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const LogInPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", formdata, {
        withCredentials: true,
      });
      toast.success("Login Successful");
      setUser(res.data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-100 to-teal-100 font-[Space Grotesk] flex flex-col justify-between">
      {/* Login Section */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 sm:p-10"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 bg-teal-600 text-white font-semibold rounded-md shadow-sm hover:bg-teal-500 transition-all"
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      
    </div>
  );
};

export default LogInPage;
