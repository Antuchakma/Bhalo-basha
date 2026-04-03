import { motion } from "framer-motion";
import { MapPin, ShieldCheck, MessageCircle, Mail, Phone, Heart } from "lucide-react";
import Footer from "../../lib/Footer.jsx";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-teal-300 font-medium text-sm tracking-widest uppercase mb-4">About us</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Making student housing <span className="text-teal-300">simple</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              BhaloBasha connects students near KUET with verified, affordable rental properties across Khulna.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Our Mission",
              text: "We're committed to making the rental experience seamless for university students. We understand the challenges of finding suitable accommodation, and we bridge the gap between property owners and students seeking comfortable living spaces."
            },
            {
              title: "Our Vision",
              text: "We envision a future where every student has access to quality housing that feels like home. Through our platform, we aim to create a transparent, efficient, and trustworthy rental ecosystem that benefits both owners and tenants."
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-teal-600 font-semibold text-sm tracking-widest uppercase mb-2">What we offer</p>
            <h2 className="text-3xl font-bold text-slate-900">Built for students, by students</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, color: "text-blue-500", bg: "bg-blue-50", title: "Campus-focused", desc: "Properties curated specifically for locations near KUET and other institutions in Khulna." },
              { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50", title: "Verified Listings", desc: "Every listing is posted by real owners and tenants. No fake ads, no middlemen." },
              { icon: MessageCircle, color: "text-violet-500", bg: "bg-violet-50", title: "Direct Chat", desc: "Message owners directly in the app. Ask questions, negotiate terms, and schedule visits." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-8 sm:p-10 text-center">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2>
            <p className="text-slate-500 text-sm mb-8 max-w-lg mx-auto">
              Have questions, feedback, or want to partner with us? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-teal-500" />
                support@bhalo-basha.com
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-teal-500" />
                +880 1974625629
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-teal-500" />
                Khulna, Bangladesh
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
