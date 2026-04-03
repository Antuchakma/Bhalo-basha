import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-slate-900 text-slate-300 relative">
      {/* Gradient border */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400" />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">BhaloBasha</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Finding your perfect basha near campus. Connecting students with verified rental properties across Khulna.
            </p>
            <p className="text-slate-500 text-xs italic">
              ভালো-বাসা — a good home
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/listings", label: "Browse Listings" },
                { to: "/about", label: "About Us" },
                ...(user ? [{ to: "/profile", label: "My Profile" }] : []),
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">For you</h3>
            <ul className="space-y-2.5">
              <li><Link to="/listings" className="text-sm text-slate-400 hover:text-teal-400 transition">Find a Room</Link></li>
              <li><Link to="/add-listing" className="text-sm text-slate-400 hover:text-teal-400 transition">Post a Listing</Link></li>
              <li><Link to="/messages" className="text-sm text-slate-400 hover:text-teal-400 transition">Messages</Link></li>
              <li><Link to="/signup" className="text-sm text-slate-400 hover:text-teal-400 transition">Create Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">support@bhalo-basha.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">+880 1974625629</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">KUET Campus Area, Khulna, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} BhaloBasha. Made with care in Khulna, Bangladesh.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-400 transition group"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
