import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formdata, setFormdata] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/signup", formdata, { withCredentials: true });
      toast.success("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white focus:outline-none transition-all";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1080&q=80"
          alt="Modern apartment with city view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 to-slate-900/70" />
        <div className="relative z-10 flex flex-col justify-end h-full p-12">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Join BhaloBasha</h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Create your account and start exploring verified rental properties near KUET and across Khulna.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-white/60">
            <span>Free to join</span>
            <span>|</span>
            <span>No hidden fees</span>
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
          <div className="lg:hidden mb-8 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">B</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Create account</h2>
          <p className="text-slate-500 text-sm mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 font-medium hover:text-teal-700 transition">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Full Name</label>
              <input type="text" name="fullname" value={formdata.fullname} onChange={handleChange} placeholder="Your full name" className={inputClass} />
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">Username</label>
              <input type="text" name="username" value={formdata.username} onChange={handleChange} placeholder="Choose a username" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-1.5">Password</label>
                <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Min 6 chars" className={inputClass} />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-1.5">Confirm</label>
                <input type="password" name="confirmpassword" value={formdata.confirmpassword} onChange={handleChange} placeholder="Re-enter" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormdata(prev => ({ ...prev, role: 'renter' }))}
                  className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    formdata.role === 'renter'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Renter
                </button>
                <button
                  type="button"
                  onClick={() => setFormdata(prev => ({ ...prev, role: 'owner' }))}
                  className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    formdata.role === 'owner'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Owner
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all mt-2"
            >
              Create Account
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
