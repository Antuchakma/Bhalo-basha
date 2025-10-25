import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import "@fontsource/space-grotesk";
import api from "../../lib/axios";
import Footer from "../../lib/Footer.jsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const SignUpPage = () => {
  const [formdata, setFormdata] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await api.post("/api/auth/signup", formdata, {
        withCredentials: true,
      });
      setSuccessMsg("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-100 to-teal-100 font-[Space Grotesk] flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 sm:p-10"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>

          {successMsg && (
            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded-md text-sm mb-4">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formdata.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                placeholder="Choose a username"
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
                placeholder="Create a password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                value={formdata.confirmpassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Role
              </label>
              <select
                name="role"
                value={formdata.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all bg-white"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="renter">Renter</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 bg-teal-600 text-white font-semibold rounded-md shadow-sm hover:bg-teal-500 transition-all"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

   
    </div>
  );
};

export default SignUpPage;
