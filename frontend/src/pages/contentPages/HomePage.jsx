import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link } from "react-router";
import Footer from "../../lib/Footer.jsx";
import { motion } from "framer-motion";
import { Search, ShieldCheck, MessageCircle, ChevronDown, MapPin, Home, ArrowRight, Star, Users } from "lucide-react";
import axios from "../../lib/axios";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [recentListings, setRecentListings] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");

  const locationOptions = [
    'KUET Campus', 'Fulbarigate', 'Boyra', 'Khulna City',
    'Daulatpur', 'Sonadanga', 'Khalishpur', 'New Market', 'Gollamari'
  ];

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get("/api/product/");
        setRecentListings((res.data.products || []).slice(0, 4));
      } catch (err) {
        // silently fail
      }
    };
    fetchRecent();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (searchType) params.set("propertyType", searchType);
    window.location.href = `/listings?${params.toString()}`;
  };

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      desc: "Filter by location, price, rooms, and preferences to find exactly what you need near campus.",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: "Verified Listings",
      desc: "Every property is posted by real owners and tenants. No fake listings, no middlemen.",
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: MessageCircle,
      title: "Direct Messages",
      desc: "Chat with property owners instantly. Ask questions, negotiate, and schedule visits in-app.",
      color: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
    },
  ];

  const stats = [
    { value: "500+", label: "Active Listings" },
    { value: "2,000+", label: "Happy Tenants" },
    { value: "10+", label: "Neighborhoods" },
  ];

  return (
    <div className="w-screen min-h-screen bg-base-100 text-base-content overflow-x-hidden">

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <p className="text-teal-300 font-medium text-sm sm:text-base tracking-widest uppercase mb-4">
              Khulna's Student Housing Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance leading-tight">
              Find a place that
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                feels like home
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Affordable, verified rentals near KUET and across Khulna.
              Browse listings, connect with owners, and move in stress-free.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-4 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Any Location</option>
                  {locationOptions.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Any Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Room">Room</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center gap-8 sm:gap-16 mt-12"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-teal-600 font-semibold text-sm tracking-widest uppercase mb-3">Why BhaloBasha</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-balance">
              Everything you need to find your next home
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <f.icon className={`w-6 h-6 bg-gradient-to-br ${f.color} bg-clip-text`} style={{color: f.color.includes('blue') ? '#3b82f6' : f.color.includes('emerald') ? '#10b981' : '#8b5cf6'}} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Listings Section */}
      {recentListings.length > 0 && (
        <div className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <p className="text-teal-600 font-semibold text-sm tracking-widest uppercase mb-2">Fresh on the market</p>
                <h2 className="text-3xl font-bold text-slate-900">Recently Added</h2>
              </div>
              <Link to="/listings" className="hidden sm:flex items-center gap-1 text-teal-600 font-medium text-sm hover:text-teal-700 transition group">
                View all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentListings.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link to={`/listing/${product._id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.images?.[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=60"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <p className="absolute bottom-3 left-3 text-white font-bold text-lg">
                          {product.rent} <span className="text-sm font-normal text-white/80">৳/mo</span>
                        </p>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-800 truncate">{product.title}</h3>
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{product.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Link to="/listings" className="flex sm:hidden items-center justify-center gap-1 text-teal-600 font-medium text-sm mt-8 hover:text-teal-700">
              View all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Ready to find your next home?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
              Whether you're looking for an apartment or searching for a roommate, BhaloBasha connects you with the right people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/listings"
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Listings
              </Link>
              {!user && (
                <Link
                  to="/signup"
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Create Account
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
