import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { UserCircle, Menu, X, MessageSquare, LogOut, Plus, User, ChevronDown } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../lib/axios';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  {
    name: "Messages",
    path: "/messages",
    requiresAuth: true,
    showUnreadCount: true
  },
  { name: "About", path: "/about" },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        if (!user) { setUnreadCount(0); return; }
        const response = await axios.get('/api/messages/unread');
        setUnreadCount(response.data.count || 0);
      } catch (err) {
        setUnreadCount(0);
      }
    };
    fetchUnreadCount();
    if (user) {
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => { clearInterval(interval); setUnreadCount(0); };
    }
    return () => setUnreadCount(0);
  }, [user]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/50'
          : 'bg-white/60 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-teal-500/25 transition-shadow">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Bhalo<span className="text-teal-600">Basha</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.requiresAuth && !user) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.showUnreadCount && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all bg-white">
                  <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.username?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">{user.username}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute right-0 mt-2 w-56 transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800">{user.username}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                      <User className="w-4 h-4 text-slate-400" />
                      View Profile
                    </Link>
                    <Link to="/add-listing" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                      <Plus className="w-4 h-4 text-slate-400" />
                      Add Listing
                    </Link>
                    <div className="border-t border-slate-100">
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition">
                  Sign in
                </Link>
                <Link to="/signup" className="px-5 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold rounded-lg shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden fixed top-16 left-0 right-0 z-20 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => {
                if (link.requiresAuth && !user) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                      isActive(link.path) ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {link.name}
                      {link.showUnreadCount && unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{unreadCount}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
              <div className="border-t border-slate-100 mt-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-slate-800">
                      {user.username} <span className="text-slate-400 font-normal capitalize">({user.role})</span>
                    </div>
                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50 block">Profile</Link>
                    <Link to="/add-listing" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50 block">Add Listing</Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full text-left">Log out</button>
                  </>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">Sign in</Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-semibold bg-teal-600 text-white rounded-lg">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
