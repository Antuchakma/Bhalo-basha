import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext.jsx";

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
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1080&q=80"
          alt="Modern apartment interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 to-slate-900/70" />
        <div className="relative z-10 flex flex-col justify-end h-full p-12">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Welcome back</h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Your next home is waiting. Sign in to browse listings, message owners, and manage your rentals.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-white/60">
            <span>Trusted by 2,000+ students</span>
            <span>|</span>
            <span>500+ active listings</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile branding */}
          <div className="lg:hidden mb-8 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">B</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h2>
          <p className="text-slate-500 text-sm mb-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-600 font-medium hover:text-teal-700 transition">
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Username</label>
              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all mt-2"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LogInPage;
